'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { Footer } from '@/components/footer'

export default function LandingPage() {
  const [showPricing, setShowPricing] = useState(false)

  const handlePlanSelect = (plan: 'mensual' | 'anual') => {
    const url = `/registro?plan=${plan}`
    window.location.href = url
  }

  const scrollToPricing = () => {
    setShowPricing(true)
    const element = document.getElementById('pricing-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center space-y-12 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo className="w-32 h-32" />
          </div>
          
          {/* Brand Name */}
          <div className="mb-12">
            <h1 className="text-6xl font-bold text-blue-600 mb-4">
              Clinio
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              La plataforma inteligente para gestionar tu consulta médica
            </p>
          </div>

          {/* Main Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg"
              onClick={scrollToPricing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
            >
              Comenzar Ahora
            </Button>
            <Link href="/login">
              <Button 
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
              >
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-section" className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Elige tu Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comienza con el plan que mejor se adapte a tus necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plan Mensual */}
            <div className="rounded-2xl border-2 border-gray-200 p-8 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Plan Mensual
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$20.000</span>
                  <span className="text-xl text-gray-600"> ARS / mes</span>
                </div>
                <ul className="text-left space-y-3 mb-8 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Gestión completa de turnos
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Registro de pacientes ilimitado
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Agenda inteligente
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Soporte por email
                  </li>
                </ul>
                <Button 
                  onClick={() => handlePlanSelect('mensual')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                >
                  Elegir Plan
                </Button>
              </div>
            </div>

            {/* Plan Anual */}
            <div className="rounded-2xl border-2 border-blue-600 p-8 hover:shadow-xl transition-shadow relative">
              {/* Badge de ahorro */}
              <div className="absolute -top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                ¡Ahorras 2 meses!
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Plan Anual
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$200.000</span>
                  <span className="text-xl text-gray-600"> ARS / año</span>
                </div>
                <ul className="text-left space-y-3 mb-8 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Todo lo del plan mensual
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Reportes avanzados
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Integración con Mercado Pago
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Soporte prioritario
                  </li>
                </ul>
                <Button 
                  onClick={() => handlePlanSelect('anual')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                >
                  Elegir Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
