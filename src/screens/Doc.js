import { Button } from "shards-react";
import React from "react";
import './style/Doc.css'

/**
 * This is the documentation page
 * @returns {JSX.Element}
 * @constructor
 *
 * @example
 * <div>
 *     <Doc/>
 *     </div>
 */
export default function Doc(){
    return(
        <div id={"doc-parent-holder"}>
            <Button block onClick={()=>{
                window.open("https://bigtalk-oss.github.io/BigTalk-Web-Doc/", "_blank")
            }}> View Documentation </Button>
        </div>
    );
}
