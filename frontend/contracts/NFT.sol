//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';


contract NFT is ERC721URIStorage {

    address private owner;
    // use counter to track token
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    // constructor set up address of marketplace, and token's name, symbol
    constructor() ERC721('NFTSuper', 'NFTS') {
        owner = msg.sender;
    }

    function mintNFT(string memory tokenURI) public returns(uint) {
         // remember to track token
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        // set the token URI: id and url
        _setTokenURI(newItemId, tokenURI);
    
        // mint the token and set it for sale then return the id
        return newItemId;
    }

    function getOwner() public view returns (address){
        return owner;
    }
}
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// import "@openzeppelin/contracts/utils/Counters.sol";

// import "@openzeppelin/contracts/access/Ownable.sol";

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// contract NFT is ERC721URIStorage, Ownable {

//     using Counters for Counters.Counter;

//     Counters.Counter private _tokenIds;


//     constructor() ERC721("MyNFT", "NFT") {}


//     function mintNFT(address recipient, string memory tokenURI)

//         public onlyOwner

//         returns (uint256)

//     {

//         _tokenIds.increment();


//         uint256 newItemId = _tokenIds.current();

//         _mint(recipient, newItemId);

//         _setTokenURI(newItemId, tokenURI);


//         return newItemId;

//     }

// }