let contract;

let statusTextElement = document.getElementById("status-text-element");
let getPostBtn = document.getElementById("get-posts-btn");
let postTable = document.getElementById("post-table");

const CONTRACT_ADDRESS = "0x64B41be9be7fd21CEd2B46d9F7EB92ADde6E3eEe"
const ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "heading",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "body",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "media",
                "type": "string[]"
            },
            {
                "internalType": "string",
                "name": "location",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "keywords",
                "type": "string[]"
            }
        ],
        "name": "addPost",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "postIndex",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "comment",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "media",
                "type": "string"
            }
        ],
        "name": "postComment",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "_admin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "_postBank",
        "outputs": [
            {
                "internalType": "string",
                "name": "_heading",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_body",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_location",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_timeStamp",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_author",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "_postBankIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "a",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "b",
                "type": "string"
            }
        ],
        "name": "compareStrings",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "commentID",
                "type": "uint256"
            }
        ],
        "name": "getComment",
        "outputs": [
            {
                "internalType": "address",
                "name": "author",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "body",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "media",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "indexNumber",
                "type": "uint256"
            }
        ],
        "name": "getPost",
        "outputs": [
            {
                "internalType": "string",
                "name": "heading",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "body",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "media",
                "type": "string[]"
            },
            {
                "internalType": "string",
                "name": "location",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "keywords",
                "type": "string[]"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "author",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPostBankIndex",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "index",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "postIndex",
                "type": "uint256"
            }
        ],
        "name": "getPostCommentsIndex",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "index",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "postIndex",
                "type": "uint256"
            }
        ],
        "name": "isPostExisting",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]


let postBankIndex;
let postBank = [];

/*
let web3;
async function loadWeb3(){
    if(window.etherium){
        window.web3 = new Web3(window.etherium);
        window.etherium.enable();
    }
    web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s1.binance.org:8545/"));
}*/



async function loadWeb3() {
    updateStatus("Loading chain ...");
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try{
            await window.ethereum.enable();
            window.contract = await loadContract();
            console.log("Contract loaded!");
            console.log(window.contract);
            updateStatus("Ready!");
        }catch(e){
            console.log(e);
            updateStatus("Permission Denied!");
        }
    }
    else if(window.web3){
        window.web3 = new Web3(web3.currentProvider);
        window.contract = await loadContract();
        console.log("Contract loaded!");
        console.log(window.contract);
        updateStatus("Ready!");
    }
    else{
        window.web3 = await new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s1.binance.org:8545/"));
        window.contract = await loadContract();
        updateStatus("No web3 provider detected! Read only mode!")
        console.log("No web3 provider detected! Read only mode!")
    }
}

async function loadContract(){
    return new window.web3.eth.Contract(ABI, CONTRACT_ADDRESS);
}

async function load(){
    await loadWeb3();
}

function updateStatus(status){
    statusTextElement.textContent = status;
}

function generatePostTable() {
    for (let post of postBank){
        let tableRow = document.createElement("tr");
        let titleCol = document.createElement("td");
        titleCol.appendChild(document.createTextNode(post.heading));
        tableRow.appendChild(titleCol);
        let bodyCol = document.createElement("td");
        bodyCol.appendChild(document.createTextNode(post.body));
        tableRow.appendChild(bodyCol);
        let mediaCol = document.createElement("td");
        mediaCol.appendChild(document.createTextNode(post.media));
        tableRow.appendChild(mediaCol);
        let locationCol = document.createElement("td");
        locationCol.appendChild(document.createTextNode(post.location));
        tableRow.appendChild(locationCol);
        let timeCol = document.createElement("td");
        timeCol.appendChild(document.createTextNode(post.timestamp));
        tableRow.appendChild(timeCol);
        let keywordsCol = document.createElement("td");
        keywordsCol.appendChild(document.createTextNode(post.keywords));
        tableRow.appendChild(keywordsCol);
        let authorCol = document.createElement("td");
        authorCol.appendChild(document.createTextNode(post.author));
        tableRow.appendChild(authorCol);

        postTable.appendChild(tableRow);
    }
}

async function loadPosts() {
    updateStatus("Getting post indexes ...");
    postBankIndex = await window.contract.methods.getPostBankIndex().call();
    updateStatus("Post indexes loaded!");

    for(let id of postBankIndex){
        updateStatus(`Fetching ${id} ...`);
        postBank.push(await window.contract.methods.getPost(id).call());
    }

    console.log(postBankIndex);
    console.log(postBank);

    generatePostTable();

    updateStatus("Done!")
}

async function getCurrentAccountAddress(){
    const accounts = await window.web3.eth.getAccounts();
    console.log(accounts);
    return accounts[0];
}

async function addPost(title, body, media, location, keywords){
    updateStatus("Processing post ...");
    media = [];
    keywords=keywords.split(",");
    const accountAddress = await getCurrentAccountAddress();
    try{
        const success = await window.contract.methods.addPost(title, body, media, location, keywords)
            .send({from: accountAddress});
        updateStatus(`Post uploaded!\nHash:${success.blockHash}\nBlock Number:${success.blockNumber}`);
        console.log("Post Upload Successful",success);
    }catch(err){
        updateStatus("Permission denied!")
        console.log(err);
    }

}

function postContractLoading() {
    getPostBtn.addEventListener("click",function(){
        loadPosts().then();
    })

    document.forms["add-post-form"]["submit"].addEventListener("click", function(){
        let form = document.forms["add-post-form"];
        addPost(form["title"].value, form["body"].value, form["media"].value, form["location"].value, form["keywords"].value).then(r =>{console.log(r)} );
    })
}



load().then(function(){
    postContractLoading();
});
