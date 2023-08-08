import './App.css';
import React from 'react';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import Content from './Pages/Content';
import ContentDetail from './Pages/ContentDetail';
import Verify from './Pages/Verify';
import { Route, Routes } from 'react-router-dom';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {
  hardhat, mainnet, optimism, optimismGoerli, baseGoerli, zoraTestnet
} from 'wagmi/chains';
const { chains, publicClient } = configureChains(
  [mainnet, optimism, optimismGoerli, baseGoerli, zoraTestnet, hardhat],
  [
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'CB',
  projectId: 'cbabb06b3a049fce0e9231318d94998e',
  chains
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
    <Routes>
     <Route exact path = "/" element={<LandingPage path="/" />}/>
     <Route exact path = "/dashboard" element={<Dashboard path="/dashboard" />}/>
     <Route exact path = "/content" element={<Content path="/content" />}/>
     <Route exact path = "/content/:id" element={<ContentDetail path="/content:id" />}/>
     <Route exact path = "/verify" element={<Verify path="/verify" />}/>
    </Routes>
    </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
