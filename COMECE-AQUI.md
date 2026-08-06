# Comece aqui — Mosaico Analítico (Next.js)

O site foi reconstruído em **Next.js 14 (App Router)**, mobile-first, focado em
**apresentar as profissionais e o espaço** (menos "vendas"). Os arquivos do projeto
estão nesta pasta.

## Por que não subi direto ao GitHub por aqui
O ambiente onde trabalho monta a sua pasta em modo somente-adição: ele **não deixa
apagar arquivos nem gravar os locks que o Git precisa**, e não tem a sua autenticação
do GitHub. Por isso o commit foi feito num pacote pronto (`mosaico-analitico.bundle`)
e o push é dado por você, no seu Mac (onde tudo funciona). São 2 minutos.

## Subir ao GitHub — escolha UMA opção

### Opção 1 — Script pronto (mais simples)
No Terminal:
```bash
cd ~/Desktop/mosaico-analitico
bash push.sh
```
O script limpa os arquivos antigos do site em HTML, cria o commit e faz o push para
`github.com/fernandoaneto2/mosaico-analitico`.

### Opção 2 — Usar o commit que eu já fiz (bundle)
```bash
cd ~/Desktop
git clone mosaico-analitico/mosaico-analitico.bundle mosaico-site
cd mosaico-site
git remote set-url origin https://github.com/fernandoaneto2/mosaico-analitico.git
git push -u origin main
```

## Deploy (Vercel — detecta Next.js sozinho)
Depois do push:
1. Acesse **vercel.com/new** → **Import Git Repository** → `mosaico-analitico`
2. O Framework é detectado como **Next.js** (não mude nada) → **Deploy**
3. A cada `git push` na `main`, o site publica automaticamente.

Ou, sem GitHub, direto da pasta: `npx vercel --prod`.

## Rodar/testar no seu computador
```bash
cd ~/Desktop/mosaico-analitico   # (ou a pasta clonada)
npm install
npm run dev      # abre em http://localhost:3000
```

## O que ainda falta você confirmar
Edite no `app/page.js` (objeto `CONFIG` e lista `PROS`):
- Nome oficial · **ano de fundação** (`{ANO}`) · WhatsApp · Instagram · e-mail · horário
- **Fotos das profissionais** — hoje estão com placeholders elegantes em
  `public/assets/prof/`. É só substituir cada arquivo (`ananda.jpg`, `bianca.jpg`, etc.)
  mantendo o nome, de preferência no formato retrato (4:5).

Me mande esses dados que eu já conecto tudo.
