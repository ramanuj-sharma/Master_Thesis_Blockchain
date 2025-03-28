import React, { useState } from "react";
import { ethers } from "ethers";
import './styles.css'; // Import your styles

export default function EnhancedAccountUI() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [formData, setFormData] = useState({});
  const [network, setNetwork] = useState(null);

  const contractAddress = "0x20a7cFfdE509256e63FC51E40e5dB29401D74DA2"; // Replace with your deployed contract address
  const contractABI = [
      {"type":"constructor","inputs":[{"name":"initialOwner","type":"address","internalType":"address"},{"name":"entryPoint","type":"address","internalType":"contract IEntryPoint"}],"stateMutability":"nonpayable"},{"type":"function","name":"addGuardian","inputs":[{"name":"guardian","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"addToBlacklist","inputs":[{"name":"addr","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"addToWhitelist","inputs":[{"name":"addr","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"approveERC20","inputs":[{"name":"token","type":"address","internalType":"address"},{"name":"spender","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"blacklist","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"dailyLimit","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"dailySpent","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"executeBatch","inputs":[{"name":"dests","type":"address[]","internalType":"address[]"},{"name":"values","type":"uint256[]","internalType":"uint256[]"},{"name":"data","type":"bytes[]","internalType":"bytes[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"executeBatchWithTransient","inputs":[{"name":"dests","type":"address[]","internalType":"address[]"},{"name":"values","type":"uint256[]","internalType":"uint256[]"},{"name":"data","type":"bytes[]","internalType":"bytes[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"executeWithLimitTransient","inputs":[{"name":"dest","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"executeWithMFA","inputs":[{"name":"dest","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"},{"name":"otp","type":"bytes32","internalType":"bytes32"},{"name":"secondarySignature","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getEntryPoint","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"guardians","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"isGuardian","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"lastSpendReset","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"recoveryThreshold","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"removeGuardian","inputs":[{"name":"guardian","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"secondaryKey","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"setDailyLimit","inputs":[{"name":"limit","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setSecondaryKey","inputs":[{"name":"newKey","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"triggerRecovery","inputs":[{"name":"newOwner","type":"address","internalType":"address"},{"name":"guardianSignatures","type":"bytes[]","internalType":"bytes[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"usedOtps","inputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"validateUserOp","inputs":[{"name":"userOp","type":"tuple","internalType":"struct PackedUserOperation","components":[{"name":"sender","type":"address","internalType":"address"},{"name":"nonce","type":"uint256","internalType":"uint256"},{"name":"initCode","type":"bytes","internalType":"bytes"},{"name":"callData","type":"bytes","internalType":"bytes"},{"name":"accountGasLimits","type":"bytes32","internalType":"bytes32"},{"name":"preVerificationGas","type":"uint256","internalType":"uint256"},{"name":"gasFees","type":"bytes32","internalType":"bytes32"},{"name":"paymasterAndData","type":"bytes","internalType":"bytes"},{"name":"signature","type":"bytes","internalType":"bytes"}]},{"name":"userOpHash","type":"bytes32","internalType":"bytes32"},{"name":"missingAccountFunds","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"validationData","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"whitelist","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"event","name":"AddressBlacklisted","inputs":[{"name":"addr","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"AddressWhitelisted","inputs":[{"name":"addr","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"BatchApproved","inputs":[{"name":"operator","type":"address","indexed":true,"internalType":"address"},{"name":"data","type":"bytes","indexed":false,"internalType":"bytes"}],"anonymous":false},{"type":"event","name":"BatchOperationResult","inputs":[{"name":"index","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"dest","type":"address","indexed":false,"internalType":"address"},{"name":"success","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"DailyLimitSet","inputs":[{"name":"newLimit","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"GuardianAdded","inputs":[{"name":"guardian","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"GuardianRemoved","inputs":[{"name":"guardian","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"OTPUsed","inputs":[{"name":"otp","type":"bytes32","indexed":true,"internalType":"bytes32"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"RecoveryTriggered","inputs":[{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"SecondaryKeySet","inputs":[{"name":"newKey","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"TransactionExecuted","inputs":[{"name":"dest","type":"address","indexed":true,"internalType":"address"},{"name":"value","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"success","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"error","name":"ECDSAInvalidSignature","inputs":[]},{"type":"error","name":"ECDSAInvalidSignatureLength","inputs":[{"name":"length","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ECDSAInvalidSignatureS","inputs":[{"name":"s","type":"bytes32","internalType":"bytes32"}]},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]}
  ];

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();

        const networkDetails = await provider.getNetwork();
        setNetwork(networkDetails.name);

        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
        setAccount(userAddress);
        setContract(contractInstance);

        console.log("Wallet connected:", userAddress);
        console.log("Connected to network:", networkDetails.name);
      } catch (error) {
        console.error("Error connecting wallet:", error);
        alert("Failed to connect wallet. Please try again.");
      }
    } else {
      alert("MetaMask not detected! Please install it.");
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
    } catch (error) {
      console.error("Error in OTP generation or signing:", error.message || error);
      alert(`OTP generation or signing failed. Reason: ${error.message || error}`);
    }
  }

  // Measure and display transaction time
  async function executeWithTimer(methodName, methodArgs = []) {
    try {
      const startTime = Date.now();
      
      // Execute the method
      const tx = await contract[methodName](...methodArgs);
      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      
      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);

      alert(`Transaction successful! Time taken: ${duration} seconds`);
    } catch (error) {
      console.error(`${methodName} failed:`, error);
      alert(`${methodName} failed! Ensure all inputs are correct.`);
    }
  }

  return (
    <div className="container">
      <h1>Enhanced Account UI</h1>

      <button onClick={connectWallet} className="connect-button">
        {account ? `Connected: ${account} (${network || "Unknown Network"})` : "Connect Wallet"}
      </button>

      <div className="section">
        <h2>Set Secondary Key</h2>
        <input
          type="text"
          name="newSecondaryKey"
          placeholder="New secondary key"
          onChange={handleChange}
        />
        <button onClick={() => executeWithTimer('setSecondaryKey', [formData.newSecondaryKey])}>
          Set Secondary Key
        </button>
      </div>

      <div className="section">
        <h2>Multi-Factor Authentication</h2>
        <input
          type="text"
          name="dest"
          placeholder="Destination address"
          onChange={handleChange}
        />
        <input
          type="text"
          name="value"
          placeholder="ETH value"
          onChange={handleChange}
        />
        <input
          type="text"
          name="data"
          placeholder="Calldata"
          onChange={handleChange}
        />
        <input
          type="text"
          name="otp"
          placeholder="OTP"
          value={formData.otp || ''}
          readOnly
        />
        <input
          type="text"
          name="secondarySignature"
          placeholder="Secondary Key Signature"
          value={formData.secondarySignature || ''}
          onChange={handleChange}
        />
        <button onClick={generateOtpAndSign}>Generate OTP & Sign</button>
        <button onClick={() => executeWithTimer('executeWithMFA', [formData.dest, ethers.utils.parseEther(formData.value), formData.data, formData.otp, formData.secondarySignature])}>
          Execute with MFA
        </button>
      </div>

      <div className="section">
        <h2>Batch Execution (Transient)</h2>
        <input
          type="text"
          name="dests"
          placeholder="Destination addresses (comma-separated)"
          onChange={handleChange}
        />
        <input
          type="text"
          name="values"
          placeholder="ETH values (comma-separated)"
          onChange={handleChange}
        />
        <input
          type="text"
          name="batchData"
          placeholder="Calldata (comma-separated)"
          onChange={handleChange}
        />
        <button onClick={() => executeWithTimer('executeBatchWithTransient', [
          formData.dests.split(","),
          formData.values.split(",").map((v) => ethers.utils.parseEther(v)),
          formData.batchData.split(",")
        ])}>
          Execute Transient Batch
        </button>
      </div>

      <div className="section">
        <h2>Batch Execution</h2>
        <input
          type="text"
          name="dests"
          placeholder="Destination addresses (comma-separated)"
          onChange={handleChange}
        />
        <input
          type="text"
          name="values"
          placeholder="ETH values (comma-separated)"
          onChange={handleChange}
        />
        <input
          type="text"
          name="batchData"
          placeholder="Calldata (comma-separated)"
          onChange={handleChange}
        />
        <button onClick={() => executeWithTimer('executeBatch', [
          formData.dests.split(","),
          formData.values.split(",").map((v) => ethers.utils.parseEther(v)),
          formData.batchData.split(",")
        ])}>
          Execute Batch
        </button>
      </div>

      <div className="section">
        <h2>Spending Limit (Transient)</h2>
        <input
          type="text"
          name="limit"
          placeholder="Daily limit (ETH)"
          onChange={handleChange}
        />
        <button onClick={() => executeWithTimer('setDailyLimit', [ethers.utils.parseEther(formData.limit)])}>
          Set Daily Limit
        </button>
        <input
          type="text"
          name="dest"
          placeholder="Destination address"
          onChange={handleChange}
        />
        <input
          type="text"
          name="value"
          placeholder="ETH value"
          onChange={handleChange}
        />
        <input
          type="text"
          name="data"
          placeholder="Calldata"
          onChange={handleChange}
        />
        <button onClick={() => executeWithTimer('executeWithLimitTransient', [formData.dest, ethers.utils.parseEther(formData.value), formData.data])}>
          Execute with Transient Limit
        </button>
      </div>

      <div className="section">
        <h2>Spending Limit</h2>
        <input
          type="text"
          name="limit"
          placeholder="Daily limit (ETH)"
          onChange={handleChange}
        />
        <button onClick={() => executeWithTimer('setDailyLimit', [ethers.utils.parseEther(formData.limit)])}>
          Set Daily Limit
        </button>
        <input
          type="text"
          name="dest"
          placeholder="Destination address"
          onChange={handleChange}
        />
        <input
          type="text"
          name="value"
          placeholder="ETH value"
          onChange={handleChange}
        />
        <input
          type="text"
          name="data"
          placeholder="Calldata"
          onChange={handleChange}
        />
        <button onClick={() => executeWithTimer('executeWithLimit', [formData.dest, ethers.utils.parseEther(formData.value), formData.data])}>
          Execute with Limit
        </button>
      </div>

      <div className="section">
        <h2>Whitelist & Blacklist</h2>
        <input
          type="text"
          name="whitelistAddress"
          placeholder="Address to whitelist"
          onChange={handleChange}
        />
        <button onClick={() => executeWithTimer('addToWhitelist', [formData.whitelistAddress])}>
          Add to Whitelist
        </button>
        <input
          type="text"
          name="blacklistAddress"
          placeholder="Address to blacklist"
          onChange={handleChange}
        />
        <button onClick={() => executeWithTimer('addToBlacklist', [formData.blacklistAddress])}>
          Add to Blacklist
        </button>
      </div>

      <div className="section">
        <h2>Social Recovery</h2>
        <input
          type="text"
          name="newOwner"
          placeholder="New owner address"
          onChange={handleChange}
        />
        <input
          type="text"
          name="guardianSignatures"
          placeholder="Guardian signatures (comma-separated)"
          onChange={handleChange}
        />
        <button onClick={() => executeWithTimer('triggerRecovery', [formData.newOwner, formData.guardianSignatures.split(",")])}>
          Trigger Recovery
        </button>
      </div>
    </div>
  );
}