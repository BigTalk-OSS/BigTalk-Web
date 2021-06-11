import Lottie from 'react-lottie';
import loadingAnimation from '../raw/loading.json'
import fetchingAnimation from '../raw/fetching.json'
import {unmountComponentAtNode} from "react-dom";
import React, {useState, useEffect, useCallback} from 'react';
import ReactDOM from 'react-dom';
import {loadPosts} from "../web3js/ContractInterface";
import { AnimateOnChange } from 'react-animation'
import './style/PostLoadingScreen.css'
import GlobalEventListener from "../utils/GlobalEventListener";
import {UpdatePostIdFetchTag, UpdateStatusPostLoad} from "../utils/EventTags";
import TimeLine from "./TimeLine";
import {MAIN_CONTEXT_ID} from "./MainScreen";
import Intent from "../utils/Intent";


export default function PostLoadingScreen(){

    const [postID, setPostID] = useState(". . .")
    const [status, setStatus] = useState("Please wait")
    const [fetchingContainerVisibility, setVisibility] = useState("hidden")

    const postIdChangeCallback = (data) =>{
        setVisibility("visible")
        setPostID(data.detail);
    }

    const postLoadStatusChangeCallback = (data) =>{
        setStatus(data.detail)
    }

    GlobalEventListener(UpdatePostIdFetchTag, postIdChangeCallback)
    GlobalEventListener(UpdateStatusPostLoad, postLoadStatusChangeCallback)

    const mainLoadingLottieOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    const fetchingLottieOptions = {
        loop: true,
        autoplay: true,
        animationData: fetchingAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return(
        <div id={"loading-main-container"}>
            <Lottie
                options={mainLoadingLottieOptions}
                height={57}
                width={57}/>
            <span style={{fontSize:"large"}}>{status}</span>
            <div id={"fetching-container"} style={{visibility:{fetchingContainerVisibility}}}>
                    <div>
                        <Lottie
                            options={fetchingLottieOptions}
                            height={57}
                            width={57}/>
                        <span id={'fetching-post-id-text'}><strong>Fetching</strong> <AnimateOnChange animationIn={"popIn"} animationOut={"popOut"} duration={150}>
                             {postID}
                        </AnimateOnChange>
                        </span>
                    </div>
            </div>
        </div>
    );
}

export function getPostsFromBlockChain(target){
    unmountComponentAtNode(target);
    ReactDOM.render(
       <PostLoadingScreen/>
        ,target
    );

    loadPosts().then(
        ()=>{
             Intent(document.getElementById(MAIN_CONTEXT_ID), <TimeLine/>)
        }
    );

}
