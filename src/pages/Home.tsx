import { Link } from 'react-router-dom'
import { jobs } from '@/data/sampleJobs'

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-4">
      <section className="py-8">
        <h1 className="text-3xl font-bold mb-2">Selamat datang di JobFinder</h1>
        <p className="text-gray-600">Cari pekerjaan terbaik dari perusahaan top di Indonesia.</p>
      </section>

      <section className="py-6">
        <h2 className="text-xl font-semibold mb-3">Lowongan terbaru</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {jobs.slice(0, 3).map((job) => (
            <article key={job.id} className="border p-4 rounded">
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.companyName} • {job.location}</p>
              <Link to={`/lowongan/${job.id}`} className="mt-2 inline-block text-blue-600">
                Lihat
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
