import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Quiz from './components/Quiz';
import Report from './components/Report';
function App() {
  
  return (
    <BrowserRouter basename='/'>
    <Routes>
      <Route path = '/' element = {<Home/>}/>
      <Route path = '/quiz' element = {<Quiz/>}/>
      <Route path = '/report' element = {<Report/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
