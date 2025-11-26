import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, MessageSquare, Briefcase, MapPin } from 'lucide-react'
import type { Company } from '@/types'

interface CompanyCardProps {
  company: Company
}

export function CompanyCard({ company }: CompanyCardProps) {
  const getLogoSrc = (company: Company) => {
    if (company.website) {
      const domain = new URL(company.website).hostname
      const apiKey = import.meta.env.VITE_LOGO_DEV_API_KEY
      return `https://img.logo.dev/${domain}?token=${apiKey}`
    }
    return 'https://via.placeholder.com/64x64?text=No+Logo'
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const isFull = i < Math.floor(rating);
      const isPartial = i === Math.floor(rating) && rating % 1 !== 0;
      const partialWidth = (rating % 1) * 100;

      return (
        <div key={i} className="relative">
          <Star className="h-4 w-4 text-accent" />
          {isFull && (
            <Star className="absolute top-0 left-0 h-4 w-4 fill-primary text-primary" />
          )}
          {isPartial && (
            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${partialWidth}%` }}>
              <Star className="h-4 w-4 fill-primary text-primary" />
            </div>
          )}
        </div>
      );
    });
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-4">
          <img
            src={getLogoSrc(company)}
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
          <span>{company.review_count} reviews</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Briefcase className="h-4 w-4" />
          <span>Jobs available</span>
        </div>

        <div className="pt-2">
          <Link to={`/companies/${company.id}`}>
            <Button className="w-full" size="sm">
              View Company
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}