// Dados do negócio usados no site, SEO e dashboard. Altere aqui e reflete em tudo.
export const site = {
  name: "Sampaio Fretes e Mudanças",
  shortName: "Sampaio Mudanças",
  url: "https://sampaiomudancas.com.br",
  description:
    "Fretes e mudanças residenciais e comerciais em Vila Velha, Grande Vitória e para todo o Brasil. Embalagem, desmontagem, montagem e transporte seguro. Peça seu orçamento online!",
  phoneDisplay: "(27) 9 9243-6270",
  whatsapp: "5527992436270",
  instagram: "sampaiofretesemudancas",
  cnpj: "44.947.799/0001-01",
  address: {
    neighborhood: "Coqueiral de Itaparica",
    city: "Vila Velha",
    state: "ES",
  },
  launchYear: 2025,
} as const

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export const instagramUrl = `https://instagram.com/${site.instagram}`
