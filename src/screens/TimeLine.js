import PostCard from "../artifacts/PostCard";
import './style/TimeLine.css'
import {sortByNewTimeStampFirst} from "../utils/Helper";
import React, {useState, useEffect, useCallback} from 'react';

/**
 * This is the timeline component of the web-app. It contains the list of all the post. It's also the home page.
 * @module TimeLine
 * @export
 * @returns {JSX.Element}
 * @constructor
 *
 * @example
 * <div>
 *     <TimeLine/>
 * </div>
 *
 * @see PostCard
 * @see Post
 */
export default function TimeLine(){

    /**
     * This variable contains the array of posts currently loaded in the view
     * @type {Post[]}
     *
     * @see PostCard
     * @see Post
     */
    const [currentList, updateCurrentList] = useState(window.postBank)

    /**
     * This variable contains the array of PostCard elements for each post
     * @type {PostCard[]}
     *
     * @see PostCard
     * @see Post
     */
    const [ui, updateUI] = useState(createPostTimeLineInterface(currentList));

    const updatePost = () => {
        console.log(currentList)
        updateCurrentList(currentList.slice(0,-1))
        console.log(currentList)
    }


    return (
        <div id={"timeline-holder"}>
            <div id={"timeline-post-holder"}>
                {ui}
            </div>
            <div id={"timeline-filter-options"}>
                <span id={"recommended-topics-title"} onClick={updatePost}>Recommended Topics</span>
            </div>
        </div>
    );
}

/**
 * This function generates and returns the PostCard list for all the posts in the list
 * @param {Post[]} postList - Array of posts
 * @returns {PostCard[]} - Array of PostCard elements
 *
 * @see PostCard
 * @see Post
 *
 * @example
 * let ui = createPostTimeLineInterface(window.postBank);
 */
export function createPostTimeLineInterface(postList){
    let postListView = [];
    postList = sortByNewTimeStampFirst(postList);
    for(let post of postList){
        postListView.push(<PostCard index = {post.id} post={post}/>)
    }
    return postListView
}
