function Badge({ children }) {
  return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">{children}</span>
}

function JobCard({ job, onOpen }) {
  return (
    <div className="p-5 rounded-xl border border-slate-200 bg-white hover:shadow-md transition cursor-pointer" onClick={() => onOpen(job)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
          <p className="text-slate-600 text-sm">{job.company} • {job.city ? `${job.city}, ` : ''}{job.country}</p>
        </div>
        {job.salary_min && job.salary_max && (
          <div className="text-right">
            <p className="text-slate-900 font-semibold">€{job.salary_min.toLocaleString()} - €{job.salary_max.toLocaleString()}</p>
            <p className="text-slate-500 text-xs">gross/year</p>
          </div>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {job.skills?.slice(0,5).map((s, i) => <Badge key={i}>{s}</Badge>)}
        <Badge>{job.employment_type}</Badge>
        <Badge>{job.language === 'el' ? 'GR/EL' : 'EN'}</Badge>
      </div>
    </div>
  )
}

export default JobCard
