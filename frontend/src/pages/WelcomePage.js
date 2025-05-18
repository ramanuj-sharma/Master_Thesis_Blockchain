import React from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import "../styles.css";

export default function WelcomePage() {
  const navigate = useNavigate();

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        
        // Store wallet info in sessionStorage
        const networkDetails = await provider.getNetwork();
        sessionStorage.setItem("userAddress", userAddress);
        sessionStorage.setItem("network", networkDetails.name);
        
        console.log("Wallet connected:", userAddress);
        console.log("Connected to network:", networkDetails.name);
        
        // Navigate to features page after successful connection
        navigate("/features");
      } catch (error) {
        console.error("Error connecting wallet:", error);
        alert("Failed to connect wallet. Please try again.");
      }
    } else {
      alert("MetaMask not detected! Please install it.");
    }
  }

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>Welcome to Enhanced Account</h1>
        <p>A secure and feature-rich blockchain account management system</p>
        <button onClick={connectWallet} className="connect-button">
          Connect Wallet
        </button>
      </div>
    </div>
  );
} 