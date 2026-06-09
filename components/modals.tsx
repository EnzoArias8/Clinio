'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Loader2 } from 'lucide-react'
import { crearPaciente } from '@/app/dashboard/pacientes/actions'

export function AddPatientModal() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    tutorNombre: '',
    tutorEmail: '',
    tutorWhatsapp: '',
    fechaNac: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('nombre', formData.nombre)
      formDataToSend.append('tutorNombre', formData.tutorNombre)
      formDataToSend.append('tutorEmail', formData.tutorEmail)
      formDataToSend.append('tutorWhatsapp', formData.tutorWhatsapp)
      if (formData.fechaNac) {
        formDataToSend.append('fechaNac', formData.fechaNac)
      }

      const result = await crearPaciente(formDataToSend)

      if (result.success) {
        toast.success('Paciente agregado exitosamente')
        setFormData({ nombre: '', tutorNombre: '', tutorEmail: '', tutorWhatsapp: '', fechaNac: '' })
        setOpen(false)
        // Refresh the page to show the new patient
        window.location.reload()
      } else {
        toast.error(result.error || 'Error al agregar paciente')
      }
    } catch (error) {
      toast.error('Error al agregar paciente')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Paciente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Paciente</DialogTitle>
          <DialogDescription>
            Completa los datos básicos del paciente para agregarlo a tu práctica.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre del Paciente</Label>
            <Input
              id="nombre"
              name="nombre"
              placeholder="Ej: Carlos López"
              value={formData.nombre}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tutorNombre">Nombre del Tutor/Padre</Label>
            <Input
              id="tutorNombre"
              name="tutorNombre"
              placeholder="Ej: María García"
              value={formData.tutorNombre}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tutorEmail">Email del Tutor</Label>
            <Input
              id="tutorEmail"
              name="tutorEmail"
              type="email"
              placeholder="correo@example.com"
              value={formData.tutorEmail}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tutorWhatsapp">WhatsApp del Tutor</Label>
            <Input
              id="tutorWhatsapp"
              name="tutorWhatsapp"
              placeholder="+54 9 11 1234-5678"
              value={formData.tutorWhatsapp}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fechaNac">Fecha de Nacimiento (Opcional)</Label>
            <Input
              id="fechaNac"
              name="fechaNac"
              type="date"
              value={formData.fechaNac}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Agregar Paciente'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function AddAppointmentModal() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pacientes, setPacientes] = useState([])
  const [servicios, setServicios] = useState([])
  const [formData, setFormData] = useState({
    pacienteId: '',
    servicioId: '',
    fecha: '',
    hora: '',
  })

  // Load pacientes and servicios when modal opens
  React.useEffect(() => {
    if (open) {
      loadData()
    }
  }, [open])

  const loadData = async () => {
    try {
      const [pacientesResult, serviciosResult] = await Promise.all([
        import('@/app/dashboard/pacientes/actions').then(m => m.getPacientes()),
        import('@/app/dashboard/configuracion/actions').then(m => m.getServicios())
      ])

      if (pacientesResult.success) {
        setPacientes(pacientesResult.data || [])
      }
      if (serviciosResult.success) {
        setServicios(serviciosResult.data || [])
      }
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('pacienteId', formData.pacienteId)
      formDataToSend.append('servicioId', formData.servicioId)
      
      // Combine fecha and hora into fechaHora
      const fechaHora = new Date(`${formData.fecha}T${formData.hora}`)
      formDataToSend.append('fechaHora', fechaHora.toISOString())

      const { crearTurno } = await import('@/app/dashboard/agenda/actions')
      const result = await crearTurno(formDataToSend)

      if (result.success) {
        toast.success('Turno creado exitosamente')
        setFormData({ pacienteId: '', servicioId: '', fecha: '', hora: '' })
        setOpen(false)
        // Refresh the page to show the new appointment
        window.location.reload()
      } else {
        toast.error(result.error || 'Error al crear turno')
      }
    } catch (error) {
      toast.error('Error al crear turno')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Turno
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agendar Nuevo Turno</DialogTitle>
          <DialogDescription>
            Crea un nuevo turno para uno de tus pacientes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pacienteId">Seleccionar Paciente</Label>
            <Select
              value={formData.pacienteId}
              onValueChange={(value) => setFormData(prev => ({ ...prev, pacienteId: value }))}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="-- Selecciona un paciente --" />
              </SelectTrigger>
              <SelectContent>
                {pacientes.map((paciente) => (
                  <SelectItem key={paciente.id} value={paciente.id}>
                    {paciente.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="servicioId">Tipo de Servicio</Label>
            <Select
              value={formData.servicioId}
              onValueChange={(value) => setFormData(prev => ({ ...prev, servicioId: value }))}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="-- Selecciona un servicio --" />
              </SelectTrigger>
              <SelectContent>
                {servicios.map((servicio) => (
                  <SelectItem key={servicio.id} value={servicio.id}>
                    {servicio.nombre} - ${servicio.precio}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fecha">Fecha</Label>
            <Input
              id="fecha"
              name="fecha"
              type="date"
              value={formData.fecha}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hora">Hora</Label>
            <Input
              id="hora"
              name="hora"
              type="time"
              value={formData.hora}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Agendando...
                </>
              ) : (
                'Agendar Turno'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
