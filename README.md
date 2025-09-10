# MemeToken Hardhat 项目

本项目用于部署、测试和交互一个具备交易税、流动性池交互与交易限制的 Meme Token 智能合约。

## 项目结构

```
.
├── contracts/
│   └── MemeToken.sol         # 主合约
├── scripts/
│   └── deploy.js             # 部署脚本
├── test/
│   └── memetoken.js          # 测试脚本
├── theory.md                 # 理论分析文档
├── guide.md                  # 操作指南
├── hardhat.config.js         # Hardhat 配置
└── package.json              # Node.js 依赖列表
```

## 🛠️ 安装依赖

```bash
npm install
```

## 🚀 部署合约（测试网）

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## 🧪 执行测试

```bash
npx hardhat test
```