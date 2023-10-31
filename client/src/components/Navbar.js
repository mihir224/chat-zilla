import React from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {setUserName,setStage,setPassword,setRoom} from '../redux/userSlice';
import '../styles/Navbar.css'

function Navbar(){
    const dispatch=useDispatch();
    return (
        <div id='navbar'>
        <Link to='/' style={{textDecoration:'none',color:'white'}} onClick={()=>{
          dispatch(setUserName(''));
          dispatch(setPassword(''));
          dispatch(setRoom(''));
          dispatch(setStage(1));
        }}><h1 id='logo'>ChatZilla</h1></Link>
        </div>
    )
}

export default Navbar;