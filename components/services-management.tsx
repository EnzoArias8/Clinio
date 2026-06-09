'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Trash2, Edit2, Clock, DollarSign, Loader2 } from 'lucide-react'
import { getServicios, crearServicio, eliminarServicio, editarServicio } from '@/app/dashboard/configuracion/actions'

interface Service {
  id: string
  nombre: string
  duracionMin: number
  precio: number
}

export function ServicesManagement() {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ nombre: '', duracionMin: '', precio: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [loadingServices, setLoadingServices] = useState(true)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const result = await getServicios()
      if (result.success) {
        setServices(result.data || [])
      }
    } catch (error) {
      toast.error('Error al cargar servicios')
    } finally {
      setLoadingServices(false)
    }
  }

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nombre || !formData.duracionMin || !formData.precio) {
      toast.error('Por favor completa todos los campos')
      return
    }

    setIsLoading(true)
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('nombre', formData.nombre)
      formDataToSend.append('duracionMin', formData.duracionMin)
      formDataToSend.append('precio', formData.precio)

      const result = await crearServicio(formDataToSend)

      if (result.success) {
        toast.success('Servicio creado exitosamente')
        setFormData({ nombre: '', duracionMin: '', precio: '' })
        setIsOpen(false)
        loadServices()
        router.refresh()
      } else {
        toast.error(result.error || 'Error al crear servicio')
      }
    } catch (error) {
      toast.error('Error al crear servicio')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditService = (service: Service) => {
    setEditingServiceId(service.id)
    setFormData({
      nombre: service.nombre,
      duracionMin: service.duracionMin.toString(),
      precio: service.precio.toString(),
    })
    setIsEditOpen(true)
  }

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nombre || !formData.duracionMin || !formData.precio || !editingServiceId) {
      toast.error('Por favor completa todos los campos')
      return
    }

    setIsLoading(true)
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('nombre', formData.nombre)
      formDataToSend.append('duracionMin', formData.duracionMin)
      formDataToSend.append('precio', formData.precio)

      const result = await editarServicio(editingServiceId, formDataToSend)

      if (result.success) {
        toast.success(result.message || 'Servicio actualizado exitosamente')
        setFormData({ nombre: '', duracionMin: '', precio: '' })
        setEditingServiceId(null)
        setIsEditOpen(false)
        loadServices()
        router.refresh()
      } else {
        toast.error(result.error || 'Error al actualizar servicio')
      }
    } catch (error) {
      toast.error('Error al actualizar servicio')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteService = async (id: string) => {
    const service = services.find(s => s.id === id)
    if (!service) return

    setIsLoading(true)
    try {
      const result = await eliminarServicio(id)
      if (result.success) {
        toast.success(result.message || 'Servicio eliminado exitosamente')
        loadServices()
        router.refresh()
      } else {
        toast.error(result.error || 'Error al eliminar servicio')
      }
    } catch (error) {
      toast.error('Error al eliminar servicio')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xl font-semibold">
          Servicios Disponibles
        </CardTitle>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Servicio
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Servicio</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Nombre del Servicio</label>
                <Input
                  placeholder="Ej: Sesión Semanal"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Duración (minutos)</label>
                  <Input
                    type="number"
                    placeholder="45"
                    value={formData.duracionMin}
                    onChange={(e) => setFormData({ ...formData, duracionMin: e.target.value })}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Precio (ARS)</label>
                  <Input
                    type="number"
                    placeholder="15000"
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creando...
                  </>
                ) : (
                  'Crear Servicio'
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {services.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No hay servicios creados aún</p>
            </div>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{service.nombre}</h3>
                  <div className="flex gap-6 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {service.duracionMin} min
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      ${(service.precio ?? 0).toLocaleString('es-AR')}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border hover:bg-secondary"
                    onClick={() => handleEditService(service)}
                    disabled={isLoading}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-200 hover:bg-red-50 text-red-600"
                    onClick={() => handleDeleteService(service.id)}
                    disabled={isLoading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>

      {/* Edit Service Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Servicio</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Nombre del Servicio</label>
              <Input
                placeholder="Ej: Sesión Semanal"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                disabled={isLoading}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Duración (minutos)</label>
                <Input
                  type="number"
                  placeholder="45"
                  value={formData.duracionMin}
                  onChange={(e) => setFormData({ ...formData, duracionMin: e.target.value })}
                  disabled={isLoading}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Precio (ARS)</label>
                <Input
                  type="number"
                  placeholder="15000"
                  value={formData.precio}
                  onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar Cambios'
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
