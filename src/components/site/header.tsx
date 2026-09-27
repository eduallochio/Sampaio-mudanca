"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Logo } from "./logo"

const links = [
  { id: "inicio", label: "Início" },
  { id: "servicos", label: "Serviços" },
  { id: "sobre-nos", label: "Sobre Nós" },
  { id: "dicas", label: "Dicas" },
  { id: "orcamento", label: "Orçamento" },
  { id: "contato", label: "Contato" },
]

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("inicio")

  // Destaca o link da seção visível. Observa só as seções que estão no menu,
  // corrigindo o bug da versão antiga que misturava índices de seções e links.
  useEffect(() => {
    if (!isHome) return
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [isHome])

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background-alt/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" aria-label="Página inicial">
          <Logo />
        </Link>

        <button
          type="button"
          className="rounded-md p-2 text-foreground md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>

        <nav
          id="menu-principal"
          className={`${open ? "block" : "hidden"} absolute inset-x-0 top-16 border-b border-border bg-background-alt md:static md:block md:border-0 md:bg-transparent`}
        >
          <ul className="flex flex-col md:flex-row md:gap-1">
            {links.map((l) => {
              const isActive = isHome && active === l.id
              return (
                <li key={l.id}>
                  <Link
                    href={`/#${l.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={`block px-4 py-3 font-display text-sm font-medium transition-colors md:rounded-md md:px-3 md:py-2 ${
                      isActive ? "text-brand-400" : "text-foreground hover:text-brand-400"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
