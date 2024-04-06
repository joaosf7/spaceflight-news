import './ReportView.css'
import { Link } from 'react-router-dom'

function ReportView({report}){
    return(
        <Link className='link report-view' to={report.url}>
            <div>
                <h1 className='report-title'>{report.title}</h1>
                <img className="report-view-image" src={report.image_url} alt="report" />
                <p className='summary'>{report.summary}</p>
                <h4 className='published-at'>Published at: {report.published_at.slice(0, 10)}</h4>
            </div>
        </Link>
    )
}

export default ReportView