import { companies } from '@/data/sampleJobs'
import { CompanyCard } from '@/components/cards'

export default function Companies() {
  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Perusahaan</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </main>
  )
}
