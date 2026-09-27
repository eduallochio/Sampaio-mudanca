"use client"

import Image, { type StaticImageData } from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

type Photo = { src: StaticImageData; alt: string }

export function Gallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const open = (i: number) => {
    setIndex(i)
    dialogRef.current?.showModal()
  }
  const close = useCallback(() => dialogRef.current?.close(), [])
  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    const onClose = () => setIndex(null)
    dialog.addEventListener("keydown", onKey)
    dialog.addEventListener("close", onClose)
    return () => {
      dialog.removeEventListener("keydown", onKey)
      dialog.removeEventListener("close", onClose)
    }
  }, [step])

  const current = index === null ? null : photos[index]

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {photos.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => open(i)}
            className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-border focus-visible:outline-2 focus-visible:outline-brand-400"
            aria-label={`Ampliar foto: ${p.alt}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              placeholder="blur"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/90"
        onClick={(e) => e.target === e.currentTarget && close()}
        aria-label="Visualizador de fotos"
      >
        {current && (
          <div className="relative flex h-dvh w-screen items-center justify-center p-4">
            <Image
              src={current.src}
              alt={current.alt}
              className="max-h-[85dvh] w-auto rounded-md object-contain"
              sizes="90vw"
            />
            <button type="button" onClick={close} aria-label="Fechar" className="absolute top-4 right-4 rounded-full bg-black/60 p-2 text-white">
              <X className="size-7" />
            </button>
            <button type="button" onClick={() => step(-1)} aria-label="Foto anterior" className="absolute left-2 rounded-full bg-black/60 p-2 text-white sm:left-6">
              <ChevronLeft className="size-8" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Próxima foto" className="absolute right-2 rounded-full bg-black/60 p-2 text-white sm:right-6">
              <ChevronRight className="size-8" />
            </button>
          </div>
        )}
      </dialog>
    </>
  )
}
