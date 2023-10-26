import './App.css';
import {useState} from 'react';
import Chat from './components/Chat';
import Home from './components/Home';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setUserName,setFlag} from './redux/userSlice';

function App() {
  const dispatch=useDispatch();
  const [userName,setUserName]=useState("");
  return (
    <BrowserRouter>
    <div className="App">
    <div id='navbar'>
    <Link to='/' style={{textDecoration:'none',color:'white'}} onClick={()=>{
      dispatch(setUserName(''));
      dispatch(setFlag(false));
    }}><h1>ChatZilla</h1></Link>
    </div>
    <div id='app-body'>
    <Routes>
      <Route path='/' element={<Home userName={userName} setUserName={setUserName}/>}/>
      <Route path='/chat' element={<Chat userName={userName}/>}/>
    </Routes>
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
