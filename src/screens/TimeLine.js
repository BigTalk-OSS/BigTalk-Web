import PostCard from "../artifacts/PostCard";
import './style/TimeLine.css'
import {Fab} from "@material-ui/core";
import { EditRounded } from '@material-ui/icons';
import {sortByNewTimeStampFirst} from "../utils/Helper";

export default function TimeLine(){

    function createPostTimeLineInterface(postList){
        let postListView = [];
        postList = sortByNewTimeStampFirst(postList);
        for(let post of postList){
            postListView.push(<PostCard post={post}/>)
        }
        return postListView
    }

    let ui = createPostTimeLineInterface(window.postBank);


    return (
        <div id={"timeline-holder"}>
            <div id={"timeline-post-holder"}>
                {ui}
            </div>
            <div id={"timeline-filter-options"}>
                <span id={"recommended-topics-title"}>Recommended Topics</span>
            </div>
        </div>
    );
}
