import logo from '../logo.svg'
import './style/TitleBar.css'
import React, {useState, useEffect, useCallback} from 'react';
import { Nav, NavItem, NavLink } from "shards-react";
import {Intent} from "../utils/Intent";
import {MAIN_CONTEXT_ID} from "../screens/MainScreen";
import TimeLine from "../screens/TimeLine";
import About from "../screens/About";
import Profile from "../screens/Profile";
import Doc from "../screens/Doc";

/**
 * This is the title bar component of the web-app
 * @module TitleBar
 * @returns {JSX.Element}
 * @constructor
 *
 * @example
 * <div>
 *  <TitleBar/>
 * </div
 *
 * @author amannirala13
 */
export default function TitleBar(props){

    const [homeTabActive, setHomeTabActive] = useState(true);
    const [aboutTabActive, setAboutTabActive] = useState(false);
    const [profileTabActive, setProfileTabActive] = useState(false);
    const [docTabActive, setDocTabActive] = useState(false);

    /**
     * This function updates the tabs active status
     * @param {string} activeTab - The tab name that needs to be activated
     */
    const updateActiveTab = (activeTab) =>{
        switch (activeTab){
            case 'home':
                setHomeTabActive(true)
                setAboutTabActive(false)
                setProfileTabActive(false)
                setDocTabActive(false)

                Intent(document.getElementById(MAIN_CONTEXT_ID), <TimeLine/>).then()

                break;
            case 'about':
                setHomeTabActive(false)
                setAboutTabActive(true)
                setProfileTabActive(false)
                setDocTabActive(false)

                Intent(document.getElementById(MAIN_CONTEXT_ID), <About/>).then()

                break;

            case 'profile':
                setHomeTabActive(false)
                setAboutTabActive(false)
                setProfileTabActive(true)
                setDocTabActive(false)

                Intent(document.getElementById(MAIN_CONTEXT_ID), <Profile/>).then()

                break;

            case 'doc':
                setHomeTabActive(false)
                setAboutTabActive(false)
                setProfileTabActive(false)
                setDocTabActive(true)

                Intent(document.getElementById(MAIN_CONTEXT_ID), <Doc/>).then()

                break;

            default: break;
        }
    }

    return(
        <div className={"title-bar-container"}>
            <div className={"branding-container"}>
                <img className={"logo"} src={logo} alt={"app_logo"}/>
                <span className={"name"}><strong>Big Talk</strong></span>
            </div>

            <div className={"right-container"}>
                <Nav tabs>
                    <NavItem>
                        <NavLink active={homeTabActive} onClick={()=>{updateActiveTab('home')}}>
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active={aboutTabActive} onClick={()=>{updateActiveTab('about')}}>
                            About
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active={profileTabActive} onClick={()=>{updateActiveTab('profile')}}>
                            Profile
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active={docTabActive} onClick={()=>{updateActiveTab('doc')}}>
                            Doc
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        </div>
    );
}
