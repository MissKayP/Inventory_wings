// Register.js
import React, { useState, useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles.css';

const Register = () => {
  const { registerUser } = useContext(InventoryContext);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      registerUser(credentials);
      navigate('/login'); // Redirect to login after registration
    }
  };

  return (
    <div className="container">
      <div className="loginBox">
        <div className="loginHead">
          <h1>Register</h1>
          <p>Create a new account</p>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="loginInputContainer">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="loginInputContainer">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="loginInputContainer">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="LoginButtonContainer">
            <button type="submit">Register</button>
          </div>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
