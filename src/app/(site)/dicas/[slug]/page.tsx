import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import { dicas, getDica } from "@/content/dicas"

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

  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl">
        <Image src={dica.image} alt={dica.imageAlt} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" placeholder="blur" priority />
      </div>
      <h1 className="mb-6 font-display text-3xl font-bold text-foreground sm:text-4xl">{dica.title}</h1>
      <div className="prose-site">{dica.content}</div>
      <Link href="/#dicas" className="mt-10 inline-flex items-center gap-2 font-semibold text-brand-400 hover:underline">
        <ArrowLeft className="size-4" /> Ver outras dicas
      </Link>
    </article>
  )
}
