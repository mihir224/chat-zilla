import React,{useState,useEffect,useRef} from 'react';
import '../styles/SignIn.css';
import {Navigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {loginStart,loginFail, setUser, setStage} from '../redux/userSlice';
import axios from 'axios';
function SignUp(){
    const dispatch=useDispatch();
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const currentUser=useSelector(state=>state.user.currentUser);
    const room=useSelector((state)=>state.room.currentRoom);
    const isLoading=useSelector((state)=>state.user.isLoading);
    const stage=useSelector((state)=>state.user.stage);
    const usernameRef=useRef(null);
    const passwordRef=useRef(null);
    const emailRef=useRef(null);
    useEffect(()=>{
        if(stage===1){
            usernameRef.current.focus();
        }
        else if(stage===2){
            emailRef.current.focus();
        }
        else if(stage===3){
            passwordRef.current.focus();
        }

    },[stage]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(setStage());
    }
    const handleSignup=async (e)=>{
        e.preventDefault();
        dispatch(loginStart());
        try{
            const url=process.env.NODE_ENV==="production"?"https://chat-zilla-backend.onrender.com/api":"http://localhost:5000/api";
            const res=await axios.post(`${url}/auth/signup`,{name:username,email:email,password:password});
            dispatch(setUser(res.data));
        }catch(err){
            // alert('invalid credentials. try again!');
            dispatch(loginFail(err))
            console.log(err);
            if(err.response.status===404){
                alert('invalid credentials');
            }
        }
    }
    return currentUser?(<Navigate to='/' replace={true}></Navigate>):(
        isLoading?(<h1 className='load'>Loading...</h1>):
       ( <div id='signin'>
        <form id='un-form' onSubmit={handleSubmit}>
        {
            stage===1&&<input ref={usernameRef} className='ip' type='text' placeholder='Enter username...' value={username} autoComplete='off' onChange={(e)=>{
            setUsername(e.target.value);
        }}/>   
        }
        {username&&(stage===1)&&
            <button id='un-submit' type='submit'>Enter Email</button>
        }
        {
            stage===2&&<input ref={emailRef} className='ip' type='text' placeholder='Enter email...' value={email} autoComplete='off' onChange={(e)=>{
            setEmail(e.target.value);
        }}/>   
        }
        {email&&(stage===2)&&
            <button id='un-submit' type='submit'>Enter Password</button>
        }
        {
            stage===3&&<input ref={passwordRef} className='ip' type='text' placeholder='Enter password...' value={password} autoComplete='off' onChange={(e)=>{
                setPassword(e.target.value);
            }} />
        }
        {password&&(stage===3)&&
            <button id='un-submit' type='submit' onClick={handleSignup}>Sign up</button>
        }
        </form>
        </div>)
    )
}

export default SignUp;


