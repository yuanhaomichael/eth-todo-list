// step 3. migration is updating the state of the chain
// Truffle, the local chain, creates an abstraction of the smart contract
// and deploys it onto the chain.
const TodoList = artifacts.require("./TodoList.sol");

module.exports = function(deployer) {
  deployer.deploy(TodoList);
};
