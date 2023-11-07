import React, { useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {setRoom} from '../redux/roomSlice';
import {Link,Navigate} from 'react-router-dom';
import axios from 'axios';
import '../styles/Room.css';
import { ThreeDots } from 'react-loader-spinner'

function Room(){
    const dispatch=useDispatch();
    const currentRoom=useSelector((state)=>state.room.currentRoom);
    const currentUser=useSelector((state)=>state.user.currentUser);
    const [rooms,setRooms]=useState(null);
    const [isLoading,setIsLoading]=useState(false);
    useEffect(()=>{
        setIsLoading(true);
        (async()=>{
            try{
                const url=process.env.NODE_ENV==="production"?"https://chat-zilla-backend.onrender.com/api":"http://localhost:5000/api";
                const res=await axios.get(`${url}/room/get/random`,{withCredentials:true});
                setRooms(res.data); 
                setIsLoading(false);   
            }catch(err){
                console.log(err);
                setIsLoading(false);
            }
        })();
    },[])
    const handleClick=(room_id)=>{
         if(currentUser){
            setIsLoading(true);
            (async()=>{
                try{
                    console.log(room_id)
                    const url=process.env.NODE_ENV==="production"?"https://chat-zilla-backend.onrender.com/api":"http://localhost:5000/api";
                    const res=await axios.get(`${url}/room/${room_id}`,{withCredentials:true});
                    dispatch(setRoom(res.data));
                    setIsLoading(false);
                }catch(err){
                    console.log(err);
                    if(err.response.status===401){
                        alert('you are not authorised!')
                    }
                    setIsLoading(false);
                }
            })();
        }
        else{
            alert('please sign in to continue');
        }
    }
    return isLoading?(
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <ThreeDots 
            height="80" 
            width="80" 
            radius="9"
            color="white" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
            />
            </div>):(
        <div >
        <h1 id='heading' style={{color:'white'}}>Available Rooms</h1>
        <div id='rooms'>
        {rooms?(rooms.map((room,index)=>
            (<div key={index} id='room-card'>
                <div id='room-header'>
                    <h3>{room.name}</h3>
                </div>
                <div>
                    <p id='room-desc'>{room.desc}</p>
                </div>
                <div id='rs-btn'>
                    <button id='room-submit' type='submit' onClick={(e)=>{
                        e.preventDefault();
                        handleClick(room._id);
                    }}>JOIN</button>
                </div>
            </div>)
        )):(<div style={{color:'white',opacity:'0.9'}}>
            <h2 >No rooms available</h2>
            <p id='cr-txt'>Create one <Link to='/room/create' id='cr-link' style={{color:'white'}}>here</Link></p>
        </div>)
        }
        </div>
        {currentRoom&&<Navigate to={`/chat/${currentRoom?._id}`} replace={true}></Navigate>}
        </div>
    )
}

export default Room;