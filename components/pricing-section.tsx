'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Mensual',
    price: '$20.000',
    currency: 'ARS',
    period: '/mes',
    description: 'Perfecto para comenzar',
    highlighted: true,
    badge: null,
    features: [
      'Agenda ilimitada',
      'Cobros directos',
      'Recordatorios automáticos',
      'Gestión de pacientes',
      'Soporte por email',
    ],
  },
  {
    name: 'Anual',
    price: '$200.000',
    currency: 'ARS',
    period: '/año',
    description: 'Ahorras 2 meses',
    highlighted: false,
    badge: {
      text: 'Ahorras 2 meses',
      color: 'bg-green-100 text-green-700',
    },
    features: [
      'Todo lo del plan mensual',
      'Facturación automática',
      'Reportes avanzados',
      'API personalizada',
      'Soporte prioritario 24/7',
    ],
  },
]

export function PricingSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Planes Simples y Transparentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tu práctica. Sin compromisos a largo plazo.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`border transition-all duration-300 hover:shadow-lg ${
                plan.highlighted
                  ? 'border-primary bg-gradient-to-br from-primary/5 to-primary/2 md:scale-105'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <CardHeader className="pb-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-foreground">
                        {plan.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-2">
                        {plan.description}
                      </p>
                    </div>
                    {plan.badge && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${plan.badge.color}`}>
                        {plan.badge.text}
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features List */}
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className={`w-full font-semibold ${
                    plan.highlighted
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      : 'border-primary text-primary bg-transparent hover:bg-primary/10'
                  }`}
                  variant={plan.highlighted ? 'default' : 'outline'}
                >
                  Comenzar con {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            ¿Preguntas sobre nuestros planes?{' '}
            <span className="text-primary font-semibold cursor-pointer hover:underline">
              Contacta con nuestro equipo
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
