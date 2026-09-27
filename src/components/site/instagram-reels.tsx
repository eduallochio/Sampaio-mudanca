import Image from "next/image"
import { Play } from "lucide-react"
import type { Reel } from "@/content/reels"

// Thumbnails estáticas com link para o Reel no Instagram, em vez do embed
// oficial (iframe pesado + layout shift enquanto carrega). O Instagram não
// oferece hoje uma forma de atualizar isso automaticamente sem integrar a
// Graph API (conta Business + backend); ver README para o plano dessa fase.
export function InstagramReels({ reels }: { reels: Reel[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {reels.map((r) => (
        <a
          key={r.id}
          href={`https://www.instagram.com/reel/${r.id}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-[9/16] overflow-hidden rounded-lg border border-border focus-visible:outline-2 focus-visible:outline-brand-400"
          aria-label={`Assistir reel no Instagram: ${r.alt}`}
        >
          <Image
            src={r.thumb}
            alt={r.alt}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/20" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid size-12 place-items-center rounded-full bg-white/90 text-brand-900 transition group-hover:scale-110">
              <Play className="size-6 fill-current" />
            </span>
          </div>
        </a>
      ))}
    </div>
  )
}
