import "./ContentDetail.css"
import Navbar from "../components/Navbar"
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk"
import { useAccount } from "wagmi";
import {  writeContract } from "wagmi/actions";
import { skillNftAddress, skillNftAbi} from "../constants"
import { ethers } from "ethers";

const EASContractAddress = "0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A";
const eas = new EAS(EASContractAddress);

const ContentDetail = () => {
const account = useAccount();
const {pathname} = useLocation();
const id = pathname.split("/")[2];
const title = (id==='1')?("Solidity course for beginners"):("Make your First Dapp tutorial")
const videolink = (id==='1')?(""):("")
const skill = (id==='1')?("Smart Contract Development"):("Fullstack Web3 development")
const [show, setShow] = useState(false);
const [hash, sethash] = useState("");

const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = new ethers.Wallet("cde2be96e27d483b8b1bf45b68d5b721d891371689c358f2d1497054c07609b4", provider);

const mint = async () => {
    if(!show) return;

    try{
          eas.connect(signer);

       const schemaEncoder = new SchemaEncoder("uint64 courseId, string courseName, string grades, string skill, string personalInformation");
       const courseId = Number(id);
      const encodedData = schemaEncoder.encodeData([
        {name: "courseId", value: courseId, type: "uint64"},
        {name: "courseName", value: title, type: "string"},
        {name: "grades", value: "4/5", type: "string"},
        {name: "skill", value: skill, type: "string"},
        {name: "personalInformation", value: "Some personal data", type: "string"},
      ]);

      const schemaUID = "0xc654a0417289e5acb2b16a06d8a9d8bc7da5aad2f7d13f74b59bffa11d0c80ee"
      const tx = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: account.address,
          expirationTime: 0,
          revocable: true,
          data: encodedData,
        },
      });
      
      const newAttestationUID = await tx.wait();
      console.log(newAttestationUID);
      
      const {hash} = await writeContract({
        address: skillNftAddress,
        abi: skillNftAbi,
        functionName: "mint",
        args: [newAttestationUID]
      })

      sethash(hash);
      
    }
    catch(err){
        console.log(err);
    }
}

return(
   <>
    <Navbar/>
    <div className="content-detail">
        <video className="content-detail-video" width="320" height="240" controls>
            <source src={videolink} type="video/mp4"/>
            Video
        </video>
        <div className="content-detail-info">
            <h1 className="content-detail-title">{title}</h1>
            <div className="content-detail-desc">
            <p><i><b>i</b></i>&nbsp; On completing this course, you will get a new skill...</p>
            <p>New skill: {skill}</p>
            </div>
            <p> <button onClick={()=> setShow(true)}>Take Quiz</button>{show && <span>Grades: 4/5</span>}</p>
            <div className="content-detail-desc">
            <p><i><b>i</b></i>&nbsp; Get EAS skill attestation and mint your skill NFT !</p>
            </div>
            <button onClick={mint}>Attest & Mint</button>{hash!=="" && <a target="_blank" href={"https://goerli.basescan.org/tx/"+hash}><p>View on BaseScan</p></a>}
        </div>
    </div>
   </>
)
}

export default ContentDetail; 