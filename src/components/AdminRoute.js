// components/AdminRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role"); // "admin" or "user"
  const isAdmin = role === "admin";

  return isAdmin ? (
    children
  ) : (
    <div style={{ padding: "4rem", textAlign: "center" }}>
      <h2>Access Denied</h2>
      <p>You must be an admin to access this page.</p>
    </div>
  );
};

export default AdminRoute;
