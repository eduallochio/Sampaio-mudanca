import Link from "next/link"
import { MapPin } from "lucide-react"
import { instagramUrl, site, whatsappUrl } from "@/lib/site"
import { CopyrightYears } from "./copyright-years"
import { InstagramIcon, WhatsAppIcon } from "./brand-icons"
import { Logo } from "./logo"

const linksRapidos = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#sobre-nos", label: "Sobre Nós" },
  { href: "/#dicas", label: "Dicas" },
  { href: "/orcamento", label: "Orçamento" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-alt">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="h-10" />
            <p className="mt-4 text-sm text-muted">
              Sua mudança com segurança e confiança em Vila Velha e para todo o Brasil.
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-sm font-semibold text-foreground">Links Rápidos</h2>
            <ul className="space-y-2.5 text-sm text-muted">
              {linksRapidos.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-display text-sm font-semibold text-foreground">Contato</h2>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-brand-400"
                >
                  <WhatsAppIcon className="size-4 shrink-0" /> {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-brand-400"
                >
                  <InstagramIcon className="size-4 shrink-0" /> @{site.instagram}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  {site.address.neighborhood} — {site.address.city}/{site.address.state}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-display text-sm font-semibold text-foreground">Institucional</h2>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <Link href="/politica-de-privacidade" className="hover:text-brand-400">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos-de-servico" className="hover:text-brand-400">
                  Termos de Serviço
                </Link>
              </li>
              <li>CNPJ: {site.cnpj}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-border pt-6 text-center text-xs text-muted">
          <p>
            © <CopyrightYears launchYear={site.launchYear} /> {site.name}. Todos os direitos reservados.
          </p>
          <p>
            Desenvolvido por{" "}
            <a
              href={whatsappUrl(undefined, site.developer.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-400 hover:underline"
            >
              {site.developer.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
