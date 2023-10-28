import './App.css';
import Chat from './components/Chat';
import Home from './components/Home';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setUserName,setFlag} from './redux/userSlice';

function App() {
  const dispatch=useDispatch();
  return (
    <BrowserRouter>
    <div className="App">
    <div id='navbar'>
    <Link to='/' style={{textDecoration:'none',color:'white'}} onClick={()=>{
      dispatch(setUserName(''));
      dispatch(setFlag(false));
    }}><h1 id='logo'>ChatZilla</h1></Link>
    </div>
    <div id='app-body'>
    <Routes id='test'>
      <Route path='/' element={<Home/>}/>
      <Route path='/chat' element={<Chat/>}/>
    </Routes>
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
