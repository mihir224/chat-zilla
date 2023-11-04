import React,{useState,useEffect,useRef} from 'react';
import '../styles/SignIn.css';
import {Link,Navigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {loginStart,loginFail, setUser, setStage} from '../redux/userSlice';
import axios from 'axios';
function SignIn(){
    const dispatch=useDispatch();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const currentUser=useSelector(state=>state.user.currentUser);
    const room=useSelector((state)=>state.room.currentRoom);
    const isLoading=useSelector((state)=>state.user.isLoading);
    const stage=useSelector((state)=>state.user.stage);
    const usernameRef=useRef(null);
    const passwordRef=useRef(null);
    useEffect(()=>{
        if(stage===1){
            usernameRef.current.focus();
        }
        else if(stage===2){
            passwordRef.current.focus();
        }
    },[stage]);
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(setStage());
    }
    const handleSignin=async (e)=>{
        e.preventDefault();
        dispatch(loginStart());
        try{
            const res=await axios.post('http://localhost:5000/api/auth/signin',{name:username,password:password},{withCredentials: true});
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
            <button id='un-submit' type='submit'>Enter Password</button>
        }
        {
            stage===2&&<input ref={passwordRef} className='ip' type='text' placeholder='Enter password...' value={password} autoComplete='off' onChange={(e)=>{
                setPassword(e.target.value);
            }} />
        }
        {password&&(stage===2)&&
            <button id='un-submit' type='submit' onClick={handleSignin}>Sign in</button>
        }
        </form>
        <span>don't have an account? sign up <Link to='/signup' style={{color:'white'}} replace={true}>here</Link></span>
        </div>)
    )
}

export default SignIn;


