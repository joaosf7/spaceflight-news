import { Link } from 'react-router-dom'

function ArticleView({article}){
    return(
        <Link className='link view' to={article.url}>
            <div>
                <h1 className='view-title'>{article.title}</h1>
                <img className="view-image" src={article.image_url} alt="article" />
                <p className='summary'>{article.summary}</p>
                {article.launches && <p className='launch-title'>{'Launches: ' + article.launches.length}</p>}
                {article.launches?.map(launch => <p className='launch-result'>{launch.id}</p>)}
                <h4 className='published-at'>Published at: {article.published_at.slice(0, 10)}</h4>
            </div>
        </Link>
    )
}

export default ArticleView