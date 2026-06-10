import { useRef, useState } from 'react'
import { MARKERS } from '../catalog.js'
import { mergeReport, parseCSV } from '../store.js'

export default function AddData({ reports, setReports, done }) {
  const [mode, setMode] = useState('form')
  const [date, setDate] = useState('')
  const [lab, setLab] = useState('')
  const [rows, setRows] = useState([{ markerId: '', value: '' }])
  const [csvText, setCsvText] = useState('')
  const [feedback, setFeedback] = useState(null)
  const fileRef = useRef(null)

  function setRow(i, patch) {
    setRows(rows.map((r, j) => (j === i ? { ...r, ...patch } : r)))
  }

  function saveForm() {
    if (!date) return setFeedback({ tone: 'warn', text: 'Pick the test date first.' })
    const values = {}
    for (const r of rows) {
      const v = parseFloat(String(r.value).replace(',', '.'))
      if (r.markerId && isFinite(v)) values[r.markerId] = v
    }
    if (Object.keys(values).length === 0)
      return setFeedback({ tone: 'warn', text: 'Add at least one marker value.' })
    setReports(mergeReport(reports, { date, lab, notes: '', values }))
    setFeedback({ tone: 'good', text: `Saved report for ${date}.` })
    setRows([{ markerId: '', value: '' }])
    setTimeout(done, 600)
  }

  function importText(text) {
    const { reports: parsed, imported, errors } = parseCSV(text)
    if (imported === 0) {
      return setFeedback({ tone: 'warn', text: `Nothing imported. ${errors[0] || 'Expected rows like: 2024-06-10,tsh,1.71'}` })
    }
    let next = reports
    for (const r of parsed) next = mergeReport(next, r)
    setReports(next)
    setFeedback({
      tone: 'good',
      text: `Imported ${imported} values across ${parsed.length} dates.${errors.length ? ` Skipped ${errors.length} rows.` : ''}`,
    })
    setCsvText('')
    setTimeout(done, 900)
  }

  function onFile(e) {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => importText(String(reader.result))
    reader.readAsText(f)
    e.target.value = ''
  }

  return (
    <div className="add-data">
      <div className="seg">
        <button className={mode === 'form' ? 'active' : ''} onClick={() => setMode('form')}>
          Enter manually
        </button>
        <button className={mode === 'csv' ? 'active' : ''} onClick={() => setMode('csv')}>
          Import CSV
        </button>
      </div>

      {feedback && <p className={`feedback ${feedback.tone}`}>{feedback.text}</p>}

      {mode === 'form' ? (
        <div className="form">
          <label>
            Test date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label>
            Lab (optional)
            <input type="text" placeholder="e.g. Medlab Novi Sad" value={lab} onChange={(e) => setLab(e.target.value)} />
          </label>
          {rows.map((r, i) => (
            <div className="value-row" key={i}>
              <select value={r.markerId} onChange={(e) => setRow(i, { markerId: e.target.value })}>
                <option value="">Choose marker…</option>
                {MARKERS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.unit})
                  </option>
                ))}
              </select>
              <input
                type="text"
                inputMode="decimal"
                placeholder="Value"
                value={r.value}
                onChange={(e) => setRow(i, { value: e.target.value })}
              />
            </div>
          ))}
          <button className="btn ghost small" onClick={() => setRows([...rows, { markerId: '', value: '' }])}>
            + Add another marker
          </button>
          <button className="btn primary" onClick={saveForm}>
            Save report
          </button>
        </div>
      ) : (
        <div className="form">
          <p className="muted">
            One row per value: <code>date,marker,value</code> — e.g.{' '}
            <code>2024-06-10,tsh,1.71</code>. Dates can be <code>2024-06-10</code> or{' '}
            <code>10.06.2024</code>; marker names in English or Serbian work.
          </p>
          <textarea
            rows={8}
            placeholder={'date,marker,value\n2021-03-15,vitd,32\n2021-03-15,tsh,2.8'}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
          />
          <div className="report-actions">
            <button className="btn primary" onClick={() => importText(csvText)}>
              Import pasted text
            </button>
            <button className="btn ghost" onClick={() => fileRef.current?.click()}>
              Choose .csv file
            </button>
            <input ref={fileRef} type="file" accept=".csv,.txt" hidden onChange={onFile} />
          </div>
        </div>
      )}
    </div>
  )
}
