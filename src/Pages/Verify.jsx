import "./Verify.css"
import Navbar from "../components/Navbar"
import { useState } from "react";
import { readContract } from "wagmi/actions";
import { verifierABI, verifierAddress } from "../constants";
import axios from "axios";

const Verify = ()=>{
    const [verified, setVerified] = useState(null);
    const [proof, setProof] = useState(null);
    const [recipient, setRecipient] = useState(null);

    const verifyOn = async ()=>{
      try{
        const submittedProof = JSON.parse(proof);
        const _proof = submittedProof.proof;
        const proof1 = _proof.split('][')[0].slice(1)
        const proof2 = _proof.split('][')[1].slice(0,-1)
        setRecipient(submittedProof.recipient);

        let proof1arr = [], proof2arr = [];
        proof1.split(',').forEach((item)=>proof1arr.push(item));
        proof2.split(',').forEach((item)=>proof2arr.push(item));
        proof1arr = proof1arr.map(hexString => hexString.replace(/"/g, ''));
        proof2arr = proof2arr.map(hexString => hexString.replace(/"/g, ''));

        const result = await readContract({
          abi: verifierABI,
          address: verifierAddress,
          functionName: "verifyProof",
          args: [proof1arr, proof2arr]
        })

        setVerified(result);
      } catch(err){
        console.log(err);
      }
    }

    const verifyOff= async ()=>{
       try{
          const submittedProof = JSON.parse(proof);
          const _proof = submittedProof.proof;
          const publicSignals = submittedProof.signals;
          setRecipient(submittedProof.recipient);
          
          const vkey = await fetch("http://localhost:8000/verification_key.json").then((res)=>res.json())

          let reqConfig = {
            url: "http://localhost:8000/verifyProof",
            method: 'POST',
            data: {vkey, publicSignals,  _proof}
          }

          await axios.request(reqConfig).then((res)=>{
            setVerified(res.data);
          }).catch((err)=>{
            console.log(err);
            setVerified(false);
          })
          
       }
        catch(err){
            console.log(err);
        }
    }

    return(
        <>
        <Navbar/>
        <div className="verify">
          <div className="verify-container">
            <h1>🔑 Verify skills using ZKPs</h1>
            <p>&#9094; Enter the proof of skill</p>
            <textarea placeholder="Proof..." onChange={(e)=>setProof(e.target.value)}/>
            <button onClick={verifyOn}>Verify ZK Proof</button>
            {false && <button onClick={verifyOff}>Verify {'(OffChain)'}</button>}
            {verified!==null && <>
            <p className="verify-container-result">Prover: {recipient}<br/>
            {verified===true?(<>Verified ✅ The prover is a skilled developer !</>):(<>False claim ! ❌</>)}</p>
            </>}
          </div>
        </div>
        </>
    )
}

export default Verify;