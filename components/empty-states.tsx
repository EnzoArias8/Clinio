'use client'

import { Users, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EmptyPatientsState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-4">
        <Users className="w-8 h-8 text-slate-400" />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">
        Aún no tienes pacientes
      </h3>

      <p className="text-muted-foreground text-center max-w-sm mb-6">
        Comienza agregando pacientes a tu práctica para organizar sus citas y registros médicos.
      </p>

      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
        + Agregar Primer Paciente
      </Button>
    </div>
  )
}

export function EmptyAgendaState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-4">
        <Calendar className="w-8 h-8 text-slate-400" />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">
        Tu agenda está vacía
      </h3>

      <p className="text-muted-foreground text-center max-w-sm mb-6">
        No hay turnos programados para hoy. Comienza agregando tus primeros turnos.
      </p>

      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
        + Agendar Primer Turno
      </Button>
    </div>
  )
}

export function EmptySearchState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mb-3">
        <Users className="w-6 h-6 text-slate-400" />
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-1">
        No se encontraron resultados
      </h3>

      <p className="text-sm text-muted-foreground">
        Intenta con otro término de búsqueda
      </p>
    </div>
  )
}
