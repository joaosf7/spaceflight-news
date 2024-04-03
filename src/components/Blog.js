import { useState, useEffect } from "react"
import BlogView from './BlogView'
import BlogCard from './BlogCard'
import loadingImage from '../assets/images/loading.gif'
import leftArrow from '../assets/images/leftArrow.png'
import rightArrow from '../assets/images/rightArrow.png'
import upArrow from '../assets/images/upArrow.png'
import downArrow from '../assets/images/downArrow.png'
import './Blog.css'

function Blog(){
    const SAMPLE_INPUT = 'Search blogs...'
    const [blogs, setBlogs] = useState([])
    const [searchTerm, setSearchTerm] = useState(SAMPLE_INPUT)
    const [selectedBlog, setSelectedBlog] = useState()

    function fetchBlog(url){
        fetch(url)
            .then(res => res.json())
            .then(data => setBlogs(data))
            .catch(error => console.error('Error fetching blog: ' + error))
    }

    useEffect(() => {
        if(blogs.length === 0){
            fetchBlog("https://api.spaceflightnewsapi.net/v4/blogs")
        }
    },[])

    const getNextBlogList = () => {
        fetchBlog(blogs.next)
    }

    const getPreviousBlogList = () => {
        fetchBlog(blogs.previous)
    }

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchBlog("https://api.spaceflightnewsapi.net/v4/blogs?search=" + searchTerm)
    }

    const sortByRecent = () => {
        fetchBlog("https://api.spaceflightnewsapi.net/v4/blogs" + (searchTerm !== SAMPLE_INPUT ? "?search=" + searchTerm : ''))
    }

    const sortByOlder = () => {
        fetchBlog("https://api.spaceflightnewsapi.net/v4/blogs" + '?ordering=published_at' + (searchTerm && searchTerm !== SAMPLE_INPUT ? "&search=" + searchTerm : ''))
    }

    const handleSelectedBlog = (id) => {
        fetch("https://api.spaceflightnewsapi.net/v4/blogs/" + id)
            .then(res => res.json())
            .then(data => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                setSelectedBlog(data)
            })
            .catch(error => console.error(error))
    }

    return(
        <div id='main'>
            {selectedBlog && <BlogView blog={selectedBlog} />}
            <h1 id="blog-title">Spiciest Blogs!</h1>
            <form
                onSubmit={handleSubmit}>
                <input
                    id="input-box"
                    value={searchTerm}
                    onChange={handleSearchInput}
                    onClick={() => setSearchTerm('')}
                />
            </form>
            <div className="order-filter-box">
                <img className="up-down-arrow" src={upArrow} alt='up arrow'
                    onClick={sortByRecent}
                />
                <img className="up-down-arrow" src={downArrow} alt='down arrow'
                    onClick={sortByOlder}
                />
            </div>
            <div id='main-frame'>
            {blogs.previous ? 
                <img className='arrow-image' src={leftArrow} alt="left arrow" 
                    onClick={getPreviousBlogList}/>
                :
                ''
            }
                <div id="card-list">
                    {blogs.length === 0 ?
                            <img src={loadingImage} alt="loading image" />
                        :
                            blogs.results.map(blog => (
                                <BlogCard key={blog.id} blog={blog} toogleSelectedBlog={handleSelectedBlog} />
                        ))
                    }
                </div>
                {blogs.next ?
                    <img className='arrow-image' src={rightArrow} alt="right arrow" 
                        onClick={getNextBlogList}
                    />
                    :
                    ''
                }
            </div>
        </div>

    )
}

export default Blog