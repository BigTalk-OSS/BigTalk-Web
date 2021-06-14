import {unmountComponentAtNode} from "react-dom";
import ReactDOM from 'react-dom';
import React from 'react';

/**
 * This function is used to load an element in a holder element and also set some data which can be later used.
 * @param {Element} target - The holder i.e. the element in which the new element will be loaded
 * @param {JSX.Element} element - The element that will be loaded
 * @param {*} data - The data that will be loaded for later use
 * @returns {Promise<boolean>}
 *
 * @example
 * Intent(document.getElementById('root'), <SplashScreen statusUpdateEvent={UpdateStatusEventTag}/>)
 * .then((r)=>{console.log(r)});
 *
 * @see getLastIntentData
 */
export async function Intent(target, element, data=null){
    try{
        unmountComponentAtNode(target)
        ReactDOM.render(element,target)
        window.lastIntentData = data;
        return Promise.resolve(true);
    }catch(e){
        return Promise.reject(e);
    }
}

/**
 * This function is to get the last data that was passed in the intent.
 * @returns {*}
 *
 * @example
 * let data = getLastIntentData()
 *
 * @see Intent
 */
export function getLastIntentData(){
    return window.lastIntentData;
}
