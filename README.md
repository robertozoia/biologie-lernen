# Energie & Ernährung – Biologie 8. Klasse

Interaktive Lern-App (Deutsch, mit spanischer Übersetzung) zu Energie, Grundumsatz & Leistungsumsatz, Vitaminen, Nährstoffen und Mineralsalzen – mit Quiz, Memory, Sortierspielen, Rechentrainer, Probeprüfung und Brief-Training.

**Online:** https://robertozoia.github.io/biologie-lernen/

## Aufbau

- `src/content.js` – alle Inhalte, Fragen und Formeln (`{ de, es }`)
- `src/graphics.js` – Icons, Abbildungen, Animationen
- `src/app.js` – App-Logik
- `src/head.html`, `src/body.html` – Styles und Grundgerüst

`./build.sh` baut daraus `index.html` / `biologie-lernen.html` (eine einzige Datei, ohne Abhängigkeiten außer Google Fonts) und `artifact/biologie-lernen.html`.
