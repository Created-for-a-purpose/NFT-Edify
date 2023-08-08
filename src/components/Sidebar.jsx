import React from 'react';
import './Sidebar.css'; 

const Sidebar = ({handleContent}) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <h2>Hello! 👋</h2>
        <ul>
          <li onClick={()=>handleContent('skills')}>Skills 🥇</li>
          <li onClick={()=>handleContent('attestations')}>Attestations 🎫</li>
          <li onClick={()=>handleContent('gift')}>Gift someone 🎉</li>
          <li onClick={()=>handleContent('gifts')}>Your gifts 🎁</li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;