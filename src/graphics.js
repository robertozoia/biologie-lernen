/* =====================================================================
   GRAFIKEN – Icons (64×64), Abbildungen und Animationen
   Klassen: o = Umriss · ln = Linie (currentColor) · k-* = Füllfarbe
            a-* = Animation (siehe CSS)
   ===================================================================== */

const ICONS = {
  /* Energieformen */
  battery: `<rect class="o k-cream" x="18" y="12" width="28" height="44" rx="5"/><rect class="o k-grey" x="26" y="6" width="12" height="6" rx="2"/><rect class="k-leaf a-fill" x="22" y="27" width="20" height="25" rx="2"/><path class="ln" d="M32 16v7M28.5 19.5h7"/>`,
  ball: `<path class="ln" d="M3 26h11M1 34h13M5 42h9"/><g class="a-roll"><circle class="o k-warm" cx="40" cy="34" r="16"/><path class="ln" d="M29 23c7 7 7 15 0 22M51 23c-7 7-7 15 0 22"/></g>`,
  rock: `<path class="o k-grey" d="M2 62V34h30l8 28z"/><circle class="o k-brown a-wobble" cx="18" cy="25" r="9"/><path class="ln" d="M48 18v28" stroke-dasharray="3 5"/><path class="ln" d="M42 41l6 8 6-8"/>`,
  flame: `<g class="a-flicker"><path class="o k-warm" d="M32 4c8 12 18 20 18 34a18 18 0 0 1-36 0c0-10 8-16 10-26 4 8 6 10 8 4z"/><path class="k-sun" d="M32 30c4 6 8 10 8 16a8 8 0 0 1-16 0c0-6 6-10 8-16z"/></g>`,
  bolt: `<polygon class="o k-sun a-flash" points="38,4 14,36 30,36 24,60 50,26 34,26 42,4"/>`,
  sun: `<g class="a-spin"><path class="ln" d="M32 2v9M32 53v9M2 32h9M53 32h9M11 11l6 6M47 47l6 6M11 53l6-6M47 17l6-6"/></g><circle class="o k-sun" cx="32" cy="32" r="13"/>`,
  speaker: `<path class="o k-grey" d="M6 24h10l14-12v40L16 40H6z"/><path class="ln a-wave" d="M38 25q5 7 0 14"/><path class="ln a-wave w2" d="M45 19q9 13 0 26"/><path class="ln a-wave w3" d="M52 13q13 19 0 38"/>`,
  atom: `<g class="a-spin"><ellipse class="ln" cx="32" cy="32" rx="27" ry="10"/><ellipse class="ln" cx="32" cy="32" rx="27" ry="10" transform="rotate(60 32 32)"/><ellipse class="ln" cx="32" cy="32" rx="27" ry="10" transform="rotate(-60 32 32)"/><circle class="o k-sky" cx="59" cy="32" r="3.5"/></g><circle class="o k-red" cx="32" cy="32" r="6"/>`,

  /* Geräte */
  bulb: `<path class="o k-sun a-glow" d="M32 5a17 17 0 0 1 10 31l-1 8H23l-1-8A17 17 0 0 1 32 5z"/><rect class="o k-grey" x="23" y="44" width="18" height="10" rx="2"/><path class="ln" d="M24 49h16M28 58h8M28 32l4-8 4 8"/>`,
  solar: `<path class="o k-sky" d="M12 12h46l-8 30H4z"/><path class="ln" d="M27 12l-5 30M42 12l-4 30M8 27h47"/><path class="ln" d="M28 42v14M18 58h22"/>`,
  plant: `<path class="o k-brown" d="M18 44h28l-4 16H22z"/><path class="ln" d="M32 44V16"/><path class="o k-leaf a-sway" d="M32 32c-10 0-17-6-17-15 10 0 17 6 17 15z"/><path class="o k-leaf a-sway w2" d="M32 24c9 0 15-5 15-13-9 0-15 5-15 13z"/>`,
  runner: `<circle class="o k-pink" cx="40" cy="9" r="6"/><path class="ln w4" d="M37 17l-7 18M35 23l10 5 6-4M35 23l-10 4-4 9M30 35l10 8-2 15M30 35l-8 10-11 2"/>`,
  flashlight: `<path class="k-sun a-flash" d="M40 22l22-12v44L40 42z" opacity=".55"/><rect class="o k-grey" x="4" y="25" width="26" height="14" rx="3"/><path class="o k-grey" d="M30 20h10v24H30z"/>`,
  dam: `<path class="k-sky" d="M2 18h26v44H2z"/><path class="ln a-wave" d="M6 24h8M16 30h8"/><path class="o k-grey" d="M28 10h10l8 52H28z"/><path class="k-sky" d="M46 52h16v10H46z"/><g class="a-spin" style="transform-origin:46px 47px"><circle class="o k-cream" cx="46" cy="47" r="7"/><path class="ln" d="M46 40v14M39 47h14"/></g>`,
  bike: `<g class="a-spin" style="transform-origin:16px 42px"><circle class="ln" cx="16" cy="42" r="11"/><path class="ln" d="M16 31v22M5 42h22"/></g><g class="a-spin" style="transform-origin:48px 42px"><circle class="ln" cx="48" cy="42" r="11"/><path class="ln" d="M48 31v22M37 42h22"/></g><path class="ln" d="M16 42l10-18h16l6 18M26 24l8 18h-18M42 24l-2-6h-6"/>`,
  toaster: `<path class="o k-wheat a-pop" d="M19 4h11v18H19zM34 4h11v18H34z"/><rect class="o k-grey" x="8" y="18" width="48" height="32" rx="8"/><path class="ln" d="M16 58h32M56 30h5"/><path class="ln a-steam" d="M14 14c-3-3 3-5 0-9"/>`,
  candle: `<rect class="o k-cream" x="24" y="27" width="16" height="32" rx="2"/><path class="ln" d="M32 27v-6"/><path class="o k-warm a-flicker" d="M32 3c5 6 7 9 7 13a7 7 0 0 1-14 0c0-4 2-7 7-13z"/>`,
  windmill: `<path class="ln" d="M32 30v30M24 60h16"/><g class="a-spin" style="transform-origin:32px 26px"><path class="o k-milk" d="M32 26L29 3h6z"/><path class="o k-milk" d="M32 26l21 10-3 5z"/><path class="o k-milk" d="M32 26L11 36l3 5z"/></g><circle class="o k-grey" cx="32" cy="26" r="3.5"/>`,
  phone: `<rect class="o k-grey" x="18" y="4" width="28" height="50" rx="5"/><rect class="k-sky" x="22" y="10" width="20" height="36" rx="2"/><path class="o k-sun a-flash" d="M34 15l-8 14h6l-2 12 8-16h-6z"/><path class="ln" d="M32 54v8"/>`,
  ballfall: `<rect class="o k-brown" x="2" y="20" width="32" height="5"/><path class="ln" d="M6 25v35M30 25v35"/><circle class="o k-warm a-fall" cx="46" cy="14" r="7"/><path class="ln" d="M46 26v24" stroke-dasharray="3 4"/><path class="ln" d="M42 47l4 6 4-6"/>`,
  pot: `<path class="ln a-steam" d="M22 22c-3-4 3-6 0-10M32 22c-3-4 3-6 0-10M42 22c-3-4 3-6 0-10"/><path class="o k-grey" d="M10 28h44v18a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8z"/><path class="ln" d="M4 30h6M54 30h6"/><path class="o k-warm a-flicker" d="M24 58q4-6 8 0 4-6 8 0z"/>`,
  toast: `<path class="o k-wheat" d="M12 28c-6-14 8-22 20-22s26 8 20 22v30H12z"/><path class="k-brown" d="M18 30c-2-8 6-14 14-14s16 6 14 14v22H18z" opacity=".55"/>`,

  /* Körper */
  heart: `<path class="o k-red a-beat" d="M32 56S6 40 6 22a13 13 0 0 1 26-5 13 13 0 0 1 26 5c0 18-26 34-26 34z"/>`,
  lungs: `<path class="ln" d="M32 4v18M32 18l-6 8M32 18l6 8"/><g class="a-breathe"><path class="o k-sky" d="M27 14c-12 2-20 18-20 34 0 6 6 8 12 6 6-2 8-6 8-12z"/><path class="o k-sky" d="M37 14c12 2 20 18 20 34 0 6-6 8-12 6-6-2-8-6-8-12z"/></g>`,
  brain: `<path class="o k-pink a-glow" d="M20 48c-8 0-14-6-12-14-4-6 0-14 8-14 2-8 12-10 16-4 4-6 14-4 16 4 8 0 12 8 8 14 2 8-4 14-12 14-2 6-10 8-12 2-4 6-12 4-12-2z"/><path class="ln" d="M32 15v34M21 27c4 2 6 6 4 10M43 27c-4 2-6 6-4 10"/>`,
  thermo: `<rect class="o k-milk" x="26" y="4" width="12" height="40" rx="6"/><circle class="o k-red" cx="32" cy="50" r="10"/><rect class="k-red a-fill" x="29.5" y="16" width="5" height="30" rx="2"/><path class="ln" d="M41 14h5M41 22h5M41 30h5"/>`,
  kidney: `<path class="o k-brown" d="M24 8c-12 0-16 14-14 26s8 22 16 22 10-8 6-14c-4-6-4-10 0-14 6-6 2-20-8-20z"/><path class="o k-brown" d="M40 8c12 0 16 14 14 26s-8 22-16 22-10-8-6-14c4-6 4-10 0-14-6-6-2-20 8-20z"/>`,
  stomach: `<path class="o k-pink" d="M24 4v12c-9 5-15 15-11 27 4 12 20 16 30 10 10-6 10-20 2-24-6-3-10 2-14 0-4-2-3-8-3-13V4"/>`,
  muscle: `<path class="o k-pink a-flex" d="M6 52c3-14 10-24 18-32l5-10 9 2-4 11 6 2c10-6 21 0 19 12-1 9-10 15-23 15z"/>`,
  bone: `<path class="o k-milk" d="M17 13a6 6 0 0 0-8 8 6 6 0 0 0 6 8l20 20a6 6 0 0 0 8 6 6 6 0 0 0 8-8 6 6 0 0 0-6-8L25 19a6 6 0 0 0-8-6z"/>`,
  tooth: `<path class="o k-milk" d="M16 10c6-4 10 0 16 0s10-4 16 0 6 16 2 24-4 22-8 22-4-14-10-14-6 14-10 14-4-14-8-22-4-20 2-24z"/>`,
  hair: `<path class="o k-brown" d="M10 58c0-26 8-46 22-50 14 4 22 24 22 50h-8c0-18-4-34-14-38-10 4-14 20-14 38z"/><path class="ln" d="M24 30c2-6 5-10 8-12M40 30c-2-6-5-10-8-12"/>`,
  drop: `<path class="o k-sky" d="M32 5C40 19 50 29 50 41a18 18 0 0 1-36 0c0-12 10-22 18-36z"/><path class="ln" d="M24 42a8 8 0 0 0 6 8"/>`,

  /* Aktivitäten */
  stairs: `<path class="o k-cream" d="M4 60V48h14V36h14V24h14V12h14v48z"/><circle class="o k-pink a-hop" cx="25" cy="27" r="5"/>`,
  book: `<path class="o k-sky" d="M6 14c9-4 17-4 26 2v40c-9-6-17-6-26-2z"/><path class="o k-cream" d="M58 14c-9-4-17-4-26 2v40c9-6 17-6 26-2z"/><path class="ln" d="M38 24h14M38 32h14M38 40h10"/>`,
  football: `<g class="a-spin"><circle class="o k-milk" cx="32" cy="32" r="24"/><path class="o k-ink" d="M32 22l9 7-3 10H26l-3-10z"/><path class="ln" d="M32 8v14M41 29l14-4M38 39l8 12M26 39l-8 12M23 29L9 25"/></g>`,
  bag: `<path class="o k-warm" d="M10 24h44l-4 32H14z"/><path class="ln" d="M22 24v-6a10 10 0 0 1 20 0v6"/>`,
  bed: `<path class="ln" d="M6 28v30M58 42v16"/><path class="o k-sky" d="M6 42h52v10H6z"/><rect class="o k-milk" x="9" y="33" width="13" height="9" rx="3"/><path class="o k-pink" d="M22 42c4-9 32-9 36 0z"/>`,
  eye: `<path class="o k-milk" d="M4 32c8-12 18-18 28-18s20 6 28 18c-8 12-18 18-28 18S12 44 4 32z"/><circle class="o k-sky" cx="32" cy="32" r="9"/><circle class="k-ink a-blink" cx="32" cy="32" r="4"/>`,
  plate: `<ellipse class="o k-milk" cx="32" cy="36" rx="27" ry="15"/><ellipse class="ln" cx="32" cy="35" rx="16" ry="8"/>`,
  scale: `<rect class="o k-grey" x="8" y="14" width="48" height="40" rx="8"/><path class="o k-milk" d="M18 32a14 14 0 0 1 28 0z"/><path class="ln" d="M32 32l5-9"/>`,
  clock: `<circle class="o k-milk" cx="32" cy="32" r="25"/><path class="ln" d="M32 15v17"/><path class="ln a-spin" d="M32 32l12 7"/>`,

  /* Lebensmittel */
  bread: `<path class="o k-wheat" d="M8 30c0-12 10-18 24-18s24 6 24 18c0 4-3 6-6 6v18H14V36c-3 0-6-2-6-6z"/><path class="ln" d="M22 20l-3 6M32 18l-2 7M42 20l-2 6"/>`,
  pasta: `<path class="o k-sky" d="M6 32h52c0 14-12 24-26 24S6 46 6 32z"/><path class="o k-wheat" d="M9 32c1-7 6-11 9-6 2-6 7-7 9-1 2-6 8-6 10 0 2-5 8-5 9 1 3-5 8-2 9 6z"/><path class="ln" d="M16 30c2-3 4-3 6 0M30 28c2-3 4-3 6 0M42 29c2-3 4-3 6 0"/>`,
  rice: `<path class="o k-sky" d="M6 32h52c0 14-12 24-26 24S6 46 6 32z"/><path class="o k-milk" d="M10 32c4-13 40-13 44 0z"/><path class="ln" d="M22 25l2 1M30 22l2 1M38 24l2 1M45 28l1 1M17 29l1 1"/>`,
  potato: `<path class="o k-wheat" d="M8 34c-2-12 10-22 24-20 14 1 23 10 21 22-2 10-14 16-26 14-10-2-17-8-19-16z"/><circle class="k-brown" cx="22" cy="28" r="2"/><circle class="k-brown" cx="38" cy="24" r="2"/><circle class="k-brown" cx="41" cy="38" r="2"/><circle class="k-brown" cx="26" cy="42" r="2"/>`,
  oats: `<path class="o k-sky" d="M6 32h52c0 14-12 24-26 24S6 46 6 32z"/><ellipse class="o k-wheat" cx="20" cy="28" rx="7" ry="4"/><ellipse class="o k-wheat" cx="33" cy="25" rx="7" ry="4"/><ellipse class="o k-wheat" cx="45" cy="29" rx="7" ry="4"/>`,
  honey: `<rect class="o k-sun" x="14" y="20" width="36" height="38" rx="8"/><rect class="o k-brown" x="18" y="10" width="28" height="10" rx="3"/><path class="ln" d="M22 34h20M22 42h14"/>`,
  apple: `<path class="o k-red" d="M32 18c-6-6-24-4-24 14s12 28 18 26c3-1 4-2 6-2s3 1 6 2c6 2 18-8 18-26S38 12 32 18z"/><path class="ln" d="M32 18c0-6 2-10 6-12"/><path class="o k-leaf" d="M34 12c4-6 10-6 12-4-2 4-8 6-12 4z"/>`,
  sugar: `<path class="o k-milk" d="M14 24l18-10 18 10v22L32 56 14 46z"/><path class="ln" d="M14 24l18 10 18-10M32 34v22"/>`,
  butter: `<path class="o k-sun" d="M6 34l14-12h38L44 34z"/><path class="o k-sun" d="M6 34h38v16H6z"/><path class="o k-sun" d="M44 34l14-12v16L44 50z"/>`,
  oil: `<path class="o k-sun" d="M26 4h12v10l6 8v34a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V22l6-8z"/><path class="o k-leaf" d="M20 34h24v14H20z"/>`,
  nut: `<path class="o k-brown" d="M32 9c12 0 20 10 20 23 0 14-10 23-20 23S12 46 12 32C12 19 20 9 32 9z"/><path class="ln" d="M32 9v46M22 22c4 4 4 8 0 12M42 22c-4 4-4 8 0 12"/>`,
  cheese: `<path class="o k-sun" d="M6 38L44 12l14 10v24H6z"/><path class="ln" d="M6 38h52"/><circle class="o k-cream" cx="20" cy="46" r="3"/><circle class="o k-cream" cx="38" cy="43" r="4"/><circle class="o k-cream" cx="47" cy="27" r="3"/>`,
  sausage: `<path class="o k-red" d="M8 44c-6-6-2-16 6-14 8 2 20 2 30-6 6-4 15 2 11 10-4 8-18 16-34 16-6 0-10-2-13-6z"/><path class="ln" d="M20 40l2 2M30 37l2 2M40 32l2 2"/>`,
  cream: `<path class="o k-milk" d="M14 22h36l-4 34H18z"/><path class="o k-milk" d="M12 22c4-9 36-9 40 0z"/><path class="ln" d="M17 34h30"/>`,
  avocado: `<path class="o k-leaf" d="M32 4c8 0 12 10 16 20s8 18 2 28-30 10-36 0 0-18 4-28S24 4 32 4z"/><path class="o k-cream" d="M32 14c5 0 8 8 10 14s4 12 0 18-16 6-20 0-2-12 0-18 5-14 10-14z"/><circle class="o k-brown" cx="32" cy="38" r="7"/>`,
  meat: `<path class="o k-red" d="M8 28c0-12 14-18 28-16s19 12 17 22-12 20-26 18S8 40 8 28z"/><path class="o k-milk" d="M38 21a6 6 0 1 1-1 0z"/>`,
  fish: `<path class="o k-sky" d="M4 32c8-12 28-16 40-4l14-9v26l-14-9C32 48 12 44 4 32z"/><circle class="k-ink" cx="16" cy="30" r="2"/><path class="ln" d="M26 24c3 5 3 11 0 16"/>`,
  egg: `<path class="o k-milk" d="M32 6c10 0 20 18 20 32a20 20 0 0 1-40 0C12 24 22 6 32 6z"/>`,
  milk: `<path class="o k-milk" d="M16 6h32l-4 52H20z"/><path class="ln" d="M17.5 18h29"/>`,
  lentils: `<circle class="o k-warm" cx="20" cy="46" r="6"/><circle class="o k-warm" cx="32" cy="48" r="6"/><circle class="o k-warm" cx="44" cy="46" r="6"/><circle class="o k-warm" cx="26" cy="36" r="6"/><circle class="o k-warm" cx="38" cy="36" r="6"/><circle class="o k-warm" cx="32" cy="26" r="6"/>`,
  tofu: `<path class="o k-milk" d="M10 24l20-10 24 8v24L34 56 10 46z"/><path class="ln" d="M10 24l24 8 20-10M34 32v24"/>`,
  banana: `<path class="o k-sun" d="M10 16c4 22 20 34 44 30-2 7-11 11-21 11C17 57 5 39 10 16z"/><path class="ln" d="M10 16l-2-7"/>`,
  broccoli: `<path class="o k-leaf" d="M26 40h12l-2 18h-8z"/><path class="o k-leaf" d="M14 32a10 10 0 0 1 8-15 12 12 0 0 1 20 0 10 10 0 0 1 8 15 8 8 0 0 1-6 10H20a8 8 0 0 1-6-10z"/>`,
  salt: `<path class="o k-milk" d="M20 22h24v34a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4z"/><path class="o k-grey" d="M20 22c0-11 24-11 24 0z"/><circle class="k-ink" cx="28" cy="15" r="1.5"/><circle class="k-ink" cx="36" cy="15" r="1.5"/><circle class="k-ink" cx="32" cy="12" r="1.5"/><text x="32" y="45" class="itx">NaCl</text>`,
  seeds: `<ellipse class="o k-leaf" cx="22" cy="24" rx="7" ry="11" transform="rotate(-25 22 24)"/><ellipse class="o k-leaf" cx="42" cy="26" rx="7" ry="11" transform="rotate(25 42 26)"/><ellipse class="o k-leaf" cx="32" cy="44" rx="7" ry="11"/>`,
  carrot: `<path class="o k-warm" d="M44 16L10 54c-2 3 1 5 3 3l42-30c5-5-6-15-11-11z"/><path class="o k-leaf" d="M48 18c0-8 4-12 10-14-1 6-4 10-10 14zM50 20c6-3 10-2 13 1-5 3-9 2-13-1z"/>`,
  orange: `<circle class="o k-warm" cx="32" cy="35" r="22"/><path class="ln" d="M32 13v7M22 30l2 1M40 42l2 1M28 46l1 1"/><path class="o k-leaf" d="M32 15c4-7 11-8 15-6-2 6-9 8-15 6z"/>`,
  chocolate: `<rect class="o k-brown" x="12" y="8" width="40" height="48" rx="3"/><path class="ln" d="M12 24h40M12 40h40M32 8v48"/>`,

  /* Nährstoff-Bilder */
  pump: `<rect class="o k-warm" x="8" y="10" width="28" height="48" rx="4"/><rect class="o k-milk" x="13" y="16" width="18" height="12" rx="2"/><path class="ln" d="M36 22h6l7 7v19a4 4 0 0 1-8 0V36h-5M4 58h36"/><path class="ln a-wave" d="M17 22h10"/>`,
  tank: `<rect class="o k-grey" x="6" y="14" width="52" height="38" rx="10"/><rect class="k-sun a-fill" x="10" y="27" width="44" height="21" rx="6"/><path class="ln" d="M20 8h10M25 8v6M14 58h8M42 58h8"/>`,
  bricks: `<rect class="o k-red a-brick b1" x="6" y="44" width="25" height="12" rx="1"/><rect class="o k-red a-brick b2" x="33" y="44" width="25" height="12" rx="1"/><rect class="o k-red a-brick b3" x="19" y="30" width="25" height="12" rx="1"/><rect class="o k-red a-brick b4" x="19" y="16" width="25" height="12" rx="1"/>`,
  leaf: `<path class="o k-leaf" d="M10 54C10 24 30 10 56 8c0 28-16 46-46 46z"/><path class="ln" d="M10 54L42 22"/>`,
  stone: `<path class="o k-grey" d="M8 46l8-20 16-8 18 6 8 18-10 10H18z"/><path class="ln" d="M24 30l6 6M40 30l-4 8"/>`,

  /* App */
  star: `<polygon class="o k-sun" points="32,4 40,23 61,24 45,38 50,59 32,48 14,59 19,38 3,24 24,23"/>`,
  cards: `<rect class="o k-sky" x="6" y="12" width="28" height="40" rx="4" transform="rotate(-10 20 32)"/><g class="a-wobble"><rect class="o k-sun" x="30" y="12" width="28" height="40" rx="4" transform="rotate(8 44 32)"/><text x="44" y="40" class="itx big">?</text></g>`,
  bins: `<path class="o k-leaf" d="M4 32h24l-3 26H7z"/><path class="o k-violet" d="M36 32h24l-3 26H39z"/><rect class="o k-sun a-hop" x="25" y="6" width="14" height="14" rx="3"/>`,
  calc: `<rect class="o k-grey" x="14" y="5" width="36" height="54" rx="5"/><rect class="o k-leaf" x="19" y="10" width="26" height="12" rx="2"/><g class="k-milk o"><circle cx="23" cy="31" r="3"/><circle cx="32" cy="31" r="3"/><circle cx="41" cy="31" r="3"/><circle cx="23" cy="41" r="3"/><circle cx="32" cy="41" r="3"/><circle cx="41" cy="41" r="3"/><circle cx="23" cy="51" r="3"/><circle cx="32" cy="51" r="3"/><circle cx="41" cy="51" r="3"/></g>`,
  exam: `<path class="o k-milk" d="M12 6h30l10 10v42H12z"/><path class="ln" d="M20 22h20M20 30h24M20 38h16"/><path class="lnok a-draw" d="M26 49l6 6 13-14"/>`,
  notebook: `<rect class="o k-red" x="12" y="6" width="42" height="52" rx="3"/><rect class="o k-milk" x="21" y="14" width="26" height="10" rx="1"/><path class="ln" d="M12 16H7M12 28H7M12 40H7M12 52H7"/>`,
  quiz: `<path class="o k-sky" d="M6 8h52v34H30L18 54V42H6z"/><text x="32" y="34" class="itx big a-hop">?</text>`,
  letter: `<rect class="o k-milk" x="4" y="16" width="48" height="34" rx="4"/><path class="ln" d="M4 18l24 18 24-18"/><g class="a-wobble"><path class="o k-sun" d="M40 54l14-28 6 3-14 28-7 4z"/></g>`,

  /* Ergänzungen aus dem Unterrichtsmaterial */
  spring: `<rect class="o k-grey" x="8" y="54" width="48" height="6" rx="2"/><path class="ln w4" d="M20 52l24-5-24-5 24-5-24-5 24-5"/><rect class="o k-red a-hop" x="14" y="14" width="36" height="9" rx="3"/>`,
  car: `<path class="o k-red" d="M4 46V36l9-3 9-11h18l10 11 10 3v10z"/><path class="o k-sky" d="M24 25h7v8H18zM35 25h4l7 8H35z"/><g class="a-spin" style="transform-origin:18px 46px"><circle class="o k-grey" cx="18" cy="46" r="7"/><path class="ln" d="M18 40v12M12 46h12"/></g><g class="a-spin" style="transform-origin:46px 46px"><circle class="o k-grey" cx="46" cy="46" r="7"/><path class="ln" d="M46 40v12M40 46h12"/></g>`,
  guitar: `<path class="ln w4" d="M36 28L54 10"/><path class="o k-grey" d="M50 6l8 8-4 4-8-8z"/><path class="o k-warm" d="M28 24c7-6 15-1 12 7-1 4 2 6 0 10-3 8-12 14-20 17S3 57 7 46c3-8 10-8 12-13 2-4 4-6 9-9z"/><circle class="o k-brown" cx="25" cy="39" r="5"/><path class="ln a-wave" d="M50 34q5 5 0 10"/><path class="ln a-wave w2" d="M56 30q8 9 0 18"/>`,
  parachute: `<g class="a-sway"><path class="o k-red" d="M6 26a26 20 0 0 1 52 0q-6.5-4-13 0-6.5-4-13 0-6.5-4-13 0-6.5-4-13 0z"/><path class="ln" d="M6 26l23 22M58 26L35 48M19 26l10 22M45 26L35 48"/><circle class="o k-pink" cx="32" cy="50" r="5"/><path class="ln" d="M32 55v6M27 58h10"/></g>`,
  cat: `<path class="o k-brown" d="M2 48h60v6H2z"/><path class="o k-leaf" d="M52 48l8-10 2 10z"/><path class="o k-grey" d="M14 48c-2-8 1-14 8-16l1-10 6 6h6l6-6 1 10c6 3 7 9 5 16z"/><circle class="k-ink a-blink" cx="27" cy="36" r="1.8"/><circle class="k-ink a-blink" cx="37" cy="36" r="1.8"/><path class="ln" d="M44 48c6 1 8 5 6 12"/>`,
  corn: `<path class="o k-leaf" d="M20 60c-5-14-2-30 10-36-6 10-6 24-2 36z"/><path class="o k-sun" d="M32 4c8 0 12 14 10 30s-6 24-10 24-8-8-10-24S24 4 32 4z"/><path class="ln" d="M24 20h16M23 30h18M24 40h16M32 6v50"/><path class="o k-leaf" d="M44 60c5-14 2-30-10-36 6 10 6 24 2 36z"/>`,
  popcorn: `<path class="o k-milk" d="M14 28h36l-5 32H19z"/><path class="k-red" d="M23 28h6l-1 32h-5zM36 28h6l-3 32h-4z"/><g class="o k-cream"><circle cx="20" cy="24" r="7"/><circle cx="32" cy="20" r="8"/><circle cx="44" cy="24" r="7"/><circle cx="25" cy="12" r="5"/><circle cx="39" cy="12" r="5"/></g>`,
  peas: `<path class="o k-cream" d="M4 42C12 20 40 10 60 16c-6 22-34 34-56 26z"/><g class="o k-leaf"><circle cx="19" cy="35" r="5.5"/><circle cx="31" cy="29" r="5.5"/><circle cx="43" cy="24" r="5.5"/></g><path class="ln" d="M60 16l2-6"/>`,
  dna: `<path class="ln w4" d="M20 4c0 14 24 14 24 28S20 46 20 60"/><path class="ln w4" d="M44 4c0 14-24 14-24 28s24 14 24 28"/><path class="ln" d="M25 13h14M22 21h20M22 43h20M25 51h14"/>`,
  chips: `<path class="o k-sun" d="M14 6h36l-4 8 4 8-2 34H16l-2-34 4-8z"/><path class="ln" d="M14 14h36"/><ellipse class="o k-wheat" cx="32" cy="35" rx="11" ry="8"/>`,
  liver: `<path class="o k-brown" d="M6 28c0-10 14-15 30-15s24 4 22 12c-2 10-14 12-24 20-8 6-16 6-22 0-4-4-6-9-6-17z"/><path class="ln" d="M36 15c-4 10-4 20 0 30"/>`,
  dots: `<g class="o k-grey"><circle cx="15" cy="32" r="7"/><circle cx="32" cy="32" r="7"/><circle cx="49" cy="32" r="7"/></g>`,
  cell: `<circle class="o k-pink" cx="32" cy="32" r="25"/><circle class="o k-violet a-beat" cx="35" cy="29" r="9"/><circle class="k-ink" cx="19" cy="41" r="2"/><circle class="k-ink" cx="44" cy="45" r="2"/><circle class="k-ink" cx="21" cy="22" r="1.6"/>`,
  virus: `<g class="a-spin"><path class="ln" d="M32 4v12M32 48v12M4 32h12M48 32h12M12 12l8 8M44 44l8 8M12 52l8-8M44 20l8-8"/><circle class="o k-leaf" cx="32" cy="32" r="16"/><circle class="k-ink" cx="27" cy="28" r="2.5"/><circle class="k-ink" cx="38" cy="35" r="3"/><circle class="k-ink" cx="29" cy="39" r="1.8"/></g>`,
  mushroom: `<path class="o k-red" d="M6 34C6 18 18 8 32 8s26 10 26 26z"/><path class="o k-cream" d="M24 34h16l-2 24H26z"/><circle class="k-milk" cx="21" cy="22" r="3.5"/><circle class="k-milk" cx="41" cy="19" r="4"/><circle class="k-milk" cx="33" cy="28" r="2.5"/>`,
  bandage: `<g transform="rotate(-35 32 32)"><rect class="o k-wheat" x="3" y="21" width="58" height="22" rx="11"/><rect class="o k-milk" x="21" y="21" width="22" height="22"/><circle class="k-ink" cx="27" cy="27" r="1.4"/><circle class="k-ink" cx="37" cy="27" r="1.4"/><circle class="k-ink" cx="27" cy="37" r="1.4"/><circle class="k-ink" cx="37" cy="37" r="1.4"/></g>`,
  algae: `<path class="o k-leaf a-sway" d="M20 60c-6-14 8-20 0-34-4-8 2-16 6-22 2 10-4 16 0 24 6 12-6 18 0 32z"/><path class="o k-leaf a-sway w2" d="M38 60c-4-12 10-18 4-30-3-6 0-12 4-18 2 8-2 14 0 20 6 12-6 16-2 28z"/><path class="ln a-wave" d="M4 60h56"/>`,
  alert: `<path class="o k-sun" d="M32 5l28 51H4z"/><path class="ln w4" d="M32 22v17"/><circle class="k-ink" cx="32" cy="47" r="3"/>`
};

