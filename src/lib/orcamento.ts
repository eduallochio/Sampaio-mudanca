import { z } from "zod"

export const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
  "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
] as const

export const TIPOS_IMOVEL = ["Casa", "Apartamento", "Comercial/Escritório", "Outro"] as const

export const SERVICOS_ADICIONAIS = [
  "Embalagem completa dos itens",
  "Desmontagem e montagem de móveis",
  "Içamento (se necessário)",
] as const

const obrigatorio = (campo: string) => z.string().trim().min(1, `Informe ${campo}`)

const endereco = (sufixo: string) =>
  z.object({
    cep: z
      .string()
      .transform((v) => v.replace(/\D/g, ""))
      .pipe(z.string().length(8, `CEP de ${sufixo} inválido`)),
    rua: obrigatorio(`a rua de ${sufixo}`),
    numero: obrigatorio(`o número de ${sufixo}`),
    complemento: z.string().trim().default(""),
    bairro: obrigatorio(`o bairro de ${sufixo}`),
    cidade: obrigatorio(`a cidade de ${sufixo}`),
    uf: z.enum(UFS, `Selecione o estado de ${sufixo}`),
    tipoImovel: z.enum(TIPOS_IMOVEL),
    detalhes: z.string().trim().default(""),
  })

export const orcamentoSchema = z.object({
  nome: obrigatorio("seu nome"),
  telefone: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .pipe(z.string().regex(/^\d{10,11}$/, "Telefone inválido. Use DDD + número")),
  email: z.union([z.literal(""), z.email("E-mail inválido")]).default(""),
  origem: endereco("origem"),
  destino: endereco("destino"),
  dataMudanca: z.iso.date("Informe a data da mudança"),
  itens: obrigatorio("os principais itens da mudança"),
  servicos: z.array(z.enum(SERVICOS_ADICIONAIS)).default([]),
  observacoes: z.string().trim().default(""),
})

export type Orcamento = z.infer<typeof orcamentoSchema>

/** Converte o FormData do formulário (campos "origem.rua" etc.) para o formato do schema. */
export function formDataToObject(fd: FormData) {
  const obj: Record<string, unknown> = {}
  for (const [key, value] of fd.entries()) {
    if (key === "servicos") {
      ;((obj.servicos as string[] | undefined) ?? (obj.servicos = [])).push(String(value))
      continue
    }
    const [group, field] = key.split(".")
    if (field) {
      obj[group] = { ...(obj[group] as object), [field]: String(value) }
    } else {
      obj[key] = String(value)
    }
  }
  return obj
}

export const formatCep = (v: string) =>
  v
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/^(\d{5})(\d)/, "$1-$2")

export function formatTelefone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ""
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

function formatEndereco(e: Orcamento["origem"]) {
  let s = `  CEP: ${formatCep(e.cep)}\n`
  s += `  Endereço: ${e.rua}, ${e.numero}${e.complemento ? " - " + e.complemento : ""}\n`
  s += `  Bairro: ${e.bairro}\n`
  s += `  Cidade/UF: ${e.cidade}/${e.uf}\n`
  s += `  Tipo Imóvel: ${e.tipoImovel}\n`
  if (e.detalhes) s += `  Detalhes: ${e.detalhes}\n`
  return s
}

export function mensagemWhatsApp(o: Orcamento) {
  const [ano, mes, dia] = o.dataMudanca.split("-")
  let m = `*📝 SOLICITAÇÃO DE ORÇAMENTO - SAMPAIO MUDANÇAS*\n\n`
  m += `👤 *Cliente:*\n  Nome: ${o.nome}\n  Telefone: ${formatTelefone(o.telefone)}\n`
  if (o.email) m += `  Email: ${o.email}\n`
  m += `\n🚚 *Origem:*\n${formatEndereco(o.origem)}`
  m += `\n🏁 *Destino:*\n${formatEndereco(o.destino)}`
  m += `\n🗓️ *Data da Mudança:*\n  ${dia}/${mes}/${ano}\n`
  m += `\n📦 *Principais Itens:*\n${o.itens}\n`
  if (o.servicos.length) m += `\n🛠️ *Serviços Adicionais:*\n  ${o.servicos.join(", ")}\n`
  if (o.observacoes) m += `\n📄 *Observações:*\n  ${o.observacoes}\n`
  m += `\n\n_Mensagem enviada pelo site._`
  return m
}
