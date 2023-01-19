import './App.css';
import {  Route, BrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

function App() {

  return (
    
    <BrowserRouter>
      <div className="App">
    
      
        <Route path='/' element={ <HomePage/> } />
        <Route path='/chats' element={ <ChatPage/> } />
     
    
  
      </div>
      </BrowserRouter>
  );
}

export default App;


