import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

function Detail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const imgRef = useRef([]);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        const currentPost = storedPosts.find((post) => post.id === id);
        setPost(currentPost);
    }, [id]);

    const changeImageHref = (index) => {
        imgRef.current[index].href = "https://new-url.com";
    };

    return (
        post && (
            <div>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                {post.pictures.map((picture, index) => (
                    <a
                        key={index}
                        href={picture}
                        ref={(el) => (imgRef.current[index] = el)}
                        onClick={() => changeImageHref(index)}
                    >
                        <img src={picture} alt={`Post ${post.id} - ${index}`} />
                    </a>
                ))}
            </div>
        )
    );
}

export default Detail;
