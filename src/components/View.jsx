import { Link } from 'react-router-dom'
import './View.css'

function View({data}){
    return(
        <Link className='link view' to={data.url} target="_blank" rel="noopener noreferrer">
            <h1 className='view-title'>{data.title}</h1>
            <img className="view-image" src={data.image_url} alt="data" />
            <p className='view-summary'>{data.summary}</p>
            {data.launches && <p className='view-launch-title'>{'Launches: ' + data.launches.length}</p>}
            {data.launches?.map(launch => <p className='view-launch-result'>{launch.id}</p>)}
            <h4 className='view-published-at'>Published at: {data.published_at.slice(0, 10)}</h4>
        </Link>
    )
}

export default View