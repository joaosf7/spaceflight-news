import spaceflightLogo from '../assets/images/spaceflightLogo.png'
import darkmodeSwitch from '../assets/images/darkmodeSwitch.png'
import './Navbar.css'
import {Link} from 'react-router-dom'

function Navbar(props) {
    return (
      <header>
        <div className='navbar'>
          <Link className='link-box' to='/'>
            <img id='navbar-logo' src={spaceflightLogo} alt='spaceflight logo'/>
            <h1 id='navbar-title'>SPACEFLIGHT NEWS</h1>
          </Link>
          <img
            id='darkmode-switch'
            src={darkmodeSwitch}
            alt='darkmode switch'
            onClick={props.toogleDarkmode}
          />
        </div>
          <div className="navbar-links">
            <Link className="navbar-link" to="/news">Articles</Link>
            <Link className='navbar-link' to='/blogs'>Blogs</Link>
            <Link className='navbar-link' to='/reports'>Reports</Link>
          </div>
      </header>
    );
  }
  
  export default Navbar;
  