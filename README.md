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
  content/
    dicas.tsx          # artigos de "Dicas" — adicione um item aqui para publicar um novo
    galeria.ts          # fotos da seção "Nossa Experiência" — adicione um item para publicar uma foto nova
    reels.ts             # thumbnails dos Reels do Instagram (ver seção abaixo)
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

## Fotos e Reels

- **Fotos** (`src/content/galeria.ts`): adicione o arquivo em `src/assets/galeria/` e um item no
  array, com um `alt` descritivo. Aparece na grade com lightbox em `#galeria`.
- **Reels** (`src/content/reels.ts`): hoje são thumbnails estáticas com link para o Instagram —
  não o embed oficial (iframe pesado, causava layout shift). Adicionar um reel novo é manual: uma
  imagem de capa em `src/assets/reels/` + o ID do reel (da URL `instagram.com/reel/<ID>/`).
  - **Por que não é automático:** a Instagram Basic Display API (conta pessoal, sem backend) foi
    desativada pela Meta em dez/2024. Hoje só existe a **Instagram Graph API**, que exige conta
    Business/Creator vinculada a uma Página do Facebook, um app registrado no Meta for Developers,
    OAuth e um token que precisa ser renovado periodicamente — ou seja, precisa de backend.
  - **Plano:** implementar isso na fase do Supabase/dashboard (item 2 abaixo), aproveitando a
    mesma infra de backend: uma rotina busca os posts recentes via Graph API e grava no banco; a
    seção de Reels do site passa a ler dali, sem edição manual.

## Próximas fases

1. ~~Migração do site estático para Next.js~~ (esta fase)
2. Banco de dados (Supabase) para orçamentos, mudanças, financeiro e integração automática com a
   Instagram Graph API (Reels)
3. Dashboard administrativo (`/admin`) para o dono do negócio

## Deploy

Projeto pensado para deploy na Vercel, apontando o domínio atual do cliente.
