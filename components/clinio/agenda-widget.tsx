import { Clock } from "lucide-react"

type Status = "Confirmado" | "Pendiente" | "En curso"

const appointments: {
  time: string
  name: string
  specialty: string
  status: Status
}[] = [
  { time: "08:30", name: "Martín Gómez", specialty: "Psicopedagogía", status: "Confirmado" },
  { time: "09:15", name: "Valentina Torres", specialty: "Fonoaudiología", status: "En curso" },
  { time: "10:00", name: "Lucas Fernández", specialty: "Psicopedagogía", status: "Confirmado" },
  { time: "11:30", name: "Camila Rivas", specialty: "Psicopedagogía", status: "Pendiente" },
  { time: "12:00", name: "Emilio Castillo", specialty: "Fonoaudiología", status: "Pendiente" },
  { time: "14:45", name: "Ana Belén Soto", specialty: "Psicopedagogía", status: "Confirmado" },
]

const statusConfig: Record<Status, { label: string; bg: string; color: string; dot: string }> = {
  Confirmado: {
    label: "Confirmado",
    bg: "oklch(0.92 0.06 162)",
    color: "oklch(0.35 0.12 162)",
    dot: "oklch(0.50 0.14 162)",
  },
  Pendiente: {
    label: "Pendiente",
    bg: "oklch(0.95 0.06 80)",
    color: "oklch(0.50 0.13 75)",
    dot: "oklch(0.65 0.15 78)",
  },
  "En curso": {
    label: "En curso",
    bg: "oklch(0.88 0.07 195)",
    color: "oklch(0.38 0.13 195)",
    dot: "oklch(0.52 0.13 195)",
  },
}

export function AgendaWidget() {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4 h-full"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "0 1px 4px oklch(0.22 0.06 210 / 0.06)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={16} strokeWidth={1.8} style={{ color: "var(--primary)" }} />
          <h2
            className="text-sm font-semibold"
            style={{
              fontFamily: "var(--font-heading), sans-serif",
              color: "var(--foreground)",
            }}
          >
            Agenda de Hoy
          </h2>
        </div>
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
        >
          14 turnos
        </span>
      </div>

      {/* Timeline */}
      <div className="flex flex-col gap-0 relative">
        {/* Vertical line */}
        <div
          className="absolute left-[35px] top-3 bottom-3 w-px"
          style={{ background: "var(--border)" }}
        />

        {appointments.map((appt, i) => {
          const cfg = statusConfig[appt.status]
          return (
            <div key={i} className="flex items-start gap-3 py-2.5">
              {/* Time */}
              <span
                className="w-[58px] shrink-0 text-right text-xs font-mono font-medium"
                style={{ color: "var(--muted-foreground)" }}
              >
                {appt.time}
              </span>

              {/* Dot */}
              <div className="relative z-10 mt-1 flex h-3 w-3 shrink-0 items-center justify-center">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: cfg.dot }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 items-center justify-between gap-2 min-w-0">
                <div className="min-w-0">
                  <p
                    className="truncate text-sm font-medium"
                    style={{ color: "var(--foreground)" }}
                  >
                    {appt.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {appt.specialty}
                  </p>
                </div>
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"
                  style={{ background: cfg.bg, color: cfg.color }}
                >
                  {cfg.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
