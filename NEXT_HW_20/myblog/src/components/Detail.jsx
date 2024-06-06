import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const DetailContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

const Title = styled.h2`
    text-align: center;
    color: #333;
`;

const Content = styled.p`
    color: #666;
`;

const Image = styled.img`
    max-width: 100%;
    height: auto;
    display: block;
    margin-bottom: 10px;
`;

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
        if (imgRef.current[index]) {
            imgRef.current[index].href = "https://new-url.com";
        }
    };

    return (
        post && (
            <DetailContainer>
                <Title>{post.title}</Title>
                <Content>{post.content}</Content>
                {post.pictures.map((picture, index) => (
                    <a
                        key={index}
                        href={picture}
                        ref={(el) => (imgRef.current[index] = el)}
                        onClick={() => changeImageHref(index)}
                    >
                        <Image
                            src={picture}
                            alt={`Post ${post.id} - ${index}`}
                        />
                    </a>
                ))}
            </DetailContainer>
        )
    );
}

export default Detail;
