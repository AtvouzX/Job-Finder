import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api, type Company, type Job } from '@/lib/api'

export default function CompanyDetail() {
  const { id } = useParams<{ id: string }>()
  const [company, setCompany] = useState<Company | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return

      try {
        const [companyData, jobsData] = await Promise.all([
          api.getCompany(id),
          api.getJobsByCompany(id)
        ])
        setCompany(companyData)
        setJobs(jobsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return <main className="p-4">Loading...</main>
  }

  if (error || !company) {
    return <main className="p-4">{error || 'Company not found.'}</main>
  }

  return (
    <main className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{company.name}</h1>
        <Link to="/perusahaan" className="text-sm text-gray-500">Back</Link>
      </div>
      <p className="text-sm text-gray-600 mt-2">{company.location}</p>
      <p className="mt-4">{company.description}</p>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Lowongan dari {company.name}</h2>
        <div className="mt-3 space-y-3">
          {jobs.map((j) => (
            <article key={j.id} className="border rounded p-3">
              <h3 className="font-semibold">{j.title}</h3>
              <p className="text-sm text-gray-600">{j.location}</p>
              <Link to={`/lowongan/${j.id}`} className="text-blue-600">Lihat</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
