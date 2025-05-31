import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import "../styles.css";

export default function FeaturesPage() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [formData, setFormData] = useState({});
  const [network, setNetwork] = useState(null);
  const [activeTab, setActiveTab] = useState("all"); // For filtering features
  const [activeFeature, setActiveFeature] = useState(null);
  const navigate = useNavigate();

  const contractAddress = "0x20a7cFfdE509256e63FC51E40e5dB29401D74DA2";
  const contractABI = [
    {"type":"constructor","inputs":[{"name":"initialOwner","type":"address","internalType":"address"},{"name":"entryPoint","type":"address","internalType":"contract IEntryPoint"}],"stateMutability":"nonpayable"},{"type":"function","name":"addGuardian","inputs":[{"name":"guardian","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"addToBlacklist","inputs":[{"name":"addr","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"addToWhitelist","inputs":[{"name":"addr","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"approveERC20","inputs":[{"name":"token","type":"address","internalType":"address"},{"name":"spender","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"blacklist","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"dailyLimit","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"dailySpent","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"executeBatch","inputs":[{"name":"dests","type":"address[]","internalType":"address[]"},{"name":"values","type":"uint256[]","internalType":"uint256[]"},{"name":"data","type":"bytes[]","internalType":"bytes[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"executeBatchWithTransient","inputs":[{"name":"dests","type":"address[]","internalType":"address[]"},{"name":"values","type":"uint256[]","internalType":"uint256[]"},{"name":"data","type":"bytes[]","internalType":"bytes[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"executeWithLimitTransient","inputs":[{"name":"dest","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"executeWithMFA","inputs":[{"name":"dest","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"},{"name":"otp","type":"bytes32","internalType":"bytes32"},{"name":"secondarySignature","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getEntryPoint","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"guardians","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"isGuardian","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"lastSpendReset","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"recoveryThreshold","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"removeGuardian","inputs":[{"name":"guardian","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"secondaryKey","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"setDailyLimit","inputs":[{"name":"limit","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setSecondaryKey","inputs":[{"name":"newKey","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"triggerRecovery","inputs":[{"name":"newOwner","type":"address","internalType":"address"},{"name":"guardianSignatures","type":"bytes[]","internalType":"bytes[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"usedOtps","inputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"validateUserOp","inputs":[{"name":"userOp","type":"tuple","internalType":"struct PackedUserOperation","components":[{"name":"sender","type":"address","internalType":"address"},{"name":"nonce","type":"uint256","internalType":"uint256"},{"name":"initCode","type":"bytes","internalType":"bytes"},{"name":"callData","type":"bytes","internalType":"bytes"},{"name":"accountGasLimits","type":"bytes32","internalType":"bytes32"},{"name":"preVerificationGas","type":"uint256","internalType":"uint256"},{"name":"gasFees","type":"bytes32","internalType":"bytes32"},{"name":"paymasterAndData","type":"bytes","internalType":"bytes"},{"name":"signature","type":"bytes","internalType":"bytes"}]},{"name":"userOpHash","type":"bytes32","internalType":"bytes32"},{"name":"missingAccountFunds","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"validationData","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"whitelist","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"event","name":"AddressBlacklisted","inputs":[{"name":"addr","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"AddressWhitelisted","inputs":[{"name":"addr","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"BatchApproved","inputs":[{"name":"operator","type":"address","indexed":true,"internalType":"address"},{"name":"data","type":"bytes","indexed":false,"internalType":"bytes"}],"anonymous":false},{"type":"event","name":"BatchOperationResult","inputs":[{"name":"index","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"dest","type":"address","indexed":false,"internalType":"address"},{"name":"success","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"DailyLimitSet","inputs":[{"name":"newLimit","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"GuardianAdded","inputs":[{"name":"guardian","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"GuardianRemoved","inputs":[{"name":"guardian","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"OTPUsed","inputs":[{"name":"otp","type":"bytes32","indexed":true,"internalType":"bytes32"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"RecoveryTriggered","inputs":[{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"SecondaryKeySet","inputs":[{"name":"newKey","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"TransactionExecuted","inputs":[{"name":"dest","type":"address","indexed":true,"internalType":"address"},{"name":"value","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"success","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"error","name":"ECDSAInvalidSignature","inputs":[]},{"type":"error","name":"ECDSAInvalidSignatureLength","inputs":[{"name":"length","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ECDSAInvalidSignatureS","inputs":[{"name":"s","type":"bytes32","internalType":"bytes32"}]},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]},
    {
      "type": "function",
      "name": "executeBatchWithMFAAndTransient",
      "inputs": [
        { "name": "dests", "type": "address[]", "internalType": "address[]" },
        { "name": "values", "type": "uint256[]", "internalType": "uint256[]" },
        { "name": "data", "type": "bytes[]", "internalType": "bytes[]" },
        { "name": "otp", "type": "bytes32", "internalType": "bytes32" },
        { "name": "secondarySignature", "type": "bytes", "internalType": "bytes" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    }
  ];  

  useEffect(() => {
    // Check if wallet is already connected (from session storage)
    const storedAddress = sessionStorage.getItem("userAddress");
    const storedNetwork = sessionStorage.getItem("network");
    
    if (storedAddress) {
      setAccount(storedAddress);
      setNetwork(storedNetwork);
      initializeContract();
    } else {
      // Redirect to welcome page if no wallet is connected
      navigate("/");
    }
  }, [navigate]);

  // Reset active feature when tab changes
  useEffect(() => {
    setActiveFeature(null);
  }, [activeTab]);

  async function initializeContract() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(contractInstance);
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function generateOtpAndSign() {
    try {
      const otp = ethers.utils.hexlify(ethers.utils.randomBytes(32));
      setFormData((prev) => ({ ...prev, otp }));

      const secondaryPrivateKey = ""; // Securely handle this key
      if (!secondaryPrivateKey) {
        throw new Error("Secondary private key is not set");
      }

      const signer = new ethers.Wallet(secondaryPrivateKey);
      const ethSignedMessage = ethers.utils.hashMessage(ethers.utils.arrayify(otp));
      const secondarySignature = await signer.signMessage(ethers.utils.arrayify(ethSignedMessage));

      setFormData((prev) => ({ ...prev, secondarySignature }));
      
      // Success notification
      showToast("OTP generated and signed successfully!");
    } catch (error) {
      console.error("Error in OTP generation or signing:", error.message || error);
      alert(`OTP generation or signing failed. Reason: ${error.message || error}`);
    }
  }

  async function executeWithTimer(methodName, methodArgs = []) {
    try {
      const startTime = Date.now();
      
      const tx = await contract[methodName](...methodArgs);
      console.log("Transaction sent:", tx.hash);
      
      // Show pending message
      showToast(`Transaction pending: ${tx.hash.substring(0, 10)}...`, "pending");
      
      await tx.wait();
      
      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);

      // Success notification
      showToast(`Transaction successful! Time taken: ${duration} seconds`);
    } catch (error) {
      console.error(`${methodName} failed:`, error);
      alert(`${methodName} failed! Ensure all inputs are correct.`);
    }
  }
  
  // Toast notification function
  function showToast(message, type = "success") {
    // Implement a simple toast notification
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);
    
    // Fade in
    setTimeout(() => {
      toast.classList.add("show");
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  }

  // Helper function to truncate address
  function truncateAddress(address) {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  function formatFeatureIcon(featureName) {
    // Simple icon representation using unicode symbols
    const icons = {
      "Set Secondary Key": "🔑",
      "Multi-Factor Authentication": "🔐",
      "Batch Execution (Transient)": "⚡",
      "Batch Execution": "📦",
      "Spending Limit (Transient)": "💰",
      "Whitelist & Blacklist": "📝",
      "Social Recovery": "🔄"
    };
    
    return icons[featureName] || "🛠️";
  }

  // Handle disconnect
  function disconnect() {
    sessionStorage.removeItem("userAddress");
    sessionStorage.removeItem("network");
    navigate("/");
  }

  return (
    <div className="features-container">
      <header className="features-header">
        <h1>
          <span className="feature-icon">💼</span> 
          Enhanced Account Features
        </h1>
        <div className="wallet-info">
          <span>
            <strong>Address:</strong> {truncateAddress(account)}
          </span>
          <span>
            <strong>Network:</strong> {network || "Unknown"}
          </span>
          <button onClick={disconnect} className="disconnect-button">
            Disconnect
          </button>
        </div>
      </header>

      <div className="wallet-description">
        <h2>Enhanced Smart Contract Wallet</h2>
        <p>
          Welcome to your enhanced smart contract wallet, built with advanced security and convenience in mind. 
          This wallet combines the power of ERC-4337 account abstraction with cutting-edge features like Multi-Factor Authentication, 
          batch transactions, and optimized gas usage through transient storage.
        </p>
        <div className="wallet-description-grid">
          <div className="wallet-highlight">
            <h3>🛡️ Advanced Security</h3>
            <p>Protected by Multi-Factor Authentication, daily spending limits, and social recovery guardians. Your funds stay safe with multiple layers of security.</p>
          </div>
          <div className="wallet-highlight">
            <h3>💰 Gas Optimization</h3>
            <p>Save on transaction costs with batch processing and EIP-1153 transient storage implementation for optimal gas efficiency.</p>
          </div>
          <div className="wallet-highlight">
            <h3>🔄 Smart Recovery</h3>
            <p>Never lose access to your funds with our guardian-based social recovery system. Trusted contacts can help restore your access.</p>
          </div>
          <div className="wallet-highlight">
            <h3>⚡ Enhanced Performance</h3>
            <p>Execute multiple transactions in a single batch, manage permissions efficiently, and enjoy seamless integration with dApps.</p>
          </div>
        </div>
      </div>

      <div className="features-tabs">
        <button 
          className={activeTab === "all" ? "active" : ""} 
          onClick={() => setActiveTab("all")}
        >
          All Features
        </button>
        <button 
          className={activeTab === "security" ? "active" : ""} 
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
        <button 
          className={activeTab === "transactions" ? "active" : ""} 
          onClick={() => setActiveTab("transactions")}
        >
          Transactions
        </button>
      </div>

      <div className="features-grid">
        {[
          {
            id: "secondaryKey",
            title: "Set Secondary Key",
            icon: "🔑",
            description: "Configure your secondary key for MFA transactions",
            helpText: `Set up a secondary key for Multi-Factor Authentication (MFA) transactions.

How to use:
1. Enter the address of your secondary key
2. Click "Set Secondary Key" to configure it

Note: The secondary key will be used to sign one-time passwords (OTPs) for MFA transactions.
Keep your secondary key's private key secure and separate from your main wallet key.`,
            category: "security",
            fields: [
              { name: "secondaryKeyAddress", placeholder: "Secondary key address" }
            ],
            buttons: [
              {
                text: "Set Secondary Key",
                onClick: () => executeWithTimer('setSecondaryKey', [formData.secondaryKeyAddress])
              }
            ]
          },
          {
            id: "batchMfa",
            title: "Batch MFA Transactions",
            icon: "🔐",
            description: "Execute multiple transactions with MFA and transient storage",
            helpText: `This feature allows you to execute multiple transactions in a single batch with enhanced security using Multi-Factor Authentication (MFA) and transient storage.

How to use:
1. Enter comma-separated lists of destination addresses, ETH values, and calldata
2. Click "Generate OTP & Sign" to create a one-time password and get it signed
3. Click "Execute Batch MFA" to process all transactions securely

Example:
Addresses: 0x123...,0x456...
Values: 0.1,0.2
Data: 0x,0x`,
            category: "transactions",
            fields: [
              { name: "batchMfaDests", placeholder: "Destination addresses (comma-separated)" },
              { name: "batchMfaValues", placeholder: "ETH values (comma-separated)" },
              { name: "batchMfaData", placeholder: "Calldata (comma-separated)" },
              { name: "batchMfaOtp", placeholder: "OTP", readOnly: true },
              { name: "batchMfaSecondarySignature", placeholder: "Secondary Key Signature", readOnly: true }
            ],
            buttons: [
              {
                text: "Generate OTP & Sign",
                onClick: async () => {
                  try {
                    const otp = ethers.utils.hexlify(ethers.utils.randomBytes(32));
                    setFormData((prev) => ({ ...prev, batchMfaOtp: otp }));
                    const secondaryPrivateKey = "c2a59fbc8154a80b0b84f61458d1a43608a3729442609a9bf30bcd8137f7f8c2";
                    if (!secondaryPrivateKey) {
                      throw new Error("Secondary private key is not set");
                    }
                    const signer = new ethers.Wallet(secondaryPrivateKey);
                    const ethSignedMessage = ethers.utils.hashMessage(ethers.utils.arrayify(otp));
                    const secondarySignature = await signer.signMessage(ethers.utils.arrayify(ethSignedMessage));
                    setFormData((prev) => ({ ...prev, batchMfaSecondarySignature: secondarySignature }));
                    showToast("OTP generated and signed successfully!");
                  } catch (error) {
                    showToast("OTP generation or signing failed: " + (error.message || error), "error");
                  }
                }
              },
              {
                text: "Execute Batch MFA",
                onClick: () => executeWithTimer('executeBatchWithMFAAndTransient', [
                  formData.batchMfaDests ? formData.batchMfaDests.split(",") : [],
                  formData.batchMfaValues ? formData.batchMfaValues.split(",").map((v) => ethers.utils.parseEther(v)) : [],
                  formData.batchMfaData ? formData.batchMfaData.split(",") : [],
                  formData.batchMfaOtp,
                  formData.batchMfaSecondarySignature
                ])
              }
            ]
          },
          {
            id: "batchTransient",
            title: "Batch Transactions (Transient)",
            icon: "⚡",
            description: "Execute multiple transactions with optimized storage",
            helpText: `Execute multiple transactions in a batch using EIP-1153 transient storage for gas optimization.

How to use:
1. Enter comma-separated lists of destination addresses and ETH values
2. Optionally add calldata for each transaction
3. Click "Execute Batch" to process all transactions

Example:
Addresses: 0x123...,0x456...
Values: 0.1,0.2
Data: 0x,0x`,
            category: "transactions",
            fields: [
              { name: "batchTransientDests", placeholder: "Destination addresses (comma-separated)" },
              { name: "batchTransientValues", placeholder: "ETH values (comma-separated)" },
              { name: "batchTransientData", placeholder: "Calldata (comma-separated)" }
            ],
            buttons: [
              {
                text: "Execute Batch",
                onClick: () => executeWithTimer('executeBatchWithTransient', [
                  formData.batchTransientDests ? formData.batchTransientDests.split(",") : [],
                  formData.batchTransientValues ? formData.batchTransientValues.split(",").map((v) => ethers.utils.parseEther(v)) : [],
                  formData.batchTransientData ? formData.batchTransientData.split(",") : []
                ])
              }
            ]
          },
          {
            id: "batch",
            title: "Batch Transactions",
            icon: "📦",
            description: "Execute multiple transactions in one go",
            helpText: `Send multiple transactions in a single operation to save gas and time.

How to use:
1. Enter comma-separated lists of destination addresses and ETH values
2. Optionally add calldata for each transaction
3. Click "Execute Batch" to process all transactions

Example:
Addresses: 0x123...,0x456...
Values: 0.1,0.2
Data: 0x,0x`,
            category: "transactions",
            fields: [
              { name: "dests", placeholder: "Destination addresses (comma-separated)" },
              { name: "values", placeholder: "ETH values (comma-separated)" },
              { name: "batchData", placeholder: "Calldata (comma-separated)" }
            ],
            buttons: [
              {
                text: "Execute Batch",
                onClick: () => executeWithTimer('executeBatch', [
            formData.dests ? formData.dests.split(",") : [],
            formData.values ? formData.values.split(",").map((v) => ethers.utils.parseEther(v)) : [],
            formData.batchData ? formData.batchData.split(",") : []
                ])
              }
            ]
          },
          {
            id: "spendingLimit",
            title: "Spending Limit",
            icon: "💰",
            description: "Set and manage daily spending limits",
            helpText: `Protect your wallet by setting a maximum daily spending limit.

How to use:
1. Enter the daily limit in ETH (e.g., "1.5" for 1.5 ETH)
2. Click "Set Daily Limit" to activate

Note: The limit resets every 24 hours. Whitelisted addresses can bypass this limit.`,
            category: "security",
            fields: [
              { name: "limit", placeholder: "Daily limit (ETH)" }
            ],
            buttons: [
              {
                text: "Set Daily Limit",
                onClick: () => executeWithTimer('setDailyLimit', [
                  ethers.utils.parseEther(formData.limit || "0")
                ])
              }
            ]
          },
          {
            id: "whitelist",
            title: "Whitelist & Blacklist",
            icon: "📝",
            description: "Manage allowed and blocked addresses",
            helpText: `Control which addresses can interact with your wallet.

How to use:
- Whitelist: Add trusted addresses that can bypass spending limits
- Blacklist: Block suspicious addresses from interacting with your wallet

Enter one address at a time and click the corresponding button.`,
            category: "security",
            fields: [
              { name: "whitelistAddress", placeholder: "Address to whitelist" },
              { name: "blacklistAddress", placeholder: "Address to blacklist" }
            ],
            buttons: [
              {
                text: "Add to Whitelist",
                onClick: () => executeWithTimer('addToWhitelist', [formData.whitelistAddress])
              },
              {
                text: "Add to Blacklist",
                onClick: () => executeWithTimer('addToBlacklist', [formData.blacklistAddress])
              }
            ]
          },
          {
            id: "recovery",
            title: "Social Recovery",
            icon: "🔄",
            description: "Recover your account with help from guardians",
            helpText: `Recover access to your wallet with help from designated guardians if you lose access.

How to use:
1. Enter the new owner address
2. Collect signatures from your guardians (comma-separated)
3. Click "Trigger Recovery" to transfer ownership

Note: You need signatures from the minimum required number of guardians to complete recovery.`,
            category: "security",
            fields: [
              { name: "newOwner", placeholder: "New owner address" },
              { name: "guardianSignatures", placeholder: "Guardian signatures (comma-separated)" }
            ],
            buttons: [
              {
                text: "Trigger Recovery",
                onClick: () => executeWithTimer('triggerRecovery', [
                  formData.newOwner,
                  formData.guardianSignatures ? formData.guardianSignatures.split(",") : []
                ])
              }
            ]
          }
        ]
        .filter(feature => activeTab === "all" || feature.category === activeTab)
        .map((feature) => (
          <div
            key={feature.id}
            className={`feature-card ${activeFeature === feature.id ? 'expanded' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveFeature(currentActive => 
                currentActive === feature.id ? null : feature.id
              );
            }}
          >
            <div className="feature-header">
              <div className="feature-header-content">
                <span className="feature-icon">{feature.icon}</span>
                <div className="feature-title-group">
                  <h2>{feature.title}</h2>
                </div>
                <div className="feature-tooltip">
                  {feature.description}
        </div>
          </div>
              <span className="expand-icon">{activeFeature === feature.id ? '▼' : '▶'}</span>
        </div>

            {activeFeature === feature.id && (
              <div 
                className="feature-content" 
                onClick={e => e.stopPropagation()}
              >
                <div className="feature-content-inner">
                  {feature.helpText && (
                    <div className="help-text">
                      {feature.helpText.split('\n').map((line, i) => (
                        line.trim() && <p key={i}>{line}</p>
                      ))}
                    </div>
                  )}
                  <div className="feature-inputs">
                    {feature.fields.map((field) => (
                      <input
                        key={field.name}
                        type="text"
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        readOnly={field.readOnly}
                        className={field.readOnly ? 'generated-field' : ''}
                      />
                    ))}
          </div>
                  <div className="button-row">
                    {feature.buttons.map((button, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          button.onClick();
                        }}
                        className="feature-button"
                      >
                        {button.text}
          </button>
                    ))}
        </div>
          </div>
        </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 