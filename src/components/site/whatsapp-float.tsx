import { whatsappUrl, site } from "@/lib/site"
import { WhatsAppIcon } from "./brand-icons"

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl(`Olá! Gostaria de mais informações sobre os serviços da ${site.name}.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="fixed right-5 bottom-5 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/40 transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="size-8" />
    </a>
  )
}
