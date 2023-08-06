import "./Content.css"
import Navbar from "../components/Navbar"
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Content = () => {
    const navigate = useNavigate();
    return(
      <>
      <Navbar/>
      <div className="content">
        <div className="content-card">
            <img src="https://cointral.com/wp-content/uploads/2019/11/solidity-nedir.png"/>
            <div className="content-card-details">
            <h1>Solidity course for beginners <span onClick={()=> navigate("/content/1")}>▶️</span></h1>
            <p>Created by 0x</p>
            <button>Get for free !</button> 
            </div> 
        </div>

        <div className="content-card">
            <img src="https://kingslanduniversity.com/wp-content/uploads/2019/06/dapps-1024x512.jpg"/>
            <div className="content-card-details">
            <h1>Make your First Dapp tutorial <span onClick={()=> navigate("/content/2")}>▶️</span></h1>
            <p>Created by 0x</p>
            <button>Free for 1 hour !</button>
            </div>
        </div>
      </div>
      </>
    );

}

export default Content;