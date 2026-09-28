"use client"

import { Check, ChevronLeft, ChevronRight, Loader2, Pencil } from "lucide-react"
import { useMemo, useRef, useState, type ReactNode } from "react"
import {
  etapas,
  formDataToObject,
  formatCep,
  formatTelefone,
  GRUPOS_ITENS,
  mensagemWhatsApp,
  orcamentoSchema,
  SERVICOS_ADICIONAIS,
  TIPOS_IMOVEL,
  UFS,
  type Orcamento,
} from "@/lib/orcamento"
import { whatsappUrl } from "@/lib/site"
import { WhatsAppIcon } from "./brand-icons"
import { OrderModal, type OrderModalHandle } from "./order-modal"

type Errors = Record<string, string>

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2.5 text-foreground placeholder:text-muted/60 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30 aria-[invalid=true]:border-danger"

function Field({
  name,
  label,
  errors,
  className = "",
  children,
}: {
  name: string
  label: string
  errors: Errors
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {errors[name] && (
        <p id={`${name}-erro`} className="mt-1 text-sm text-danger">
          {errors[name]}
        </p>
      )}
    </div>
  )
}

/** Props de acessibilidade comuns para um campo com possível erro. */
const a11y = (name: string, errors: Errors) => ({
  id: name,
  name,
  "aria-invalid": errors[name] ? true : undefined,
  "aria-describedby": errors[name] ? `${name}-erro` : undefined,
})

function AddressFields({ prefix, errors }: { prefix: "origem" | "destino"; errors: Errors }) {
  const [loading, setLoading] = useState(false)
  const [cepMsg, setCepMsg] = useState("")
  const ref = useRef<HTMLDivElement>(null)

  const set = (field: string, value: string) => {
    const el = ref.current?.querySelector<HTMLInputElement | HTMLSelectElement>(`[name="${prefix}.${field}"]`)
    if (el) el.value = value
  }

  async function buscarCep(value: string) {
    const cep = value.replace(/\D/g, "")
    if (cep.length !== 8) return
    setLoading(true)
    setCepMsg("")
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await res.json()
      if (data.erro) {
        setCepMsg("CEP não encontrado. Preencha o endereço manualmente.")
        return
      }
      set("rua", data.logradouro ?? "")
      set("bairro", data.bairro ?? "")
      set("cidade", data.localidade ?? "")
      set("uf", data.uf ?? "")
      if (data.logradouro) ref.current?.querySelector<HTMLInputElement>(`[name="${prefix}.numero"]`)?.focus()
    } catch {
      setCepMsg("Não foi possível buscar o CEP. Preencha o endereço manualmente.")
    } finally {
      setLoading(false)
    }
  }

  const n = (f: string) => `${prefix}.${f}`

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4">
      <Field name={n("cep")} label="CEP" errors={errors} className="col-span-2 sm:col-span-1">
        <div className="relative">
          <input
            {...a11y(n("cep"), errors)}
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="00000-000"
            className={inputClass}
            onChange={(e) => {
              e.currentTarget.value = formatCep(e.currentTarget.value)
              if (e.currentTarget.value.length === 9) buscarCep(e.currentTarget.value)
            }}
          />
          {loading && <Loader2 className="absolute top-3 right-3 size-5 animate-spin text-brand-400" aria-label="Buscando CEP" />}
        </div>
        {cepMsg && <p className="mt-1 text-sm text-highlight">{cepMsg}</p>}
      </Field>
      <Field name={n("rua")} label="Rua/Avenida" errors={errors} className="col-span-2">
        <input {...a11y(n("rua"), errors)} className={inputClass} />
      </Field>
      <Field name={n("numero")} label="Número" errors={errors}>
        <input {...a11y(n("numero"), errors)} className={inputClass} />
      </Field>
      <Field name={n("complemento")} label="Complemento" errors={errors}>
        <input {...a11y(n("complemento"), errors)} placeholder="Apto, bloco" className={inputClass} />
      </Field>
      <Field name={n("bairro")} label="Bairro" errors={errors} className="col-span-2">
        <input {...a11y(n("bairro"), errors)} className={inputClass} />
      </Field>
      <Field name={n("cidade")} label="Cidade" errors={errors}>
        <input {...a11y(n("cidade"), errors)} className={inputClass} />
      </Field>
      <Field name={n("uf")} label="Estado" errors={errors}>
        <select {...a11y(n("uf"), errors)} defaultValue="ES" className={inputClass}>
          <option value="">UF</option>
          {UFS.map((uf) => (
            <option key={uf}>{uf}</option>
          ))}
        </select>
      </Field>
      <Field name={n("tipoImovel")} label="Tipo de imóvel" errors={errors}>
        <select {...a11y(n("tipoImovel"), errors)} className={inputClass}>
          {TIPOS_IMOVEL.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field name={n("detalhes")} label="Detalhes do acesso" errors={errors}>
        <input {...a11y(n("detalhes"), errors)} placeholder="Andar, elevador, escada" className={inputClass} />
      </Field>
    </div>
  )
}

