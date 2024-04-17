import './Card.css'

function Card({data, toggleSelected}){
    return(
        <div className="card" onClick={() => toggleSelected(data.id)}>
            <img className="card-image" src={data.image_url} alt="report"/>
            <div className='card-info'>
                <h5 className='card-title'>{data.title}</h5>
                <p className='card-summary'>{data.summary}</p>
                <p className='card-release'>{data.published_at.slice(0,10)}</p>
            </div>
        </div>
    )
}

export default Card