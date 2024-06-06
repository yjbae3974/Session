import React, { useState, useEffect } from "react";
import PostForm from "./Postform";
import Post from "./Post";

function Main() {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        setPosts(storedPosts);
    }, []);

    const addOrUpdatePost = (post) => {
        let newPosts;
        if (editingPost) {
            newPosts = posts.map((p) => (p.id === post.id ? post : p));
        } else {
            newPosts = [...posts, post];
        }
        setPosts(newPosts);
        localStorage.setItem("posts", JSON.stringify(newPosts));
        setEditingPost(null); // Clear editing state after update
    };

    const deletePost = (id) => {
        const newPosts = posts.filter((post) => post.id !== id);
        setPosts(newPosts);
        localStorage.setItem("posts", JSON.stringify(newPosts));
    };

    const editPost = (post) => {
        setEditingPost(post);
    };

    return (
        <div>
            <h2>Main Page</h2>
            <PostForm
                addOrUpdatePost={addOrUpdatePost}
                editingPost={editingPost}
            />
            <div>
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        post={post}
                        deletePost={deletePost}
                        editPost={editPost}
                    />
                ))}
            </div>
        </div>
    );
}

export default Main;
