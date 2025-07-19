// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import AdminPanel from "./components/AdminPanel";

import "./App.css";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);   // real admin state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // real login state

  return (
    <Router>
      <div>
        {/* Pass props to Navbar */}
        <Navbar
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Slider />
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
              isAdmin ? (
                <AdminPanel />
              ) : (
                <div style={{ padding: "4rem", textAlign: "center" }}>
                  <h2>Access Denied</h2>
                  <p>You must be an admin to access this page.</p>
                </div>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
