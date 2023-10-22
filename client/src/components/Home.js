import React,{useState} from 'react';
import {Link} from 'react-router-dom';

function Home({userName,setUserName}){
    return (
        <div>
        <form>
        <input type='text' value={userName} onChange={(e)=>{
            setUserName(e.target.value);
        }}/>
        <Link to='/chat'>
            <button type='submit' onSubmit={(e)=>{
                e.preventDefault();
            }}>Start Chat</button>
        </Link>
        </form>

        </div>
    )
}

export default Home;