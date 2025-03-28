// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol"; 
import {EnhancedAccount} from "src/ethereum/EnhancedAccount.sol"; 
import {HelperConfig} from "script/HelperConfig.s.sol";
import {IEntryPoint} from "lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";

/**
 * @title DeployEnhancedAccount
 * @notice Script to deploy the EnhancedAccount contract with the HelperConfig setup.
 */
contract DeployEnhancedAccount is Script {
    /**
     * @notice Main function for deployment.
     */
    function run() public {
        deployEnhancedAccount();
    }
    
    /**
     * @notice Deploys the EnhancedAccount contract and sets the initial configuration.
     * @return HelperConfig and the deployed EnhancedAccount instance.
     */
    function deployEnhancedAccount() public returns (HelperConfig, EnhancedAccount) {
        // Initialize the HelperConfig to retrieve network configuration
        HelperConfig helperConfig = new HelperConfig();
        HelperConfig.NetworkConfig memory config = helperConfig.getConfig();

        // Begin broadcasting to the blockchain (emits transactions)
        vm.startBroadcast(config.account);

        // Cast config.entryPoint to IEntryPoint and deploy the EnhancedAccount contract
        EnhancedAccount enhancedAccount = new EnhancedAccount(
            config.account,
            IEntryPoint(config.entryPoint)
        );

        // End broadcasting
        vm.stopBroadcast();

        // Return the HelperConfig and deployed EnhancedAccount instance
        return (helperConfig, enhancedAccount);
    }
}