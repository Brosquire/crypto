//requiring the Block class
const Block = require("./block");
//requiring the cryptoHash
const cryptoHash = require("./crypto-hash");

//creating new class of Blockchain to build off of Block
class Blockchain {
  constructor() {
    //setting the chain to the genesis block to start the chain
    this.chain = [Block.genesis()];
  }
  //function to add the previous block (GENESIS) to the current block (Blockchain)
  addBlock({ data }) {
    //creating the new block using the minedBlock function to create the new data for the current block from the previous block
    const newBlock = Block.minedBlock({
      //setting the last block by finding it in the array hence the chain.length -1
      lastBlock: this.chain[this.chain.length - 1],
      //setting the previous data to the current data
      data
    });
    //pushing the new blockchain to the array of blocks
    this.chain.push(newBlock);
  }

  replaceChain(chain) {
    //check the incoming chain length is less than the current chain and return
    if (chain.length <= this.chain.length) {
      console.error("The incoming chain must be longer");
      return;
    }
    //check if the current Block instance is a valid chain of data
    if (!Blockchain.isValidChain(chain)) {
      console.error("The incoming chain must be valid");
      return;
    }
    //else return the current chain as the new chain given it is the longest AND has valid data
    console.log("replacing chain with: ", chain);
    this.chain = chain;
  }

  //function isValidChain to check if the chain of blocks is valid with correct input/data
  static isValidChain(chain) {
    //converting the chain[0] and Block.genesis to JSON format to compare results
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }
    // //starting for-loop AFTER the Genesis block to check if the following blocks hav e the correct data -- in this case false data to be rejected and returned FALSE
    for (let i = 1; i < chain.length; i++) {
      //destructuring the keys in the Block instance of the chain[i]
      const { timestamp, lastHash, hash, data } = chain[i];
      //setting the actual last hash of the chain by grabbing the most recent hash of the chain
      const actualLastHash = chain[i - 1].hash;
      //checking if the actual last hash is equal to the last hash of the previous block
      if (lastHash !== actualLastHash) return false;
      //converting the timestamp, lasthash, data to be read and compared that it has valid inputs
      const validatedHash = cryptoHash(timestamp, lastHash, data);
      //checking the hash to the validated hash to be accurate
      if (hash !== validatedHash) return false;
    }
    return true;
  }
}

module.exports = Blockchain;
