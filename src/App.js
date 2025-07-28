// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
// import AdminPanel from "./components/AdminPanel";
import MedicineList from "./components/MedicineList";
import Cart from "./components/Cart";

import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]); // Store added medicines
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Handle adding items to cart
  const handleAddToCart = (medicine) => {
    setCartItems((prev) => [...prev, medicine]);
  };

  // Open/close cart popup
  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  return (
    <Router>
      <div>
        {/* Navbar with cart count */}
        <Navbar cartCount={cartItems.length} onCartClick={handleCartClick} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Slider />

                <section id="medicine" className="medicine-section">
                  {/* Pass add to cart handler */}
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
          <Cart cartItems={cartItems} onClose={() => setIsCartOpen(false)} />
        )}
      </div>
    </Router>
  );
}

export default App;
