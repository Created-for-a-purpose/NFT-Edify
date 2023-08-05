import React from "react";
import Navbar from "../components/Navbar";
import "./LandingPage.css"

const LandingPage = () => {
    return (
        <>
       <Navbar/>
       <section className="hero">
        <div className="container">
          <h1>NFT Edify</h1>
          <p>Empowering Decentralized & Verifiable Credentials, Knowledge Sharing and Incredible Learning !</p>
        </div>
      </section>
      <section className="hero">
        <div className="container">
          <p style={{fontWeight: 'bold'}}>Powered by</p>
          <div className="logos">
          <img className='logo-image' src="https://storage.googleapis.com/ethglobal-api-production/organizations%2Frmkrz%2Flogo%2F1664911760503_optimism.jpeg"/>
          <img className='logo-image' src="https://storage.googleapis.com/ethglobal-api-production/organizations%2Fh5ps8%2Flogo%2F1678294488367_W-9qsu1e_400x400.jpeg"/>
          <img className='logo-image' src="https://storage.googleapis.com/ethglobal-api-production/organizations%2Ff2so0%2Flogo%2F1690573556900_Zorb%20Core%20SVG.svg"/>
          <img className='logo-image' src="https://storage.googleapis.com/ethglobal-api-production/organizations%2Fgt566%2Fimages%2FBlue.png"/>
          <img className='logo-image' src="https://storage.googleapis.com/ethglobal-api-production/organizations%2Fdxcvz%2Flogo%2F1686343659783_eas-logo.png"/>
          </div>
        </div>
      </section>
       </>
    );
 
}

export default LandingPage;