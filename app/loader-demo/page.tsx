'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GlobalLoader } from '@/components/global-loader'
import { LogoWithText } from '@/components/logo'
import { ArrowLeft } from 'lucide-react'

export default function LoaderDemoPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleShowLoader = () => {
    setIsLoading(true)
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalLoader isOpen={isLoading} message="Procesando..." />

      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/">
              <LogoWithText />
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Volver
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Demo - Global Loader
            </h1>
            <p className="text-lg text-muted-foreground">
              Visualiza el componente de pantalla de carga global con animaciones
            </p>
          </div>

          {/* Info Card */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Características del Loader</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-foreground">Overlay a pantalla completa con fondo semi-transparente blanco</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-foreground">Logo animado con efecto de pulso</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-foreground">Texto personalizable (por defecto: "Procesando...")</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-foreground">Puntos animados tipo "bounce" en color primario</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-foreground">Z-index máximo para estar siempre visible</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Demo Section */}
          <Card className="border border-border bg-gradient-to-br from-primary/5 to-primary/2">
            <CardHeader>
              <CardTitle>Prueba el Loader</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Haz clic en el botón de abajo para ver el loader en acción. Se cerrará automáticamente después de 3 segundos.
              </p>
              <Button
                onClick={handleShowLoader}
                disabled={isLoading}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                {isLoading ? 'Cargando...' : 'Mostrar Global Loader'}
              </Button>
            </CardContent>
          </Card>

          {/* Usage Example */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Ejemplo de Uso</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`import { GlobalLoader } from '@/components/global-loader'
import { useState } from 'react'

export default function MyComponent() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <GlobalLoader 
        isOpen={isLoading} 
        message="Procesando..." 
      />
      <button onClick={() => setIsLoading(true)}>
        Iniciar Carga
      </button>
    </>
  )
}`}
              </pre>
            </CardContent>
          </Card>

          {/* Props Table */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Props del Componente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr className="bg-secondary/30">
                      <th className="px-4 py-2 text-left font-semibold text-foreground">Prop</th>
                      <th className="px-4 py-2 text-left font-semibold text-foreground">Tipo</th>
                      <th className="px-4 py-2 text-left font-semibold text-foreground">Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border hover:bg-secondary/10">
                      <td className="px-4 py-2 font-mono text-primary">isOpen</td>
                      <td className="px-4 py-2 font-mono text-muted-foreground">boolean</td>
                      <td className="px-4 py-2 text-foreground">Controla si el loader es visible</td>
                    </tr>
                    <tr className="hover:bg-secondary/10">
                      <td className="px-4 py-2 font-mono text-primary">message</td>
                      <td className="px-4 py-2 font-mono text-muted-foreground">string (optional)</td>
                      <td className="px-4 py-2 text-foreground">Texto a mostrar (por defecto: "Procesando...")</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
