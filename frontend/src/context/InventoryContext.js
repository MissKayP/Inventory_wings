import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context for inventory management
export const InventoryContext = createContext();

// Custom hook to use the InventoryContext
export const useInventory = () => {
  return useContext(InventoryContext);
};

// Provider component
export const InventoryProvider = ({ children }) => {
  const loadProductsFromStorage = () => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
  };

  const loadAuthenticationStatus = () => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true'; // Convert from string to boolean
  };

  // State initialization
  const [isAuthenticated, setIsAuthenticated] = useState(loadAuthenticationStatus());
  const [products, setProducts] = useState(loadProductsFromStorage());
  const [users, setUsers] = useState([]); // You can also persist users if needed.

  // User authentication functions
  const loginUser = (credentials) => {
    const foundUser = users.find(
      (user) => user.username === credentials.username && user.password === credentials.password
    );

    if (foundUser) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true'); // Save authentication state
      return true;
    } else {
      setIsAuthenticated(false);
      return false;
    }
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false'); // Save authentication state
  };

  const registerUser = (newUser) => {
    const userExists = users.some((user) => user.username === newUser.username);
    if (!userExists) {
      setUsers((prevUsers) => [...prevUsers, newUser]);
      return true;
    }
    return false;
  };

  // Product management functions
  const addProduct = (newProduct) => {
    setProducts((prev) => {
      const updatedProducts = [...prev, newProduct]; // Use newProduct, not product
      localStorage.setItem('products', JSON.stringify(updatedProducts)); // Save to localStorage
      return updatedProducts;
    });
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) => {
      const updatedProducts = prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      localStorage.setItem('products', JSON.stringify(updatedProducts)); // Save to localStorage
      return updatedProducts;
    });
  };

  const deleteProduct = (id) => {
    setProducts((prev) => {
      const updatedProducts = prev.filter((product) => product.id !== id);
      localStorage.setItem('products', JSON.stringify(updatedProducts)); // Save to localStorage
      return updatedProducts;
    });
  };

  const addStockTransaction = ({ productId, quantity, type }) => {
    setProducts((prev) => {
      const updatedProducts = prev.map((product) => {
        if (product.id === productId) {
          const updatedQuantity = 
            type === 'add' 
            ? product.quantity + quantity 
            : product.quantity - quantity;
  
          return {
            ...product,
            quantity: Math.max(updatedQuantity, 0), // Prevent negative quantities
          };
        }
        return product;
      });

      console.log('Updated Products:', updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts)); // Save the updated products to localStorage
      return updatedProducts; // Update the products state
    });
  };
  

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  return (
    <InventoryContext.Provider
      value={{
        isAuthenticated,
        loginUser,
        logoutUser,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        users,
        registerUser,
        addStockTransaction,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
