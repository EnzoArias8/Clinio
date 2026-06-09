'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Logo, LogoWithText } from '@/components/logo'
import { EmptyPatientsState, EmptyAgendaState, EmptySearchState } from '@/components/empty-states'
import { AddPatientModal, AddAppointmentModal } from '@/components/modals'
import { DashboardSkeleton, PatientTableSkeleton, AgendaSkeleton } from '@/components/skeleton-loaders'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ToastShowcase } from './toast-showcase'

export default function ComponentsShowcase() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <LogoWithText />
            <Link href="/">
              <Button variant="outline">Volver al Inicio</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              Componentes Premium - Clinio
            </h1>
            <p className="text-xl text-muted-foreground">
              Galería completa de componentes UI/UX para la interfaz Clinio
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/loader-demo" className="block">
              <Card className="border border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">Global Loader Demo</h3>
                  <p className="text-sm text-muted-foreground">Ver pantalla de carga animada en acción</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dashboard/configuracion" className="block">
              <Card className="border border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">Integración Mercado Pago</h3>
                  <p className="text-sm text-muted-foreground">Ver conexión de pagos en configuración</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/reserva/exito" className="block">
              <Card className="border border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">Página de Éxito</h3>
                  <p className="text-sm text-muted-foreground">Ver botón de pago Mercado Pago</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Components Showcase */}
          <Tabs defaultValue="logo" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
              <TabsTrigger value="logo">Logo</TabsTrigger>
              <TabsTrigger value="empty">Empty States</TabsTrigger>
              <TabsTrigger value="modals">Modales</TabsTrigger>
              <TabsTrigger value="loading">Skeletons</TabsTrigger>
              <TabsTrigger value="toasts">Toasts</TabsTrigger>
              <TabsTrigger value="buttons">Botones</TabsTrigger>
            </TabsList>

            {/* Logo Section */}
            <TabsContent value="logo" className="space-y-6">
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>Logo Component</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Logo Solo (32x32)</p>
                    <div className="flex items-center justify-center p-8 bg-secondary/30 rounded-lg border border-border">
                      <Logo />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Logo con Texto</p>
                    <div className="flex items-center justify-center p-8 bg-secondary/30 rounded-lg border border-border">
                      <LogoWithText />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Logo en Diferentes Tamaños</p>
                    <div className="flex items-center gap-8 p-8 bg-secondary/30 rounded-lg border border-border">
                      <div className="w-8 h-8">
                        <Logo />
                      </div>
                      <div className="w-12 h-12">
                        <Logo />
                      </div>
                      <div className="w-16 h-16">
                        <Logo />
                      </div>
                      <div className="w-20 h-20">
                        <Logo />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Empty States Section */}
            <TabsContent value="empty" className="space-y-6">
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>Estados Vacíos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Empty Patients State</p>
                    <div className="bg-secondary/30 rounded-lg border border-border p-4">
                      <EmptyPatientsState />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Empty Agenda State</p>
                    <div className="bg-secondary/30 rounded-lg border border-border p-4">
                      <EmptyAgendaState />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Empty Search State</p>
                    <div className="bg-secondary/30 rounded-lg border border-border p-4">
                      <EmptySearchState />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Modals Section */}
            <TabsContent value="modals" className="space-y-6">
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>Modales de Creación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Modal para Agregar Paciente</p>
                    <AddPatientModal />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Modal para Agendar Turno</p>
                    <AddAppointmentModal />
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Nota:</strong> Los modales incluyen estados de carga. Al hacer clic en los botones, 
                      verá el estado "Guardando..." con un spinner animado.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Loading States Section */}
            <TabsContent value="loading" className="space-y-6">
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>Estados de Carga (Skeletons)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Dashboard Loading Skeleton</p>
                    <div className="bg-secondary/30 rounded-lg border border-border p-6 overflow-hidden max-h-96">
                      <DashboardSkeleton />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Patients Table Loading Skeleton</p>
                    <div className="bg-secondary/30 rounded-lg border border-border p-6 overflow-hidden max-h-96">
                      <PatientTableSkeleton />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Agenda Loading Skeleton</p>
                    <div className="bg-secondary/30 rounded-lg border border-border p-6 overflow-hidden max-h-96">
                      <AgendaSkeleton />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Buttons Section */}
            <TabsContent value="buttons" className="space-y-6">
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>Variantes de Botones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Primary Button</p>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Acción Principal
                    </Button>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Outline Button</p>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      Acción Secundaria
                    </Button>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Ghost Button</p>
                    <Button variant="ghost" className="text-primary hover:bg-primary/10">
                      Acción Terciaria
                    </Button>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Disabled Button</p>
                    <Button disabled>
                      Botón Deshabilitado
                    </Button>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Diferentes Tamaños</p>
                    <div className="flex flex-wrap gap-4">
                      <Button size="sm">Pequeño</Button>
                      <Button>Mediano</Button>
                      <Button size="lg">Grande</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Toasts Section */}
            <TabsContent value="toasts" className="space-y-6">
              <ToastShowcase />
            </TabsContent>
          </Tabs>

          {/* Navigation Links */}
          <Card className="border border-border bg-blue-50">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Navega a las Páginas Reales</h3>
                <div className="flex flex-wrap gap-3">
                  <Link href="/dashboard">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/dashboard/pacientes">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Pacientes
                    </Button>
                  </Link>
                  <Link href="/dashboard/agenda">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Agenda
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline">
                      Landing Page
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-8 mt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">
            © 2024 Clinio - Premium Healthcare SaaS Components
          </p>
        </div>
      </footer>
    </div>
  )
}
