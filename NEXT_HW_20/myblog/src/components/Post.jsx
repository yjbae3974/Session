import React from "react";
import { Link } from "react-router-dom";

function Post({ post, deletePost, editPost }) {
    return (
        <div>
            <Link to={`/post/${post.id}`}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {post.pictures.map((picture, index) => (
                    <img
                        key={index}
                        src={picture}
                        alt={`Post ${post.id} - ${index}`}
                    />
                ))}
            </Link>
            <button onClick={() => editPost(post)}>Edit</button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
    );
}

export default Post;
