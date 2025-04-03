import React, { useState } from "react";
import { ethers } from "ethers";

export default function EnhancedAccountUI() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [status, setStatus] = useState(""); // Status messages
  const [formData, setFormData] = useState({
    dests: "",
    values: "",
    data: "",
    otp: "",
    secondarySignature: "",
    newOwner: "",
    guardianSignatures: "",
  });

  const contractAddress = "0x16576Ba3a355c821B56cc9185b6B17721Ee01362"; // Replace with actual contract address
  const contractABI = [/* Contract ABI goes here */];

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
        setAccount(await signer.getAddress());
        setContract(contractInstance);
        setStatus("Wallet connected successfully!");
      } catch (error) {
        setStatus(`Wallet connection failed: ${error.message}`);
      }
    } else {
      alert("MetaMask not detected! Please install it.");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function executeBatch() {
    try {
      setStatus("Executing batch transaction...");
      const { dests, values, data } = formData;
      const tx = await contract.executeBatch(
        dests.split(","),
        values.split(",").map((v) => ethers.utils.parseEther(v)),
        data.split(",")
      );
      await tx.wait();
      setStatus("Batch executed successfully!");
    } catch (error) {
      setStatus(`Batch execution failed: ${error.message}`);
    }
  }

  async function executeWithMFA() {
    try {
      setStatus("Executing MFA transaction...");
      const { dest, value, data, otp, secondarySignature } = formData;
      const tx = await contract.executeWithMFA(
        dest,
        ethers.utils.parseEther(value),
        data,
        otp,
        secondarySignature
      );
      await tx.wait();
      setStatus("MFA transaction successful!");
    } catch (error) {
      setStatus(`MFA transaction failed: ${error.message}`);
    }
  }

  async function executeWithLimit() {
    try {
      setStatus("Executing transaction with spending limit...");
      const { dest, value, data } = formData;
      const tx = await contract.executeWithLimit(
        dest,
        ethers.utils.parseEther(value),
        data
      );
      await tx.wait();
      setStatus("Transaction executed successfully!");
    } catch (error) {
      setStatus(`Transaction failed: ${error.message}`);
    }
  }

  async function triggerRecovery() {
    try {
      setStatus("Triggering account recovery...");
      const { newOwner, guardianSignatures } = formData;
      const tx = await contract.triggerRecovery(
        newOwner,
        guardianSignatures.split(",")
      );
      await tx.wait();
      setStatus("Recovery process initiated!");
    } catch (error) {
      setStatus(`Recovery failed: ${error.message}`);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Enhanced Account UI</h1>

      <button
        onClick={connectWallet}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded mb-4 transition"
      >
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
      </button>

      {status && (
        <div className="p-2 mb-4 text-sm font-semibold text-center bg-gray-200 dark:bg-gray-700 rounded">
          {status}
        </div>
      )}

      {/* Batch Execution */}
      <section className="mb-6 p-4 bg-white dark:bg-gray-700 shadow rounded">
        <h2 className="text-xl font-semibold mb-2">Batch Execution</h2>
        <input
          type="text"
          name="dests"
          placeholder="Destination addresses (comma-separated)"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="values"
          placeholder="ETH values (comma-separated)"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="data"
          placeholder="Calldata (comma-separated)"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
        />
        <button
          onClick={executeBatch}
          className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded transition"
        >
          Execute Batch
        </button>
      </section>

      {/* MFA Execution */}
      <section className="mb-6 p-4 bg-white dark:bg-gray-700 shadow rounded">
        <h2 className="text-xl font-semibold mb-2">Multi-Factor Authentication</h2>
        <input type="text" name="dest" placeholder="Destination" className="border p-2 w-full mb-2 rounded" onChange={handleChange} />
        <input type="text" name="value" placeholder="ETH value" className="border p-2 w-full mb-2 rounded" onChange={handleChange} />
        <input type="text" name="data" placeholder="Calldata" className="border p-2 w-full mb-2 rounded" onChange={handleChange} />
        <input type="text" name="otp" placeholder="One-Time Password (OTP)" className="border p-2 w-full mb-2 rounded" onChange={handleChange} />
        <input type="text" name="secondarySignature" placeholder="Secondary Signature" className="border p-2 w-full mb-2 rounded" onChange={handleChange} />
        <button onClick={executeWithMFA} className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded transition">
          Execute with MFA
        </button>
      </section>

      {/* Spending Limit Execution */}
      <section className="mb-6 p-4 bg-white dark:bg-gray-700 shadow rounded">
        <h2 className="text-xl font-semibold mb-2">Execute with Spending Limit</h2>
        <input type="text" name="dest" placeholder="Destination" className="border p-2 w-full mb-2 rounded" onChange={handleChange} />
        <input type="text" name="value" placeholder="ETH value" className="border p-2 w-full mb-2 rounded" onChange={handleChange} />
        <input type="text" name="data" placeholder="Calldata" className="border p-2 w-full mb-2 rounded" onChange={handleChange} />
        <button onClick={executeWithLimit} className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded transition">
          Execute with Limit
        </button>
      </section>

      {/* Social Recovery */}
      <section className="p-4 bg-white dark:bg-gray-700 shadow rounded">
        <h2 className="text-xl font-semibold mb-2">Social Recovery</h2>
        <input type="text" name="newOwner" placeholder="New Owner" className="border p-2 w-full mb-2 rounded" onChange={handleChange} />
        <input type="text" name="guardianSignatures" placeholder="Guardian Signatures" className="border p-2 w-full mb-2 rounded" onChange={handleChange} />
        <button onClick={triggerRecovery} className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded transition">
          Trigger Recovery
        </button>
      </section>
    </div>
  );
}