function ico(name, cls = "", label = "") {
  const body = ICONS[name];
  if (!body) return "";
  return `<svg class="ico ${cls}" viewBox="0 0 64 64" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}>${body}</svg>`;
}

/* ---------------------------------------------------------------------
   ABBILDUNGEN
   Jede Funktion gibt HTML zurück. Diagramme sind im Ruhezustand fertig
   sichtbar; .play (beim Sichtbarwerden) spielt die Wachstums-Animation.
   --------------------------------------------------------------------- */
const FIG = (() => {
  const t = x => typeof x === "string" ? { de: x, es: "" } : x;
  const md = s => s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\[\[(.+?)\]\]/g, (m, k) => k.split("|")[0]);
  const bi2 = x => { const v = t(x); return `<span class="de">${md(v.de)}</span>${v.es ? `<span class="es" lang="es">${md(v.es)}</span>` : ""}`; };
  /* Icon innerhalb eines großen SVG platzieren (Mitte x/y, Größe s) */
  const icoAt = (name, x, y, s) => `<g transform="translate(${x - s / 2} ${y - s / 2}) scale(${s / 64})">${ICONS[name]}</g>`;
  const svgText = (x, y, v, attrs = "") => {
    v = t(v);
    return `<text x="${x}" y="${y}" ${attrs}>${v.de}</text>` + (v.es ? `<text x="${x}" y="${y + 14}" class="es-svg" ${attrs}>${v.es}</text>` : "");
  };
  const n = v => Number(v).toLocaleString("de-DE", { useGrouping: false, maximumFractionDigits: 2 });

  /* Pfeil mit laufenden Strichen */
  const arrow = (label = "") => `<span class="flow-arrow">${label ? `<span class="fa-label">${bi2(label)}</span>` : ""}<span class="fa-line"></span></span>`;

  /* Energiekette: [{ico, title, sub, go}] */
  function chain(steps, labels = []) {
    return `<div class="chainfig">${steps.map((s, i) => `
      ${i ? arrow(labels[i - 1]) : ""}
      <${s.go ? `button type="button" data-go="${s.go}"` : "div"} class="cnode ${s.tc ? "tc-" + s.tc : ""}">
        ${ico(s.ico, "lg")}
        <span class="cnode-t">${bi2(s.title)}</span>
        ${s.sub ? `<span class="cnode-s">${bi2(s.sub)}</span>` : ""}
      </${s.go ? "button" : "div"}>`).join("")}</div>`;
  }

  return {
    arrow, chain,

    home() {
      return chain([
        { ico: "sun", title: { de: "Sonne", es: "Sol" }, sub: { de: "Lichtenergie", es: "energía lumínica" }, go: "energie", tc: "energie" },
        { ico: "plant", title: { de: "Pflanze", es: "Planta" }, sub: { de: "speichert chemische Energie", es: "almacena energía química" }, go: "energie", tc: "energie" },
        { ico: "bread", title: { de: "Nahrung", es: "Alimentos" }, sub: { de: "Nährstoffe, Vitamine, Mineralsalze", es: "nutrientes, vitaminas, sales minerales" }, go: "naehrstoffe", tc: "naehrstoffe" },
        { ico: "runner", title: { de: "Dein Körper", es: "Tu cuerpo" }, sub: { de: "Grundumsatz + Leistungsumsatz", es: "metabolismo basal + actividad" }, go: "umsatz", tc: "umsatz" }
      ], [{ de: "Licht", es: "luz" }, { de: "essen", es: "comer" }, { de: "verdauen", es: "digerir" }]);
    },

    energyChain() {
      const heat = { de: "+ Wärme", es: "+ calor" };
      return chain([
        { ico: "sun", title: { de: "Lichtenergie", es: "energía lumínica" }, sub: { de: "Sonne", es: "Sol" } },
        { ico: "plant", title: { de: "chemische Energie", es: "energía química" }, sub: { de: "Pflanze, Nahrung", es: "planta, comida" } },
        { ico: "bike", title: { de: "Bewegungs­energie", es: "energía cinética" }, sub: { de: "Mensch auf dem Fahrrad", es: "persona en bici" } },
        { ico: "bolt", title: { de: "elektrische Energie", es: "energía eléctrica" }, sub: { de: "Dynamo", es: "dinamo" } },
        { ico: "bulb", title: { de: "Lichtenergie", es: "energía lumínica" }, sub: { de: "Lampe", es: "lámpara" } }
      ], [heat, heat, heat, heat]);
    },

    /* Energieformen wie im Heft: Spinnennetz um „Energieformen“ */
    formsWheel() {
      const items = [
        ["chemisch", { de: "Benzin, Nahrung", es: "gasolina, comida" }],
        ["lage", { de: "Berge, Höhe", es: "montañas, altura" }],
        ["bewegung", { de: "Motorrad", es: "moto" }],
        ["waerme", { de: "Feuer", es: "fuego" }],
        ["kern", { de: "Uran, Bomben", es: "uranio, bombas" }],
        ["licht", { de: "Sonne, Lampe", es: "Sol, lámpara" }],
        ["schall", { de: "Gitarre, Megaphon", es: "guitarra, megáfono" }],
        ["elektrisch", { de: "Steckdose", es: "enchufe" }],
        ["spannung", { de: "Feder, Trampolin", es: "muelle, trampolín" }]
      ];
      const cx = 300, cy = 212, rx = 222, ry = 156;
      const pts = items.map((_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / items.length; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; });
      return `<svg class="wheel" viewBox="0 0 600 432" role="img" aria-label="Energieformen: ${items.map(([k]) => FORMS[k].name.de).join(", ")}">
        ${pts.map(([x, y]) => `<path class="spoke" d="M${cx} ${cy}L${x.toFixed(1)} ${(y - 14).toFixed(1)}"/>`).join("")}
        <ellipse class="w-center" cx="${cx}" cy="${cy}" rx="78" ry="34"/>
        <text x="${cx}" y="${cy - 3}" class="lbl b" text-anchor="middle">Energie-</text>
        <text x="${cx}" y="${cy + 14}" class="lbl b" text-anchor="middle">formen</text>
        ${items.map(([k, ex], i) => { const [x, y] = pts[i], f = FORMS[k]; return `<g class="wnode" style="--i:${i}">
          <circle class="w-dot" cx="${x.toFixed(1)}" cy="${(y - 14).toFixed(1)}" r="29"/>
          ${icoAt(f.ico, x, y - 14, 40)}
          <text x="${x.toFixed(1)}" y="${(y + 31).toFixed(1)}" class="lbl b" text-anchor="middle">${f.name.de.split(" (")[0]}</text>
          <text x="${x.toFixed(1)}" y="${(y + 46).toFixed(1)}" class="lbl sm w-ex" text-anchor="middle">${ex.de}</text>
          <text x="${x.toFixed(1)}" y="${(y + 60).toFixed(1)}" class="lbl sm es-svg" text-anchor="middle">${f.name.es}</text></g>`; }).join("")}
      </svg>`;
    },

    doWork() {
      const tiles = [
        ["ball", { de: "bewegen", es: "mover" }],
        ["pot", { de: "erwärmen", es: "calentar" }],
        ["bulb", { de: "beleuchten", es: "iluminar" }],
        ["toast", { de: "verändern", es: "transformar" }]
      ];
      return `<div class="tiles4">${tiles.map(([i, l]) => `<div class="tile">${ico(i, "lg")}<span>${bi2(l)}</span></div>`).join("")}</div>`;
    },

    kcal() {
      return `<div class="kcalfig" role="img" aria-label="1 kcal ist so viel wie 4,2 kJ">
        <div class="kc-row"><span class="kc-box big">1 kcal</span></div>
        <div class="kc-eq">=</div>
        <div class="kc-row">${[1, 2, 3, 4].map(i => `<span class="kc-box" style="--i:${i}">1 kJ</span>`).join("")}<span class="kc-box sliver" style="--i:5">0,2</span></div>
      </div>`;
    },

    /* Glühlampe vs. LED: Energie bleibt erhalten */
    sankey(mode = "bulb") {
      const light = mode === "bulb" ? 5 : 40, heat = 100 - light;
      const x0 = 10, x1 = 236, x2 = 420, y0 = 70, k = 1;
      const hL = light * k, hH = heat * k;
      const tL = 22, tH = tL + hL + 34;
      const band = (sy, ty, h) => { const m = (x1 + x2) / 2; return `M${x1} ${sy}C${m} ${sy} ${m} ${ty} ${x2} ${ty}L${x2} ${ty + h}C${m} ${ty + h} ${m} ${sy + h} ${x1} ${sy + h}Z`; };
      const mid = (sy, ty, h) => { const m = (x1 + x2) / 2; return `M${x1} ${sy + h / 2}C${m} ${sy + h / 2} ${m} ${ty + h / 2} ${x2} ${ty + h / 2}`; };
      return `<svg class="sankey" viewBox="0 0 540 210" role="img" aria-label="${mode === "bulb" ? "Glühlampe" : "LED"}: 100 J elektrische Energie werden zu ${light} J Licht und ${heat} J Wärme.">
        <rect class="k-sky" x="${x0}" y="${y0}" width="${x1 - x0}" height="100"/>
        <path class="k-sun" d="${band(y0, tL, hL)}"/>
        <path class="k-red" d="${band(y0 + hL, tH, hH)}"/>
        <path class="flowline a-flow" d="M${x0} ${y0 + 50}H${x1}"/>
        <path class="flowline a-flow" d="${mid(y0, tL, hL)}"/>
        <path class="flowline a-flow" d="${mid(y0 + hL, tH, hH)}"/>
        <g transform="translate(${x1 - 46} ${y0 + 14}) scale(1.15)" class="sankey-dev">${mode === "bulb" ? ICONS.bulb : ICONS.bulb.replace("k-sun", "k-milk")}</g>
        <text x="${x0}" y="${y0 - 10}" class="lbl">100 J elektrische Energie</text>
        <text x="${x2 + 8}" y="${tL + hL / 2 + 5}" class="lbl b">${light} J Licht</text>
        <text x="${x2 + 8}" y="${tH + hH / 2 + 5}" class="lbl b">${heat} J Wärme</text>
      </svg>`;
    },

    body() {
      return `<svg class="bodyfig" viewBox="0 0 360 300" role="img" aria-label="Wofür der Grundumsatz gebraucht wird: Gehirn, Atmung, Herzschlag, Nieren und Körpertemperatur von 37 Grad.">
        <g class="o k-body">
          <circle cx="110" cy="46" r="30"/><rect x="100" y="72" width="20" height="16"/>
          <path d="M70 92Q110 80 150 92L146 200Q110 212 74 200Z"/>
          <path d="M70 96L44 170 57 175 82 122Z"/><path d="M150 96L176 170 163 175 138 122Z"/>
          <path d="M80 198L76 292H98L106 206Z"/><path d="M140 198L144 292H122L114 206Z"/>
        </g>
        <g class="a-glow"><ellipse class="o k-pink" cx="110" cy="40" rx="21" ry="14"/><path class="ln" d="M110 27v26M98 36c3 2 4 5 2 8M122 36c-3 2-4 5-2 8"/></g>
        <path class="ln" d="M110 86v18"/>
        <g class="a-breathe" style="transform-origin:110px 128px;transform-box:view-box">
          <path class="o k-sky" d="M104 104C88 106 82 128 84 146 86 154 100 152 104 146Z"/>
          <path class="o k-sky" d="M116 104C132 106 138 128 136 146 134 154 120 152 116 146Z"/>
        </g>
        <path class="o k-red a-beat" d="M118 152s-12-8-12-16a6 6 0 0 1 12-2 6 6 0 0 1 12 2c0 8-12 16-12 16z"/>
        <ellipse class="o k-brown" cx="98" cy="178" rx="6" ry="9"/><ellipse class="o k-brown" cx="122" cy="178" rx="6" ry="9"/>
        <rect class="o k-milk" x="14" y="112" width="12" height="70" rx="6"/><circle class="o k-red" cx="20" cy="190" r="10"/>
        <rect class="k-red a-fill" x="17.5" y="128" width="5" height="60" rx="2"/>
        ${svgText(20, 222, "37 °C", 'class="lbl b" text-anchor="middle"')}
        <g class="ln"><path d="M132 40H198"/><path d="M138 120H198"/><path d="M128 144L198 160"/><path d="M130 180H198"/></g>
        <g class="dots"><circle cx="132" cy="40" r="3"/><circle cx="138" cy="120" r="3"/><circle cx="128" cy="144" r="3"/><circle cx="130" cy="180" r="3"/></g>
        ${svgText(204, 44, { de: "Gehirn", es: "cerebro" }, 'class="lbl b"')}
        ${svgText(204, 124, { de: "Atmung", es: "respiración" }, 'class="lbl b"')}
        ${svgText(204, 164, { de: "Herzschlag", es: "latido" }, 'class="lbl b"')}
        ${svgText(204, 200, { de: "Nieren", es: "riñones" }, 'class="lbl b"')}
      </svg>`;
    },

    conditions() {
      const c = [["bed", { de: "liegend", es: "tumbado" }], ["eye", { de: "wach", es: "despierto" }], ["plate", { de: "nüchtern", es: "en ayunas" }], ["thermo", { de: "ca. 20 °C", es: "aprox. 20 °C" }]];
      return `<div class="tiles4">${c.map(([i, l]) => `<div class="tile">${ico(i, "lg")}<span>${bi2(l)}</span></div>`).join("")}</div>`;
    },

    stacked() {
      // Grundumsatz in kJ = kg × 24 (× 0,9) × 4,2; Gesamt = Grundumsatz × PAL
      const rows = [
        { who: { de: "Lena, 50 kg – Schultag (PAL 1,5)", es: "Lena, 50 kg – día de colegio (PAL 1,5)" }, gu: 4536, pal: 1.5 },
        { who: { de: "Lena – Tag mit Fußballtraining (PAL 1,8)", es: "Lena – día con entrenamiento (PAL 1,8)" }, gu: 4536, pal: 1.8 },
        { who: { de: "Landwirt, 80 kg (PAL 2,0)", es: "agricultor, 80 kg (PAL 2,0)" }, gu: 8064, pal: 2.0 }
      ].map(r => ({ ...r, lu: Math.round(r.gu * r.pal - r.gu) }));
      const max = 18000;
      return `<div class="chart stacked">
        <div class="legend"><span><i class="sw-gu"></i>Grundumsatz</span><span><i class="sw-lu"></i>Leistungsumsatz</span></div>
        ${rows.map((r, i) => `<div class="srow">
          <div class="srow-l">${bi2(r.who)}</div>
          <div class="strack"><span class="sseg gu grow" style="width:${r.gu / max * 100}%;--d:${i * .15}s">${n(r.gu)}</span><span class="sseg lu grow" style="width:${r.lu / max * 100}%;--d:${i * .15 + .3}s">${n(r.lu)}</span></div>
          <div class="srow-v mono">${n(r.gu + r.lu)} kJ</div></div>`).join("")}
        <div class="axis"><span style="left:0">0</span><span style="left:33.33%">6000</span><span style="left:66.67%">12 000</span><span style="left:100%">18 000 kJ</span></div>
      </div>`;
    },

    /* Anteil der Organe am Grundumsatz */
    organs() {
      return `<div class="chart bars organs">
        ${ORGANS.map((o, i) => `<div class="brow"><div class="brow-l">${ico(o.ico, "sm")}<span>${bi2({ de: o.de, es: o.es })}</span></div>
          <div class="btrack"><span class="bar1 grow ${o.v >= 19 ? "hi" : ""}" style="width:${o.v / 30 * 100}%;--d:${i * .12}s"></span><span class="bval mono">ca. ${o.v} %</span></div></div>`).join("")}
        <div class="axis"><span style="left:0">0</span><span style="left:33.33%">10</span><span style="left:66.67%">20</span><span style="left:100%">30 %</span></div>
      </div>`;
    },

    hours() {
      return `<div class="hours" aria-hidden="true">${Array.from({ length: 24 }, (_, i) => `<span class="hr" style="--i:${i}"><b></b><small>${i + 1} h</small></span>`).join("")}</div>`;
    },

    amounts() {
      const items = [
        { de: "Kohlenhydrate", es: "carbohidratos", g: 250, cls: "k-wheat" },
        { de: "Proteine", es: "proteínas", g: 50, cls: "k-red" },
        { de: "Vitamin C", es: "vitamina C", g: 0.1, cls: "k-warm" }
      ];
      return `<div class="amounts">${items.map(it => {
        const s = Math.max(4, Math.sqrt(it.g) * 10);
        return `<div class="amt"><div class="amt-box"><span class="sq ${it.cls} grow" style="width:${s}px;height:${s}px"></span>${it.g < 1 ? `<span class="amt-ping"></span>` : ""}</div>
          <b>${bi2({ de: it.de, es: it.es })}</b><span class="mono">${n(it.g)} g</span></div>`;
      }).join("")}</div>`;
    },

    venn() {
      return `<svg class="venn" viewBox="0 0 440 230" role="img" aria-label="Vitamine und Mineralsalze im Vergleich">
        <circle class="v-left" cx="160" cy="115" r="105"/><circle class="v-right" cx="280" cy="115" r="105"/>
        <text x="100" y="62" class="lbl b big" text-anchor="middle">Vitamine</text>
        <text x="100" y="98" class="lbl" text-anchor="middle">organisch</text>
        <text x="100" y="120" class="lbl" text-anchor="middle">z. B. Vitamin C</text>
        <text x="100" y="142" class="lbl" text-anchor="middle">6 Gruppen:</text>
        <text x="100" y="158" class="lbl" text-anchor="middle">A, B, C, D, E, K</text>
        <text x="340" y="62" class="lbl b big" text-anchor="middle">Mineralsalze</text>
        <text x="340" y="98" class="lbl" text-anchor="middle">anorganisch</text>
        <text x="340" y="120" class="lbl" text-anchor="middle">z. B. Calcium</text>
        <text x="340" y="142" class="lbl" text-anchor="middle">als Ionen</text>
        <text x="340" y="158" class="lbl" text-anchor="middle">aufgenommen</text>
        <text x="220" y="72" class="lbl b" text-anchor="middle">beide:</text>
        <text x="220" y="100" class="lbl sm" text-anchor="middle">lebens-</text>
        <text x="220" y="114" class="lbl sm" text-anchor="middle">notwendig</text>
        <text x="220" y="140" class="lbl sm" text-anchor="middle">keine</text>
        <text x="220" y="154" class="lbl sm" text-anchor="middle">Energie</text>
      </svg>`;
    },

    drops() {
      const letter = (x, y, l, d) => `<g class="a-float" style="animation-delay:${d}s"><circle class="o k-milk" cx="${x}" cy="${y}" r="15"/><text x="${x}" y="${y + 6}" class="itx mid">${l}</text></g>`;
      return `<svg class="drops" viewBox="0 0 400 210" role="img" aria-label="Fettlöslich: Vitamine E, D, K, A. Wasserlöslich: Vitamine B und C.">
        <path class="o k-sun" d="M100 14C126 54 170 84 170 128a70 70 0 0 1-140 0c0-44 44-74 70-114z" opacity=".9"/>
        ${letter(78, 110, "E", 0)}${letter(122, 110, "D", .4)}${letter(78, 152, "K", .8)}${letter(122, 152, "A", 1.2)}
        <path class="o k-sky" d="M300 14C326 54 370 84 370 128a70 70 0 0 1-140 0c0-44 44-74 70-114z" opacity=".9"/>
        ${letter(280, 128, "B", .2)}${letter(322, 128, "C", .6)}
        <text x="100" y="72" class="lbl b" text-anchor="middle">fettlöslich</text>
        <text x="300" y="72" class="lbl b" text-anchor="middle">wasserlöslich</text>
      </svg>`;
    },

    /* Die sechs Vitamingruppen: Aufgabe und Vorkommen */
    vitamins() {
      return `<div class="vitgrid">${VITAMINS.map((v, i) => `<div class="vit" style="--i:${i}">
        <span class="vit-l mono">${v.l}</span>
        <div class="vit-b">
          <div class="vit-row">${v.fnIco.map(x => ico(x, "md")).join("")}</div>
          <p>${bi2(v.fn)}</p>
          <div class="vit-row food">${v.srcIco.map(x => ico(x, "sm")).join("")}</div>
          <p class="muted">${bi2(v.src)}</p>
        </div></div>`).join("")}</div>`;
    },

    /* Aufbau der Moleküle – mit den Symbolen aus dem Unterricht */
    molecules() {
      const hex = (x, y, r) => Array.from({ length: 6 }, (_, k) => { const a = Math.PI / 6 + k * Math.PI / 3; return `${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`; }).join(" ");
      const fat = `<svg viewBox="0 0 170 120" role="img" aria-label="Fettmolekül: ein Glycerin und drei Fettsäuren">
        <rect class="o k-sky" x="22" y="10" width="16" height="92" rx="3"/>
        ${[["k-warm", 16], ["k-leaf", 46], ["k-red", 76]].map(([c, y], i) => `<rect class="o ${c} mol-in" style="--i:${i}" x="38" y="${y}" width="112" height="18" rx="3"/>`).join("")}
        <text x="30" y="116" class="lbl sm" text-anchor="middle">Glycerin</text>
      </svg>`;
      const shapes = ["dia", "cir", "tri", "sq", "cir", "dia", "sq"];
      const cols = { dia: "k-sun", cir: "k-leaf", tri: "k-red", sq: "k-sky" };
      const shp = (s, x, y) => s === "cir" ? `<circle cx="${x}" cy="${y}" r="9"/>` : s === "sq" ? `<rect x="${x - 8}" y="${y - 8}" width="16" height="16"/>`
        : s === "tri" ? `<polygon points="${x},${y - 10} ${x + 10},${y + 8} ${x - 10},${y + 8}"/>` : `<polygon points="${x},${y - 11} ${x + 11},${y} ${x},${y + 11} ${x - 11},${y}"/>`;
      const prot = `<svg viewBox="0 0 170 120" role="img" aria-label="Proteinmolekül: eine Kette aus Aminosäuren">
        <path class="ln" d="M14 62H156"/>
        ${shapes.map((s, i) => `<g class="o ${cols[s]} mol-in" style="--i:${i}">${shp(s, 16 + i * 23, 62)}</g>`).join("")}
        <text x="85" y="24" class="lbl sm" text-anchor="middle">Aminosäuren</text>
        <text x="85" y="104" class="lbl sm" text-anchor="middle">wie eine Kette verbunden</text>
      </svg>`;
      const starch = `<svg viewBox="0 0 170 120" role="img" aria-label="Glucosemolekül und Stärkemolekül aus vielen Glucosemolekülen">
        <polygon class="o k-leaf" points="${hex(85, 26, 15)}"/>
        <text x="85" y="56" class="lbl sm" text-anchor="middle">Glucose (Monosaccharid)</text>
        ${[0, 1, 2, 3, 4].map(i => `<polygon class="o k-leaf mol-in" style="--i:${i}" points="${hex(25 + i * 30, 80, 15)}"/>`).join("")}
        <text x="85" y="114" class="lbl sm" text-anchor="middle">Stärke (Polysaccharid)</text>
      </svg>`;
      const tile = (svg, a, b) => `<div class="tile mol">${svg}<b>${bi2(a)}</b><span>${bi2(b)}</span></div>`;
      return `<div class="tiles3">
        ${tile(fat, { de: "Fett", es: "grasa" }, { de: "Glycerin + 3 Fettsäuren", es: "glicerina + 3 ácidos grasos" })}
        ${tile(prot, { de: "Protein (Eiweiß)", es: "proteína" }, { de: "Kette aus Aminosäuren", es: "cadena de aminoácidos" })}
        ${tile(starch, { de: "Kohlenhydrat", es: "carbohidrato" }, { de: "Stärke = viele Glucosemoleküle", es: "almidón = muchas moléculas de glucosa" })}
      </div>`;
    },

    /* Lenas Pausenbrot: welche Schicht liefert welchen Nährstoff */
    pausenbrot() {
      const lab = (y, layer, nut, cls, i) => `<g class="pb-lab" style="--i:${i}"><path class="ln" d="M236 ${y}H286"/><circle class="dot" cx="236" cy="${y}" r="3"/>
        <text x="296" y="${y - 2}" class="lbl b">${layer}</text><text x="296" y="${y + 15}" class="lbl sm ${cls}">${nut}</text></g>`;
      return `<svg class="pausenbrot" viewBox="0 70 520 136" role="img" aria-label="Pausenbrot: Brot liefert Kohlenhydrate, Butter liefert Fett, Käse liefert Eiweiß.">
        <g class="layer" style="--i:0"><path class="o k-wheat" d="M24 150q0-12 12-12h176q12 0 12 12v34q0 10-10 10H34q-10 0-10-10z"/><path class="k-brown" d="M24 150q0-12 12-12h176q12 0 12 12v6H24z" opacity=".5"/></g>
        <g class="layer" style="--i:1"><rect class="o k-sun" x="30" y="124" width="188" height="14" rx="5"/></g>
        <g class="layer" style="--i:2"><path class="o k-cream" d="M18 124l14-38h184l14 38z"/><circle class="o k-milk" cx="70" cy="108" r="7"/><circle class="o k-milk" cx="130" cy="100" r="5"/><circle class="o k-milk" cx="176" cy="112" r="6"/></g>
        ${lab(96, "Käse", "→ Eiweiß (und Fett)", "pb-p", 2)}
        ${lab(134, "Butter", "→ Fett", "pb-f", 1)}
        ${lab(172, "Brot", "→ Kohlenhydrate", "pb-k", 0)}
      </svg>`;
    },

    metaphors() {
      const m = [
        ["pump", { de: "Kohlenhydrate", es: "carbohidratos" }, { de: "Hauptenergielieferant – Benzin für sofort", es: "principal fuente de energía – gasolina para ya" }, "kh"],
        ["tank", { de: "Fette", es: "grasas" }, { de: "Reservetank – Energie für später", es: "depósito – energía para después" }, "fett"],
        ["bricks", { de: "Proteine", es: "proteínas" }, { de: "Baustoff – Ziegelsteine für den Körper", es: "material – ladrillos para el cuerpo" }, "protein"]
      ];
      return `<div class="tiles3">${m.map(([i, a, b, id]) => `<button type="button" class="tile big" data-nut="${id}">${ico(i, "xl")}<b>${bi2(a)}</b><span>${bi2(b)}</span></button>`).join("")}</div>`;
    },

    kjBars() {
      const k = FORMULAS.kjPerGram, c = FORMULAS.kcalPerGram;
      const rows = [
        { de: "Kohlenhydrate", es: "carbohidratos", id: "kh" },
        { de: "Fett", es: "grasa", id: "fett", cls: "hi" },
        { de: "Eiweiß", es: "proteína", id: "protein" },
        { de: "Alkohol", es: "alcohol", id: "alkohol", cls: "alc" }
      ];
      return `<div class="chart bars">
        ${rows.map((r, i) => `<div class="brow"><div class="brow-l">${bi2({ de: r.de, es: r.es })}</div>
          <div class="btrack"><span class="bar1 grow ${r.cls || ""}" style="width:${k[r.id] / 40 * 100}%;--d:${i * .15}s"></span><span class="bval mono">${k[r.id]} kJ ≈ ${c[r.id]} kcal</span></div></div>`).join("")}
        <div class="axis"><span style="left:0">0</span><span style="left:25%">10</span><span style="left:50%">20</span><span style="left:75%">30</span><span style="left:100%">40 kJ</span></div>
      </div>`;
    },

    /* Tagesbedarf an Mineralsalzen (logarithmische Skala) */
    need() {
      const pos = v => (Math.log10(v) + 1) / 5 * 100; // 0,1 … 10 000 mg
      const th = pos(70);
      return `<div class="chart logplot">
        <div class="lp-zones" style="--th:${th}%"><span class="z-mikro">Mikro · wenige mg</span><span class="z-makro">Makro · Hunderte bis Tausende mg</span></div>
        ${MIN_NEED.map((e, i) => `<div class="lprow"><span class="lp-l">${e.de}</span>
          <span class="lp-track" style="--th:${th}%"><i class="lp-dot ${e.makro ? "mk" : "mi"}" style="left:${pos(e.mg)}%;--d:${i * .08}s"></i><span class="lp-v mono" style="left:${pos(e.mg)}%">${n(e.mg)} mg</span></span></div>`).join("")}
        <div class="lprow axisrow"><span class="lp-l"></span><span class="lp-track noline"><span class="axis">${[0.1, 1, 10, 100, 1000, 10000].map(v => `<span style="left:${pos(v)}%">${n(v)}</span>`).join("")}</span></span></div>
      </div>`;
    },

    /* Dreisatz wie an der Tafel: 50 g ← 100 g → 200 g */
    dreisatz() {
      const row = (y, g, mg, cls, d) => `<g class="${cls}" style="--d:${d}s"><text x="180" y="${y}" class="lbl b big" text-anchor="end">${g} g</text>
        <text x="210" y="${y}" class="lbl b big" text-anchor="middle">≙</text><text x="240" y="${y}" class="lbl b big">${mg} mg</text></g>`;
      const arc = (d, head, lx, ly, txt, delay) => `<g class="ds-arc" style="--d:${delay}s"><path class="ln" pathLength="100" d="${d}"/><polygon class="ds-head" points="${head}"/>
        <text x="${lx}" y="${ly}" class="lbl b ds-op" text-anchor="middle">${txt}</text></g>`;
      return `<svg class="dreisatz" viewBox="0 0 460 230" role="img" aria-label="Dreisatz: 100 g entsprechen 50 mg. Geteilt durch 2: 50 g entsprechen 25 mg. Mal 2: 200 g entsprechen 100 mg.">
        ${row(122, 100, 50, "ds-mid", 0)}
        ${row(52, 50, 25, "ds-in", .9)}
        ${row(192, 200, 100, "ds-in", 1.5)}
        ${arc("M118 106C78 100 78 60 116 50", "116,44 126,50 116,56", 66, 84, ": 2", .5)}
        ${arc("M118 130C78 138 78 178 116 186", "116,180 126,186 116,192", 66, 164, "· 2", 1.1)}
        ${arc("M342 106C382 100 382 60 344 50", "344,44 334,50 344,56", 394, 84, ": 2", .5)}
        ${arc("M342 130C382 138 382 178 344 186", "344,180 334,186 344,192", 394, 164, "· 2", 1.1)}
      </svg>`;
    },

    pct(v, label) {
      return `<div class="pctbar" role="img" aria-label="${v} %"><span class="pct-fill grow" style="width:${Math.min(v, 100)}%"></span><span class="pct-l mono">${v} %</span>${label ? `<span class="pct-cap">${label}</span>` : ""}</div>`;
    }
  };
})();

