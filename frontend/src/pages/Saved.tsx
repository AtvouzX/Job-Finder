import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import type { Job } from '@/types'
import { useSavedContext } from '@/contexts/SavedContext'
import { Button } from '@/components/ui/button'
import { JobCard } from '@/components/cards'
import { Heart } from 'lucide-react'

export default function Saved() {
  const { saved, toggleSaved } = useSavedContext()
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

  const list: Job[] = jobs.filter((j: Job) => saved.includes(j.id))

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>
      {loading ? (
        <div className="text-center py-12">Loading…</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : list.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">You haven't saved any jobs yet.</p>
          <p className="text-sm text-muted-foreground mt-2">Browse jobs and save the ones you're interested in.</p>
          <Link to="/lowongan" className="mt-4 inline-block">
            <Button>Browse Jobs</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((job: Job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={true}
              onToggleSave={toggleSaved}
              showFilledBookmark={true}
            />
          ))}
        </div>
      )}
    </main>
  )
}
