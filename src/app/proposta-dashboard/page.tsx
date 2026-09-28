import type { Metadata } from "next"
import { Fraunces, Inter } from "next/font/google"
import "./proposta.css"

const fraunces = Fraunces({
  variable: "--font-pd-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
})

const inter = Inter({
  variable: "--font-pd-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Proposta — Dashboard Sampaio",
  description:
    "Proposta comercial do dashboard financeiro e operacional da Sampaio Fretes e Mudanças: escopo, cronograma, telas de exemplo e investimento.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/proposta-dashboard" },
  openGraph: {
    title: "Proposta — Dashboard Sampaio",
    description: "Escopo, cronograma e investimento do dashboard financeiro e operacional da Sampaio Fretes e Mudanças.",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Proposta — Dashboard Sampaio",
    description: "Escopo, cronograma e investimento do dashboard financeiro e operacional da Sampaio Fretes e Mudanças.",
  },
}

const contexto = [
  {
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </>
    ),
    title: "Planilha solta do resto",
    text: "O controle financeiro hoje é por planilha, sem ligação com o orçamento ou a mudança que gerou cada valor.",
  },
  {
    icon: (
      <>
        <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      </>
    ),
    title: "Agenda fora do sistema",
    text: "Mudanças marcadas de cabeça ou em bloco de notas, sem vínculo com o orçamento aprovado.",
  },
  {
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    title: "Ajudantes sem histórico",
    text: "Quem trabalhou em qual mudança e quanto recebeu não fica registrado em lugar nenhum.",
  },
  {
    icon: (
      <>
        <path d="M12 2 2 7l10 5 10-5-10-5Z" />
        <path d="m2 17 10 5 10-5M2 12l10 5 10-5" />
      </>
    ),
    title: "Depoimentos parados",
    text: 'A seção "clientes dizem" do site está pronta, esperando um jeito de coletar avaliação real.',
  },
]

const modulos = [
  {
    num: "01",
    title: "Orçamentos",
    text: "Todo pedido feito em /orcamento no site passa a salvar no banco antes de abrir o WhatsApp. Lista com status (novo, em negociação, aprovado, recusado) e botão para converter um orçamento aprovado direto em mudança agendada.",
    tags: ["Formulário público conectado", "Sem perder nenhum contato"],
  },
  {
    num: "02",
    title: "Agenda de mudanças",
    text: 'Lista das mudanças marcadas, com endereço de origem e destino, ajudantes escalados, valores e status (agendada, em andamento, concluída, cancelada). Botão "marcar concluída" libera o pedido de depoimento.',
    tags: ["Ligado ao orçamento", "Ligado ao depoimento"],
  },
  {
    num: "03",
    title: "Financeiro",
    text: "Entradas e saídas, contas a pagar e a receber com vencimento, filtro por período. Painel inicial mostra faturamento do mês, valores a receber e o resultado líquido, sem precisar abrir planilha.",
    tags: ["Visão do mês na tela inicial"],
  },
  {
    num: "04",
    title: "Ajudantes",
    text: "Cadastro de quem trabalha com você, valor de diária padrão (ajustável por mudança) e histórico de quantas mudanças cada um já fez.",
    tags: ["Diária editável por mudança"],
  },
  {
    num: "05",
    title: "Depoimentos",
    text: "Depois de marcar uma mudança como concluída, você gera um link exclusivo e manda pro cliente. Ele preenche nota e texto numa página simples; você aprova ou recusa. Aprovado, aparece sozinho no site — sem editar código.",
    tags: ["Link único por cliente", "Publica sozinho no site"],
  },
  {
    num: "06",
    title: "Fotos e vídeos do site",
    text: 'Uma tela no dashboard onde você troca as fotos e vídeos usados no site — banner, galeria, "Conheça a Sampaio" — sem precisar me acionar. Você sobe o arquivo, o site atualiza. A troca é manual, feita por você quando quiser.',
    tags: ["Upload manual", "Sem depender de programador"],
  },
  {
    num: "07",
    title: "Relatórios",
    text: "Telas com gráficos e números cruzando os módulos: quanto entrou e saiu por período, quantas mudanças por mês, quais ajudantes trabalharam mais, quantos orçamentos viraram mudança fechada. Filtro por data, exportação em PDF ou planilha.",
    tags: ["Gráficos e totais por período", "Exporta em PDF/planilha"],
  },
]

