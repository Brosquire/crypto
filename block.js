//initial Block class constructor - wrapped constructor in curly braces to avoid correct order needed
class Block {
  constructor({ lastHash, hash, data, timestamp }) {
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

//new Block class instance with dummy values
const block1 = new Block({
  lastHash: "foo-lastHash",
  hash: "foo-hash",
  data: "foo-data",
  timestamp: "01/01/01"
});
console.log("block1", block1);
