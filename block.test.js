//importing Block class from Block.js to be tested
const Block = require("./block");

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
});
