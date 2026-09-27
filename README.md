# Sampaio Fretes e Mudanças

Site institucional da Sampaio Fretes e Mudanças (Vila Velha, ES), migrado de HTML/CSS/JS estático para Next.js.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4**
- **Zod** para validação do formulário de orçamento
- Deploy alvo: **Vercel**

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura

```
src/
  app/
    (site)/          # páginas públicas (home, dicas, legais) — layout com header/footer/WhatsApp
    sitemap.ts        # sitemap.xml gerado a partir de src/content/dicas.tsx
    robots.ts
  components/site/    # componentes de UI do site público
  content/dicas.tsx   # artigos de "Dicas" — adicione um item aqui para publicar um novo
  lib/
    site.ts           # dados do negócio (telefone, endereço, CNPJ, redes sociais)
    orcamento.ts       # schema Zod + formatação da mensagem de WhatsApp do formulário
  assets/              # imagens de origem (otimizadas pelo next/image)
legacy/                # site estático original (HTML/CSS/JS), mantido como referência histórica
```

## Formulário de orçamento

O formulário em `#orcamento` busca o endereço via [ViaCEP](https://viacep.com.br/), valida os
campos com Zod e abre o WhatsApp com uma mensagem formatada — sem backend por enquanto. A lógica
de validação e montagem da mensagem fica em [`src/lib/orcamento.ts`](src/lib/orcamento.ts), para
ser reaproveitada quando o envio passar a gravar em banco de dados (fase do dashboard financeiro).

## Próximas fases

1. ~~Migração do site estático para Next.js~~ (esta fase)
2. Banco de dados (Supabase) para orçamentos, mudanças e financeiro
3. Dashboard administrativo (`/admin`) para o dono do negócio

## Deploy

Projeto pensado para deploy na Vercel, apontando o domínio atual do cliente.
