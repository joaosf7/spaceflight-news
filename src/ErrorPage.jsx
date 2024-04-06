import { Link } from "react-router-dom"
import './ErrorPage.css'

function ErrorPage({error}){
    return(
        <div id="error-page">
            <h1>Oops!</h1>
            <p>It seems something went wrong.</p>
            <h4>App wizards info: </h4>
            <div className="error-message">{error}</div>
            <br/>
            <p>Here are some helpful links:</p>
            <div id='error-page-links'>
                <Link className='link' to='/news'>News</Link>
                <Link className='link' to='/blogs'>Blogs</Link>
                <Link className='link' to='/reports'>Reports</Link>
            </div>
        </div>
    )
}

export default ErrorPage