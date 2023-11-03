import React from 'react';
import '../App.css';
import '../styles/Chat.css';
import {useState,useEffect,useRef} from  'react';
import {io} from 'socket.io-client';
import moment from 'moment';
import SendIcon from '@mui/icons-material/Send';
import {Navigate,Link,useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Sidebar from './Sidebar';


function Chat() {
  const server=process.env.NODE_ENV==='production'?'https://chat-zilla-backend.onrender.com':'http://localhost:5000';
  const socket=io(server);
  const room_id=useLocation().pathname.split('/')[2];
  const currentUser=useSelector((state)=>state.user.currentUser);
  const currentRoom=useSelector((state)=>state.room.currentRoom);
  const room=useSelector((state)=>state.user.room);
  const [message,setMessage]=useState("");
  const [chat,setChat]=useState([]);
  const chatRef=useRef(null);
  useEffect(() => {
    socket.on("chat", (payload) => { 
      setChat((prevChat) => [...prevChat, payload]); // using this instead of setChat([...prevChat,payload]) ensures that through closure, the last state is always captured because in this case it can happen that prev state is not updated and a new message arrives which can cause current message to overwrite prev one. closures ensure that prevState is always the latest one
    });
    socket.on("generated",(payload)=>{
      alert(payload);
    });
  },[]); 
  useEffect(()=>{
    socket.emit("room",{userName:currentUser.name,room_id:room_id});
  },[room])
  
  useEffect(()=>{
    if(chat?.length!==0){
      chatRef.current.scrollTop=chatRef.current.scrollHeight;
    }
  },[chat])
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(message.length===0){
      alert('message is empty');
      return;
    }
    socket.emit("chat",{message:message,userName:currentUser.name,time:moment().format('h:mm  a')}); //send payload to socket-server through chat event
    setMessage("");
  }
  return !currentUser?(<Navigate to="/signin" replace={true} />):(
    <div id='chat-container'>
    <Sidebar/>
    <div id='chat'>
     <div id='chat-header'>
      <h3>{room}</h3>
    </div>
    <div id='chat-div' ref={chatRef}>
    {chat.length===0?(<h1 id='blank-txt'>Start a conversation... <span>(currently texting as {currentUser.name})</span></h1>):
      (
        <> 
       <div id='date'><span>{moment().format('MMMM Do YYYY')}</span></div>
        {chat.map((payload,index)=>(
          <div key={index} style={{marginBottom:index===chat.length-1?'8px':'', display:'flex',justifyContent:payload.userName===currentUser.name?'flex-end':'flex-start'}} >
            <div className={`txt ${payload.userName===currentUser.name?'sender':'receiver'}`} style={{marginTop:index===0&&'0'}}> 
            <div id='un-msg'>
            <div className='un'>{payload.userName===currentUser.name?'You':payload.userName}</div>
            <p className='msg-txt' >{payload.message}</p>
            </div>
            <div id='time'><p>{payload.time}</p></div>
            </div>
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
        }} autoComplete='off'></input>
        <button type='submit'><SendIcon className='send-icon'/></button>
      </form>
    </div>
    </div>
    </div>
  )
}

export default Chat;