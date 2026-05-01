"use client"

import { useState } from "react"
import { Plus, Eye, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { NuevoPacienteDrawer } from "./nuevo-paciente-drawer"

// Sample patient data
const patients = [
  {
    id: 1,
    nombre: "Martina García",
    edad: 8,
    obraSocial: "OSDE 310",
    ultimaSesion: "28 Mar 2026",
  },
  {
    id: 2,
    nombre: "Tomás Rodríguez",
    edad: 12,
    obraSocial: "Swiss Medical",
    ultimaSesion: "25 Mar 2026",
  },
  {
    id: 3,
    nombre: "Lucía Fernández",
    edad: 6,
    obraSocial: "Galeno",
    ultimaSesion: "22 Mar 2026",
  },
  {
    id: 4,
    nombre: "Benjamín Martínez",
    edad: 10,
    obraSocial: "Medifé",
    ultimaSesion: "20 Mar 2026",
  },
  {
    id: 5,
    nombre: "Valentina López",
    edad: 9,
    obraSocial: "OSDE 210",
    ultimaSesion: "18 Mar 2026",
  },
  {
    id: 6,
    nombre: "Mateo Sánchez",
    edad: 7,
    obraSocial: "Particular",
    ultimaSesion: "15 Mar 2026",
  },
  {
    id: 7,
    nombre: "Isabella Pérez",
    edad: 11,
    obraSocial: "Swiss Medical",
    ultimaSesion: "12 Mar 2026",
  },
  {
    id: 8,
    nombre: "Santiago Gómez",
    edad: 5,
    obraSocial: "OSDE 410",
    ultimaSesion: "10 Mar 2026",
  },
]

export function PacientesView() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = patients.filter((p) =>
    p.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Mis Pacientes
          </h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Gestiona la información de tus pacientes
          </p>
        </div>
        <Button
          onClick={() => setDrawerOpen(true)}
          className="gap-2 rounded-xl font-semibold"
          style={{
            background: "var(--primary)",
            color: "white",
            boxShadow: "0 2px 8px oklch(0.52 0.13 195 / 0.25)",
          }}
        >
          <Plus size={18} strokeWidth={2} />
          Nuevo Paciente
        </Button>
      </div>

      {/* Search & Filters */}
      <div
        className="rounded-2xl border p-4"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <div className="relative max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--muted-foreground)" }}
          />
          <Input
            placeholder="Buscar paciente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-xl"
            style={{
              background: "var(--background)",
              borderColor: "var(--border)",
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <Table>
          <TableHeader>
            <TableRow
              style={{ background: "var(--muted)", borderColor: "var(--border)" }}
            >
              <TableHead
                className="font-semibold py-3 px-4"
                style={{ color: "var(--foreground)" }}
              >
                Nombre y Apellido
              </TableHead>
              <TableHead
                className="font-semibold py-3 px-4"
                style={{ color: "var(--foreground)" }}
              >
                Edad
              </TableHead>
              <TableHead
                className="font-semibold py-3 px-4"
                style={{ color: "var(--foreground)" }}
              >
                Obra Social
              </TableHead>
              <TableHead
                className="font-semibold py-3 px-4"
                style={{ color: "var(--foreground)" }}
              >
                Última Sesión
              </TableHead>
              <TableHead
                className="font-semibold py-3 px-4 text-right"
                style={{ color: "var(--foreground)" }}
              >
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow
                key={patient.id}
                className="transition-colors"
                style={{ borderColor: "var(--border)" }}
              >
                <TableCell className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                      style={{
                        background: "var(--secondary)",
                        color: "var(--primary)",
                      }}
                    >
                      {patient.nombre
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <span
                      className="font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      {patient.nombre}
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  className="py-3 px-4"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {patient.edad} años
                </TableCell>
                <TableCell className="py-3 px-4">
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{
                      background: "var(--accent)",
                      color: "var(--accent-foreground)",
                    }}
                  >
                    {patient.obraSocial}
                  </span>
                </TableCell>
                <TableCell
                  className="py-3 px-4"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {patient.ultimaSesion}
                </TableCell>
                <TableCell className="py-3 px-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 rounded-lg font-medium"
                    style={{ color: "var(--primary)" }}
                  >
                    <Eye size={15} />
                    Ver Ficha
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Empty state */}
        {filteredPatients.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full mb-3"
              style={{ background: "var(--muted)" }}
            >
              <Search size={20} style={{ color: "var(--muted-foreground)" }} />
            </div>
            <p
              className="font-medium"
              style={{ color: "var(--foreground)" }}
            >
              No se encontraron pacientes
            </p>
            <p
              className="text-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              Intenta con otro término de búsqueda
            </p>
          </div>
        )}
      </div>

      {/* Footer info */}
      <div
        className="text-sm"
        style={{ color: "var(--muted-foreground)" }}
      >
        Mostrando {filteredPatients.length} de {patients.length} pacientes
      </div>

      {/* New Patient Drawer */}
      <NuevoPacienteDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  )
}
