"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import {
  Check,
  Clock,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  User,
  Mail,
  Phone,
  Shield,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react"

type Step = 1 | 2 | 3 | 4

interface Service {
  id: string
  title: string
  description: string
  duration: string
  price: number
  popular?: boolean
}

const services: Service[] = [
  {
    id: "evaluacion",
    title: "Evaluación Inicial",
    description: "Primera consulta completa con diagnóstico y plan de trabajo personalizado.",
    duration: "60 min",
    price: 15000,
  },
  {
    id: "semanal",
    title: "Sesión Semanal",
    description: "Sesión de seguimiento semanal con plan de trabajo continuo.",
    duration: "45 min",
    price: 10000,
    popular: true,
  },
  {
    id: "intensiva",
    title: "Sesión Intensiva",
    description: "Sesión extendida para abordajes específicos o talleres temáticos.",
    duration: "90 min",
    price: 14000,
  },
]

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
]

const unavailableSlots = ["10:00", "16:00"]

const stepLabels = ["Servicio", "Fecha", "Datos", "Pago"]

function formatPrice(amount: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function ReservarPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [calendarMonth, setCalendarMonth] = useState(new Date())
  const [parentName, setParentName] = useState("")
  const [patientName, setPatientName] = useState("")
  const [email, setEmail] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const canProceedStep1 = !!selectedService
  const canProceedStep2 = !!selectedDate && !!selectedTime
  const canProceedStep3 = parentName && patientName && email && whatsapp

  const goToNext = () => {
    if (currentStep < 4) setCurrentStep((currentStep + 1) as Step)
  }

  const goToPrev = () => {
    if (currentStep > 1) setCurrentStep((currentStep - 1) as Step)
  }

  const handlePay = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
    }, 1800)
  }

  if (isComplete) {
    return <ConfirmationScreen service={selectedService!} date={selectedDate!} time={selectedTime!} />
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Top brand bar */}
      <div
        className="border-b"
        style={{ borderColor: "var(--border)", background: "var(--card)" }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: "var(--primary)" }}
            >
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-heading text-lg font-bold" style={{ color: "var(--foreground)" }}>
              Clinio
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
            <Shield size={14} />
            <span>Reserva segura</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-6 md:py-10">
        {/* Professional Header */}
        <header className="mb-8 flex flex-col items-center gap-4 text-center md:flex-row md:items-center md:gap-6 md:text-left">
          <div
            className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-4"
            style={{ ringColor: "var(--accent)" } as React.CSSProperties}
          >
            <Image
              src="/professional-placeholder.jpg"
              alt="Profesional"
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <div className="flex-1">
            <p
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--primary)" }}
            >
              Reserva tu sesión
            </p>
            <h1
              className="font-heading text-2xl font-bold md:text-3xl"
              style={{ color: "var(--foreground)" }}
            >
              Profesional de la Clínica
            </h1>
            <p className="text-sm md:text-base" style={{ color: "var(--muted-foreground)" }}>
              Psicopedagoga · Mat. Nac. 28.451
            </p>
            <p className="mt-1 text-pretty text-sm" style={{ color: "var(--muted-foreground)" }}>
              Acompañamiento profesional para niños y adolescentes en aprendizaje y desarrollo.
            </p>
          </div>
        </header>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} />

        {/* Step Content */}
        <div className="mt-8">
          {currentStep === 1 && (
            <ServiceStep
              services={services}
              selectedService={selectedService}
              onSelect={setSelectedService}
            />
          )}
          {currentStep === 2 && (
            <DateTimeStep
              calendarMonth={calendarMonth}
              setCalendarMonth={setCalendarMonth}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          )}
          {currentStep === 3 && (
            <PatientInfoStep
              parentName={parentName}
              setParentName={setParentName}
              patientName={patientName}
              setPatientName={setPatientName}
              email={email}
              setEmail={setEmail}
              whatsapp={whatsapp}
              setWhatsapp={setWhatsapp}
            />
          )}
          {currentStep === 4 && (
            <PaymentStep
              service={selectedService!}
              date={selectedDate!}
              time={selectedTime!}
              parentName={parentName}
              patientName={patientName}
              email={email}
              whatsapp={whatsapp}
              isProcessing={isProcessing}
              onPay={handlePay}
            />
          )}
        </div>

        {/* Navigation buttons */}
        {currentStep < 4 && (
          <div className="mt-8 flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              onClick={goToPrev}
              disabled={currentStep === 1}
              className="gap-2"
              style={{ color: "var(--muted-foreground)" }}
            >
              <ArrowLeft size={16} />
              Atrás
            </Button>
            <Button
              onClick={goToNext}
              disabled={
                (currentStep === 1 && !canProceedStep1) ||
                (currentStep === 2 && !canProceedStep2) ||
                (currentStep === 3 && !canProceedStep3)
              }
              className="gap-2"
              style={{ background: "var(--primary)", color: "white" }}
            >
              Continuar
              <ArrowRight size={16} />
            </Button>
          </div>
        )}

        {currentStep === 4 && (
          <div className="mt-6">
            <Button
              variant="ghost"
              onClick={goToPrev}
              className="gap-2"
              style={{ color: "var(--muted-foreground)" }}
            >
              <ArrowLeft size={16} />
              Volver a editar datos
            </Button>
          </div>
        )}

        {/* Trust footer */}
        <div className="mt-12 border-t pt-6 text-center" style={{ borderColor: "var(--border)" }}>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs" style={{ color: "var(--muted-foreground)" }}>
            <span className="flex items-center gap-1.5">
              <Shield size={12} />
              Pago seguro
            </span>
            <span>·</span>
            <span>Cancelación gratuita hasta 24hs antes</span>
            <span>·</span>
            <span>Confirmación inmediata</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- Progress Bar ---------------- */

