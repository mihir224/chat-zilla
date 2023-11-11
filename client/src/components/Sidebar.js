import React,{useEffect,useState} from 'react';
import {useSelector} from 'react-redux';
import '../styles/Sidebar.css';
import axios from 'axios';

function Sidebar(){
    const currentRoom=useSelector(state=>state.room.currentRoom);
    const [users,setUsers]=useState([]);
    const [loading,isLoading]=useState(true); 
    useEffect(()=>{
       if(currentRoom){
           (async ()=>{
            isLoading(true);
            currentRoom.members.map(async(member_id)=>{
                const member=await getUser(member_id);
                setUsers((prev)=>[...prev,member]);
            })
            isLoading(false);
           })();
       }
    },[]);   
    const getUser=async(member_id)=>{
        try{
            const url=process.env.NODE_ENV==="production"?"https://chat-zilla-backend.onrender.com/api":"http://localhost:5000/api";
            const res=await axios.get(`${url}/user/find/${member_id}`);
            return res.data;
        }catch(err){
            console.log(err);
            isLoading(false);
        }
    }
    return (
        <div id='side-bar'>
        {loading?<p style={{color:'white'}}>Loading users...</p>:(
            <>
        <label id='list-label' htmlFor='user-list'>Connected Users</label>
        <ul className='sb-list' id='user-list'>
            {users.length>0?users.map((user,index)=>{
                return (<li key={index} style={{color:'white'}}>{user.name}</li>)
            }):(<li>No user connected</li>)
            }
        </ul>
        </>
        )}
        </div>
    )
}

export default Sidebar;