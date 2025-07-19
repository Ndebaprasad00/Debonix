import React from "react";
import "./AdminPanel.css";

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <h1>Welcome to the Admin Panel</h1>

      <div className="admin-grid">
        <div className="admin-section">
          <h2>Manage Users</h2>
          <p>View, add, or remove registered users from your platform.</p>
          <button className="admin-btn">View Users</button>
        </div>

        <div className="admin-section">
          <h2>Site Settings</h2>
          <p>Update homepage content, change banners, and more.</p>
          <button className="admin-btn">Edit Settings</button>
        </div>

        <div className="admin-section">
          <h2>Feedback & Messages</h2>
          <p>Read and reply to user messages or contact form submissions.</p>
          <button className="admin-btn">View Feedback</button>
        </div>

        <div className="admin-section">
          <h2>Analytics</h2>
          <p>Track user visits, session time, and engagement statistics.</p>
          <button className="admin-btn">View Reports</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
