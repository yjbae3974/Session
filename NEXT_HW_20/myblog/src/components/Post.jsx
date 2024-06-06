import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PostContainer = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
`;

const PostTitle = styled.h3`
    color: #333;
`;

const PostContent = styled.p`
    color: #666;
`;

const PostImage = styled.img`
    max-width: 100%;
    height: auto;
    display: block;
    margin-bottom: 10px;
`;

const Button = styled.button`
    padding: 5px 10px;
    font-size: 14px;
    color: ${(props) => (props.primary ? "#8D0029" : "#FFFFFF")};
    background-color: ${(props) => (props.primary ? "#E6DACC" : "#8D0029")};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 5px;

    &:hover {
        background-color: ${(props) => (props.primary ? "#E6DACC" : "#7C0019")};
    }
`;

function Post({ post, deletePost, editPost }) {
    return (
        <PostContainer>
            <Link to={`/post/${post.id}`}>
                <PostTitle>{post.title}</PostTitle>
                <PostContent>{post.content}</PostContent>
                {post.pictures.map((picture, index) => (
                    <PostImage
                        key={index}
                        src={picture}
                        alt={`Post ${post.id} - ${index}`}
                    />
                ))}
            </Link>
            <Button primary onClick={() => editPost(post)}>
                Edit
            </Button>
            <Button onClick={() => deletePost(post.id)}>Delete</Button>
        </PostContainer>
    );
}

export default Post;
