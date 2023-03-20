// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract SimpleStorage {
    uint256 public number;
    struct People {
        string name;
        uint256 num;
    }

    People[] public list;
    mapping (string => uint256) manToNum;
    
    function store(uint256 num) public {
        number = num;
    }

    function retrieve() public view returns (uint256) {
        return number;
    }

    function addPerson(string memory str, uint256 n) public {
        list.push(People(str, n));
        manToNum[str] = n;
    }
}

// Ganache & Networks
// https://youtu.be/gyMwXuJrbJQ?t=24911