// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {EntryPoint} from "lib/account-abstraction/contracts/core/EntryPoint.sol";  // EntryPoint for account abstraction

contract HelperConfig is Script {
    error HelperConfig__InvalidChainId();

    // Struct to store network-specific configurations
    struct NetworkConfig {
        address entryPoint;   // EntryPoint address for account abstraction
        address account;      // The account address (e.g., the burner wallet or contract deployer)
    }

    // Constants for different chain IDs
    uint256 constant ETH_SEPOLIA_CHAIN_ID = 11155111; // Ethereum Sepolia testnet
    uint256 constant ZKSYNC_SEPOLIA_CHAIN_ID = 300;   // zkSync Sepolia testnet
    uint256 constant LOCAL_CHAIN_ID = 31337;          // Local Ethereum (Anvil)
    
    // Constant addresses for various network configurations
    address constant BURNER_WALLET = 0x643315C9Be056cDEA171F4e7b2222a4ddaB9F88D; 
    address constant ANVIL_DEFAULT_ACCOUNT = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266; // Local test account

    // Public variable to store local network configuration
    NetworkConfig public localNetworkConfig;

    // Mapping for different network chain IDs to their configurations
    mapping(uint256 => NetworkConfig) public networkConfigs;

    // Constructor to initialize Ethereum Sepolia configuration
    constructor() {
        // Setting up the Sepolia testnet configuration
        networkConfigs[ETH_SEPOLIA_CHAIN_ID] = getEthSepoliaConfig();
    }

    /**
     * @notice Returns the current network configuration based on the chain ID.
     * @return The network configuration for the current chain.
     */
    function getConfig() public returns (NetworkConfig memory) {
        return getConfigByChainId(block.chainid);
    }

    /**
     * @notice Returns the network configuration for a given chain ID.
     * @param chainId The ID of the chain to get configuration for.
     * @return The network configuration for the given chain ID.
     */
    function getConfigByChainId(uint256 chainId) public returns (NetworkConfig memory) {
        // If the local chain is detected, return its configuration
        if (chainId == LOCAL_CHAIN_ID) {
            return getOrCreateAnvilEthConfig();
        }
        // If the configuration exists for the given chain, return it
        else if (networkConfigs[chainId].account != address(0)) {
            return networkConfigs[chainId];
        }
        // If no configuration is found, throw an error
        else {
            revert HelperConfig__InvalidChainId();
        }
    }

    /**
     * @notice Provides the network configuration for the Ethereum Sepolia testnet.
     * @return The network configuration for Ethereum Sepolia.
     */
    function getEthSepoliaConfig() public pure returns (NetworkConfig memory) {
        // Returning configuration for Sepolia testnet
        return NetworkConfig({
            entryPoint: 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789, // Sepolia EntryPoint address
            account: BURNER_WALLET // Burner Wallet address for Sepolia
        });
    }

    /**
     * @notice Provides the network configuration for zkSync Sepolia testnet.
     * @return The network configuration for zkSync Sepolia.
     */
    function getZkSyncSepoliaConfig() public pure returns (NetworkConfig memory) {
        // Returning configuration for zkSync Sepolia
        return NetworkConfig({
            entryPoint: address(0), // Placeholder, actual address would be zkSync EntryPoint
            account: BURNER_WALLET // Burner Wallet address for zkSync Sepolia
        });
    }

    /**
     * @notice Creates a mock Anvil Ethereum configuration and deploys the EntryPoint if not already created.
     * @return The network configuration for the local Ethereum network (Anvil).
     */
    function getOrCreateAnvilEthConfig() public returns (NetworkConfig memory) {
        // If the local configuration already exists, return it
        if (localNetworkConfig.account != address(0)) {
            return localNetworkConfig;
        }

        // Deploy a new mock EntryPoint contract for local Ethereum network
        console.log("Deploying mocks...");
        vm.startBroadcast(ANVIL_DEFAULT_ACCOUNT); // Start broadcasting from default account
        EntryPoint entryPoint = new EntryPoint();  // Deploy EntryPoint
        vm.stopBroadcast(); // Stop broadcasting after deployment

        // Store the new local network configuration
        localNetworkConfig = NetworkConfig({
            entryPoint: address(entryPoint), // Store the deployed EntryPoint address
            account: ANVIL_DEFAULT_ACCOUNT   // Store the default account address
        });

        return localNetworkConfig; // Return the local network configuration
    }
}
