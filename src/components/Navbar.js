import spaceflightLogo from '../assets/images/spaceflightLogo.png'
import darkmodeSwitch from '../assets/images/darkmodeSwitch.png'
import './Navbar.css'
import {Link} from 'react-router-dom'

function Navbar(props) {
    return (
      <header>
        <div className='navbar'>
          <img id='navbar-logo' src={spaceflightLogo} alt='spaceflight logo'/>
          <Link className='link-box' to='/'>
            <h1>SPACEFLIGHT NEWS</h1>
          </Link>
          <img
            id='darkmode-switch'
            src={darkmodeSwitch}
            alt='darkmode switch'
            onClick={props.toogleDarkmode}
          />
        </div>
          <div className="navbar-links">
            <Link className="navbar-link" to="/articles">Articles</Link>
            <Link to='/blogs' className='navbar-link'>Blogs</Link>
          </div>
      </header>
    );
  }
  
  export default Navbar;
  