import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { FaBars, FaTimes, FaUserCircle, FaRocket } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ cartCount, onCartClick, onSearch }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn") === "true";
    const admin = sessionStorage.getItem("isAdmin") === "true";
    setIsLoggedIn(loggedIn);
    setIsAdmin(admin);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsAdmin(false);
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("isAdmin", "false");
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setDropdownOpen(false);
    sessionStorage.clear();
  };

  const handleRegisterSubmit = async () => {
    try {
      const res = await fetch("http://localhost/Debonix/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ " + data.message);
        setIsLoggedIn(true);
        const isAdminUser = data.role === "admin";
        setIsAdmin(isAdminUser);
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("isAdmin", isAdminUser ? "true" : "false");
        setShowRegister(false);
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPassword("");
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      alert("⚠️ Network Error: " + error.message);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 150;
      const contact = document.getElementById("contact");
      const services = document.getElementById("services");
      const about = document.getElementById("about");

      if (contact && scrollY >= contact.offsetTop - offset) {
        setActiveSection("contact");
      } else if (services && scrollY >= services.offsetTop - offset) {
        setActiveSection("services");
      } else if (about && scrollY >= about.offsetTop - offset) {
        setActiveSection("about");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <FaRocket className="logo-icon" />
          <span className="logo-text">Debonix</span>
        </div>

        {/* 🔎 Search Bar */}
        <div className="nav-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="/" className={activeSection === "home" ? "active" : ""}>
            Home
          </a>

          {/* 🛒 Cart */}
          <button className="cart-btn" onClick={onCartClick}>
            🛒 Cart ({cartCount})
          </button>

          {/* 🔑 Admin Panel Link */}
          {isLoggedIn && isAdmin && (
            <Link to="/admin" className="admin-link">
              Admin Panel
            </Link>
          )}

          {/* 👤 Profile or Login */}
          {!isAdminPage &&
            (isLoggedIn ? (
              <div
                className="nav-dropdown"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <span className="nav-user">
                  <FaUserCircle size={20} /> Profile
                </span>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <a href="/profile">My Account</a>
                    <a href="/settings">Settings</a>
                    <a href="#logout" onClick={handleLogout}>
                      Logout
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <button onClick={() => setShowLogin(true)}>Login</button>
              </div>
            ))}
        </div>

        <div className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </div>
      </nav>

      {/* 🔐 Login Modal */}
      {showLogin && (
        <div
          className="modal-overlay fancy"
          onClick={() => setShowLogin(false)}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setShowLogin(false)}>
              &times;
            </span>
            <div className="modal-header login">
              <h2>Welcome Back 👋</h2>
              <p>Login to continue exploring</p>
            </div>
            <div className="modal-body">
              <input
                type="email"
                placeholder="📧 Email"
                className="modal-input"
              />
              <input
                type="password"
                placeholder="🔒 Password"
                className="modal-input"
              />
              <button className="modal-btn" onClick={handleLogin}>
                Login
              </button>
              <p className="switch-text">
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    setShowLogin(false);
                    setShowRegister(true);
                  }}
                >
                  Register Now
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 📝 Register Modal */}
      {showRegister && (
        <div
          className="modal-overlay fancy"
          onClick={() => setShowRegister(false)}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setShowRegister(false)}>
              &times;
            </span>
            <div className="modal-header register">
              <h2>Join Us Today 🎉</h2>
              <p>Create your account below</p>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="👤 Full Name"
                className="modal-input"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
              />
              <input
                type="email"
                placeholder="📧 Email"
                className="modal-input"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="🔒 Password"
                className="modal-input"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <button className="modal-btn" onClick={handleRegisterSubmit}>
                Register
              </button>
              <p className="switch-text">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setShowRegister(false);
                    setShowLogin(true);
                  }}
                >
                  Login Here
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
