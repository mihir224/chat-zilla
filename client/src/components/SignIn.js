import React,{useEffect,useRef} from 'react';
import '../styles/SignIn.css';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {setUserName, setRoom, setStage, setPassword} from '../redux/userSlice';
function SignIn(){
    const dispatch=useDispatch();
    const userName=useSelector((state)=>state.user.userName);
    const password=useSelector((state)=>state.user.password);
    const room=useSelector((state)=>state.user.room);
    const stage=useSelector((state)=>state.user.stage);
    const usernameRef=useRef(null);
    const passwordRef=useRef(null);
    const roomRef=useRef(null);
    useEffect(()=>{
        if(stage===1){
            usernameRef.current.focus();
        }
        else if(stage===2){
            passwordRef.current.focus();
        }
        else if(stage===3){
            roomRef.current.focus();
        }
    },[stage])
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(setStage());
    }
    return (
        <div id='signin'>
        <form id='un-form' onSubmit={handleSubmit}>
        {
            stage===1&&<input ref={usernameRef} className='ip' type='text' placeholder='Enter username...' value={userName} autoComplete='off' onChange={(e)=>{
            dispatch(setUserName(e.target.value));
        }}/>
        }
        {userName&&(stage===1)&&
            <button id='un-submit' type='submit'>Enter Password</button>
        }
        {
            stage===2&&<input ref={passwordRef} className='ip' type='text' placeholder='Enter password...' value={password} autoComplete='off' onChange={(e)=>{
                dispatch(setPassword(e.target.value));
            }} />
        }
        {password&&(stage===2)&&
            <button id='un-submit' type='submit'>Enter Room Details</button>
        }
        {
            stage===3&&<input ref={roomRef} className='ip' type='text' placeholder='Enter room details...' value={room} autoComplete='off' onChange={(e)=>{
                dispatch(setRoom(e.target.value));
            }}/>
        }
        {room&&(stage===3)&&<Link to='/chat'>
            <button id='un-submit' type='submit'>Start Chat</button>
        </Link>
        }
        </form>

        </div>
    )
}

export default SignIn;


