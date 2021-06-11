import React, {useState, useEffect, useCallback} from 'react';
import './style/SplashScreen.css'
import logo from '../logo.svg'
import GlobalEventListener from "../utils/GlobalEventListener";
import loadWeb3 from "../web3js/ContractInterface";
import {delay} from "../utils/Helper";
import Intent from "../utils/Intent";
import MainScreen, {MAIN_CONTEXT_ID} from "./MainScreen";
import ShowNotification from "../utils/ShowNotification";
import AlertNotification from "../artifacts/AlertNotification";
import { AnimateOnChange } from 'react-animation'
import {getPostsFromBlockChain} from "./PostLoadingScreen";

export default function SplashScreen(props){

    let [status, setStatus] = useState("Loading")

    const updateStatus = (data) =>{
        console.log(data);
        setStatus(data.detail);
    }
    GlobalEventListener(props.statusUpdateEvent, updateStatus);


    window.addEventListener('load', elementId => {
        loadWeb3()
            .then(async ()=>{
            await delay(5000);
            Intent(document.getElementById('root'), <MainScreen/>)
                .then((success) => {
                    if (success)
                        getPostsFromBlockChain(document.getElementById(MAIN_CONTEXT_ID));
                })
                .catch((e)=>{
                ShowNotification(document.getElementById('notification-panel'),
                    <AlertNotification theme={"danger"} message={e}/>);
                console.log(e);
                });
            })
            .catch((e)=>{
            ShowNotification(document.getElementById('notification-panel'),
                <AlertNotification theme={"danger"} message={e}/>);
                console.log(e);
            });
    })


    return(
        <div className="SplashScreen-content">
        <img id="SplashScreen-logo" src={logo} alt="app-logo"/>
        <br/><br/>
        <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated"
                 id="SplashScreen-progress"
                 role="progressbar" aria-valuenow="75"
                 aria-valuemin="0" aria-valuemax="100"/>
        </div> <br/>
        <AnimateOnChange animationIn={"popIn"} animationOut={"popOut"}>
            <span id="SplashScreen-status">{status}</span>
        </AnimateOnChange>
    </div>)
}
