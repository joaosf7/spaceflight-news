import { useState, useEffect } from "react"
import NewsCard from './NewsCard.js'
import ArticleView from './ArticleView.js'
import './News.css'
import loadingImage from '../assets/images/loading.gif'
import leftArrow from '../assets/images/leftArrow.png'
import rightArrow from '../assets/images/rightArrow.png'
import upArrow from '../assets/images/upArrow.png'
import downArrow from '../assets/images/downArrow.png'

function News() {
    const SAMPLE_INPUT = 'Search articles...'
    const [articles, setArticles] = useState([])
    const [searchTerm, setSearchTerm] = useState(SAMPLE_INPUT)
    const [selectedArticle, setSelectedArticle] = useState()
    const [darkmode, setDarkmode] = useState(false)

    const handleDarkmode = () => {
      setDarkmode(!darkmode)
    }

    function fetchArticle(url){
        fetch(url)
            .then(res => res.json())
            .then(data => setArticles(data))
            .catch(error => console.error('Error fetching article: ' + error))
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
        fetch("https://api.spaceflightnewsapi.net/v4/articles/" + id)
            .then(res => res.json())
            .then(data => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                setSelectedArticle(data)
            })
            .catch(error => console.error(error))
    }

    return(
        <div id='main'>
            {selectedArticle && <ArticleView article={selectedArticle} />}
            <h1 id="news-title">Latest Spaceflight news</h1>
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
            {articles.previous ? 
                <img className='arrow-image' src={leftArrow} alt="left arrow" 
                    onClick={getPreviousArticleList}/>
                :
                ''
            }
                <div id="card-list">
                    {articles.length === 0 ?
                            <img src={loadingImage} alt="loading image" />
                        :
                            articles.results.map(article => (
                                <NewsCard key={article.id} article={article} toogleSelectedArticle={handleSelectedArticle} />
                        ))
                    }
                </div>
                {articles.next ?
                    <img className='arrow-image' src={rightArrow} alt="right arrow" 
                        onClick={getNextArticleList}
                    />
                    :
                    ''
                }
            </div>
        </div>
    )
}

export default News