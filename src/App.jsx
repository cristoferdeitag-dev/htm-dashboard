import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Dashboard from './pages/Dashboard.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Diagnostico from './pages/Diagnostico.jsx'
import MiPagina from './pages/MiPagina.jsx'

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/mi-pagina', label: 'Mi Pagina', icon: '🌐' },
  { path: '/tareas', label: 'Tareas', icon: '✅' },
  { path: '/progreso', label: 'Progreso', icon: '📈' },
]

function App() {
  const location = useLocation()
  const hideNav = ['/onboarding', '/diagnostico'].includes(location.pathname)

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar - Desktop */}
      {!hideNav && (
        <aside style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <div style={styles.logoContainer}>
              <span style={styles.logoIcon}>🚀</span>
              <div>
                <h2 style={styles.logoText}>HTM</h2>
                <span style={styles.logoSubtext}>Haz Tu Marketing</span>
              </div>
            </div>
          </div>
          <nav style={styles.sidebarNav}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                style={({ isActive }) => ({
                  ...styles.navItem,
                  ...(isActive ? styles.navItemActive : {}),
                })}
              >
                <span style={styles.navIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div style={styles.sidebarFooter}>
            <div style={styles.userCard}>
              <div style={styles.userAvatar}>M</div>
              <div>
                <div style={styles.userName}>Mi Negocio</div>
                <div style={styles.userPlan}>Plan Emprendedor</div>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main style={{
        flex: 1,
        minHeight: '100vh',
        paddingBottom: hideNav ? 0 : 80,
        overflowX: 'hidden',
      }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/diagnostico" element={<Diagnostico />} />
          <Route path="/mi-pagina" element={<MiPagina />} />
        </Routes>
      </main>

      {/* Bottom Nav - Mobile */}
      {!hideNav && (
        <nav style={styles.bottomNav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              style={({ isActive }) => ({
                ...styles.bottomNavItem,
                ...(isActive ? styles.bottomNavItemActive : {}),
              })}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 10, marginTop: 2 }}>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  )
}

const styles = {
  sidebar: {
    width: 260,
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRight: '1px solid var(--surface-container)',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    zIndex: 100,
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  sidebarHeader: {
    padding: '24px 20px',
    borderBottom: '1px solid #edeef0',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  logoIcon: {
    fontSize: 28,
  },
  logoText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 20,
    fontWeight: 800,
    color: '#003d9b',
    margin: 0,
    lineHeight: 1,
  },
  logoSubtext: {
    fontSize: 11,
    color: '#434654',
    fontWeight: 500,
  },
  sidebarNav: {
    flex: 1,
    padding: '12px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 16px',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 500,
    color: '#434654',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
  },
  navItemActive: {
    background: '#003d9b',
    color: '#ffffff',
    fontWeight: 600,
    boxShadow: '0 4px 12px rgba(0, 61, 155, 0.3)',
  },
  navIcon: {
    fontSize: 18,
  },
  sidebarFooter: {
    padding: '16px 12px',
    borderTop: '1px solid #edeef0',
  },
  userCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 12px',
    borderRadius: 12,
    background: '#f8f9fb',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #003d9b, #0c56d0)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 14,
  },
  userName: {
    fontSize: 13,
    fontWeight: 600,
    color: '#191c1e',
  },
  userPlan: {
    fontSize: 11,
    color: '#434654',
  },
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    background: 'rgba(255, 255, 255, 0.92)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderTop: '1px solid #edeef0',
    display: 'none',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 100,
    padding: '0 8px',
  },
  bottomNavItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 16px',
    borderRadius: 12,
    color: '#434654',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    minWidth: 60,
  },
  bottomNavItemActive: {
    color: '#003d9b',
    fontWeight: 600,
  },
}

// Inject responsive CSS
const styleSheet = document.createElement('style')
styleSheet.textContent = `
  @media (max-width: 768px) {
    aside { display: none !important; }
    nav[style*="bottom: 0"] { display: flex !important; }
    main { margin-left: 0 !important; }
  }
  @media (min-width: 769px) {
    main { margin-left: 260px; }
  }
`
document.head.appendChild(styleSheet)

export default App
