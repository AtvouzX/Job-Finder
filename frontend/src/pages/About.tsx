import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Briefcase, Search, Building2, Zap, Bookmark, Proportions } from 'lucide-react'

export default function About() {
  return (
    <main className="max-w-6xl mx-auto p-4 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <h1 className="text-4xl font-bold text-primary">
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
              <CardTitle className="text-lg">Advanced Job Search</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Search jobs by keywords, location, and work type. Filter by remote work options and salary ranges to find your ideal position.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg">
                <Building2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-lg">Company Profiles</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Explore detailed company information including descriptions, websites, and all available job openings from each company.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">
                <Bookmark className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-lg">Save Favorites</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Bookmark your favorite jobs and companies for quick access. Never lose track of opportunities you're interested in.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-lg">Job Details</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              View comprehensive job information including salary ranges, requirements, benefits, and detailed job descriptions.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-lg">
                <Zap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-lg">PWA Ready</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Install as a mobile app for offline access and push notifications. Works seamlessly across all your devices.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-teal-100 dark:bg-teal-900/20 p-2 rounded-lg">
                <Proportions className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>
              <CardTitle className="text-lg">Responsive Design</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Optimized for all screen sizes with mobile-first design. Access jobs and companies from desktop, tablet, or mobile.
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
            JobFinder is a modern job search platform built with React and TypeScript, featuring a clean interface
            powered by shadcn/ui components. We connect job seekers with opportunities through an intuitive,
            responsive web application with PWA capabilities.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">React + TypeScript</Badge>
            <Badge variant="secondary">Modern UI/UX</Badge>
            <Badge variant="secondary">PWA Ready</Badge>
            <Badge variant="secondary">Responsive Design</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Frontend Technologies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline">React 18</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">Vite</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Tailwind CSS</Badge>
              <Badge variant="outline">shadcn/ui</Badge>
              <Badge variant="outline">React Query</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">React Router</Badge>
              <Badge variant="outline">Lucide Icons</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Backend & Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Node.js</Badge>
              <Badge variant="outline">Express</Badge>
              <Badge variant="outline">Supabase</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">PWA Support</Badge>
              <Badge variant="outline">Responsive</Badge>
              <Badge variant="outline">Modern Filters</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
