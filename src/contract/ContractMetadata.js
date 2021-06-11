export const CONTRACT_ADDRESS = "0x64B41be9be7fd21CEd2B46d9F7EB92ADde6E3eEe"
export const CONTRACT_ABI = [
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
