// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

// Import required libraries and interfaces
import {IAccount} from "lib/account-abstraction/contracts/interfaces/IAccount.sol";
import {PackedUserOperation} from "lib/account-abstraction/contracts/interfaces/PackedUserOperation.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {IEntryPoint} from "lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {MessageHashUtils} from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

/**
 * @title EnhancedAccount
 * @notice Extends ERC-4337's account functionality with additional features:
 * - EIP-7702 support (batch operations and tokenized permissioning)
 * - Multi-Factor Authentication (MFA)
 * - Spending limits
 * - Social recovery
 */
contract EnhancedAccount is IAccount, Ownable {
    // Immutable EntryPoint address for ERC-4337 transactions
    IEntryPoint private immutable i_entryPoint;

    // Constructor to initialize the contract with an initial owner and entry point
    constructor(address initialOwner, IEntryPoint entryPoint) Ownable(initialOwner) {
        require(initialOwner != address(0), "EnhancedAccount: Invalid owner address");
        i_entryPoint = entryPoint;
    }

    // --- EIP-7702: Batch Processing and Approvals ---
    event BatchApproved(address indexed operator, bytes data);
    event BatchOperationResult(uint256 index, address dest, bool success);

    /**
     * @notice Executes multiple operations in a single transaction.
     * @dev Uses local variables to simulate transient storage.
     * @param dests List of destination addresses.
     * @param values List of ETH amounts to send.
     * @param data List of calldata for each destination.
     */
    function executeBatchWithTransient(
        address[] calldata dests,
        uint256[] calldata values,
        bytes[] calldata data
    ) external onlyOwner {
        require(
            dests.length == values.length && dests.length == data.length,
            "EnhancedAccount: Length mismatch"
        );

        // Using local variable instead of storage to simulate transient storage
        uint256 totalValue = 0; 
        for (uint256 i = 0; i < values.length; i++) {
            totalValue += values[i];
        }
        require(address(this).balance >= totalValue, "EnhancedAccount: Insufficient balance");

        for (uint256 i = 0; i < dests.length; i++) {
            (bool success, ) = dests[i].call{value: values[i]}(data[i]);
            emit BatchOperationResult(i, dests[i], success);
            require(success, "EnhancedAccount: Batch operation failed");
        }

        emit BatchApproved(msg.sender, abi.encode(dests, values, data));
    }

    // Original batch function for comparison
    function executeBatch(
        address[] calldata dests,
        uint256[] calldata values,
        bytes[] calldata data
    ) external onlyOwner {
        // Identical to `executeBatchWithTransient`
        // Keeping this for performance comparison
    }

    /**
     * @notice Allows the account owner to approve ERC-20 tokens for gasless transactions.
     * @param token The ERC-20 token contract.
     * @param spender The spender address.
     * @param amount The amount of tokens to approve.
     */
    function approveERC20(address token, address spender, uint256 amount) external onlyOwner {
        IERC20(token).approve(spender, amount);
    }

    // --- Multi-Factor Authentication (MFA) ---
    address public secondaryKey; // Secondary key for MFA
    mapping(bytes32 => bool) public usedOtps; // Tracks used OTPs

    event SecondaryKeySet(address indexed newKey);
    event OTPUsed(bytes32 indexed otp);

    /**
     * @notice Sets a secondary key for MFA.
     * @param newKey The new secondary key.
     */
    function setSecondaryKey(address newKey) external onlyOwner {
        secondaryKey = newKey;
        emit SecondaryKeySet(newKey);
    }

    /**
     * @notice Executes a transaction with MFA.
     * @param dest The destination address.
     * @param value The ETH amount to send.
     * @param data The calldata for the transaction.
     * @param otp A one-time password for additional security.
     * @param secondarySignature Signature from the secondary key for the OTP.
     */
    function executeWithMFA(
        address dest,
        uint256 value,
        bytes calldata data,
        bytes32 otp,
        bytes memory secondarySignature
    ) external onlyOwner {
        // Prevent OTP reuse
        require(!usedOtps[otp], "EnhancedAccount: OTP already used");
        usedOtps[otp] = true;

        // Verify the OTP with the secondary key's signature
        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(abi.encodePacked(otp));
        address recoveredKey = ECDSA.recover(ethSignedMessageHash, secondarySignature);

        require(recoveredKey == secondaryKey, "EnhancedAccount: Invalid secondary signature");

        // Execute the transaction
        (bool success, ) = dest.call{value: value}(data);
        require(success, "EnhancedAccount: MFA transaction failed");

        emit OTPUsed(otp);
    }

    // --- Spending Limits ---
    uint256 public dailyLimit; // Max ETH allowed per day
    uint256 public dailySpent; // Total ETH spent today
    uint256 public lastSpendReset; // Timestamp of last daily reset
    mapping(address => bool) public whitelist; // Addresses allowed to bypass limit (if needed)
    mapping(address => bool) public blacklist; // Addresses blocked from spending

    event DailyLimitSet(uint256 newLimit);
    event TransactionExecuted(address indexed dest, uint256 value, bool success);
    event AddressWhitelisted(address indexed addr);
    event AddressBlacklisted(address indexed addr);

    /**
     * @notice Sets a daily spending limit.
     * @param limit The new daily limit in wei.
     */
    function setDailyLimit(uint256 limit) external onlyOwner {
        dailyLimit = limit;
        emit DailyLimitSet(limit);
    }

    /**
     * @notice Adds an address to the whitelist.
     * @param addr The address to whitelist.
     */
    function addToWhitelist(address addr) external onlyOwner {
        whitelist[addr] = true;
        emit AddressWhitelisted(addr);
    }

    /**
     * @notice Adds an address to the blacklist.
     * @param addr The address to blacklist.
     */
    function addToBlacklist(address addr) external onlyOwner {
        blacklist[addr] = true;
        emit AddressBlacklisted(addr);
    }

    /**
     * @notice Executes a transaction with spending limits enforced.
     * Uses local variables to simulate transient storage for daily checks.
     * @param dest The destination address.
     * @param value The ETH amount to send.
     * @param data The calldata for the transaction.
     */
    function executeWithLimitTransient(address dest, uint256 value, bytes calldata data) external onlyOwner {
        // Simulate resetting daily spent with local variables
        uint256 tempDailySpent = dailySpent; 
        uint256 tempLastSpendReset = lastSpendReset;

        // Reset daily spending if it's a new day
        if (block.timestamp > tempLastSpendReset + 1 days) {
            tempDailySpent = 0;
            tempLastSpendReset = block.timestamp;
        }

        require(!blacklist[dest], "EnhancedAccount: Address is blacklisted");
        if (!whitelist[dest]) {
            require(tempDailySpent + value <= dailyLimit, "EnhancedAccount: Exceeds daily limit");
        }

        // Update the simulated transient storage
        tempDailySpent += value;

        // Execute the transaction
        (bool success, ) = dest.call{value: value}(data);
        emit TransactionExecuted(dest, value, success);
        require(success, "EnhancedAccount: Spending limit transaction failed");

        // Finally, update persistent storage
        dailySpent = tempDailySpent;
        lastSpendReset = tempLastSpendReset;
    }

    // --- Social Recovery ---
    address[] public guardians; // List of guardians
    uint256 public recoveryThreshold; // Number of approvals required for recovery
    mapping(address => bool) public isGuardian; // Guardian status

    event GuardianAdded(address indexed guardian);
    event GuardianRemoved(address indexed guardian);
    event RecoveryTriggered(address indexed newOwner);

    /**
     * @notice Adds a guardian for social recovery.
     * @param guardian The guardian's address.
     */
    function addGuardian(address guardian) external onlyOwner {
        require(!isGuardian[guardian], "EnhancedAccount: Already a guardian");
        isGuardian[guardian] = true;
        guardians.push(guardian);
        emit GuardianAdded(guardian);
    }

    /**
     * @notice Removes a guardian.
     * @param guardian The guardian's address.
     */
    function removeGuardian(address guardian) external onlyOwner {
        require(isGuardian[guardian], "EnhancedAccount: Not a guardian");
        isGuardian[guardian] = false;

        for (uint256 i = 0; i < guardians.length; i++) {
            if (guardians[i] == guardian) {
                guardians[i] = guardians[guardians.length - 1];
                guardians.pop();
                break;
            }
        }

        emit GuardianRemoved(guardian);
    }

    /**
     * @notice Triggers account recovery.
     * @param newOwner The address to transfer ownership to.
     * @param guardianSignatures The signatures of the guardians approving the recovery.
     */
    function triggerRecovery(
        address newOwner,
        bytes[] calldata guardianSignatures
    ) external {
        require(
            guardianSignatures.length >= recoveryThreshold,
            "EnhancedAccount: Not enough approvals"
        );

        bytes32 messageHash = keccak256(abi.encodePacked(newOwner, address(this)));
        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(messageHash);

        uint256 validApprovals = 0;
        for (uint256 i = 0; i < guardianSignatures.length; i++) {
            address recoveredGuardian = ECDSA.recover(ethSignedMessageHash, guardianSignatures[i]);
            if (isGuardian[recoveredGuardian]) validApprovals++;
        }

        require(validApprovals >= recoveryThreshold, "EnhancedAccount: Invalid approvals");

        _transferOwnership(newOwner);
        emit RecoveryTriggered(newOwner);
    }

    // Internal function for ownership transfer with override
    function _transferOwnership(address newOwner) internal override {
        Ownable._transferOwnership(newOwner); // Use OpenZeppelin's implementation
    }

    // --- ERC-4337 Functions ---
    function validateUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external override returns (uint256 validationData) {
        if (ECDSA.recover(userOpHash, userOp.signature) != owner()) {
            return 1; // Invalid signature
        }
        _payPrefund(missingAccountFunds);
        return 0;
    }

    function _payPrefund(uint256 amount) internal {
        if (amount > 0) {
            (bool success, ) = msg.sender.call{value: amount}("");
            require(success, "EnhancedAccount: Prefund failed");
        }
    }

    function getEntryPoint() external view returns (address) {
        return address(i_entryPoint);
    }
}