const telas = [
  {
    label: "Visão geral",
    desktop: "/proposta-dashboard/screens/overview.html",
    mobile: "/proposta-dashboard/screens/overview-mobile.html",
    caption: "Resumo do mês assim que você abre o dashboard. Clique numa tela pra ver em tamanho real.",
  },
  {
    label: "Financeiro",
    desktop: "/proposta-dashboard/screens/financeiro.html",
    mobile: "/proposta-dashboard/screens/financeiro-mobile.html",
    caption: "Entradas, saídas e contas por vencimento. Clique numa tela pra ver em tamanho real.",
  },
  {
    label: "Agenda",
    desktop: "/proposta-dashboard/screens/agenda.html",
    mobile: "/proposta-dashboard/screens/agenda-mobile.html",
    caption: "Cada mudança com status, ajudantes e ação de pedir depoimento ao concluir. Clique numa tela pra ver em tamanho real.",
  },
]

const cronograma = [
  {
    wk: "Semana 1",
    title: "Base de dados e login",
    text: "Conta no Supabase, todas as tabelas do sistema (clientes, orçamentos, mudanças, financeiro, ajudantes, depoimentos) e seu acesso protegido por senha.",
  },
  {
    wk: "Semanas 2–3",
    title: "Orçamentos e agenda",
    text: "Formulário do site passa a salvar no banco. Telas de lista e detalhe de orçamentos e mudanças, com a conversão de um no outro.",
  },
  {
    wk: "Semanas 4–5",
    title: "Financeiro e ajudantes",
    text: "Lançamentos manuais, contas a pagar/receber, painel inicial com os números do mês. Cadastro de ajudantes vinculado às mudanças.",
  },
  {
    wk: "Semanas 6–7",
    title: "Depoimentos",
    text: "Geração do link exclusivo, página pública de preenchimento, moderação no painel e exibição automática no site.",
  },
  {
    wk: "Semana 8",
    title: "Fotos e vídeos do site",
    text: "Tela de upload das imagens e vídeos usados no site, ligada às mesmas seções que hoje ficam fixas no código.",
  },
  {
    wk: "Semana 9",
    title: "Relatórios",
    text: "Gráficos e totais cruzando financeiro, mudanças e ajudantes, com filtro por período e exportação.",
  },
  {
    wk: "Semana 10",
    title: "Ajustes e entrega",
    text: "Revisão com você, ajustes de rota e uma passada de testes no celular antes da entrega final.",
  },
]

const inclusos = [
  "Os 7 módulos do escopo (seção 02), completos",
  "Banco de dados e hospedagem por 1 ano",
  "Login protegido, só você acessa",
  "Layout adaptado para celular",
  "Publicação em produção (Vercel)",
  "30 dias de ajustes pós-entrega",
]

