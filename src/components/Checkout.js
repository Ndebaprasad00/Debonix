// src/components/Checkout.jsx
import React, { useState } from "react";
import "./Checkout.css";

const Checkout = ({ cartItems }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "cod",
  });

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed successfully!\nTotal: ₹${total}`);
  };

  return (
    <div className="checkout-container">
      <h2>🧾 Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <select name="payment" value={formData.payment} onChange={handleChange}>
          <option value="cod">Cash on Delivery</option>
          <option value="online">Online Payment</option>
        </select>
        <h3>Total: ₹{total}</h3>
        <button type="submit" className="place-order-btn">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
