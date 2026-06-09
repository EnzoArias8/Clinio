import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import CalendarioReservas from '@/components/calendario-reservas'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params
  const { slug } = resolvedParams

  const profesional = await prisma.profesional.findUnique({
    where: { slug },
    select: {
      id: true,
      nombre: true,
      especialidad: true,
      diasAtencion: true,
      horarioInicio: true,
      horarioFin: true,
      horarioInicio2: true,
      horarioFin2: true,
      nombreSesion: true,
      duracionSesion: true,
      precioConsulta: true,
      fotoPerfil: true,
      slug: true,
    },
  })

  if (!profesional) {
    notFound()
  }

  const initials = profesional.nombre
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Profile Card */}
        <Card className="border border-border p-6 flex flex-col items-center text-center">
          <Avatar className="w-28 h-28">
            {profesional.fotoPerfil ? (
              <img
                src={profesional.fotoPerfil}
                alt={profesional.nombre}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <AvatarFallback className="text-2xl font-semibold">{initials}</AvatarFallback>
            )}
          </Avatar>
          <h2 className="mt-4 text-2xl font-bold">{profesional.nombre}</h2>
          <p className="text-sm text-muted-foreground mt-1">{profesional.especialidad}</p>
          <div className="mt-6 text-sm text-muted-foreground">
            <p><strong>Días de atención:</strong> {profesional.diasAtencion.join(', ')}</p>
            <p className="mt-1"><strong>Horario:</strong> {profesional.horarioInicio} - {profesional.horarioFin}</p>
          </div>
        </Card>

        {/* Right: Reserva Card */}
        <Card className="border border-border p-6">
          <CardHeader>
            <CardTitle>Reserva tu turno</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarioReservas profesional={{
              id: profesional.id,
              nombre: profesional.nombre,
              especialidad: profesional.especialidad,
              diasAtencion: profesional.diasAtencion,
              horarioInicio: profesional.horarioInicio,
              horarioFin: profesional.horarioFin,
              horarioInicio2: profesional.horarioInicio2 || undefined,
              horarioFin2: profesional.horarioFin2 || undefined,
              nombreSesion: profesional.nombreSesion,
              duracionSesion: profesional.duracionSesion,
              precioConsulta: profesional.precioConsulta,
              fotoPerfil: profesional.fotoPerfil || undefined,
            }} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
