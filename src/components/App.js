import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import RegisterUser from './RegisterUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adduser" element={<RegisterUser />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
