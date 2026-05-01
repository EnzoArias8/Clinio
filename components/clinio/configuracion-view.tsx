'use client'

import { useState } from 'react'
import { Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ConfiguracionView() {
  const [saved, setSaved] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'Dra. María López',
    specialty: 'Psicopedagoga',
    license: 'MP-45678',
  })

  const [scheduleData, setScheduleData] = useState({
    workingDays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    slotDuration: '45',
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const toggleDay = (day: string) => {
    setScheduleData(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }))
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          Configuración
        </h1>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Gestiona tu perfil profesional y preferencias
        </p>
      </div>

      {/* Save notification */}
      {saved && (
        <div className="mb-6 flex items-center gap-3 p-4 rounded-xl" style={{
          background: 'oklch(0.52 0.13 160 / 0.1)',
          borderLeft: '4px solid var(--primary)',
        }}>
          <Check size={20} style={{ color: 'var(--primary)' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--primary)' }}>
            Cambios guardados exitosamente
          </span>
        </div>
      )}

      <div className="space-y-8">
        {/* Perfil Profesional */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border" style={{ borderColor: 'var(--border)' }}>
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--foreground)' }}>
            Perfil Profesional
          </h2>
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                Nombre y Apellido
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border text-sm transition-colors"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                }}
              />
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                Especialidad
              </label>
              <select
                value={profileData.specialty}
                onChange={(e) => setProfileData({ ...profileData, specialty: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border text-sm transition-colors"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                }}
              >
                <option>Psicopedagoga</option>
                <option>Psicología</option>
                <option>Fonoaudiología</option>
                <option>Otro</option>
              </select>
            </div>

            {/* License */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                Número de Matrícula
              </label>
              <input
                type="text"
                value={profileData.license}
                onChange={(e) => setProfileData({ ...profileData, license: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border text-sm transition-colors"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Preferencias de Agenda */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border" style={{ borderColor: 'var(--border)' }}>
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--foreground)' }}>
            Preferencias de Agenda
          </h2>
          <div className="space-y-6">
            {/* Working Days */}
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: 'var(--foreground)' }}>
                Días de Trabajo
              </label>
              <div className="flex flex-wrap gap-2">
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className="px-4 py-2 rounded-lg font-medium text-sm transition-all"
                    style={{
                      background: scheduleData.workingDays.includes(day)
                        ? 'var(--primary)'
                        : 'var(--secondary)',
                      color: scheduleData.workingDays.includes(day)
                        ? 'white'
                        : 'var(--secondary-foreground)',
                    }}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Slot Duration */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                Duración de Sesiones (minutos)
              </label>
              <select
                value={scheduleData.slotDuration}
                onChange={(e) => setScheduleData({ ...scheduleData, slotDuration: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border text-sm transition-colors"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                }}
              >
                <option value="30">30 minutos</option>
                <option value="45">45 minutos</option>
                <option value="60">60 minutos</option>
                <option value="90">90 minutos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Suscripción Clinio */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border" style={{ borderColor: 'var(--border)' }}>
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--foreground)' }}>
            Suscripción Clinio
          </h2>
          <div className="space-y-6">
            {/* Plan Status */}
            <div className="flex items-start gap-4 p-6 rounded-xl" style={{
              background: 'oklch(0.52 0.13 195 / 0.05)',
              border: '2px solid var(--primary)',
            }}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block w-2 h-2 rounded-full" style={{ background: 'var(--primary)' }} />
                  <p className="font-semibold" style={{ color: 'var(--foreground)' }}>
                    Plan Profesional
                  </p>
                </div>
                <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
                  Acceso completo a todas las funciones de gestión de pacientes
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Check size={16} style={{ color: 'var(--primary)' }} />
                    <span style={{ color: 'var(--foreground)' }}>Hasta 50 pacientes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check size={16} style={{ color: 'var(--primary)' }} />
                    <span style={{ color: 'var(--foreground)' }}>Histórico de sesiones</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check size={16} style={{ color: 'var(--primary)' }} />
                    <span style={{ color: 'var(--foreground)' }}>Integración con obras sociales</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check size={16} style={{ color: 'var(--primary)' }} />
                    <span style={{ color: 'var(--foreground)' }}>Reportes de facturación</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Info */}
            <div className="p-6 rounded-xl" style={{ background: 'var(--secondary)' }}>
              <p className="text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                Próxima facturación
              </p>
              <p className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                $490/mes
              </p>
              <p className="text-xs mb-4" style={{ color: 'var(--muted-foreground)' }}>
                El 15 de febrero de 2024. Puedes cancelar en cualquier momento.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  Cambiar Plan
                </Button>
                <Button variant="outline" size="sm" className="text-destructive">
                  Cancelar Suscripción
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            style={{
              background: 'var(--primary)',
              color: 'white',
            }}
          >
            Guardar Cambios
          </Button>
          <Button variant="outline">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}
