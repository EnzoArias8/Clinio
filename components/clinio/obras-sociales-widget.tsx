import { AlertTriangle, ShieldCheck } from "lucide-react"

type AlertLevel = "alta" | "media"

const alerts: {
  name: string
  os: string
  message: string
  level: AlertLevel
}[] = [
  {
    name: "Sofía Rodríguez",
    os: "OSDE 410",
    message: "Requiere nueva autorización",
    level: "alta",
  },
  {
    name: "Tomás Navarro",
    os: "Swiss Medical",
    message: "Autorización vence en 3 días",
    level: "media",
  },
  {
    name: "Pilar Agüero",
    os: "Medifé",
    message: "Sesiones al límite del período",
    level: "alta",
  },
  {
    name: "Diego Morales",
    os: "Galeno",
    message: "Requiere nueva autorización",
    level: "alta",
  },
  {
    name: "Renata Blanco",
    os: "OSDE 210",
    message: "Datos de afiliado sin verificar",
    level: "media",
  },
]

const levelConfig: Record<AlertLevel, { bg: string; color: string; border: string }> = {
  alta: {
    bg: "oklch(0.97 0.04 30)",
    color: "oklch(0.52 0.18 30)",
    border: "oklch(0.85 0.08 30)",
  },
  media: {
    bg: "oklch(0.97 0.04 80)",
    color: "oklch(0.52 0.13 78)",
    border: "oklch(0.88 0.07 80)",
  },
}

export function ObrasSocialesWidget() {
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
          <ShieldCheck size={16} strokeWidth={1.8} style={{ color: "var(--primary)" }} />
          <h2
            className="text-sm font-semibold"
            style={{
              fontFamily: "var(--font-heading), sans-serif",
              color: "var(--foreground)",
            }}
          >
            Alertas Obras Sociales
          </h2>
        </div>
        <span
          className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{ background: "oklch(0.96 0.04 30)", color: "oklch(0.52 0.18 30)" }}
        >
          <AlertTriangle size={11} strokeWidth={2.5} />
          {alerts.filter((a) => a.level === "alta").length} críticas
        </span>
      </div>

      {/* Alert list */}
      <div className="flex flex-col gap-2">
        {alerts.map((alert, i) => {
          const cfg = levelConfig[alert.level]
          return (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl p-3"
              style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
            >
              <AlertTriangle
                size={15}
                strokeWidth={2}
                className="mt-0.5 shrink-0"
                style={{ color: cfg.color }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className="truncate text-sm font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {alert.name}
                  </p>
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{ background: "white", color: cfg.color }}
                  >
                    {alert.os}
                  </span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: cfg.color }}>
                  {alert.message}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
