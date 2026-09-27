import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = { title: "Política de Privacidade" }

export default function PoliticaDePrivacidade() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="mb-2 font-display text-3xl font-bold">Política de Privacidade</h1>
      <p className="mb-8 text-sm text-muted">
        <strong className="text-foreground">Última atualização:</strong> 27 de setembro de 2026
      </p>
      <div className="prose-site">
        <h2>1. Coleta de Informações</h2>
        <p>
          Coletamos informações pessoais que você nos fornece voluntariamente ao preencher o formulário de orçamento em
          nosso site, como nome, telefone, e-mail e endereços.
        </p>

        <h2>2. Uso das Informações</h2>
        <p>
          As informações coletadas são utilizadas exclusivamente para a finalidade de elaborar e enviar a proposta de
          orçamento solicitada e para nos comunicarmos com você a respeito do serviço de mudança.
        </p>

        <h2>3. Compartilhamento de Dados</h2>
        <p>
          Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para a execução do
          serviço contratado ou por exigência legal.
        </p>

        <h2>4. Seus Direitos (LGPD)</h2>
        <p>
          Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem o direito de solicitar o acesso, a
          correção, a portabilidade ou a exclusão de suas informações pessoais de nossos registros a qualquer momento.
          Para isso, entre em contato conosco pelos canais disponíveis no site.
        </p>

        <h2>5. Cookies</h2>
        <p>
          Nosso site pode utilizar cookies para melhorar a experiência do usuário e para fins de análise de tráfego.
        </p>
      </div>
      <Link href="/" className="mt-10 inline-flex items-center gap-2 font-semibold text-brand-400 hover:underline">
        <ArrowLeft className="size-4" /> Voltar para a página inicial
      </Link>
    </article>
  )
}
