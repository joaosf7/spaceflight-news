import githubLogo from '../assets/images/githubLogo.png'
import linkedInLoog from '../assets/images/linkedInLogo.png'
import './Footer.css'

function Footer(){
    return (
        <footer>
            <a href="https://github.com/joaosf7" target='_blank' rel='noreferrer'>
                <img className='social-media-image' src={githubLogo} alt='github logo'/>
            </a>
            <a href='https://linkedin.com/in/joao-flor' target='_blank' rel='noreferrer'>
                <img className='social-media-image' src={linkedInLoog} alt='linkedIn logo'/>
            </a>
        </footer>
    )
}

export default Footer