/* ---------------------------------------------------------------------
   EFFEKTE
   --------------------------------------------------------------------- */
const FX = (() => {
  const reduced = () => { try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } };
  const COLORS = ["var(--c-sun)", "var(--c-warm)", "var(--c-red)", "var(--c-leaf)", "var(--c-sky)", "var(--c-violet)"];
  function confetti(x, y, count = 28, spread = 1) {
    if (reduced()) return;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("i");
      p.className = "confetti";
      const ang = Math.random() * Math.PI * 2, dist = (60 + Math.random() * 140) * spread;
      p.style.cssText = `background:${COLORS[i % COLORS.length]};--x0:${x}px;--y0:${y}px;--x1:${x + Math.cos(ang) * dist}px;--y1:${y + Math.sin(ang) * dist + 80}px;--r:${Math.random() * 720 - 360}deg;animation-delay:${Math.random() * .08}s`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1300);
    }
  }
  function burstAt(el, count, spread) {
    if (!el) return;
    const r = el.getBoundingClientRect();
    confetti(r.left + r.width / 2, r.top + r.height / 2, count, spread);
  }
  function floatText(el, text) {
    if (!el || reduced()) return;
    const r = el.getBoundingClientRect();
    const f = document.createElement("span");
    f.className = "xp-float mono"; f.textContent = text;
    f.style.left = r.left + r.width / 2 + "px"; f.style.top = r.bottom + "px";
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 1200);
  }
  function countUp(el, to, ms = 700) {
    if (!el) return;
    if (reduced()) { el.textContent = to; return; }
    const t0 = performance.now();
    const step = t => { const k = Math.min(1, (t - t0) / ms); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  /* Diagramme beim Sichtbarwerden einmal abspielen */
  let io = null;
  function observe(root) {
    const figs = root.querySelectorAll(".fig, .chart, .gu, .amounts, .pctbar");
    if (!("IntersectionObserver" in window) || reduced()) return;
    if (!io) io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("play"); io.unobserve(e.target); }
    }), { threshold: .35 });
    figs.forEach(f => io.observe(f));
  }
  return { confetti, burstAt, floatText, countUp, observe, reduced };
})();
