import React,{useEffect,useRef} from 'react';
import '../styles/Home.css';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {setUserName, setRoom} from '../redux/userSlice';

function Home(){
    const dispatch=useDispatch();
    const userName=useSelector((state)=>state.user.userName);
    const inputRef=useRef(null);
    useEffect(()=>{
        inputRef.current.focus();
    },[])
    return (
        <div id='home'>
        <form id='un-form'>
        <input ref={inputRef} id='username-ip' type='text' placeholder='Enter username...' value={userName} onChange={(e)=>{
            dispatch(setUserName(e.target.value));
        }}/>
        {userName&&<Link to='/chat'>
            <button id='un-submit' type='submit' onSubmit={(e)=>{
                e.preventDefault(); 
            }}>Start Chat</button>
        </Link>}
        </form>

        </div>
    )
}

export default Home;