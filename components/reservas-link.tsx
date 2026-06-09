"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'

interface Props {
  link?: string | null
}

export default function ReservasLink({ link }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!link) return
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error copying link', err)
    }
  }

  return (
    <div className="mt-6 p-4 border border-border rounded-lg bg-muted/5">
      <h3 className="text-lg font-medium">Tu link de reservas</h3>
      {link ? (
        <div className="mt-3 flex gap-2 items-center">
          <input
            readOnly
            value={link}
            className="flex-1 bg-background border border-input rounded-md px-3 py-2 text-sm text-foreground"
            onFocus={(e) => (e.target as HTMLInputElement).select()}
          />
          <Button onClick={handleCopy} variant="default" size="sm">
            {copied ? 'Copiado' : 'Copiar link'}
          </Button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground mt-2">Aún no tienes un slug disponible.</p>
      )}
    </div>
  )
}
