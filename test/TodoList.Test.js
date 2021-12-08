// testing smart contract 
// require the smart contract we created. Artifacts is truffle's version of contracts

const { assert } = require("chai")

const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList', (accounts)=>{
    //get a deployed copy of the smart contract with a "before" hook
    //so before each test runs, have the deployed version of TodoList be saved to todoList
    before(async() => {
        this.todoList = await TodoList.deployed()
    })
     
    // The it() function is defined by the jasmine testing framework
    it('deployed successfully', async () => {
        const address =  await this.todoList.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        assert.notEqual(address, '')
    })

    it('lists tasks', async () => {
        const taskCount =  await this.todoList.taskCount
        const task =  await this.todoList.tasks(taskCount)
        // see if the version of data on the chain is equal to what we think it is
        assert.equal(task.id.toNumber(), taskCount.toNumber())
        assert.equal(task.completed, false)
    })
})