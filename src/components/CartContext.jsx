import React, { createContext, useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// Key for storing cart in localStorage
const CART_STORAGE_KEY = "guestCartItems";

const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  cartItemCount: 0,
  removeFromCart: () => {},
  updateItemQuantity: () => {},
  getCartTotal: () => 0,
  clearCart: () => {},
});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Could not load cart from local storage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Could not save cart to local storage", error);
    }
  }, [cartItems]);

  // Function to add or update an item in the cart
  const addToCart = (
    productName,
    selectedSize,
    selectedQuantity,
    price,
    productId // <--- CRITICAL: Now accepting the UUID
  ) => {
    setCartItems((prevItems) => {
      // Use the actual productId AND selectedSize to determine uniqueness
      const itemKey = `${productId}-${selectedSize}`;
      const existingItemIndex = prevItems.findIndex(
        (item) => item.key === itemKey
      );

      if (existingItemIndex > -1) {
        // If item exists, update its quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + selectedQuantity,
        };
        return updatedItems;
      } else {
        // Add new item
        const newItem = {
          id: uuidv4(), // Client-side unique ID
          key: itemKey,
          productId: productId, // CRITICAL: The actual product ID from your DB
          name: productName,
          size: selectedSize,
          quantity: selectedQuantity,
          price: price,
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== itemId);
    });
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    const finalQuantity = Math.max(1, newQuantity);

    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: finalQuantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const contextValue = {
    cartItems,
    addToCart,
    cartItemCount,
    removeFromCart,
    updateItemQuantity,
    getCartTotal,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
