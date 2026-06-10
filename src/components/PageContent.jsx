import { timeAgo } from '../data.js'

export default function PageContent({
  page,
  section,
  articles,
  pageCount,
  saved,
  onToggleBookmark,
  interactive = false,
}) {
  if (page === 0) {
    const coverImg = articles[0]?.image
    return (
      <div className="pg cover">
        {coverImg && (
          <img
            className="cover-img"
            src={coverImg}
            alt=""
            onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
          />
        )}
        <div className="cover-scrim" />
        <div className="cover-text">
          <span className="cover-kicker">FOLIO MAGAZINE</span>
          <h1>{section.name}</h1>
          <p>{section.tagline}</p>
          <span className="cover-count">{articles.length} stories inside</span>
        </div>
      </div>
    )
  }

  const a = articles[page - 1]
  return (
    <div className="pg article">
      <div className="pg-media">
        <img
          src={a.image}
          alt=""
          onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
        />
      </div>
      <div className="pg-body">
        <div className="pg-meta">
          <span className="pg-source">{a.source}</span>
          <span>
            {a.author} · {timeAgo(a.hoursAgo)} · {a.minutes} min read
          </span>
          <button
            className={`flag-btn ${saved ? 'saved' : ''}`}
            disabled={!interactive}
            title={saved ? 'Remove from Saved' : 'Flip into Saved'}
            onClick={() => onToggleBookmark(a.id)}
          >
            ⚑
          </button>
        </div>
        <h2 className="pg-title">{a.title}</h2>
        <p className="pg-excerpt">{a.excerpt}</p>
        {a.body.map((para, i) => (
          <p className="pg-para" key={i}>
            {para}
          </p>
        ))}
        <div className="pg-foot">
          <span>{section.name}</span>
          <span>
            {page} / {pageCount - 1}
          </span>
        </div>
      </div>
    </div>
  )
}
