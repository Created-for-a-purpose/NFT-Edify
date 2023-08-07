import "./Verify.css"
import Navbar from "../components/Navbar"
import { useState } from "react";

const Verify = ()=>{
    const [verified, setVerified] = useState(true);

    return(
        <>
        <Navbar/>
        <div className="verify">
          <div className="verify-container">
            <h1>🔑 Verify skills using ZKPs</h1>
            <p>&#9094; Enter the proof of skill</p>
            <textarea placeholder="Proof..."/>
            <button>Verify</button>
            {verified && <p className="verify-container-result">Verified! You are a skilled dev</p>}
          </div>
        </div>
        </>
    )
}

export default Verify;