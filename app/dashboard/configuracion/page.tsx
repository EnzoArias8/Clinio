import { redirect } from 'next/navigation'
import { getCurrentProfesional } from '@/lib/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, CreditCard, Settings, Clock } from 'lucide-react'
import { HorarioForm } from './horario-form'

export default async function ConfiguracionPage() {
  const profesional = await getCurrentProfesional()

  if (!profesional) {
    redirect('/login')
  }

  const clientId = process.env.MP_CLIENT_ID
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/mercadopago/callback`
  const mpAuthUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${profesional.id}&redirect_uri=${redirectUri}`

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
        <p className="text-muted-foreground mt-2">
          Ajusta tu cuenta y configura los cobros directos con Mercado Pago.
        </p>
      </div>

      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Configuración de Cobros
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Conecta tu cuenta de Mercado Pago para que tus pacientes puedan pagarte directamente en tu cuenta.
          </p>

          {profesional.mpAccessToken ? (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="h-5 w-5" />
                Cuenta de Mercado Pago vinculada exitosamente.
              </div>
              <p className="mt-2">
                Tus pacientes ya pueden pagarte de forma directa.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-foreground">
                Aún no has vinculado tu cuenta de Mercado Pago. Haz clic en el botón para iniciar el proceso de autorización.
              </p>
              <a
                href={mpAuthUrl}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Vincular mi cuenta de Mercado Pago
              </a>
            </div>
          )}

          {!clientId || !process.env.NEXT_PUBLIC_APP_URL ? (
            <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-900">
              <p className="font-semibold">Configuración incompleta de Mercado Pago</p>
              <p>
                Revisa las variables de entorno <code>MP_CLIENT_ID</code> y <code>NEXT_PUBLIC_APP_URL</code>.
              </p>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <HorarioForm profesional={profesional} />

      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Tu cuenta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-foreground">Nombre</p>
              <p className="text-base text-foreground">{profesional.nombre}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Email</p>
              <p className="text-base text-foreground">{profesional.email}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Profesión</p>
            <p className="text-base text-foreground">{profesional.especialidad}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
