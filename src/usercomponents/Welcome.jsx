// src/components/Welcome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to My Food App</h1>
      <p>Please register or login to continue.</p>
      <button onClick={() => navigate('/register')}>Register</button>
      <button onClick={() => navigate('/login')} style={{ marginLeft: '10px' }}>
        Login
      </button>
    </div>
  );
};

export default Welcome;
