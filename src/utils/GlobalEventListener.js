import React, {useState, useEffect, useCallback} from 'react';

export default function GlobalEventListener(eventType, handler){
    useEffect(() => {
        window.addEventListener(eventType, handler);
        return() => window.removeEventListener(eventType, handler);
    },[eventType])
}
