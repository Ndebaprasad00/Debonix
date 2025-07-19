// src/components/AuthModal.js
import React from "react";
import "./AuthModal.css";

const AuthModal = ({ isOpen, onClose, isLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>{isLogin ? "Login to Your Account" : "Create an Account"}</h2>
        <form className="auth-form">
          {!isLogin && (
            <input type="text" placeholder="Full Name" required />
          )}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <p className="switch-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={onClose}>Switch</span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
