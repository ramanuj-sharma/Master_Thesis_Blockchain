import React, { useState } from "react";
import { ethers } from "ethers";

export default function EnhancedAccountUI() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [status, setStatus] = useState(""); // Status messages
  const [loading, setLoading] = useState(false); // Loading state
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
        setLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
        setAccount(await signer.getAddress());
        setContract(contractInstance);
        setStatus("✅ Wallet connected successfully!");
      } catch (error) {
        setStatus(`❌ Wallet connection failed: ${error.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      alert("MetaMask not detected! Please install it.");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function executeTransaction(action) {
    try {
      setLoading(true);
      setStatus(`⏳ Executing ${action} transaction...`);
      let tx;

      if (action === "batch") {
        const { dests, values, data } = formData;
        tx = await contract.executeBatch(
          dests.split(","),
          values.split(",").map((v) => ethers.utils.parseEther(v)),
          data.split(",")
        );
      } else if (action === "mfa") {
        const { dest, value, data, otp, secondarySignature } = formData;
        tx = await contract.executeWithMFA(
          dest,
          ethers.utils.parseEther(value),
          data,
          otp,
          secondarySignature
        );
      } else if (action === "limit") {
        const { dest, value, data } = formData;
        tx = await contract.executeWithLimit(
          dest,
          ethers.utils.parseEther(value),
          data
        );
      } else if (action === "recovery") {
        const { newOwner, guardianSignatures } = formData;
        tx = await contract.triggerRecovery(newOwner, guardianSignatures.split(","));
      }

      await tx.wait();
      setStatus(`✅ ${action.charAt(0).toUpperCase() + action.slice(1)} executed successfully!`);
    } catch (error) {
      setStatus(`❌ Transaction failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600 dark:text-blue-400">🔐 Enhanced Wallet</h1>

      <button
        onClick={connectWallet}
        className={`w-full px-4 py-2 text-white font-semibold rounded mb-4 transition ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {account ? `✅ Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
      </button>

      {status && (
        <div className="p-2 mb-4 text-sm font-semibold text-center bg-gray-300 dark:bg-gray-700 rounded">
          {status}
        </div>
      )}

      {/* Batch Execution */}
      <section className="mb-6 p-4 bg-white dark:bg-gray-700 shadow rounded">
        <h2 className="text-xl font-semibold mb-2 text-green-600 dark:text-green-400">🔄 Batch Execution</h2>
        <input type="text" name="dests" placeholder="Destination addresses" className="input-field" onChange={handleChange} />
        <input type="text" name="values" placeholder="ETH values" className="input-field" onChange={handleChange} />
        <input type="text" name="data" placeholder="Calldata" className="input-field" onChange={handleChange} />
        <button onClick={() => executeTransaction("batch")} className="btn-green">Execute Batch</button>
      </section>

      {/* MFA Execution */}
      <section className="mb-6 p-4 bg-white dark:bg-gray-700 shadow rounded">
        <h2 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">🛡️ Multi-Factor Authentication</h2>
        <input type="text" name="dest" placeholder="Destination" className="input-field" onChange={handleChange} />
        <input type="text" name="value" placeholder="ETH value" className="input-field" onChange={handleChange} />
        <input type="text" name="data" placeholder="Calldata" className="input-field" onChange={handleChange} />
        <input type="text" name="otp" placeholder="OTP" className="input-field" onChange={handleChange} />
        <input type="text" name="secondarySignature" placeholder="Secondary Signature" className="input-field" onChange={handleChange} />
        <button onClick={() => executeTransaction("mfa")} className="btn-purple">Execute with MFA</button>
      </section>

      {/* Spending Limit Execution */}
      <section className="mb-6 p-4 bg-white dark:bg-gray-700 shadow rounded">
        <h2 className="text-xl font-semibold mb-2 text-yellow-600 dark:text-yellow-400">💰 Spending Limit</h2>
        <input type="text" name="dest" placeholder="Destination" className="input-field" onChange={handleChange} />
        <input type="text" name="value" placeholder="ETH value" className="input-field" onChange={handleChange} />
        <input type="text" name="data" placeholder="Calldata" className="input-field" onChange={handleChange} />
        <button onClick={() => executeTransaction("limit")} className="btn-yellow">Execute with Limit</button>
      </section>

      {/* Social Recovery */}
      <section className="p-4 bg-white dark:bg-gray-700 shadow rounded">
        <h2 className="text-xl font-semibold mb-2 text-red-600 dark:text-red-400">🔄 Social Recovery</h2>
        <input type="text" name="newOwner" placeholder="New Owner" className="input-field" onChange={handleChange} />
        <input type="text" name="guardianSignatures" placeholder="Guardian Signatures" className="input-field" onChange={handleChange} />
        <button onClick={() => executeTransaction("recovery")} className="btn-red">Trigger Recovery</button>
      </section>
    </div>
  );
}
