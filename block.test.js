//importing Block class from Block.js to be tested
const Block = require("./block");
//importing GENESIS_DATA from config.js
const { GENESIS_DATA } = require("./config.js");
//requiring cryptoHash function
const cryptoHash = require("./crypto-hash");

//initiating test using describe keyword native to the jest library (first: Class second: js function using cb)
describe("Block", () => {
  //setting variables to each key value we are testing
  const timestamp = "a-date";
  const data = ["blockchain", "data"];
  const lastHash = "foo-hash";
  const hash = "bar-hash";
  //new instance of the Block class using es6 syntax for keys and values
  const block = new Block({
    timestamp,
    lastHash,
    hash,
    data
  });
  //initializing a test using the "it" keyword - first:string message second: cb function
  //***      test best practice is to have one expect function per it block    *****
  it("has a timestamnp, lastHash, hash, and data property", () => {
    //expect keyword  to run tests as it should expect to run ....
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });

  describe("genesis()", () => {
    const genesisBlock = Block.genesis();

    it("returns a Block instance", () => {
      //instanceof is native to javascript  that returns a TRUE or FALSE value based on the two comparison objects
      //toBe is the method used for determining TRUE or FALSE values using the jest libraray
      expect(genesisBlock instanceof Block).toBe(true);
    });
    it("returns the genesis data", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe("mineBlock", () => {
    //created const equal  to the Block Genesis (starting point)
    const lastBlock = Block.genesis();
    //created const of data equal to the mining of blocks
    const data = "mined-data";
    //created a minedBlock with the previous instance of a Block with the data supplied from new Block
    const minedBlock = Block.minedBlock({ lastBlock, data });

    it("returns a Block Instance", () => {
      expect(minedBlock instanceof Block).toBe(true);
    });
    it(`sets the "lastHash" of minedBlock to be equal to the "hash" of the lastBlock`, () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it("sets the data", () => {
      expect(minedBlock.data).toEqual(data);
    });
    //  .not.toEqual is a chain method to check the opposite of Equal to AKA "NOT EQUAL"
    it("sets a timestamp", () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });
    it("creates a SHA-256 based on the proper inputs", () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(minedBlock.timestamp, lastBlock.hash, data)
      );
    });
  });
});
