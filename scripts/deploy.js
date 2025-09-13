const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const MemeToken = await hre.ethers.getContractFactory("MemeToken");

  // Uniswap V2 Router 地址和你的钱包作为 taxWallet
  const routerAddress = "0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3";
  const taxWallet = deployer.address;

  const token = await MemeToken.deploy(routerAddress, taxWallet);
  // await token.deployed();

  // console.log("MemeToken deployed to:", token.address);
  console.log("MemeToken deployed to:", token.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});