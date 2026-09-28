"use client"

import { useRef, type ButtonHTMLAttributes } from "react"

type OrderButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  /** Texto mostrado antes de enviar. */
  label: string
  /** Texto mostrado após a animação de "caminhão" terminar. */
  successLabel: string
}

/**
 * Botão com animação de "caminhão entregando", inspirado no clássico efeito
 * "Order Button" (CSS/JS). Ao clicar, o botão encolhe até virar um caminhão,
 * que "dirige" da esquerda pra direita com faróis e linhas de movimento, e
 * termina mostrando o texto de sucesso com um check.
 *
 * Não substitui o comportamento de submit do formulário: o <button> interno
 * continua type="submit" com o data-action original, então a lógica de
 * validação/envio do QuoteForm funciona exatamente como antes — este
 * componente só adiciona a classe "animate" por 3s ao clicar, e o resto é
 * puro CSS (ver .order-btn* em globals.css).
 */
export function OrderButton({ label, successLabel, className = "", onClick, disabled, ...props }: OrderButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const button = ref.current
    if (button && !button.classList.contains("animate")) {
      button.classList.add("animate")
      setTimeout(() => button.classList.remove("animate"), 3000)
    }
    onClick?.(e)
  }

  return (
    <button
      ref={ref}
      {...props}
      disabled={disabled}
      onClick={handleClick}
      className={`order-btn ${className}`}
    >
      <span className="order-btn-label order-btn-label--default">{label}</span>
      <span className="order-btn-label order-btn-label--success">
        {successLabel}
        <svg viewBox="0 0 12 10" className="order-btn-check">
          <polyline points="1.5 6 4.5 9 10.5 1" />
        </svg>
      </span>
      <div className="order-btn-box" />
      <div className="order-btn-truck">
        <div className="order-btn-truck-back" />
        <div className="order-btn-truck-front">
          <div className="order-btn-truck-window" />
        </div>
        <div className="order-btn-truck-light order-btn-truck-light--top" />
        <div className="order-btn-truck-light order-btn-truck-light--bottom" />
      </div>
      <div className="order-btn-lines" />
    </button>
  )
}
