import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, ArrowRight, Clock } from "lucide-react"
import { dicas, getDica } from "@/content/dicas"
import { site } from "@/lib/site"

export function generateStaticParams() {
  return dicas.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: PageProps<"/dicas/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const dica = getDica(slug)
  if (!dica) return {}
  return { title: dica.title, description: dica.description }
}

export default async function DicaPage({ params }: PageProps<"/dicas/[slug]">) {
  const { slug } = await params
  const dica = getDica(slug)
  if (!dica) notFound()

  const outrasDicas = dicas.filter((d) => d.slug !== slug)

  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <Link href="/#dicas" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:underline">
        <ArrowLeft className="size-4" /> Ver outras dicas
      </Link>

      <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl">
        <Image src={dica.image} alt={dica.imageAlt} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" placeholder="blur" priority />
      </div>

      <div className="mb-4 flex items-center gap-2 text-sm text-muted">
        <Clock className="size-4" aria-hidden="true" />
        {dica.readingMinutes} min de leitura
      </div>

      <h1 className="mb-6 font-display text-3xl font-bold text-foreground sm:text-4xl">{dica.title}</h1>
      <div className="prose-site">{dica.content}</div>

      <div className="mt-12 rounded-xl border border-brand-400/30 bg-brand-900/30 p-6 text-center sm:p-8">
        <h2 className="font-display text-xl font-semibold text-foreground">Precisa de ajuda com sua mudança?</h2>
        <p className="mt-2 text-muted">A {site.shortName} cuida de tudo, do planejamento ao dia da mudança.</p>
        <Link
          href="/orcamento"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-highlight px-6 py-3 font-display font-semibold text-[#1a1a1a] transition hover:scale-105 hover:brightness-110"
        >
          Solicitar orçamento <ArrowRight className="size-4" />
        </Link>
      </div>

      {outrasDicas.length > 0 && (
        <div className="mt-14">
          <h2 className="mb-5 font-display text-lg font-semibold text-foreground">Continue lendo</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {outrasDicas.map((d) => (
              <Link
                key={d.slug}
                href={`/dicas/${d.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition hover:border-brand-400/60"
              >
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
                  <Image src={d.image} alt="" fill sizes="64px" className="object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="font-medium text-foreground group-hover:text-brand-400">{d.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
