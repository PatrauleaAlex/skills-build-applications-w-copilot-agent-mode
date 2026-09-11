import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigationItems = [
  { path: '/', label: 'Users', element: <Users /> },
  { path: '/activities', label: 'Activities', element: <Activities /> },
  { path: '/teams', label: 'Teams', element: <Teams /> },
  { path: '/leaderboard', label: 'Leaderboard', element: <Leaderboard /> },
  { path: '/workouts', label: 'Workouts', element: <Workouts /> },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-eyebrow">Octofit Tracker</p>
          <h1>Presentation tier dashboard</h1>
          <p className="app-subtitle">
            Browse live data from the multi-tier fitness platform.
          </p>
        </div>
        <nav aria-label="Primary" className="app-nav">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `nav-link${isActive ? ' nav-link-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          {navigationItems.map((item) => (
            <Route key={item.path} path={item.path} element={item.element} />
          ))}
        </Routes>
      </main>
    </div>
  )
}

export default App
