import "./Content.css"
import Navbar from "../components/Navbar"
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { stringToHex } from "viem";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk"
import { useAccount } from "wagmi";
import { ethers } from "ethers";

const EASContractAddress = "0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A";
const eas = new EAS(EASContractAddress);

const Content = () => {
  const navigate = useNavigate();
  const account = useAccount();
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = new ethers.Wallet("cde2be96e27d483b8b1bf45b68d5b721d891371689c358f2d1497054c07609b4", provider);

  const [button1, setButton1] = useState('Get for free !');
  const [button2, setButton2] = useState('Free for 1 hour !');
  
  const get = async (e)=>{
    try{
      e.target.id==='1' ? setButton1('Attesting...') : setButton2('Attesting...');
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
      const expiration = (e.target.id==='1') ? 0 : (Math.floor(Date.now()/1000)+60*60); 

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

      console.log('att',e.target.id, newAttestationUID);
      localStorage.setItem(account.address+'/'+e.target.id, newAttestationUID);
      e.target.id==='1' ? setButton1('Hurray !') : setButton2('Hurray !');
      
    } catch(e){ console.log(e)}
    }

    useEffect(()=>{
      const att1 = localStorage.getItem(account.address+'/1');
      const att2 = localStorage.getItem(account.address+'/2');
      if(att1){
        setButton1('Already owned !');
      }
      if(att2){
        setButton2('Already owned !');
      }
    },[])

    return(
      <>
      <Navbar/>
      <div className="content">
        <div className="content-card">
            <img src="https://cointral.com/wp-content/uploads/2019/11/solidity-nedir.png"/>
            <div className="content-card-details">
            <h1>Solidity course for beginners <span onClick={()=> navigate("/content/1")}>▶️</span></h1>
            <p>Created by 0x4ceb38DFc5aDbB1B98CB55892F6e27Ee032115E7</p>
            <button onClick={get} id="1" name="Solidity course for beginners">{button1}</button> 
            </div> 
        </div>

        <div className="content-card">
            <img src="https://kingslanduniversity.com/wp-content/uploads/2019/06/dapps-1024x512.jpg"/>
            <div className="content-card-details">
            <h1>Make your First Dapp tutorial <span onClick={()=> navigate("/content/2")}>▶️</span></h1>
            <p>Created by 0x4ceb38DFc5aDbB1B98CB55892F6e27Ee032115E7</p>
            <button onClick={get} id="2" name="Make your First Dapp tutorial">{button2}</button>
            </div>
        </div>
      </div>
      </>
    );

}

export default Content;