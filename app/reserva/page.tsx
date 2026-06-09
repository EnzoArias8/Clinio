'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, Calendar, Clock, User } from 'lucide-react'

type Step = 'servicio' | 'fecha' | 'datos'

export default function ReservaPage() {
  const searchParams = useSearchParams()
  const profesionalId = searchParams.get('profesional')
  const [step, setStep] = useState<Step>('servicio')
  const [formData, setFormData] = useState({
    servicio: '',
    fecha: '',
    hora: '',
    nombre: '',
    email: '',
    celular: '',
  })
  const [servicios, setServicios] = useState([])
  const [loading, setLoading] = useState(true)
  const [professionalInfo, setProfessionalInfo] = useState(null)

  useEffect(() => {
    if (profesionalId) {
      console.log('Professional ID from URL:', profesionalId)
      loadProfessionalData()
    }
  }, [profesionalId])

  const loadProfessionalData = async () => {
    try {
      setLoading(true)
      
      // Load professional info
      const response = await fetch(`/api/professionals/${profesionalId}`)
      if (response.ok) {
        const data = await response.json()
        setProfessionalInfo(data)
        setServicios(data.servicios || [])
      }
    } catch (error) {
      console.error('Error loading professional data:', error)
    } finally {
      setLoading(false)
    }
  }

  const horas = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  ]

  const handleServicio = (servicioId: string) => {
    setFormData({ ...formData, servicio: servicioId })
    setStep('fecha')
  }

  const handleFecha = () => {
    if (formData.fecha && formData.hora) {
      setStep('datos')
    }
  }

  const handleConfirmar = () => {
    if (formData.nombre && formData.email && formData.celular) {
      window.location.href = '/reserva/exito'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            {step !== 'servicio' && (
              <button
                onClick={() => setStep(step === 'fecha' ? 'servicio' : 'fecha')}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {loading ? (
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="mt-4 text-muted-foreground">Cargando información...</p>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Agenda tu Turno</h1>
                  <p className="text-sm text-muted-foreground">
                    {professionalInfo 
                      ? `Con ${professionalInfo.nombre} - ${professionalInfo.especialidad}`
                      : 'Selecciona el servicio que prefieras'
                    }
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2">
            {['Servicio', 'Fecha & Hora', 'Datos'].map((label, idx) => (
              <div
                key={label}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  step === label.toLowerCase()
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Step 1: Servicio */}
        {step === 'servicio' && (
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
            {servicios.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicios.map((servicio) => (
                  <Card
                    key={servicio.id}
                    className={`border cursor-pointer transition-all hover:shadow-md ${
                      formData.servicio === servicio.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleServicio(servicio.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <h3 className="font-semibold text-lg mb-2">{servicio.nombre}</h3>
                      <p className="text-sm text-muted-foreground">{servicio.duracionMin} min</p>
                      <p className="text-lg font-bold text-primary mt-2">${servicio.precio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {professionalInfo 
                    ? `${professionalInfo.nombre} no tiene servicios disponibles en este momento.`
                    : 'No se encontraron servicios disponibles.'
                  }
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Fecha y Hora */}
        {step === 'fecha' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Selecciona Fecha y Hora
              </h2>
              <p className="text-muted-foreground">
                Elige el horario que mejor te convenga
              </p>
            </div>

            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="fecha" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Fecha
                    </label>
                    <Input
                      id="fecha"
                      type="date"
                      value={formData.fecha}
                      onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                      className="border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Horarios Disponibles
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {horas.map((hora) => (
                        <button
                          key={hora}
                          onClick={() => setFormData({ ...formData, hora })}
                          className={`py-2 px-3 rounded-lg font-medium transition-all ${
                            formData.hora === hora
                              ? 'bg-primary text-primary-foreground'
                              : 'border border-border text-foreground hover:border-primary hover:bg-primary/5'
                          }`}
                        >
                          {hora}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleFecha}
              disabled={!formData.fecha || !formData.hora}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
            >
              Continuar
            </Button>
          </div>
        )}

        {/* Step 3: Datos */}
        {step === 'datos' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Completa tus Datos
              </h2>
              <p className="text-muted-foreground">
                Necesitamos esta información para confirmar tu turno
              </p>
            </div>

            <Card className="border border-border">
              <CardContent className="pt-6">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="nombre" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Nombre Completo
                    </label>
                    <Input
                      id="nombre"
                      placeholder="Tu nombre"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Correo Electrónico
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@correo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="celular" className="text-sm font-medium text-foreground">
                      Celular
                    </label>
                    <Input
                      id="celular"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.celular}
                      onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                      className="border-border"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            <Button
              onClick={handleConfirmar}
              disabled={!formData.nombre || !formData.email || !formData.celular}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
            >
              Confirmar Turno
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
