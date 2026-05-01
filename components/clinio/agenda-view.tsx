'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock } from 'lucide-react'

interface Appointment {
  id: string
  patientName: string
  time: string
  duration: number
  status: 'confirmed' | 'pending' | 'first-time'
  day: number
}

const WEEKDAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
const HOURS = Array.from({ length: 13 }, (_, i) => 8 + i) // 8 to 20

const mockAppointments: Appointment[] = [
  { id: '1', patientName: 'Juan García', time: '09:00', duration: 45, status: 'confirmed', day: 0 },
  { id: '2', patientName: 'María López', time: '10:00', duration: 45, status: 'pending', day: 0 },
  { id: '3', patientName: 'Carlos Rodríguez', time: '11:15', duration: 45, status: 'first-time', day: 0 },
  { id: '4', patientName: 'Ana Martínez', time: '14:00', duration: 45, status: 'confirmed', day: 0 },
  { id: '5', patientName: 'Pedro Sánchez', time: '09:30', duration: 45, status: 'confirmed', day: 1 },
  { id: '6', patientName: 'Laura González', time: '15:00', duration: 45, status: 'pending', day: 1 },
  { id: '7', patientName: 'Diego Torres', time: '10:00', duration: 45, status: 'confirmed', day: 2 },
  { id: '8', patientName: 'Sofía Fernández', time: '13:00', duration: 45, status: 'first-time', day: 2 },
  { id: '9', patientName: 'Roberto Díaz', time: '09:00', duration: 45, status: 'confirmed', day: 3 },
  { id: '10', patientName: 'Gabriela Romero', time: '11:00', duration: 45, status: 'confirmed', day: 3 },
  { id: '11', patientName: 'Miguel Ramos', time: '14:30', duration: 45, status: 'pending', day: 4 },
]

const statusColors = {
  confirmed: 'oklch(0.65 0.13 160)',
  pending: 'oklch(0.72 0.13 80)',
  'first-time': 'oklch(0.62 0.14 210)',
}

const statusLabels = {
  confirmed: 'Confirmado',
  pending: 'Pendiente',
  'first-time': 'Primera Vez',
}

const mockPatients = [
  { id: '1', name: 'Juan García' },
  { id: '2', name: 'María López' },
  { id: '3', name: 'Carlos Rodríguez' },
  { id: '4', name: 'Ana Martínez' },
  { id: '5', name: 'Pedro Sánchez' },
  { id: '6', name: 'Laura González' },
  { id: '7', name: 'Diego Torres' },
  { id: '8', name: 'Sofía Fernández' },
]

const sessionTypes = [
  { value: 'presencial', label: 'Presencial' },
  { value: 'virtual', label: 'Virtual' },
  { value: 'evaluacion', label: 'Evaluación' },
]

