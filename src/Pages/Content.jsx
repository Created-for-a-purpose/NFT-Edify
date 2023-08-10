import "./Content.css"
import Navbar from "../components/Navbar"
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { stringToHex } from "viem";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk"
import { useAccount } from "wagmi";
import { ethers } from "ethers";

const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
const eas = new EAS(EASContractAddress);

const Content = () => {
  const navigate = useNavigate();
  const account = useAccount();
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = new ethers.Wallet("cde2be96e27d483b8b1bf45b68d5b721d891371689c358f2d1497054c07609b4", provider);
  
  const get = async (e)=>{
    try{
      const courseId = stringToHex(e.target.id, { size: 32});
      const courseName = e.target.name;
        eas.connect(signer);

      const schemaEncoder = new SchemaEncoder("bytes32 courseId, string courseName, uint64 purchaseDate");
      const encodedData = schemaEncoder.encodeData([
        {name: "courseId", value: courseId, type: "bytes32"},
        {name: "courseName", value: courseName, type: "string"},
        {name: "purchaseDate", value: Date.now(), type: "uint64"}
      ]);
      
      const schemaUID = "0xeb368690076a0c299465f38b48847d7f40b3ecdf25bbd769acd984d98ea612c6";
      const expiration = (e.target.id==='1') ? 0: Date.now()+3600; 

      const tx = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: account.address,
          expirationTime: expiration,
          revocable: true,
          data: encodedData,
        },
      });
      
      const newAttestationUID = await tx.wait();

      console.log('att', newAttestationUID);
      localStorage.setItem(account.address+'/'+e.target.id, newAttestationUID);
      
    } catch(e){ console.log(e)}
    }

    return(
      <>
      <Navbar/>
      <div className="content">
        <div className="content-card">
            <img src="https://cointral.com/wp-content/uploads/2019/11/solidity-nedir.png"/>
            <div className="content-card-details">
            <h1>Solidity course for beginners <span onClick={()=> navigate("/content/1")}>▶️</span></h1>
            <p>Created by 0x4ceb38DFc5aDbB1B98CB55892F6e27Ee032115E7</p>
            <button onClick={get} id="1" name="Solidity course for beginners">Get for free !</button> 
            </div> 
        </div>

        <div className="content-card">
            <img src="https://kingslanduniversity.com/wp-content/uploads/2019/06/dapps-1024x512.jpg"/>
            <div className="content-card-details">
            <h1>Make your First Dapp tutorial <span onClick={()=> navigate("/content/2")}>▶️</span></h1>
            <p>Created by 0x4ceb38DFc5aDbB1B98CB55892F6e27Ee032115E7</p>
            <button onClick={get} id="2" name="Make your First Dapp tutorial">Free for 1 hour !</button>
            </div>
        </div>
      </div>
      </>
    );

}

export default Content;