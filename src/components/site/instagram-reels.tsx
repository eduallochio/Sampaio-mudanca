"use client"

import Script from "next/script"
import { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
}

// Os embeds do Instagram são pesados: só carregamos o script quando a seção
// se aproxima da tela, em vez de logo na abertura da página.
export function InstagramReels({ reels }: { reels: string[] }) {
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
      { rootMargin: "400px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {reels.map((id) => (
        <blockquote
          key={id}
          className="instagram-media w-full max-w-[400px]! min-w-0! rounded-lg! border border-border bg-surface"
          data-instgrm-captioned
          data-instgrm-permalink={`https://www.instagram.com/reel/${id}/`}
          data-instgrm-version="14"
        >
          <a
            href={`https://www.instagram.com/reel/${id}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 text-center text-sm text-brand-400"
          >
            Ver este vídeo no Instagram
          </a>
        </blockquote>
      ))}
      {visible && (
        <Script
          src="https://www.instagram.com/embed.js"
          strategy="lazyOnload"
          onReady={() => window.instgrm?.Embeds.process()}
        />
      )}
    </div>
  )
}
