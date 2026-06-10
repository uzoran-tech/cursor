import { timeAgo } from '../data.js'

export default function ArticleCard({ article, variant, saved, onToggleBookmark, onOpen }) {
  return (
    <article className={`card ${variant}`} onClick={onOpen}>
      <div className="card-media">
        <img
          src={article.image}
          alt=""
          loading="lazy"
          onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
        />
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className="card-source">{article.source}</span>
          <span className="card-dot">·</span>
          <span>{timeAgo(article.hoursAgo)}</span>
        </div>
        <h3 className="card-title">{article.title}</h3>
        {variant !== 'tile' && <p className="card-excerpt">{article.excerpt}</p>}
        <div className="card-foot">
          <span className="card-author">
            {article.author} · {article.minutes} min read
          </span>
          <button
            className={`flag-btn ${saved ? 'saved' : ''}`}
            title={saved ? 'Remove from Saved' : 'Flip into Saved'}
            onClick={(e) => {
              e.stopPropagation()
              onToggleBookmark(article.id)
            }}
          >
            ⚑
          </button>
        </div>
      </div>
    </article>
  )
}
