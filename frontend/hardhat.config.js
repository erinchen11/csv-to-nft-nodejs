require("@nomiclabs/hardhat-waffle");
// require('dotenv').config();
// const {RINKEBY_URL, PRIVATE_KEY} = process.env;
const RINKEBY_URL="https://rinkeby.infura.io/v3/3bc53211d94d46a683714244969e8f9b"
const PRIVATE_KEY="1a9c43180299c4ad6e0ee8ec6e801aa4d0a9bd14f7e1516133e3e10d17522a68"
console.log(RINKEBY_URL);
console.log(PRIVATE_KEY);
module.exports = {

    defaultNetwork: "rinkeby",
    networks: {
        hardhat: {
            chainId: 1337
        },
        rinkeby: {
            url: RINKEBY_URL,
            accounts: [`0x${PRIVATE_KEY}`]
        }
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
      },
   
    solidity: {
        version: "0.8.4",
        settings: {
            optimizer: {
              enabled: true,
              runs: 200
            }
          }
    }

};
