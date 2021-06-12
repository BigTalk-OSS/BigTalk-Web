import {UpdateStatusEventTag, UpdatePostIdFetchTag, UpdateStatusPostLoad} from "../utils/EventTags";
import Web3 from "web3";
import {CONTRACT_ABI, CONTRACT_ADDRESS} from "../contract/ContractMetadata";
import Post from "../models/Post";

export default async function loadWeb3() {
    if (window.ethereum) {
        window.dispatchEvent(new CustomEvent(UpdateStatusEventTag, {detail: "Waiting for approval"}))
        window.web3 = new Web3(window.ethereum);
        try{
            await window.ethereum.enable();
            window.dispatchEvent(new CustomEvent(UpdateStatusEventTag, {detail: "Loading contract"}))
            window.contract = await loadContract();
            console.log("Contract loaded!");
            console.log(window.contract);
            window.dispatchEvent(new CustomEvent(UpdateStatusEventTag, {detail: "Done"}))
            return Promise.resolve("Done");
        }catch(e){
            console.log(e);
            window.dispatchEvent(new CustomEvent(UpdateStatusEventTag, {detail: "Permission Denied"}))
            await loadReadOnlyMode()
        }
    }
    else if(window.web3){
        window.web3 = new Web3(window.web3.currentProvider);
        window.dispatchEvent(new CustomEvent(UpdateStatusEventTag, {detail: "Loading contract"}))
        window.contract = await loadContract();
        console.log("Contract loaded!");
        console.log(window.contract);
        window.dispatchEvent(new CustomEvent(UpdateStatusEventTag, {detail: "Done"}))
        return Promise.resolve("Done");
    }
    else{
        await loadReadOnlyMode();
        return Promise.resolve("Done");
    }
}

async function loadReadOnlyMode(){
    window.dispatchEvent(new CustomEvent(UpdateStatusEventTag, {detail: "Connecting to node"}))
    window.web3 = await new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s1.binance.org:8545/"));
    window.dispatchEvent(new CustomEvent(UpdateStatusEventTag, {detail: "Loading contract"}))
    window.contract = await loadContract();
    window.dispatchEvent(new CustomEvent(UpdateStatusEventTag, {detail: "Launching in read only mode"}))
    console.log("No web3 provider detected! Read only mode!")
    await alert("No web3 provider detected. You will only be able to read articles and can not comment or add new posts.");
    return Promise.resolve("Done");
}

async function loadContract(){
    return await new window.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
}

export async function loadPosts() {
    window.dispatchEvent(new CustomEvent(UpdateStatusPostLoad, {detail: "Loading index"}))
    window.postBankIndex = await window.contract.methods.getPostBankIndex().call();
    window.dispatchEvent(new CustomEvent(UpdateStatusPostLoad, {detail: "Loading posts"}))
    window.postBank = [];
    for(let id of window.postBankIndex){
        console.log(id);
        window.dispatchEvent(new CustomEvent(UpdatePostIdFetchTag, {detail: id}))

        let rawData = await window.contract.methods.getPost(id).call();
        let post = new Post({id: id,
            title: rawData.heading,
            body: rawData.body,
            location: rawData.location,
            timestamp: rawData.timestamp,
            author: rawData.author})

        window.postBank.push(post);
    }

    console.log(window.postBankIndex);
    console.log(window.postBank);

    window.dispatchEvent(new CustomEvent(UpdateStatusEventTag, {detail: "Done"}))
    return Promise.resolve("Done");
}

