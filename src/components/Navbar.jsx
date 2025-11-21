import { useState } from 'react'

function Navbar({ current, onChange }) {
  const tabs = [
    { id: 'jobs', label: 'Open Roles' },
    { id: 'post', label: 'Post a Vacancy' },
  ]

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-white font-bold shadow">
            CS
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">CyberSec Jobs</p>
            <p className="text-xs text-slate-500 -mt-1">Cyprus • Greece</p>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${current === t.id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
