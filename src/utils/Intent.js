import {unmountComponentAtNode} from "react-dom";
import ReactDOM from 'react-dom';
import React from 'react';

export default async function Intent(target, element){
    try{
        unmountComponentAtNode(target)
        ReactDOM.render(element,target)
        return Promise.resolve(true);
    }catch(e){
        return Promise.reject(e);
    }
}
