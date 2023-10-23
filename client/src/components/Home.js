import React,{useEffect,useRef} from 'react';
import '../styles/Home.css';
import {Link} from 'react-router-dom';

function Home({userName,setUserName}){
    const inputRef=useRef(null);
    useEffect(()=>{
        inputRef.current.focus();
    },[])
    return (
        <div id='home'>
        <form id='un-form'>
        <input ref={inputRef} id='username-ip' type='text' placeholder='Enter username...' value={userName} onChange={(e)=>{
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