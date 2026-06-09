'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { Check, AlertCircle, Info, AlertTriangle } from 'lucide-react'

export function ToastShowcase() {
  const { toast } = useToast()

  const handleSuccessToast = () => {
    toast({
      title: 'Éxito',
      description: '¡Paciente guardado con éxito!',
      variant: 'default',
    })
  }

  const handleErrorToast = () => {
    toast({
      title: 'Error',
      description: 'Falta completar el email',
      variant: 'destructive',
    })
  }

  const handleInfoToast = () => {
    toast({
      title: 'Información',
      description: 'Tu contraseña se actualizó correctamente',
      variant: 'default',
    })
  }

  const handleWarningToast = () => {
    toast({
      title: 'Advertencia',
      description: 'Este cambio afectará tu agenda',
      variant: 'destructive',
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Toast Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Las notificaciones toast aparecen en la esquina inferior derecha. Haz clic en los botones para verlas en acción.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={handleSuccessToast}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Mostrar Toast de Éxito
            </Button>

            <Button
              onClick={handleErrorToast}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Mostrar Toast de Error
            </Button>

            <Button
              onClick={handleInfoToast}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Info className="w-4 h-4 mr-2" />
              Mostrar Toast de Info
            </Button>

            <Button
              onClick={handleWarningToast}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Mostrar Toast de Advertencia
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Casos de Uso Reales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">✓ Al guardar un paciente</h3>
              <p className="text-sm text-green-800">¡Paciente guardado con éxito!</p>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">✗ Cuando falta un campo</h3>
              <p className="text-sm text-red-800">Falta completar el email</p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">ℹ Al cambiar contraseña</h3>
              <p className="text-sm text-blue-800">Tu contraseña se actualizó correctamente</p>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-900 mb-2">⚠ Cuando eliminas datos</h3>
              <p className="text-sm text-yellow-800">Este cambio afectará tu agenda</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Implementación</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto text-sm">
{`import { useToast } from '@/hooks/use-toast'

export function MyComponent() {
  const { toast } = useToast()

  const handleClick = () => {
    toast({
      title: 'Éxito',
      description: '¡Guardado correctamente!',
      variant: 'default', // or 'destructive'
    })
  }

  return <button onClick={handleClick}>Guardar</button>
}`}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
