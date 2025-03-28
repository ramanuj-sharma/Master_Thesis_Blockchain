require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {},
    goerli: {
      url: "https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID", // Replace with Infura project URL
      accounts: ["3fc5bf317102ba7130c97bb7c235eaf9729a12dacfd2e160198ab12813fc6833"], // Replace with your wallet private key
    },
  },
};
