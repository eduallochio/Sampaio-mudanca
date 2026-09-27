import type { Metadata } from "next"
import { QuoteForm } from "@/components/site/quote-form"

export const metadata: Metadata = {
  title: "Solicite seu Orçamento",
  description:
    "Peça seu orçamento de mudança residencial ou comercial em Vila Velha e Grande Vitória. Preencha o formulário e receba uma proposta pelo WhatsApp.",
}

export default function OrcamentoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Solicite seu Orçamento</h1>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-brand-400" />
        <p className="mt-4 text-muted">Preencha o formulário e receba uma proposta personalizada pelo WhatsApp.</p>
      </div>
      <QuoteForm />
    </div>
  )
}
