'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AddAppointmentModal } from '@/components/modals'
import { getTurnos, getProfesionalForAgenda, getAgendaStats } from './actions'

const getLocalDateISOString = (date = new Date()) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const parseLocalDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export default function AgendaPage() {
  const [turnos, setTurnos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [profesionalData, setProfesionalData] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState(getLocalDateISOString())

  const [agendaStats, setAgendaStats] = useState({ confirmados: 0, pendientes: 0, libres: 0 })

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [turnosResult, profesionalResult, statsResult] = await Promise.all([
          getTurnos(selectedDate),
          getProfesionalForAgenda(),
          getAgendaStats(selectedDate)
        ])
        
        if (turnosResult.success) {
          setTurnos(turnosResult.data ?? [])
        }
        if (profesionalResult.success) {
          setProfesionalData(profesionalResult.data)
        }
        if (statsResult.success && statsResult.data) {
          setAgendaStats(statsResult.data)
        }
      } catch (error) {
        console.error('Error loading agenda data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [selectedDate])

  const getProfesionalSchedule = () => {
    if (!profesionalData || !profesionalData.horarioInicio || !profesionalData.horarioFin) {
      return []
    }

    const start = new Date(`2000-01-01T${profesionalData.horarioInicio}`)
    const end = new Date(`2000-01-01T${profesionalData.horarioFin}`)
    const slots: string[] = []
    let current = start
    const serviceDuration = profesionalData.servicios?.[0]?.duracionMin || 45
    const durationMs = serviceDuration * 60 * 1000

    while (current < end) {
      const next = new Date(current.getTime() + durationMs)
      if (next > end) break

      const formattedStart = current.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
      const formattedEnd = next.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
      slots.push(`${formattedStart} - ${formattedEnd}`)
      current = next
    }
    return slots
  }

  const profesionalSchedule = useMemo(getProfesionalSchedule, [profesionalData])

  const generateTimeSlots = () => {
    interface TimeSlot {
      id: number;
      hora: string;
      paciente: string;
      servicio: string;
      estado: string;
    }  
    const slots: TimeSlot[] = []

    profesionalSchedule.forEach((hora, index) => {
      const turno = turnos.find((t: any) => { 
        const turnoDate = new Date(t.fechaHora)
        const selectedDateObj = parseLocalDate(selectedDate)
        const slotStart = hora?.split(' - ')?.[0] || '00:00'
        
        return (
          turnoDate.getFullYear() === selectedDateObj.getFullYear() &&
          turnoDate.getMonth() === selectedDateObj.getMonth() &&
          turnoDate.getDate() === selectedDateObj.getDate() &&
          turnoDate.getHours() === parseInt(slotStart.split(':')[0]) && 
          turnoDate.getMinutes() === parseInt(slotStart.split(':')[1])
        )
      })

      slots.push({
        id: index + 1,
        hora: hora ?? '',
        paciente: turno?.paciente?.nombre ?? 'Disponible',
        servicio: turno?.servicio?.nombre ?? '-',
        estado: turno?.estado ?? 'Libre'
      })
    })

    return slots
  }

  const horarios = generateTimeSlots()

  const formatDate = (dateString: string) => {
    const date = parseLocalDate(dateString)
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('es-AR', options)
  }

  const isToday = (dateString: string) => {
    const date = parseLocalDate(dateString)
    const today = parseLocalDate(getLocalDateISOString())
    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate()
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Agenda
          </h1>
          <p className="text-muted-foreground mt-2">
            Vista de tu calendario {isToday(selectedDate) ? 'de hoy' : `para ${formatDate(selectedDate)}`}
          </p>
        </div>
        <AddAppointmentModal />
      </div>

      {/* Stats - Moved to top */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-border">
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-muted-foreground">Turnos Confirmados</p>
            <p className="text-3xl font-bold text-foreground mt-2">{agendaStats.confirmados}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-muted-foreground">Horarios Libres</p>
            <p className="text-3xl font-bold text-foreground mt-2">{agendaStats.libres}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-muted-foreground">Pendientes</p>
            <p className="text-3xl font-bold text-primary mt-2">{agendaStats.pendientes}</p>
          </CardContent>
        </Card>
      </div>

      {/* Date Selector */}
      <div className="flex items-center gap-4 bg-card border border-border rounded-lg p-4">
        <Calendar className="w-5 h-5 text-primary" />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-background border border-border rounded px-3 py-2 text-foreground"
        />
        <span className="text-sm text-muted-foreground ml-auto">
          {isToday(selectedDate) ? 'Hoy' : formatDate(selectedDate)}
        </span>
      </div>

      {/* Schedule */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Horarios del Día</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {horarios.map((slot) => (
              <div
                key={slot.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                  slot.estado === 'Libre'
                    ? 'border-border bg-secondary/30 hover:bg-secondary/50'
                    : slot.estado === 'CONFIRMADO'
                    ? 'border-primary/30 bg-primary/5'
                    : slot.estado === 'PENDIENTE_PAGO'
                    ? 'border-yellow-300 bg-yellow-50'
                    : 'border-orange-300 bg-orange-50'
                }`}
              >
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{slot.hora}</p>
                  <p className="text-sm text-muted-foreground">{slot.paciente}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{slot.servicio}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        slot.estado === 'Libre'
                          ? 'bg-gray-100 text-gray-700'
                          : slot.estado === 'CONFIRMADO'
                          ? 'bg-green-100 text-green-700'
                          : slot.estado === 'PENDIENTE_PAGO'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {slot.estado}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


