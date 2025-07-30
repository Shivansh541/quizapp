import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Quiz from './components/Quiz';
import Report from './components/Report';
function App() {
  
  return (
    <BrowserRouter >
    <Routes>
      <Route path = '/quizapp/' element = {<Home/>}/>
      <Route path = '/quizapp/quiz' element = {<Quiz/>}/>
      <Route path = '/quizapp/report' element = {<Report/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
