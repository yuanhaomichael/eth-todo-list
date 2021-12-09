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
        const taskCount =  await this.todoList.taskCount()
        const task =  await this.todoList.tasks(taskCount)
        // see if the version of data on the chain is equal to what we think it is 
        assert.equal(task.id.toNumber(), taskCount.toNumber())
        assert.equal(task.completed, false)
    })

    it('create tasks', async () => {
        const result = await this.todoList.createTask('a new task')
        const taskCount = await this.todoList.taskCount()
        assert.equal(taskCount, 2)
        //check if the event we set in createTask function is triggered
        const event =  result.logs[0].args

        // console.log(result) //can see details of the TaskCreated event
        assert.equal(event.id.toNumber(),2)
        assert.equal(event.content, 'a new task')
        assert.equal(event.completed, false)

    })
})