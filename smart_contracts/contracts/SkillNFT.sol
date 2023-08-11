// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SkillNFT is ERC721{
    using Counters for Counters.Counter;
    Counters.Counter private _totalSupply;

    mapping(uint256 => string) internal eas_uid;
    
    constructor() ERC721("SkillNFT", "SKNFT") {}

    function totalSupply() public view returns(uint256){
        return _totalSupply.current();
    }

    function mint(string calldata _uid) public{
        _totalSupply.increment();
        uint256 _tokenId = _totalSupply.current();
        eas_uid[_tokenId] = _uid;
        _mint(msg.sender, _tokenId);
    }

    function getEASUID(uint256 _tokenId) public view returns(string memory){
        require(_exists(_tokenId), "SkillNFT: Token does not exist");
        return eas_uid[_tokenId];
    }
   
}