"use client"

import { useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react"

export type OrderModalHandle = {
  /** Abre o modal, roda a animação e chama onDone() quando terminar (~2.6s). */
  play: (onDone: () => void) => void
}

const ANIMATION_MS = 2600

/**
 * Modal de confirmação de envio: cobre a tela com um caminhão "entregando"
 * o pedido (a caixa entra no caminhão, ele atravessa a cena, termina em
 * "Pedido enviado" com um check). Fecha sozinho ao final e avisa o chamador
 * via onDone, que é quando o QuoteForm efetivamente abre o WhatsApp — assim
 * a pessoa vê a confirmação visual antes da troca de aba.
 */
export const OrderModal = forwardRef<OrderModalHandle>(function OrderModal(_props, ref) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [animating, setAnimating] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  useImperativeHandle(ref, () => ({
    play(onDone) {
      dialogRef.current?.showModal()
      // Um frame de atraso para o navegador aplicar o estado inicial antes de
      // ligar a animação — evita que a transição "pule" direto pro fim.
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimating(true)))
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        dialogRef.current?.close()
        setAnimating(false)
        onDone()
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
      className="m-auto rounded-2xl border-0 bg-transparent p-0 backdrop:bg-black/70"
      aria-label="Enviando sua solicitação"
    >
      <div className="order-modal-scene relative flex h-[220px] w-[min(90vw,420px)] flex-col items-center justify-center overflow-hidden rounded-2xl">
        <div className="order-modal-cloud order-modal-cloud-1" aria-hidden="true" />
        <div className="order-modal-cloud order-modal-cloud-2" aria-hidden="true" />

        <div className={`order-modal-stage ${animating ? "animate" : ""}`}>
          <div className="order-modal-road" />

          <div className="order-modal-box" />

          <div className="order-modal-truck">
            <div className="order-modal-truck-back" />
            <div className="order-modal-truck-front">
              <div className="order-modal-truck-window" />
            </div>
            <div className="order-modal-truck-light order-modal-truck-light--top" />
            <div className="order-modal-truck-light order-modal-truck-light--bottom" />
            <div className="order-modal-wheel order-modal-wheel--back" />
            <div className="order-modal-wheel order-modal-wheel--front" />
          </div>

          <div className="order-modal-lines" />
          <div className="order-modal-smoke order-modal-smoke-1" />
          <div className="order-modal-smoke order-modal-smoke-2" />
          <div className="order-modal-smoke order-modal-smoke-3" />
        </div>

        <p className="order-modal-status">
          <span className="order-modal-status-text order-modal-status-text--sending">Enviando sua solicitação…</span>
          <span className="order-modal-status-text order-modal-status-text--done">
            Pedido enviado
            <svg viewBox="0 0 12 10" className="order-modal-check">
              <polyline points="1.5 6 4.5 9 10.5 1" />
            </svg>
          </span>
        </p>
      </div>
    </dialog>
  )
})
