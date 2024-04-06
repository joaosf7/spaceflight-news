import './ReportCard.css'

function ReportCard(props){
    return(
        <div id="report-card" onClick={() => props.toogleSelectedReport(props.report.id)}>
            <img id="report-card-image" src={props.report.image_url} alt="report"/>
            <div className='card-info'>
                <h5 className='report-card-title'>{props.report.title}</h5>
                <p className='report-card-summary'>{props.report.summary}</p>
                <p className='report-card-release'>{props.report.published_at.slice(0,10)}</p>
            </div>
        </div>
    )
}

export default ReportCard