function ProgressBar({ currentStep }: { currentStep: Step }) {
  return (
    <div className="flex items-center">
      {stepLabels.map((label, idx) => {
        const stepNum = idx + 1
        const isComplete = stepNum < currentStep
        const isActive = stepNum === currentStep
        const isLast = idx === stepLabels.length - 1

        return (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all"
                style={{
                  background: isComplete || isActive ? "var(--primary)" : "var(--muted)",
                  color: isComplete || isActive ? "white" : "var(--muted-foreground)",
                  boxShadow: isActive ? "0 0 0 4px oklch(0.52 0.13 195 / 0.15)" : "none",
                }}
              >
                {isComplete ? <Check size={16} strokeWidth={3} /> : stepNum}
              </div>
              <span
                className="hidden text-xs font-medium md:block"
                style={{
                  color: isActive
                    ? "var(--foreground)"
                    : isComplete
                      ? "var(--primary)"
                      : "var(--muted-foreground)",
                }}
              >
                {label}
              </span>
            </div>
            {!isLast && (
              <div
                className="-mt-6 mx-2 h-0.5 flex-1 transition-all md:mx-3"
                style={{
                  background: isComplete ? "var(--primary)" : "var(--muted)",
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ---------------- Step 1: Service ---------------- */

function ServiceStep({
  services,
  selectedService,
  onSelect,
}: {
  services: Service[]
  selectedService: Service | null
  onSelect: (s: Service) => void
}) {
  return (
    <div>
      <h2
        className="font-heading text-xl font-bold"
        style={{ color: "var(--foreground)" }}
      >
        Elegí el servicio
      </h2>
      <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
        Seleccioná el tipo de sesión que necesitás reservar.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {services.map((service) => {
          const isSelected = selectedService?.id === service.id
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelect(service)}
              className="text-left transition-all"
            >
              <Card
                className="relative overflow-hidden p-5 transition-all"
                style={{
                  background: "var(--card)",
                  borderColor: isSelected ? "var(--primary)" : "var(--border)",
                  borderWidth: "2px",
                  boxShadow: isSelected
                    ? "0 0 0 4px oklch(0.52 0.13 195 / 0.12)"
                    : "0 1px 2px oklch(0 0 0 / 0.04)",
                }}
              >
                {service.popular && (
                  <div
                    className="absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      background: "var(--accent)",
                      color: "var(--accent-foreground)",
                    }}
                  >
                    Más elegida
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all"
                    style={{
                      borderColor: isSelected ? "var(--primary)" : "var(--border)",
                      background: isSelected ? "var(--primary)" : "transparent",
                    }}
                  >
                    {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-heading text-base font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {service.description}
                    </p>
                    <div className="mt-3 flex items-center gap-4">
                      <span
                        className="flex items-center gap-1.5 text-xs"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        <Clock size={12} />
                        {service.duration}
                      </span>
                      <span
                        className="font-heading text-lg font-bold"
                        style={{ color: "var(--primary)" }}
                      >
                        {formatPrice(service.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ---------------- Step 2: Date & Time ---------------- */

function DateTimeStep({
  calendarMonth,
  setCalendarMonth,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}: {
  calendarMonth: Date
  setCalendarMonth: (d: Date) => void
  selectedDate: Date | null
  setSelectedDate: (d: Date) => void
  selectedTime: string | null
  setSelectedTime: (t: string) => void
}) {
  const year = calendarMonth.getFullYear()
  const month = calendarMonth.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const offset = firstDay === 0 ? 6 : firstDay - 1 // Mon-first
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const dayLabels = ["L", "M", "M", "J", "V", "S", "D"]

  const handlePrevMonth = () => {
    setCalendarMonth(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCalendarMonth(new Date(year, month + 1, 1))
  }

  return (
    <div>
      <h2
        className="font-heading text-xl font-bold"
        style={{ color: "var(--foreground)" }}
      >
        Elegí día y horario
      </h2>
      <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
        Estos son los horarios disponibles esta semana.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Calendar */}
        <Card className="p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={handlePrevMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[var(--muted)]"
              style={{ color: "var(--foreground)" }}
              aria-label="Mes anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <h3
              className="font-heading text-sm font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              {monthNames[month]} {year}
            </h3>
            <button
              onClick={handleNextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[var(--muted)]"
              style={{ color: "var(--foreground)" }}
              aria-label="Mes siguiente"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {dayLabels.map((d, i) => (
              <div
                key={i}
                className="py-1.5 text-[10px] font-semibold uppercase"
                style={{ color: "var(--muted-foreground)" }}
              >
                {d}
              </div>
            ))}
            {Array.from({ length: offset }).map((_, i) => (
              <div key={`offset-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const date = new Date(year, month, day)
              const isPast = date < today
              const isWeekend = date.getDay() === 0 || date.getDay() === 6
              const isDisabled = isPast || isWeekend
              const isSelected =
                selectedDate &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === month &&
                selectedDate.getFullYear() === year
              const isToday =
                today.getDate() === day &&
                today.getMonth() === month &&
                today.getFullYear() === year

              return (
                <button
                  key={day}
                  onClick={() => !isDisabled && setSelectedDate(date)}
                  disabled={isDisabled}
                  className="aspect-square rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: isSelected
                      ? "var(--primary)"
                      : isToday
                        ? "var(--accent)"
                        : "transparent",
                    color: isSelected
                      ? "white"
                      : isDisabled
                        ? "oklch(0.75 0.01 200)"
                        : isToday
                          ? "var(--accent-foreground)"
                          : "var(--foreground)",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    opacity: isDisabled ? 0.4 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isDisabled && !isSelected) {
                      ;(e.currentTarget as HTMLButtonElement).style.background = "var(--muted)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isDisabled && !isSelected && !isToday) {
                      ;(e.currentTarget as HTMLButtonElement).style.background = "transparent"
                    } else if (!isSelected && isToday) {
                      ;(e.currentTarget as HTMLButtonElement).style.background = "var(--accent)"
                    }
                  }}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </Card>

        {/* Time slots */}
        <Card className="p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h3
            className="font-heading text-sm font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            {selectedDate
              ? `Horarios disponibles · ${selectedDate.toLocaleDateString("es-AR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}`
              : "Horarios disponibles"}
          </h3>
          {!selectedDate ? (
            <div
              className="mt-6 flex flex-col items-center gap-2 rounded-lg py-10"
              style={{ background: "var(--muted)" }}
            >
              <CalendarIcon size={24} style={{ color: "var(--muted-foreground)" }} />
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                Primero seleccioná un día
              </p>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => {
                const isUnavailable = unavailableSlots.includes(slot)
                const isSelected = selectedTime === slot
                return (
                  <button
                    key={slot}
                    onClick={() => !isUnavailable && setSelectedTime(slot)}
                    disabled={isUnavailable}
                    className="rounded-lg border-2 py-2.5 text-sm font-semibold transition-all"
                    style={{
                      background: isSelected
                        ? "var(--primary)"
                        : isUnavailable
                          ? "var(--muted)"
                          : "var(--card)",
                      borderColor: isSelected
                        ? "var(--primary)"
                        : isUnavailable
                          ? "var(--border)"
                          : "var(--border)",
                      color: isSelected
                        ? "white"
                        : isUnavailable
                          ? "var(--muted-foreground)"
                          : "var(--foreground)",
                      cursor: isUnavailable ? "not-allowed" : "pointer",
                      opacity: isUnavailable ? 0.5 : 1,
                      textDecoration: isUnavailable ? "line-through" : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!isUnavailable && !isSelected) {
                        ;(e.currentTarget as HTMLButtonElement).style.borderColor = "var(--primary)"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isUnavailable && !isSelected) {
                        ;(e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"
                      }
                    }}
                  >
                    {slot}
                  </button>
                )
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

/* ---------------- Step 3: Patient Info ---------------- */

function PatientInfoStep({
  parentName,
  setParentName,
  patientName,
  setPatientName,
  email,
  setEmail,
  whatsapp,
  setWhatsapp,
}: {
  parentName: string
  setParentName: (v: string) => void
  patientName: string
  setPatientName: (v: string) => void
  email: string
  setEmail: (v: string) => void
  whatsapp: string
  setWhatsapp: (v: string) => void
}) {
  return (
    <div>
      <h2
        className="font-heading text-xl font-bold"
        style={{ color: "var(--foreground)" }}
      >
        Tus datos
      </h2>
      <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
        Necesitamos esta información para confirmar el turno.
      </p>

      <Card
        className="mt-6 p-6"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2 md:col-span-2">
            <Label htmlFor="parent" className="flex items-center gap-1.5 text-sm font-medium">
              <User size={14} style={{ color: "var(--muted-foreground)" }} />
              Nombre y apellido (responsable)
            </Label>
            <Input
              id="parent"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="Ej. Carolina Rodríguez"
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <Label htmlFor="patient" className="flex items-center gap-1.5 text-sm font-medium">
              <User size={14} style={{ color: "var(--muted-foreground)" }} />
              Nombre del paciente
            </Label>
            <Input
              id="patient"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Ej. Mateo Rodríguez"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="flex items-center gap-1.5 text-sm font-medium">
              <Mail size={14} style={{ color: "var(--muted-foreground)" }} />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="whatsapp" className="flex items-center gap-1.5 text-sm font-medium">
              <Phone size={14} style={{ color: "var(--muted-foreground)" }} />
              WhatsApp
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+54 9 11 1234-5678"
            />
          </div>
        </div>

        <div
          className="mt-5 flex gap-2 rounded-lg p-3 text-xs"
          style={{
            background: "var(--accent)",
            color: "var(--accent-foreground)",
          }}
        >
          <Shield size={14} className="mt-0.5 shrink-0" />
          <p className="text-pretty">
            Tus datos están protegidos. Los usaremos únicamente para gestionar el turno y enviarte
            recordatorios.
          </p>
        </div>
      </Card>
    </div>
  )
}

/* ---------------- Step 4: Payment ---------------- */

function PaymentStep({
  service,
  date,
  time,
  parentName,
  patientName,
  email,
  whatsapp,
  isProcessing,
  onPay,
}: {
  service: Service
  date: Date
  time: string
  parentName: string
  patientName: string
  email: string
  whatsapp: string
  isProcessing: boolean
  onPay: () => void
}) {
  return (
    <div>
      <h2
        className="font-heading text-xl font-bold"
        style={{ color: "var(--foreground)" }}
      >
        Resumen y pago
      </h2>
      <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
        Revisá los datos antes de confirmar el turno.
      </p>

      <Card
        className="mt-6 overflow-hidden p-0"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        {/* Summary */}
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3
              className="font-heading text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--muted-foreground)" }}
            >
              Detalle del turno
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            <SummaryRow
              icon={<Sparkles size={14} />}
              label="Servicio"
              value={`${service.title} · ${service.duration}`}
            />
            <SummaryRow
              icon={<CalendarIcon size={14} />}
              label="Fecha y hora"
              value={`${date.toLocaleDateString("es-AR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })} · ${time} hs`}
            />
            <SummaryRow
              icon={<User size={14} />}
              label="Paciente"
              value={patientName}
            />
            <SummaryRow
              icon={<User size={14} />}
              label="Responsable"
              value={parentName}
            />
            <SummaryRow icon={<Mail size={14} />} label="Email" value={email} />
            <SummaryRow icon={<Phone size={14} />} label="WhatsApp" value={whatsapp} />
          </div>
        </div>

        {/* Total */}
        <div
          className="border-t px-6 py-5"
          style={{ borderColor: "var(--border)", background: "var(--muted)" }}
        >
          <div className="flex items-center justify-between">
            <span
              className="font-heading text-base font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Total a pagar
            </span>
            <span
              className="font-heading text-2xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              {formatPrice(service.price)}
            </span>
          </div>
        </div>
      </Card>

      {/* Pay button */}
      <Button
        onClick={onPay}
        disabled={isProcessing}
        className="mt-6 h-14 w-full gap-3 text-base font-semibold"
        style={{
          background: "#00B1EA",
          color: "white",
        }}
      >
        {isProcessing ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Procesando pago...
          </>
        ) : (
          <>
            Pagar y Confirmar Turno
            <MercadoPagoLogo />
          </>
        )}
      </Button>

      <p
        className="mt-3 text-center text-xs"
        style={{ color: "var(--muted-foreground)" }}
      >
        Vas a ser redirigido a Mercado Pago para completar el pago de forma segura.
      </p>
    </div>
  )
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div
        className="flex items-center gap-2 text-sm"
        style={{ color: "var(--muted-foreground)" }}
      >
        {icon}
        {label}
      </div>
      <div
        className="text-right text-sm font-medium"
        style={{ color: "var(--foreground)" }}
      >
        {value}
      </div>
    </div>
  )
}

function MercadoPagoLogo() {
  return (
    <span className="flex items-center gap-1.5 rounded-md bg-white/15 px-2 py-1 text-[11px] font-bold uppercase tracking-wide">
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px]" style={{ color: "#00B1EA" }}>
        MP
      </span>
      Mercado Pago
    </span>
  )
}

/* ---------------- Confirmation ---------------- */

function ConfirmationScreen({
  service,
  date,
  time,
}: {
  service: Service
  date: Date
  time: string
}) {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: "var(--background)" }}
    >
      <Card
        className="w-full max-w-md overflow-hidden p-0"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div
          className="flex flex-col items-center gap-3 px-6 py-10 text-center"
          style={{ background: "var(--accent)" }}
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "var(--primary)" }}
          >
            <Check size={28} className="text-white" strokeWidth={3} />
          </div>
          <h2
            className="font-heading text-xl font-bold"
            style={{ color: "var(--accent-foreground)" }}
          >
            ¡Turno confirmado!
          </h2>
          <p className="text-sm" style={{ color: "var(--accent-foreground)" }}>
            Te enviamos los detalles por email y WhatsApp.
          </p>
        </div>
        <div className="p-6">
          <div className="flex flex-col gap-3 text-sm">
            <SummaryRow
              icon={<Sparkles size={14} />}
              label="Servicio"
              value={service.title}
            />
            <SummaryRow
              icon={<CalendarIcon size={14} />}
              label="Cuándo"
              value={`${date.toLocaleDateString("es-AR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })} · ${time} hs`}
            />
            <SummaryRow
              icon={<User size={14} />}
              label="Profesional"
              value="Profesional de la Clínica"
            />
          </div>
          <Button
            className="mt-6 w-full"
            style={{ background: "var(--primary)", color: "white" }}
            onClick={() => window.location.reload()}
          >
            Reservar otro turno
          </Button>
        </div>
      </Card>
    </div>
  )
}
