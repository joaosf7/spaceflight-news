import './BlogView.css'

function BlogView({blog}){
    return(
        <a
            id="blog-view"
            href={blog.url}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            <div>
                <h1 className='blog-title'>{blog.title}</h1>
                <img className="blog-view-image" src={blog.image_url} alt="blog" />
                <p className='summary'>{blog.summary}</p>
                <h4>Published at: {blog.published_at.slice(0, 10)}</h4>
            </div>
        </a>
    )
}

export default BlogView