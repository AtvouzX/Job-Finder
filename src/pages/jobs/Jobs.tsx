import { Link } from 'react-router-dom'
import { jobs, companies } from '@/data/sampleJobs'
import { useSavedContext } from '@/contexts/SavedContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Heart, MapPin, Clock, DollarSign, Briefcase } from 'lucide-react'

export default function Jobs() {
  const { isSaved, toggleSaved } = useSavedContext()

  const getCompanyLogo = (companyId: string) => {
    const company = companies.find(c => c.id === companyId)
    return company?.logo || 'https://via.placeholder.com/64x64?text=?'
  }

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Lowongan Kerja</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={getCompanyLogo(job.companyId)}
                    alt={`${job.companyName} logo`}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-lg leading-tight">{job.title}</h2>
                    <p className="text-sm text-muted-foreground">{job.companyName}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleSaved(job.id)}
                  className="shrink-0"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isSaved(job.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-muted-foreground hover:text-red-500'
                    }`}
                  />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{job.location}{job.isRemote && ' (Remote)'}</span>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium">
                <DollarSign className="h-4 w-4" />
                <span>{job.salary}</span>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {job.description}
              </p>

              {job.benefits && job.benefits.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {job.benefits.slice(0, 3).map((benefit, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                    >
                      <Briefcase className="h-3 w-3" />
                      {benefit}
                    </span>
                  ))}
                  {job.benefits.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{job.benefits.length - 3} more
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Posted {job.postedDate}</span>
                </div>
                <Link to={`/lowongan/${job.id}`}>
                  <Button size="sm">View Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
