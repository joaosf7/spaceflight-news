import './ReportView.css'

function ReportView({report}){
    return(
        <a
            id="report-view"
            href={report.url}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            <div>
                <h1>{report.title}</h1>
                <img className="report-view-image" src={report.image_url} alt="report" />
                <p>{report.summary}</p>
                <h4>Published at: {report.published_at.slice(0, 10)}</h4>
            </div>
        </a>
    )
}

export default ReportView