"use client"

import { useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react"
import { WhatsAppIcon } from "./brand-icons"

export type OrderModalHandle = {
  /** Abre o modal e roda a animação; ao terminar, mostra o botão de enviar pra essa URL. */
  play: (whatsappHref: string) => void
}

// A animação CSS dura 10s (fiel ao original); o texto "Pedido enviado" some
// aos 7.3s, então trocamos para o botão de envio logo depois disso.
const ANIMATION_MS = 8000

/**
 * Modal de confirmação: roda a animação do "Order Button" (caminhão saindo,
 * parando em 3 pontos da rota, portas abrindo, luzes acendendo, caixa sendo
 * carregada, linhas de movimento) e, ao terminar, revela um botão "Enviar
 * pelo WhatsApp" dentro do próprio modal.
 *
 * Importante: window.open() só escapa do bloqueador de pop-up quando chamado
 * de forma síncrona dentro de um gesto do usuário (clique). Por isso o link
 * do WhatsApp não abre sozinho ao fim da animação (isso rodaria dentro de um
 * setTimeout e seria bloqueado) — a pessoa clica no botão que aparece depois,
 * e esse clique é o gesto síncrono que autoriza o navegador a abrir a aba.
 */
export const OrderModal = forwardRef<OrderModalHandle>(function OrderModal(_props, ref) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [animating, setAnimating] = useState(false)
  const [href, setHref] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  useImperativeHandle(ref, () => ({
    play(whatsappHref) {
      setHref(null)
      dialogRef.current?.showModal()
      // Um frame de atraso para o navegador aplicar o estado inicial antes de
      // ligar a animação — evita que a transição "pule" direto pro fim.
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimating(true)))
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setAnimating(false)
        setHref(whatsappHref)
      }, ANIMATION_MS)
    },
  }))

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    },
    [],
  )

  return (
    <dialog
      ref={dialogRef}
      className="m-auto rounded-3xl border-0 bg-transparent p-0 backdrop:bg-black/70"
      aria-label={href ? "Solicitação pronta" : "Enviando sua solicitação"}
    >
      <div className="order-modal-card gap-5">
        <div className={`order ${animating ? "animate" : ""}`}>
          <span className="default">Preparando sua solicitação</span>
          <span className="success">
            Pronto
            <svg viewBox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1" />
            </svg>
          </span>
          <div className="box" />
          <div className="truck">
            <div className="back" />
            <div className="front">
              <div className="window" />
            </div>
            <div className="light top" />
            <div className="light bottom" />
          </div>
          <div className="lines" />
        </div>

        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => dialogRef.current?.close()}
            className="flex items-center gap-2 rounded-lg bg-whatsapp px-6 py-3 font-display font-semibold text-[#0b3d1e] transition hover:brightness-110"
          >
            <WhatsAppIcon className="size-5" /> Enviar pelo WhatsApp
          </a>
        )}
      </div>
    </dialog>
  )
})
