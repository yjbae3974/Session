import { useState } from "react";

function Update({ onUpdate, item }) {
    const [title, setTitle] = useState(item.title);
    const [content, setContent] = useState(item.content);
    const handleClick = () => {
        onUpdate(title, content);
    };
    return (
        <form>
            <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />
            <textarea
                placeholder="content"
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                }}
            ></textarea>
            <button type="button" onClick={handleClick}>
                수정
            </button>
        </form>
    );
}

export default Update;
