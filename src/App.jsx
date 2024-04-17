import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MainPage from './components/MainPage'
import ErrorPage from './components/ErrorPage'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  const [darkmode, setDarkmode] = useState(window.matchMedia("(prefers-color-scheme:dark)").matches)

  const handleDarkmode = () => {
    setDarkmode(!darkmode)
  }

  return (
      <BrowserRouter>
        <div className={darkmode ? 'App darkmode' : 'App'}>
          <Navbar darkmode={darkmode} toggleDarkmode={handleDarkmode}/>
          <Routes>
            <Route exact path='/' element={<MainPage key='news' type='articles'/> } errorElement={<ErrorPage />}/>
            <Route path='/news' element={<MainPage key='news' type='articles'/>} />
            <Route path='/blogs' element={<MainPage key='blogs' type='blogs'/>} />
            <Route path='/reports' element={<MainPage key='reports' type='reports'/>} />
            <Route path='/*' element={<ErrorPage error={'No such endpoint: ' + window.location}/>} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;
