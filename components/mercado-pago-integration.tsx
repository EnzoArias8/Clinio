'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle2, CreditCard, Loader2 } from 'lucide-react'
import { getProfesionalInfo, actualizarMpToken } from '@/app/dashboard/configuracion/actions'

export function MercadoPagoIntegration() {
  const [profesional, setProfesional] = useState(null)
  const [token, setToken] = useState('')
  const [showToken, setShowToken] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadProfesionalData()
  }, [])

  const loadProfesionalData = async () => {
    try {
      const result = await getProfesionalInfo()
      if (result.success) {
        setProfesional(result.data)
        setToken(result.data.mpAccessToken || '')
      }
    } catch (error) {
      console.error('Error loading professional data:', error)
    }
  }

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token.trim()) {
      toast.error('Por favor ingresa un token válido')
      return
    }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('mpAccessToken', token)

      const result = await actualizarMpToken(formData)

      if (result.success) {
        toast.success('Token de Mercado Pago actualizado correctamente')
        setProfesional(result.data)
      } else {
        toast.error(result.error || 'Error al actualizar el token')
      }
    } catch (error) {
      toast.error('Error al actualizar el token')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('mpAccessToken', '')

      const result = await actualizarMpToken(formData)

      if (result.success) {
        toast.success('Integración con Mercado Pago desconectada')
        setToken('')
        setProfesional(result.data)
      } else {
        toast.error(result.error || 'Error al desconectar')
      }
    } catch (error) {
      toast.error('Error al desconectar')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" style={{ color: '#009EE3' }} />
          Integración de Pagos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Mercado Pago Logo Section */}
          <div className="p-6 rounded-lg border border-border bg-gradient-to-r from-blue-50 to-cyan-50">
            <div className="flex items-center gap-4">
              {/* MP Logo Representation */}
              <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-white border-2 border-blue-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">MP</div>
                  <div className="text-xs text-blue-400 font-semibold">Pay</div>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Mercado Pago
                </h3>
                <p className="text-sm text-muted-foreground">
                  Conecta tu cuenta para recibir pagos directamente
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex-shrink-0">
                {profesional?.mpAccessToken ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-green-700">
                      Conectado
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-lg border border-yellow-200">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-semibold text-yellow-700">
                      Desconectado
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Connection Form */}
          {!profesional?.mpAccessToken ? (
            <form onSubmit={handleConnect} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Access Token
                </label>
                <div className="relative">
                  <Input
                    type={showToken ? 'text' : 'password'}
                    placeholder="APP_USR-XXXXXXXXXXXXXXXXXXXX"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="border-border bg-background pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showToken ? '✕' : '◉'}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Encuentra tu Access Token en Configuración &gt; Credenciales en tu cuenta de Mercado Pago
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">Nota:</span> Tu token se encriptra y se almacena de forma segura. Nunca compartimos tus credenciales.
                </p>
              </div>

              <Button
                type="submit"
                disabled={!token.trim() || isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Conectando...
                  </>
                ) : (
                  'Conectar Mercado Pago'
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-900">
                  <span className="font-semibold">¡Perfecto!</span> Tu cuenta está conectada. Ahora puedes recibir pagos desde la plataforma.
                </p>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Estado
                    </p>
                    <p className="font-semibold text-foreground">Activo</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Transacciones
                    </p>
                    <p className="font-semibold text-foreground">0</p>
                  </div>
                </div>

                <Button
                  onClick={handleDisconnect}
                  variant="outline"
                  disabled={isLoading}
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Desconectando...
                    </>
                  ) : (
                    'Desconectar'
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
