// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
// import AdminPanel from "./components/AdminPanel";
import MedicineList from "./components/MedicineList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]); 
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add medicine to cart
  const handleAddToCart = (medicine) => {
    setCartItems((prev) => [...prev, medicine]);
  };

  // Open Cart
  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  return (
    <Router>
      <div>
        {/* Navbar with Cart Count */}
        <Navbar cartCount={cartItems.length} onCartClick={handleCartClick} />

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Slider />
                <section id="medicine" className="medicine-section">
                  <MedicineList onAddToCart={handleAddToCart} />
                </section>

                <section id="about" className="section">
                  <h2>About Us</h2>
                  <p>
                    We provide premium services and design experiences to make
                    your brand stand out.
                  </p>
                </section>
                <section id="services" className="section dark">
                  <h2>Our Services</h2>
                  <ul>
                    <li>Web Development</li>
                    <li>App Design</li>
                    <li>Branding & Marketing</li>
                  </ul>
                </section>
                <section id="contact" className="section">
                  <h2>Contact Us</h2>
                  <p>Email us at support@example.com</p>
                </section>
                <footer id="footer" className="footer">
                  <p>&copy; 2025 MyLanding. All rights reserved.</p>
                </footer>
              </>
            }
          />

          {/* Checkout Page */}
          <Route
            path="/checkout"
            element={<Checkout cartItems={cartItems} />}
          />

          {/* Admin Protected Route */}
          <Route
            path="/admin"
            element={
              <div style={{ padding: "4rem", textAlign: "center" }}>
                <h2>Access Denied</h2>
                <p>You must be an admin to access this page.</p>
              </div>
            }
          />
        </Routes>

        {/* Cart Popup */}
        {isCartOpen && (
          <Cart 
            cartItems={cartItems} 
            onClose={() => setIsCartOpen(false)} 
          />
        )}
      </div>
    </Router>
  );
}

export default App;
