"use client"

import { Loader2, MapPinned, Truck, UserRound } from "lucide-react"
import { useRef, useState, type ReactNode } from "react"
import {
  formDataToObject,
  formatCep,
  formatTelefone,
  mensagemWhatsApp,
  orcamentoSchema,
  SERVICOS_ADICIONAIS,
  TIPOS_IMOVEL,
  UFS,
} from "@/lib/orcamento"
import { whatsappUrl } from "@/lib/site"
import { WhatsAppIcon } from "./brand-icons"

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

function Section({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <legend className="flex items-center gap-2 px-2 font-display text-lg font-semibold text-brand-400">
        {icon} {title}
      </legend>
      <div className="grid gap-4">{children}</div>
    </fieldset>
  )
}

function AddressFields({ prefix, title, errors }: { prefix: "origem" | "destino"; title: string; errors: Errors }) {
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
      <h3 className="col-span-2 font-display font-semibold text-foreground">{title}</h3>
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

export function QuoteForm() {
  const [errors, setErrors] = useState<Errors>({})
  // Data mínima calculada uma vez, no fuso horário do visitante (evita useEffect + setState).
  const [minDate] = useState(() => {
    const d = new Date()
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
  })
  const formRef = useRef<HTMLFormElement>(null)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const result = orcamentoSchema.safeParse(formDataToObject(new FormData(e.currentTarget)))

    if (!result.success) {
      const next: Errors = {}
      for (const issue of result.error.issues) {
        const key = issue.path.join(".")
        next[key] ??= issue.message
      }
      setErrors(next)
      // Foca o primeiro campo com erro, na ordem do formulário
      const first = Array.from(formRef.current?.elements ?? []).find(
        (el) => el instanceof HTMLElement && (el as HTMLInputElement).name in next,
      ) as HTMLElement | undefined
      first?.focus()
      return
    }

    setErrors({})
    window.open(whatsappUrl(mensagemWhatsApp(result.data)), "_blank", "noopener")
  }

  const errorCount = Object.keys(errors).length

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="mx-auto grid max-w-3xl gap-6">
      <Section icon={<UserRound className="size-5" />} title="Suas informações">
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
      </Section>

      <Section icon={<MapPinned className="size-5" />} title="Endereços da mudança">
        <div className="grid gap-8 md:grid-cols-2">
          <AddressFields prefix="origem" title="Origem" errors={errors} />
          <AddressFields prefix="destino" title="Destino" errors={errors} />
        </div>
      </Section>

      <Section icon={<Truck className="size-5" />} title="Detalhes da mudança">
        <Field name="dataMudanca" label="Data pretendida" errors={errors} className="sm:max-w-xs">
          <input {...a11y("dataMudanca", errors)} type="date" min={minDate} className={inputClass} />
        </Field>
        <Field name="itens" label="Principais itens da mudança" errors={errors}>
          <textarea
            {...a11y("itens", errors)}
            rows={6}
            placeholder="Ex: Geladeira duplex, fogão 6 bocas, máquina de lavar 15kg, sofá 3 lugares, cama casal + colchão, guarda-roupa 6 portas, ~20 caixas médias..."
            className={inputClass}
          />
        </Field>
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
      </Section>

      {errorCount > 0 && (
        <p role="alert" className="rounded-md border border-danger/50 bg-danger/10 p-3 text-sm text-danger">
          Verifique {errorCount === 1 ? "o campo destacado" : `os ${errorCount} campos destacados`} acima.
        </p>
      )}

      <button
        type="submit"
        className="flex items-center justify-center gap-3 rounded-lg bg-whatsapp px-6 py-4 font-display text-lg font-semibold text-[#0b3d1e] transition hover:brightness-110"
      >
        <WhatsAppIcon className="size-6" /> Enviar solicitação pelo WhatsApp
      </button>
    </form>
  )
}
