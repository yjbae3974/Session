import './App.css';
import {Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { RockPaperScissors } from './pages/rockPaperScissors';
import { useNavigate } from 'react-router-dom';

//참고로 a태그를 쓰지 않는 이유는, 이를 사용하면 페이지 전체를 새로고침하기 때문이다.

function App() {

  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };

  return (
    <>
        <Routes>
          <Route path='/' element={<RockPaperScissors />} />
        </Routes>
    </>
  );
}

export default App;
