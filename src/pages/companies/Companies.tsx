import { Link } from 'react-router-dom'
import { companies } from '@/data/sampleJobs'

export default function Companies() {
  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Perusahaan</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {companies.map((c) => (
          <article key={c.id} className="border p-4 rounded">
            <h2 className="font-semibold">{c.name}</h2>
            <p className="text-sm text-gray-600">{c.location}</p>
            <Link to={`/perusahaan/${c.id}`} className="mt-2 inline-block text-blue-600">Lihat</Link>
          </article>
        ))}
      </div>
    </main>
  )
}
