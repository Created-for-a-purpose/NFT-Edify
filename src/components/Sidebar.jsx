import React from 'react';
import './Sidebar.css'; 

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <h2>Hello 👋</h2>
        <ul>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#gift-cards">Gift someone 🎉</a></li>
          <li><a href="#gift-cards">Your gifts 🎁</a></li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;