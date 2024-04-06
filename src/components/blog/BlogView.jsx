import { Link } from 'react-router-dom'
import './BlogView.css'

function BlogView({blog}){
    return(
        <Link className='link blog-view' to={blog.url}>
            <div>
                <h1 className='blog-title'>{blog.title}</h1>
                <img className="blog-view-image" src={blog.image_url} alt="blog" />
                <p className='summary'>{blog.summary}</p>
                <h4 className='published-at'>Published at: {blog.published_at.slice(0, 10)}</h4>
            </div>
        </Link>
    )
}

export default BlogView