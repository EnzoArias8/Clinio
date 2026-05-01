"use client"

import { useState } from "react"
import { Eye, EyeOff, Stethoscope, Users, FileText, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function ClinioLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 bg-white/20 rounded-xl" />
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-2"
        >
          <path
            d="M20 4V36M4 20H36"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="20" cy="20" r="14" stroke="white" strokeWidth="2" opacity="0.4" />
        </svg>
      </div>
      <span className="text-3xl font-bold text-white tracking-tight">Clinio</span>
    </div>
  )
}

function AbstractPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07]"
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="1.5" fill="white" />
        </pattern>
        <pattern id="circles" width="120" height="120" patternUnits="userSpaceOnUse">
          <circle cx="60" cy="60" r="40" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="60" cy="60" r="25" stroke="white" strokeWidth="0.5" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <rect width="100%" height="100%" fill="url(#circles)" />
      {/* Floating organic shapes */}
      <ellipse cx="150" cy="200" rx="80" ry="50" fill="white" opacity="0.03" />
      <ellipse cx="650" cy="600" rx="100" ry="60" fill="white" opacity="0.03" />
      <ellipse cx="400" cy="100" rx="60" ry="40" fill="white" opacity="0.02" />
      <ellipse cx="700" cy="300" rx="90" ry="55" fill="white" opacity="0.02" />
    </svg>
  )
}

function FeatureItem({ icon: Icon, text }: { icon: typeof Stethoscope; text: string }) {
  return (
    <div className="flex items-center gap-3 text-white/90">
      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  )
}

export default function AuthPage({ onLogin }: { onLogin?: () => void } = {}) {
  const [showPassword, setShowPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onLogin?.()
  }

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onLogin?.()
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Teal Background with Pattern */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden bg-[oklch(0.22_0.07_210)]">
        <AbstractPattern />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16">
          {/* Logo */}
          <ClinioLogo />
          
          {/* Main Message */}
          <div className="flex-1 flex flex-col justify-center max-w-lg">
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
              Gestiona tu consultorio con facilidad
            </h1>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              La plataforma integral para profesionales de la salud y educación. 
              Simplifica tu práctica diaria y enfócate en lo que más importa: tus pacientes.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <FeatureItem icon={Calendar} text="Agenda inteligente" />
              <FeatureItem icon={Users} text="Gestión de pacientes" />
              <FeatureItem icon={FileText} text="Informes digitales" />
              <FeatureItem icon={Stethoscope} text="Obras sociales" />
            </div>
          </div>
          
          {/* Footer */}
          <p className="text-white/50 text-sm">
            Diseñado para psicopedagogos, psicólogos y fonoaudiólogos
          </p>
        </div>
        
        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[oklch(0.18_0.06_210)] to-transparent" />
      </div>
      
      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-primary/10 rounded-lg" />
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full p-2"
                >
                  <path
                    d="M20 4V36M4 20H36"
                    className="stroke-primary"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="20" cy="20" r="14" className="stroke-primary" strokeWidth="2" opacity="0.4" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-foreground tracking-tight">Clinio</span>
            </div>
          </div>
          
          <Card className="border-border/50 shadow-xl">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold text-center">Bienvenido</CardTitle>
              <CardDescription className="text-center">
                Accede a tu cuenta o crea una nueva
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                  <TabsTrigger value="register">Crear Cuenta</TabsTrigger>
                </TabsList>
                
                {/* Login Tab */}
                <TabsContent value="login">
                  <form className="space-y-4" onSubmit={handleLoginSubmit}>
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="login-email">Email</FieldLabel>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="tu@email.com"
                          className="h-11"
                        />
                      </Field>
                      
                      <Field>
                        <FieldLabel htmlFor="login-password">Contraseña</FieldLabel>
                        <div className="relative">
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="h-11 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </Field>
                    </FieldGroup>
                    
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        Olvidé mi contraseña
                      </button>
                    </div>
                    
                    <Button type="submit" className="w-full h-11 text-base font-semibold">
                      Iniciar Sesión
                    </Button>
                  </form>
                </TabsContent>
                
                {/* Register Tab */}
                <TabsContent value="register">
                  <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="register-name">Nombre y Apellido</FieldLabel>
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="María García"
                          className="h-11"
                        />
                      </Field>
                      
                      <Field>
                        <FieldLabel htmlFor="register-specialty">Especialidad</FieldLabel>
                        <Select>
                          <SelectTrigger id="register-specialty" className="h-11 w-full">
                            <SelectValue placeholder="Selecciona tu especialidad" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="psicopedagogia">Psicopedagogía</SelectItem>
                            <SelectItem value="psicologia">Psicología</SelectItem>
                            <SelectItem value="fonoaudiologia">Fonoaudiología</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                      
                      <Field>
                        <FieldLabel htmlFor="register-email">Email</FieldLabel>
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="tu@email.com"
                          className="h-11"
                        />
                      </Field>
                      
                      <Field>
                        <FieldLabel htmlFor="register-password">Contraseña</FieldLabel>
                        <div className="relative">
                          <Input
                            id="register-password"
                            type={showRegisterPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="h-11 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showRegisterPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <FieldDescription>
                          Mínimo 8 caracteres
                        </FieldDescription>
                      </Field>
                    </FieldGroup>
                    
                    <Button type="submit" className="w-full h-11 text-base font-semibold">
                      Crear Cuenta
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center leading-relaxed">
                      Al crear una cuenta, aceptas nuestros{" "}
                      <button type="button" className="text-primary hover:underline">
                        Términos de Servicio
                      </button>{" "}
                      y{" "}
                      <button type="button" className="text-primary hover:underline">
                        Política de Privacidad
                      </button>
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            ¿Necesitas ayuda?{" "}
            <button type="button" className="text-primary hover:underline font-medium">
              Contactar soporte
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
