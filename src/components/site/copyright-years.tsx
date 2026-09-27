"use client"

import { useSyncExternalStore } from "react"

const noop = () => () => {}

/**
 * Mostra "2025" ou "2025–2026" (ano de lançamento até o ano atual).
 * O site é estático (SSG): se só lêssemos `new Date()` durante a renderização,
 * o valor ficaria "congelado" no ano do último build até o próximo deploy.
 * useSyncExternalStore é o hook feito para isso — valor diferente entre o
 * snapshot do servidor (aqui, sempre `launchYear`, sem risco de mismatch de
 * hidratação) e o snapshot real do cliente (o ano atual do navegador).
 */
export function CopyrightYears({ launchYear }: { launchYear: number }) {
  const currentYear = useSyncExternalStore(
    noop,
    () => new Date().getFullYear(),
    () => launchYear,
  )

  return <>{currentYear > launchYear ? `${launchYear}–${currentYear}` : launchYear}</>
}
