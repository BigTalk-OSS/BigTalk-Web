import React, {useState, useEffect, useCallback} from 'react';
import { Card, CardBody, CardTitle, CardSubtitle } from "shards-react";
import './style/PostCard.css'

export default function PostCard(props){
    const [post, setPost] = useState(props.post);

    return(
            <Card  id={"post-card-holder"} style={{marginBottom: "2%"}}>
                <CardBody>
                    <CardTitle id={"post-card-title"}>{post.title}</CardTitle>
                    <CardSubtitle id={"post-card-location"}>{post.location}</CardSubtitle>
                    <br/>
                    <span>{post.body}</span>
                    <br/><br/>
                    <span style={{fontSize: "x-small", opacity: "0.5" }}>By {post.author}</span><br/>
                    <span  style={{fontSize: "x-small", opacity: "0.5" }}>{Date(post.timestamp)}</span>
                </CardBody>
            </Card>
    );
}
