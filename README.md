# Mosaico Analítico

Site institucional do consultório **Mosaico Analítico** — Psicologia e Psicanálise · João Pessoa/PB.
Construído em **Next.js 14 (App Router)**, mobile-first, com `next/image` para performance.

## Rodar localmente
```bash
npm install
npm run dev        # http://localhost:3000
```

## Build de produção
```bash
npm run build && npm start
```

## Onde editar
- Textos e dados das profissionais: `app/page.js` (objetos `CONFIG`, `PROS`, `ESPS`)
- Estilos (mobile-first): `app/globals.css`
- Imagens: `public/assets/` (mosaicos) e `public/assets/prof/` (fotos das profissionais)

## A confirmar (placeholders)
Nome oficial · ano de fundação (`{ANO}`) · WhatsApp · Instagram · e-mail · horário · fotos das profissionais.
