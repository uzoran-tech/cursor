import ArticleCard from './ArticleCard.jsx'

export default function GridView({
  section,
  articles,
  bookmarks,
  onToggleBookmark,
  onOpenArticle,
  onStartReading,
}) {
  if (articles.length === 0) {
    return (
      <main className="grid-view">
        <div className="empty">
          <div className="empty-mark">⚑</div>
          <h2>Nothing saved yet</h2>
          <p>Tap the flag on any story to flip it into your collection.</p>
        </div>
      </main>
    )
  }

  const [lead, ...rest] = articles

  return (
    <main className="grid-view">
      <div className="section-head">
        <div>
          <h1>{section.name}</h1>
          <p className="tagline">{section.tagline}</p>
        </div>
        <button className="read-btn" onClick={onStartReading}>
          Read as magazine →
        </button>
      </div>
      <div className="mosaic">
        <ArticleCard
          article={lead}
          variant="hero"
          saved={bookmarks.has(lead.id)}
          onToggleBookmark={onToggleBookmark}
          onOpen={() => onOpenArticle(0)}
        />
        {rest.map((a, i) => (
          <ArticleCard
            key={a.id}
            article={a}
            variant={i % 5 === 0 ? 'wide' : 'tile'}
            saved={bookmarks.has(a.id)}
            onToggleBookmark={onToggleBookmark}
            onOpen={() => onOpenArticle(i + 1)}
          />
        ))}
      </div>
    </main>
  )
}
