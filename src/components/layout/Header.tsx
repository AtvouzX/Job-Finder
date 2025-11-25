import { Link, NavLink } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">
          JobFinder
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink to="/">Home</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink to="/lowongan">Lowongan Kerja</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink to="/perusahaan">Perusahaan</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink to="/saved">Saved</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink to="/profile">Profile</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  )
}
