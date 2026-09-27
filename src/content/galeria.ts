import type { StaticImageData } from "next/image"
import foto1 from "@/assets/galeria/1.jpg"
import foto2 from "@/assets/galeria/2.jpg"
import foto3 from "@/assets/galeria/3.jpg"
import foto4 from "@/assets/galeria/4.jpg"
import foto5 from "@/assets/galeria/5.jpg"

export type Foto = { src: StaticImageData; alt: string }

// Para adicionar uma foto nova:
// 1. Coloque o arquivo em src/assets/galeria/ (ex: 6.jpg)
// 2. Importe acima e adicione um item aqui, com um alt text descritivo
export const galeria: Foto[] = [
  { src: foto1, alt: "Equipe preparando móveis para mudança" },
  { src: foto2, alt: "Caminhão da Sampaio Mudanças carregado" },
  { src: foto3, alt: "Móvel sendo embalado com plástico bolha" },
  { src: foto4, alt: "Itens organizados dentro do caminhão" },
  { src: foto5, alt: "Desmontagem de móvel com ferramentas profissionais" },
]
