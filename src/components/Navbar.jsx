import React from 'react';
import './Navbar.css'; 
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container">
        <div>
        <img src="https://previews.123rf.com/images/ylivdesign/ylivdesign2110/ylivdesign211015981/176497238-attestation-award-icon-outline-attestation-award-vector-icon-color-flat-isolated.jpg" alt="Your DApp Logo" className="logo" />
        </div>
        <nav>
          <ul>
            <li><a href="">Dashboard</a></li>
            <li><a href="">Educational Content</a></li>
            <li><a href="">Community</a></li>
          </ul>
        </nav>
        <div><ConnectButton/></div>
      </div>
    </header>
  );
}

export default Navbar;
