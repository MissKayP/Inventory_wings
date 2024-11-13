import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import UserManagement from './components/UserManagement';
import StockManagement from './components/StockManagement';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register'; // Import Register component
import { InventoryProvider, InventoryContext } from './context/InventoryContext';

const App = () => {
  return (
    <InventoryProvider>
      <NavBar />
      <MainRoutes />
    </InventoryProvider>
  );
};

const MainRoutes = () => {
  const { isAuthenticated } = useContext(InventoryContext);

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/products" element={isAuthenticated ? <ProductManagement /> : <Navigate to="/login" />} />
      <Route path="/users" element={isAuthenticated ? <UserManagement /> : <Navigate to="/login" />} />
      <Route path="/stock" element={isAuthenticated ? <StockManagement /> : <Navigate to="/login" />} />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
    </Routes>
  );
};

export default App;
