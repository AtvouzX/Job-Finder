import { Link } from 'react-router-dom'
import { jobs } from '@/data/sampleJobs'
import { useSavedContext } from '@/contexts/SavedContext'

export default function Saved() {
  const { saved, toggleSaved } = useSavedContext()
  const list = jobs.filter((j) => saved.includes(j.id))

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Saved</h1>
      {list.length === 0 ? (
        <p className="text-gray-600">You haven't saved any jobs yet.</p>
      ) : (
        <div className="space-y-3">
          {list.map((j) => (
            <article key={j.id} className="border rounded p-3 flex justify-between">
              <div>
                <h2 className="font-semibold">{j.title}</h2>
                <p className="text-sm text-gray-600">{j.companyName}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Link to={`/lowongan/${j.id}`} className="text-blue-600">Detail</Link>
                <button onClick={() => toggleSaved(j.id)} className="px-3 py-1 border rounded bg-white">Unsave</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
