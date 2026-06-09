import { redirect } from 'next/navigation'
import { getCurrentProfesional } from '@/lib/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Users, Clock } from 'lucide-react'
import ReservasLink from '@/components/reservas-link'
import { getPacientes } from './pacientes/actions'
import { getTurnos } from './agenda/actions'

interface Turno {
  id: string
  paciente: string
  hora: string
  servicio: string
}

export default async function DashboardPage() {
  const profesional = await getCurrentProfesional()

  if (!profesional) {
    redirect('/login')
  }

  const firstName = profesional.nombre?.split(' ')[0] || 'Profesional'

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''
  const reservasLink = profesional?.slug ? `${baseUrl.replace(/\/$/, '')}/reservar/${profesional.slug}` : null

  let pacientesCount = 0
  let todayTurnos = 0
  let enEspera = 0
  let proximosTurnos: Turno[] = []

  try {
    const [pacientesResult, turnosResult] = await Promise.all([
      getPacientes(),
      getTurnos(new Date().toISOString().split('T')[0])
    ])

    if (pacientesResult.success) {
      pacientesCount = pacientesResult.data?.length ?? 0
    }

    if (turnosResult.success) {
      const turnos = turnosResult.data ?? []
      const today = new Date()
      
      todayTurnos = turnos.filter(turno => {
        const turnoDate = new Date(turno.fechaHora)
        return turnoDate.toDateString() === today.toDateString()
      }).length

      enEspera = turnos.filter(turno => turno.estado === 'PENDIENTE_PAGO').length

      proximosTurnos = turnos
        .filter(turno => new Date(turno.fechaHora) > new Date())
        .sort((a, b) => new Date(a.fechaHora).getTime() - new Date(b.fechaHora).getTime())
        .slice(0, 3)
        .map(turno => ({
          id: turno.id,
          paciente: turno.paciente?.nombre ?? 'Paciente',
          hora: new Date(turno.fechaHora).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
          servicio: turno.servicio?.nombre ?? 'Consulta'
        }))
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  }

  const stats = [
    {
      title: 'Turnos Hoy',
      value: todayTurnos.toString(),
      icon: Calendar,
      color: 'bg-primary/10 text-primary',
    },
    {
      title: 'Pacientes Activos',
      value: pacientesCount.toString(),
      icon: Users,
      color: 'bg-accent/10 text-accent',
    },
    {
      title: 'En Espera',
      value: enEspera.toString(),
      icon: Clock,
      color: 'bg-orange-100 text-orange-600',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          ¡Hola, {firstName}!
        </h1>
        <ReservasLink link={reservasLink} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="border border-border hover:shadow-md transition-shadow">
              <CardContent className="pt-6 flex flex-col items-center justify-center text-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-sm text-muted-foreground font-medium mt-4">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Upcoming Appointments */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Próximos Turnos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {proximosTurnos.length > 0 ? (
              proximosTurnos.map((turno) => (
                <div
                  key={turno.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{turno.paciente}</p>
                    <p className="text-sm text-muted-foreground">{turno.servicio}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{turno.hora}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">
                No hay turnos próximos.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
