import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode}from 'jwt-decode'

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Decode JWT if present
  let decodedToken;
  try {
    if (token) {
      decodedToken = jwtDecode(token); // Decode the JWT token
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className='border border-b border-gray-400 h-12 flex items-center space-x-5'>
      <Link to="/">Home</Link>
      {decodedToken ? (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default Header;
