import {UPDATE_STATUS_EVENT_TAG, UPDATE_POST_ID_FETCH_TAG, UPDATE_STATUS_POST_LOAD_TAG} from "../utils/EventTags";
import Web3 from "web3";
import {CONTRACT_ABI, CONTRACT_ADDRESS} from "../contract/ContractMetadata";
import {Post} from "../models/Post";
import {ShowNotification} from "../utils/ShowNotification";
import AlertNotification from "../artifacts/AlertNotification";

/**
 * This function loads the web3 provider, asks for connection, connects to the contract and prepares everything before loading the web-app
 * @returns {Promise<string>}
 * @async
 * @method
 * @example
 * loadWeb3().then((r)=>{
 *     console.log(r)
 * }).catch((e)=>{
 *     console.log(e)
 * })
 *
 * @see loadReadOnlyMode
 */
export async function LoadWeb3() {
    if (window.ethereum) {
        window.dispatchEvent(new CustomEvent(UPDATE_STATUS_EVENT_TAG, {detail: "Waiting for approval"}))
        window.web3 = new Web3(window.ethereum);
        try{
            await window.ethereum.enable();
            window.dispatchEvent(new CustomEvent(UPDATE_STATUS_EVENT_TAG, {detail: "Loading contract"}))
            window.contract = await loadContract();
            console.log("Contract loaded!");
            console.log(window.contract);
            window.dispatchEvent(new CustomEvent(UPDATE_STATUS_EVENT_TAG, {detail: "Welcome"}))
            return Promise.resolve("Done");
        }catch(e){
            console.log(e);
            window.dispatchEvent(new CustomEvent(UPDATE_STATUS_EVENT_TAG, {detail: "Permission Denied"}))
            await loadReadOnlyMode()
        }
    }
    else if(window.web3){
        window.web3 = new Web3(window.web3.currentProvider);
        window.dispatchEvent(new CustomEvent(UPDATE_STATUS_EVENT_TAG, {detail: "Loading contract"}))
        window.contract = await loadContract();
        console.log("Contract loaded!");
        console.log(window.contract);
        window.dispatchEvent(new CustomEvent(UPDATE_STATUS_EVENT_TAG, {detail: "Welcome"}))
        return Promise.resolve("Done");
    }
    else{
        await loadReadOnlyMode();
        return Promise.resolve("Done");
    }
}

/**
 * This function loads the web-app in read-only mode when the web3 provider is missing from the browser.
 * @returns {Promise<string>}
 * @async
 * @example
 * await loadReadOnlyMode();
 */
async function loadReadOnlyMode(){
    window.dispatchEvent(new CustomEvent(UPDATE_STATUS_EVENT_TAG, {detail: "Connecting to node"}));
    window.web3 = await new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s1.binance.org:8545/"));
    window.dispatchEvent(new CustomEvent(UPDATE_STATUS_EVENT_TAG, {detail: "Loading contract"}));
    window.contract = await loadContract();
    window.dispatchEvent(new CustomEvent(UPDATE_STATUS_EVENT_TAG, {detail: "Welcome"}));
    ShowNotification(<AlertNotification theme={"warning"} message={"Launching in read-only mode"}/>);
    console.log("We can't detect Metamask or any wallet provider in this browser! Launching in Read-only mode!");
    await alert("We can't detect Metamask or any wallet provider on this browser. Without that you will only be able to read articles but can not comment or add new posts.");
    return Promise.resolve("Done");
}

/**
 * This function returns the contract after loading it
 * @async
 * @returns {Promise<*>}
 *
 * @example
 * window.contract = await loadContract();
 */
async function loadContract(){
    return await new window.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
}

