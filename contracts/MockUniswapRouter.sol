// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MockUniswapRouter {
    bool public addLiquidityCalled = false;
    bool public removeLiquidityCalled = false;

    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint, uint, uint) {
        addLiquidityCalled = true;
        return (amountTokenDesired, msg.value, 123);
    }

    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint, uint) {
        removeLiquidityCalled = true;
        return (liquidity, 1 ether);
    }
}