function Stepper({ step }: { step: number }) {
  return (
    <ol className="mb-8 flex items-center justify-between" aria-label="Progresso do formulário">
      {etapas.map((e, i) => {
        const done = i < step
        const current = i === step
        return (
          <li key={e.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`grid size-8 place-items-center rounded-full text-sm font-semibold transition-colors sm:size-9 ${
                  done
                    ? "bg-whatsapp text-[#0b3d1e]"
                    : current
                      ? "bg-brand-400 text-brand-900"
                      : "bg-surface text-muted"
                }`}
                aria-current={current ? "step" : undefined}
              >
                {done ? <Check className="size-4" /> : i + 1}
              </span>
              <span className={`hidden text-center text-xs sm:block ${current ? "text-foreground" : "text-muted"}`}>
                {e.titulo}
              </span>
            </div>
            {i < etapas.length - 1 && (
              <div className={`mx-1 h-0.5 flex-1 rounded transition-colors sm:mx-2 ${done ? "bg-whatsapp" : "bg-border"}`} />
            )}
          </li>
        )
      })}
    </ol>
  )
}

function StepNav({
  step,
  onBack,
  onNext,
  submitting,
}: {
  step: number
  onBack: () => void
  onNext?: () => void
  submitting?: boolean
}) {
  const isLast = step === etapas.length - 1
  return (
    <div className="flex items-center justify-between gap-3 pt-2">
      {step > 0 ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 font-display font-medium text-muted transition hover:text-foreground"
        >
          <ChevronLeft className="size-5" /> Voltar
        </button>
      ) : (
        <span />
      )}
      {isLast ? (
        <button
          key="enviar"
          type="submit"
          data-action="enviar"
          disabled={submitting}
          className="flex items-center gap-2 rounded-lg bg-whatsapp px-6 py-3 font-display font-semibold text-[#0b3d1e] transition hover:brightness-110 disabled:opacity-60"
        >
          <WhatsAppIcon className="size-5" /> Enviar pelo WhatsApp
        </button>
      ) : (
        <button
          key="continuar"
          type="button"
          onClick={onNext}
          className="flex items-center gap-1.5 rounded-lg bg-brand-700 px-6 py-2.5 font-display font-semibold text-white transition hover:bg-brand-900"
        >
          Continuar <ChevronRight className="size-5" />
        </button>
      )}
    </div>
  )
}

function ReviewRow({ label, value, onEdit }: { label: string; value: ReactNode; onEdit: () => void }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border py-3 last:border-0">
      <div>
        <dt className="text-xs tracking-wide text-muted uppercase">{label}</dt>
        <dd className="mt-0.5 text-foreground">{value}</dd>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="flex shrink-0 items-center gap-1 text-sm text-brand-400 hover:underline"
      >
        <Pencil className="size-3.5" /> Editar
      </button>
    </div>
  )
}

