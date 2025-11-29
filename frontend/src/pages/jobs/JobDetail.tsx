import { useParams, useNavigate } from 'react-router-dom'
import { useSavedContext } from '@/contexts/SavedContext'
import { useJob } from '@/hooks/useQueries'
import type { Job } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { MapPin, Bookmark, ArrowLeft, AlertCircle } from 'lucide-react'
import { ContactEmail } from '@/components/ContactEmail'

export default function JobDetail() {
  const { id } = useParams<{ id: string }>()
  const { isSaved, toggleSaved } = useSavedContext()
  const { data: job, isLoading, error } = useJob(id!)
  const navigate = useNavigate()

  const getCompanyLogo = (job: Job) => {
    if (job?.companies?.website) {
      try {
        const domain = new URL(job.companies.website).hostname
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
      <main className="max-w-4xl mx-auto p-4">
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
      <main className="max-w-4xl mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error.message || 'Failed to load job details.'}
          </AlertDescription>
        </Alert>
      </main>
    )
  }

  if (!job) {
    return (
      <main className="max-w-4xl mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Job not found.
          </AlertDescription>
        </Alert>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
            <div className="flex items-center gap-3">
              <img
                src={getCompanyLogo(job)}
                alt={`${job.companies?.name} logo`}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <CardTitle className="text-2xl">{job.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <span>{job.companies?.name}</span>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {job.location}{job.is_remote ? ' (Remote)' : ''}
                  </Badge>
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
          {job.companies?.contact_email && (
                <ContactEmail email={job.companies.contact_email} />
              )}
              <Button
                onClick={() => toggleSaved(job.id)}
                variant={isSaved(job.id) ? "default" : "outline"}
                size="sm"
              >
                <Bookmark className={`h-4 w-4 mr-2 ${isSaved(job.id) ? 'fill-current' : ''}`} />
                {isSaved(job.id) ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <section>
            <h2 className="font-semibold text-lg mb-3">Job Description</h2>
            <p className="text-muted-foreground leading-relaxed">{job.description}</p>
          </section>
        </CardContent>
      </Card>
    </main>
  )
}
