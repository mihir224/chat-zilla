import React, { useState,useEffect,useRef } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {setStage} from '../redux/userSlice';
import {start,setRoom} from '../redux/roomSlice';
import {Navigate} from 'react-router-dom';
import axios from 'axios';
import '../styles/SignIn.css'

function Room(){
    const dispatch=useDispatch();
    const [roomname,setRoomname]=useState("");
    const currentUser=useSelector(state=>state.user.currentUser);
    const currentRoom=useSelector(state=>state.room.currentRoom);
    const isLoading=useSelector(state=>state.room.isLoading);
    const stage=useSelector(state=>state.user.stage);
    const roomRef=useRef(null);
    useEffect(()=>{
        if(stage===3){
            roomRef.current.focus();
        }
    },[stage]);
    const handleClick=async()=>{
        dispatch(start());
        try{
            const res=await axios.post('http://localhost:5000/api/room/create',{name:roomname});
            dispatch(setRoom(res.data));
            console.log(res.data);
            return <Navigate to={`/chat/${currentRoom?._id}`} replace={true}></Navigate>;
        }catch(err){
            alert('an error occured. please try again.')
        }
        dispatch(setStage());
    }

    return currentUser?(
        isLoading?(<h1 className='load'>Loading...</h1>):
        (<form id='room-ip' onSubmit={(e)=>{
            e.preventDefault();
        }}>
         {currentUser&&<input ref={roomRef} className='ip' type='text' placeholder='Enter room name...' value={roomname} autoComplete='off' onChange={(e)=>{
                setRoomname(e.target.value);
        }}/>
        }
        {roomname&&
            <button id='un-submit' type='submit' onClick={handleClick}>Create Room</button>
        }
        </form>)
    ):(<Navigate to='/signin' replace={true}></Navigate>)
}

export default Room;