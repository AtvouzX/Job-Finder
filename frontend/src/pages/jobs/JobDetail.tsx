import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api, type Job } from '@/lib/api'
import { useSavedContext } from '@/contexts/SavedContext'
import { Button } from '@/components/ui/button'

export default function JobDetail() {
  const { id } = useParams<{ id: string }>()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isSaved, toggleSaved } = useSavedContext()

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return

      try {
        const jobData = await api.getJob(id)
        setJob(jobData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load job')
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [id])

  if (loading) {
    return <main className="p-4">Loading...</main>
  }

  if (error || !job) {
    return <main className="p-4">{error || 'Job not found.'}</main>
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => toggleSaved(job.id)}
            className={`px-3 py-1 rounded border ${isSaved(job.id) ? 'bg-blue-50 border-blue-500 text-blue-700' : ''}`}
          >
            {isSaved(job.id) ? 'Saved' : 'Save'}
          </Button>
          <Link to="/lowongan" className="text-sm text-gray-500">Back</Link>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-2">{job.companies?.name} • {job.location}</p>
      <section className="mt-4">
        <h2 className="font-semibold">Deskripsi</h2>
        <p className="mt-2 text-gray-700">{job.description}</p>
      </section>
    </main>
  )
}
