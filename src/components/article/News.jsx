import { useState, useEffect } from "react"
import NewsCard from './NewsCard'
import ArticleView from './ArticleView'
import './News.css'
import leftArrow from '../../assets/images/leftArrow.png'
import rightArrow from '../../assets/images/rightArrow.png'
import upArrow from '../../assets/images/upArrow.png'
import downArrow from '../../assets/images/downArrow.png'
import ErrorPage from '../../ErrorPage'
import Loading from '../Loading'
import leftArrowDummy from '../../assets/images/leftArrowDummy.png'
import rightArrowDummy from '../../assets/images/rightArrowDummy.png'

function News() {
    const SAMPLE_INPUT = 'Search...'
    const [articles, setArticles] = useState([])
    const [searchTerm, setSearchTerm] = useState(SAMPLE_INPUT)
    const [selectedArticle, setSelectedArticle] = useState()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function fetchArticle(url){
        setLoading(true)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setArticles(data)
            })
            .catch(error => setError(error.message))
    }

    useEffect(() => {
        if(articles.length === 0){
            fetchArticle("https://api.spaceflightnewsapi.net/v4/articles")
        }
    },[])

    const getNextArticleList = () => {
        fetchArticle(articles.next)
    }

    const getPreviousArticleList = () => {
        fetchArticle(articles.previous)
    }

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchArticle("https://api.spaceflightnewsapi.net/v4/articles?search=" + searchTerm)
    }

    const sortByRecent = () => {
        fetchArticle("https://api.spaceflightnewsapi.net/v4/articles" + (searchTerm !== SAMPLE_INPUT ? "?search=" + searchTerm : ''))
    }

    const sortByOlder = () => {
        fetchArticle("https://api.spaceflightnewsapi.net/v4/articles" + '?ordering=published_at' + (searchTerm && searchTerm !== SAMPLE_INPUT ? "&search=" + searchTerm : ''))
    }

    const handleSelectedArticle = (id) => {
        setLoading(true)
        fetch("https://api.spaceflightnewsapi.net/v4/articles/" + id)
            .then(res => res.json())
            .then(data => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                setSelectedArticle(data)
                setLoading(false)
            })
            .catch(error => setError(error.message))
    }

    if(error)
        return <ErrorPage error={error} />
    
    if(loading)
        return <Loading />

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
            {selectedArticle && <ArticleView key={selectedArticle.id} article={selectedArticle} />}
            <h1 id="news-title">Latest Spaceflight news</h1>
            <div id='main-frame'>
            {articles.previous ?
                <img className='arrow-image' src={leftArrow} alt="left arrow" 
                    onClick={getPreviousArticleList}/>
                :
                <img className="arrow-image-dummy" src={leftArrowDummy} alt="left arrow dummy" />
            }
                <div className="card-list">
                    {
                        articles.results?.map((article, idx) => (
                            <>  
                                <NewsCard key={article.id} article={article} toogleSelectedArticle={handleSelectedArticle} />
                                <div className="line-container"/>
                            </>
                        ))    
                    }
                </div>
                {articles.next ?
                    <img className='arrow-image' src={rightArrow} alt="right arrow" 
                        onClick={getNextArticleList}
                    />
                    :
                    <img className="arrow-image-dummy" src={rightArrowDummy} alt="right arrow dummy" />
                }
            </div>
        </div>
    )
}

export default News