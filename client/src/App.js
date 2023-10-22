import './App.css';
import {useState} from 'react';
import Chat from './components/Chat';
import Home from './components/Home';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [userName,setUserName]=useState("");
  return (
    <BrowserRouter>
    <div className="App">
    <div id='navbar'>
    <h1>ChatZilla</h1>
    </div>
    <div id='app-body'>
    <Routes>
      <Route path='/' element={<Home setUserName={setUserName}/>}/>
      <Route path='/chat' element={<Chat userName={userName}/>}/>
    </Routes>
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
