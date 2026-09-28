import type { Metadata } from "next"
import { LegalPage } from "@/components/site/legal-page"

export const metadata: Metadata = {
  title: "Política de Privacidade",
  alternates: { canonical: "/politica-de-privacidade" },
}

const sections = [
  { id: "coleta", title: "1. Coleta de Informações" },
  { id: "uso", title: "2. Uso das Informações" },
  { id: "compartilhamento", title: "3. Compartilhamento de Dados" },
  { id: "lgpd", title: "4. Seus Direitos (LGPD)" },
  { id: "cookies", title: "5. Cookies" },
]

export default function PoliticaDePrivacidade() {
  return (
    <LegalPage title="Política de Privacidade" updatedAt="27 de setembro de 2026" sections={sections}>
      <h2 id="coleta">1. Coleta de Informações</h2>
      <p>
        Coletamos informações pessoais que você nos fornece voluntariamente ao preencher o formulário de orçamento em
        nosso site, como nome, telefone, e-mail e endereços.
      </p>

      <h2 id="uso">2. Uso das Informações</h2>
      <p>
        As informações coletadas são utilizadas exclusivamente para a finalidade de elaborar e enviar a proposta de
        orçamento solicitada e para nos comunicarmos com você a respeito do serviço de mudança.
      </p>

      <h2 id="compartilhamento">3. Compartilhamento de Dados</h2>
      <p>
        Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para a execução do
        serviço contratado ou por exigência legal.
      </p>

      <h2 id="lgpd">4. Seus Direitos (LGPD)</h2>
      <p>
        Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem o direito de solicitar o acesso, a
        correção, a portabilidade ou a exclusão de suas informações pessoais de nossos registros a qualquer momento.
        Para isso, entre em contato conosco pelos canais disponíveis no site.
      </p>

      <h2 id="cookies">5. Cookies</h2>
      <p>
        Nosso site pode utilizar cookies para melhorar a experiência do usuário e para fins de análise de tráfego.
      </p>
    </LegalPage>
  )
}
