import React,{useState} from 'react';
import '../styles/Home.css';
import {Link,useSelector} from 'react-router-dom';

function Home(){
    const text='ChatZilla';
    const[current,setCurrent]=useState('');
    const type=()=>{
        if(current.length<text.length){
            setCurrent(current+text[current.length]);
            setTimeout(type,100);
        }
    }
    return (
        <div id='home'>
        <h2>The all-in-one chat app for gamers, streamers, and friends.</h2>
        <h3>Stay connected to your loved ones with <span>ChatZilla</span>!</h3>
        <div id='home-btns'>
        <Link to='/'>
            <button id='un-submit' type='submit'>Join a room</button>
        </Link>
        <Link to='/room/create' replace={true}>
            <button id='un-submit' type='submit'>Create a room</button>
        </Link>
        </div>
        </div>
    )
}

export default Home;