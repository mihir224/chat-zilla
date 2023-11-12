import React,{useState,useEffect,useRef} from 'react';
import '../styles/SignIn.css';
import {Link,Navigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {loginStart,loginFail, setUser, setStage} from '../redux/userSlice';
import {signInWithPopup} from '@firebase/auth';
import {auth,provider} from '../firebase'
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import GoogleIcon from '@mui/icons-material/Google';


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
            usernameRef.current?.focus();
        }
        else if(stage===2){
            passwordRef.current?.focus();
        }
    },[stage]);
    useEffect(()=>{
        dispatch(setStage(1));
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(setStage());
    }
    const handleSignin=async (e)=>{
        e.preventDefault();
        dispatch(loginStart());
        try{
            const url=process.env.NODE_ENV==="production"?"https://chat-zilla-backend.onrender.com/api":"http://localhost:5000/api";
            const res=await axios.post(`${url}/auth/signin`,{name:username,password:password},{withCredentials: true});
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
    const handleGoogleLogin=async(e)=>{
        e.preventDefault();
        await signInWithPopup(auth,provider).then((result)=>{
            const url=process.env.NODE_ENV==="production"?"https://chat-zilla-backend.onrender.com/api":"http://localhost:5000/api";
            axios.post(`${url}/auth/google`,{name:result.user.displayName,email:result.user.email,imgUrl:result.user.photoURL},{withCredentials:true}).then((res)=>{
                dispatch(setUser(res.data));
            });
        })
    }
    return currentUser?(<Navigate to='/' replace={true}></Navigate>):(
        isLoading?(
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <ThreeDots 
                height="80" 
                width="80" 
                radius="9"
                color="white" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
                />
                </div>):
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
            stage===2&&<input ref={passwordRef} className='ip' type='password' placeholder='Enter password...' value={password} autoComplete='off' onChange={(e)=>{
                setPassword(e.target.value);
            }} />
        }
        {password&&(stage===2)&&
            <button id='un-submit' type='submit' onClick={handleSignin}>Sign in</button>
        }
        </form>
        <span>don't have an account? sign up <Link to='/signup' style={{color:'white'}} replace={true}>here</Link></span>
        <button id='un-submit' style={{marginTop:'15px'}} type='submit' onClick={handleGoogleLogin}><GoogleIcon/></button>
        </div>)
    )
}

export default SignIn;


