import { Link } from 'react-router-dom'
import NavLink from '@/components/ui/NavLink'

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">
          JobFinder
        </Link>
        <nav className="flex gap-2 items-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/lowongan">Lowongan Kerja</NavLink>
          <NavLink to="/perusahaan">Perusahaan</NavLink>
          <NavLink to="/saved">Saved</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
      </div>
    </header>
  )
}
