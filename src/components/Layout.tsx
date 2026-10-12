import { Link, NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'

export default function Layout() {
  const { theme, toggle } = useDarkMode()
  const [year] = useState(() => new Date().getFullYear())

  return (
    <div className="layout">
      <header className="site-header">
        <nav className="nav">
          <Link to="/" className="nav-brand">
            my corner
          </Link>
          <div className="nav-links">
            <NavLink to="/about">about</NavLink>
            <NavLink to="/blog">blog</NavLink>
            <button
              className="theme-toggle"
              onClick={toggle}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? 'light' : 'dark'}
            </button>
          </div>
        </nav>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>made with quiet intent · {year}</p>
      </footer>
    </div>
  )
}
