import { useState, useEffect, useRef } from "react"
import Card from './Card'
import View from './View'
import './MainPage.css'
import ErrorPage from './ErrorPage'
import Loading from './Loading'
import leftArrowDummy from '../assets/images/leftArrowDummy.png'
import rightArrowDummy from '..//assets/images/rightArrowDummy.png'

function MainPage({apiUrl}) {
    const SAMPLE_INPUT = 'Search...'
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState(SAMPLE_INPUT)
    const [selectedData, setSelectedData] = useState()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const upArrow = useRef(null)
    const downArrow = useRef(null)

    function fetchData(url){
        setLoading(true)
        setSelectedData(null)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setData(data)
            })
            .catch(error => setError(error.message))
    }

    useEffect(() => {
        if(data.length === 0){
            fetchData(apiUrl)
        }
    },[])

    const getNextDataList = () => {
        fetchData(data.next)
    }

    const getPreviousDataList = () => {
        fetchData(data.previous)
    }

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData(apiUrl + "?search=" + searchTerm)
    }

    const sortByRecent = () => {
        upArrow.current.setAttribute('data-fa-transform', 'grow-6')
        console.log(upArrow)
        fetchData(apiUrl + (searchTerm !== SAMPLE_INPUT ? "?search=" + searchTerm : ''))
    }

    const sortByOlder = () => {
        downArrow.current.setAttribute('data-fa-transform', 'grow-6')
        fetchData(apiUrl + '?ordering=published_at' + (searchTerm && searchTerm !== SAMPLE_INPUT ? "&search=" + searchTerm : ''))
    }

    const handleSelectedData = (id) => {
        setLoading(true)
        fetch(apiUrl + '/' + id)
            .then(res => res.json())
            .then(data => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                setSelectedData(data)
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
                    className="search-form"
                    onSubmit={handleSubmit}>
                    <input
                        id="input-box"
                        value={searchTerm}
                        onChange={handleSearchInput}
                        onClick={() => setSearchTerm('')}
                    />
                    <i
                        className="fa-solid fa-square submit-button"
                        onClick={handleSubmit}
                    />
                </form>
                <div className="arrow-box">
                    <i
                        className="fa-solid fa-circle-arrow-up up-down-arrow"
                        ref={upArrow}
                        onClick={sortByRecent}
                    ></i>
                    <i
                        className="fa-solid fa-circle-arrow-down up-down-arrow"
                        ref={downArrow}
                        onClick={sortByOlder}
                    ></i>
                </div>
            </div>
            {selectedData && <View key={selectedData.id} data={selectedData} />}
            {
                    function(){
                        const currentComponent = apiUrl.slice(apiUrl.lastIndexOf('/') + 1, apiUrl.length)

                        switch (currentComponent) {
                            case 'articles':
                                return <h1 id="news-title">Latest Spaceflight news</h1>
                                break;
                            case 'blogs':
                                return <h1 id="news-title">Spiciest Space Stories!</h1>
                                break;
                            default:
                                return <h1 id="news-title">Daily reports!</h1>
                                break;
                        }
                    }()
                
            }
            <div id='main-frame'>
            {data.previous ?
                    <i className="fa-solid fa-circle-left arrow-image" onClick={getPreviousDataList}></i>
                :
                <img className="arrow-image-dummy" src={leftArrowDummy} alt="left arrow dummy" />
            }
                <div className="card-list">
                    {
                        data.results?.map((data) => (
                                <Card key={data.id} data={data} toogleSelected={handleSelectedData} />
                        ))    
                    }
                </div>
                {data.next ?
                    <i className="fa-solid fa-circle-right arrow-image" onClick={getNextDataList}></i>
                    :
                    <img className="arrow-image-dummy" src={rightArrowDummy} alt="right arrow dummy" />
                }
            </div>
        </div>
    )
}

export default MainPage