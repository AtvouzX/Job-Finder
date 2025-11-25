import { useState, useEffect } from 'react'
import { api, type Job } from '@/lib/api'
import { useSavedContext } from '@/contexts/SavedContext'
import { JobCard } from '@/components/cards'

export default function Jobs() {
  const { isSaved, toggleSaved } = useSavedContext()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await api.getJobs()
        setJobs(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load jobs')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Lowongan Kerja</h1>
        <div className="text-center">Loading...</div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Lowongan Kerja</h1>
        <div className="text-center text-red-500">{error}</div>
      </main>
    )
  }

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Lowongan Kerja</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={isSaved(job.id)}
            onToggleSave={toggleSaved}
          />
        ))}
      </div>
    </main>
  )
}
