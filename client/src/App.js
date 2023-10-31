import './App.css';
import Chat from './components/Chat';
import Home from './components/Home';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Navbar/>
    <div id='app-body'>
    <Routes id='test'>
      <Route path='/' element={<Home/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/signin' element={<SignIn/>}/>
    </Routes>
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
