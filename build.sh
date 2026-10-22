#!/bin/sh
# Baut zwei Dateien aus src/:
#   biologie-lernen.html           – zum lokalen Öffnen (Doppelklick)
#   artifact/biologie-lernen.html  – Version für den claude.ai-Link (ohne <html>/<head>-Gerüst)
set -e
cd "$(dirname "$0")"

{
  cat src/head.html
  cat src/body.html
  echo "<script>"
  cat src/content.js
  cat src/graphics.js
  cat src/app.js
  echo "</script>"
} > artifact/biologie-lernen.html

{
  echo '<!doctype html>'
  echo '<html lang="de">'
  echo '<head>'
  echo '<meta charset="utf-8">'
  echo '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
  cat src/head.html
  echo '</head>'
  echo '<body>'
  cat src/body.html
  echo "<script>"
  cat src/content.js
  cat src/graphics.js
  cat src/app.js
  echo "</script>"
  echo '</body>'
  echo '</html>'
} > biologie-lernen.html

# GitHub Pages liefert index.html aus
cp biologie-lernen.html index.html

echo "OK: biologie-lernen.html, index.html und artifact/biologie-lernen.html"
