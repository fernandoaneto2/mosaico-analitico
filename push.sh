#!/usr/bin/env bash
# Publica o site Mosaico Analítico no GitHub. Rode no Terminal, dentro desta pasta:
#   bash push.sh
set -e
cd "$(dirname "$0")"
echo "→ Removendo arquivos antigos do site em HTML (se existirem)..."
rm -rf .git .__t index.html assets _ph_*.jpg *.png 2>/dev/null || true
echo "→ Criando o repositório e o commit..."
git init
git add -A
git commit -m "Site Mosaico Analitico em Next.js (mobile-first)"
git branch -M main
git remote add origin https://github.com/fernandoaneto2/mosaico-analitico.git 2>/dev/null \
  || git remote set-url origin https://github.com/fernandoaneto2/mosaico-analitico.git
echo "→ Enviando para o GitHub..."
git push -u origin main
echo "✓ Pronto! Código publicado em github.com/fernandoaneto2/mosaico-analitico"
