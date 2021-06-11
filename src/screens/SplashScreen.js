import React, {useState, useEffect, useCallback} from 'react';
import './../style/SplashScreen.css'
import logo from '../logo.svg'
import GlobalEventListener from "../artifacts/GlobalEventListener";
import loadWeb3 from "../web3js/ContractInterface";
import {delay} from "../artifacts/Helper";
import Intent from "../artifacts/Intent";
import MainScreen from "./MainScreen";
import ShowNotification from "../artifacts/ShowNotification";
import AlertNotification from "../artifacts/AlertNotification";

export default function SplashScreen(props){

    let [status, setStatus] = useState("Loading")

    const updateStatus = (data) =>{
        console.log(data);
        setStatus(data.detail);
    }
    GlobalEventListener(props.statusUpdateEvent, updateStatus);


    window.addEventListener('load', elementId => {
        loadWeb3().then(async ()=>{
            await delay(3000);
            Intent(document.getElementById('root'), <MainScreen/>);})
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
        <span id="SplashScreen-status">{status}</span>
    </div>)
}
