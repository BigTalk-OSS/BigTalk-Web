import React, {useState, useEffect, useCallback} from 'react';
import './style/SplashScreen.css'
import logo from '../logo.svg'
import GlobalEventListener from "../utils/GlobalEventListener";
import {LoadWeb3} from "../web3js/ContractInterface";
import {delay} from "../utils/Helper";
import {Intent} from "../utils/Intent";
import MainScreen, {MAIN_CONTEXT_ID} from "./MainScreen";
import {ShowNotification} from "../utils/ShowNotification";
import AlertNotification from "../artifacts/AlertNotification";
import { AnimateOnChange } from 'react-animation'
import {updateAllPostsFromBlockChain} from "../utils/LoadingPost";
import TimeLine from "./TimeLine";

/**
 * Initial loading screen of the web-app. Also the interface that should be active while any Web3 authorizations are taking place.
 * @module SplashScreen
 * @export
 * @param props
 * @returns {JSX.Element}
 * @constructor
 *
 * @example
 * <div>
 * <Splashscreen/>
 * </div>
 *
 * @author amannirala13
 */
export default function SplashScreen(props){

    let [status, setStatus] = useState("Loading")

    /**
     * This functions updates the status text in SplashScreen on event dispatch
     * @param data - Data from the event. The `data.detail` object in the event must have the new status text.
     */
    const updateStatus = (data) =>{
        console.log(data);
        setStatus(data.detail);
    }

    /**
     * Subscribing to Web3 update event using GlobalEventListener
     * @see GlobalEventListener
     */
    GlobalEventListener(props.statusUpdateEvent, updateStatus);


    /**
     * Once the webpage is loaded, the web-app loads the MainScreen with is the parent holder of all the other components
     * or display a message notification if the loading fails for any reason.
     * @see updateAllPostsFromBlockChain
     * @see module:ShowNotification
     */
    window.addEventListener('load', _ => {
        LoadWeb3()
            .then(async ()=>{
            await delay(5000);
            Intent(document.getElementById('root'), <MainScreen/>)
                .then((success) => {
                    if (success)
                        updateAllPostsFromBlockChain(document.getElementById(MAIN_CONTEXT_ID), <TimeLine/>);
                })
                .catch((e)=>{
                ShowNotification(<AlertNotification theme={"danger"} message={e}/>);
                console.log(e);
                });
            })
            .catch((e)=>{
            ShowNotification(<AlertNotification theme={"danger"} message={e}/>);
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
