import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api, type Job } from '@/lib/api'
import { useSavedContext } from '@/contexts/SavedContext'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { MapPin, Bookmark, ArrowLeft, AlertCircle } from 'lucide-react'

export default function JobDetail() {
  const { id } = useParams<{ id: string }>()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isSaved, toggleSaved } = useSavedContext()

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return

      try {
        const jobData = await api.getJob(id)
        setJob(jobData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load job')
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [id])

  if (loading) {
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

  if (error || !job) {
    return (
      <main className="max-w-4xl mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || 'Job not found.'}
          </AlertDescription>
        </Alert>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{job.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <span>{job.companies?.name}</span>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </Badge>
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => toggleSaved(job.id)}
                variant={isSaved(job.id) ? "default" : "outline"}
                size="sm"
              >
                <Bookmark className={`h-4 w-4 mr-2 ${isSaved(job.id) ? 'fill-current' : ''}`} />
                {isSaved(job.id) ? 'Saved' : 'Save'}
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/lowongan">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
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
