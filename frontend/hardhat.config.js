require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
const {RINKEBY_URL, PRIVATE_KEY} = process.env;

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
