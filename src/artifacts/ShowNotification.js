import {unmountComponentAtNode} from "react-dom";
import ReactDOM from 'react-dom';

export default function ShowNotification(holder, alertBar){
    unmountComponentAtNode(holder)
    ReactDOM.render(alertBar, holder)
}
