import React, { useState } from "react";
import { ethers } from "ethers";

export default function EnhancedAccountUI() {
  const [account, setAccount] = useState(null); // Holds the user's connected account
  const [contract, setContract] = useState(null); // Holds the contract instance
  const [formData, setFormData] = useState({}); // Holds form input data

  const contractAddress = "0x16576Ba3a355c821B56cc9185b6B17721Ee01362"; // Replace with your deployed contract address
  const contractABI = [
    // Paste your contract ABI here
  ];

  // Function to connect the user's wallet
  async function connectWallet() {
    if (window.ethereum) { // Check if MetaMask is installed
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request user's wallet connection
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
      setAccount(await signer.getAddress()); // Store connected account address
      setContract(contractInstance); // Store contract instance
    } else {
      alert("MetaMask not detected!");
    }
  }

  // Generic handler for updating form data state
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Execute a batch of operations
  async function executeBatch() {
    const { dests, values, data } = formData; // Destructure input values
    try {
      const tx = await contract.executeBatch(
        dests.split(","), // Convert comma-separated destinations to an array
        values.split(",").map((v) => ethers.utils.parseEther(v)), // Parse ETH values
        data.split(",") // Convert comma-separated calldata to an array
      );
      await tx.wait(); // Wait for the transaction to be mined
      alert("Batch executed successfully!");
    } catch (error) {
      console.error(error);
      alert("Batch execution failed!");
    }
  }

  // Execute a transaction with Multi-Factor Authentication (MFA)
  async function executeWithMFA() {
    const { dest, value, data, otp, secondarySignature } = formData; // Destructure input values
    try {
      const tx = await contract.executeWithMFA(
        dest,
        ethers.utils.parseEther(value), // Parse ETH value
        data,
        otp,
        secondarySignature
      );
      await tx.wait(); // Wait for the transaction to be mined
      alert("MFA transaction successful!");
    } catch (error) {
      console.error(error);
      alert("MFA transaction failed!");
    }
  }

  // Execute a transaction with spending limits
  async function executeWithLimit() {
    const { dest, value, data } = formData; // Destructure input values
    try {
      const tx = await contract.executeWithLimit(
        dest,
        ethers.utils.parseEther(value), // Parse ETH value
        data
      );
      await tx.wait(); // Wait for the transaction to be mined
      alert("Transaction within spending limit successful!");
    } catch (error) {
      console.error(error);
      alert("Transaction failed or exceeds limit!");
    }
  }

  // Trigger social recovery
  async function triggerRecovery() {
    const { newOwner, guardianSignatures } = formData; // Destructure input values
    try {
      const tx = await contract.triggerRecovery(
        newOwner,
        guardianSignatures.split(",") // Convert comma-separated signatures to an array
      );
      await tx.wait(); // Wait for the transaction to be mined
      alert("Recovery triggered successfully!");
    } catch (error) {
      console.error(error);
      alert("Recovery failed!");
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Enhanced Account UI</h1>

      {/* Wallet Connection Section */}
      <button
        onClick={connectWallet}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        {account ? `Connected: ${account}` : "Connect Wallet"}
      </button>

      {/* Batch Execution Form */}
      <div className="mb-6">
        <h2 className="font-bold">Batch Execution</h2>
        <input
          type="text"
          name="dests"
          placeholder="Destination addresses (comma-separated)"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="values"
          placeholder="ETH values (comma-separated)"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="data"
          placeholder="Calldata (comma-separated)"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />
        <button
          onClick={executeBatch}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Execute Batch
        </button>
      </div>

      {/* Multi-Factor Authentication Form */}
      <div className="mb-6">
        <h2 className="font-bold">Multi-Factor Authentication</h2>
        <input
          type="text"
          name="dest"
          placeholder="Destination address"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="value"
          placeholder="ETH value"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="data"
          placeholder="Calldata"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="otp"
          placeholder="OTP"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="secondarySignature"
          placeholder="Secondary key signature"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />
        <button
          onClick={executeWithMFA}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Execute with MFA
        </button>
      </div>

      {/* Spending Limit Form */}
      <div className="mb-6">
        <h2 className="font-bold">Spending Limit</h2>
        <input
          type="text"
          name="dest"
          placeholder="Destination address"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="value"
          placeholder="ETH value"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="data"
          placeholder="Calldata"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />
        <button
          onClick={executeWithLimit}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Execute with Limit
        </button>
      </div>

      {/* Social Recovery Form */}
      <div className="mb-6">
        <h2 className="font-bold">Social Recovery</h2>
        <input
          type="text"
          name="newOwner"
          placeholder="New owner address"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="guardianSignatures"
          placeholder="Guardian signatures (comma-separated)"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />
        <button
          onClick={triggerRecovery}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Trigger Recovery
        </button>
      </div>
    </div>
  );
}
