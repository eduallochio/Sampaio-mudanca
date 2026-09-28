import type { Metadata } from "next"
import { Clock, ShieldCheck, WalletCards } from "lucide-react"
import { QuoteForm } from "@/components/site/quote-form"
import { Reveal } from "@/components/site/reveal"

export const metadata: Metadata = {
  title: "Solicite seu Orçamento",
  description:
    "Peça seu orçamento de mudança residencial ou comercial em Vila Velha e Grande Vitória. Preencha o formulário e receba uma proposta pelo WhatsApp.",
  alternates: { canonical: "/orcamento" },
}

const destaques = [
  { icon: Clock, text: "Leva menos de 3 minutos para preencher" },
  { icon: WalletCards, text: "Orçamento sem compromisso" },
  { icon: ShieldCheck, text: "Seus dados vão direto pro nosso WhatsApp" },
]

export default function OrcamentoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <Reveal as="div" className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Solicite seu Orçamento</h1>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-brand-400" />
        <p className="mt-4 text-muted">Preencha o formulário e receba uma proposta personalizada pelo WhatsApp.</p>
      </Reveal>

      <Reveal
        as="div"
        index={1}
        className="mb-10 flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 sm:flex-row sm:justify-center sm:gap-8"
      >
        {destaques.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center justify-center gap-2.5 text-sm text-muted sm:justify-start">
            <Icon className="size-5 shrink-0 text-brand-400" aria-hidden="true" />
            {text}
          </div>
        ))}
      </Reveal>

      <QuoteForm />
    </div>
  )
}
