import { jobs } from '@/data/sampleJobs'
import { useSavedContext } from '@/contexts/SavedContext'
import { JobCard } from '@/components/cards'

export default function Jobs() {
  const { isSaved, toggleSaved } = useSavedContext()

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
