import { CalendarClock, UserPlus, Wallet, TrendingUp } from "lucide-react"

const stats = [
  {
    label: "Turnos Hoy",
    value: "14",
    sub: "3 pendientes de confirmación",
    icon: CalendarClock,
    iconBg: "oklch(0.88 0.06 195)",
    iconColor: "oklch(0.40 0.13 195)",
    trend: null,
  },
  {
    label: "Pacientes Nuevos (Mes)",
    value: "28",
    sub: "vs. 21 el mes anterior",
    icon: UserPlus,
    iconBg: "oklch(0.90 0.06 160)",
    iconColor: "oklch(0.38 0.12 160)",
    trend: "+33%",
    trendUp: true,
  },
  {
    label: "Cuentas Pendientes",
    value: "$184.500",
    sub: "8 pacientes con saldo",
    icon: Wallet,
    iconBg: "oklch(0.94 0.07 65)",
    iconColor: "oklch(0.52 0.14 60)",
    trend: null,
  },
]

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((s) => {
        const Icon = s.icon
        return (
          <div
            key={s.label}
            className="rounded-2xl p-5 flex flex-col gap-4"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              boxShadow: "0 1px 4px oklch(0.22 0.06 210 / 0.06)",
            }}
          >
            <div className="flex items-start justify-between">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: s.iconBg }}
              >
                <Icon size={20} style={{ color: s.iconColor }} strokeWidth={1.8} />
              </div>
              {s.trend && (
                <span
                  className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
                  style={{
                    background: s.trendUp ? "oklch(0.92 0.06 160)" : "oklch(0.94 0.07 30)",
                    color: s.trendUp ? "oklch(0.36 0.12 160)" : "oklch(0.45 0.18 30)",
                  }}
                >
                  <TrendingUp size={11} strokeWidth={2.5} />
                  {s.trend}
                </span>
              )}
            </div>
            <div>
              <p
                className="text-3xl font-bold tracking-tight"
                style={{
                  fontFamily: "var(--font-heading), sans-serif",
                  color: "var(--foreground)",
                  letterSpacing: "-0.03em",
                }}
              >
                {s.value}
              </p>
              <p className="mt-0.5 text-sm font-medium" style={{ color: "var(--foreground)" }}>
                {s.label}
              </p>
              <p className="mt-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
                {s.sub}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
