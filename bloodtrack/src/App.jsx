import { useEffect, useState } from 'react'
import { loadReports, saveReports } from './store.js'
import { demoReports } from './demo.js'
import Dashboard from './components/Dashboard.jsx'
import Trends from './components/Trends.jsx'
import Reports from './components/Reports.jsx'
import AddData from './components/AddData.jsx'
import MarkerDetail from './components/MarkerDetail.jsx'

const TABS = [
  { id: 'dashboard', label: 'Overview', icon: '◉' },
  { id: 'trends', label: 'Trends', icon: '∿' },
  { id: 'reports', label: 'Reports', icon: '☰' },
  { id: 'add', label: 'Add', icon: '+' },
]

export default function App() {
  const [reports, setReports] = useState(loadReports)
  const [tab, setTab] = useState('dashboard')
  const [detailId, setDetailId] = useState(null)

  useEffect(() => {
    saveReports(reports)
  }, [reports])

  const empty = reports.length === 0

  return (
    <div className="app">
      <header className="header">
        <span className="logo">🩸</span>
        <h1>BloodTrack</h1>
        {!empty && <span className="header-count">{reports.length} reports</span>}
      </header>

      <main className="main">
        {empty ? (
          <div className="welcome">
            <div className="welcome-icon">🩸</div>
            <h2>Track your bloodwork over time</h2>
            <p>
              Add lab reports and BloodTrack charts every marker against its reference range,
              spots trends, and surfaces what changed.
            </p>
            <button className="btn primary" onClick={() => setTab('add')}>
              Add your first report
            </button>
            <button className="btn ghost" onClick={() => setReports(demoReports())}>
              Explore with 5 years of demo data
            </button>
            <p className="disclaimer">
              Data stays on this device. BloodTrack describes your numbers — it is not medical advice.
            </p>
          </div>
        ) : (
          <>
            {tab === 'dashboard' && <Dashboard reports={reports} onOpenMarker={setDetailId} />}
            {tab === 'trends' && <Trends reports={reports} onOpenMarker={setDetailId} />}
            {tab === 'reports' && <Reports reports={reports} setReports={setReports} />}
          </>
        )}
        {tab === 'add' && <AddData reports={reports} setReports={setReports} done={() => setTab('dashboard')} />}
      </main>

      {detailId && <MarkerDetail markerId={detailId} reports={reports} onClose={() => setDetailId(null)} />}

      <nav className="tabbar">
        {TABS.map((t) => (
          <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            <span className="tab-icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
