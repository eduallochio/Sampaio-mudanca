import Link from "next/link"
import { ArrowLeft, FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <div className="mb-5 grid size-16 place-items-center rounded-full bg-surface text-brand-400">
        <FileQuestion className="size-8" aria-hidden="true" />
      </div>
      <h1 className="font-display text-2xl font-bold text-foreground">Dica não encontrada</h1>
      <p className="mt-3 text-muted">Esse conteúdo não existe ou foi removido.</p>
      <Link
        href="/#dicas"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-highlight px-6 py-3 font-display font-semibold text-[#1a1a1a] transition hover:scale-105 hover:brightness-110"
      >
        <ArrowLeft className="size-4" /> Ver todas as dicas
      </Link>
    </div>
  )
}
