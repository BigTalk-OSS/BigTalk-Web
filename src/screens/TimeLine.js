import PostCard from "../artifacts/PostCard";
import './style/TimeLine.css'

export default function TimeLine(){

    function createPostTimeLineInterface(postList){
        let postListView = [];
       for(let post of postList){
           postListView.push(<PostCard post={post}/>)
       }
       return postListView
    }

    let ui = createPostTimeLineInterface(window.postBank);


    return (
        <div id={"timeline-holder"}>
            {ui}
        </div>
    );
}
