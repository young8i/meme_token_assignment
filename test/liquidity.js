const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = require("ethers");

describe("MemeToken with Liquidity", function () {
  let token, deployer, MockRouter;

  beforeEach(async function () {
    [deployer] = await ethers.getSigners();

    const MockRouterFactory = await ethers.getContractFactory("MockUniswapRouter");
    MockRouter = await MockRouterFactory.deploy();
    await MockRouter.waitForDeployment();

    const MemeToken = await ethers.getContractFactory("MemeToken");
    token = await MemeToken.deploy(MockRouter.target, deployer.address);

    await token.transfer(token.target, parseEther("10000"));
  });

  it("should call addLiquidityETH on router", async function () {
    const tx = await token.connect(deployer).addLiquidity(parseEther("1000"), { value: parseEther("1") });
    await tx.wait();
    expect(await MockRouter.addLiquidityCalled()).to.equal(true);
  });

  it("should call removeLiquidityETH on router", async function () {
    const tx = await token.connect(deployer).removeLiquidity(100);
    await tx.wait();
    expect(await MockRouter.removeLiquidityCalled()).to.equal(true);
  });
});