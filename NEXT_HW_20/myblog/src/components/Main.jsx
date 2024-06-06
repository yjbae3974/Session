import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostForm from "./Postform";
import Post from "./Post";

const BgrndContainer = styled.div`
    background-color: #E6DACC;
    min-height: 100vh;
`;

const MainContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

const Title = styled.h2`
    text-align: center;
    color: #333;
`;

const PostList = styled.div`
    margin-top: 20px;
`;

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
        <BgrndContainer>
            <MainContainer>
                <Title>Main Page</Title>
                <PostForm
                    addOrUpdatePost={addOrUpdatePost}
                    editingPost={editingPost}
                />
                <PostList>
                    {posts.map((post) => (
                        <Post
                            key={post.id}
                            post={post}
                            deletePost={deletePost}
                            editPost={editPost}
                        />
                    ))}
                </PostList>
            </MainContainer>
        </BgrndContainer>
    );
}

export default Main;
