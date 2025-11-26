import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api, type Company, type Job } from '@/lib/api'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { MapPin, ArrowLeft, AlertCircle, Building } from 'lucide-react'

export default function CompanyDetail() {
  const { id } = useParams<{ id: string }>()
  const [company, setCompany] = useState<Company | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return

      try {
        const [companyData, jobsData] = await Promise.all([
          api.getCompany(id),
          api.getJobsByCompany(id)
        ])
        setCompany(companyData)
        setJobs(jobsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
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

  if (error || !company) {
    return (
      <main className="max-w-6xl mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || 'Company not found.'}
          </AlertDescription>
        </Alert>
      </main>
    )
  }

  return (
    <main className="max-w-6xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Building className="h-6 w-6" />
                {company.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {company.location}
                </Badge>
              </CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/perusahaan">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-6">{company.description}</p>

          <Separator className="my-6" />

          <section>
            <h2 className="text-lg font-semibold mb-4">Available Positions at {company.name}</h2>
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </Badge>
                        </div>
                      </div>
                      <Button asChild size="sm">
                        <Link to={`/lowongan/${job.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
