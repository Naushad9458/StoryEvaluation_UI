import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Admin from './Admin';
import RegisterUser from './RegisterUser';
import Eval from './Eval';
import { useState } from 'react';


function App() {


  const storedUser = localStorage.getItem('user');
  const initialUser = storedUser ? storedUser : '';

  

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(initialUser);

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} user={user} setUser={setUser} />} /> 
        <Route path="/home" element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} user={user} setUser={setUser}/>} />
        <Route path="/adduser" element={<RegisterUser />} />
        <Route path="/admin" element={<Admin />} />
        
        <Route path="/eval/:eventDate/:eventID/:system_name" element={<Eval isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} user={user} setUser={setUser}/>} />
        {/*<Route path="/eval" element={<Eval isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} user={user} setUser={setUser}/>} />*/}
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
