import { useState, useEffect } from "react"
import ReportView from './ReportView'
import ReportCard from './ReportCard'
import leftArrow from '../../assets/images/leftArrow.png'
import rightArrow from '../../assets/images/rightArrow.png'
import upArrow from '../../assets/images/upArrow.png'
import downArrow from '../../assets/images/downArrow.png'
import './Report.css'
import ErrorPage from '../../ErrorPage'
import Loading from "../Loading"

function Report(){
    const SAMPLE_INPUT = 'Search reports...'
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
                <img className="up-down-arrow" src={upArrow} alt='up arrow'
                    onClick={sortByRecent}
                />
                <img className="up-down-arrow" src={downArrow} alt='down arrow'
                    onClick={sortByOlder}
                />
            </div>
            {selectedReport && <ReportView report={selectedReport} />}
            <h1 id="report-title">Daily Reports</h1>
            <div id='main-frame'>
            {reports.previous &&
                <img className='arrow-image' src={leftArrow} alt="left arrow" 
                    onClick={getPreviousReportList}/>
            }
                <div id="card-list">
                    {
                        reports.results?.map(report => (
                            <ReportCard key={report.id} report={report} toogleSelectedReport={handleSelectedReport} />
                        ))
                    }
                </div>
                {reports.next &&
                    <img className='arrow-image' src={rightArrow} alt="right arrow" 
                        onClick={getNextReportList}
                    />
                }
            </div>
        </div>

    )
}

export default Report