import { useParams, useNavigate } from 'react-router-dom'
import { useCompany, useJobsByCompany } from '@/hooks/useQueries'
import { type Job, type Company } from '@/lib/api'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { JobCard } from '@/components/cards/JobCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { MapPin, ArrowLeft, AlertCircle } from 'lucide-react'
import { ContactEmail } from '@/components/ContactEmail'

export default function CompanyDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: company, isLoading: companyLoading, error: companyError } = useCompany(id!)
  const { data: jobs = [], isLoading: jobsLoading, error: jobsError } = useJobsByCompany(id!)
  const navigate = useNavigate()

  const isLoading = companyLoading || jobsLoading
  const error = companyError || jobsError

  const getCompanyLogo = (company: Company | null) => {
    if (company?.website) {
      try {
        const domain = new URL(company.website).hostname
        const apiKey = import.meta.env.VITE_LOGO_DEV_API_KEY
        return `https://img.logo.dev/${domain}?token=${apiKey}`
      } catch {
        return 'https://via.placeholder.com/64x64?text=No+Logo'
      }
    }
    return 'https://via.placeholder.com/64x64?text=No+Logo'
  }

  if (isLoading) {
    return (
      <main className="max-w-6xl mx-auto p-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </main>
    )
  }

  if (error) {
    return (
      <main className="max-w-6xl mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error.message || 'Failed to load company details.'}
          </AlertDescription>
        </Alert>
      </main>
    )
  }

  if (!company) {
    return (
      <main className="max-w-6xl mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Company not found.
          </AlertDescription>
        </Alert>
      </main>
    )
  }

  return (
    <main className="max-w-6xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
            <div className='flex items-center gap-3'>
              <img
                src={getCompanyLogo(company)}
                alt={`${company.name} logo`}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <CardTitle className="text-2xl flex items-center gap-3">
                  {company.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {company.location}
                  </Badge>
                </CardDescription></div>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              {company.contact_email && (
                <ContactEmail email={company.contact_email} />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-6">{company.description}</p>

          <Separator className="my-6" />

          <section>
            <h2 className="text-lg font-semibold mb-4">Available Positions at {company.name}</h2>
            <div className="space-y-4">
              {jobs.map((job: Job) => {
                const jobWithCompany: Job = job.companies && job.companies.website
                  ? job
                  : { ...job, companies: { name: company?.name || '', website: company?.website } }

                return (
                  <JobCard
                    key={job.id}
                    job={jobWithCompany}
                    isSaved={false}
                    onToggleSave={() => {}}
                    showLogo={false}
                  />
                )
              })}
            </div>
            {jobs.length === 0 && (
              <p className="text-muted-foreground text-center py-8">
                No open positions available at this company.
              </p>
            )}
          </section>
        </CardContent>
      </Card>
    </main>
  )
}
