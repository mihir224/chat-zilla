import React,{useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {setStage,setOpen} from '../redux/userSlice';
import {setRoom} from '../redux/roomSlice';
import '../styles/Navbar.css'
import MenuIcon from '@mui/icons-material/Menu';

function Navbar(){
    const dispatch=useDispatch();
    const [open,setOpen]=useState(false);
    const currentUser=useSelector(state=>state.user.currentUser);
    const stage=useSelector(state=>state.user.stage);
    return (
        <div id='navbar'>
        <div id='logo-ham'>
        {stage>3&&<div id="hamburger" onClick={()=>dispatch(setOpen())}><button type='button' className='nav-btn'><MenuIcon id="icon"/></button></div>}        
        <Link to='/' style={{textDecoration:'none',color:'white'}} onClick={()=>{
          dispatch(setRoom(null));
          dispatch(setStage(1));
        }}><h1 id='logo'>ChatZilla</h1></Link>
        </div>
        <ul id='nav-btns'>
          <li><Link to='/' replace={true}><button className='nav-btn' type='button'>Home</button></Link></li>
          <li><button className='nav-btn' type='button'>About</button></li>
          <li><button className='nav-btn' type='button'>Contact us</button></li>
          <li>{currentUser?currentUser.name:(
            <Link to='/signin'><button id='un-submit' type='button'>Sign In</button></Link>
          )
          }</li>
        </ul>

        </div>
    )
}

export default Navbar;