import { useState } from 'react'

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <input {...props} className={`w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`} />
    </label>
  )
}

function TextArea({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <textarea {...props} className={`w-full rounded-lg border border-slate-300 px-3 py-2 text-sm h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`} />
    </label>
  )
}

function ChipInput({ value, onChange, placeholder }) {
  const [input, setInput] = useState('')

  const add = () => {
    const v = input.trim()
    if (!v) return
    onChange([...(value || []), v])
    setInput('')
  }

  const remove = (i) => {
    const arr = [...value]
    arr.splice(i, 1)
    onChange(arr)
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder={placeholder} className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        <button type="button" onClick={add} className="px-3 rounded-lg bg-slate-900 text-white text-sm">Add</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(value || []).map((s, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs border border-indigo-200">
            {s}
            <button type="button" onClick={() => remove(i)} className="text-indigo-700 hover:text-indigo-900">×</button>
          </span>
        ))}
      </div>
    </div>
  )
}

function PostVacancy() {
  const [form, setForm] = useState({
    title: '', company: '', country: 'Cyprus', city: '', employment_type: 'Full-time',
    salary_min: '', salary_max: '', description: '', language: 'en', contact_email: ''
  })
  const [skills, setSkills] = useState([])
  const [status, setStatus] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Submitting...')
    try {
      const payload = {
        ...form,
        salary_min: form.salary_min ? Number(form.salary_min) : null,
        salary_max: form.salary_max ? Number(form.salary_max) : null,
        skills
      }
      const res = await fetch(`${baseUrl}/jobs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error('Failed')
      setStatus('Vacancy posted successfully! It now appears in Open Roles.')
      setForm({ title: '', company: '', country: 'Cyprus', city: '', employment_type: 'Full-time', salary_min: '', salary_max: '', description: '', language: 'en', contact_email: '' })
      setSkills([])
    } catch (e) {
      setStatus('Could not post vacancy. Please check fields and try again.')
    }
  }

  return (
    <div className="p-6 bg-white rounded-xl border border-slate-200">
      <h2 className="text-xl font-semibold mb-4 text-slate-900">Post a Vacancy</h2>
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
        <Input label="Job title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <Input label="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Country</span>
          <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option>Cyprus</option>
            <option>Greece</option>
          </select>
        </label>
        <Input label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Employment type</span>
          <select value={form.employment_type} onChange={e => setForm({ ...form, employment_type: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </label>
        <Input label="Salary min (EUR)" type="number" value={form.salary_min} onChange={(e) => setForm({ ...form, salary_min: e.target.value })} />
        <Input label="Salary max (EUR)" type="number" value={form.salary_max} onChange={(e) => setForm({ ...form, salary_max: e.target.value })} />
        <Input label="Contact email" type="email" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} required />
        <label className="block md:col-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">Language</span>
          <select value={form.language} onChange={e => setForm({ ...form, language: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="en">English</option>
            <option value="el">Greek</option>
          </select>
        </label>
        <label className="block md:col-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">Description</span>
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm h-32" required />
        </label>
        <label className="block md:col-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">Skills</span>
          <ChipInput value={skills} onChange={setSkills} placeholder="Add a skill and press Add (e.g., SOC, SIEM, Pentest)" />
        </label>
        <div className="md:col-span-2">
          <button className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-4 py-2">Publish Vacancy</button>
        </div>
      </form>
      {status && <p className="mt-3 text-sm text-slate-700">{status}</p>}
    </div>
  )
}

export default PostVacancy
