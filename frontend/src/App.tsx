import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import LoginComponent from './components/loginComponent'
import WelcomeComponent from './components/welcomeComponent'
import ResearchComponent from './components/researchComponent'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginComponent/>}/>
      <Route path='/' element={<WelcomeComponent/>}/>
      <Route path='/test' element={<ResearchComponent/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
