import {unmountComponentAtNode} from "react-dom";
import ReactDOM from 'react-dom';
import React from 'react';

export default function Intent(target, element){
    unmountComponentAtNode(target)
    ReactDOM.render(element,target)
}
