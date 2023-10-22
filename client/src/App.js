import './App.css';
import Chat from './components/Chat';
import Home from './components/Home';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <h1>Chat Space</h1>
    <div id='app-body'>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/chat' element={<Chat/>}/>
    </Routes>
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
