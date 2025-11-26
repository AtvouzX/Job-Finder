import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Briefcase, Building2, Binoculars } from 'lucide-react'

export function Hero() {
    const [searchQuery, setSearchQuery] = useState('')
    const [locationQuery, setLocationQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // Navigate to jobs page with search parameters
        const params = new URLSearchParams()
        if (searchQuery) params.set('q', searchQuery)
        if (locationQuery) params.set('location', locationQuery)
        navigate(`/jobs?${params.toString()}`)
    }

    return (
        <section className="relative overflow-hidden bg-background text-foreground">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-muted/10">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                    <div className="absolute top-0 right-4 w-32 h-32 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
                    <div className="absolute -bottom-8 left-20 w-32 h-32 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
                </div>
            </div>

            <div className="relative max-w-6xl mx-auto px-4 py-20 lg:py-32">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        Find Your
                        <span className="block text-primary">
                            Dream Job
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                        Discover amazing opportunities from top companies across Indonesia.
                        Your next career move starts here.
                    </p>
                </div>

                {/* Search Form */}
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSearch} className="bg-card rounded-2xl shadow-2xl p-2 md:p-3">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                                <Input
                                    type="text"
                                    placeholder="Job title, keywords, or company"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 pr-4 py-4 border-input file:text-foreground focus-visible:ring-ring bg-transparent placeholder:text-muted-foreground"
                                />
                            </div>

                            <div className="flex-1 relative md:border-l md:border-border md:pl-3">
                                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 md:left-7" />
                                <Input
                                    type="text"
                                    placeholder="Location (e.g., Jakarta, Bandung)"
                                    value={locationQuery}
                                    onChange={(e) => setLocationQuery(e.target.value)}
                                    className="pl-12 pr-4 py-4 border-input file:text-foreground focus-visible:ring-ring bg-transparent placeholder:text-muted-foreground"
                                />
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="bg-primary text-primary-foreground ring-primary focus-visible:ring-ring hover:bg-primary/90 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                            >
                                <Search className="h-5 w-5 mr-2" />
                                Search Jobs
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="bg-card backdrop-blur-sm rounded-xl p-6 border border-secondary/30">
                        <Briefcase className="h-8 w-8 mx-auto mb-3 text-card-foreground" />
                        <div className="text-3xl font-bold mb-1 text-primary">500+</div>
                        <div className="text-card-foreground">Active Jobs</div>
                    </div>
                    <div className="bg-card backdrop-blur-sm rounded-xl p-6 border border-secondary/30">
                        <Building2 className="h-8 w-8 mx-auto mb-3 text-card-foreground" />
                        <div className="text-3xl font-bold mb-1 text-primary">50+</div>
                        <div className="text-card-foreground">Top Companies</div>
                    </div>

                    <div className="bg-card backdrop-blur-sm rounded-xl p-6 border border-secondary/30">
                        <Binoculars className="h-8 w-8 mx-auto mb-3 text-card-foreground" />
                        <div className="text-3xl font-bold mb-1 text-primary">10K+</div>
                        <div className="text-card-foreground">Job Seekers</div>
                    </div>
                </div>
            </div>
        </section>
    )
}