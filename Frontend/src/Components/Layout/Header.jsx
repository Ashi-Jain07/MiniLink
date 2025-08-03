import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <h1>Mini</h1>
            <h2>Link</h2>
          </Link>
          <nav className="nav">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Mini</h1>
          <h2>Link</h2>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to={`/profile/${user.id}`} className="nav-link">Profile</Link>
          <button onClick={handleLogout} className="nav-button">Logout</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;