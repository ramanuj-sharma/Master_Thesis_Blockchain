import React, { useState } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "./config/contract";
import "./styles/EnhancedAccount.css";

export default function EnhancedAccountUI() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const [secondaryKey, setSecondaryKey] = useState("");

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
  const contractABI = [{"type":"constructor","inputs":[{"name":"initialOwner","type":"address","internalType":"address"},{"name":"entryPoint","type":"address","internalType":"contract IEntryPoint"}],"stateMutability":"nonpayable"},{"type":"function","name":"addGuardian","inputs":[{"name":"guardian","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"approveERC20","inputs":[{"name":"token","type":"address","internalType":"address"},{"name":"spender","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"dailyLimit","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"dailySpent","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"executeBatch","inputs":[{"name":"dests","type":"address[]","internalType":"address[]"},{"name":"values","type":"uint256[]","internalType":"uint256[]"},{"name":"data","type":"bytes[]","internalType":"bytes[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"executeWithLimit","inputs":[{"name":"dest","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"executeWithMFA","inputs":[{"name":"dest","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"},{"name":"otp","type":"bytes32","internalType":"bytes32"},{"name":"secondarySignature","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getEntryPoint","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"guardians","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"isGuardian","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"lastSpendReset","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"recoveryThreshold","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"removeGuardian","inputs":[{"name":"guardian","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"secondaryKey","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"setDailyLimit","inputs":[{"name":"limit","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setSecondaryKey","inputs":[{"name":"newKey","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"triggerRecovery","inputs":[{"name":"newOwner","type":"address","internalType":"address"},{"name":"guardianSignatures","type":"bytes[]","internalType":"bytes[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"usedOtps","inputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"validateUserOp","inputs":[{"name":"userOp","type":"tuple","internalType":"struct PackedUserOperation","components":[{"name":"sender","type":"address","internalType":"address"},{"name":"nonce","type":"uint256","internalType":"uint256"},{"name":"initCode","type":"bytes","internalType":"bytes"},{"name":"callData","type":"bytes","internalType":"bytes"},{"name":"accountGasLimits","type":"bytes32","internalType":"bytes32"},{"name":"preVerificationGas","type":"uint256","internalType":"uint256"},{"name":"gasFees","type":"bytes32","internalType":"bytes32"},{"name":"paymasterAndData","type":"bytes","internalType":"bytes"},{"name":"signature","type":"bytes","internalType":"bytes"}]},{"name":"userOpHash","type":"bytes32","internalType":"bytes32"},{"name":"missingAccountFunds","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"validationData","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"executeBatchWithMFAAndTransient","inputs":[{"name":"dests","type":"address[]","internalType":"address[]"},{"name":"values","type":"uint256[]","internalType":"uint256[]"},{"name":"data","type":"bytes[]","internalType":"bytes[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"BatchApproved","inputs":[{"name":"operator","type":"address","indexed":true,"internalType":"address"},{"name":"data","type":"bytes","indexed":false,"internalType":"bytes"}],"anonymous":false},{"type":"event","name":"BatchOperationResult","inputs":[{"name":"index","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"dest","type":"address","indexed":false,"internalType":"address"},{"name":"success","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"GuardianAdded","inputs":[{"name":"guardian","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"GuardianRemoved","inputs":[{"name":"guardian","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"OTPUsed","inputs":[{"name":"otp","type":"bytes32","indexed":true,"internalType":"bytes32"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"RecoveryTriggered","inputs":[{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"SecondaryKeySet","inputs":[{"name":"newKey","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"error","name":"ECDSAInvalidSignature","inputs":[]},{"type":"error","name":"ECDSAInvalidSignatureLength","inputs":[{"name":"length","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ECDSAInvalidSignatureS","inputs":[{"name":"s","type":"bytes32","internalType":"bytes32"}]},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]}];

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

  async function setSecondaryKeyHandler() {
    if (!contract || !secondaryKey) {
      setStatus("Please connect wallet and enter a secondary key");
      return;
    }
    try {
      setLoading(true);
      const tx = await contract.setSecondaryKey(secondaryKey);
      await tx.wait();
      setStatus("✅ Secondary key set successfully!");
    } catch (error) {
      setStatus(`❌ Failed to set secondary key: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function executeTransaction(action) {
    if (!contract) {
      setStatus("❌ Please connect your wallet first");
      return;
    }

    try {
      setLoading(true);
      setStatus(`⏳ Executing ${action} transaction...`);
      let tx;

      switch (action) {
        case "batchMfa":
          const { dests, values, data, otp, secondarySignature } = formData;
          if (!dests || !values || !data || !otp || !secondarySignature) {
            setStatus("❌ Please fill in all required fields");
            setLoading(false);
            return;
          }
          tx = await contract.executeBatchWithMFAAndTransient(
            dests.split(",").map(addr => addr.trim()),
            values.split(",").map(v => ethers.utils.parseEther(v.trim())),
            data.split(",").map(d => d.trim()),
            otp,
            secondarySignature
          );
          break;
        case "batch":
          const { dests: batchDests, values: batchValues, data: batchData } = formData;
          tx = await contract.executeBatchWithTransient(
            batchDests.split(","),
            batchValues.split(",").map((v) => ethers.utils.parseEther(v)),
            batchData.split(",")
          );
          break;
        case "mfa":
          const { dest, value, data: mfaData, otp: mfaOtp, secondarySignature: mfaSecondarySignature } = formData;
          tx = await contract.executeWithMFA(
            dest,
            ethers.utils.parseEther(value),
            mfaData,
            mfaOtp,
            mfaSecondarySignature
          );
          break;
        case "limit":
          const { dest: limitDest, value: limitValue, data: limitData } = formData;
          tx = await contract.executeWithLimitTransient(
            limitDest,
            ethers.utils.parseEther(limitValue),
            limitData
          );
          break;
        case "recovery":
          const { newOwner, guardianSignatures } = formData;
          tx = await contract.triggerRecovery(
            newOwner,
            guardianSignatures.split(",")
          );
          break;
      }

      await tx.wait();
      setStatus(`✅ ${action.charAt(0).toUpperCase() + action.slice(1)} executed successfully!`);
    } catch (error) {
      setStatus(`❌ Transaction failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  const features = [
    {
      id: "batchMfa",
      title: "Batch MFA Transactions",
      icon: "🔐",
      description: "Execute multiple transactions with MFA and transient storage",
      color: "indigo",
      fields: [
        { name: "dests", placeholder: "Destination addresses (comma-separated)" },
        { name: "values", placeholder: "ETH values (comma-separated)" },
        { name: "data", placeholder: "Calldata (comma-separated)" },
        { name: "otp", placeholder: "One-Time Password" },
        { name: "secondarySignature", placeholder: "Secondary Signature" }
      ]
    },
    {
      id: "batch",
      title: "Batch Transactions",
      icon: "🔄",
      description: "Execute multiple transactions in one go",
      color: "green",
      fields: [
        { name: "dests", placeholder: "Destination addresses (comma-separated)" },
        { name: "values", placeholder: "ETH values (comma-separated)" },
        { name: "data", placeholder: "Calldata (comma-separated)" }
      ]
    },
    {
      id: "mfa",
      title: "Multi-Factor Auth",
      icon: "🛡️",
      description: "Secure transactions with 2FA",
      color: "purple",
      fields: [
        { name: "dest", placeholder: "Destination address" },
        { name: "value", placeholder: "ETH value" },
        { name: "data", placeholder: "Calldata" },
        { name: "otp", placeholder: "One-Time Password" },
        { name: "secondarySignature", placeholder: "Secondary Signature" }
      ]
    },
    {
      id: "limit",
      title: "Daily Limits",
      icon: "💰",
      description: "Transact within daily limits",
      color: "yellow",
      fields: [
        { name: "dest", placeholder: "Destination address" },
        { name: "value", placeholder: "ETH value" },
        { name: "data", placeholder: "Calldata" }
      ]
    },
    {
      id: "recovery",
      title: "Social Recovery",
      icon: "🔑",
      description: "Recover wallet with guardians",
      color: "red",
      fields: [
        { name: "newOwner", placeholder: "New Owner Address" },
        { name: "guardianSignatures", placeholder: "Guardian Signatures (comma-separated)" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="header-section">
          <h1 className="title">
            🔐 Enhanced Smart Contract Wallet
          </h1>
          
          <div className="features-grid">
            {/* Wallet Connection */}
            <div className="header-card">
              <h2 className="subtitle">Wallet Connection</h2>
              <button
                onClick={connectWallet}
                className={`btn-primary ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                disabled={loading}
              >
                {account
                  ? `✅ Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
                  : "Connect Wallet"}
              </button>
            </div>

            {/* Secondary Key Setting */}
            <div className="header-card">
              <h2 className="subtitle">Secondary Key</h2>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={secondaryKey}
                  onChange={(e) => setSecondaryKey(e.target.value)}
                  placeholder="Enter secondary key address"
                  className="input-field"
                />
                <button
                  onClick={setSecondaryKeyHandler}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                  disabled={loading || !account}
                >
                  Set Key
                </button>
              </div>
            </div>
          </div>

          {/* Status Messages */}
          {status && (
            <div className="status-message">
              {status}
            </div>
          )}
        </div>

        {/* Feature Grid */}
        <div className="features-grid mt-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`feature-card ${
                activeFeature === feature.id ? `ring-2 ring-${feature.color}-500` : ""
              }`}
            >
              {/* Feature Header */}
              <div 
                className="feature-card-header"
                onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className={`subtitle text-${feature.color}-600 dark:text-${feature.color}-400`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>

              {/* Feature Content */}
              {activeFeature === feature.id && (
                <div className="feature-card-content">
                  {feature.fields.map((field) => (
                    <input
                      key={field.name}
                      type="text"
                      name={field.name}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                      className="input-field"
                    />
                  ))}
                  <button
                    onClick={() => executeTransaction(feature.id)}
                    className={`btn-primary btn-${feature.color}`}
                    disabled={loading || !account}
                  >
                    Execute {feature.title}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}