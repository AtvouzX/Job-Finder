import { Link } from 'react-router-dom'
import { jobs } from '@/data/sampleJobs'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, MessageSquare, Briefcase, MapPin } from 'lucide-react'
import type { Company } from '@/types'

interface CompanyCardProps {
  company: Company
}

export function CompanyCard({ company }: CompanyCardProps) {
  const getJobCount = (companyId: string) => {
    return jobs.filter(job => job.companyId === companyId).length
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : i < rating
            ? 'fill-yellow-400/50 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-4">
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h2 className="font-semibold text-lg leading-tight">{company.name}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              <span>{company.location}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {renderStars(company.rating || 0)}
          </div>
          <span className="text-sm font-medium">{company.rating?.toFixed(1)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MessageSquare className="h-4 w-4" />
          <span>{company.reviewCount} reviews</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Briefcase className="h-4 w-4" />
          <span>{getJobCount(company.id)} jobs available</span>
        </div>

        <div className="pt-2">
          <Link to={`/perusahaan/${company.id}`}>
            <Button className="w-full" size="sm">
              View Company
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}