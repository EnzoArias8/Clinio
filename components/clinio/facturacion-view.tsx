'use client'

import { useState } from 'react'
import { Download, CheckCircle, AlertCircle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface PrivatePatient {
  id: string
  name: string
  amount: string
  daysOverdue: number
  status: 'pending' | 'overdue'
}

interface ObraSocialBatch {
  id: string
  month: string
  sessions: number
  totalAmount: string
  status: 'ready' | 'partial'
}

const mockPrivatePatients: PrivatePatient[] = [
  { id: '1', name: 'Juan García', amount: '$1.500', daysOverdue: 0, status: 'pending' },
  { id: '2', name: 'María López', amount: '$2.250', daysOverdue: 15, status: 'overdue' },
  { id: '3', name: 'Carlos Rodríguez', amount: '$1.800', daysOverdue: 0, status: 'pending' },
  { id: '4', name: 'Ana Martínez', amount: '$1.500', daysOverdue: 8, status: 'overdue' },
  { id: '5', name: 'Laura González', amount: '$2.000', daysOverdue: 0, status: 'pending' },
]

const mockObrasSocialBatches: ObraSocialBatch[] = [
  { id: '1', month: 'Enero 2024', sessions: 42, totalAmount: '$105.000', status: 'ready' },
  { id: '2', month: 'Diciembre 2023', sessions: 38, totalAmount: '$95.000', status: 'ready' },
  { id: '3', month: 'Noviembre 2023', sessions: 41, totalAmount: '$102.500', status: 'partial' },
]

export function FacturacionView() {
  const [selectedTab, setSelectedTab] = useState('particulares')

  return (
    <div className="flex-1 p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          Facturación
        </h1>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Control de ingresos y gestión de cobranzas
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Ingresos del Mes */}
        <div className="rounded-2xl p-6" style={{
          background: 'white',
          border: '1px solid var(--border)',
        }}>
          <p className="text-sm font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>
            Ingresos del Mes
          </p>
          <p className="text-3xl font-bold mb-3" style={{ color: 'oklch(0.52 0.13 160)' }}>
            $28.750
          </p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            +12% vs. mes anterior
          </p>
        </div>

        {/* Pendiente de Cobro */}
        <div className="rounded-2xl p-6" style={{
          background: 'white',
          border: '1px solid var(--border)',
        }}>
          <p className="text-sm font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>
            Pendiente de Cobro
          </p>
          <p className="text-3xl font-bold mb-3" style={{ color: 'oklch(0.65 0.18 40)' }}>
            $9.050
          </p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            5 pacientes con deuda
          </p>
        </div>

        {/* Proyectado Mensual */}
        <div className="rounded-2xl p-6" style={{
          background: 'white',
          border: '1px solid var(--border)',
        }}>
          <p className="text-sm font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>
            Proyectado Mensual
          </p>
          <p className="text-3xl font-bold mb-3" style={{ color: 'oklch(0.55 0.05 210)' }}>
            $32.400
          </p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Estimado hasta fin de mes
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border p-6" style={{ borderColor: 'var(--border)' }}>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="mb-6" style={{
            background: 'var(--secondary)',
            padding: '4px',
            borderRadius: '10px',
          }}>
            <TabsTrigger
              value="particulares"
              style={{
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                color: selectedTab === 'particulares' ? 'white' : 'var(--muted-foreground)',
                background: selectedTab === 'particulares' ? 'var(--primary)' : 'transparent',
              }}
            >
              Particulares
            </TabsTrigger>
            <TabsTrigger
              value="obras-sociales"
              style={{
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                color: selectedTab === 'obras-sociales' ? 'white' : 'var(--muted-foreground)',
                background: selectedTab === 'obras-sociales' ? 'var(--primary)' : 'transparent',
              }}
            >
              Obras Sociales
            </TabsTrigger>
          </TabsList>

          {/* Particulares Tab */}
          <TabsContent value="particulares" className="mt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: 'var(--border)' }}>
                    <TableHead style={{ color: 'var(--muted-foreground)' }}>Paciente</TableHead>
                    <TableHead style={{ color: 'var(--muted-foreground)' }}>Monto</TableHead>
                    <TableHead style={{ color: 'var(--muted-foreground)' }}>Estado</TableHead>
                    <TableHead style={{ color: 'var(--muted-foreground)' }}>Días Vencidos</TableHead>
                    <TableHead style={{ color: 'var(--muted-foreground)' }}>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPrivatePatients.map((patient) => (
                    <TableRow key={patient.id} style={{ borderColor: 'var(--border)' }}>
                      <TableCell className="font-medium" style={{ color: 'var(--foreground)' }}>
                        {patient.name}
                      </TableCell>
                      <TableCell style={{ color: 'var(--foreground)' }}>
                        {patient.amount}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div style={{
                            color: patient.status === 'overdue' ? 'oklch(0.65 0.18 40)' : 'oklch(0.52 0.13 160)',
                          }}>
                            {patient.status === 'overdue' ? (
                              <AlertCircle size={16} />
                            ) : (
                              <CheckCircle size={16} />
                            )}
                          </div>
                          <span className="text-sm capitalize" style={{
                            color: patient.status === 'overdue' ? 'oklch(0.65 0.18 40)' : 'oklch(0.52 0.13 160)',
                          }}>
                            {patient.status === 'overdue' ? 'Vencido' : 'Pendiente'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell style={{
                        color: patient.daysOverdue > 0 ? 'oklch(0.65 0.18 40)' : 'var(--muted-foreground)',
                        fontWeight: patient.daysOverdue > 0 ? '600' : 'normal',
                      }}>
                        {patient.daysOverdue > 0 ? `${patient.daysOverdue} días` : '—'}
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
                          Registrar Pago
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Obras Sociales Tab */}
          <TabsContent value="obras-sociales" className="mt-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                Lotes mensuales de obras sociales
              </h3>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors" style={{
                color: 'white',
                background: 'var(--primary)',
              }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.opacity = '0.9'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.opacity = '1'
                }}
              >
                <Download size={16} />
                Exportar a Excel
              </button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: 'var(--border)' }}>
                    <TableHead style={{ color: 'var(--muted-foreground)' }}>Período</TableHead>
                    <TableHead style={{ color: 'var(--muted-foreground)' }}>Sesiones</TableHead>
                    <TableHead style={{ color: 'var(--muted-foreground)' }}>Monto Total</TableHead>
                    <TableHead style={{ color: 'var(--muted-foreground)' }}>Estado</TableHead>
                    <TableHead style={{ color: 'var(--muted-foreground)' }}>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockObrasSocialBatches.map((batch) => (
                    <TableRow key={batch.id} style={{ borderColor: 'var(--border)' }}>
                      <TableCell className="font-medium" style={{ color: 'var(--foreground)' }}>
                        {batch.month}
                      </TableCell>
                      <TableCell style={{ color: 'var(--foreground)' }}>
                        {batch.sessions}
                      </TableCell>
                      <TableCell style={{ color: 'var(--foreground)' }}>
                        {batch.totalAmount}
                      </TableCell>
                      <TableCell>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{
                          background: batch.status === 'ready' ? 'oklch(0.52 0.13 160 / 0.1)' : 'oklch(0.72 0.13 80 / 0.1)',
                          color: batch.status === 'ready' ? 'oklch(0.52 0.13 160)' : 'oklch(0.72 0.13 80)',
                        }}>
                          {batch.status === 'ready' ? 'Listo' : 'Parcial'}
                        </span>
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
                          Descargar
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
