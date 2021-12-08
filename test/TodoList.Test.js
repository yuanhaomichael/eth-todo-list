// require the smart contract we created. Artifacts is truffle's version of contracts

const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList', (accounts)=>{
    //get a deployed copy of the smart contract with a "before" hook
    //so before each test runs, have the deployed version of TodoList be saved to todoList
    before(async() => {
        this.todoList = await TodoList.deployed()
    })
})