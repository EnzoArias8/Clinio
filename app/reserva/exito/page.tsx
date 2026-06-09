import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Calendar, Clock, MapPin, Lock } from 'lucide-react'

export default function ExitoPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md border border-border shadow-lg">
        <CardContent className="pt-12 pb-8">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                ¡Turno Confirmado!
              </h1>
              <p className="text-muted-foreground">
                Tu cita ha sido reservada exitosamente
              </p>
            </div>

            <div className="w-full space-y-4 bg-secondary/30 rounded-lg p-4 my-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Fecha</p>
                  <p className="font-semibold text-foreground">15 de Mayo, 2024</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Hora</p>
                  <p className="font-semibold text-foreground">10:30 AM</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Profesional</p>
                  <p className="font-semibold text-foreground">Turno Confirmado</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 w-full">
              <p className="text-sm text-muted-foreground">
                Recibirás un recordatorio por correo y SMS antes de tu turno.
              </p>

              {/* Mercado Pago Payment Button */}
              <Button
                size="lg"
                className="w-full font-semibold text-white shadow-lg hover:shadow-xl transition-shadow"
                style={{
                  backgroundColor: '#009EE3',
                }}
              >
                <Lock className="w-4 h-4 mr-2" />
                Pagar Turno Ahora
              </Button>

              <Link href="/" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
