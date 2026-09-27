import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = { title: "Termos de Serviço" }

export default function TermosDeServico() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="mb-2 font-display text-3xl font-bold">Termos de Serviço</h1>
      <p className="mb-8 text-sm text-muted">
        <strong className="text-foreground">Última atualização:</strong> 27 de setembro de 2026
      </p>
      <div className="prose-site">
        <h2>1. Aceitação dos Termos</h2>
        <p>
          Ao solicitar um orçamento ou contratar nossos serviços, você concorda em cumprir os termos e condições aqui
          descritos.
        </p>

        <h2>2. Orçamentos e Contratação</h2>
        <p>
          Os orçamentos são baseados nas informações fornecidas pelo cliente. A contratação do serviço é formalizada
          mediante o pagamento de um sinal, conforme acordado na proposta.
        </p>

        <h2>3. Responsabilidades do Cliente</h2>
        <p>
          O cliente é responsável por fornecer informações precisas sobre os itens a serem transportados e as condições
          dos endereços de origem e destino. É também responsável por desligar equipamentos eletrônicos e esvaziar
          geladeiras e freezers.
        </p>

        <h2>4. Limitações de Responsabilidade</h2>
        <p>
          Embora tomemos todo o cuidado, não nos responsabilizamos por danos a itens que não foram embalados por nossa
          equipe ou por danos preexistentes nos móveis. O transporte de joias, dinheiro e documentos pessoais é de
          inteira responsabilidade do cliente.
        </p>
      </div>
      <Link href="/" className="mt-10 inline-flex items-center gap-2 font-semibold text-brand-400 hover:underline">
        <ArrowLeft className="size-4" /> Voltar para a página inicial
      </Link>
    </article>
  )
}
