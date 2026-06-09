'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Clock } from 'lucide-react'
import { toast } from 'sonner'
import { actualizarHorarios } from './actions'

const DIAS_SEMANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

interface HorarioFormProps {
  profesional: {
    id: string
    horarioInicio: string
    horarioFin: string
    diasAtencion?: string[]
    nombreSesion?: string
    duracionSesion?: number
    precioConsulta?: number
    fotoPerfil?: string
    horarioInicio2?: string
    horarioFin2?: string
  }
}

export function HorarioForm({ profesional }: HorarioFormProps) {
  const [loading, setLoading] = useState(false)
  const [diasAtencion, setDiasAtencion] = useState<string[]>(
    profesional.diasAtencion || ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
  )
  const [horarioInicio, setHorarioInicio] = useState(profesional.horarioInicio)
  const [horarioFin, setHorarioFin] = useState(profesional.horarioFin)
  const [horarioInicio2, setHorarioInicio2] = useState(profesional.horarioInicio2 || '')
  const [horarioFin2, setHorarioFin2] = useState(profesional.horarioFin2 || '')
  const [nombreSesion, setNombreSesion] = useState(profesional.nombreSesion || 'Consulta')
  const [duracionSesion, setDuracionSesion] = useState<number>(profesional.duracionSesion || 30)
  const [precioConsulta, setPrecioConsulta] = useState<number>(profesional.precioConsulta ?? 0)

  const toggleDia = (dia: string) => {
    setDiasAtencion(prev =>
      prev.includes(dia)
        ? prev.filter(d => d !== dia)
        : [...prev, dia]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (diasAtencion.length === 0) {
      toast.error('Debes seleccionar al menos un día de atención')
      return
    }

    setLoading(true)
    try {
      const result = await actualizarHorarios({
        horarioInicio,
        horarioFin,
        diasAtencion,
        nombreSesion,
        duracionSesion: duracionSesion,
        precioConsulta: precioConsulta,
        horarioInicio2: horarioInicio2 || undefined,
        horarioFin2: horarioFin2 || undefined,
      })

      if (result.success) {
        toast.success('Horarios actualizados correctamente')
      } else {
        toast.error(result.error || 'Error al actualizar horarios')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al actualizar horarios')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Horarios de Atención
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground">
              Días de Atención
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {DIAS_SEMANA.map(dia => (
                <label key={dia} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={diasAtencion.includes(dia)}
                    onChange={() => toggleDia(dia)}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">{dia}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Horario de Inicio
              </label>
              <Input
                type="time"
                value={horarioInicio}
                onChange={(e) => setHorarioInicio(e.target.value)}
                className="border-border bg-background"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Horario de Fin
              </label>
              <Input
                type="time"
                value={horarioFin}
                onChange={(e) => setHorarioFin(e.target.value)}
                className="border-border bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nombre del servicio/sesión</label>
              <Input value={nombreSesion} onChange={(e) => setNombreSesion(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Duración (minutos)</label>
              <select value={duracionSesion} onChange={(e) => setDuracionSesion(parseInt(e.target.value))} className="w-full border border-border rounded-md px-3 py-2 bg-background">
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={45}>45</option>
                <option value={60}>60</option>
                <option value={90}>90</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Precio</label>
              <div className="flex items-center gap-2">
                <span className="px-3 py-2 bg-muted/10 border border-border rounded-l-md">$</span>
                <Input type="number" value={precioConsulta} onChange={(e) => setPrecioConsulta(parseFloat(e.target.value || '0'))} className="rounded-l-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Turno Tarde - Inicio</label>
              <Input
                type="time"
                value={horarioInicio2}
                onChange={(e) => setHorarioInicio2(e.target.value)}
                className="border-border bg-background"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Turno Tarde - Fin</label>
              <Input
                type="time"
                value={horarioFin2}
                onChange={(e) => setHorarioFin2(e.target.value)}
                className="border-border bg-background"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {loading ? 'Guardando...' : 'Guardar Horarios'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
