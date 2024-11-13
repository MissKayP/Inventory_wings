import React, { useState, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext'; // Import useInventory to access context

const ProductManagement = () => {
  const { products, updateProducts, addProduct, updateProduct, deleteProduct } = useInventory();
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  // Fetch products from backend when the component mounts
  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/products');
        const data = await response.json();
        updateProducts(data); // Update context state with fetched products
        console.log("Fetched Products:", data); // Debug log
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    if (products.length === 0) {
      fetchProducts();
      console.log('Updated Products in ProductManagement:', products);
    }
  }, [products, updateProducts]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (Add or Update Product)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing product
      try {
        await fetch(`http://localhost:5002/api/products/${editingProductId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productForm),
        });
        updateProduct({ ...productForm, id: editingProductId }); // Update product in context
        setIsEditing(false);
        setEditingProductId(null);
      } catch (error) {
        console.error('Error updating product:', error);
      }
    } else {
      // Add new product
      try {
        const response = await fetch('http://localhost:5002/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productForm),
        });
        const data = await response.json();
        addProduct({ ...productForm, id: data.productId }); // Add product to context
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
    // Reset form after submission
    setProductForm({ name: '', description: '', category: '', price: '', quantity: '' });
  };

  // Handle Edit button click
  const handleEdit = (product) => {
    setProductForm(product);
    setIsEditing(true);
    setEditingProductId(product.id);
  };

  // Handle Delete button click
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5002/api/products/${id}`, {
        method: 'DELETE',
      });
      deleteProduct(id); // Remove deleted product from context
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Product Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={productForm.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          name="description"
          value={productForm.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="category"
          value={productForm.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          type="number"
          name="price"
          value={productForm.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="number"
          name="quantity"
          value={productForm.quantity}
          onChange={handleChange}
          placeholder="Initial Quantity"
          required
        />
        <button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</button>
      </form>

      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="6">No products available</td></tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.price ? `M${product.price}` : ''}</td>
                <td>{product.quantity}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
