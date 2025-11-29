import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Briefcase, Users, Search, Heart, Building2, Zap } from 'lucide-react'

export default function About() {
  return (
    <main className="max-w-6xl mx-auto p-4 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-primary/10 p-3 rounded-xl">
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About JobFinder
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your ultimate destination for discovering amazing career opportunities and connecting with top companies.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
                <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-lg">Smart Job Search</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Advanced filtering by location, employment type, salary range, and remote work options to find your perfect job match.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg">
                <Building2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-lg">Company Discovery</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Explore detailed company profiles, view their job openings, and learn about their culture and benefits.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">
                <Heart className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-lg">Save & Track</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Save your favorite jobs and companies for easy access. Never miss out on opportunities that interest you.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-lg">Community Driven</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Connect with like-minded professionals and discover opportunities shared by the community.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-lg">
                <Zap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-lg">Real-time Updates</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Get instant notifications about new job postings and company updates as they happen.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-teal-100 dark:bg-teal-900/20 p-2 rounded-lg">
                <Briefcase className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>
              <CardTitle className="text-lg">Career Growth</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Access resources and insights to help advance your career and achieve your professional goals.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mission Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            JobFinder is dedicated to bridging the gap between talented individuals and amazing companies.
            We believe that everyone deserves to find meaningful work that aligns with their skills, values, and aspirations.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">Innovation</Badge>
            <Badge variant="secondary">Connection</Badge>
            <Badge variant="secondary">Growth</Badge>
            <Badge variant="secondary">Opportunity</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-3 text-center">
        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary">1000+</div>
          <div className="text-muted-foreground">Active Job Listings</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary">500+</div>
          <div className="text-muted-foreground">Partner Companies</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary">10k+</div>
          <div className="text-muted-foreground">Happy Job Seekers</div>
        </div>
      </div>
    </main>
  )
}
