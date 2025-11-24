import { useParams, Link } from 'react-router-dom'
import { companies, jobs } from '@/data/sampleJobs'

export default function CompanyDetail() {
  const { id } = useParams<{ id: string }>()
  const company = companies.find((c) => c.id === id)

  if (!company) return <main className="p-4">Company not found.</main>

  const list = jobs.filter((j) => j.companyId === id)

  return (
    <main className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{company.name}</h1>
        <Link to="/perusahaan" className="text-sm text-gray-500">Back</Link>
      </div>
      <p className="text-sm text-gray-600 mt-2">{company.location}</p>
      <p className="mt-4">{company.description}</p>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Lowongan dari {company.name}</h2>
        <div className="mt-3 space-y-3">
          {list.map((j) => (
            <article key={j.id} className="border rounded p-3">
              <h3 className="font-semibold">{j.title}</h3>
              <p className="text-sm text-gray-600">{j.location}</p>
              <Link to={`/lowongan/${j.id}`} className="text-blue-600">Lihat</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
