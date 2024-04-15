import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginComponent from './components/loginComponent'
import WelcomeComponent from './components/welcomeComponent'
import ResearchComponent from './components/researchComponent'
import BaseUrlComponent from './components/baseUrlComponent';
import UserComponent from './components/userComponent';
import { useState, createContext } from 'react';
import secureLocalStorage from 'react-secure-storage';

const baseUrlFromStorage = secureLocalStorage.getItem('baseUrl')
let baseUrlValue='http://localhost:4000'
if (baseUrlFromStorage != null || baseUrlFromStorage != undefined)
  baseUrlValue=baseUrlFromStorage.toString()

  export const AppContext = createContext<any>(baseUrlValue)

function App() {
  const [baseUrl, setBaseUrl] = useState(baseUrlValue)

  const contextValue = {
    value: baseUrl,
    setValue: setBaseUrl
  };
  return (
    <BrowserRouter>
      <AppContext.Provider value={contextValue} >
        <Routes>
          <Route path='/login' element={<LoginComponent />} />
          <Route path='/' element={<WelcomeComponent />} />
          <Route path='/test' element={<ResearchComponent />} />
          <Route path='/baseurl' element={<BaseUrlComponent />} />
          <Route path='/:username' element={<UserComponent />} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
