import React, { useState, useEffect } from 'react';
import './App.css';
import Web3Modal from "web3modal";
import { ethers } from "ethers";

function trimAddress(address) {
  const length = address.length;
  const trimmedAddress = address.slice(0, 4) + "...." + address.slice(length - 4, length);
  return trimmedAddress;
}


function App() {
  const [connectedWallet, setConnectedWallet] = useState(false);
  const [WalletAddress, setWalletAddress] = useState(null)
  const [isSignedWallet,setSignedWallet] = useState(false)


  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWalletAddress(address)

  };
  const SigningKey = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const message = "Verify wallet connection";
    const signature = await signer.signMessage(message);
    if(signature){
      setSignedWallet(true)
    }
  
  }


  // Check if wallet is connected on component mount
  useEffect(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {

    }
  }, []);

  return (
    <div className="App">
      
      <div className="mid-section">
        <h1 className="welcome-text">Welcome To Fedha.io</h1>
        <button
          className="connect-wallet-button"
          disabled={connectedWallet}
          onClick={() => { connectWallet() }}
        >
          {connectedWallet ? "Connected" : "Connect Wallet"}
        </button>
        {WalletAddress && <>
          <p>Connected account: {trimAddress(WalletAddress)}</p>
          {
            !isSignedWallet &&    <button className="connect-wallet-button"
            onClick={() => { SigningKey() }}
          >
            Sign In
          </button>
          }
       
        </>}

      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Fedha.io. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
