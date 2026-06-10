import { useCallback, useEffect, useRef, useState } from 'react'
import PageContent from './PageContent.jsx'

// Pages: index 0 is the section cover, 1..N are articles.
// The flip folds the page around its horizontal centerline, Flipboard-style:
// forward lifts the bottom half up over the top; backward folds the top half down.
export default function FlipView({
  section,
  articles,
  startPage,
  bookmarks,
  onToggleBookmark,
  onClose,
}) {
  const pageCount = articles.length + 1
  const [index, setIndex] = useState(() => Math.min(Math.max(startPage, 0), pageCount - 1))
  const [flip, setFlip] = useState(null) // { dir: 1 | -1, to: number, go: boolean }
  const wheelLock = useRef(0)
  const touchY = useRef(null)

  const startFlip = useCallback(
    (dir) => {
      setFlip((cur) => {
        if (cur) return cur
        const to = index + dir
        if (to < 0 || to >= pageCount) return cur
        return { dir, to, go: false }
      })
    },
    [index, pageCount]
  )

  // Kick off the CSS transition one frame after the flipper mounts at 0deg.
  useEffect(() => {
    if (flip && !flip.go) {
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setFlip((f) => (f ? { ...f, go: true } : f)))
      )
      return () => cancelAnimationFrame(raf)
    }
  }, [flip])

  function finishFlip() {
    if (flip) {
      setIndex(flip.to)
      setFlip(null)
    }
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      else if (['ArrowDown', 'ArrowRight', ' ', 'PageDown'].includes(e.key)) {
        e.preventDefault()
        startFlip(1)
      } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        startFlip(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [startFlip, onClose])

  function onWheel(e) {
    const now = Date.now()
    if (now - wheelLock.current < 900 || Math.abs(e.deltaY) < 24) return
    wheelLock.current = now
    startFlip(e.deltaY > 0 ? 1 : -1)
  }

  function onTouchStart(e) {
    touchY.current = e.touches[0].clientY
  }
  function onTouchEnd(e) {
    if (touchY.current == null) return
    const dy = touchY.current - e.changedTouches[0].clientY
    touchY.current = null
    if (Math.abs(dy) > 50) startFlip(dy > 0 ? 1 : -1)
  }

  const current = index
  const target = flip ? flip.to : index
  const forward = flip?.dir === 1

  const pageProps = (i) => ({
    page: i,
    section,
    articles,
    pageCount,
    saved: i > 0 && bookmarks.has(articles[i - 1].id),
    onToggleBookmark,
  })

  return (
    <div
      className="flip-view"
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button className="flip-close" onClick={onClose} title="Back to browse (Esc)">
        ✕
      </button>

      <div className="flip-stage">
        <div className="page-frame">
          {!flip ? (
            <div className="page full">
              <PageContent {...pageProps(current)} interactive />
            </div>
          ) : (
            <>
              <div className="half top">
                <div className="page-inner">
                  <PageContent {...pageProps(forward ? current : target)} />
                </div>
              </div>
              <div className="half bottom">
                <div className="page-inner">
                  <PageContent {...pageProps(forward ? target : current)} />
                </div>
              </div>
              <div
                className={`flipper ${forward ? 'fwd' : 'bwd'} ${flip.go ? 'go' : ''}`}
                onTransitionEnd={(e) => {
                  if (e.propertyName === 'transform') finishFlip()
                }}
              >
                <div className="face front">
                  <div className="page-inner">
                    <PageContent {...pageProps(current)} />
                  </div>
                </div>
                <div className="face back">
                  <div className="page-inner">
                    <PageContent {...pageProps(target)} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flip-nav">
          <button onClick={() => startFlip(-1)} disabled={index === 0 || !!flip}>
            ↑
          </button>
          <span className="flip-counter">
            {index === 0 ? 'Cover' : `${index} / ${pageCount - 1}`}
          </span>
          <button onClick={() => startFlip(1)} disabled={index === pageCount - 1 || !!flip}>
            ↓
          </button>
        </div>
        <p className="flip-hint">Scroll, swipe, or use arrow keys to flip pages</p>
      </div>
    </div>
  )
}
