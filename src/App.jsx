import './App.css';
import React from 'react';
import LandingPage from './Pages/LandingPage';
import { Route, Routes } from 'react-router-dom';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {
  hardhat
} from 'wagmi/chains';
const { chains, publicClient } = configureChains(
  [hardhat],
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
    </Routes>
    </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
