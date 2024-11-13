import React, { useState, useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';
import '../styles.css';

const UserManagement = () => {
  // Change addUser to registerUser here
  const { users, registerUser, updateUser, deleteUser, loginUser } = useContext(InventoryContext);
  const [form, setForm] = useState({ username: '', email: '', role: 'Staff', password: '' });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [editUserId, setEditUserId] = useState(null);

  // Handling login, add, edit, and delete operations
  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginUser(loginForm);
    alert(success ? 'Login Successful!' : 'Invalid Credentials');
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    // Use registerUser instead of addUser
    const success = registerUser({ ...form, id: Date.now(), status: 'Active' });
    if (success) {
      setForm({ username: '', email: '', role: 'Staff', password: '' });
      alert('User added successfully!');
    } else {
      alert('Username already exists');
    }
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    updateUser({ ...form, id: editUserId });
    setEditUserId(null);
    setForm({ username: '', email: '', role: 'Staff', password: '' });
  };

  const handleDeleteUser = (id) => {
    deleteUser(id);
  };

  const startEditing = (user) => {
    setEditUserId(user.id);
    setForm(user);
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>
      
      {/* Login Form */}
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Username: <input type="text" value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })} required /></label>
          <label>Password: <input type="password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} required /></label>
          <button type="submit">Login</button>
        </form>
      </div>

      {/* Add User Form */}
      <div className="form-container">
        <h2>Add New User</h2>
        <form onSubmit={handleAddUser}>
          <label>Username: <input type="text" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required /></label>
          <label>Email: <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></label>
          <label>Password: <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required /></label>
          <label>Role: 
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
              <option value="Viewer">Viewer</option>
            </select>
          </label>
          <button type="submit">Add User</button>
        </form>
      </div>

      {/* Update User Form (Shown only when editing) */}
      {editUserId && (
        <div className="form-container">
          <h2>Edit User</h2>
          <form onSubmit={handleEditUser}>
            <label>Username: <input type="text" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required /></label>
            <label>Email: <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></label>
            <label>Password: <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required /></label>
            <label>Role: 
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
                <option value="Viewer">Viewer</option>
              </select>
            </label>
            <button type="submit">Save Changes</button>
            <button onClick={() => setEditUserId(null)}>Cancel</button>
          </form>
        </div>
      )}

      {/* User List with Actions */}
      <div className="user-list">
        <h2>Current Users</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <button onClick={() => startEditing(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
