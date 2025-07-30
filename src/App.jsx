import { HashRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Quiz from './components/Quiz';
import Report from './components/Report';
function App() {
  
  return (
    <HashRouter>
    <Routes>
      <Route path = '/' element = {<Home/>}/>
      <Route path = '/quiz' element = {<Quiz/>}/>
      <Route path = '/report' element = {<Report/>}/>
    </Routes>
    </HashRouter>
  );
}

export default App;
