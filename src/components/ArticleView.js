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
                <h1>{article.title}</h1>
                <img className="article-view-image" src={article.image_url} alt="article" />
                <p>{article.summary}</p>
                <h4>Published at: {article.published_at.slice(0, 10)}</h4>
            </div>
        </a>
    )
}

export default ArticleView