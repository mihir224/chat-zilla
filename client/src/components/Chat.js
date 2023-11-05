import React from 'react';
import '../App.css';
import '../styles/Chat.css';
import {useState,useEffect,useRef} from  'react';
import {io} from 'socket.io-client';
import moment from 'moment';
import SendIcon from '@mui/icons-material/Send';
import {Navigate,useLocation} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import Sidebar from './Sidebar';
import axios from 'axios';
import {setRoom} from '../redux/roomSlice';

function Chat() {
  const server=process.env.NODE_ENV==='production'?'https://chat-zilla-backend.onrender.com':'http://localhost:5000';
  const socket=io(server);
  const dispatch=useDispatch();
  const room_id=useLocation().pathname.split('/')[2];
  const currentUser=useSelector((state)=>state.user.currentUser);
  const currentRoom=useSelector((state)=>state.room.currentRoom);
  const [message,setMessage]=useState("");
  const chatRef=useRef(null);
  useEffect(()=>{
    console.log('generated called'); 
    socket.on("generated",(payload)=>{
      (async ()=>{
        try{
          const url=process.env.NODE_ENV==='production'?'https://chat-zilla-backend.onrender.com/api':'http://localhost:5000/api';
          const res=await axios.put(`${url}/chat/${room_id}`,{content:payload,isUser:false},{withCredentials:true});
          dispatch(setRoom(res.data));
        }catch(err){
          console.log(err); 
          alert('an error occured. check the console and try again.')
        }
      })();
    });
  },[room_id])
  useEffect(() => {
    socket.on("chat", (payload) => { 
      (async()=>{
        try{
          const url=process.env.NODE_ENV==='production'?'https://chat-zilla-backend.onrender.com/api':'http://localhost:5000/api';
          const res=await axios.put(`${url}/chat/${room_id}`,{sender:payload.userName,content:payload.message,time:payload.time},{withCredentials:true});
          dispatch(setRoom(res.data));
        }
        catch(err){
          console.log(err);
          alert('an error occured. check console and try again.')
        }
      })();   
    });
  },[]); 
  useEffect(()=>{
    socket.emit("joined",{userName:currentUser.name,room:room_id});
    (async ()=>{
      try{
        const url=process.env.NODE_ENV==="production"?"https://chat-zilla-backend.onrender.com/api":"http://localhost:5000/api";
        await axios.put(`${url}/room/addUser/${room_id}`,{},{withCredentials:true});
        await axios.put(`${url}/user/addRoom/${room_id}`,{},{withCredentials:true}); 
      }catch(err){
        alert('an error occured');
      }
    })();
  },[])
  
  useEffect(()=>{
    if(currentRoom?.messages?.length!==0){
      chatRef.current.scrollTop=chatRef.current.scrollHeight;
    }
  },[currentRoom])
  
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
      <h3>{currentRoom?.name}</h3>
    </div>
    <div id='chat-div' ref={chatRef}>
    {currentRoom?.messages?.length===0?(<h1 id='blank-txt'>Start a conversation... <span>(currently texting as {currentUser.name})</span></h1>):
      (
        <> 
       <div id='date'><span>{moment().format('MMMM Do YYYY')}</span></div>
        {currentRoom?.messages?.map((message,index)=>(
          message.isUser?(<div key={index} style={{marginBottom:index===currentRoom?.messages?.length-1?'8px':'', display:'flex',justifyContent:message.userId===currentUser._id?'flex-end':'flex-start'}} >
            <div className={`txt ${message.userId===currentUser._id?'sender':'receiver'}`} style={{marginTop:index===0&&'0'}}> 
            <div id='un-msg'>
            <div className='un'>{message.userId===currentUser._id?'You':message.sender}</div>
            <p className='msg-txt' >{message.content}</p>
            </div>
            <div id='time'><p>{message.time}</p></div>
            </div>
          </div>):(
            <div key={index} id='bot-msg'>
                <p className='bot'>{message.content}</p>
            </div>
          )
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