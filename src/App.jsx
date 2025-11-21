import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import JobCard from './components/JobCard'
import JobModal from './components/JobModal'
import PostVacancy from './components/PostVacancy'

function App() {
  const [tab, setTab] = useState('jobs')
  const [jobs, setJobs] = useState([])
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState('All')
  const [selected, setSelected] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    const p = new URLSearchParams()
    if (country !== 'All') p.append('country', country)
    if (query) p.append('q', query)
    const res = await fetch(`${baseUrl}/jobs?${p.toString()}`)
    const data = await res.json()
    setJobs(data.items || [])
  }

  useEffect(() => { load() }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar current={tab} onChange={setTab} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {tab === 'jobs' && (
          <>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by title, company, skill..." className="flex-1 sm:w-80 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                <select value={country} onChange={e => setCountry(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                  <option>All</option>
                  <option>Cyprus</option>
                  <option>Greece</option>
                </select>
                <button onClick={load} className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm">Search</button>
              </div>
              <p className="text-slate-600 text-sm">{jobs.length} roles</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {jobs.map(j => <JobCard key={j.id} job={j} onOpen={setSelected} />)}
              {jobs.length === 0 && (
                <div className="col-span-full text-center text-slate-600 bg-white border border-slate-200 rounded-xl p-8">
                  No roles yet. Post your first vacancy to see it here.
                </div>
              )}
            </div>
          </>
        )}

        {tab === 'post' && (
          <PostVacancy />
        )}
      </main>

      {selected && <JobModal job={selected} onClose={() => setSelected(null)} />}

      <footer className="py-10 text-center text-slate-500 text-sm">
        Made for the Cyprus & Greece cybersecurity community. Submit roles, apply with your CV.
      </footer>
    </div>
  )
}

export default App
