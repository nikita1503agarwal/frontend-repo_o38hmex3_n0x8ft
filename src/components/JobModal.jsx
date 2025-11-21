import { useState } from 'react'

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <input {...props} className={`w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`} />
    </label>
  )
}

function TextArea({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <textarea {...props} className={`w-full rounded-lg border border-slate-300 px-3 py-2 text-sm h-28 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`} />
    </label>
  )
}

function JobModal({ job, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', linkedin: '', cover_letter: '' })
  const [cv, setCv] = useState(null)
  const [status, setStatus] = useState('')

  if (!job) return null

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    if (!cv) { setStatus('Please attach your CV'); return }
    try {
      setStatus('Submitting...')
      const fd = new FormData()
      fd.append('job_id', job.id)
      Object.entries(form).forEach(([k,v]) => fd.append(k, v))
      fd.append('cv', cv)
      const res = await fetch(`${baseUrl}/applications`, { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Failed to submit')
      setStatus('Thank you! We received your application.')
    } catch (err) {
      setStatus('Submission failed. Please try again later.')
    }
  }

  return (
    <div className="fixed inset-0 z-30 bg-slate-900/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{job.title}</h3>
            <p className="text-slate-600 text-sm">{job.company} • {job.city ? `${job.city}, ` : ''}{job.country}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800">✕</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="prose prose-slate max-w-none">
            <h4>About the role</h4>
            <p className="whitespace-pre-wrap text-slate-700 text-sm leading-6">{job.description}</p>
            {job.skills?.length > 0 && (
              <div className="mt-4">
                <h5 className="font-semibold">Key skills</h5>
                <ul className="list-disc pl-5 text-sm text-slate-700">
                  {job.skills.map((s,i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}
          </div>

          <form onSubmit={submit} className="space-y-3">
            <Input label="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <Input label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            <Input label="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            <Input label="LinkedIn URL" value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} />
            <TextArea label="Cover letter" value={form.cover_letter} onChange={e => setForm({ ...form, cover_letter: e.target.value })} />
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Attach CV (PDF)</span>
              <input type="file" accept=".pdf,.doc,.docx" onChange={e => setCv(e.target.files?.[0] || null)} />
            </label>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-2 font-medium">Send Application</button>
            {status && <p className="text-sm text-slate-600">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default JobModal
