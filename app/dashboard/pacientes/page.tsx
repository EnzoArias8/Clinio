'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Users, Plus, Search, Mail, Phone } from 'lucide-react'
import { AddPatientModal } from '@/components/modals'
import { EmptyPatientsState } from '@/components/empty-states'
import { getPacientes } from './actions'

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const loadPacientes = async () => {
      try {
        const result = await getPacientes()
        if (result.success) {
          setPacientes(result.data || [])
        }
      } catch (error) {
        console.error('Error loading pacientes:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPacientes()
  }, [])

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.tutor?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Pacientes
          </h1>
          <p className="text-muted-foreground mt-2">
            Gestiona el registro de tus pacientes
          </p>
        </div>
        <AddPatientModal />
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar pacientes por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-border bg-background"
        />
      </div>

      {/* Patients Table */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Listado de Pacientes ({pacientes.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Cargando pacientes...</p>
            </div>
          ) : filteredPacientes.length === 0 ? (
            <div className="text-center py-12">
              <EmptyPatientsState />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Nombre</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Correo del Tutor</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">WhatsApp del Tutor</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Fecha de Nacimiento</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Estado</th>
                </tr>
              </thead>
              <tbody>
                {filteredPacientes.map((paciente) => (
                  <tr key={paciente.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="py-4 px-4">
                      <p className="font-medium text-foreground">{paciente.nombre}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{paciente.tutor?.email ?? 'N/A'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{paciente.tutor?.whatsapp ?? 'N/A'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-muted-foreground">
                        {paciente.fechaNac 
                          ? new Date(paciente.fechaNac).toLocaleDateString('es-AR')
                          : 'N/A'
                        }
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          paciente.activo !== false
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {paciente.activo !== false ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
