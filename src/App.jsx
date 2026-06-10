import { useEffect, useMemo, useState } from 'react'
import { SECTIONS, articlesFor } from './data.js'
import TopBar from './components/TopBar.jsx'
import GridView from './components/GridView.jsx'
import FlipView from './components/FlipView.jsx'

const BOOKMARKS_KEY = 'folio.bookmarks'

export default function App() {
  const [sectionId, setSectionId] = useState('foryou')
  const [mode, setMode] = useState('browse') // 'browse' | 'flip'
  const [flipStart, setFlipStart] = useState(0)
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]'))
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([...bookmarks]))
  }, [bookmarks])

  const section = useMemo(
    () =>
      sectionId === 'saved'
        ? { id: 'saved', name: 'Saved', tagline: 'Stories you flipped' }
        : SECTIONS.find((s) => s.id === sectionId),
    [sectionId]
  )

  const articles = useMemo(() => {
    if (sectionId === 'saved') {
      return SECTIONS.flatMap((s) => (s.id === 'foryou' ? [] : articlesFor(s.id))).filter((a) =>
        bookmarks.has(a.id)
      )
    }
    return articlesFor(sectionId)
  }, [sectionId, bookmarks])

  function toggleBookmark(id) {
    setBookmarks((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function openFlip(articleIndex = 0) {
    // Page 0 is the section cover, so article i lives on page i + 1.
    setFlipStart(articleIndex + 1)
    setMode('flip')
  }

  function selectSection(id) {
    setSectionId(id)
    setMode('browse')
  }

  return (
    <div className="app">
      <TopBar
        sections={SECTIONS}
        activeId={sectionId}
        onSelect={selectSection}
        savedCount={bookmarks.size}
      />
      {mode === 'browse' ? (
        <GridView
          section={section}
          articles={articles}
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
          onOpenArticle={openFlip}
          onStartReading={() => openFlip(-1)}
        />
      ) : (
        <FlipView
          section={section}
          articles={articles}
          startPage={flipStart}
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
          onClose={() => setMode('browse')}
        />
      )}
    </div>
  )
}
