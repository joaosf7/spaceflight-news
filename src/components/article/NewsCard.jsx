import './NewsCard.css'

function NewsCard(props){
    return(
        <div id="news-card" onClick={() => props.toogleSelectedArticle(props.article.id)}>
            <h5 className='news-card-title'>{props.article.title}</h5>
            <img id="news-card-image" src={props.article.image_url} alt="news image"/>
            <p className='news-card-release'>{props.article.published_at.slice(0,10)}</p>
        </div>
    )
}

export default NewsCard