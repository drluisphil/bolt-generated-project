// SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract Roulette {
      event Deposit(address indexed user, uint256 amount);

      function deposit() external payable {
        emit Deposit(msg.sender, msg.value);
      }

      function getBalance(address user) external view returns (uint256) {
        return address(this).balance;
      }
    }
