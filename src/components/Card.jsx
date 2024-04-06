import './Card.css'

function Card(props){
    return(
        <div className="card" onClick={() => props.toogleSelected(props.data.id)}>
            <img className="card-image" src={props.data.image_url} alt="report"/>
            <div className='card-info'>
                <h5 className='card-title'>{props.data.title}</h5>
                <p className='card-summary'>{props.data.summary}</p>
                <p className='card-release'>{props.data.published_at.slice(0,10)}</p>
            </div>
        </div>
    )
}

export default Card