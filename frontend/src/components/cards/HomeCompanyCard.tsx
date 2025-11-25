import { Link } from 'react-router-dom'
import { jobs } from '@/data/sampleJobs'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Briefcase } from 'lucide-react'
import type { Company } from '@/types'

interface HomeCompanyCardProps {
  company: Company
}

export function HomeCompanyCard({ company }: HomeCompanyCardProps) {
  const getJobCount = (companyId: string) => {
    return jobs.filter(job => job.companyId === companyId).length
  }

  return (
    <Link to={`/perusahaan/${company.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex flex-col  items-center gap-4">
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg leading-tight">{company.name}</h3>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            <span>{getJobCount(company.id)} jobs available</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}