/**
 * This function loads post data from the contract to the global variables.
 * @async
 * @param {number} from - The stating point of loading data
 * @param {number} limit - Total number of data blocks to load
 * @param {boolean} ordered - Should the blocks be ordered as 'latest first'
 * @returns {Promise<string>}
 *
 * @example
 * let list = loadPosts(5)
 * //returns top 5 latest posts
 *
 * let list2 = loadPosts()
 * //returns all the posts
 *
 * let list3 = loadPosts(-1)
 * //returns all the posts
 *
 * @see Post
 */
export async function loadPosts({from = -1, limit=-1, ordered = true} = {from:-1, limit:-1, ordered: true}) {
    window.dispatchEvent(new CustomEvent(UPDATE_STATUS_POST_LOAD_TAG, {detail: "Loading index"}))
    window.postBankIndex = await window.contract.methods.getPostBankIndex().call();
    window.dispatchEvent(new CustomEvent(UPDATE_STATUS_POST_LOAD_TAG, {detail: "Loading posts"}))
    window.postBank = [];

    if(ordered){
        window.postBankIndex = window.postBankIndex.slice().sort().reverse()}


    let start = (from < 0) ? 0 :from
    let end = (limit < 0) ? window.postBankIndex.length : from + limit
    console.log(start)
    console.log(end)
    for(let id of window.postBankIndex.slice(start, end)){
        window.dispatchEvent(new CustomEvent(UPDATE_POST_ID_FETCH_TAG, {detail: id}))

        let rawData = await window.contract.methods.getPost(id).call();
        let post = new Post({
            id: id,
            title: rawData.heading,
            body: rawData.body,
            location: rawData.location,
            timestamp: rawData.timestamp,
            author: rawData.author})

        window.postBank.push(post);
    }

    console.log(window.postBankIndex);
    console.log(window.postBank);

    window.dispatchEvent(new CustomEvent(UPDATE_STATUS_EVENT_TAG, {detail: "Done"}))
    return Promise.resolve("Done");
}

/**
 * This function loads post data from the contract and passes it from the promise
 * @async
 * @returns {Promise<string>}
 *
 * @example
 * getPosts(5).then({list}=>{
 *     console.log(e);
 * })
 * //returns top 5 latest posts
 *
 * getPosts().then({list}=>{
 *     console.log(e);
 * })
 * //returns all the posts
 *
 * getPosts(-1).then({list}=>{
 *     console.log(e);
 * })
 * //returns all the posts
 * @returns {Promise<Post[]>}
 * @async
 * @see Post
 * @param {number} from - The stating point of loading data
 * @param {number} limit - Total number of data blocks to load
 * @param {boolean} ordered - Should the blocks be ordered as 'latest first'
 */
export async function getPosts({from = -1, limit=-1, ordered = true} = {from:-1, limit:-1, ordered: true}) {
    window.dispatchEvent(new CustomEvent(UPDATE_STATUS_POST_LOAD_TAG, {detail: "Loading index"}))
    let postBankIndex = await window.contract.methods.getPostBankIndex().call();
    window.dispatchEvent(new CustomEvent(UPDATE_STATUS_POST_LOAD_TAG, {detail: "Loading posts"}))
    let postBank = [];

    if(ordered) window.postBankIndex = window.postBankIndex.slice().sort().reverse()

    let start = (from < 0) ? 0 :from
    let end = (limit < 0) ? window.postBankIndex.length : from + limit
    console.log(start)
    console.log(end)
    for(let id of postBankIndex.slice(start, end)){
        window.dispatchEvent(new CustomEvent(UPDATE_POST_ID_FETCH_TAG, {detail: id}))

        let rawData = await window.contract.methods.getPost(id).call();
        let post = new Post({
            id:id,
            title: rawData.heading,
            body: rawData.body,
            location: rawData.location,
            timestamp: rawData.timestamp,
            author: rawData.author})

        postBank.push(post);
    }

    console.log(window.postBankIndex);
    console.log(window.postBank);

    window.dispatchEvent(new CustomEvent(UPDATE_STATUS_EVENT_TAG, {detail: "Done"}))
    return Promise.resolve(postBank);
}

