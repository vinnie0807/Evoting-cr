// client/src/components/AdminPanel.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPanel.css';

function AdminPanel() {
  return (
    <div className="admin-panel-container">
      <h2>Admin Panel</h2>
      <div className="admin-actions">
        <Link to="/admin/add-candidate">Add Candidate</Link>
        {/* <Link to="/register">Register New User</Link> */}
      </div>
    </div>
  );
}

export default AdminPanel;