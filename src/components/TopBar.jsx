export default function TopBar({ sections, activeId, onSelect, savedCount }) {
  return (
    <header className="topbar">
      <button className="brand" onClick={() => onSelect('foryou')}>
        <span className="brand-mark">F</span>
        <span className="brand-name">Folio</span>
      </button>
      <nav className="topics">
        {sections.map((s) => (
          <button
            key={s.id}
            className={`topic ${s.id === activeId ? 'active' : ''}`}
            onClick={() => onSelect(s.id)}
          >
            {s.name}
          </button>
        ))}
        <button
          className={`topic saved ${activeId === 'saved' ? 'active' : ''}`}
          onClick={() => onSelect('saved')}
        >
          ⚑ Saved{savedCount > 0 ? ` (${savedCount})` : ''}
        </button>
      </nav>
    </header>
  )
}
