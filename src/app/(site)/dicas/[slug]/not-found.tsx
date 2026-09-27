import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-bold">Dica não encontrada</h1>
      <p className="mt-3 text-muted">Esse conteúdo não existe ou foi removido.</p>
      <Link href="/#dicas" className="mt-6 inline-block font-semibold text-brand-400 hover:underline">
        Ver todas as dicas
      </Link>
    </div>
  )
}
