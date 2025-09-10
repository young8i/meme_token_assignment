# MemeToken 操作指南

## 一、部署说明（Remix）

1. 打开 [Remix IDE](https://remix.ethereum.org/)
2. 新建文件 `MemeToken.sol`，粘贴合约代码；
3. 在“Solidity Compiler”中选择版本 `^0.8.20` 并编译；
4. 在“Deploy & Run”模块中：
   - 环境选择 Injected Web3（如已连接 MetaMask）；
   - 构造函数参数：
     - `_router`: Uniswap V2 Router 地址（如测试网）；
     - `_taxWallet`: 税收接收地址（可为你自己地址）；
   - 点击 `Deploy` 进行部署。

## 二、主要功能说明

### 1. 转账带税

调用 `transfer(to, amount)` 即自动收取 5% 税，转至 `taxWallet`。

### 2. 添加流动性

部署者调用：

```solidity
addLiquidity(tokenAmount)
```

同时发送 ETH，即可添加流动性至 Uniswap。

### 3. 移除流动性

部署者调用：

```solidity
removeLiquidity(lpTokenAmount)
```

移除流动性获得 Token + ETH。

### 4. 交易限制

- 每笔交易不得超过总供应的 1%
- 同一地址同一区块不能连续交易

## 三、注意事项

- 税收地址建议为多签或 DAO 控制；
- 使用 Uniswap 时请确认 router 地址；
- 若测试网部署，请提前领取测试 ETH；
- 可使用 MetaMask + Sepolia、Hardhat 等工具组合。