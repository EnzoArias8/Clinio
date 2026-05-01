'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle, Clock } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface ObraSocial {
  id: string
  name: string
  activePacientes: number
  sessionValue: string
  submissionStatus: string
}

interface PendingAuth {
  id: string
  pacienteName: string
  obraSocial: string
  authNumber: string
  daysRemaining: number
}

const mockObras: ObraSocial[] = [
  { id: '1', name: 'OSDE', activePacientes: 12, sessionValue: '$2.500', submissionStatus: 'Cierre el día 25' },
  { id: '2', name: 'Sancor Salud', activePacientes: 8, sessionValue: '$2.200', submissionStatus: 'Presentado' },
  { id: '3', name: 'IAPOS', activePacientes: 5, sessionValue: '$1.800', submissionStatus: 'Cierre el día 30' },
  { id: '4', name: 'Jerárquicos', activePacientes: 3, sessionValue: '$2.100', submissionStatus: 'Pendiente' },
  { id: '5', name: 'Swiss Medical', activePacientes: 6, sessionValue: '$2.400', submissionStatus: 'Cierre el día 28' },
  { id: '6', name: 'Medicus', activePacientes: 4, sessionValue: '$1.950', submissionStatus: 'Presentado' },
]

const mockPendingAuths: PendingAuth[] = [
  { id: '1', pacienteName: 'Juan García', obraSocial: 'OSDE', authNumber: 'AUTH-12345', daysRemaining: 3 },
  { id: '2', pacienteName: 'María López', obraSocial: 'Sancor Salud', authNumber: 'AUTH-12346', daysRemaining: 7 },
  { id: '3', pacienteName: 'Carlos Rodríguez', obraSocial: 'IAPOS', authNumber: 'AUTH-12347', daysRemaining: 1 },
]

export function ObrasSocialesView() {
  return (
    <div className="flex-1 p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          Obras Sociales
        </h1>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Gestión de prestadores y seguimiento de presentaciones
        </p>
      </div>

      {/* Pending Authorizations Alert */}
      <div className="mb-8 p-6 rounded-2xl border-2" style={{
        background: 'oklch(1 0 0)',
        borderColor: 'oklch(0.72 0.13 80 / 0.3)',
      }}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <AlertCircle size={24} style={{ color: 'oklch(0.72 0.13 80)' }} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
              Autorizaciones Pendientes
            </h3>
            <div className="space-y-2">
              {mockPendingAuths.map((auth) => (
                <div key={auth.id} className="flex items-center justify-between text-sm p-3 rounded-lg" style={{
                  background: 'oklch(0.97 0.01 0 / 0.5)',
                }}>
                  <div>
                    <p className="font-medium" style={{ color: 'var(--foreground)' }}>
                      {auth.pacienteName}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                      {auth.obraSocial} • {auth.authNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold" style={{
                      color: auth.daysRemaining <= 3 ? 'oklch(0.65 0.18 40)' : 'var(--muted-foreground)'
                    }}>
                      {auth.daysRemaining} días
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Insurance Companies Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: 'var(--border)' }}>
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
          Prestadores
        </h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: 'var(--border)' }}>
                <TableHead style={{ color: 'var(--muted-foreground)' }}>Obra Social</TableHead>
                <TableHead style={{ color: 'var(--muted-foreground)' }}>Pacientes Activos</TableHead>
                <TableHead style={{ color: 'var(--muted-foreground)' }}>Valor Sesión Actual</TableHead>
                <TableHead style={{ color: 'var(--muted-foreground)' }}>Estado de Presentación</TableHead>
                <TableHead style={{ color: 'var(--muted-foreground)' }}>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockObras.map((obra) => {
                let statusIcon = null
                let statusColor = 'var(--muted-foreground)'

                if (obra.submissionStatus === 'Presentado') {
                  statusIcon = <CheckCircle size={16} />
                  statusColor = 'oklch(0.52 0.13 160)'
                } else if (obra.submissionStatus.includes('Cierre')) {
                  statusIcon = <Clock size={16} />
                  statusColor = 'oklch(0.72 0.13 80)'
                } else if (obra.submissionStatus === 'Pendiente') {
                  statusIcon = <AlertCircle size={16} />
                  statusColor = 'oklch(0.65 0.18 40)'
                }

                return (
                  <TableRow key={obra.id} style={{ borderColor: 'var(--border)' }}>
                    <TableCell className="font-semibold" style={{ color: 'var(--foreground)' }}>
                      {obra.name}
                    </TableCell>
                    <TableCell>
                      <span className="px-3 py-1 rounded-full text-sm font-medium" style={{
                        background: 'var(--secondary)',
                        color: 'var(--secondary-foreground)',
                      }}>
                        {obra.activePacientes}
                      </span>
                    </TableCell>
                    <TableCell style={{ color: 'var(--foreground)' }}>
                      {obra.sessionValue}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div style={{ color: statusColor }}>
                          {statusIcon}
                        </div>
                        <span className="text-sm" style={{ color: statusColor }}>
                          {obra.submissionStatus}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <button className="text-sm font-medium rounded-lg px-3 py-1 transition-colors" style={{
                        color: 'var(--primary)',
                        background: 'transparent',
                      }}
                        onMouseEnter={(e) => {
                          ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--secondary)'
                        }}
                        onMouseLeave={(e) => {
                          ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                        }}
                      >
                        Ver detalles
                      </button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