export function QuoteForm() {
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [review, setReview] = useState<Orcamento | null>(null)
  // Data mínima calculada uma vez, no fuso horário do visitante (evita useEffect + setState).
  const [minDate] = useState(() => {
    const d = new Date()
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
  })
  const formRef = useRef<HTMLFormElement>(null)
  const modalRef = useRef<OrderModalHandle>(null)

  const etapaAtual = etapas[step]

  function focusFirstError(next: Errors) {
    const first = Array.from(formRef.current?.elements ?? []).find(
      (el) => el instanceof HTMLElement && (el as HTMLInputElement).name in next,
    ) as HTMLElement | undefined
    first?.focus()
  }

  function goTo(index: number) {
    setStep(index)
    setErrors({})
    window.scrollTo({ top: (formRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 96, behavior: "smooth" })
  }

  function handleNext() {
    if (!formRef.current || !etapaAtual.schema) return
    const data = formDataToObject(new FormData(formRef.current))
    const result = etapaAtual.schema.safeParse(data)

    if (!result.success) {
      const next: Errors = {}
      for (const issue of result.error.issues) {
        const key = issue.path.join(".")
        next[key] ??= issue.message
      }
      setErrors(next)
      focusFirstError(next)
      return
    }

    setErrors({})
    if (step === etapas.length - 2) {
      // Última etapa de dados antes da revisão: valida o objeto inteiro para montar o resumo
      const full = orcamentoSchema.safeParse(formDataToObject(new FormData(formRef.current)))
      if (full.success) setReview(full.data)
    }
    setStep((s) => s + 1)
    window.scrollTo({ top: (formRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 96, behavior: "smooth" })
  }

  function handleBack() {
    setErrors({})
    setStep((s) => Math.max(0, s - 1))
    window.scrollTo({ top: (formRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 96, behavior: "smooth" })
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Só o clique físico no botão "Enviar pelo WhatsApp" deve enviar. Qualquer outro
    // jeito de disparar submit (Enter num campo, etc.) apenas avança para a próxima etapa —
    // isso evita que um clique em "Continuar" seja interpretado como envio por engano.
    const submitter = (e.nativeEvent as SubmitEvent).submitter
    if (etapaAtual.id !== "revisao" || submitter?.getAttribute("data-action") !== "enviar") {
      handleNext()
      return
    }

    const result = orcamentoSchema.safeParse(formDataToObject(new FormData(e.currentTarget)))
    if (!result.success) {
      // Não deveria acontecer (etapas já validadas), mas volta para a primeira etapa com erro
      const next: Errors = {}
      for (const issue of result.error.issues) next[issue.path.join(".")] ??= issue.message
      const etapaComErro = etapas.findIndex((et) => et.campos.some((c) => c in next || Object.keys(next).some((k) => k.startsWith(c))))
      setErrors(next)
      goTo(etapaComErro === -1 ? 0 : etapaComErro)
      return
    }

    // A animação do modal roda primeiro; só ao terminar é que o WhatsApp abre —
    // assim a pessoa vê a confirmação visual antes da troca de aba.
    setSubmitting(true)
    modalRef.current?.play(() => {
      window.open(whatsappUrl(mensagemWhatsApp(result.data)), "_blank", "noopener")
      setSubmitting(false)
    })
  }

  const errorCount = Object.keys(errors).length
  const servicosSelecionados = useMemo(
    () => (review?.servicos.length ? review.servicos.join(", ") : "Nenhum"),
    [review],
  )
  const itensResumo = useMemo(() => {
    if (!review) return ""
    const todos = [...review.itensSelecionados, ...(review.itensOutros ? [review.itensOutros] : [])]
    return todos.join(", ")
  }, [review])

  return (
    <>
      <form ref={formRef} onSubmit={onSubmit} noValidate className="mx-auto max-w-2xl">
        <Stepper step={step} />

        <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
          {/* Todas as etapas ficam montadas no DOM (só escondidas) para não perder valores digitados ao navegar */}
          <div className={step === 0 ? "grid gap-4" : "hidden"} aria-hidden={step !== 0}>
            <Field name="nome" label="Nome completo" errors={errors}>
              <input {...a11y("nome", errors)} autoComplete="name" className={inputClass} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="telefone" label="Telefone (WhatsApp)" errors={errors}>
                <input
                  {...a11y("telefone", errors)}
                  type="tel"
                  autoComplete="tel-national"
                  placeholder="(27) 99999-9999"
                  className={inputClass}
                  onChange={(e) => (e.currentTarget.value = formatTelefone(e.currentTarget.value))}
                />
              </Field>
              <Field name="email" label="E-mail (opcional)" errors={errors}>
                <input {...a11y("email", errors)} type="email" autoComplete="email" className={inputClass} />
              </Field>
            </div>
          </div>

          <div className={step === 1 ? "grid gap-4" : "hidden"} aria-hidden={step !== 1}>
            <AddressFields prefix="origem" errors={errors} />
          </div>

          <div className={step === 2 ? "grid gap-4" : "hidden"} aria-hidden={step !== 2}>
            <AddressFields prefix="destino" errors={errors} />
          </div>

          <div className={step === 3 ? "grid gap-4" : "hidden"} aria-hidden={step !== 3}>
            <Field name="dataMudanca" label="Data pretendida" errors={errors} className="sm:max-w-xs">
              <input {...a11y("dataMudanca", errors)} type="date" min={minDate} className={inputClass} />
            </Field>
            <div>
              <p className="mb-1 text-sm font-medium text-foreground">Principais itens da mudança</p>
              <p className="mb-3 text-sm text-muted">Marque os itens que você vai levar. Não precisa ser exato.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {GRUPOS_ITENS.map((g) => (
                  <div key={g.grupo}>
                    <p className="mb-2 text-xs font-semibold tracking-wide text-brand-400 uppercase">{g.grupo}</p>
                    <div className="grid gap-2">
                      {g.itens.map((item) => (
                        <label key={item} className="flex items-center gap-3 text-muted">
                          <input type="checkbox" name="itensSelecionados" value={item} className="size-5 accent-brand-700" />
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Field name="itensOutros" label="Outros itens (opcional)" errors={errors} className="mt-4">
                <textarea
                  {...a11y("itensOutros", errors)}
                  rows={3}
                  placeholder="Algo que não está na lista? Descreva aqui (ex: piano, aquário, quantidade de caixas...)"
                  className={inputClass}
                />
              </Field>
              {errors.itensSelecionados && (
                <p role="alert" className="mt-2 text-sm text-danger">
                  {errors.itensSelecionados}
                </p>
              )}
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-foreground">Serviços adicionais</p>
              <div className="grid gap-2">
                {SERVICOS_ADICIONAIS.map((s) => (
                  <label key={s} className="flex items-center gap-3 text-muted">
                    <input type="checkbox" name="servicos" value={s} className="size-5 accent-brand-700" />
                    {s}
                  </label>
                ))}
              </div>
            </div>
            <Field name="observacoes" label="Observações" errors={errors}>
              <textarea {...a11y("observacoes", errors)} rows={3} placeholder="Alguma informação extra importante?" className={inputClass} />
            </Field>
          </div>

          <div className={step === 4 ? "block" : "hidden"} aria-hidden={step !== 4}>
            {review && (
              <dl>
                <ReviewRow label="Nome" value={review.nome} onEdit={() => goTo(0)} />
                <ReviewRow label="Telefone" value={formatTelefone(review.telefone)} onEdit={() => goTo(0)} />
                <ReviewRow
                  label="Origem"
                  value={`${review.origem.rua}, ${review.origem.numero} — ${review.origem.bairro}, ${review.origem.cidade}/${review.origem.uf}`}
                  onEdit={() => goTo(1)}
                />
                <ReviewRow
                  label="Destino"
                  value={`${review.destino.rua}, ${review.destino.numero} — ${review.destino.bairro}, ${review.destino.cidade}/${review.destino.uf}`}
                  onEdit={() => goTo(2)}
                />
                <ReviewRow
                  label="Data da mudança"
                  value={new Date(review.dataMudanca + "T00:00:00").toLocaleDateString("pt-BR")}
                  onEdit={() => goTo(3)}
                />
                <ReviewRow label="Itens" value={itensResumo} onEdit={() => goTo(3)} />
                <ReviewRow label="Serviços adicionais" value={servicosSelecionados} onEdit={() => goTo(3)} />
              </dl>
            )}
            <p className="mt-4 text-sm text-muted">
              Ao enviar, abriremos o WhatsApp com essa solicitação já preenchida para você confirmar o envio.
            </p>
          </div>

          {errorCount > 0 && step !== 4 && (
            <p role="alert" className="mt-4 rounded-md border border-danger/50 bg-danger/10 p-3 text-sm text-danger">
              Verifique {errorCount === 1 ? "o campo destacado" : `os ${errorCount} campos destacados`} acima.
            </p>
          )}

          <StepNav step={step} onBack={handleBack} onNext={handleNext} submitting={submitting} />
        </div>
      </form>

      <OrderModal ref={modalRef} />
    </>
  )
}
