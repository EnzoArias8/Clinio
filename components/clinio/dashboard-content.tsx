'use client'

import { StatCards } from "@/components/clinio/stat-cards"
import { AgendaWidget } from "@/components/clinio/agenda-widget"
import { ObrasSocialesWidget } from "@/components/clinio/obras-sociales-widget"
import { CuentasCorrientesWidget } from "@/components/clinio/cuentas-corrientes-widget"

export function DashboardContent() {
  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Stat row */}
      <StatCards />

      {/* Widget row 1: Agenda + Obras Sociales */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AgendaWidget />
        <ObrasSocialesWidget />
      </div>

      {/* Widget row 2: Cuentas Corrientes (full width) */}
      <CuentasCorrientesWidget />
    </div>
  )
}
