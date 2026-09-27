import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { ReactNode } from "react"
import { Reveal } from "./reveal"

export type LegalSection = { id: string; title: string }

/**
 * Layout compartilhado das páginas legais (Política de Privacidade, Termos de
 * Serviço): título, data de atualização, sumário com âncoras (some no mobile,
 * fica fixo na lateral em telas maiores) e conteúdo.
 */
export function LegalPage({
  title,
  updatedAt,
  sections,
  children,
}: {
  title: string
  updatedAt: string
  sections: LegalSection[]
  children: ReactNode
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <Reveal as="div" className="mb-10 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted">
          <strong className="text-foreground">Última atualização:</strong> {updatedAt}
        </p>
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Sumário" className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-border bg-surface p-5">
            <p className="mb-3 font-display text-sm font-semibold text-foreground">Nesta página</p>
            <ul className="space-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-muted hover:text-brand-400">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <article className="prose-site">{children}</article>
      </div>

      <Link href="/" className="mt-10 inline-flex items-center gap-2 font-semibold text-brand-400 hover:underline">
        <ArrowLeft className="size-4" /> Voltar para a página inicial
      </Link>
    </div>
  )
}
