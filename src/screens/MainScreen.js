import React, {useState, useEffect, useCallback} from 'react';
import TitleBar from "../artifacts/TitleBar";
import './style/MainScreen.css'

/**
 * DOM id of the main holder for all screen components that will be rendered in web-app.
 * @type {string}
 * @export
 */
export const MAIN_CONTEXT_ID = 'main-context';

/**
 * This is the main screen component containing the main holder and the title bar.
 * @module MainScreen
 * @export
 * @returns {JSX.Element}
 * @constructor
 *
 * @example
 * <div>
 * <MainScreen/>
 * </div>
 *
 * @author amannirala13
 */
export default function MainScreen(){

    return(
        <div id={"main-container"}>
            <TitleBar id={"main-title-bar"}/>
            <div id={MAIN_CONTEXT_ID}/>
        </div>
    )
}
