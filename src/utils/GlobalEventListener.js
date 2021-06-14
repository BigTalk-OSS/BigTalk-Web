import React, {useState, useEffect, useCallback} from 'react';

/**
 * Thus function subscribes a component to a particular event change
 * @module GlobalEventListener
 * @export
 * @param {string} eventType - The tag of the event to be subscribed
 * @param {function} handler - Callback function
 * @constructor
 *
 * @example
 * GlobalEventListener(UPDATE_POST_ID_FETCH_TAG, postIdChangeCallback)
 * GlobalEventListener(UPDATE_STATUS_POST_LOAD_TAG, postLoadStatusChangeCallback)
 */
export default function GlobalEventListener(eventType, handler){
    useEffect(() => {
        window.addEventListener(eventType, handler);
        return() => window.removeEventListener(eventType, handler);
    },[eventType])
}
