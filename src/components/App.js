import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Admin from './Admin';
import RegisterUser from './RegisterUser';
import Eval from './Eval';
import { useState } from 'react';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/home" element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/adduser" element={<RegisterUser />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/eval/:eventDate/:eventID" element={<Eval />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
