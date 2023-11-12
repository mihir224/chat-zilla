import './App.css';
import Chat from './components/Chat';
import Home from './components/Home';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import About from './components/About';
import Contact from './components/Contact';
import CreateRoom from './components/CreateRoom';
import Room from './components/Room';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Navbar/>
    <div id='app-body'>
    <Routes>
      <Route path='/'>
        <Route index element={<Home/>}/>
        <Route path='chat'>
          <Route path=':id' element={<Chat/>}/>
        </Route>
        <Route path='room'>
          <Route index element={<Room/>} />
          <Route path='create' element={<CreateRoom/>} />
        </Route>
        <Route path='about' element={<About/>}/>
        <Route path='contact' element={<Contact/>}></Route>
        <Route path='signin' element={<SignIn/>}/>
        <Route path='signup' element={<SignUp/>}/>
      </Route>
    </Routes>
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
