import type { Metadata } from "next"
import { LegalPage } from "@/components/site/legal-page"

export const metadata: Metadata = { title: "Termos de Serviço" }

const sections = [
  { id: "aceitacao", title: "1. Aceitação dos Termos" },
  { id: "orcamentos", title: "2. Orçamentos e Contratação" },
  { id: "responsabilidades-cliente", title: "3. Responsabilidades do Cliente" },
  { id: "limitacoes", title: "4. Limitações de Responsabilidade" },
]

export default function TermosDeServico() {
  return (
    <LegalPage title="Termos de Serviço" updatedAt="27 de setembro de 2026" sections={sections}>
      <h2 id="aceitacao">1. Aceitação dos Termos</h2>
      <p>
        Ao solicitar um orçamento ou contratar nossos serviços, você concorda em cumprir os termos e condições aqui
        descritos.
      </p>

      <h2 id="orcamentos">2. Orçamentos e Contratação</h2>
      <p>
        Os orçamentos são baseados nas informações fornecidas pelo cliente. A contratação do serviço é formalizada
        mediante o pagamento de um sinal, conforme acordado na proposta.
      </p>

      <h2 id="responsabilidades-cliente">3. Responsabilidades do Cliente</h2>
      <p>
        O cliente é responsável por fornecer informações precisas sobre os itens a serem transportados e as condições
        dos endereços de origem e destino. É também responsável por desligar equipamentos eletrônicos e esvaziar
        geladeiras e freezers.
      </p>

      <h2 id="limitacoes">4. Limitações de Responsabilidade</h2>
      <p>
        Embora tomemos todo o cuidado, não nos responsabilizamos por danos a itens que não foram embalados por nossa
        equipe ou por danos preexistentes nos móveis. O transporte de joias, dinheiro e documentos pessoais é de
        inteira responsabilidade do cliente.
      </p>
    </LegalPage>
  )
}
