// step 1. main smart contract file
pragma solidity ^0.5.0;

contract TodoList{
    // state variable, written to the chain, 
    // belong to the entire contract
    uint public taskCount = 0;   

    struct Task{
        uint id;
        string content;
        bool completed;

    }

    //mapping is like associative arrays
    mapping(uint => Task) public tasks; //this associate an uint with each Task struct

    constructor() public {
        createTask("check out mysite");
    }

    function createTask(string memory _content) public {
        taskCount ++;
        //similar to populating a dictionary in python
        tasks[taskCount] = Task(taskCount, _content, false); //instantiate the struct
    }
}