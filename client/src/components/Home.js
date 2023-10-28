import React,{useEffect,useRef,useState} from 'react';
import '../styles/Home.css';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {setUserName, setRoom, setFlag} from '../redux/userSlice';

function Home(){
    const dispatch=useDispatch();
    const server=process.env.NODE_ENV==='production'?'https://chat-zilla-backend.onrender.com':'http://localhost:5000';
    const userName=useSelector((state)=>state.user.userName);
    const room=useSelector((state)=>state.user.room);
    const inputRef=useRef(null);
    const flag=useSelector((state)=>state.user.flag);
    useEffect(()=>{
        inputRef.current.focus();
    },[])
    const handleRoomSubmit=(e)=>{
        e.preventDefault();
    }
    const handleUserNameSubmit=(e)=>{
        e.preventDefault();
        dispatch(setFlag(true));
    }
    return (
        <div id='home'>
        <form id='un-form' onSubmit={flag?handleRoomSubmit:handleUserNameSubmit}>
        {!flag?(<input ref={inputRef} id='username-ip' className='ip' type='text' placeholder='Enter username...' value={userName} autoComplete='off' onChange={(e)=>{
            dispatch(setUserName(e.target.value));
        }}/>):
        (<input ref={inputRef} id='room-ip' className='ip' type='text' placeholder='Enter room details...' value={room} autoComplete='off' onChange={(e)=>{
            dispatch(setRoom(e.target.value));
        }}/>)}
        {userName&&!flag&&
            <button id='un-submit' type='submit'>Enter Room Details</button>
        }
        {room&&flag&&<Link to='/chat'>
            <button id='un-submit' type='submit'>Start Chat</button>
        </Link>}
        </form>

        </div>
    )
}

export default Home;