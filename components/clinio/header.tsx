"use client"

import { Bell, Search } from "lucide-react"

export function Header() {
  return (
    <header
      className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 px-6"
      style={{
        background: "oklch(1 0 0 / 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Title */}
      <div>
        <h1
          className="text-xl font-semibold"
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            color: "var(--foreground)",
            letterSpacing: "-0.015em",
          }}
        >
          Panel General
        </h1>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          Miércoles, 2 de abril de 2025
        </p>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm"
          style={{
            background: "var(--muted)",
            border: "1px solid var(--border)",
            width: 220,
            color: "var(--muted-foreground)",
          }}
        >
          <Search size={15} strokeWidth={2} />
          <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Buscar paciente...
          </span>
        </div>

        {/* Notifications */}
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
          style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
        >
          <Bell size={17} strokeWidth={1.8} style={{ color: "var(--foreground)" }} />
          <span
            className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full"
            style={{ background: "var(--primary)" }}
          />
        </button>
      </div>
    </header>
  )
}
