"use client"

import Image, { type StaticImageData } from "next/image"
import { useEffect, useRef, useState } from "react"

/**
 * Foto real da equipe em ação para a seção "Conheça a Sampaio", com leve
 * zoom-out ao entrar na tela (efeito Ken Burns sutil) — combina com o
 * <Reveal> ao redor sem competir com ele.
 */
export function SobreFoto({ src, alt }: { src: StaticImageData; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
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
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 40vw, 90vw"
        placeholder="blur"
        className={`object-cover transition-transform duration-[1400ms] ease-out ${visible ? "scale-100" : "scale-110"}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>
  )
}
