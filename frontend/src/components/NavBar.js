import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { InventoryContext } from '../context/InventoryContext';
import '../styles.css'; 

const NavBar = () => {
  const { isAuthenticated, logoutUser } = useContext(InventoryContext);

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/products" className="nav-link">Product Management</Link>
        <Link to="/stock" className="nav-link">Stock Management</Link>
        <Link to="/users" className="nav-link">User Management</Link>
      </div>
      {isAuthenticated ? (
        <button onClick={logoutUser} className="logout-button">Logout</button>
      ) : (
        <Link to="/login" className="nav-link">Login</Link>
      )}
    </nav>
  );
};

export default NavBar;