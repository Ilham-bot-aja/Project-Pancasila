import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/kuis', label: 'Kuis Empati' },
  { to: '/cerita', label: 'Cerita Nyata' },
  { to: '/pledge', label: 'Pledge Wall' },
  { to: '/tentang', label: 'Tentang' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-warm/90 backdrop-blur-sm border-b border-purple-100">
      <nav className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <NavLink to="/" className="font-display font-extrabold text-xl text-purple-600">
          EmpatiKu <span className="text-rose">💜</span>
        </NavLink>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-purple-500 text-white'
                      : 'text-ink/70 hover:bg-purple-100 hover:text-purple-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-purple-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Buka menu navigasi"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <ul className="md:hidden flex flex-col gap-1 px-5 pb-4">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-xl text-sm font-medium ${
                    isActive ? 'bg-purple-500 text-white' : 'text-ink/70 hover:bg-purple-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
