import React from "react";
import Article from "./components/article";
import Header from "./components/header";
import Nav from "./components/nav";
import Create from "./components/create";
import Update from "./components/update";
import { useState } from "react";

function App() {
    const [mode, setMode] = useState("HOME");
    const [id, setId] = useState(-1);
    const [list, setList] = useState([
        { id: 0, title: "이름", content: "배연준" },
        { id: 1, title: "생년월일", content: "2000.01.03" },
        { id: 2, title: "학력", content: "고려대학교" },
    ]);
    let title;
    let content;

    const handleCreate = (title, content) => {
        setList([...list, { title, content, id: list.length }]);
    };
    const handleUpdate = (title, content) => {
        setList(
            list.map((item) => (item.id === id ? { title, content, id } : item))
        );
        setMode("READ");
    };
    const handleDelete = () => {
        setList(list.filter((item) => item.id !== id));
        setMode("HOME");
        setId(-1);
    };
    if (mode === "HOME") {
        title = "인사";
        content = "안녕하세요, 배연준입니다.";
    } else if (mode === "READ") {
        title = list[id].title;
        content = list[id].content;
    }
    return (
        <>
            <Header onChangeMode={() => setMode("HOME")}>배연준 이력서</Header>
            <Nav
                list={list}
                onChangeMode={(_id) => {
                    setMode("READ");
                    setId(_id);
                }}
            />
            <Article title={title} content={content} />
            {mode === "CREATE" && <Create onCreate={handleCreate} />}
            {mode === "HOME" && (
                <button onClick={() => setMode("CREATE")}>글 생성</button>
            )}
            {mode === "READ" && (
                <>
                    <button onClick={() => setMode("UPDATE")}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </>
            )}
            {mode === "UPDATE" && (
                <Update
                    onUpdate={handleUpdate}
                    item={list.find((item) => item.id === id)}
                />
            )}
        </>
    );
}

export default App;
