const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

//initial Block class constructor - wrapped constructor in curly braces to avoid correct order needed
class Block {
  constructor({ lastHash, hash, data, timestamp }) {
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.timestamp = timestamp;
  }
  //setting function to create first block AKA genesis block using a static function calling the constructpor class
  //factory method = create instances of a class without directly using the constructor method
  static genesis() {
    //can swap out Block for "this" keyword given  its in the scope of its constructor class
    return new Block(GENESIS_DATA);
  }
  //creating a static function to create new blocks AKA "Mined Blocks" using the previous blocks data, hash, lasthash
  static minedBlock({ lastBlock, data }) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    //can swap out Block for "this" keyword given  its in the scope of its constructor class
    return new Block({
      timestamp,
      lastHash,
      data,
      hash: cryptoHash(timestamp, lastHash, data)
    });
  }
}

//node.js syntax to export and share js files among other js files
module.exports = Block;
