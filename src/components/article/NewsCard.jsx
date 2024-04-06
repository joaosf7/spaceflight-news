import './NewsCard.css'

function NewsCard(props){
    return(
        <div id="news-card" onClick={() => props.toogleSelectedArticle(props.article.id)}>
            <img id="news-card-image" src={props.article.image_url} alt="news image"/>
            <div className='card-info'>
                <h5 className='news-card-title'>{props.article.title}</h5>
                <p className='news-card-release'>{props.article.published_at.slice(0,10)}</p>
            </div>
        </div>
    )
}

export default NewsCard