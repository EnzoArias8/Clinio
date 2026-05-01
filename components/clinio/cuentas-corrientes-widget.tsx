"use client"

import { useState } from "react"
import { Wallet, MessageCircle, ChevronRight } from "lucide-react"

const debtors = [
  { name: "Ariel Suárez", sessions: 6, balance: 42000, lastSession: "28 mar" },
  { name: "Nadia Herrera", sessions: 4, balance: 28000, lastSession: "25 mar" },
  { name: "Roberto Cabrera", sessions: 8, balance: 56000, lastSession: "20 mar" },
  { name: "Julieta Paz", sessions: 3, balance: 21000, lastSession: "18 mar" },
  { name: "Gonzalo Vidal", sessions: 5, balance: 37500, lastSession: "15 mar" },
]

export function CuentasCorrientesWidget() {
  const [sent, setSent] = useState<Record<number, boolean>>({})

  const handleSend = (idx: number) => {
    setSent((prev) => ({ ...prev, [idx]: true }))
  }

  const formatCurrency = (n: number) =>
    n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "0 1px 4px oklch(0.22 0.06 210 / 0.06)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet size={16} strokeWidth={1.8} style={{ color: "var(--primary)" }} />
          <h2
            className="text-sm font-semibold"
            style={{
              fontFamily: "var(--font-heading), sans-serif",
              color: "var(--foreground)",
            }}
          >
            Cuentas Corrientes
          </h2>
        </div>
        <button
          className="flex items-center gap-1 text-xs font-medium transition-colors"
          style={{ color: "var(--primary)" }}
        >
          Ver todos
          <ChevronRight size={13} strokeWidth={2.5} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl" style={{ border: "1px solid var(--border)" }}>
        {/* Table header */}
        <div
          className="grid grid-cols-[1fr_auto_auto] gap-3 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide"
          style={{
            background: "var(--muted)",
            color: "var(--muted-foreground)",
          }}
        >
          <span>Paciente</span>
          <span className="text-right">Saldo</span>
          <span className="text-right">Acción</span>
        </div>

        {/* Rows */}
        {debtors.map((d, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-4 py-3"
            style={{
              borderTop: i === 0 ? "none" : "1px solid var(--border)",
              background: i % 2 === 0 ? "var(--card)" : "oklch(0.985 0.005 195)",
            }}
          >
            {/* Name */}
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                {d.name}
              </p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                {d.sessions} sesiones · últ. {d.lastSession}
              </p>
            </div>

            {/* Balance */}
            <span
              className="rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{
                background: "oklch(0.96 0.04 30)",
                color: "oklch(0.48 0.18 30)",
              }}
            >
              {formatCurrency(d.balance)}
            </span>

            {/* Action */}
            <button
              onClick={() => handleSend(i)}
              disabled={sent[i]}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
              style={
                sent[i]
                  ? {
                      background: "oklch(0.92 0.06 162)",
                      color: "oklch(0.35 0.12 162)",
                      cursor: "default",
                    }
                  : {
                      background: "oklch(0.90 0.07 140)",
                      color: "oklch(0.30 0.12 145)",
                      cursor: "pointer",
                    }
              }
            >
              <MessageCircle size={13} strokeWidth={2} />
              {sent[i] ? "Enviado" : "WhatsApp"}
            </button>
          </div>
        ))}
      </div>

      {/* Total */}
      <div
        className="flex items-center justify-between rounded-xl px-4 py-3"
        style={{ background: "var(--muted)" }}
      >
        <span className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
          Total pendiente
        </span>
        <span
          className="text-base font-bold"
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            color: "oklch(0.45 0.18 30)",
          }}
        >
          {formatCurrency(debtors.reduce((s, d) => s + d.balance, 0))}
        </span>
      </div>
    </div>
  )
}
