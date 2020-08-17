import React from "react";
import PostItem from "./PostItem";
import "./PostList.css";

function PostList(props) {
    const { posts } = props;
    return (
        <div className="post-list">
            <h2>Lista postarilor:</h2>
            {posts.map((post, index) => {
                return <PostItem id={post.id} title={post.title} body={post.body} key={index} />;
            })}
        </div>
    );
}

export default PostList;
