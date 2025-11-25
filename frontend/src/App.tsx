import { Routes, Route } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BottomNavigation from '@/components/layout/BottomNavigation'
import { SavedProvider } from '@/contexts/SavedContext'
import Home from '@/pages/Home'
import Jobs from '@/pages/jobs/Jobs'
import JobDetail from '@/pages/jobs/JobDetail'
import Companies from '@/pages/companies/Companies'
import CompanyDetail from '@/pages/companies/CompanyDetail'
import Saved from '@/pages/Saved'
import Profile from '@/pages/Profile'
import NotFound from '@/pages/NotFound'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 pb-16 md:pb-0">
        <SavedProvider>
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
        </SavedProvider>
      </div>
      <BottomNavigation />
      <Footer />
    </div>
  )
}

export default App