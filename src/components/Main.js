import { useState, useEffect } from "react"
import NewsCard from './NewsCard.js'
import './Main.css'
import loadingImage from '../assets/images/loading.gif'
import leftArrow from '../assets/images/leftArrow.png'
import rightArrow from '../assets/images/rightArrow.png'
import upArrow from '../assets/images/upArrow.png'
import downArrow from '../assets/images/downArrow.png'

function Main() {
    const SAMPLE_INPUT = 'Search news article...'
    const [articles, setArticles] = useState([])
    const [error, setError] = useState()
    const [searchTerm, setSearchTerm] = useState(SAMPLE_INPUT)
    const [count, setCount] = useState(0)

    useEffect(() => {
        setCount(count+1)
        if(articles.length === 0)
            fetch("https://api.spaceflightnewsapi.net/v4/articles")
                .then(res => res.json())
                .then(data => setArticles(data))
                .catch(error => setError(error))
    },[])

    const getNextArticleList = () => {
        fetch(articles.next)
            .then(res => res.json())
            .then(data => setArticles(data))
            .catch(error => setError(error))
    }

    const getPreviousArticleList = () => {
        fetch(articles.previous)
            .then(res => res.json())
            .then(data => setArticles(data))
            .catch(error => setError(error))
    }

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("https://api.spaceflightnewsapi.net/v4/articles?search=" + searchTerm)
            .then(res => res.json())
            .then(data => setArticles(data))
            .catch(error => setError(error))
    }

    const sortByRecent = () => {
        fetch("https://api.spaceflightnewsapi.net/v4/articles" + (searchTerm && searchTerm !== SAMPLE_INPUT ? "?search=" + searchTerm : ''))
            .then(res => res.json())
            .then(data => setArticles(data))
            .catch(error => setError(error))
    }

    const sortByOlder = () => {
        fetch("https://api.spaceflightnewsapi.net/v4/articles" + '?ordering=published_at' + (searchTerm && searchTerm !== SAMPLE_INPUT ? "&search=" + searchTerm : ''))
            .then(res => res.json())
            .then(data => setArticles(data))
            .catch(error => setError(error))
    }

    return(
        <div id='main'>
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
            <img className="up-down-arrow" src={upArrow} alt='up arrow'
                onClick={sortByRecent}
            />
            <img className="up-down-arrow" src={downArrow} alt='down arrow'
                onClick={sortByOlder}
            />
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
                                <NewsCard key={article.id} article={article} />
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

export default Main