'use server'

import { prisma } from '@/lib/prisma'

export async function obtenerTurnosOcupados(profesionalId: string, fecha: string) {
  const startDate = new Date(`${fecha}T00:00:00`)
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 1)

  const turnos = await prisma.turno.findMany({
    where: {
      profesionalId,
      fechaHora: {
        gte: startDate,
        lt: endDate,
      },
    },
    select: {
      fechaHora: true,
    },
  })

  return turnos.map((turno) => {
    const hora = new Date(turno.fechaHora).toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    return hora
  })
}
