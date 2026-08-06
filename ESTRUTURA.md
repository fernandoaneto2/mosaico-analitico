# Mosaico Analítico — Estrutura do projeto (Next.js)

Site em **Next.js 14 (App Router)**, mobile-first, com `next/image`. Foco em apresentar
as profissionais e o espaço.

## Arquivos
- `app/layout.js` — metadados, fontes (Fraunces + Poppins)
- `app/page.js` — página única com todas as seções; dados em `CONFIG`, `PROS`, `ESPS`
- `app/globals.css` — estilos mobile-first (breakpoints em `min-width`)
- `public/assets/` — mosaicos tratados (`mosaico-flores.jpg`, `mosaico-placa.jpg`)
- `public/assets/prof/` — fotos das profissionais (placeholders por enquanto)

## Seções
Hero (logo em mosaico, sem texto extra) · Sobre · Desde {ANO} · Abordagem ·
Profissionais (cards com foto) · Especialidades · Contato & Localização · Rodapé.

## As 6 profissionais
| Nome | CRP | Atuação |
|---|---|---|
| Ananda Ferrer Arruda | 13/14021 | Psicanálise |
| Bianca da Nóbrega T. Trombetta | 13/14204 | Psicologia · Psicanálise |
| Camila Yamaoka M. Maia | 13/4694 | Psicologia · Psicanálise |
| Elvira Daniel Rezende | 13/2158 | Psicologia · Psicanálise |
| Laura Daniel R. Nogueira | 13/4078 | Psicologia · Psicanálise |
| Maressa Marques da Costa | 13/9675 | Psicanálise |

## A confirmar (placeholders no `CONFIG`/`PROS`)
Nome oficial · ano de fundação (`{ANO}`) · WhatsApp · Instagram · e-mail · horário ·
fotos das profissionais (substituir os arquivos em `public/assets/prof/`, formato 4:5).
