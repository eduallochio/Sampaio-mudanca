import Image from "next/image"
import logo from "@/assets/logo-transparente.png"

// O logo atual é azul-marinho e perde contraste no fundo escuro,
// por isso fica sobre um selo branco até existir uma versão negativa.
export function Logo({ className = "h-11" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-lg bg-white px-2 py-1 ${className}`}>
      <Image src={logo} alt="Sampaio Fretes e Mudanças" className="h-full w-auto" sizes="160px" preload />
    </span>
  )
}
