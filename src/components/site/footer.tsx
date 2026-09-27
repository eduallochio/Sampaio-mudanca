import Link from "next/link"
import { site } from "@/lib/site"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-alt">
      <div className="mx-auto max-w-6xl space-y-2 px-4 py-10 text-center text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
        </p>
        <p>CNPJ: {site.cnpj}</p>
        <p>Sua mudança com segurança e confiança em Vila Velha e para todo o Brasil.</p>
        <p className="flex justify-center gap-3 pt-2">
          <Link href="/politica-de-privacidade" className="hover:text-brand-400">
            Política de Privacidade
          </Link>
          <span aria-hidden="true">|</span>
          <Link href="/termos-de-servico" className="hover:text-brand-400">
            Termos de Serviço
          </Link>
        </p>
        <p className="pt-2 text-xs">Desenvolvido por Eduardo Allochio</p>
      </div>
    </footer>
  )
}
