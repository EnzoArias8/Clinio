'use client'

import { useState } from 'react'
import { Logo } from '@/components/logo'

interface GlobalLoaderProps {
  isOpen: boolean
  message?: string
}

export function GlobalLoader({ isOpen, message = 'Procesando...' }: GlobalLoaderProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Semi-transparent white background */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />

      {/* Loader content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated pulsing logo */}
        <div className="animate-pulse">
          <Logo size={56} />
        </div>

        {/* Loading text */}
        <p className="text-lg font-medium text-foreground">
          {message}
        </p>

        {/* Animated dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
