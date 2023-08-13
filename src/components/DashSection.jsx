import React, {useEffect, useState} from 'react';
import './DashSection.css'; 
import { useNetwork, useAccount } from 'wagmi';
import { readContract } from 'wagmi/actions';
import { skillNftAddress, skillNftAbi} from "../constants"
import { EAS } from "@ethereum-attestation-service/eas-sdk";
import axios from 'axios';
import { ethers } from "ethers";
import { ZDK } from '@zoralabs/zdk';

const API_ENDPOINT = "https://api.zora.co/graphql";
const zdk = new ZDK({ endpoint: API_ENDPOINT });

const EASContractAddress = "0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A";
const eas = new EAS(EASContractAddress);

const DashSection = ({ selectedContent }) => {
  const {chain} = useNetwork();
  const account = useAccount();

  const [toSearch, setToSearch] = useState('');
  const [nfts, setNfts] = useState([]);
  const [atts, setAtts] = useState([]);
  const [flip, setFlip] = useState(false);
  const [proof, setProof] = useState(null);

  const process = (string) => {
      // convert hex to bit string
      let bitString = '';
      for(let i=2; i<string.length; i++){
        const bits = parseInt(string[i], 16).toString(2);
        bitString += bits.padStart(4, '0');
      }
      // convert bit string to array of bits
      let bits = [];
      for(let i=0; i<bitString.length; i++){
        bits.push(bitString[i]);
      }
      return bits;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(proof));
  }

  const generateProof = async (uid) => {
       try{
        const provider = new ethers.BrowserProvider(window.ethereum);
           eas.connect(provider);
           const attestation = await eas.getAttestation(uid);
            console.log(attestation);
            let schema = attestation[1]
            schema = process(schema)
            const expiration = Number(attestation[3].toString())
            const recipient = attestation[6]
            let attestor = attestation[7]
            attestor = process(attestor)

         const signals= {
          attestor, 
          schema,
          expiration,
          expExpiration: 0
         }

         let reqConfig = {
          url: "http://localhost:8000/generateProof",
          method: 'POST',
          data: signals
         }

         await axios.request(reqConfig).then((res) => {
          setProof({proof: res.data.callData,
          signals: res.data.publicSignals,
          recipient: recipient
         });
         }
          ).catch((err) => { console.log(err) } )
          
       }
       catch(e){
         console.log(e);
       }
  }

  const warp = async (id) => {
       try{
           
       }
        catch(e){
          console.log(e);
        }
  }

  const search = async () => {
     if(!chain && chain.name!== 'Ethereum') return;
     if(toSearch === '') return;
         const args = {
      query: toSearch,
      filter: { 
        collectionAddresses: [], 
        entityType: 'TOKEN' 
      },
      pagination: { limit: 2 } 
    };
   const response = await zdk.search(args);
    console.log(response.search.nodes);
   setNfts(response.search.nodes);
     setToSearch('');
  }

  useEffect(() => {
   async function loadZoraNfts(){
    let tokens = []
    let args = {
      token: {
        address: "0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63",
        tokenId: "1480"
      },
      includeFullDetails: false 
    }
    let response = await zdk.token(args);
    tokens.push(response.token.token)
     args = {
      token: {
        address: "0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63",
        tokenId: "105"
      },
      includeFullDetails: false 
    }
    response = await zdk.token(args);
    tokens.push(response.token.token)
    args = {
      token: {
        address: "0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63",
        tokenId: "167"
      },
      includeFullDetails: false 
    }
    response = await zdk.token(args);
    tokens.push(response.token.token)
    setNfts(tokens);
   }

   async function loadNfts(){
     try{
        const totalSupply = await readContract({
      abi: skillNftAbi,
      address: skillNftAddress,
      functionName: 'totalSupply',
        })

        let tokens = []
        for(let i=1; i<=totalSupply; i++){
          const owner = await readContract({
      abi: skillNftAbi,
      address: skillNftAddress,
      functionName: 'ownerOf',
      args: [i]
        })
        if(owner === account.address)
        tokens.push(i)
        }

        let nfts = [];
        for(let i=0; i<tokens.length; i++){
          const eas_uid = await readContract({
      abi: skillNftAbi,
      address: skillNftAddress,
      functionName: 'getEASUID',
      args: [tokens[i]]
        })
        nfts.push({
          name: 'Skill',
          uid: eas_uid,
          tokenId: tokens[i]
        })
      }
      setNfts(nfts);
     }
      catch(e){
        console.log(e);
      }
   }

   if(chain && chain.name === 'Ethereum'){
     loadZoraNfts();
   }
   else loadNfts();
  }, [chain]);

  useEffect(() => {
    async function loadAttestations(){
        let atts = [];
        let att = localStorage.getItem(account.address+'/'+'1');
        if(att) atts.push({uid: att, id: 1});
        att = localStorage.getItem(account.address+'/'+'2');
        if(att) atts.push({uid: att, id: 2});
        setAtts(atts)
    }
    if(selectedContent === 'attestations'){
      loadAttestations();
    }
  }, [selectedContent]);
  
  const oplogo = "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png?v=026"
  const baselogo = "https://storage.googleapis.com/ethglobal-api-production/organizations%2Fh5ps8%2Flogo%2F1678294488367_W-9qsu1e_400x400.jpeg"

  return (
    <>
    {
      selectedContent === 'skills' &&
    <div className="right-section">
      <div className="right-section-top">
      <h2>Your skills 🥇</h2>
      <input className='right-section-search' onChange={(e)=>setToSearch(e.target.value)} value={toSearch} placeholder='Search...'/>
      <p className='search-on' onClick={search}>🕵</p>
      </div>
      <div className="right-section-content">
      {
        nfts  && nfts.map((nft, index) => {
        return (<div className="right-section-content-card" key={index}>
          {flip===false && <>
          <div className='right-section-content-card-top'>
          <div className="right-section-content-card-title">
          {nft.name}
          </div>
          <img className='right-section-content-card-chain' src={baselogo}/></div>
          <img src="https://www.shutterstock.com/image-vector/attestation-icon-symbol-flat-design-600w-1254143218.jpg" className="right-section-content-card-image"/>
          <div className="right-section-content-card-desc">
           Course: {nft.name==='Skill'? "Solidity course for beginners": "Demo"}
          </div>
          <div className="right-section-content-card-desc">
           Skill: {nft.name==='Skill'? "Smart Contract Development": "Demo"}
          </div>
          <div className="right-section-content-card-desc">
           Grades: 4/5
          </div>
          <div className="right-section-content-card-desc">
           EAS scan: <a target='_blank' href={"https://base-goerli.easscan.org/attestation/view/"+nft.uid}>Click</a>
        </div>
          <span className='card-flip-button' onClick={()=>setFlip(!flip)}>⏩</span>
        </>
        }
          {flip===true&& <>
          <div className="right-section-content-card-desc">
           <b><i>i</i></b>&nbsp; We value your privacy ! Prove your skill using ZK
          </div>
          <button className="card-flip-proof-button" onClick={()=>generateProof(nft.uid)}>Generate ZK Proof</button>
          {proof!==null && <div className="card-flip-copy">Copy Proof --{'>'}<span className='card-flip-copy-emoji' onClick={copyToClipboard}>📜</span></div>}
          <div className="right-section-content-card-desc">
          <b><i>i</i></b>&nbsp; Warp your skill to another chain
          <button className="card-flip-bridge-button" onClick={()=>warp(nft.tokenId)}>Warp to Optimism</button>
          </div>
          <span className='card-flip-button' onClick={()=>setFlip(!flip)}>⏪</span>
          </>
        }
          </div>
        )
        })
    }
      </div>
    </div>
   }
   
   {
       selectedContent === 'attestations' &&
       <div className="right-section">
         <h2>Your EAS attestations 🎫</h2>
        { atts && atts.map((att, index) => {
         return <div className="right-section-attestationData" key={index}>
          <h1 className='attestation-content-title'>{att.id===1 ? ("Solidity course for beginners") : ("Make your First Dapp tutorial")}</h1>
          <p className='attestation-content-desc'>UID : {att.uid}</p>
          <p className='attestation-content-desc'>EAS Scan ➚ : <a target="_blank" href={"https://base-goerli.easscan.org/attestation/view/"+att.uid}>Click</a></p>
          <p className='attestation-content-desc'>Expires : {att.id===1?" Never": "In 1 hour"}</p>
         </div>})}
         
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
