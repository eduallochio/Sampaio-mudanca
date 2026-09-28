import Image, { getImageProps } from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import {
  Banknote,
  Boxes,
  Building2,
  Calendar,
  Camera,
  CreditCard,
  Clock,
  HandCoins,
  Hourglass,
  MapPin,
  MessageSquareQuote,
  Phone,
  QrCode,
  Recycle,
  Truck,
  Wrench,
} from "lucide-react"
import bannerDesktop from "@/assets/banner.jpg"
import bannerMobile from "@/assets/banner-mobile.jpg"
import logoTransparente from "@/assets/logo-transparente.png"
import { dicas } from "@/content/dicas"
import { galeria } from "@/content/galeria"
import { reels } from "@/content/reels"
import { Gallery } from "@/components/site/gallery"
import { InstagramReels } from "@/components/site/instagram-reels"
import { InstagramIcon, WhatsAppIcon } from "@/components/site/brand-icons"
import { CoverageMap } from "@/components/site/coverage-map"
import { Reveal } from "@/components/site/reveal"
import { instagramUrl, site, whatsappUrl } from "@/lib/site"

const servicos = [
  {
    icon: Boxes,
    title: "Embalagem Profissional",
    text: "Utilizamos materiais de alta qualidade, como plástico bolha, caixas de papelão reforçadas e caixas-cabideiro, para proteger cada um dos seus pertences, dos mais robustos aos mais frágeis.",
  },
  {
    icon: Wrench,
    title: "Desmontagem e Montagem",
    text: "Nossa equipe é experiente na desmontagem e montagem de todos os tipos de móveis. Cuidamos de cada parafuso para que seus móveis cheguem e sejam montados perfeitamente no novo lar.",
  },
  {
    icon: Truck,
    title: "Transporte Seguro",
    text: "Nossos caminhões-baú são limpos e equipados para o transporte seguro. Acomodamos sua mudança de forma organizada para evitar avarias, seja na Grande Vitória ou para outros estados.",
  },
  {
    icon: Building2,
    title: "Mudanças Comerciais",
    text: "Planejamos e executamos mudanças de escritórios e espaços comerciais com agilidade e organização para minimizar o impacto nas suas operações.",
  },
]

const formasPagamento = [
  { icon: QrCode, label: "Pix" },
  { icon: Banknote, label: "Transferência" },
  { icon: Banknote, label: "Dinheiro" },
  { icon: CreditCard, label: "Cartão" },
]

const etapasPagamento = [
  {
    icon: HandCoins,
    title: "Sinal",
    text: "Equivalente a 1 hora de serviço, pago no agendamento para garantir sua data.",
  },
  {
    icon: Wrench,
    title: "Durante a mudança",
    text: "Horas excedentes ao previsto são cobradas ao final do serviço, sem surpresas.",
  },
  {
    icon: CreditCard,
    title: "Restante",
    text: "Pago ao término da mudança, direto com a equipe (Pix, transferência, dinheiro ou cartão).",
  },
]

const informacoes = [
  { icon: Calendar, text: "Iniciamos as mudanças entre 08:00 e 08:30 da manhã." },
  { icon: Recycle, text: "Ao término, recolhemos materiais reutilizáveis (manta bolha, caixas-cabideiro)." },
  { icon: Hourglass, text: "Recomendamos agendar com 15 dias de antecedência, especialmente em fins de semana." },
]

