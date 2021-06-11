import {UpdateStatusEventTag} from "../artifacts/EventTags";
import Web3 from "web3";
import {CONTRACT_ABI, CONTRACT_ADDRESS} from "../contract/ContractMetadata";
import ShowAlertBar from "../artifacts/ShowNotification";

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
