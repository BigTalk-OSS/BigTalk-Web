import React from 'react';
import './style/index.css';
import reportWebVitals from './reportWebVitals';
import SplashScreen from "./screens/SplashScreen";
import {UpdateStatusEventTag} from "./artifacts/EventTags";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import Intent from "./artifacts/Intent";

Intent(document.getElementById('root'), <SplashScreen statusUpdateEvent={UpdateStatusEventTag}/>);
reportWebVitals((i) => {console.log(i)});
