import spaceflightLogo from '../assets/images/spaceflightLogo.png'
import darkmodeSwitch from '../assets/images/darkmodeSwitch.png'
import './Navbar.css'

function Navbar(props) {
    return (
      <header className="navbar">
        <img id='navbar-logo' src={spaceflightLogo} alt='spaceflight logo'/>
        <h1>SPACEFLIGHT NEWS</h1>
        <img
          id='darkmode-switch'
          src={darkmodeSwitch}
          alt='darkmode switch'
          onClick={props.toogleDarkmode}
        />
      </header>
    );
  }
  
  export default Navbar;
  