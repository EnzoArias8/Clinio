"use client"

import { useEffect, useState } from "react"

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"pulse" | "logo" | "spinner" | "fade">("pulse")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("logo"), 600)
    const t2 = setTimeout(() => setPhase("spinner"), 1100)
    const t3 = setTimeout(() => setPhase("fade"), 2800)
    const t4 = setTimeout(() => onComplete(), 3400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-600 ${
        phase === "fade" ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: "var(--splash-bg)" }}
    >
      {/* Icon mark */}
      <div className="relative mb-6 flex items-center justify-center">
        {/* Pulsing ring */}
        <span
          className={`absolute rounded-full border-2 transition-all duration-1000 ${
            phase !== "pulse" ? "scale-150 opacity-0" : "scale-100 opacity-40"
          }`}
          style={{
            width: 96,
            height: 96,
            borderColor: "oklch(0.65 0.12 185)",
            animation: phase === "pulse" ? "clinio-pulse 1.2s ease-in-out infinite" : "none",
          }}
        />
        <span
          className={`absolute rounded-full border transition-all duration-1000 ${
            phase !== "pulse" ? "scale-150 opacity-0" : "scale-100 opacity-20"
          }`}
          style={{
            width: 128,
            height: 128,
            borderColor: "oklch(0.65 0.12 185)",
            animation: phase === "pulse" ? "clinio-pulse 1.2s ease-in-out 0.3s infinite" : "none",
          }}
        />

        {/* Core icon */}
        <div
          className={`relative z-10 flex items-center justify-center rounded-2xl transition-transform duration-700 ${
            phase === "pulse" ? "scale-95" : "scale-100"
          }`}
          style={{
            width: 72,
            height: 72,
            background: "oklch(0.52 0.13 195)",
            boxShadow: "0 0 40px oklch(0.52 0.13 195 / 0.45), 0 8px 24px oklch(0.22 0.07 210 / 0.5)",
          }}
        >
          <ClinioIcon />
        </div>
      </div>

      {/* Logo text */}
      <div
        className={`transition-all duration-700 ${
          phase === "pulse" ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
        }`}
      >
        <h1
          className="text-4xl font-bold tracking-tight"
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            color: "oklch(0.97 0.02 195)",
            letterSpacing: "-0.02em",
          }}
        >
          Clinio
        </h1>
        <p
          className="mt-1 text-center text-sm"
          style={{ color: "oklch(0.65 0.06 195)" }}
        >
          Gestión Profesional de Salud
        </p>
      </div>

      {/* Spinner */}
      <div
        className={`mt-10 transition-all duration-500 ${
          phase === "spinner" || phase === "fade" ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          className="animate-spin"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <circle
            cx="14"
            cy="14"
            r="11"
            stroke="oklch(0.40 0.06 200)"
            strokeWidth="2.5"
          />
          <path
            d="M14 3 A11 11 0 0 1 25 14"
            stroke="oklch(0.65 0.12 185)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <style>{`
        @keyframes clinio-pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.12); opacity: 0.15; }
        }
      `}</style>
    </div>
  )
}

function ClinioIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Medical cross */}
      <rect x="15" y="6" width="8" height="26" rx="3" fill="white" fillOpacity="0.95" />
      <rect x="6" y="15" width="26" height="8" rx="3" fill="white" fillOpacity="0.95" />
      {/* Book pages hint */}
      <path
        d="M10 28 Q19 24 28 28"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
    </svg>
  )
}
