import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ProposalList from './components/ProposalList';
import ProposalDetails from './components/ProposalDetails';
import ProposalForm from './components/ProposalForm';
import Login from './components/Login';
import Register from './components/Register';
import AuthService from './services/auth.service';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      const decodedToken = jwtDecode(user.token);
      setCurrentUser(user);
      setUserRole(decodedToken.user.role);
      setUsername(decodedToken.user.username);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    setUserRole(null);
    setUsername(null);
  };

  return (
    <Router>
      <div className="container">
        <h1>Proposal Tool</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            {userRole && (userRole === 'admin' || userRole === 'editor') && (
              <li><Link to="/create">Create Proposal</Link></li>
            )}
            {currentUser ? (
              <>
                <li><a href="/login" onClick={logOut}>Logout</a></li>
                <li><span>{username}</span></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ProposalList />} />
          <Route path="/proposal/:id" element={<ProposalDetails />} />
          <Route path="/create" element={<ProposalForm />} />
          <Route path="/edit/:id" element={<ProposalForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
