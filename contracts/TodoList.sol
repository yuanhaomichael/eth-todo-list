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

    // events are for external consumers to subscribe to, to listen to
    event TaskCreated(
        uint id,
        string content,
        bool completed
    );

    event taskCompleted(
        uint id,
        bool completed
    );

    //initialize state variables of a contract in a constructor 
    constructor() public {
        createTask("check out mysite");
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        return false;
    }

    // create a new task and broadcast the TaskCreated event so client side would know
    function createTask(string memory _content) public {
        taskCount ++;
        //similar to populating a dictionary in python
        tasks[taskCount] = Task(taskCount, _content, false); //instantiate the struct

        emit TaskCreated(taskCount, _content, false);
    }

    //based on a task's id, toggle it as completed.
    function toggleCompleted(uint _id) public{
        // create a variable of type Task
        // underscore is a convention that names a local var instead of a state var
        // memory keyword can only be used in methods to pre-specify a chunk of space
        // for a variable
        //https://docs.soliditylang.org/en/v0.3.3/frequently-asked-questions.html#what-is-the-memory-keyword-what-does-it-do
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed; //toggle true / false
        tasks[_id] = _task; // store it back in tasks
        emit taskCompleted(_id, _task.completed);
         
    }
}