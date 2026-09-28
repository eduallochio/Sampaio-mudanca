"use client"

import { useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react"

export type OrderModalHandle = {
  /** Abre o modal, roda a animação e chama onDone() quando terminar. */
  play: (onDone: () => void) => void
}

// A animação CSS dura 10s (fiel ao original); o texto "Pedido enviado" some
// aos 7.3s, então fechamos o modal logo depois de dar tempo da pessoa ler.
const ANIMATION_MS = 8600

/**
 * Modal de confirmação de envio: cobre a tela com a animação original do
 * "Order Button" (caminhão saindo, parando em 3 pontos da rota, portas
 * abrindo, luzes acendendo, caixa sendo carregada, linhas de movimento),
 * escalada para um cartão maior e centralizado. Fecha sozinho ao final e
 * avisa o chamador via onDone — que é quando o QuoteForm efetivamente abre
 * o WhatsApp, para a pessoa ver a confirmação visual antes da troca de aba.
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
      className="m-auto rounded-3xl border-0 bg-transparent p-0 backdrop:bg-black/70"
      aria-label="Enviando sua solicitação"
    >
      <div className="order-modal-card">
        <div className={`order ${animating ? "animate" : ""}`}>
          <span className="default">Enviando sua solicitação</span>
          <span className="success">
            Pedido enviado
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
      </div>
    </dialog>
  )
})
