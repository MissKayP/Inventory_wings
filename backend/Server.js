require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5002;

// Enable CORS for all requests
app.use(cors({ origin: 'http://localhost:3000' }));

// Parse incoming JSON requests
app.use(bodyParser.json());

// Create the MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the MySQL database
db.connect(err => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
  console.log('Connected to MySQL Database');
});

// Get all users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).send('Error fetching users');
    }
    res.json(results); // Send users as JSON response
  });
});

// Add a new user
app.post('/api/users', (req, res) => {
  const { username, password } = req.body;
  db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, password],
    (err, results) => {
      if (err) {
        console.error("Error adding user:", err);
        return res.status(500).send('Error adding user');
      }
      res.json({ message: 'User added successfully!', userId: results.insertId });
    }
  );
});

// Update a user
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  db.query(
    'UPDATE users SET username = ?, password = ? WHERE id = ?',
    [username, password, id],
    (err, results) => {
      if (err) {
        console.error("Error updating user:", err);
        return res.status(500).send('Error updating user');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('User not found');
      }
      res.send('User updated successfully');
    }
  );
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).send('Error deleting user');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('User not found');
    }
    res.send('User deleted successfully');
  });
});


// Get all products
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).send('Error fetching products');
    }
    res.json(results); // Send products as JSON response
  });
});

// Add a new product
app.post('/api/products', (req, res) => {
  const { name, description, category, price, quantity } = req.body;

  db.query(
    'INSERT INTO products (name, description, category, price, quantity) VALUES (?, ?, ?, ?, ?)',
    [name, description, category, price, quantity],
    (err, results) => {
      if (err) {
        console.error("Error adding product:", err);
        return res.status(500).send('Error adding product');
      }
      res.json({ message: 'Product added successfully!', productId: results.insertId });
    }
  );
});

// Update an existing product
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, category, price, quantity } = req.body;

  db.query(
    'UPDATE products SET name = ?, description = ?, category = ?, price = ?, quantity = ? WHERE id = ?',
    [name, description, category, price, quantity, id],
    (err, results) => {
      if (err) {
        console.error("Error updating product:", err);
        return res.status(500).send('Error updating product');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Product not found');
      }
      res.send('Product updated successfully');
    }
  );
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error("Error deleting product:", err);
      return res.status(500).send('Error deleting product');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Product not found');
    }
    res.send('Product deleted successfully!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
