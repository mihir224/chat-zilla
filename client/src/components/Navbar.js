import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {setStage,setOpen,logout} from '../redux/userSlice';
import {setRoom} from '../redux/roomSlice';
import '../styles/Navbar.css'
import MenuIcon from '@mui/icons-material/Menu';

function Navbar(){
    const dispatch=useDispatch();
    const currentUser=useSelector(state=>state.user.currentUser);
    const open=useSelector(state=>state.user.open);
    const [logoutOpen,setLogoutOpen]=useState(false);
    const currentRoom=useSelector(state=>state.room.currentRoom);
    const stage=useSelector(state=>state.user.stage);
    const handleLogout=()=>{
      dispatch(logout());
    }
    return (
        <div id='navbar'>
        <div id='logo-ham'>
        {currentRoom&&<div id="hamburger"><button type='button' className='nav-btn' onClick={(()=>{
          dispatch(setOpen(!open));
        })}><MenuIcon id="icon"/></button></div>}        
        <Link to='/' style={{textDecoration:'none',color:'white'}}><h1 id='logo'>ChatZilla</h1></Link>
        </div>
        <ul id='nav-btns'>
          <li><Link to='/' replace={true}><button className='nav-btn' type='button'>Home</button></Link></li>
          <li><button className='nav-btn' type='button'>About</button></li>
          <li><button className='nav-btn' type='button'>Contact us</button></li>
          <li>{currentUser?(
            <div id='profile-div'>
            <button id='profile' type='button' onClick={()=>setLogoutOpen(!logoutOpen)}>{currentUser.name}</button>
            <div style={{display:logoutOpen?'block':'none'}} id="dropdown-content" >
                <ul>
                  <li className="dd-list-item"><button id="logout-btn" onClick={handleLogout}>LOG OUT</button></li>
                </ul>
            </div>
            </div>
            ):
          (
            <Link to='/signin'><button id='un-submit' type='button'>Sign In</button></Link>
          )
          }</li>
        </ul>

        </div>
    )
}

export default Navbar;