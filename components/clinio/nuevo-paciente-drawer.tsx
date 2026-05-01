"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"

interface NuevoPacienteDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NuevoPacienteDrawer({ open, onOpenChange }: NuevoPacienteDrawerProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    fechaNacimiento: "",
    telefono: "",
    obraSocial: "",
    numeroAfiliado: "",
    motivoConsulta: "",
    derivadoPor: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log("Saving patient:", formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      nombre: "",
      dni: "",
      fechaNacimiento: "",
      telefono: "",
      obraSocial: "",
      numeroAfiliado: "",
      motivoConsulta: "",
      derivadoPor: "",
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg overflow-y-auto"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <SheetHeader className="pb-4 border-b" style={{ borderColor: "var(--border)" }}>
          <SheetTitle
            className="text-xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Nuevo Paciente
          </SheetTitle>
          <SheetDescription style={{ color: "var(--muted-foreground)" }}>
            Completa los datos para registrar un nuevo paciente
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 py-6 px-1">
          {/* Datos Personales Section */}
          <div className="flex flex-col gap-4">
            <h3
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--primary)" }}
            >
              Datos Personales
            </h3>
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="nombre"
                  className="text-sm font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  Nombre Completo
                </Label>
                <Input
                  id="nombre"
                  placeholder="Ej: Juan Pérez"
                  value={formData.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  className="rounded-xl"
                  style={{
                    background: "var(--background)",
                    borderColor: "var(--border)",
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="dni"
                    className="text-sm font-medium"
                    style={{ color: "var(--foreground)" }}
                  >
                    DNI
                  </Label>
                  <Input
                    id="dni"
                    placeholder="12345678"
                    value={formData.dni}
                    onChange={(e) => handleChange("dni", e.target.value)}
                    className="rounded-xl"
                    style={{
                      background: "var(--background)",
                      borderColor: "var(--border)",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="fechaNacimiento"
                    className="text-sm font-medium"
                    style={{ color: "var(--foreground)" }}
                  >
                    Fecha de Nacimiento
                  </Label>
                  <Input
                    id="fechaNacimiento"
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={(e) => handleChange("fechaNacimiento", e.target.value)}
                    className="rounded-xl"
                    style={{
                      background: "var(--background)",
                      borderColor: "var(--border)",
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="telefono"
                  className="text-sm font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  Teléfono
                </Label>
                <Input
                  id="telefono"
                  placeholder="11 2345-6789"
                  value={formData.telefono}
                  onChange={(e) => handleChange("telefono", e.target.value)}
                  className="rounded-xl"
                  style={{
                    background: "var(--background)",
                    borderColor: "var(--border)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px" style={{ background: "var(--border)" }} />

          {/* Cobertura Section */}
          <div className="flex flex-col gap-4">
            <h3
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--primary)" }}
            >
              Cobertura
            </h3>
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="obraSocial"
                  className="text-sm font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  Obra Social
                </Label>
                <Select
                  value={formData.obraSocial}
                  onValueChange={(value) => handleChange("obraSocial", value)}
                >
                  <SelectTrigger
                    id="obraSocial"
                    className="rounded-xl"
                    style={{
                      background: "var(--background)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <SelectValue placeholder="Seleccionar obra social" />
                  </SelectTrigger>
                  <SelectContent
                    className="rounded-xl"
                    style={{
                      background: "var(--card)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <SelectItem value="osde-210">OSDE 210</SelectItem>
                    <SelectItem value="osde-310">OSDE 310</SelectItem>
                    <SelectItem value="osde-410">OSDE 410</SelectItem>
                    <SelectItem value="swiss-medical">Swiss Medical</SelectItem>
                    <SelectItem value="galeno">Galeno</SelectItem>
                    <SelectItem value="medife">Medifé</SelectItem>
                    <SelectItem value="particular">Particular</SelectItem>
                    <SelectItem value="otra">Otra</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="numeroAfiliado"
                  className="text-sm font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  Número de Afiliado
                </Label>
                <Input
                  id="numeroAfiliado"
                  placeholder="Ej: 123456789-00"
                  value={formData.numeroAfiliado}
                  onChange={(e) => handleChange("numeroAfiliado", e.target.value)}
                  className="rounded-xl"
                  style={{
                    background: "var(--background)",
                    borderColor: "var(--border)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px" style={{ background: "var(--border)" }} />

          {/* Datos Clínicos Section */}
          <div className="flex flex-col gap-4">
            <h3
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--primary)" }}
            >
              Datos Clínicos
            </h3>
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="motivoConsulta"
                  className="text-sm font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  Motivo de Consulta
                </Label>
                <Textarea
                  id="motivoConsulta"
                  placeholder="Describe brevemente el motivo de la consulta..."
                  value={formData.motivoConsulta}
                  onChange={(e) => handleChange("motivoConsulta", e.target.value)}
                  className="rounded-xl min-h-[80px] resize-none"
                  style={{
                    background: "var(--background)",
                    borderColor: "var(--border)",
                  }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="derivadoPor"
                  className="text-sm font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  Derivado Por
                </Label>
                <Input
                  id="derivadoPor"
                  placeholder="Ej: Dr. García (Pediatra)"
                  value={formData.derivadoPor}
                  onChange={(e) => handleChange("derivadoPor", e.target.value)}
                  className="rounded-xl"
                  style={{
                    background: "var(--background)",
                    borderColor: "var(--border)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <SheetFooter
          className="flex-row gap-3 pt-4 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl font-medium"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="flex-1 rounded-xl font-semibold"
            style={{
              background: "var(--primary)",
              color: "white",
              boxShadow: "0 2px 8px oklch(0.52 0.13 195 / 0.25)",
            }}
          >
            Guardar Paciente
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
