const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const MemeToken = await hre.ethers.getContractFactory("MemeToken");

  // 示例：使用 Uniswap V2 Router 地址和你的钱包作为 taxWallet
  const routerAddress = "0xYourUniswapRouterAddress"; // 替换为实际地址（如 Sepolia）
  const taxWallet = deployer.address;

  const token = await MemeToken.deploy(routerAddress, taxWallet);
  await token.deployed();

  console.log("MemeToken deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});