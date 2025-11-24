import { Link } from 'react-router-dom'
import { jobs } from '@/data/sampleJobs'
import { useSavedContext } from '@/contexts/SavedContext'

export default function Jobs() {
  const { saved, isSaved, toggleSaved } = useSavedContext()

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lowongan Kerja</h1>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="border rounded p-4 flex justify-between items-start">
            <div>
              <h2 className="font-semibold text-lg">{job.title}</h2>
              <p className="text-sm text-gray-600">{job.companyName} • {job.location}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Link to={`/lowongan/${job.id}`} className="text-blue-600">Detail</Link>
              <button
                className={`px-3 py-1 rounded border ${isSaved(job.id) ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white'}`}
                onClick={() => toggleSaved(job.id)}
              >
                {isSaved(job.id) ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
