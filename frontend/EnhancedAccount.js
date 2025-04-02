import React, { useState } from "react";
import { ethers } from "ethers";

export default function EnhancedAccountUI() {
  const [account, setAccount] = useState(null); // Holds the user's connected account
  const [contract, setContract] = useState(null); // Holds the contract instance
  const [formData, setFormData] = useState({
    dests: "",
    values: "",
    data: "",
    otp: "",
    secondarySignature: "",
    newOwner: "",
    guardianSignatures: "",
  }); // Holds form input data

  const contractAddress = "0x16576Ba3a355c821B56cc9185b6B17721Ee01362"; // Replace with your deployed contract address
  const contractABI = [
    {"type":"constructor","inputs":[{"name":"initialOwner","type":"address","internalType":"address"},{"name":"entryPoint","type":"address","internalType":"contract IEntryPoint"}],"stateMutability":"nonpayable"},{"type":"receive","stateMutability":"payable"},{"type":"function","name":"addGuardian","inputs":[{"name":"guardian","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"addToBlacklist","inputs":[{"name":"addr","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"addToWhitelist","inputs":[{"name":"addr","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"approveERC20","inputs":[{"name":"token","type":"address","internalType":"address"},{"name":"spender","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"blacklist","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"dailyLimit","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"dailySpent","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"executeBatch","inputs":[{"name":"dests","type":"address[]","internalType":"address[]"},{"name":"values","type":"uint256[]","internalType":"uint256[]"},{"name":"data","type":"bytes[]","internalType":"bytes[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"executeBatchWithTransient","inputs":[{"name":"dests","type":"address[]","internalType":"address[]"},{"name":"values","type":"uint256[]","internalType":"uint256[]"},{"name":"data","type":"bytes[]","internalType":"bytes[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"executeWithLimitTransient","inputs":[{"name":"dest","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"executeWithMFA","inputs":[{"name":"dest","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"},{"name":"otp","type":"bytes32","internalType":"bytes32"},{"name":"secondarySignature","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getEntryPoint","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"guardians","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"isGuardian","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"lastSpendReset","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"recoveryThreshold","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"removeGuardian","inputs":[{"name":"guardian","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"secondaryKey","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"setDailyLimit","inputs":[{"name":"limit","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setSecondaryKey","inputs":[{"name":"newKey","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"triggerRecovery","inputs":[{"name":"newOwner","type":"address","internalType":"address"},{"name":"guardianSignatures","type":"bytes[]","internalType":"bytes[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"usedOtps","inputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"validateUserOp","inputs":[{"name":"userOp","type":"tuple","internalType":"struct PackedUserOperation","components":[{"name":"sender","type":"address","internalType":"address"},{"name":"nonce","type":"uint256","internalType":"uint256"},{"name":"initCode","type":"bytes","internalType":"bytes"},{"name":"callData","type":"bytes","internalType":"bytes"},{"name":"accountGasLimits","type":"bytes32","internalType":"bytes32"},{"name":"preVerificationGas","type":"uint256","internalType":"uint256"},{"name":"gasFees","type":"bytes32","internalType":"bytes32"},{"name":"paymasterAndData","type":"bytes","internalType":"bytes"},{"name":"signature","type":"bytes","internalType":"bytes"}]},{"name":"userOpHash","type":"bytes32","internalType":"bytes32"},{"name":"missingAccountFunds","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"validationData","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"whitelist","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"event","name":"AddressBlacklisted","inputs":[{"name":"addr","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"AddressWhitelisted","inputs":[{"name":"addr","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"BatchApproved","inputs":[{"name":"operator","type":"address","indexed":true,"internalType":"address"},{"name":"data","type":"bytes","indexed":false,"internalType":"bytes"}],"anonymous":false},{"type":"event","name":"BatchOperationResult","inputs":[{"name":"index","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"dest","type":"address","indexed":false,"internalType":"address"},{"name":"success","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"DailyLimitSet","inputs":[{"name":"newLimit","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"GuardianAdded","inputs":[{"name":"guardian","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"GuardianRemoved","inputs":[{"name":"guardian","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"OTPUsed","inputs":[{"name":"otp","type":"bytes32","indexed":true,"internalType":"bytes32"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"RecoveryTriggered","inputs":[{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"SecondaryKeySet","inputs":[{"name":"newKey","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"TransactionExecuted","inputs":[{"name":"dest","type":"address","indexed":true,"internalType":"address"},{"name":"value","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"success","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"error","name":"ECDSAInvalidSignature","inputs":[]},{"type":"error","name":"ECDSAInvalidSignatureLength","inputs":[{"name":"length","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ECDSAInvalidSignatureS","inputs":[{"name":"s","type":"bytes32","internalType":"bytes32"}]},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]}
  ];

  // Function to connect the user's wallet
  async function connectWallet() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request user's wallet connection
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
      setAccount(await signer.getAddress()); // Store connected account address
      setContract(contractInstance); // Store contract instance
    } else {
      alert("MetaMask not detected! Please install it to continue.");
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
      alert("Batch execution failed. Reason: " + error.message);
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
      alert("MFA transaction failed. Reason: " + error.message);
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
      alert("Transaction executed successfully!");
    } catch (error) {
      console.error(error);
      alert("Transaction failed or exceeds limit. Reason: " + error.message);
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
      alert("Recovery failed. Reason: " + error.message);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Enhanced Account Interface</h1>
      <button
        onClick={connectWallet}
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded mb-4"
      >
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
      </button>

      {/* Batch Execution Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Batch Execution</h2>
        <input
          type="text"
          name="dests"
          placeholder="Destination addresses (comma-separated)"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="values"
          placeholder="ETH values (comma-separated)"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="data"
          placeholder="Calldata (comma-separated)"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
          required
        />
        <button
          onClick={executeBatch}
          className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded"
        >
          Execute Batch
        </button>
      </section>

      {/* Multi-Factor Authentication Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Multi-Factor Authentication</h2>
        <input
          type="text"
          name="dest"
          placeholder="Destination address"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="value"
          placeholder="ETH value"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="data"
          placeholder="Calldata"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="otp"
          placeholder="One-Time Password (OTP)"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="secondarySignature"
          placeholder="Secondary Signature"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
          required
        />
        <button
          onClick={executeWithMFA}
          className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded"
        >
          Execute with MFA
        </button>
      </section>

      {/* Spending Limit Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Execute with Spending Limit</h2>
        <input
          type="text"
          name="dest"
          placeholder="Destination address"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="value"
          placeholder="ETH value"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="data"
          placeholder="Calldata"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
          required
        />
        <button
          onClick={executeWithLimit}
          className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded"
        >
          Execute with Limit
        </button>
      </section>

      {/* Social Recovery Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Social Recovery</h2>
        <input
          type="text"
          name="newOwner"
          placeholder="New Owner Address"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="guardianSignatures"
          placeholder="Guardian Signatures (comma-separated)"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
          required
        />
        <button
          onClick={triggerRecovery}
          className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded"
        >
          Trigger Recovery
        </button>
      </section>
    </div>
  );
}