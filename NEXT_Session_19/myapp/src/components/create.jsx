import React, { useState } from 'react';

function Create({ onCreate }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const handleClick = () => {
        onCreate(title, content);
        setTitle("");
        setContent("");
    }

    return (
        <form>
            <input type="text" placeholder="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
            <textarea placeholder="content" value={content} onChange={(e)=>{setContent(e.target.value)}}></textarea>
            <button type="button" onClick={handleClick}>생성</button>
        </form>
    );
}

export default Create;