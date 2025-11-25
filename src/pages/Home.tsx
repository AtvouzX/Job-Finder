import { Link } from 'react-router-dom'
import { jobs, companies } from '@/data/sampleJobs'
import { Hero } from '@/components/Hero'
import { JobCard } from '@/components/cards'
import { HomeCompanyCard } from '@/components/cards'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Featured Jobs Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Jobs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the latest opportunities from top companies. Start your career journey today.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {jobs.slice(0, 6).map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={false}
                onToggleSave={() => {}}
              />
            ))}
          </div>

          <div className="text-center">
            <Link to="/lowongan">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                View All Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Top Companies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join industry leaders and work with the best teams in Indonesia.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companies.slice(0, 3).map((company) => (
              <HomeCompanyCard
                key={company.id}
                company={company}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/perusahaan">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-2 hover:bg-muted transition-all duration-200">
                View All Companies
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
