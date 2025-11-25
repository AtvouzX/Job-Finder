import { Link } from 'react-router-dom'
import { jobs } from '@/data/sampleJobs'
import { useSavedContext } from '@/contexts/SavedContext'
import { Button } from '@/components/ui/button'
import { JobCard } from '@/components/cards'
import { Heart } from 'lucide-react'

export default function Saved() {
  const { saved, toggleSaved } = useSavedContext()
  const list = jobs.filter((j) => saved.includes(j.id))

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>
      {list.length === 0 ? (
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
          {list.map((job) => (
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
