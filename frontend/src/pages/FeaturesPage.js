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
  const navigate = useNavigate();

  const contractAddress = "0x20a7cFfdE509256e63FC51E40e5dB29401D74DA2";
  const contractABI = [
    {"type":"constructor","inputs":[{"name":"initialOwner","type":"address","internalType":"address"},{"name":"entryPoint","type":"address","internalType":"contract IEntryPoint"}],"stateMutability":"nonpayable"},{"type":"function","name":"addGuardian","inputs":[{"name":"guardian","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"addToBlacklist","inputs":[{"name":"addr","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"addToWhitelist","inputs":[{"name":"addr","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"approveERC20","inputs":[{"name":"token","type":"address","internalType":"address"},{"name":"spender","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"blacklist","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"dailyLimit","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"dailySpent","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"executeBatch","inputs":[{"name":"dests","type":"address[]","internalType":"address[]"},{"name":"values","type":"uint256[]","internalType":"uint256[]"},{"name":"data","type":"bytes[]","internalType":"bytes[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"executeBatchWithTransient","inputs":[{"name":"dests","type":"address[]","internalType":"address[]"},{"name":"values","type":"uint256[]","internalType":"uint256[]"},{"name":"data","type":"bytes[]","internalType":"bytes[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"executeWithLimitTransient","inputs":[{"name":"dest","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"executeWithMFA","inputs":[{"name":"dest","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"},{"name":"otp","type":"bytes32","internalType":"bytes32"},{"name":"secondarySignature","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getEntryPoint","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"guardians","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"isGuardian","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"lastSpendReset","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"recoveryThreshold","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"removeGuardian","inputs":[{"name":"guardian","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"secondaryKey","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"setDailyLimit","inputs":[{"name":"limit","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setSecondaryKey","inputs":[{"name":"newKey","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"triggerRecovery","inputs":[{"name":"newOwner","type":"address","internalType":"address"},{"name":"guardianSignatures","type":"bytes[]","internalType":"bytes[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"usedOtps","inputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"validateUserOp","inputs":[{"name":"userOp","type":"tuple","internalType":"struct PackedUserOperation","components":[{"name":"sender","type":"address","internalType":"address"},{"name":"nonce","type":"uint256","internalType":"uint256"},{"name":"initCode","type":"bytes","internalType":"bytes"},{"name":"callData","type":"bytes","internalType":"bytes"},{"name":"accountGasLimits","type":"bytes32","internalType":"bytes32"},{"name":"preVerificationGas","type":"uint256","internalType":"uint256"},{"name":"gasFees","type":"bytes32","internalType":"bytes32"},{"name":"paymasterAndData","type":"bytes","internalType":"bytes"},{"name":"signature","type":"bytes","internalType":"bytes"}]},{"name":"userOpHash","type":"bytes32","internalType":"bytes32"},{"name":"missingAccountFunds","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"validationData","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"whitelist","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"event","name":"AddressBlacklisted","inputs":[{"name":"addr","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"AddressWhitelisted","inputs":[{"name":"addr","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"BatchApproved","inputs":[{"name":"operator","type":"address","indexed":true,"internalType":"address"},{"name":"data","type":"bytes","indexed":false,"internalType":"bytes"}],"anonymous":false},{"type":"event","name":"BatchOperationResult","inputs":[{"name":"index","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"dest","type":"address","indexed":false,"internalType":"address"},{"name":"success","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"DailyLimitSet","inputs":[{"name":"newLimit","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"GuardianAdded","inputs":[{"name":"guardian","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"GuardianRemoved","inputs":[{"name":"guardian","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"OTPUsed","inputs":[{"name":"otp","type":"bytes32","indexed":true,"internalType":"bytes32"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"RecoveryTriggered","inputs":[{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"SecondaryKeySet","inputs":[{"name":"newKey","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"TransactionExecuted","inputs":[{"name":"dest","type":"address","indexed":true,"internalType":"address"},{"name":"value","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"success","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"error","name":"ECDSAInvalidSignature","inputs":[]},{"type":"error","name":"ECDSAInvalidSignatureLength","inputs":[{"name":"length","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ECDSAInvalidSignatureS","inputs":[{"name":"s","type":"bytes32","internalType":"bytes32"}]},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]}
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
        <div className="feature-card">
          <h2>
            <span className="feature-icon">{formatFeatureIcon("Set Secondary Key")}</span>
            Set Secondary Key
          </h2>
          <div className="feature-description">
            Add an extra security key for multi-factor authentication
          </div>
          <input
            type="text"
            name="newSecondaryKey"
            placeholder="New secondary key address"
            onChange={handleChange}
          />
          <button onClick={() => executeWithTimer('setSecondaryKey', [formData.newSecondaryKey])}>
            Set Secondary Key
          </button>
        </div>

        <div className="feature-card">
          <h2>
            <span className="feature-icon">{formatFeatureIcon("Multi-Factor Authentication")}</span>
            Multi-Factor Authentication
          </h2>
          <div className="feature-description">
            Execute transactions with additional security verification
          </div>
          <input type="text" name="dest" placeholder="Destination address" onChange={handleChange} />
          <input type="text" name="value" placeholder="ETH value" onChange={handleChange} />
          <input type="text" name="data" placeholder="Calldata (optional)" onChange={handleChange} />
          <input type="text" name="otp" placeholder="OTP" value={formData.otp || ''} readOnly className="generated-field" />
          <input
            type="text"
            name="secondarySignature"
            placeholder="Secondary Key Signature"
            value={formData.secondarySignature || ''}
            readOnly
            className="generated-field"
          />
          <div className="button-row">
            <button onClick={generateOtpAndSign}>Generate OTP & Sign</button>
            <button onClick={() => executeWithTimer('executeWithMFA', [formData.dest, ethers.utils.parseEther(formData.value || "0"), formData.data || "0x", formData.otp, formData.secondarySignature])}>
              Execute with MFA
            </button>
          </div>
        </div>

        <div className="feature-card">
          <h2>
            <span className="feature-icon">{formatFeatureIcon("Batch Execution (Transient)")}</span>
            Batch Execution (Transient)
          </h2>
          <div className="feature-description">
            Execute multiple transactions in a single operation with transient security
          </div>
          <input type="text" name="dests" placeholder="Destination addresses (comma-separated)" onChange={handleChange} />
          <input type="text" name="values" placeholder="ETH values (comma-separated)" onChange={handleChange} />
          <input type="text" name="batchData" placeholder="Calldata (comma-separated)" onChange={handleChange} />
          <button onClick={() => executeWithTimer('executeBatchWithTransient', [
            formData.dests ? formData.dests.split(",") : [],
            formData.values ? formData.values.split(",").map((v) => ethers.utils.parseEther(v)) : [],
            formData.batchData ? formData.batchData.split(",") : []
          ])}>
            Execute Transient Batch
          </button>
        </div>

        <div className="feature-card">
          <h2>
            <span className="feature-icon">{formatFeatureIcon("Batch Execution")}</span>
            Batch Execution
          </h2>
          <div className="feature-description">
            Execute multiple transactions in a single operation
          </div>
          <input type="text" name="dests" placeholder="Destination addresses (comma-separated)" onChange={handleChange} />
          <input type="text" name="values" placeholder="ETH values (comma-separated)" onChange={handleChange} />
          <input type="text" name="batchData" placeholder="Calldata (comma-separated)" onChange={handleChange} />
          <button onClick={() => executeWithTimer('executeBatch', [
            formData.dests ? formData.dests.split(",") : [],
            formData.values ? formData.values.split(",").map((v) => ethers.utils.parseEther(v)) : [],
            formData.batchData ? formData.batchData.split(",") : []
          ])}>
            Execute Batch
          </button>
        </div>

        <div className="feature-card">
          <h2>
            <span className="feature-icon">{formatFeatureIcon("Spending Limit (Transient)")}</span>
            Spending Limit (Transient)
          </h2>
          <div className="feature-description">
            Set daily transaction limits with transient security
          </div>
          <input type="text" name="limit" placeholder="Daily limit (ETH)" onChange={handleChange} />
          <button onClick={() => executeWithTimer('setDailyLimit', [ethers.utils.parseEther(formData.limit || "0")])}>
            Set Daily Limit
          </button>
          <input type="text" name="dest" placeholder="Destination address" onChange={handleChange} />
          <input type="text" name="value" placeholder="ETH value" onChange={handleChange} />
          <input type="text" name="data" placeholder="Calldata (optional)" onChange={handleChange} />
          <button onClick={() => executeWithTimer('executeWithLimitTransient', [formData.dest, ethers.utils.parseEther(formData.value || "0"), formData.data || "0x"])}>
            Execute with Transient Limit
          </button>
        </div>

        <div className="feature-card">
          <h2>
            <span className="feature-icon">{formatFeatureIcon("Whitelist & Blacklist")}</span>
            Whitelist & Blacklist
          </h2>
          <div className="feature-description">
            Manage allowed and blocked addresses for transactions
          </div>
          <input type="text" name="whitelistAddress" placeholder="Address to whitelist" onChange={handleChange} />
          <button onClick={() => executeWithTimer('addToWhitelist', [formData.whitelistAddress])}>
            Add to Whitelist
          </button>
          <input type="text" name="blacklistAddress" placeholder="Address to blacklist" onChange={handleChange} />
          <button onClick={() => executeWithTimer('addToBlacklist', [formData.blacklistAddress])}>
            Add to Blacklist
          </button>
        </div>

        <div className="feature-card">
          <h2>
            <span className="feature-icon">{formatFeatureIcon("Social Recovery")}</span>
            Social Recovery
          </h2>
          <div className="feature-description">
            Recover your account with help from designated guardians
          </div>
          <input type="text" name="newOwner" placeholder="New owner address" onChange={handleChange} />
          <input type="text" name="guardianSignatures" placeholder="Guardian signatures (comma-separated)" onChange={handleChange} />
          <button onClick={() => executeWithTimer('triggerRecovery', [formData.newOwner, formData.guardianSignatures ? formData.guardianSignatures.split(",") : []])}>
            Trigger Recovery
          </button>
        </div>
      </div>
    </div>
  );
} 