import React,{useState} from 'react';
import '../styles/Home.css';
import {Link} from 'react-router-dom';

function Home({userName,setUserName}){
    return (
        <div id='home'>
        <form id='un-form'>
        <input id='username-ip' type='text' placeholder='Enter username...' value={userName} onChange={(e)=>{
            setUserName(e.target.value);
        }}/>
        <Link to='/chat'>
            <button id='un-submit' type='submit' onSubmit={(e)=>{
                e.preventDefault();
            }}>Start Chat</button>
        </Link>
        </form>

        </div>
    )
}

export default Home;