import React, { useState, useEffect } from "react";

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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <input type="file" multiple onChange={handlePictureChange} />
            <button type="submit">
                {editingPost ? "Update Post" : "Add Post"}
            </button>
        </form>
    );
}

export default PostForm;
