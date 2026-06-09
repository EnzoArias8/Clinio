'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { crearPreferenciaPago } from './actions'

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [plan, setPlan] = useState<'mensual' | 'anual'>('mensual')
  const searchParams = useSearchParams()

  useEffect(() => {
    const planFromUrl = searchParams.get('plan')
    if (planFromUrl === 'anual' || planFromUrl === 'mensual') {
      setPlan(planFromUrl)
    }
  }, [searchParams])

  const handlePago = async () => {
    setIsLoading(true)

    try {
      const result = await crearPreferenciaPago(plan)
      if (result?.success && result.url) {
        window.location.href = result.url
      } else {
        console.error('No se recibió URL de pago')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error al crear preferencia de pago:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border border-border shadow-sm">
        <CardHeader>
          <CardTitle>Finaliza tu pago para acceder al sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Gracias por registrarte. Para continuar y acceder al dashboard, completa el pago de tu suscripción.
          </p>
          <div className="space-y-4">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handlePago}
              disabled={isLoading}
            >
              {isLoading ? 'Redirigiendo al pago...' : 'Ir al pago'}
            </Button>
            <Link href="/login" className="block text-center text-sm text-muted-foreground hover:text-foreground">
              Volver a iniciar sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
