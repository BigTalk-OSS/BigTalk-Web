import Lottie from 'react-lottie';
import loadingAnimation from '../raw/loading.json'
import fetchingAnimation from '../raw/fetching.json'
import React, {useState, useEffect, useCallback} from 'react';
import { AnimateOnChange } from 'react-animation'
import './style/PostLoadingScreen.css'
import GlobalEventListener from "../utils/GlobalEventListener";
import {UPDATE_POST_ID_FETCH_TAG, UPDATE_STATUS_POST_LOAD_TAG} from "../utils/EventTags";
import {flatten} from "lottie-colorify";

/**
 * This is the post loading screen. This post needs to be displayed whenever the posts are being loaded from the contract.
 * @returns {JSX.Element}
 * @constructor
 *
 * @example
 * ReactDOM.render(<PostLoadingScreen/>,domHolder);
 *
 * or
 *
 * <div>
 *     <PostLoadingScreen/>
 * </div>
 *
 * @author amannirala13
 */
export function PostLoadingScreen(){

    const [postID, setPostID] = useState(". . .")
    const [status, setStatus] = useState("Please wait")

    /**
     * This function is a callback to change post id to the currently loading post
     * @param data - Event data details containing the post id
     *
     * @see Post
     * @see UPDATE_POST_ID_FETCH_TAG
     */
    const postIdChangeCallback = (data) =>{
        setPostID(data.detail);
    }

    /**
     * This function is a callback to status change event of the Post locating screen
     * @param data - Event details containing the status message
     *
     * @see Post
     * @see UPDATE_STATUS_POST_LOAD_TAG
     */
    const postLoadStatusChangeCallback = (data) =>{
        setStatus(data.detail)
    }

    /**
     * Subscribing to global events
     * @see GlobalEventListener
     */
    GlobalEventListener(UPDATE_POST_ID_FETCH_TAG, postIdChangeCallback)
    GlobalEventListener(UPDATE_STATUS_POST_LOAD_TAG, postLoadStatusChangeCallback)

    /**
     * Loading progress lottie animation render options
     * @type {{animationData: any, loop: boolean, rendererSettings: {preserveAspectRatio: string}, autoplay: boolean}}
     *
     * @see Lottie
     * @see flatten
     * @see loadingAnimation
     */
    const mainLoadingLottieOptions = {
        loop: true,
        autoplay: true,
        animationData: flatten('#000000',loadingAnimation),
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    /**
     * Fetching post lottie animation render options
     * @type {{animationData: any, loop: boolean, rendererSettings: {preserveAspectRatio: string}, autoplay: boolean}}
     *
     * @see Lottie
     * @see flatten
     * @see fetchingAnimation
     */
    const fetchingLottieOptions = {
        loop: true,
        autoplay: true,
        animationData: flatten('#000000',fetchingAnimation),
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
            <div id={"fetching-container"}>
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
