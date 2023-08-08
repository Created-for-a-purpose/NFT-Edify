import React, {useEffect, useState} from 'react';
import './DashSection.css'; 
import { useNetwork, useAccount } from 'wagmi';
import { ZDK } from '@zoralabs/zdk';
const API_ENDPOINT = "https://api.zora.co/graphql";
const zdk = new ZDK({ endpoint: API_ENDPOINT });

const DashSection = ({ selectedContent }) => {
  const {chain} = useNetwork();
  const account = useAccount();

  const [toSearch, setToSearch] = useState('');
  const [nfts, setNfts] = useState([]);
  const [atts, setAtts] = useState([]);

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
    return;
   }

   if(chain && chain.name === 'Ethereum'){
     loadZoraNfts();
   }
   else loadNfts();
  }, [chain]);

  useEffect(() => {
    async function loadAttestations(){
        let atts = [];
        let att = JSON.parse(localStorage.getItem(account.address+'/'+'1'));
        if(att) atts.push(att);
        att = JSON.parse(localStorage.getItem(account.address+'/'+'2'));
        if(att) atts.push(att);
        setAtts(atts)
    }
    if(selectedContent === 'attestations'){
      loadAttestations();
    }
  }, [selectedContent]);

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
        nfts && chain && chain.name==='Ethereum' && nfts.map((nft, index) => {
        return <div className="right-section-content-card" key={index}>
          <div className="right-section-content-card-title">
          {nft.name}
          </div>
          <img src="https://www.shutterstock.com/image-vector/attestation-icon-symbol-flat-design-600w-1254143218.jpg" className="right-section-content-card-image"/>
          <div className="right-section-content-card-desc">
           Course: Demo
          </div>
          <div className="right-section-content-card-desc">
           Grades: 4/5
          </div>
          <div className="right-section-content-card-desc">
           EAS UID: 0x123456789
          </div>
        </div>
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
          <h1 className='attestation-content-title'>Attestation 1</h1>
          <p className='attestation-content-desc'>Hi</p>
          <p className='attestation-content-desc'>Hi</p>
          <p className='attestation-content-desc'>Hi</p>
          <p className='attestation-content-desc'>Hi</p>
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
