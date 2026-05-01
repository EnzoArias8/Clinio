'use client'

import { useState, useCallback, useEffect } from 'react'
import { SplashScreen } from '@/components/clinio/splash-screen'
import { Sidebar, type NavItem } from '@/components/clinio/sidebar'
import { Header } from '@/components/clinio/header'
import { DashboardContent } from '@/components/clinio/dashboard-content'
import { PacientesView } from '@/components/clinio/pacientes-view'
import { AgendaView } from '@/components/clinio/agenda-view'
import { ObrasSocialesView } from '@/components/clinio/obras-sociales-view'
import { FacturacionView } from '@/components/clinio/facturacion-view'
import { ConfiguracionView } from '@/components/clinio/configuracion-view'
import AuthPage from '@/app/auth/page'

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [dashboardVisible, setDashboardVisible] = useState(false)
  const [activeNav, setActiveNav] = useState<NavItem>('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthPage, setShowAuthPage] = useState(true)

  // Load auth state on mount
  useEffect(() => {
    const authenticated = localStorage.getItem('clinio_authenticated') === 'true'
    setIsAuthenticated(authenticated)
    setShowAuthPage(!authenticated)
  }, [])

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false)
    setTimeout(() => setDashboardVisible(true), 100)
  }, [])

  const handleNavigate = useCallback((item: NavItem) => {
    setActiveNav(item)
  }, [])

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true)
    setShowAuthPage(false)
    localStorage.setItem('clinio_authenticated', 'true')
  }, [])

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false)
    setShowAuthPage(true)
    setActiveNav('dashboard')
    localStorage.removeItem('clinio_authenticated')
  }, [])

  // Show splash on first visit
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  // Show auth page if not authenticated
  if (showAuthPage) {
    return <AuthPage onLogin={handleLogin} />
  }

  return (
    <div
      className={`min-h-screen transition-opacity duration-700 ${
        dashboardVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ background: 'var(--background)' }}
    >
      <Sidebar activeItem={activeNav} onNavigate={handleNavigate} onLogout={handleLogout} />

      <div className="ml-60 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 flex flex-col">
          {activeNav === 'dashboard' && <DashboardContent />}
          {activeNav === 'pacientes' && <PacientesView />}
          {activeNav === 'agenda' && <AgendaView />}
          {activeNav === 'obras-sociales' && <ObrasSocialesView />}
          {activeNav === 'facturacion' && <FacturacionView />}
          {activeNav === 'configuracion' && <ConfiguracionView />}
        </main>
      </div>
    </div>
  )
}
