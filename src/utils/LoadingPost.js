import ReactDOM, {unmountComponentAtNode} from "react-dom";
import {getPosts, loadPosts} from "../web3js/ContractInterface";
import {Intent} from "./Intent";
import {MAIN_CONTEXT_ID} from "../screens/MainScreen";
import React from "react";
import {PostLoadingScreen} from "../screens/PostLoadingScreen";


/**
 * This function loads all the post data from the contract to the client. Call this function to update all the post data
 * @param {Element} holder - The main holder element
 * @param {JSX.Element} target - The element to render post fetching
 * @param {limit} limit - The number of posts you want to load
 *
 * @example
 * updateAllPostsFromBlockChain(document.getElementById(MAIN_CONTEXT_ID), <TimeLine/>);
 * //updates all the posts in the client
 *
 * or
 *
 * updateAllPostsFromBlockChain(document.getElementById(MAIN_CONTEXT_ID), <TimeLine/>, 5);
 * //updates 5 latest posts in the client.
 */

export function updateAllPostsFromBlockChain(holder, target){
    unmountComponentAtNode(holder);
    ReactDOM.render(
        <PostLoadingScreen/>
        ,holder
    );

    loadPosts()
        .then(()=>{Intent(document.getElementById(MAIN_CONTEXT_ID), target)
            .then()});

}

/**
 * This function fetches data of all the posts in the limit range and passes to the target via intent.
 * @param {Element} holder - The main holder element
 * @param {JSX.Element} target - The element to render post fetching
 * @param {limit} limit - The number of posts you want to load
 *
 *
 * @example
 * getPostsFromBlockChain(document.getElementById(MAIN_CONTEXT_ID), <TimeLine/>);
 * //Get all the posts in the client and pass it to the intent
 *
 * or
 *
 * getPostsFromBlockChain(document.getElementById(MAIN_CONTEXT_ID), <TimeLine/>, 5);
 * // Get 5 latest posts in the client and pass it to the intent
 */

export function getPostsFromBlockChain(holder, target, limit){
    unmountComponentAtNode(holder);
    ReactDOM.render(
        <PostLoadingScreen/>
        ,holder
    );

    getPosts(limit)
        .then((postsList)=>{Intent(document.getElementById(MAIN_CONTEXT_ID), target, postsList)
            .then()});

}

