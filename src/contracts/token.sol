// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.5.0) (token/ERC20/ERC20.sol)
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BCToken is ERC20 {
    address public admin;

    constructor() ERC20("BCTokens", "BCT") {
        _mint(msg.sender, 1000 * 10**2);
        admin = msg.sender;
    }

    function balanceOfUser(address account) public view returns (uint256) {
        return balanceOf(account);
    }

    function transferTo(address to, uint256 amount) external {
        // uint256 newamount = amount * 10**2;
        _transfer(msg.sender, to, amount);
    }

    function mint(address to, uint256 amount) private {
        require(msg.sender == admin, "Only Admin!!");
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        // uint256 newamount = amount * 10**2;
        _burn(msg.sender, amount);
    }
}
