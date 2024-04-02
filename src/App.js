import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Main from './components/Main'
import { useState } from 'react';


function App() {
  const [darkmode, setDarkmode] = useState(false)

  const handleDarkmode = () => {
    setDarkmode(!darkmode)
  }


  return (
    <div className={darkmode ? 'App' : 'App darkmode'}>
      <Navbar toogleDarkmode={handleDarkmode}/>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
