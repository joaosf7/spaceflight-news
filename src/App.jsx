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
          <Navbar darkmode={darkmode} toogleDarkmode={handleDarkmode}/>
          <Routes>
            <Route exact path='/' element={<MainPage key='news' apiUrl='https://api.spaceflightnewsapi.net/v4/articles'/> } errorElement={<ErrorPage />}/>
            <Route path='/news' element={<MainPage key='news' apiUrl='https://api.spaceflightnewsapi.net/v4/articles'/>} />
            <Route path='/blogs' element={<MainPage key='blogs' apiUrl='https://api.spaceflightnewsapi.net/v4/blogs'/>} />
            <Route path='/reports' element={<MainPage key='reports' apiUrl='https://api.spaceflightnewsapi.net/v4/reports'/>} />
            <Route path='/*' element={<ErrorPage error={'No such endpoint: ' + window.location}/>} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;
