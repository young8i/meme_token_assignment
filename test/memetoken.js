const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MemeToken", function () {
  let token, deployer, user1, user2;

  beforeEach(async function () {
    [deployer, user1, user2] = await ethers.getSigners();
    const MemeToken = await ethers.getContractFactory("MemeToken");
    token = await MemeToken.deploy(ethers.constants.AddressZero, deployer.address);
    await token.deployed();
  });

  it("should apply tax on transfers", async function () {
    // 先转给 user1 一些 token
    await token.transfer(user1.address, ethers.utils.parseEther("100"));

    // user1 -> user2 转账（应收税）
    await token.connect(user1).transfer(user2.address, ethers.utils.parseEther("50"));

    const balance2 = await token.balanceOf(user2.address);
    const expected = ethers.utils.parseEther("47.5"); // 5% 税

    expect(balance2).to.equal(expected);
  });

  it("should not allow transfers > 1% of total supply", async function () {
    const overLimit = ethers.utils.parseEther("20000"); // 超过 1%
    await expect(token.transfer(user1.address, overLimit)).to.be.revertedWith("Exceeds max tx amount");
  });
});