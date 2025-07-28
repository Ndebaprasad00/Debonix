// src/components/Cart.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = ({ cartItems, onClose }) => {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    navigate("/checkout");
    onClose();
  };

  return (
    <div className="cart-container">
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.title}</span>
                <strong>₹{item.price}</strong>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total}</h3>
          <button className="checkout-btn" onClick={handleCheckout}>
            ✅ Checkout
          </button>
        </>
      )}
      <button className="close-btn" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default Cart;
