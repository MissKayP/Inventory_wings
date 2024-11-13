import React, { useState } from 'react';
import '../styles.css';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', email: 'admin@example.com', role: 'Admin', status: 'Active' },
    { id: 2, username: 'staff', email: 'staff@example.com', role: 'Staff', status: 'Active' },
  ]);
  const [form, setForm] = useState({ username: '', email: '', role: 'Staff', password: '' });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [editUserId, setEditUserId] = useState(null);

  // Handling login, add, edit, and delete operations
  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.username === loginForm.username && u.password === loginForm.password);
    alert(user ? 'Login Successful!' : 'Invalid Credentials');
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    setUsers([...users, { ...form, id: Date.now(), status: 'Active' }]);
    setForm({ username: '', email: '', role: 'Staff', password: '' });
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    setUsers(users.map(user => user.id === editUserId ? { ...user, ...form } : user));
    setEditUserId(null);
    setForm({ username: '', email: '', role: 'Staff', password: '' });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
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
            <label>Role: 
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="Admin">Admin</option>
                <option value="Staff">User</option>
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


