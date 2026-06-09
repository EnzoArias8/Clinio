"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { obtenerTurnosOcupados } from '@/app/reservar/[slug]/actions'

interface ProfesionalProps {
  id: string
  nombre?: string
  especialidad?: string
  diasAtencion: string[]
  horarioInicio: string
  horarioFin: string
  horarioInicio2?: string
  horarioFin2?: string
  nombreSesion?: string
  duracionSesion?: number
  precioConsulta?: number
  fotoPerfil?: string
}

interface Props {
  profesional: ProfesionalProps
}

function timeToMinutes(t: string) {
  const [hh, mm] = t.split(':').map(Number)
  return hh * 60 + mm
}

function minutesToTime(m: number) {
  const hh = Math.floor(m / 60)
  const mm = m % 60
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}

export default function CalendarioReservas({ profesional }: Props) {
  const [date, setDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [busySlots, setBusySlots] = useState<string[]>([])

  const dayName = useMemo(() => {
    if (!date) return null
    const d = new Date(date + 'T00:00:00')
    const map = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
    return map[d.getDay()]
  }, [date])

  const attends = dayName ? profesional.diasAtencion.includes(dayName) : false

  const duration = profesional.duracionSesion || 30

  const slots = useMemo(() => {
    if (!attends) return [] as string[]
    const ranges: Array<{ start: number; end: number }> = []
    ranges.push({
      start: timeToMinutes(profesional.horarioInicio),
      end: timeToMinutes(profesional.horarioFin),
    })

    if (profesional.horarioInicio2 && profesional.horarioFin2) {
      ranges.push({
        start: timeToMinutes(profesional.horarioInicio2),
        end: timeToMinutes(profesional.horarioFin2),
      })
    }

    const arr: string[] = []
    ranges.forEach((range) => {
      for (let t = range.start; t + duration <= range.end; t += duration) {
        arr.push(minutesToTime(t))
      }
    })

    return arr
  }, [profesional.horarioInicio, profesional.horarioFin, profesional.horarioInicio2, profesional.horarioFin2, attends, duration])

  useEffect(() => {
    if (!date || !profesional.id) {
      setBusySlots([])
      return
    }

    setBusySlots([])
    async function fetchBusy() {
      const occupied = await obtenerTurnosOcupados(profesional.id, date)
      setBusySlots(occupied)
    }

    fetchBusy().catch((error) => {
      console.error('Error al obtener turnos ocupados:', error)
    })
  }, [date, profesional.id])

  const handleConfirm = async () => {
    if (!date || !selectedTime) return
    setLoading(true)
    console.log(`Iniciando checkout con Mercado Pago para el turno del ${date} a las ${selectedTime}...`)
    // Here you would call your backend to create a Mercado Pago preference
    // Simulate processing delay
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }

  const precioFormateado = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(profesional.precioConsulta || 0)

  return (
    <div>
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          {profesional.fotoPerfil ? (
            <img
              src={profesional.fotoPerfil}
              alt={profesional.nombre || 'Profesional'}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-lg font-semibold text-foreground">
              {profesional.nombre?.split(' ').map((n) => n[0]).slice(0, 2).join('')}
            </div>
          )}
          <div className="text-sm">
            <p className="font-medium">{profesional.nombreSesion || 'Consulta'}</p>
            <p className="text-muted-foreground text-sm">{profesional.duracionSesion || 30} min · {precioFormateado}</p>
          </div>
        </div>
        <label className="block text-sm font-medium">Selecciona fecha</label>
        <input
          type="date"
          value={date}
          onChange={(e) => { setDate(e.target.value); setSelectedTime(null) }}
          className="w-full border border-input rounded-md px-3 py-2 bg-background text-sm"
        />
        {dayName && !attends && (
          <p className="text-sm text-red-600/80">El profesional no atiende este día</p>
        )}

        {dayName && attends && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">Seleccione un horario disponible</p>
            <div className="flex flex-wrap gap-2">
              {slots.map((s) => {
                const active = selectedTime === s
                const occupied = busySlots.includes(s)
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => !occupied && setSelectedTime(s)}
                    disabled={occupied}
                    className={`px-3 py-1.5 rounded-full text-sm border ${occupied ? 'bg-slate-800 text-slate-400 border-slate-800 cursor-not-allowed opacity-50' : active ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/10 border-border'}`}
                  >
                    {s}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleConfirm}
            disabled={!selectedTime || loading}
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground disabled:opacity-60"
          >
            {loading ? 'Generando link de pago...' : 'Pagar y Confirmar Turno'}
          </button>
        </div>
      </div>
    </div>
  )
}
