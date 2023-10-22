import React from 'react';
import '../App.css';
import {useState,useEffect} from  'react';
import {io} from 'socket.io-client';

function Chat() {
  const socket=io('http://localhost:5000');
  const [message,setMessage]=useState("");
  const [chat,setChat]=useState([]);
  useEffect(()=>{
    socket.on("chat",(payload)=>{ //listen for broadcasts from socket-server
      setChat([...chat,payload]);
    })
  })
  const handleSubmit=(e)=>{
    e.preventDefault();
    socket.emit("chat",{message:message}); //send payload to socket-server through chat event
    setMessage("");
  }
  return (
    <div>
    <div id='chat-div'>
      {chat.map((payload)=>{
        return <p>{payload.message}</p>
      })}
    </div>
      <form className='chat-form' onSubmit={handleSubmit}>
        <input type='text' placeholder='Enter Message' value={message} onChange={(e)=>{
          setMessage(e.target.value);
        }}></input>
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}

export default Chat;