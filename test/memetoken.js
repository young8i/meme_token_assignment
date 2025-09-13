const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = require("ethers");

describe("MemeToken", function () {
  let token, deployer, user1, user2;

  beforeEach(async function () {
    [deployer, user1, user2] = await ethers.getSigners();
    const MemeToken = await ethers.getContractFactory("MemeToken");
    token = await MemeToken.deploy(ethers.ZeroAddress, deployer.address);
  });

  it("should apply tax on transfers", async function () {
    const amount = parseEther("100");

    await token.transfer(user1.address, amount);
    await token.connect(user1).transfer(user2.address, parseEther("50"));

    const balance2 = await token.balanceOf(user2.address);
    const expected = parseEther("47.5"); // 5% 税收

    expect(balance2).to.equal(expected);
  });

  it("should not allow transfers > 1% of total supply", async function () {
    const overLimit = parseEther("20000"); // 超过总供应 1%
    await expect(token.transfer(user1.address, overLimit)).to.be.revertedWith("Exceeds max tx amount");
  });
});
