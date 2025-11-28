import { useJobs } from '@/hooks/useQueries'
import { useSavedContext } from '@/contexts/SavedContext'
import { JobCard } from '@/components/cards'
import { JobFilters } from '@/components/JobFilters'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'

export default function Jobs() {
  const { isSaved, toggleSaved } = useSavedContext()
  const location = useLocation()
  const filters = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const q = params.get('q') || undefined
    const loc = params.get('location') || undefined
    const is_remote = params.get('is_remote') === 'true' ? true : params.get('is_remote') === 'false' ? false : undefined
    const salary_min = params.get('salary_min') ? parseInt(params.get('salary_min')!) : undefined
    const salary_max = params.get('salary_max') ? parseInt(params.get('salary_max')!) : undefined

    if (q || loc || is_remote !== undefined || salary_min || salary_max) {
      return { q, location: loc, is_remote, salary_min, salary_max }
    }
    return undefined
  }, [location.search])

  const { data: jobs = [], isLoading, error } = useJobs(filters)

  if (isLoading) {
    return (
      <main className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Jobs</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Jobs</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error.message || 'Failed to load jobs.'}
          </AlertDescription>
        </Alert>
      </main>
    )
  }

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Jobs</h1>

      {/* Search and Filters */}
      <div className="mb-8">
        <JobFilters />
      </div>

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
