"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  ShieldCheck,
  Receipt,
  Settings,
  LogOut,
} from "lucide-react"

export type NavItem = "dashboard" | "pacientes" | "agenda" | "obras-sociales" | "facturacion" | "configuracion"

const navItems: { icon: typeof LayoutDashboard; label: string; key: NavItem }[] = [
  { icon: LayoutDashboard, label: "Dashboard", key: "dashboard" },
  { icon: Users, label: "Pacientes", key: "pacientes" },
  { icon: CalendarDays, label: "Agenda", key: "agenda" },
  { icon: ShieldCheck, label: "Obras Sociales", key: "obras-sociales" },
  { icon: Receipt, label: "Facturación", key: "facturacion" },
  { icon: Settings, label: "Configuración", key: "configuracion" },
]

interface SidebarProps {
  activeItem?: NavItem
  onNavigate?: (item: NavItem) => void
  onLogout?: () => void
}

export function Sidebar({ activeItem = "dashboard", onNavigate, onLogout }: SidebarProps) {
  return (
    <aside
      className="fixed left-0 top-0 z-30 flex h-screen w-60 flex-col"
      style={{ background: "var(--sidebar)", borderRight: "1px solid var(--sidebar-border)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{ background: "var(--primary)" }}
        >
          <SidebarIcon />
        </div>
        <span
          className="text-xl font-bold tracking-tight"
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            color: "var(--sidebar-foreground)",
            letterSpacing: "-0.02em",
          }}
        >
          Clinio
        </span>
      </div>

      {/* Divider */}
      <div className="mx-5 mb-4 h-px" style={{ background: "var(--sidebar-border)" }} />

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {navItems.map(({ icon: Icon, label, key }) => {
          const isActive = activeItem === key
          return (
            <button
              key={key}
              onClick={() => onNavigate?.(key)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 text-left w-full",
                isActive
                  ? "text-white"
                  : "hover:text-white"
              )}
              style={
                isActive
                  ? {
                      background: "var(--sidebar-primary)",
                      color: "white",
                      boxShadow: "0 2px 8px oklch(0.52 0.13 195 / 0.35)",
                    }
                  : {
                      color: "oklch(0.72 0.04 200)",
                    }
              }
              onMouseEnter={(e) => {
                if (!isActive) {
                  ;(e.currentTarget as HTMLButtonElement).style.background = "var(--sidebar-accent)"
                  ;(e.currentTarget as HTMLButtonElement).style.color = "var(--sidebar-foreground)"
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  ;(e.currentTarget as HTMLButtonElement).style.background = "transparent"
                  ;(e.currentTarget as HTMLButtonElement).style.color = "oklch(0.72 0.04 200)"
                }
              }}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          )
        })}
      </nav>

      {/* User profile */}
      <div className="p-4 border-t" style={{ borderColor: "var(--sidebar-border)" }}>
        <div
          className="flex items-center gap-3 rounded-xl p-3 cursor-pointer transition-colors mb-3"
          style={{ background: "var(--sidebar-accent)" }}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
            style={{ background: "var(--primary)", color: "white" }}
          >
            DM
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold" style={{ color: "var(--sidebar-foreground)" }}>
              Dra. María López
            </p>
            <p className="truncate text-xs" style={{ color: "oklch(0.60 0.06 195)" }}>
              Psicopedagoga
            </p>
          </div>
          <Settings size={15} style={{ color: "oklch(0.55 0.05 200)" }} />
        </div>
        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 w-full rounded-xl px-3 py-2 text-sm font-medium transition-colors"
          style={{
            color: "oklch(0.72 0.04 200)",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = "var(--sidebar-accent)"
            ;(e.currentTarget as HTMLButtonElement).style.color = "var(--sidebar-foreground)"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = "transparent"
            ;(e.currentTarget as HTMLButtonElement).style.color = "oklch(0.72 0.04 200)"
          }}
        >
          <LogOut size={16} strokeWidth={2} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  )
}

function SidebarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="8" y="3" width="4" height="14" rx="1.5" fill="white" fillOpacity="0.95" />
      <rect x="3" y="8" width="14" height="4" rx="1.5" fill="white" fillOpacity="0.95" />
    </svg>
  )
}
