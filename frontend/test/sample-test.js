const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("mint NFT token and return tokenId", function () {
  it("Should the contract be able to mint a function and return it", async function () {
    const metadata = "https://opensea-creatures-api.herokuapp.com/api/creature/1" //Random metadata url

    const NFTContract = await ethers.getContractFactory("NFT"); // Getting the contract

    const nftContract = await NFTContract.deploy(); //Deploying the Contract

    // use promise to make sure get tokenId
    let transaction = await nftContract.mintNFT(metadata); // Minting the token
    const tx = await transaction.wait() // Waiting for the token to be minted

    transaction = await Promise.all(transaction.map(async i => {
        const tokenURI = await nftContract.tokenURI(i.tokenId)

        let transaction = {
            tokenId: i.tokenId.toString(),
            tokenURI
        }

        return transaction
    }))

    
    // const event = tx.events[0];
    // const value = event.args[2];
    // const tokenId = value.toNumber(); // Getting the tokenID

    
    const tokenURI = await nftContract.tokenURI(tokenId) // Using the tokenURI from ERC721 to retrieve de metadata
    

    expect(tokenURI).to.be.equal(metadata); // Comparing and testing


    
  });
});
