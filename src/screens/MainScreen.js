import React, {useState, useEffect, useCallback} from 'react';
import TitleBar from "../artifacts/TitleBar";
import './style/MainScreen.css'

export const MAIN_CONTEXT_ID = 'main-context';

export default function MainScreen(){

    return(
        <div id={"main-container"}>
            <TitleBar id={"main-title-bar"}/>
            <div id={MAIN_CONTEXT_ID}/>
        </div>
    )
}
