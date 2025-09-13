# MemeToken 操作指南

## 一、主要功能说明

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