export default function PropostaDashboardPage() {
  return (
    <div className={`proposta-dashboard-page ${fraunces.variable} ${inter.variable}`}>
      <div className="pd-page">
        <div className="pd-print-helper">
          <span>
            Para gerar o PDF: aperte <span className="pd-print-kbd">Ctrl</span> + <span className="pd-print-kbd">P</span> (ou{" "}
            <span className="pd-print-kbd">⌘</span> + <span className="pd-print-kbd">P</span> no Mac) e escolha{" "}
            <b>&quot;Salvar como PDF&quot;</b> no destino.
          </span>
        </div>

        <div className="pd-brand-row">
          <div className="pd-brand">
            <div className="pd-brand-mark">S</div>
            <div>
              <div className="pd-brand-name">Sampaio Fretes e Mudanças</div>
              <div className="pd-brand-sub">Vila Velha · ES</div>
            </div>
          </div>
          <div className="pd-doc-tag">Proposta comercial</div>
        </div>

        <div className="pd-hero">
          <div className="pd-hero-eyebrow">Fase 2 do projeto</div>
          <h1>Dashboard financeiro e operacional</h1>
          <p>
            Depois da migração do site para Next.js, o próximo passo é um painel só seu para acompanhar orçamentos,
            agenda de mudanças, financeiro e ajudantes — tudo no mesmo lugar, no lugar da planilha solta.
          </p>
          <div className="pd-hero-meta">
            <div>
              <span className="k">Prazo estimado</span>
              <span className="v">8 a 10 semanas</span>
            </div>
            <div>
              <span className="k">Acesso</span>
              <span className="v">Você, com login próprio</span>
            </div>
            <div>
              <span className="k">Uso principal</span>
              <span className="v">Celular, com suporte a computador</span>
            </div>
          </div>
        </div>

        <section className="pd-section">
          <div className="pd-section-head">
            <span className="pd-section-num">01 — Contexto</span>
            <h2 className="pd-section-title">O problema que o dashboard resolve</h2>
            <p className="pd-section-sub">
              Hoje o orçamento que vem do site só existe na conversa do WhatsApp. Se o cliente fecha a conversa,
              some. Não há um lugar único pra ver o que entrou, o que falta receber, quem vai ajudar em cada
              mudança, ou quanto sobrou no mês.
            </p>
          </div>
          <div className="pd-card pd-context-grid">
            {contexto.map((c) => (
              <div className="pd-context-item" key={c.title}>
                <div className="pd-context-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {c.icon}
                  </svg>
                </div>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pd-section">
          <div className="pd-section-head">
            <span className="pd-section-num">02 — Escopo</span>
            <h2 className="pd-section-title">O que entra no dashboard</h2>
            <p className="pd-section-sub">
              Sete áreas conectadas: o orçamento que chega vira mudança agendada, a mudança gera lançamento
              financeiro e ajudante escalado, a mudança concluída libera o pedido de depoimento, as fotos e vídeos
              do site ficam sob seu controle direto, e relatórios cruzam todos esses dados pra você enxergar o
              negócio inteiro.
            </p>
          </div>
          <div className="pd-modules">
            {modulos.map((m) => (
              <div className="pd-module" key={m.num}>
                <div className="pd-module-num">{m.num}</div>
                <div className="pd-module-body">
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                  <div className="pd-module-tags">
                    {m.tags.map((t) => (
                      <span className="pd-tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pd-section">
          <div className="pd-section-head">
            <span className="pd-section-num">03 — Visual</span>
            <h2 className="pd-section-title">Como as telas devem ficar</h2>
            <p className="pd-section-sub">
              Três áreas do dashboard já com layout desenhado, pra você visualizar como fica na prática. O visual
              final é construído durante o projeto, mas a ideia de organização e informação é essa.
            </p>
          </div>
          <div className="pd-preview-note">Telas ilustrativas, feitas para esta proposta — não são recortes do sistema pronto.</div>
          <div className="pd-preview-scroll">
            {telas.map((t) => (
              <div className="pd-preview-card" key={t.label}>
                <div className="pd-preview-chrome">
                  <span />
                  <span />
                  <span />
                  <span className="lbl">{t.label}</span>
                </div>
                <div className="pd-preview-pair">
                  <a className="pd-preview-frame-link pd-preview-frame-desktop" href={t.desktop} target="_blank" rel="noopener noreferrer">
                    <div className="pd-preview-frame-wrap">
                      <iframe src={t.desktop} loading="lazy" title={`${t.label} — computador`} />
                    </div>
                    <span className="pd-preview-open-badge">Abrir em tamanho real ↗</span>
                  </a>
                  <a className="pd-preview-frame-link pd-preview-frame-mobile" href={t.mobile} target="_blank" rel="noopener noreferrer">
                    <div className="pd-preview-frame-wrap">
                      <iframe src={t.mobile} loading="lazy" title={`${t.label} — celular`} />
                    </div>
                  </a>
                </div>
                <div className="pd-preview-labels">
                  <span className="desktop-lbl">Computador</span>
                  <span className="mobile-lbl">Celular</span>
                </div>
                <div className="pd-preview-caption">
                  <h3>{t.label === "Agenda" ? "Agenda de mudanças" : t.label}</h3>
                  <p>{t.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pd-section">
          <div className="pd-section-head">
            <span className="pd-section-num">04 — Cronograma</span>
            <h2 className="pd-section-title">Como o projeto é entregue</h2>
            <p className="pd-section-sub">
              Em blocos, na ordem em que cada parte destrava a próxima. Você acompanha em produção a cada entrega,
              não só no final.
            </p>
          </div>
          <div className="pd-card">
            <div className="pd-timeline">
              {cronograma.map((c, i) => (
                <div className="pd-tl-row" key={c.wk}>
                  <div className="pd-tl-rail">
                    <div className="pd-tl-dot" />
                    {i < cronograma.length - 1 && <div className="pd-tl-line" />}
                  </div>
                  <div className="pd-tl-content">
                    <span className="wk">{c.wk}</span>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pd-section">
          <div className="pd-section-head">
            <span className="pd-section-num">05 — Investimento</span>
            <h2 className="pd-section-title">Valor e condições</h2>
          </div>

          <div className="pd-invest-card">
            <div className="pd-invest-total">
              <span className="label">Pacote fechado · fases 1 a 7</span>
              <span className="amount tabular">R$ 6.500</span>
            </div>

            <div className="pd-split-row">
              <div className="pd-split-item">
                <div>
                  <div className="name">Entrada</div>
                  <div className="when">Para iniciar o projeto</div>
                </div>
                <div className="val tabular">R$ 3.250</div>
              </div>
              <div className="pd-split-item">
                <div>
                  <div className="name">Entrega final</div>
                  <div className="when">Na aprovação do dashboard em produção</div>
                </div>
                <div className="val tabular">R$ 3.250</div>
              </div>
            </div>

            <div className="pd-includes">
              <span className="pd-includes-title">O que está incluído</span>
              <div className="pd-inc-list">
                {inclusos.map((item) => (
                  <div className="pd-inc-item" key={item}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <p className="pd-invest-note">
              Banco de dados e hospedagem ficam nas suas próprias contas (Supabase e Vercel) e o custo entra neste
              valor pelo primeiro ano. Depois disso, a renovação é direto com esses provedores — dentro do uso deste
              projeto, tende a caber no plano gratuito de ambos.
            </p>
          </div>
        </section>

        <section className="pd-section pd-approval">
          <h2>De acordo</h2>
          <p>
            Esta proposta é válida por 15 dias a partir da data de envio. Para iniciar, basta a confirmação por
            WhatsApp — o registro abaixo é só para ficar guardado com os dois.
          </p>
          <div className="pd-sign-row">
            <div className="pd-sign-box">
              <div className="who">Sampaio Fretes e Mudanças</div>
              <div className="role">Contratante</div>
              <div className="date">Data: _____ / _____ / _______</div>
            </div>
            <div className="pd-sign-box">
              <div className="who">Eduardo Allochio</div>
              <div className="role">Desenvolvedor</div>
              <div className="date">Data: _____ / _____ / _______</div>
            </div>
          </div>
        </section>

        <footer className="pd-footer">Proposta preparada para a Sampaio Fretes e Mudanças · Vila Velha, ES</footer>
      </div>
    </div>
  )
}
