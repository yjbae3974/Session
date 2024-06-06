import { useState, useEffect, useRef } from "react"

const choiceOptions = ['rock', 'scissors', 'paper'];

export function RockPaperScissors() {
    const [myChoice, setMyChoice] = useState([null, null]);
    const [result, setResult] = useState(null);
    const [winCount, setWinCount] = useState(0);
    const [loseCount, setLoseCount] = useState(0);
    const [drawCount, setDrawCount] = useState(0);

    const resultRef = useRef(null);

    useEffect(() => {
        const storedMyChoice = localStorage.getItem('myChoice');
        const storedEnemyChoice = localStorage.getItem('enemyChoice');
        const storedResult = localStorage.getItem('result');
        const storedWinCount = localStorage.getItem('winCount');
        const storedLoseCount = localStorage.getItem('loseCount');
        const storedDrawCount = localStorage.getItem('drawCount');

        if (storedMyChoice && storedEnemyChoice && storedResult) {
            setMyChoice([JSON.parse(storedMyChoice), JSON.parse(storedEnemyChoice)]);
            setResult(storedResult);
        }

        if (storedWinCount) setWinCount(JSON.parse(storedWinCount));
        if (storedLoseCount) setLoseCount(JSON.parse(storedLoseCount));
        if (storedDrawCount) setDrawCount(JSON.parse(storedDrawCount));
    }, []);

    useEffect(() => {
        if (myChoice[0] && myChoice[1]) {
            if (myChoice[0] === myChoice[1]) {
                setResult('비겼습니다.');
                setDrawCount(prev => prev + 1);
            } else if (
                (myChoice[0] === 'rock' && myChoice[1] === 'scissors') ||
                (myChoice[0] === 'scissors' && myChoice[1] === 'paper') ||
                (myChoice[0] === 'paper' && myChoice[1] === 'rock')
            ) {
                setResult('이겼습니다.');
                setWinCount(prev => prev + 1);
            } else {
                setResult('졌습니다.');
                setLoseCount(prev => prev + 1);
            }
        }
    }, [myChoice]);

    useEffect(() => {
        if (result === '이겼습니다.') {
            resultRef.current.style.color = 'blue';
        } else if (result === '졌습니다.') {
            resultRef.current.style.color = 'red';
        } else {
            resultRef.current.style.color = 'black';
        }
    }, [result]);

    useEffect(() => {
        localStorage.setItem('myChoice', JSON.stringify(myChoice[0]));
        localStorage.setItem('enemyChoice', JSON.stringify(myChoice[1]));
        localStorage.setItem('result', result);
        localStorage.setItem('winCount', JSON.stringify(winCount));
        localStorage.setItem('loseCount', JSON.stringify(loseCount));
        localStorage.setItem('drawCount', JSON.stringify(drawCount));
    }, [myChoice, result, winCount, loseCount, drawCount]);

    const onButtonClick = () => {
        const myChoice = choiceOptions[Math.floor(Math.random() * 3)];
        const enemyChoice = choiceOptions[Math.floor(Math.random() * 3)];
        setMyChoice([myChoice, enemyChoice]);
    }

    return (
        <>
            <h2>가위바위보</h2>
            <button onClick={onButtonClick}>내기</button>
            <div>myChoice: {myChoice[0]}</div>
            <div>enemyChoice: {myChoice[1]}</div>
            <div ref={resultRef}>result: {result}</div>
            <div>이긴 횟수: {winCount}</div>
            <div>진 횟수: {loseCount}</div>
            <div>비긴 횟수: {drawCount}</div>
        </>
    )
}
