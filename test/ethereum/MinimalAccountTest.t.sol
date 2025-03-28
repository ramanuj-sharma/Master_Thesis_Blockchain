
pragma solidity 0.8.24;
/*
import {Test} from "forge-std/Test.sol";
import {EnhancedAccount} from "src/ethereum/EnhancedAccount.sol";
import {DeployEnhancedAccount} from "script/DeployEnhancedAccount.s.sol";
import {HelperConfig} from "script/HelperConfig.s.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";
import {SendPackedUserOp, PackedUserOperation, IEntryPoint} from "script/SendPackedUserOp.s.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {MessageHashUtils} from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract EnhancedAccountTest is Test {
    using MessageHashUtils for bytes32;

    HelperConfig helperConfig;
    EnhancedAccount enhancedAccount;
    ERC20Mock usdc;
    SendPackedUserOp sendPackedUserOp;

    address randomuser = makeAddr("randomUser");
    uint256 constant AMOUNT = 1e18;

    function setUp() public {
        DeployEnhancedAccount deployenhancedaccount = new DeployEnhancedAccount();
        (helperConfig, EnhancedAccount) = DeployEnhancedAccount.DeployEnhancedAccountAccount();
        usdc = new ERC20Mock();
        sendPackedUserOp = new SendPackedUserOp();
    }

    //USDC mint

    //msg.sender -> enhancedAccount
    //approve some amount
    //USDC contract
    //come from the entrypoint

    function testOwnerCanExecuteCommands() public{
        //arrange
        assertEq(usdc.balanceOf(address(enhancedAccount)), 0);
        address dest = address(usdc);
        uint256 value = 0;
        bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(enhancedAccount), AMOUNT);

        //act
        vm.prank(enhancedAccount.owner());
        enhancedAccount.execute(dest, value, functionData);
        //assert
        assertEq(usdc.balanceOf(address(enhancedAccount)), AMOUNT);
    }

    function testNonOwnerCannotExecuteCommands() public{
        //arrange
        assertEq(usdc.balanceOf(address(enhancedAccount)), 0);
        address dest = address(usdc);
        uint256 value = 0;
        bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(enhancedAccount), AMOUNT);

        //act
        vm.prank(randomuser);
        vm.expectRevert(enhancedAccount.EnahncedAccount_NotFromEntryPointOrOwner.selector);
        EnhancedAccount.execute(dest, value, functionData);

        //assert
    }

    function testRecoverSignedOp() public {
        //arrange
        assertEq(usdc.balanceOf(address(EnhancedAccount)), 0);
        address dest = address(usdc);
        uint256 value = 0;
        bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(EnhancedAccount), AMOUNT);
        
        bytes memory executeCallData = abi.encodeWithSelector(EnhancedAccount.execute.selector, dest, value, functionData);
        PackedUserOperation memory packedUserOp = sendPackedUserOp.generateSignedUserOperaion(executeCallData, helperConfig.getConfig(), address(EnhancedAccount));
        bytes32 userOperationHash = IEntryPoint(helperConfig.getConfig().entryPoint).getUserOpHash(packedUserOp);
        //act
        address actualSigner = ECDSA.recover(userOperationHash.toEthSignedMessageHash(), packedUserOp.signature);
    
        //assert
        assertEq(actualSigner, EnhancedAccount.owner());    
    }

    // sign userops
    // call validate userops
    // assert the return is correct
    function testValidationOfUserOps() public {
        //arrange
        assertEq(usdc.balanceOf(address(EnhancedAccount)), 0);
        address dest = address(usdc);
        uint256 value = 0;
        bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(EnhancedAccount), AMOUNT);
        
        bytes memory executeCallData = abi.encodeWithSelector(EnhancedAccount.execute.selector, dest, value, functionData);
        PackedUserOperation memory packedUserOp = sendPackedUserOp.generateSignedUserOperaion(executeCallData, helperConfig.getConfig(), address(EnhancedAccount));
        bytes32 userOperationHash = IEntryPoint(helperConfig.getConfig().entryPoint).getUserOpHash(packedUserOp);
        uint256 missingAccountFunds = 1e18;

        // act
        vm.prank(helperConfig.getConfig().entryPoint);
        uint256 validationData = EnhancedAccount.validateUserOp(packedUserOp, userOperationHash, missingAccountFunds);
        assertEq(validationData, 0);
    }

    function testEntryPointCanExecuteCommands() public{
        //arrange
        assertEq(usdc.balanceOf(address(EnhancedAccount)), 0);
        address dest = address(usdc);
        uint256 value = 0;
        bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(EnhancedAccount), AMOUNT);
        
        bytes memory executeCallData = abi.encodeWithSelector(EnhancedAccount.execute.selector, dest, value, functionData);
        PackedUserOperation memory packedUserOp = sendPackedUserOp.generateSignedUserOperaion(executeCallData, helperConfig.getConfig(), address(EnhancedAccount));
        //bytes32 userOperationHash = IEntryPoint(helperConfig.getConfig().entryPoint).getUserOpHash(packedUserOp);

        vm.deal(address(EnhancedAccount), 1e18);

        PackedUserOperation[] memory ops = new PackedUserOperation[](1);
        ops[0] = packedUserOp;

        //act
        vm.prank(randomuser);
        IEntryPoint(helperConfig.getConfig().entryPoint).handleOps(ops, payable(randomuser));

        //assert
        assertEq(usdc.balanceOf(address(EnhancedAccount)), AMOUNT);
    }
}

*/