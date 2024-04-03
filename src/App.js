import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Main from './components/Main'
import Blog from './components/Blog'
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


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
          <Route exact path='/' element={<Main />} />
          <Route path='/articles' element={<Main />} />
          <Route path='/blogs' element={<Blog />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
