import './BlogCard.css'

function BlogCard(props){
    return(
        <div id="blog-card" onClick={() => props.toogleSelectedBlog(props.blog.id)}>
            <img id="blog-card-image" src={props.blog.image_url} alt="blog"/>
            <div className='card-info'>
                <h5 className='blog-card-title'>{props.blog.title}</h5>
                <p className='blog-card-release'>{props.blog.published_at.slice(0,10)}</p>
            </div>
        </div>
    )
}

export default BlogCard