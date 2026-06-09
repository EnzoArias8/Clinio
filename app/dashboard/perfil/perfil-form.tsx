'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User } from 'lucide-react'
import { toast } from 'sonner'
import { actualizarPerfil } from './actions'

interface PerfilFormProps {
  profesional: {
    id: string
    nombre: string
    especialidad: string
    fotoPerfil?: string
    email: string
    matricula?: string
  }
}

export function PerfilForm({ profesional }: PerfilFormProps) {
  const [loading, setLoading] = useState(false)
  const [nombre, setNombre] = useState(profesional.nombre)
  const [especialidad, setEspecialidad] = useState(profesional.especialidad)
  const [matricula, setMatricula] = useState(profesional.matricula || '')
  const [fotoPerfilBase64, setFotoPerfilBase64] = useState<string | undefined>(profesional.fotoPerfil)
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(profesional.fotoPerfil)

  // Comprimir imagen en cliente usando Canvas
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsImage = reader.readAsDataURL
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          // Redimensionar a máx 400px de ancho, manteniendo aspect ratio
          if (width > 400) {
            height = (height * 400) / width
            width = 400
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          if (!ctx) {
            reject(new Error('No se pudo obtener contexto de canvas'))
            return
          }

          ctx.drawImage(img, 0, 0, width, height)
          
          // Convertir a JPEG con calidad 0.7 para máxima compresión
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7)
          resolve(compressedBase64)
        }
        img.onerror = () => reject(new Error('Error cargando imagen'))
        img.src = e.target?.result as string
      }
      reader.onerror = () => reject(new Error('Error leyendo archivo'))
      reader.readAsDataURL(file)
    })
  }

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const compressedBase64 = await compressImage(file)
      setFotoPerfilBase64(compressedBase64)
      setPreviewUrl(compressedBase64)
      toast.success('Imagen comprimida exitosamente')
    } catch (error) {
      console.error('Error comprimiendo imagen:', error)
      toast.error('Error al procesar la imagen')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!nombre.trim() || !especialidad.trim()) {
      toast.error('Por favor completa todos los campos')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('nombre', nombre)
      formData.append('especialidad', especialidad)
      formData.append('matricula', matricula)
      if (fotoPerfilBase64) {
        formData.append('fotoPerfil', fotoPerfilBase64)
      }

      const result = await actualizarPerfil(formData)

      if (result.success) {
        toast.success('Perfil actualizado correctamente')
      } else {
        toast.error(result.error || 'Error al actualizar perfil')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al actualizar perfil')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Mi Perfil
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Preview */}
          <div className="flex justify-center">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="h-28 w-28 rounded-full object-cover border-2 border-border"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-muted border-2 border-border">
                <span className="text-3xl font-semibold text-muted-foreground">
                  {nombre.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </span>
              </div>
            )}
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Foto de perfil</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full border border-border rounded-md px-3 py-2 bg-background cursor-pointer"
            />
          </div>

          {/* Nombre */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Nombre Completo</label>
            <Input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Dr. Juan Pérez"
              className="border-border bg-background"
            />
          </div>

          {/* Especialidad */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Especialidad</label>
            <Input
              value={especialidad}
              onChange={(e) => setEspecialidad(e.target.value)}
              placeholder="Ej: Psicología Clínica"
              className="border-border bg-background"
            />
          </div>

          {/* Matrícula */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Matrícula</label>
            <Input
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              placeholder="Ej: MP-123456"
              className="border-border bg-background"
            />
          </div>

          {/* Email (read-only) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              value={profesional.email}
              readOnly
              className="border-border bg-muted"
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