export function AgendaView() {
  const [selectedWeek, setSelectedWeek] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  
  // Form state
  const [selectedPatient, setSelectedPatient] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [sessionType, setSessionType] = useState('')
  const [notes, setNotes] = useState('')

  const resetForm = () => {
    setSelectedPatient('')
    setSelectedDate('')
    setStartTime('')
    setEndTime('')
    setSessionType('')
    setNotes('')
  }

  const handleSaveTurno = () => {
    if (selectedPatient && selectedDate && startTime) {
      const patient = mockPatients.find(p => p.id === selectedPatient)
      const newAppointment: Appointment = {
        id: `new-${Date.now()}`,
        patientName: patient?.name || 'Nuevo Paciente',
        time: startTime,
        duration: 45,
        status: 'pending',
        day: new Date(selectedDate).getDay() - 1, // Convert to 0-4 for Mon-Fri
      }
      setAppointments([...appointments, newAppointment])
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
    resetForm()
  }

  const getAppointmentPosition = (appointment: Appointment) => {
    const [hours, minutes] = appointment.time.split(':').map(Number)
    const topPercent = ((hours - 8 + minutes / 60) / 12) * 100
    const heightPercent = (appointment.duration / 60) * (100 / 12)
    return { top: `${topPercent}%`, height: `${heightPercent}%` }
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
            Agenda
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Semana del {new Date(2024, 0, 1 + selectedWeek * 7).toLocaleDateString()}
          </p>
        </div>
        <Button 
          className="gap-2" 
          style={{ background: 'var(--primary)', color: 'white' }}
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus size={18} />
          Nuevo Turno
        </Button>
      </div>

      {/* Calendar controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setSelectedWeek(selectedWeek + 1)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ background: statusColors.confirmed }} />
            <span>Confirmado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ background: statusColors.pending }} />
            <span>Pendiente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ background: statusColors['first-time'] }} />
            <span>Primera Vez</span>
          </div>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: 'var(--border)' }}>
        {/* Time column and weekday headers */}
        <div className="flex gap-6">
          {/* Time column */}
          <div className="w-16 shrink-0">
            <div className="h-12" /> {/* Header spacing */}
            <div className="relative" style={{ height: 'calc(12 * 80px)' }}>
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="absolute text-xs font-medium"
                  style={{
                    top: `calc(${((hour - 8) / 12) * 100}% + 4px)`,
                    color: 'var(--muted-foreground)',
                  }}
                >
                  {`${hour}:00`}
                </div>
              ))}
            </div>
          </div>

          {/* Weekday columns */}
          <div className="flex-1 flex gap-4">
            {WEEKDAYS.map((day, dayIndex) => (
              <div key={dayIndex} className="flex-1">
                {/* Day header */}
                <div className="h-12 flex flex-col items-center justify-center border-b pb-3">
                  <p className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>
                    {day}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                    {dayIndex + 1} de enero
                  </p>
                </div>

                {/* Hours grid */}
                <div className="relative" style={{ height: 'calc(12 * 80px)' }}>
                  {HOURS.map((hour) => (
                    <div
                      key={hour}
                      className="absolute w-full border-t"
                      style={{
                        top: `${((hour - 8) / 12) * 100}%`,
                        height: '80px',
                        borderColor: 'var(--border)',
                      }}
                    />
                  ))}

                  {/* Appointments */}
                  {appointments
                    .filter((apt) => apt.day === dayIndex)
                    .map((appointment) => {
                      const position = getAppointmentPosition(appointment)
                      return (
                        <div
                          key={appointment.id}
                          className="absolute w-full px-2 cursor-pointer transition-opacity hover:opacity-90"
                          style={{
                            top: position.top,
                            height: position.height,
                            minHeight: '60px',
                          }}
                        >
                          <div
                            className="w-full h-full rounded-lg p-2 flex flex-col justify-between text-white text-xs shadow-sm hover:shadow-md transition-shadow"
                            style={{
                              background: statusColors[appointment.status],
                              opacity: 0.95,
                            }}
                          >
                            <div>
                              <p className="font-semibold line-clamp-2">{appointment.patientName}</p>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] opacity-90">{appointment.time}</span>
                              <span className="text-[9px] opacity-75">{statusLabels[appointment.status]}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Appointment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent 
          className="sm:max-w-[500px]"
          style={{ 
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          <DialogHeader>
            <DialogTitle 
              className="text-xl font-semibold"
              style={{ color: 'var(--foreground)' }}
            >
              Agendar Nuevo Turno
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-5 py-4">
            {/* Patient Select */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                Paciente
              </label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger 
                  className="w-full"
                  style={{ 
                    background: 'var(--input)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <SelectValue placeholder="Seleccionar paciente" />
                </SelectTrigger>
                <SelectContent>
                  {mockPatients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Picker */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                Fecha
              </label>
              <div className="relative">
                <Calendar 
                  size={16} 
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--muted-foreground)' }}
                />
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-10"
                  style={{ 
                    background: 'var(--input)',
                    borderColor: 'var(--border)',
                  }}
                />
              </div>
            </div>

            {/* Time inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                  Hora de inicio
                </label>
                <div className="relative">
                  <Clock 
                    size={16} 
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--muted-foreground)' }}
                  />
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="pl-10"
                    style={{ 
                      background: 'var(--input)',
                      borderColor: 'var(--border)',
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                  Hora de fin
                </label>
                <div className="relative">
                  <Clock 
                    size={16} 
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--muted-foreground)' }}
                  />
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="pl-10"
                    style={{ 
                      background: 'var(--input)',
                      borderColor: 'var(--border)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Session Type */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                Tipo de Sesión
              </label>
              <Select value={sessionType} onValueChange={setSessionType}>
                <SelectTrigger 
                  className="w-full"
                  style={{ 
                    background: 'var(--input)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {sessionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                Notas adicionales
              </label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Agregar notas sobre la sesión..."
                rows={3}
                style={{ 
                  background: 'var(--input)',
                  borderColor: 'var(--border)',
                }}
              />
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              style={{ 
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveTurno}
              style={{ 
                background: 'var(--primary)',
                color: 'white',
              }}
            >
              Guardar Turno
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
