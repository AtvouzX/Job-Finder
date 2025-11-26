import { useCompanies } from '@/hooks/useQueries'
import { CompanyCard } from '@/components/cards'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export default function Companies() {
  const { data: companies = [], isLoading, error } = useCompanies()

  if (isLoading) {
    return (
      <main className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Companies</h1>
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
        <h1 className="text-2xl font-bold mb-6">Companies</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error.message || 'Failed to load companies.'}
          </AlertDescription>
        </Alert>
      </main>
    )
  }

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Companies</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </main>
  )
}
