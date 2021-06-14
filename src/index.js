import React from 'react';
import './style/index.css';
import reportWebVitals from './reportWebVitals';
import SplashScreen from "./screens/SplashScreen";
import {UPDATE_STATUS_EVENT_TAG} from "./utils/EventTags";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import {Intent} from "./utils/Intent";

Intent(document.getElementById('root'), <SplashScreen statusUpdateEvent={UPDATE_STATUS_EVENT_TAG}/>)
    .then();
reportWebVitals((i) => {console.log(i)});
