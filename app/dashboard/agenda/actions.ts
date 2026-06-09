
'use server'

import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"

export const getTurnos = async (dateString: string) => {
  try {
    const professional = await requireAuth()
    if (!professional) {
      return { success: false, error: "No autenticado" }
    }

  const date = new Date(dateString)
  date.setHours(0, 0, 0, 0)
  const nextDay = new Date(date)
  nextDay.setDate(date.getDate() + 1)

    const turnos = await prisma.turno.findMany({
      where: {
        profesionalId: professional.id,
        fechaHora: {
          gte: date,
          lt: nextDay,
        },
      },
      include: {
        paciente: { select: { nombre: true } },
        servicio: { select: { nombre: true } },
      },
      orderBy: {
        fechaHora: "asc",
      },
    })
    return { success: true, data: turnos }
  } catch (error) {
    console.error("Error fetching turnos:", error)
    return { success: false, error: "Error al cargar turnos" }
  }
}

export const getProfesionalForAgenda = async () => {
  try {
    const professional = await requireAuth()
    if (!professional) {
      return { success: false, error: "No autenticado" }
    }

    const professionalData = await prisma.profesional.findFirst({
      where: { id: professional.id },
      include: { servicios: true },
      select: { horarioInicio: true, horarioFin: true, id: true, servicios: true },
    })
    if (!professionalData) {
      return { success: false, error: "Datos de horario del profesional no encontrados" }
    }
    return { success: true, data: professionalData }
  } catch (error) {
    console.error("Error fetching professional data:", error)
    return { success: false, error: "Error al cargar datos del profesional" }
  }
}

export const getAgendaStats = async (dateString: string) => {
  try {
    const professional = await requireAuth()
    if (!professional) {
      return { success: false, error: "No autenticado" }
    }

    const professionalFullData = await prisma.profesional.findFirst({
      where: { id: professional.id },
      include: { servicios: true },
      select: { horarioInicio: true, horarioFin: true, id: true, servicios: true },
    })

    if (!professionalFullData) {
      return { success: false, error: "Datos de horario del profesional no encontrados" }
    }

  const date = new Date(dateString)
  date.setHours(0, 0, 0, 0)
  const nextDay = new Date(date)
  nextDay.setDate(date.getDate() + 1)

    const turnosConfirmados = await prisma.turno.count({
      where: {
        profesionalId: professionalFullData.id,
        fechaHora: {
          gte: date,
          lt: nextDay,
        },
        estado: "CONFIRMADO",
      },
    })

    const turnosPendientes = await prisma.turno.count({
      where: {
        profesionalId: professionalFullData.id,
        fechaHora: {
          gte: date,
          lt: nextDay,
        },
        estado: "PENDIENTE_PAGO",
      },
    })

    const start = new Date(`2000-01-01T${professionalFullData.horarioInicio}`)
    const end = new Date(`2000-01-01T${professionalFullData.horarioFin}`)
    let totalSlots = 0
    let current = start
    const serviceDuration = professionalFullData.servicios?.[0]?.duracionMin || 45
    const durationMs = serviceDuration * 60 * 1000
    while (current < end) {
      const next = new Date(current.getTime() + durationMs)
      if (next > end) break
      totalSlots++
      current = next
    }

    const turnosDelDia = await prisma.turno.count({
      where: {
        profesionalId: professionalFullData.id,
        fechaHora: {
          gte: date,
          lt: nextDay,
        },
      },
    })

    const horariosLibres = totalSlots - turnosDelDia

    return { success: true, data: { confirmados: turnosConfirmados, pendientes: turnosPendientes, libres: horariosLibres } }
  } catch (error) {
    console.error("Error fetching agenda stats:", error)
    return { success: false, error: "Error al cargar estadísticas de la agenda" }
  }
}
