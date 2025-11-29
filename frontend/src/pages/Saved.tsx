import { Link } from 'react-router-dom'
import { useSavedContext } from '@/contexts/SavedContext'
import type { Job } from '@/lib/api'
import { useJobs } from '@/hooks/useQueries'
import { Button } from '@/components/ui/button'
import { JobCard } from '@/components/cards'
import { Bookmark } from 'lucide-react'

export default function Saved() {
  const { saved, toggleSaved, isLoading: savedLoading } = useSavedContext()
  const { data: jobs = [], isLoading: jobsLoading, error } = useJobs()

  const list: Job[] = (jobs || []).filter((j: Job) => saved.includes(j.id))

  const isLoading = savedLoading || jobsLoading

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>
      {isLoading ? (
        <div className="text-center py-12">Loading…</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{(error as Error).message || 'Failed to load jobs'}</div>
      ) : list.length === 0 ? (
        <div className="text-center py-12">
          <Bookmark className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">You haven't saved any jobs yet.</p>
          <p className="text-sm text-muted-foreground mt-2">Browse jobs and save the ones you're interested in.</p>
          <Link to="/jobs" className="mt-4 inline-block">
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
