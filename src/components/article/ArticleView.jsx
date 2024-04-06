import './ArticleView.css'

function ArticleView({article}){
    return(
        <a
            id="article-view"
            href={article.url}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            <div>
                <h1 className='article-title'>{article.title}</h1>
                <img className="article-view-image" src={article.image_url} alt="article" />
                <p className='summary'>{article.summary}</p>
                {article.launches && <p>{'Launches: ' + article.launches.length}</p>}
                {article.launches?.map(launch => <p>{launch.id}</p>)}
                <h4>Published at: {article.published_at.slice(0, 10)}</h4>
            </div>
        </a>
    )
}

export default ArticleView