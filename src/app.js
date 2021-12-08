// for the browser to connect to the chain, we need metamask
// for the client side to connect to the chain, we need this app.js file

// async functions and await are async programming, which allows program to run 
// without freezing at one long-running statement such as a for loop

// create an App object
App = {

    loading: false,
    //initialize a "contracts" object later used in App.contracts.TodoList,
    //which allows the truffle framework to wrap around the contract so that
    //we can call its functions and do stuff
    contracts: {},
    load: async () => {
        console.log("app loading...")
        //a JS library that allows our client side to connect to the chain
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
    },

    // Metamask boilerplate to connect to metamask and local host
    // Step 1: copy/paste code
    // Step 2: add the localhost network on metamask
    // Step 3: use the private key from the Ganache wallet and "Import Account" on Metamask
    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
        } else {
        window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
            // Request account access if needed
            await ethereum.enable()
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */})
        } catch (error) {
            // User denied account access...
        }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
        }
        // Non-dapp browsers...
        else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    loadAccount: async () => {
        // loading your account from Metamask, the dev account in Ganache which you imported with private key
        App.account = web3.eth.accounts[0]
        console.log(App.account)
    },

    loadContract: async () => {
        const todoList = await $.getJSON('TodoList.json ')
        // Truffle contract is a JS represenation of smart contract
        // which allows us to call the functions in the contract and do stuff   
        App.contracts.TodoList = TruffleContract(todoList)
        App.contracts.TodoList.setProvider(App.web3Provider)

        // fill the contract with data from the blockchain
        App.todoList = await App.contracts.TodoList.deployed()
          
    },

    // render the tasks
    render: async () => {
        // if app is already loading, do nothing
        if(App.loading){
            return
        }
        // update app loading state, make "loading..." appear
        App.setLoading(true)

        // render account, which is the wallet address from Ganache
        $('#account').html(App.account)

        // render tasks
        await App.renderTasks()


        App.setLoading(false)
    },

    renderTasks: async () => {
        // load the taskcount from chain 
        const taskCount = await App.todoList.taskCount()
        const $taskTemplate = $('.taskTemplate')

        // render out each task with a new task template (an html block)
        for(var i=1; i<=taskCount; i++){
            const task =  await App.todoList.tasks(i)
            const taskId = task[0].toNumber()
            const taskContent = task[1]
            const taskCompleted = task[2]
            
            //create the html for the task by cloning the taskTemplate, and adding
            // the right content for the todo item
            const $newTaskTemplate = $taskTemplate.clone()
            $newTaskTemplate.find('.content').html(taskContent)
            $newTaskTemplate.find('.input')
                            .prop('name', taskId)
                            .prop('checked', taskCompleted)
                            .on('click', App.toggleCompleted)

            // put the task in the correct list
            if(taskCompleted){
                $('#completedTaskList').append($newTaskTemplate)
            } else {
                $('#taskList').append($newTaskTemplate)
            }
        
            $newTaskTemplate.show() 
        }


        // show the task
    },

    // take a boolean, if parameter is false, hide loader and show content
    // if parameter pased is true, set the loader and will show "loading... "
    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if(boolean){
            loader.show()
            content.hide()            
        } else{
            loader.hide()
            content.show()
        } 
    }
}


// load the app when the window element load
$(() => {
    $(window).load(()=>{
        App.load()
    } )
})