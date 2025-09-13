// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

// Uniswap V2 Router 接口（用于添加/移除流动性）
interface IUniswapV2Router {
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);

    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountToken, uint amountETH);
}

/// @title MemeToken - 一个支持交易税、Uniswap交互、交易限制的 MEME 代币
/// @author Solidity Assignment
contract MemeToken is ERC20, Ownable {
    using Address for address;

    // 税率（单位：百分比）
    uint256 public taxRate = 5;
    // 收税地址
    address public taxWallet;
    // Uniswap 路由器合约地址
    IUniswapV2Router public uniswapRouter;
    // 地址最后交易的区块号
    mapping(address => uint256) public lastTxBlock;
    // 单笔最大交易数量限制
    uint256 public maxTxAmount;

    /// @notice 合约构造函数
    /// @param _router Uniswap Router 地址
    /// @param _taxWallet 用于收税的地址
    constructor(address _router, address _taxWallet) ERC20("MemeToken", "MEME") {
        _mint(msg.sender, 1_000_000 * 10 ** decimals()); // 初始铸币 100 万个
        taxWallet = _taxWallet;
        uniswapRouter = IUniswapV2Router(_router);
        maxTxAmount = totalSupply() / 100; // 最大交易额度为总供应的 1%
    }

    /// @notice 重写 _transfer，实现交易税与限制逻辑
    function _transfer(address sender, address recipient, uint256 amount) internal override {
        require(amount <= maxTxAmount, "Exceeds max tx amount");
        require(block.number > lastTxBlock[sender], "Tx frequency too high");

        lastTxBlock[sender] = block.number;

        // 计算税费并执行收税
        uint256 tax = amount * taxRate / 100;
        uint256 netAmount = amount - tax;

        // 转给税收地址和目标地址
        super._transfer(sender, taxWallet, tax);
        super._transfer(sender, recipient, netAmount);
    }

    /// @notice 向 Uniswap 添加流动性（需发送 ETH）
    /// @param tokenAmount 提供的代币数量
    function addLiquidity(uint tokenAmount) external payable onlyOwner {
        _approve(address(this), address(uniswapRouter), tokenAmount);
        uniswapRouter.addLiquidityETH{value: msg.value}(
            address(this),
            tokenAmount,
            0,
            0,
            owner(),
            block.timestamp
        );
    }

    /// @notice 从 Uniswap 移除流动性
    /// @param liquidity LP Token 数量
    function removeLiquidity(uint liquidity) external onlyOwner {
        uniswapRouter.removeLiquidityETH(
            address(this),
            liquidity,
            0,
            0,
            owner(),
            block.timestamp
        );
    }

    /// @notice 接收 ETH（用于添加流动性）
    receive() external payable {}
}