const faq = [
  {
    q: "Com quanta antecedência devo agendar minha mudança?",
    a: "Recomendamos que o agendamento seja feito com pelo menos 15 dias de antecedência, especialmente para mudanças em fins de semana ou feriados. Isso garante a disponibilidade da nossa equipe e um planejamento mais tranquilo.",
  },
  {
    q: "Vocês fazem mudanças para outros estados?",
    a: "Sim! Realizamos mudanças interestaduais para todo o Brasil. O orçamento para essas mudanças é personalizado e leva em conta a distância, o volume de itens e as particularidades da rota.",
  },
  {
    q: "O que não está incluso no serviço padrão?",
    a: "Nosso serviço padrão não inclui a instalação de eletrodomésticos (como TVs em painéis e máquinas de lavar), instalação de cortinas, prateleiras ou a organização de itens pessoais dentro de armários. O foco é no transporte e montagem da estrutura principal da sua casa.",
  },
  {
    q: "Preciso estar em casa no dia da mudança?",
    a: "Sim, é importante que você ou alguém de confiança esteja presente para acompanhar a equipe, indicar como deseja embalar os itens e conferir a carga antes da saída.",
  },
  {
    q: "E se algum item quebrar ou for danificado?",
    a: "Nossa equipe é treinada para embalar e transportar com cuidado. Itens embalados por nós têm cobertura em caso de dano durante o transporte; recomendamos registrar fotos antes da mudança e comunicar qualquer avaria assim que perceber.",
  },
  {
    q: "Vocês atendem aos finais de semana e feriados?",
    a: "Sim, atendemos sábados, domingos e feriados. Como a procura é maior nesses dias, o agendamento antecipado é ainda mais importante para garantir sua data.",
  },
  {
    q: "Posso remarcar ou cancelar minha mudança?",
    a: "Sim, entre em contato conosco com antecedência para remarcar sua data sem custo adicional. Em caso de cancelamento, consulte as condições sobre o sinal já pago.",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: site.name,
  url: site.url,
  image: `${site.url}/opengraph-image.jpg`,
  telephone: `+${site.whatsapp}`,
  taxID: site.cnpj,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    addressCountry: "BR",
  },
  areaServed: ["Vila Velha", "Vitória", "Serra", "Cariacica", "Guarapari", "Brasil"],
  sameAs: [instagramUrl],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "12:00" },
  ],
  mainEntityOfPage: {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Reveal as="div" className="mx-auto mb-10 max-w-2xl text-center">
      <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
      <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-brand-400" />
      {subtitle && <p className="mt-4 text-muted">{subtitle}</p>}
    </Reveal>
  )
}

function Section({ id, alt, children }: { id?: string; alt?: boolean; children: ReactNode }) {
  return (
    <section id={id} className={`py-16 sm:py-20 ${alt ? "bg-background-alt" : ""}`}>
      <div className="mx-auto max-w-6xl px-4">{children}</div>
    </section>
  )
}

