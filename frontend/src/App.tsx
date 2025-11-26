import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BottomNavigation from '@/components/layout/BottomNavigation'
import { SavedProvider } from '@/contexts/SavedContext'
import { Skeleton } from '@/components/ui/skeleton'
import PWABadge from './PWABadge'

// Lazy load page components
const Home = lazy(() => import('@/pages/Home'))
const Jobs = lazy(() => import('@/pages/jobs/Jobs'))
const JobDetail = lazy(() => import('@/pages/jobs/JobDetail'))
const Companies = lazy(() => import('@/pages/companies/Companies'))
const CompanyDetail = lazy(() => import('@/pages/companies/CompanyDetail'))
const Saved = lazy(() => import('@/pages/Saved'))
const Profile = lazy(() => import('@/pages/Profile'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Loading component for Suspense fallback
const PageSkeleton = () => (
  <div className="min-h-screen flex flex-col">
    <div className="flex-1 p-4 space-y-4">
      <Skeleton className="h-8 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-1/2 mx-auto" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  </div>
)

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 pb-16 md:pb-0">
        <SavedProvider>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lowongan" element={<Jobs />} />
            <Route path="/lowongan/:id" element={<JobDetail />} />
            <Route path="/perusahaan" element={<Companies />} />
            <Route path="/perusahaan/:id" element={<CompanyDetail />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </SavedProvider>
      </div>
      <BottomNavigation />
      <Footer />
      <PWABadge />
    </div>
  )
}

export default App