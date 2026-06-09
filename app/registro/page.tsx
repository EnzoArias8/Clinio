'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { registrarProfesional } from './actions'

export default function RegistroPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const [formData, setFormData] = useState({
    nombre: '',
    especialidad: '',
    email: '',
    matricula: '',
    direccionConsultorio: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [selectedPlan, setSelectedPlan] = useState<'mensual' | 'anual' | null>(null)

  // Get plan from URL
  useEffect(() => {
    const plan = searchParams.get('plan') as 'mensual' | 'anual' | null
    if (plan) {
      setSelectedPlan(plan)
    }
  }, [searchParams])

  // Always show registration form when visiting registration page
  // Don't auto-redirect even if authenticated
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      setIsLoading(false)
      return
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setIsLoading(false)
      return
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('nombre', formData.nombre)
      formDataToSend.append('especialidad', formData.especialidad)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('matricula', formData.matricula)
      formDataToSend.append('password', formData.password)

      const result = await registrarProfesional(formDataToSend)

      if (result.success) {
        const signInResult = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        })

        if (signInResult?.ok) {
          setSuccess('¡Cuenta creada exitosamente! Redirigiendo al pago...')
          setTimeout(() => {
            const planParam = selectedPlan ? `?plan=${selectedPlan}` : ''
            router.push(`/checkout${planParam}`)
          }, 1000)
        } else {
          setSuccess('Cuenta creada. Ahora redirige al login para completar el acceso.')
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        }
      } else {
        // Set error from server response
        setError(result.error || 'Error al crear la cuenta')
        // Clear any success message
        setSuccess('')
      }
    } catch (error) {
      console.error('Frontend error during registration:', error)
      setError('Ocurrió un error inesperado. Por favor, intenta nuevamente.')
      setSuccess('')
    } finally {
      // CRITICAL: Always reset loading state, even on errors
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="text-2xl font-bold text-primary mb-8 block">
          Clinio
        </Link>

        <Card className="border border-border shadow-sm">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold text-foreground">
              Registrarse
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Crea tu cuenta profesional en Clinio
            </CardDescription>
            {selectedPlan && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Plan seleccionado:</span> {selectedPlan === 'mensual' ? 'Plan Mensual - $20.000 ARS/mes' : 'Plan Anual - $200.000 ARS/año'}
                </p>
              </div>
            )}
          </CardHeader>

          <CardContent>
            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="nombre" className="text-sm font-medium text-foreground">
                  Nombre Completo
                </label>
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Dr. Enzo Arias"
                  className="border-border bg-background"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="especialidad" className="text-sm font-medium text-foreground">
                  Especialidad
                </label>
                <Input
                  id="especialidad"
                  name="especialidad"
                  type="text"
                  value={formData.especialidad}
                  onChange={handleChange}
                  placeholder="Medicina General, Odontología, etc."
                  className="border-border bg-background"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Correo Electrónico
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@correo.com"
                  className="border-border bg-background"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="matricula" className="text-sm font-medium text-foreground">
                  Matricula (Opcional)
                </label>
                <Input
                  id="matricula"
                  name="matricula"
                  type="text"
                  value={formData.matricula}
                  onChange={handleChange}
                  placeholder="MP-12345"
                  className="border-border bg-background"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="direccionConsultorio" className="text-sm font-medium text-foreground">
                  Dirección del Consultorio
                </label>
                <Input
                  id="direccionConsultorio"
                  name="direccionConsultorio"
                  type="text"
                  value={formData.direccionConsultorio}
                  onChange={handleChange}
                  placeholder="Av. Principal 123, Ciudad"
                  className="border-border bg-background"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Contraseña
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                    className="border-border bg-background pr-10"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repite tu contraseña"
                    className="border-border bg-background pr-10"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando cuenta...
                  </>
                ) : (
                  'Registrarse'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
