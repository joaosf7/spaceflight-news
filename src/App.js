import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import News from './components/News'
import Blog from './components/Blog'
import Report from './components/Report'
import ErrorPage from './ErrorPage'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  const [darkmode, setDarkmode] = useState(false)

  const handleDarkmode = () => {
    setDarkmode(!darkmode)
  }


  return (
    <BrowserRouter>
      <div className={darkmode ? 'App' : 'App darkmode'}>
        <Navbar toogleDarkmode={handleDarkmode}/>
        <Routes>
          <Route exact path='/' element={<News /> } errorElement={<ErrorPage />}/>
          <Route path='/news' element={<News />} />
          <Route path='/blogs' element={<Blog />} />
          <Route path='/reports' element={<Report />} />
          <Route path='/*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
