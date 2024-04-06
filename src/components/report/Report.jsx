import { useState, useEffect } from "react"
import View from '../View'
import Card from '../Card'
import './Report.css'
import ErrorPage from '../ErrorPage'
import Loading from "../Loading"
import leftArrowDummy from '../../assets/images/leftArrowDummy.png'
import rightArrowDummy from '../../assets/images/rightArrowDummy.png'

function Report(){
    const SAMPLE_INPUT = 'Search...'
    const [reports, setReports] = useState([])
    const [searchTerm, setSearchTerm] = useState(SAMPLE_INPUT)
    const [selectedReport, setSelectedReport] = useState()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function fetchReport(url){
        setLoading(true)
        setSelectedReport(null)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setReports(data)
                setLoading(false)
            })
            .catch(error => setError(error.message))
    }

    useEffect(() => {
        if(reports.length === 0){
            fetchReport("https://api.spaceflightnewsapi.net/v4/reports")
        }
    },[])

    const getNextReportList = () => {
        fetchReport(reports.next)
    }

    const getPreviousReportList = () => {
        fetchReport(reports.previous)
    }

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchReport("https://api.spaceflightnewsapi.net/v4/reports?search=" + searchTerm)
    }

    const sortByRecent = () => {
        fetchReport("https://api.spaceflightnewsapi.net/v4/reports" + (searchTerm !== SAMPLE_INPUT ? "?search=" + searchTerm : ''))
    }

    const sortByOlder = () => {
        fetchReport("https://api.spaceflightnewsapi.net/v4/reports" + '?ordering=published_at' + (searchTerm && searchTerm !== SAMPLE_INPUT ? "&search=" + searchTerm : ''))
    }

    const handleSelectedReport = (id) => {
        setLoading(true)
        fetch("https://api.spaceflightnewsapi.net/v4/reports/" + id)
            .then(res => res.json())
            .then(data => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                setSelectedReport(data)
                setLoading(false)
            })
            .catch(error => setError(error.message))
    }

    if (error){
        return <ErrorPage error={error} />
    }
    
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
                    <i
                        className="fa-solid fa-circle-arrow-up up-down-arrow"
                        onClick={sortByRecent}
                    />
                    <i
                        className="fa-solid fa-circle-arrow-down up-down-arrow"
                        onClick={sortByOlder}
                    />
                </div>
            </div>
            {selectedReport && <View data={selectedReport} />}
            <h1 id="report-title">Daily Reports</h1>
            <div id='main-frame'>
            {reports.previous ?
                <i className="fa-solid fa-circle-left arrow-image" onClick={getNextReportList}></i>
                :
                <img className="arrow-image-dummy" src={leftArrowDummy} alt="left arrow dummy" />
            }
                <div className="card-list">
                    {
                        reports.results?.map(report => (
                            <Card key={report.id} data={report} toogleSelected={handleSelectedReport} />
                        ))
                    }
                </div>
                {reports.next ?
                <i className="fa-solid fa-circle-right arrow-image" onClick={getNextReportList}></i>
                    :
                    <img className="arrow-image-dummy" src={rightArrowDummy} alt="right arrow dummy" />
                }
            </div>
        </div>

    )
}

export default Report