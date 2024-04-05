import './ReportCard.css'

function ReportCard(props){
    return(
        <div id="report-card" onClick={() => props.toogleSelectedReport(props.report.id)}>
            <h5 className='report-card-title'>{props.report.title}</h5>
            <img id="report-card-image" src={props.report.image_url} alt="report"/>
            <p className='report-card-release'>{props.report.published_at.slice(0,10)}</p>
        </div>
    )
}

export default ReportCard