function Hero() {
  const common = { alt: "Sampaio Fretes e Mudanças — tudo o que você precisa está aqui", sizes: "100vw" }
  const { props: { srcSet: desktop } } = getImageProps({ ...common, src: bannerDesktop })
  const { props: { srcSet: mobile, ...rest } } = getImageProps({ ...common, src: bannerMobile, preload: true })
  return (
    <section id="inicio" aria-label="Banner">
      <picture>
        <source media="(min-width: 768px)" srcSet={desktop} width={bannerDesktop.width} height={bannerDesktop.height} />
        <source srcSet={mobile} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt vem de getImageProps */}
        <img {...rest} className="h-auto w-full" />
      </picture>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <Hero />

      <section className="relative overflow-hidden bg-brand-900 py-14 text-center">
        {/* Textura sutil de fundo para não ficar um azul chapado */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        <Reveal as="div" className="relative mx-auto max-w-4xl px-4">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Fretes e Mudanças em Vila Velha com Segurança
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            Mudanças residenciais e comerciais em Vila Velha, na Grande Vitória e para todo o Brasil.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/orcamento"
              className="rounded-lg bg-highlight px-6 py-3 font-display font-semibold text-[#1a1a1a] transition hover:scale-105 hover:brightness-110"
            >
              Solicite seu orçamento online
            </Link>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-white/80 px-6 py-3 font-display font-semibold text-white transition hover:scale-105 hover:bg-white/10"
            >
              <WhatsAppIcon className="size-5" /> {site.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </section>

      <Section id="servicos">
        <SectionTitle
          title="Nossos Serviços"
          subtitle="Entenda como cuidamos de cada etapa da sua mudança para garantir sua total tranquilidade e segurança."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicos.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} as="article" index={i} className="group rounded-xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-brand-400/60">
              <Icon className="icon-wiggle mb-4 size-10 text-brand-400" aria-hidden="true" />
              <h3 className="mb-2 font-display text-lg font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-muted">{text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="sobre-nos" alt>
        <SectionTitle title="Conheça a Sampaio" subtitle="Mais do que uma transportadora, somos parceiros na sua nova jornada." />
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal index={0} className="overflow-hidden rounded-2xl border border-border bg-white p-10 shadow-lg shadow-black/20">
            <Image
              src={logoTransparente}
              alt="Logotipo da Sampaio Fretes e Mudanças"
              sizes="(min-width: 768px) 40vw, 90vw"
              className="mx-auto h-auto w-full max-w-sm"
            />
          </Reveal>
          <Reveal index={1} className="space-y-5">
            <div>
              <h3 className="font-display text-xl font-semibold text-brand-400">Nossa História</h3>
              <p className="mt-2 text-muted">
                A Sampaio Fretes e Mudanças nasceu em Vila Velha, ES, do desejo de oferecer um serviço de mudança que fosse
                sinônimo de cuidado e confiança. Com anos de experiência no setor, entendemos que cada mudança é única e
                representa o início de um novo capítulo na vida de nossos clientes.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-brand-400">Nossa Missão</h3>
              <p className="mt-2 text-muted">
                Transportar seus bens com a máxima segurança e eficiência, garantindo sua total satisfação. Tratamos cada
                objeto como se fosse nosso, desde a embalagem cuidadosa até a montagem final no seu novo endereço.
              </p>
            </div>
            <Link href="/orcamento" className="inline-block rounded-lg bg-highlight px-6 py-3 font-display font-semibold text-[#1a1a1a] transition hover:scale-105 hover:brightness-110">
              Fale com a gente
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section id="galeria">
        <SectionTitle title="Nossa Experiência em Ação" subtitle="Veja fotos de nossos trabalhos recentes e como cuidamos de cada detalhe." />
        <h3 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold">
          <Camera className="size-5 text-brand-400" /> Fotos
        </h3>
        <Gallery photos={galeria} />
        <h3 className="mt-14 mb-4 flex items-center gap-2 font-display text-xl font-semibold">
          <InstagramIcon className="size-5 text-brand-400" /> Nossos Reels
        </h3>
        <InstagramReels reels={reels} />
      </Section>

      <Section id="dicas" alt>
        <SectionTitle title="Dicas Para Uma Mudança Tranquila" subtitle="Conteúdo para te ajudar a se organizar antes, durante e depois da mudança." />
        <div className="grid gap-6 md:grid-cols-3">
          {dicas.map((d, i) => (
            <Reveal key={d.slug} as="article" index={i} className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={d.image} alt={d.imageAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-105" placeholder="blur" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 font-display text-lg font-semibold">{d.title}</h3>
                <p className="mb-4 flex-1 text-sm text-muted">{d.excerpt}</p>
                <Link href={`/dicas/${d.slug}`} className="font-semibold text-brand-400 after:absolute after:inset-0 hover:underline">
                  Leia mais →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="valores" alt>
        <SectionTitle
          title="Valores e Pagamento"
          subtitle="Orçamento sem compromisso. Veja como funciona o pagamento, do agendamento até o dia da mudança."
        />
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
          {etapasPagamento.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} index={i} className="rounded-xl border border-border bg-surface p-6">
              <div className="mb-3 grid size-11 place-items-center rounded-full bg-brand-900 text-white">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mb-1.5 font-display font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted">{text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal index={3} className="mx-auto mt-6 max-w-4xl rounded-xl border border-border bg-surface p-6 text-center">
          <p className="mb-4 text-sm font-medium text-foreground">Aceitamos</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {formasPagamento.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-2 text-muted">
                <Icon className="size-5 text-brand-400" aria-hidden="true" /> {label}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section id="informacoes">
        <SectionTitle title="Informações Importantes" subtitle="O que você precisa saber antes do dia da mudança." />
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
          {informacoes.map(({ icon: Icon, text }, i) => (
            <Reveal key={text} index={i} className="rounded-xl border border-border bg-surface p-6 text-center">
              <Icon className="mx-auto mb-3 size-8 text-brand-400" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-muted">{text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="faq" alt>
        <SectionTitle title="Perguntas Frequentes" subtitle="Tire aqui suas principais dúvidas sobre o processo de mudança conosco." />
        <div className="mx-auto max-w-3xl space-y-3">
          {faq.map((f, i) => (
            <Reveal key={f.q} as="details" index={i} stagger={70} className="group rounded-xl border border-border bg-surface open:border-brand-400/50">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-2xl leading-none text-brand-400 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="px-5 pb-5 text-muted">{f.a}</p>
            </Reveal>
          ))}
        </div>

        <Reveal index={faq.length} className="mx-auto mt-6 flex max-w-3xl flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <p className="text-sm text-muted">Não encontrou sua resposta?</p>
          <a
            href={whatsappUrl("Olá! Tenho uma dúvida sobre a mudança.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-brand-400 hover:underline"
          >
            <WhatsAppIcon className="size-4" /> Fale conosco pelo WhatsApp
          </a>
        </Reveal>
      </Section>

      <Section id="depoimentos">
        <SectionTitle title="O Que Nossos Clientes Dizem" subtitle="Depoimentos reais de quem já confiou na Sampaio para sua mudança." />
        <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-xl border border-dashed border-border bg-surface p-10 text-center text-muted">
          <MessageSquareQuote className="size-10 text-brand-400" aria-hidden="true" />
          <p>Em breve, depoimentos de clientes que já fizeram sua mudança com a gente.</p>
        </div>
      </Section>

      <section className="relative overflow-hidden bg-brand-900 py-14 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 70%, white 1px, transparent 1px), radial-gradient(circle at 85% 30%, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        <Reveal as="div" className="relative mx-auto max-w-3xl px-4">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Pronto para planejar sua mudança?</h2>
          <p className="mt-3 text-blue-100">Peça um orçamento sem compromisso e receba uma proposta personalizada.</p>
          <Link
            href="/orcamento"
            className="mt-6 inline-block rounded-lg bg-highlight px-8 py-3 font-display font-semibold text-[#1a1a1a] transition hover:scale-105 hover:brightness-110"
          >
            Solicitar orçamento
          </Link>
        </Reveal>
      </section>

      <Section id="contato" alt>
        <SectionTitle title="Entre em Contato" subtitle="Estamos prontos para atender você! Tire suas dúvidas ou solicite uma visita técnica." />
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <Reveal index={0}>
            <CoverageMap />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            <ContactCard icon={<Phone />} title="Telefone / WhatsApp" index={1}>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:underline">
                {site.phoneDisplay}
              </a>
            </ContactCard>
            <ContactCard icon={<InstagramIcon />} title="Instagram" index={2}>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="break-all text-brand-400 hover:underline">
                @{site.instagram}
              </a>
            </ContactCard>
            <ContactCard icon={<MapPin />} title="Endereço" index={3}>
              {site.address.neighborhood} — {site.address.city} — {site.address.state}
              <br />
              <span className="text-sm">Atendemos toda a Grande Vitória e demais regiões</span>
            </ContactCard>
            <ContactCard icon={<Clock />} title="Atendimento" index={4}>
              {site.businessHours.map((h) => (
                <span key={h.label} className="block text-sm">
                  {h.label}: {h.value}
                </span>
              ))}
            </ContactCard>
          </div>
        </div>
      </Section>
    </>
  )
}

function ContactCard({
  icon,
  title,
  index = 0,
  children,
}: {
  icon: ReactNode
  title: string
  index?: number
  children: ReactNode
}) {
  return (
    <Reveal index={index} className="group rounded-xl border border-border bg-surface p-6 text-center text-muted">
      <div className="icon-wiggle mx-auto mb-3 grid size-12 place-items-center rounded-full bg-brand-900 text-white [&>svg]:size-6">
        {icon}
      </div>
      <h3 className="mb-2 font-display font-semibold text-foreground">{title}</h3>
      {children}
    </Reveal>
  )
}
