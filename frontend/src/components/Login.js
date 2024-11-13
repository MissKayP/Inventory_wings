// Login.js
import React, { useContext, useState } from 'react';
import { InventoryContext } from '../context/InventoryContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles.css';

const Login = () => {
  const { loginUser } = useContext(InventoryContext);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = loginUser(credentials);
    if (success) {
      navigate('/'); // Redirect to the dashboard on successful login
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <div className="loginBox">
        <div className="loginHead">
          <h1>WINGS CAFE</h1>
          <p>Stock Inventory System</p>
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
          <div className="LoginButtonContainer">
            <button type="submit">Login</button>
          </div>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
