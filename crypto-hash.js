//requiring crypto library setting it to const crypto
const crypto = require("crypto");

//function to generate crypto hash using a SHA-256
//spread operator to  allow for X amount of inputs
const cryptoHash = (...inputs) => {
  //setting const hash equal to native function to crypto "createhash" that is being passed  hashing method: this case = sha256"
  const hash = crypto.createHash("sha256");
  //update function that takes a string argumentthat will generate relevent hash values within the object itself = creates hash we can use/access later
  //joined with empty string to convert it into a string to be read
  //sorting the inputs allows for them to be entered andhashed in any order
  hash.update(inputs.sort().join(" "));
  //digest is terminology in cryptography to represent the result of that hash -- look above -- in hexadecimal form -- passed as argumenthex
  hash.digest("hex");
};

module.exports = cryptoHash;
