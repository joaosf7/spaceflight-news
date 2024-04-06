import { useState, useEffect } from "react"
import BlogView from './BlogView'
import BlogCard from './BlogCard'
import upArrow from '../../assets/images/upArrow.png'
import downArrow from '../../assets/images/downArrow.png'
import './Blog.css'
import ErrorPage from "../../ErrorPage"
import Loading from "../Loading"
import leftArrowDummy from '../../assets/images/leftArrowDummy.png'
import rightArrowDummy from '../../assets/images/rightArrowDummy.png'


function Blog(){
    const SAMPLE_INPUT = 'Search...'
    const [blogs, setBlogs] = useState([])
    const [searchTerm, setSearchTerm] = useState(SAMPLE_INPUT)
    const [selectedBlog, setSelectedBlog] = useState()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function fetchBlog(url){
        setLoading(true)
        setSelectedBlog(null)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setBlogs(data)
                setLoading(false)
            })
            .catch(error => setError(error.message))
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
        setLoading(true)
        fetch("https://api.spaceflightnewsapi.net/v4/blogs/" + id)
            .then(res => res.json())
            .then(data => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                setSelectedBlog(data)
                setLoading(false)
            })
            .catch(error => setError(error.message))
    }

    if(error)
        return <ErrorPage error={error} />

    if(loading){
        return <Loading />
    }

    return(
        <div id='main'>
            <div className="order-filter-box">
                <form
                    onSubmit={handleSubmit}>
                    <input
                        id="input-box"
                        value={searchTerm}
                        onChange={handleSearchInput}
                        onClick={() => setSearchTerm('')}
                    />
                </form>
                <div className="arrow-box">
                    <img className="up-down-arrow" src={upArrow} alt='up arrow'
                        onClick={sortByRecent}
                    />
                    <img className="up-down-arrow" src={downArrow} alt='down arrow'
                        onClick={sortByOlder}
                    />
                </div>
            </div>
            {selectedBlog && <BlogView blog={selectedBlog} />}
            <h1 id="blog-title">Spiciest space stories!</h1>
            <div id='main-frame'>
                {blogs.previous ? 
                    <i className="fa-solid fa-circle-left arrow-image" onClick={getNextBlogList}></i>
                    :
                    <img className="arrow-image-dummy" src={leftArrowDummy} alt="left arrow dummy" />
                }
                <div className="card-list">
                    {
                        blogs.results?.map(blog => (
                            <>
                                <BlogCard key={blog.id} blog={blog} toogleSelectedBlog={handleSelectedBlog} />
                                <div className="line-container" />
                            </>
                        ))
                    }
                </div>
                {blogs.next ?
                    <i className="fa-solid fa-circle-right arrow-image" onClick={getNextBlogList}></i>
                    :
                    <img className="arrow-image-dummy" src={rightArrowDummy} alt="right arrow dummy" />
                }
            </div>
        </div>

    )
}

export default Blog