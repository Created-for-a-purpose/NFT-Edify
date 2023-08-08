import "./Content.css"
import Navbar from "../components/Navbar"
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { stringToHex } from "viem";
import { EAS, Offchain, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk"
import { useAccount } from "wagmi";
import { ethers } from "ethers";

const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
const eas = new EAS(EASContractAddress);

const Content = () => {
    const navigate = useNavigate();
    const account = useAccount();

    const get = async (e)=>{
      const courseId = stringToHex(e.target.id, { size: 32});
      const provider = new ethers.BrowserProvider(window.ethereum);
      eas.connect(provider)
      const signer = new ethers.Wallet("cde2be96e27d483b8b1bf45b68d5b721d891371689c358f2d1497054c07609b4", provider);
      const offchain = await eas.getOffchain();
      const schemaEncoder = new SchemaEncoder("bytes32 courseId, string courseName, uint64 purchaseDate");
      const encodedData = schemaEncoder.encodeData([
        {name: "courseId", value: courseId, type: "bytes32"},
        {name: "courseName", value: "Solidity course for beginners", type: "string"},
        {name: "purchaseDate", value: Date.now(), type: "uint64"}
      ]);
      const expiration = (courseId==='1') ? 0: Date.now()+3600; 
      const offchainAttestation = await offchain.signOffchainAttestation({
        recipient: account.address,
        expirationTime: expiration,
        time: Date.now(),
        revocable: true,
        version: 1,
        nonce: 0,
        schema: "0xeb368690076a0c299465f38b48847d7f40b3ecdf25bbd769acd984d98ea612c6",
        refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
        data: encodedData,
      }, signer);

      console.log('att', offchainAttestation);
      localStorage.setItem(account.address+'/'+courseId, offchainAttestation);
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
            <button onClick={get} id="1">Get for free !</button> 
            </div> 
        </div>

        <div className="content-card">
            <img src="https://kingslanduniversity.com/wp-content/uploads/2019/06/dapps-1024x512.jpg"/>
            <div className="content-card-details">
            <h1>Make your First Dapp tutorial <span onClick={()=> navigate("/content/2")}>▶️</span></h1>
            <p>Created by 0x4ceb38DFc5aDbB1B98CB55892F6e27Ee032115E7</p>
            <button onClick={get} id="2">Free for 1 hour !</button>
            </div>
        </div>
      </div>
      </>
    );

}

export default Content;