import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // LOAD CURRENT USER'S CART
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      return;
    }

    const cartKey = `cart_${user.id}`;
    console.log("Loading:", cartKey);
    const savedCart = localStorage.getItem(cartKey);
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    setCartItems(parsedCart);
  }, [user]);

  // SAVE CURRENT USER'S CART
  useEffect(() => {
    if (!user) {
      return;
    }

    const cartKey = `cart_${user.id}`;
    console.log("Saving:", cartKey, cartItems);
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems, user]);

  // ADD TO CART
  const addToCart = (product, quantity = 1) => {
    if (!user) {
      return;
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, product.stock),
              }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image_url: product.image_url,
          stock: product.stock,
          quantity,
        },
      ];
    });
  };

  // REMOVE FROM CART
  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  };

  // UPDATE QUANTITY
  const updateQuantity = (productId, quantity) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        const newQuantity = Math.max(1, Math.min(quantity, item.stock));

        return {
          ...item,
          quantity: newQuantity,
        };
      }),
    );
  };

  // CLEAR CART
  const clearCart = () => {
    setCartItems([]);

    if (user) {
      localStorage.removeItem(`cart_${user.id}`);
    }
  };

  // CART TOTAL
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // CART COUNT
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
