# Enhanced Account: Blockchain Smart Account System

![Enhanced Account Banner](https://via.placeholder.com/800x200?text=Enhanced+Account+Smart+Wallet)

A secure, feature-rich blockchain account management system for EVM-compatible networks, built as a smart contract wallet with advanced security features.

## Project Overview

This project implements a smart account system that extends traditional EOA (Externally Owned Account) wallets with enhanced security and usability features. It demonstrates Account Abstraction (ERC-4337) principles, allowing for social recovery, multi-factor authentication, batch transactions, and more.

The Enhanced Account serves as a Master's Thesis project showcasing the implementation of next-generation blockchain wallet features that improve user experience while maintaining the highest security standards.

## Features

The Enhanced Account implements the following key features:

### Security Features
- **Multi-Factor Authentication (MFA)**: Execute transactions with 2FA using one-time passwords and secondary key signatures
- **Social Recovery**: Recover your account with the help of trusted guardians if keys are lost
- **Secondary Key Management**: Add an extra security layer with a secondary signing key

### Transaction Features
- **Batch Transaction Execution**: Execute multiple transactions in a single operation
- **Spending Limits**: Set and enforce daily transaction limits
- **Transient Security**: Execute transactions with temporary security rules
- **Whitelist & Blacklist**: Control which addresses can interact with your account

### Account Abstraction
- **ERC-4337 Compatible**: Works with the Account Abstraction standard
- **Bundled Transactions**: Combine multiple operations in a single transaction
- **Gas Abstraction**: Simplified gas management for end users

## Technology Stack

- **Frontend**: React.js with React Router
- **Blockchain Interaction**: ethers.js
- **Styling**: CSS with responsive design
- **Smart Contracts**: Solidity (ERC-4337 compatible)
- **Network**: Compatible with any EVM-based network (Ethereum, Polygon, etc.)

## Setup and Installation

### Prerequisites
- Node.js (v14.0.0 or later)
- npm or yarn
- MetaMask or similar Web3 wallet browser extension

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Master_Thesis_Blockchain.git
   cd Master_Thesis_Blockchain
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Start the development server:
   ```bash
   # In the frontend directory
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage Guide

### Connect Your Wallet
1. Navigate to the welcome page
2. Click "Connect Wallet" button
3. Approve the connection request in your MetaMask (or other wallet)

### Using Enhanced Account Features

#### Multi-Factor Authentication
1. Navigate to the "Multi-Factor Authentication" card
2. Enter the destination address and ETH value
3. Click "Generate OTP & Sign" to create a one-time password
4. Click "Execute with MFA" to send the transaction with MFA protection

#### Batch Transactions
1. Navigate to the "Batch Execution" card
2. Enter multiple destination addresses (comma-separated)
3. Enter the corresponding ETH values (comma-separated)
4. Optionally provide calldata for each transaction
5. Click "Execute Batch" to send all transactions at once

#### Spending Limits
1. Navigate to the "Spending Limit" card
2. Set your daily spending limit in ETH
3. Execute transactions that will be checked against your limit

#### Social Recovery
1. Navigate to the "Social Recovery" card
2. Enter the new owner address
3. Collect signatures from your trusted guardians
4. Enter the guardian signatures (comma-separated)
5. Click "Trigger Recovery" to recover your account

## Smart Contract Details

### Contract Address
The Enhanced Account contract is deployed at:
`0x20a7cFfdE509256e63FC51E40e5dB29401D74DA2`

### Key Contract Functions

- `executeWithMFA`: Execute a transaction with multi-factor authentication
- `executeBatch`: Execute multiple transactions in a single operation
- `executeBatchWithTransient`: Batch execution with temporary security settings
- `setDailyLimit`: Configure daily spending limits
- `addGuardian`: Add a trusted guardian for social recovery
- `triggerRecovery`: Recover account ownership with guardian signatures
- `addToWhitelist`/`addToBlacklist`: Manage allowed/blocked addresses

### Security Model

The Enhanced Account implements multiple layers of security:

1. **Ownership layer**: Traditional EOA ownership
2. **MFA layer**: Secondary signature requirements
3. **Guardian layer**: Social recovery through trusted parties
4. **Limit layer**: Spending restrictions and transient security
5. **Access Control**: Whitelist/blacklist for approved interactions

## Project Structure

```
Master_Thesis_Blockchain/
├── backend/                # Smart contract code
│   └── contracts/          # Solidity contracts
├── frontend/               # React frontend
│   ├── public/             # Static files
│   └── src/                # Source code
│       ├── components/     # UI components
│       ├── pages/          # Page components
│       │   ├── WelcomePage.js      # Landing page
│       │   └── FeaturesPage.js     # Main features interface
│       ├── styles/         # CSS styling
│       └── App.js          # Main application component
└── README.md               # Project documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

[Your Name] - Master's Thesis Project

## Acknowledgements

- [Ethereum Foundation](https://ethereum.org)
- [Account Abstraction (ERC-4337)](https://eips.ethereum.org/EIPS/eip-4337)
- [ethers.js](https://docs.ethers.io/v5/)
- [React](https://reactjs.org)