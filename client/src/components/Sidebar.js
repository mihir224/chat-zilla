import React,{useEffect,useState} from 'react';
import {useSelector} from 'react-redux';
import '../styles/Sidebar.css';
import axios from 'axios';

function Sidebar(){
    const currentRoom=useSelector(state=>state.room.currentRoom);
    const [users,setUsers]=useState([]);
    useEffect(()=>{
       if(currentRoom){
           ( ()=>{
            currentRoom.members.map(async(member_id)=>{
                const member=await getUser(member_id);
                setUsers((prev)=>[...prev,member]);
            })
           })();
       }
       
    },[])    
    const getUser=async(member_id)=>{
        try{
            const url=process.env.NODE_ENV==="production"?"https://chat-zilla-backend.onrender.com/api":"http://localhost:5000/api";
            const res=await axios.get(`${url}/user/find/${member_id}`);
            console.log(res)
            return res.data;
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div id='side-bar'>
        <div>
        <label id='list-label' htmlFor='user-list'>Users Connected</label>
        <ul className='sb-list' id='user-list'>
            {users.length>0&&users.map((user,index)=>{
                return (<li key={index} style={{color:'white'}}>{user.name}</li>)
            })}
        </ul>
        </div>
        <div>
        <label id='list-label' htmlFor='options-list'>Options</label>
        <ul id='options-list' className='sb-list'>
            <li>Call</li>
            <li>Video</li>
        </ul>
        </div>
        </div>
    )
}

export default Sidebar;