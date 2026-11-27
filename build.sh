#!/usr/bin/env bash
# Builds game.html (artifact page body) and index.html (standalone page) from src/.
set -euo pipefail
cd "$(dirname "$0")"
{
  echo '<title>Tides of the Grand Line</title>'
  echo '<meta name="claude:viewport-fit-sides" content="cover">'
  echo '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
  echo '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Literata:opsz,wght@7..72,400;7..72,600&family=Zen+Kaku+Gothic+New:wght@400;500;700;900&display=swap">'
  echo '<style>'; cat src/style.css; echo '</style>'
  cat src/shell.html
  echo '<script>'; cat src/world.js src/content.js src/game.js src/ui.js; echo '</script>'
} > game.html
{
  echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>'
  cat game.html
  echo '</body></html>'
} > index.html
echo "built game.html and index.html ($(wc -c < index.html) bytes)"
