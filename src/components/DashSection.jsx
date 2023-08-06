
import React from 'react';
import './DashSection.css'; 

const DashSection = ({ selectedContent }) => {
  
  return (
    <div className="right-section">
      <h2>{selectedContent}</h2>
    </div>
  );
}

export default DashSection;
