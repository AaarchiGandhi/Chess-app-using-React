import { Route, Routes } from 'react-router-dom';
import './App.css';
import Referee from './components/Referee/Referee';
import { Login } from './components/Login';

function App() {
  

    return (
      <div id="app">
          <Referee />
          <div id = "copyright">©️aarchigandhi</div>
      </div>
    );

    // For Login page

    // <Routes>
    //    <Route path = '/chess-match' element = {<Referee />} />
    //    <Route path = '/' element = {<Login />} /> 
       
    //    </Routes>

    
  
}

export default App;
