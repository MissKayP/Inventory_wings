import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';

const StockManagement = () => {
  const { products, addStockTransaction } = useInventory();
  const [stockUpdate, setStockUpdate] = useState({
    productId: '',
    quantity: 0,
    type: 'add',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStockUpdate((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateStock = (e) => {
    e.preventDefault();
    const { productId, quantity, type } = stockUpdate;


    // Check if productId is set
    if (!productId) {
      alert('Please select a product');
      return;
    }

    // Find the selected product
    const selectedProduct = products.find((p) => p.id === parseInt(productId));

    // Check if the selected product exists
    if (!selectedProduct) {
      alert("Product not found in the list.");
      return;
    }

    // Ensure that the quantity being removed doesn't exceed the available stock
    if (type === 'remove' && quantity > selectedProduct.quantity) {
      alert("Cannot remove more stock than available.");
      return;
    }

    console.log('Transaction:', { productId, quantity: parseInt(quantity, 10), type });
    addStockTransaction({
      productId,
      quantity: parseInt(quantity, 10),
      type,
    });

    // Reset form after submission
    setStockUpdate({ productId: '', quantity: 0, type: 'add' });
  };

  return (
    <div>
      <h1>Stock Management</h1>
      <form onSubmit={handleUpdateStock}>
        <select name="productId" value={stockUpdate.productId} onChange={handleChange} required>
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <input 
          type="number" 
          name="quantity" 
          value={stockUpdate.quantity} 
          onChange={handleChange} 
          placeholder="Quantity" 
          required 
        />
        <select name="type" value={stockUpdate.type} onChange={handleChange}>
          <option value="add">Add(BUY STOCK)</option>
          <option value="remove">SELL STOCK</option>
        </select>
        <button type="submit">Update Stock</button>
      </form>
    </div>
  );
};

export default StockManagement;
