import './BlogCard.css'

function BlogCard(props){
    return(
        <div id="blog-card" onClick={() => props.toogleSelectedBlog(props.blog.id)}>
            <h5 className='blog-card-title'>{props.blog.title}</h5>
            <img id="blog-card-image" src={props.blog.image_url} alt="blog"/>
            <p className='blog-card-release'>{props.blog.published_at.slice(0,10)}</p>
        </div>
    )
}

export default BlogCard