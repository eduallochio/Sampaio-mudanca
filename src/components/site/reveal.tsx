"use client"

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  /** Índice do item numa lista, para escalonar a animação em cascata (efeito dominó). */
  index?: number
  /** Atraso entre um item e o próximo da cascata, em ms. */
  stagger?: number
  as?: ElementType
  className?: string
}

/**
 * Anima a entrada de um elemento (fade + leve subida) quando ele entra na
 * viewport, uma única vez. Sem dependência externa: usa IntersectionObserver
 * e uma transição CSS. Respeita prefers-reduced-motion automaticamente,
 * porque a transição em si já é desligada via CSS global nesse caso.
 */
export function Reveal({ children, index = 0, stagger = 90, as: Tag = "div", className = "" }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const classes = ["reveal", visible && "reveal-visible", className].filter(Boolean).join(" ")

  return (
    <Tag ref={ref} className={classes} style={{ transitionDelay: visible ? `${index * stagger}ms` : "0ms" }}>
      {children}
    </Tag>
  )
}
