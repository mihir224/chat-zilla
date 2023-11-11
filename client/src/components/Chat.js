import React from 'react';
import '../App.css';
import '../styles/Chat.css';
import {useState,useEffect,useRef} from  'react';
import {io} from 'socket.io-client';
import moment from 'moment';
import SendIcon from '@mui/icons-material/Send';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import {Navigate,useLocation} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import Sidebar from './Sidebar';
import axios from 'axios';
import {setRoom,updateMessage} from '../redux/roomSlice';

function Chat() {
  const server=process.env.NODE_ENV==='production'?'https://chat-zilla-backend.onrender.com':'http://localhost:5000';
  const socket=io(server);
  const dispatch=useDispatch();
  const room_id=useLocation().pathname.split('/')[2];
  const currentUser=useSelector((state)=>state.user.currentUser);
  const open=useSelector((state)=>state.user.open);
  const currentRoom=useSelector((state)=>state.room.currentRoom);
  const [message,setMessage]=useState("");
  const chatRef=useRef(null);

  useEffect(()=>{
    (async()=>{
      try{
        const url=process.env.NODE_ENV==='production'?'https://chat-zilla-backend.onrender.com/api':'http://localhost:5000/api';
        const res=await axios.get(`${url}/room/${room_id}`,{withCredentials:true});
        dispatch(setRoom(res.data));
      }catch(err){
        console.log('something went wrong. please try again later');
      }
    })();
  },[]);

  useEffect(()=>{
    socket.on("generated",(payload)=>{
      dispatch(updateMessage({userId:currentUser?.userId,content:payload.content,time:payload.time,isUser:false})); 
    });
  },[])

  useEffect(() => {
    socket.on("chat", (payload) => { 
      console.log(payload)
      dispatch(updateMessage({userId:payload.userId,content:payload.message,sender:payload.userName,time:payload.time,isUser:true})); 
    });
  }); 

  useEffect(()=>{
    socket.emit("joined",{userName:currentUser.name,room:room_id,time:moment().format('h:mm  a')});
    (async ()=>{
      try{
        const url=process.env.NODE_ENV==="production"?"https://chat-zilla-backend.onrender.com/api":"http://localhost:5000/api";
        await axios.put(`${url}/room/addUser/${room_id}`,{},{withCredentials:true});
        await axios.put(`${url}/user/addRoom/${room_id}`,{},{withCredentials:true}); 
        const res=await axios.put(`${url}/chat/${room_id}`,{content:`${currentUser.name} has joined the chat`,isUser:false},{withCredentials:true})
        dispatch(setRoom(res.data));
      }catch(err){
        alert('an error occurred');
        console.log(err);
      }
    })();
  },[room_id])

  useEffect(()=>{
    socket.on("leave",(payload)=>{
      alert(payload);
    })
  },[])
  
  useEffect(()=>{
    if(currentRoom?.messages?.length!==0&&chatRef.current){
      chatRef.current.scrollTop=chatRef.current.scrollHeight;
    }
  },[currentRoom]);
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(message.length===0){
      alert('message is empty');
      return;
    }
    var time=moment().format('h:mm  a');
    socket.emit("chat",{userId:currentUser?._id,message:message,userName:currentUser?.name,time:time}); //send payload to socket-server through chat event
    try{
      const url=process.env.NODE_ENV==="production"?"https://chat-zilla-backend.onrender.com/api":"http://localhost:5000/api";
      const res=await axios.put(`${url}/chat/${room_id}`,{sender:currentUser.name,content:message,time:time},{withCredentials:true});
      dispatch(setRoom(res.data));
    }catch(err){
      alert('something went wrong. try again!');
    }
    setMessage("");
  }

  const clearChat=async ()=>{
    try{
      const url=process.env.NODE_ENV==="production"?"https://chat-zilla-backend.onrender.com/api":"http://localhost:5000/api";
      const res=await axios.put(`${url}/chat/delete/${room_id}`,{},{withCredentials:true});
      dispatch(setRoom(res.data));
    }catch(err){
      alert('something went wrong. try again.');
    }
  }
  
  const leaveRoom=async()=>{
    try{
      const url=process.env.NODE_ENV==="production"?"https://chat-zilla-backend.onrender.com/api":"http://localhost:5000/api";
      await axios.put(`${url}/room/removeUser/${room_id}`,{},{withCredentials:true});
      await axios.put(`${url}/user/removeRoom/${room_id}`,{},{withCredentials:true}); 
      dispatch(setRoom(null));
    }catch(err){
      console.log(err);
      alert('an error occurred. please try again')
    }
  }

  return (!currentUser||!currentRoom)?(<Navigate to="/signin" replace={true} />):(
    <div id='chat-container'>
    {open&&<Sidebar/>}
    <div id='chat'>
     <div id='chat-header'>
      <h3>{currentRoom?.name}</h3>
      <div id='options'>
      <button className='option-btn' type='button'><CallIcon className='icons'/></button>
      <button className='option-btn'><VideocamIcon className='icons'/></button>
      <button id='clear-btn' type='button' onClick={clearChat}>Clear Chat</button>
      <button id='exit-btn' type='button' onClick={leaveRoom}>Leave Room</button>
      </div>
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