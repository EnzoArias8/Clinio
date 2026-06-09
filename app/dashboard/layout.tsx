'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Menu, X, Home, Users, Calendar, Settings, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LogoWithText } from '@/components/logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="flex h-screen bg-background items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  // Don't render dashboard if not authenticated
  if (status === 'unauthenticated') {
    return null
  }

  const getUserInitials = (name?: string | null) => {
    if (!name?.trim()) return 'U'
    
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) {
      const firstInitial = parts[0][0]
      const lastInitial = parts[parts.length - 1][0]
      return `${firstInitial}${lastInitial}`.toUpperCase()
    }
    
    return parts[0].substring(0, 2).toUpperCase() || 'U'
  }

  const navItems = [
    { icon: Home, label: 'Inicio', href: '/dashboard' },
    { icon: Users, label: 'Pacientes', href: '/dashboard/pacientes' },
    { icon: Calendar, label: 'Agenda', href: '/dashboard/agenda' },
    { icon: User, label: 'Mi Perfil', href: '/dashboard/perfil' },
    { icon: Settings, label: 'Configuración', href: '/dashboard/configuracion' },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300 overflow-hidden flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/dashboard" className="block">
            <LogoWithText />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <Link href="/">
            <Button
              variant="outline"
              className="w-full border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-foreground hover:text-primary transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 border border-border">
              {session?.user?.fotoPerfil ? (
                <AvatarImage
                  src={session.user.fotoPerfil as string}
                  alt={session.user.name || 'Profesional'}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {getUserInitials(session?.user?.name)}
                </AvatarFallback>
              )}
            </Avatar>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
