import {unmountComponentAtNode} from "react-dom";
import ReactDOM from 'react-dom';

/**
 * This function displays notification in the web-app.
 * @module ShowNotification
 * @method
 * @param {AlertNotification} alert - AlterNotification Object that needs to be displayed.
 *
 * @example
 * ShowNotification(<AlertNotification theme={"danger"} message={msg}/>);
 *
 * @see module:AlertNotification
 *
 * @author amannirala13
 */
export function ShowNotification(alert){
    unmountComponentAtNode(document.getElementById("notification-panel"))
    ReactDOM.render(alert, document.getElementById("notification-panel"))
}
