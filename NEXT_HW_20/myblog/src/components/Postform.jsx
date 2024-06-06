import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const TextArea = styled.textarea`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    padding: 10px;
    font-size: 16px;
    color: white;
    background-color: #8D0029;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #7C0019;
    }
`;

function PostForm({ addOrUpdatePost, editingPost }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        if (editingPost) {
            setTitle(editingPost.title);
            setContent(editingPost.content);
            setPictures(editingPost.pictures);
        }
    }, [editingPost]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            id: editingPost ? editingPost.id : Date.now().toString(),
            title,
            content,
            pictures,
        };
        addOrUpdatePost(newPost);
        setTitle("");
        setContent("");
        setPictures([]);
    };

    const handlePictureChange = (e) => {
        const files = Array.from(e.target.files);
        const pictureUrls = files.map((file) => URL.createObjectURL(file));
        setPictures(pictureUrls);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <Input type="file" multiple onChange={handlePictureChange} />
            <Button primary type="submit">
                {editingPost ? "Update Post" : "Add Post"}
            </Button>
        </Form>
    );
}

export default PostForm;
