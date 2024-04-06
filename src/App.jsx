import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import News from './components/article/News'
import Blog from './components/blog/Blog'
import Report from './components/report/Report'
import ErrorPage from './ErrorPage'
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
            <Route exact path='/' element={<News /> } errorElement={<ErrorPage />}/>
            <Route path='/news' element={<News />} />
            <Route path='/blogs' element={<Blog />} />
            <Route path='/reports' element={<Report />} />
            <Route path='/*' element={<ErrorPage error={'No such endpoint: ' + window.location}/>} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;
