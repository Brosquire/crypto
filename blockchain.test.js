const Blockchain = require("./blockchain");
const Block = require("./block");

describe("Blockchain", () => {
  let blockchain, newChain, originalchain;

  //function to reset the blockchain instance to its original set of data before running specific tests
  beforeEach(() => {
    blockchain = new Blockchain();
    newChain = new Blockchain();

    originalchain = blockchain.chain;
  });

  it(`contains a "chain" Array instance`, () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it("starts  with the genesis block", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it("adds a new block to the chain", () => {
    const newData = "foo bar";
    blockchain.addBlock({ data: newData });
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });

  describe("isValidChain()", () => {
    describe("when the chain does not start with the genesis block", () => {
      it("returns false", () => {
        //setting block chain.chain index 0 to a false value
        blockchain.chain[0] = { data: "fake genesis" };
        //checking if our fake data will return false
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    describe("when the chain starts with the genesis block and has multiple blocks", () => {
      beforeEach(() => {
        //setting new blocks with dummy values
        blockchain.addBlock({ data: "bears" });
        blockchain.addBlock({ data: "beats" });
        blockchain.addBlock({ data: "Battlestar Galactica" });
      });

      describe("and lastHash refernce has changed", () => {
        it("returns false", () => {
          //updating the lastHash of index 2 to throw error
          blockchain.chain[2].lastHash = "broken-lastHash";
          //checking if our fake data will return false
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });

      describe("and the chain contains a block with an invalid field", () => {
        it("returns false", () => {
          //entering invalid data
          blockchain.chain[2].lastHash = "1";

          //checking if our fake data will return false
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });

      describe("and the chain does not contain any invalid blocks", () => {
        it("returns true", () => {
          //checking if our fake data will return true
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
        });
      });
    });
  });

  describe("replaceChain()", () => {
    let errorMock, logMock;

    beforeEach(() => {
      //jest functiuon creating temporay methods to keep track if certain methods were called at gioven time of tests
      //allows for the error messages to not be displayed in the console unless called
      errorMock = jest.fn();
      logMock = jest.fn();

      global.console.error = errorMock;
      global.console.log = logMock;
    });

    describe("when the new chain is not longer", () => {
      beforeEach(() => {
        newChain.chain[0] = { new: "chain" };

        blockchain.replaceChain(newChain.chain);
      });

      it("does not replace the chain", () => {
        expect(blockchain.chain).toEqual(originalchain);
      });

      it("logs an error", () => {
        expect(errorMock).toHaveBeenCalled();
      });
    });

    describe("when the chain is longer", () => {
      beforeEach(() => {
        //setting new blocks with dummy values
        newChain.addBlock({ data: "bears" });
        newChain.addBlock({ data: "beats" });
        newChain.addBlock({ data: "Battlestar Galactica" });
      });

      describe("and the chain is invalid", () => {
        beforeEach(() => {
          newChain.chain[2].hash = "some-fake-hash";

          blockchain.replaceChain(newChain.chain);
        });

        it("does not replace the chain", () => {
          expect(blockchain.chain).toEqual(originalchain);
        });
        it("logs an error", () => {
          expect(errorMock).toHaveBeenCalled();
        });
      });

      describe("and the chain is valid", () => {
        beforeEach(() => {
          blockchain.replaceChain(newChain.chain);
        });

        it("replaces the chain", () => {
          expect(blockchain.chain).toEqual(newChain.chain);
        });
        it("logs about the chain replacement", () => {
          expect(logMock).toHaveBeenCalled();
        });
      });
    });
  });
});
