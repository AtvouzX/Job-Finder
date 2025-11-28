import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Search, MapPin, Building, ChevronDown, ChevronUp, Filter } from 'lucide-react'

interface CompanyFiltersProps {
  className?: string
}

export function CompanyFilters({ className }: CompanyFiltersProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Get current filters from URL
  const searchParams = new URLSearchParams(location.search)
  const [filters, setFilters] = useState({
    q: searchParams.get('q') || '',
    location: searchParams.get('location') || '',
  })

  // Sync filters state with URL parameters when location changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    setFilters({
      q: searchParams.get('q') || '',
      location: searchParams.get('location') || '',
    })
  }, [location.search])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value)
      }
    })

    navigate(`/companies?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      q: '',
      location: '',
    })
    navigate('/companies')
  }

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <form onSubmit={handleSearch} className="space-y-4">
          {/* Basic Search Row */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search companies..."
                value={filters.q}
                onChange={(e) => handleFilterChange('q', e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" size="sm">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-muted-foreground hover:text-foreground p-0 h-auto"
            >
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
              {showAdvanced ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
              Clear
            </Button>
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="space-y-4 pt-2 border-t">
              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="e.g., Jakarta, Bandung"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}