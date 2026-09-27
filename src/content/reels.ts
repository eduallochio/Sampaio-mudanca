import type { StaticImageData } from "next/image"
import thumb1 from "@/assets/reels/1.jpg"
import thumb2 from "@/assets/reels/2.jpg"
import thumb3 from "@/assets/reels/3.jpg"
import thumb4 from "@/assets/reels/4.jpg"
import thumb5 from "@/assets/reels/5.jpg"

export type Reel = { id: string; thumb: StaticImageData; alt: string }

// Para publicar um reel novo:
// 1. Baixe uma imagem de capa (print da primeira cena) e coloque em src/assets/reels/
// 2. Importe acima e adicione um item aqui com o ID do reel (está na URL:
//    instagram.com/reel/<ID>/) e um alt text descritivo
export const reels: Reel[] = [
  { id: "DLpn4hTxkwA", thumb: thumb1, alt: "Equipe desmontando móvel para mudança" },
  { id: "DLkiNaCRZbH", thumb: thumb2, alt: "Reel da Sampaio Mudanças no Instagram" },
  { id: "DH5guKFO_Gc", thumb: thumb3, alt: "Reel da Sampaio Mudanças no Instagram" },
  { id: "DGTlWsTSmKU", thumb: thumb4, alt: "Reel da Sampaio Mudanças no Instagram" },
  { id: "DLdPpH6yxHu", thumb: thumb5, alt: "Reel da Sampaio Mudanças no Instagram" },
]
