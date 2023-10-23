import React from 'react';
import '../App.css';
import '../styles/Chat.css';
import {useState,useEffect,useRef} from  'react';
import {io} from 'socket.io-client';
import moment from 'moment';
import SendIcon from '@mui/icons-material/Send';

function Chat({userName}) {
  const server=process.env.NODE_ENV==='production'?'https://chat-zilla-backend.onrender.com':'http://localhost:5000';
  const socket=io(server);
  const [message,setMessage]=useState("");
  const [chat,setChat]=useState([]);
  const chatRef=useRef(null);
  useEffect(()=>{
    socket.on("chat",(payload)=>{ //listen for broadcasts from socket-server
      setChat([...chat,payload]);
    })
  })
  useEffect(()=>{
    chatRef.current.scrollTop=chatRef.current.scrollHeight;
  },[chat])
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(message.length===0){
      alert('message is empty');
      return;
    }
    socket.emit("chat",{message:message,userName:userName,time:moment().format('h:mm:ss a')}); //send payload to socket-server through chat event
    setMessage("");
  }
  return (
    <div id='chat'>
     <div id='chat-header'>
      <h3>Group Chat</h3>
    </div>
    <div id='chat-div' ref={chatRef}>
    {chat.length===0?(<h1 id='blank-txt'>Start a convo  <span>(currently texting as {userName})</span></h1>):
      (
        <>
       <div id='date'><span>{moment().format('MMMM Do YYYY')}</span></div>
        {chat.map((payload,index)=>(
          <div key= {index} className='txt' style={{display:'flex',justifyContent:payload.userName===userName?'flex-end':'flex-start'}} >
          <div className='un' style={{display:payload.userName===userName?'none':'content'}}>{payload.userName} </div>
            <div className={payload.userName===userName?'sender':'receiver'} style={{marginTop:index===0&&'0'}}> 
            <p className='msg-txt' >{payload.message}</p>
            </div>
            <div className='un' style={{display:payload.userName===userName?'content':'none'}}>{payload.userName}</div>
          </div>
        ))}
        </>
      )
    }
    </div>
    <div id='input'>
      <form id='chat-form' onSubmit={handleSubmit}>
        <input id='msg-ip' type='text' placeholder='Enter Message' value={message} onChange={(e)=>{
          setMessage(e.target.value);
        }}></input>
        <button type='submit'><SendIcon className='send-icon'/></button>
      </form>
    </div>
    </div>
  )
}

export default Chat;