
import React from 'react';
import './DashSection.css'; 

const DashSection = ({ selectedContent }) => {
  
  return (
    <>
    {
      selectedContent === 'skills' &&
    <div className="right-section">
      <h2>Your skills 🥇</h2>
    </div>
   }
   {
       selectedContent === 'gift' &&
       <div className="right-section">
         <h2>Create a gift card 🎉</h2>
       </div>
   }
   {
        selectedContent === 'gifts' &&
        <div className="right-section">
          <h2>Your gift cards 🎁</h2>
        </div>
   }
    </>
  );
}

export default DashSection;
