import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Briefcase } from 'lucide-react'
import type { Company } from '@/types'

interface HomeCompanyCardProps {
  company: Company
}

export function HomeCompanyCard({ company }: HomeCompanyCardProps) {
  const getLogoSrc = (company: Company) => {
    if (company.website) {
      const domain = new URL(company.website).hostname
      const apiKey = import.meta.env.VITE_LOGO_DEV_API_KEY
      return `https://img.logo.dev/${domain}?token=${apiKey}`
    }
    return 'https://via.placeholder.com/64x64?text=No+Logo'
  }

  return (
    <Link to={`/companies/${company.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex flex-col items-center gap-4 min-h-[120px]">
            <img
              src={getLogoSrc(company)}
              alt={`${company.name} logo`}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 text-center">
              <h3 className="font-semibold text-lg leading-tight line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
                {company.name}
              </h3>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            <span>{company.job_count || 0} jobs available</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}