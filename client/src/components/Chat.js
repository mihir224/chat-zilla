import React from 'react';
import '../App.css';
import '../styles/Chat.css';
import {useState,useEffect,useRef} from  'react';
import {io} from 'socket.io-client';
import SendIcon from '@mui/icons-material/Send';

function Chat({userName}) {
  const socket=io('http://localhost:5000');
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
    socket.emit("chat",{message:message,userName:userName}); //send payload to socket-server through chat event
    setMessage("");
  }
  return (
    <div id='chat'>
     <div id='chat-header'>
      <h3>Group Chat</h3>
    </div>
    <div id='chat-div' ref={chatRef}>
      {chat.map((payload,index)=>{
        return (
            <div key= {index} className={payload.userName===userName?'sender':'receiver'}> 
            <p>{payload.message}</p>
            </div>
        )
      })}
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