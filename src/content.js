/* =====================================================================
   INHALTE / CONTENIDO
   Alles, was gelernt und abgefragt wird, steht in dieser Datei.
   Grundlage: Arbeitsblätter und Heft aus dem Unterricht (Bio.pdf).
   Ändern → mit ./build.sh neu bauen.
   Jeder Text ist { de: "...", es: "..." }.
   **fett**  ·  [[Begriff]] oder [[angezeigter Text|Begriff]] = Glossar
   ===================================================================== */

const FORMULAS = {
  kcalToKj: 4.2,               // 1 kcal ≈ 4,2 kJ (genau 4,184)
  kjToKcal: 0.24,              // 1 kJ ≈ 0,24 kcal
  guHours: 24,                 // Männer: Körpergewicht (kg) × 24 = Grundumsatz (kcal)
  guFemaleFactor: 0.9,         // Frauen: Körpergewicht (kg) × 24 × 0,9
  guKjPerKgHour: 4.2,          // in kJ: 4,2 kJ pro kg Körpergewicht und Stunde
  kjPerGram: { kh: 17, fett: 37, protein: 17, alkohol: 29 },
  kcalPerGram: { kh: 4, fett: 9, protein: 4, alkohol: 7 }
};

const GLOSSARY = {
  "Energie": "energía",
  "Joule": "julio (unidad de energía)",
  "Kilojoule": "kilojulio (1000 J)",
  "Kilokalorie": "kilocaloría",
  "Energieform": "forma de energía",
  "Energieumwandlung": "transformación de energía",
  "Energiewandler": "transformador de energía (aparato o ser vivo que cambia una forma de energía en otra)",
  "Energieerhaltung": "conservación de la energía",
  "Energiekette": "cadena de energía",
  "chemische Energie": "energía química",
  "Bewegungsenergie": "energía cinética (de movimiento)",
  "kinetische Energie": "energía cinética",
  "Lageenergie": "energía potencial (de posición)",
  "potentielle Energie": "energía potencial",
  "Spannungsenergie": "energía elástica (de un muelle o goma tensada)",
  "Wärmeenergie": "energía térmica (calor)",
  "elektrische Energie": "energía eléctrica",
  "Strahlungsenergie": "energía radiante (luz)",
  "Schallenergie": "energía sonora",
  "Kernenergie": "energía nuclear",
  "Photosynthese": "fotosíntesis",
  "Grundumsatz": "metabolismo basal",
  "Leistungsumsatz": "gasto energético por actividad",
  "Gesamtumsatz": "gasto energético total",
  "Stoffwechsel": "metabolismo",
  "PAL-Wert": "nivel de actividad física (factor por el que se multiplica el metabolismo basal)",
  "nüchtern": "en ayunas",
  "Muskelmasse": "masa muscular",
  "Vitamine": "vitaminas",
  "organisch": "orgánico (compuesto de carbono, de seres vivos)",
  "anorganisch": "inorgánico",
  "lebensnotwendig": "esencial, imprescindible para vivir",
  "Mangelerscheinung": "síntoma de carencia",
  "Zahnausfall": "caída de los dientes",
  "Sonneneinstrahlung": "radiación solar",
  "Blutkreislauf": "circulación sanguínea",
  "Krankheitserreger": "agente patógeno (lo que causa una enfermedad)",
  "Nährstoffverwertung": "aprovechamiento de los nutrientes",
  "Zellerneuerung": "renovación celular",
  "Blutgerinnung": "coagulación de la sangre",
  "Sehkraft": "vista, capacidad de ver",
  "Algen": "algas",
  "Darm": "intestino",
  "Nährstoffe": "nutrientes",
  "Kohlenhydrate": "carbohidratos / hidratos de carbono",
  "Fette": "grasas",
  "Lipide": "lípidos (grasas)",
  "Proteine": "proteínas",
  "Eiweiße": "proteínas",
  "Glycerin": "glicerina",
  "Fettsäuren": "ácidos grasos",
  "essenzielle Fettsäuren": "ácidos grasos esenciales",
  "Zellmembran": "membrana celular",
  "Hormone": "hormonas",
  "Aminosäuren": "aminoácidos",
  "Glucose": "glucosa",
  "Stärke": "almidón",
  "Ballaststoffe": "fibra alimentaria",
  "Baustoff": "material de construcción (del cuerpo)",
  "Betriebsstoff": "combustible",
  "Mineralsalze": "sales minerales",
  "Ionen": "iones (partículas con carga eléctrica)",
  "Makroelemente": "macroelementos",
  "Mengenelemente": "macroelementos",
  "Mikroelemente": "microelementos",
  "Spurenelemente": "oligoelementos",
  "Tagesbedarf": "necesidad diaria",
  "Dreisatz": "regla de tres",
  "Muskelkontraktion": "contracción muscular",
  "Muskelentspannung": "relajación muscular",
  "Sauerstofftransport": "transporte de oxígeno",
  "Schilddrüse": "glándula tiroides"
};

/* Energieformen */
const FORMS = {
  chemisch:   { ico: "battery", name: { de: "chemische Energie", es: "energía química" } },
  bewegung:   { ico: "ball", name: { de: "Bewegungsenergie", es: "energía cinética" } },
  lage:       { ico: "rock", name: { de: "Lageenergie", es: "energía potencial" } },
  spannung:   { ico: "spring", name: { de: "Spannungsenergie", es: "energía elástica" } },
  waerme:     { ico: "flame", name: { de: "Wärmeenergie", es: "energía térmica" } },
  elektrisch: { ico: "bolt", name: { de: "elektrische Energie", es: "energía eléctrica" } },
  licht:      { ico: "sun", name: { de: "Strahlungsenergie (Licht)", es: "energía radiante (luz)" } },
  schall:     { ico: "speaker", name: { de: "Schallenergie", es: "energía sonora" } },
  kern:       { ico: "atom", name: { de: "Kernenergie", es: "energía nuclear" } }
};

/* Energiewandler: zugeführte → abgegebene Energieform */
const CONVERSIONS = [
  { ico: "runner", dev: { de: "Mensch (Muskeln)", es: "persona (músculos)" }, chain: [["chemisch"], ["bewegung", "waerme"]] },
  { ico: "candle", dev: { de: "brennende Kerze", es: "vela encendida" }, chain: [["chemisch"], ["licht", "waerme"]] },
  { ico: "bulb", dev: { de: "Glühlampe", es: "bombilla" }, chain: [["elektrisch"], ["licht", "waerme"]] },
  { ico: "flashlight", dev: { de: "Taschenlampe", es: "linterna" }, chain: [["elektrisch"], ["licht", "waerme"]] },
  { ico: "dam", dev: { de: "Wasser im Stausee", es: "agua de un embalse" }, chain: [["lage"], ["bewegung"]] },
  { ico: "windmill", dev: { de: "Windrad", es: "aerogenerador" }, chain: [["bewegung"], ["elektrisch"]] },
  { ico: "plant", dev: { de: "Pflanze (Photosynthese)", es: "planta (fotosíntesis)" }, chain: [["licht"], ["chemisch"]] },
  { ico: "solar", dev: { de: "Solarzelle", es: "célula solar" }, chain: [["licht"], ["elektrisch"]] },
  { ico: "bike", dev: { de: "Fahrrad-Dynamo", es: "dinamo de bicicleta" }, chain: [["bewegung"], ["elektrisch"]] },
  { ico: "car", dev: { de: "Auto (Benzinmotor)", es: "coche (motor de gasolina)" }, chain: [["chemisch"], ["bewegung", "waerme"]] },
  { ico: "toaster", dev: { de: "Toaster", es: "tostadora" }, chain: [["elektrisch"], ["waerme"]] },
  { ico: "speaker", dev: { de: "Lautsprecher", es: "altavoz" }, chain: [["elektrisch"], ["schall"]] },
  { ico: "spring", dev: { de: "Trampolin (Feder)", es: "trampolín (muelle)" }, chain: [["spannung"], ["bewegung"]] },
  { ico: "phone", dev: { de: "Handy-Akku laden", es: "cargar la batería del móvil" }, chain: [["elektrisch"], ["chemisch"]] }
];

/* Nährstoffe (Steckbriefe aus dem Unterricht) */
const NUTRIENTS = [
  {
    id: "kh", meta: "pump", name: { de: "Kohlenhydrate", es: "Carbohidratos" }, kj: 17, kcal: 4,
    image: { de: "Hauptenergielieferant – wie Benzin für ein Auto", es: "Principal fuente de energía – como la gasolina para un coche" },
    aufbau: { de: "Ein Glucosemolekül (Traubenzucker) ist ein **Einfachzucker** (Monosaccharid). Viele Glucosemoleküle hintereinander ergeben **[[Stärke]]** (Vielfachzucker, Polysaccharid).", es: "Una molécula de glucosa es un azúcar simple (monosacárido). Muchas moléculas de glucosa en fila forman almidón (polisacárido)." },
    fn: [
      { de: "**Hauptenergielieferant**: schnell verfügbare Energie für **Muskeln und Nervensystem**", es: "Principal fuente de energía: energía disponible rápidamente para los músculos y el sistema nervioso" },
      { de: "Energie für die Muskelarbeit und die Arbeit der Nervenzellen", es: "Energía para el trabajo de los músculos y de las neuronas" },
      { de: "**Energiespeicher**: Überschüssiger Zucker wird in **Leber und Muskeln** für später gespeichert", es: "Reserva de energía: el azúcar sobrante se almacena en el hígado y los músculos para más tarde" },
      { de: "Isst man sehr viele Kohlenhydrate, wandelt der Körper sie in **Fett** um", es: "Si se comen muchos carbohidratos, el cuerpo los transforma en grasa" }
    ],
    src: [
      { ico: "pasta", de: "Pasta", es: "pasta" }, { ico: "bread", de: "Brot", es: "pan" }, { ico: "oats", de: "Hafer", es: "avena" },
      { ico: "corn", de: "Mais", es: "maíz" }, { ico: "potato", de: "Kartoffeln", es: "patatas / papas" }, { ico: "rice", de: "Reis", es: "arroz" },
      { ico: "apple", de: "Obst", es: "fruta" }, { ico: "carrot", de: "Gemüse", es: "verdura" }
    ],
    extra: { de: "Einer der drei Hauptnährstoffe – und die wichtigste und am schnellsten verfügbare Energiequelle für den Körper.", es: "Uno de los tres nutrientes principales, y la fuente de energía más importante y más rápida para el cuerpo." }
  },
  {
    id: "fett", meta: "tank", name: { de: "Fette (Lipide)", es: "Grasas (lípidos)" }, kj: 37, kcal: 9,
    image: { de: "Reservetank – Energie für später", es: "Depósito de reserva – energía para después" },
    aufbau: { de: "Jedes Fettmolekül besteht aus **[[Glycerin]]** und **drei [[Fettsäuren]]**.", es: "Cada molécula de grasa está formada por glicerina y tres ácidos grasos." },
    fn: [
      { de: "**Energielieferant und Energiespeicher** – der energiereichste Nährstoff", es: "Fuente y reserva de energía: el nutriente con más energía" },
      { de: "**Baustoff** für [[Zellmembran|Zellmembran]]en und [[Hormone]]", es: "Material de construcción de membranas celulares y hormonas" },
      { de: "**Isolator** gegen Kälte", es: "Aislante contra el frío" },
      { de: "**Schutzpolster** für innere Organe", es: "Acolchado protector de los órganos internos" }
    ],
    src: [
      { ico: "butter", de: "Butter", es: "mantequilla" }, { ico: "cheese", de: "Käse", es: "queso" }, { ico: "nut", de: "Nüsse, Samen", es: "frutos secos, semillas" },
      { ico: "avocado", de: "Avocados", es: "aguacates" }, { ico: "oil", de: "Oliven, Olivenöl", es: "aceitunas, aceite de oliva" }, { ico: "egg", de: "Eier", es: "huevos" },
      { ico: "sausage", de: "Fleisch, Wurst", es: "carne, embutido" }, { ico: "popcorn", de: "Popcorn", es: "palomitas" }, { ico: "broccoli", de: "Spinat", es: "espinacas" }
    ],
    extra: { de: "Fette liefern etwa doppelt so viel Energie wie Kohlenhydrate. Es gibt tierische und pflanzliche Fette. Pflanzliche Fette sind besonders wichtig: Ihre **[[essenzielle Fettsäuren|essenziellen Fettsäuren]]** kann der Mensch nicht selbst herstellen – er muss sie essen (z. B. in Avocados, Nüssen, Spinat).", es: "Las grasas aportan aproximadamente el doble de energía que los carbohidratos. Hay grasas animales y vegetales. Las vegetales son especialmente importantes: sus ácidos grasos esenciales el ser humano no los puede fabricar y tiene que comerlos (p. ej. en aguacates, frutos secos, espinacas)." }
  },
  {
    id: "protein", meta: "bricks", name: { de: "Proteine (Eiweiße)", es: "Proteínas" }, kj: 17, kcal: 4,
    image: { de: "Baustoff – wie Ziegelsteine für ein Haus", es: "Material de construcción – como ladrillos para una casa" },
    aufbau: { de: "Jedes Proteinmolekül besteht aus mehreren **[[Aminosäuren]]**. Sie sind wie eine **Kette** miteinander verbunden.", es: "Cada molécula de proteína está formada por varios aminoácidos, unidos como una cadena." },
    fn: [
      { de: "**[[Baustoff]]** – wichtig für das **Wachstum**", es: "Material de construcción, importante para el crecimiento" },
      { de: "**Haare, Haut und Muskeln** bestehen unter anderem aus Proteinen", es: "El pelo, la piel y los músculos están hechos, entre otras cosas, de proteínas" },
      { de: "Proteine befinden sich in **allen Zellen**", es: "Hay proteínas en todas las células" },
      { de: "Verschiedene Proteinmoleküle haben verschiedene Aufgaben", es: "Distintas moléculas de proteína tienen distintas funciones" }
    ],
    src: [
      { ico: "meat", de: "Fleisch", es: "carne" }, { ico: "fish", de: "Fisch", es: "pescado" }, { ico: "egg", de: "Eier", es: "huevos" },
      { ico: "milk", de: "Milch, Käse", es: "leche, queso" }, { ico: "tofu", de: "Soja, Tofu", es: "soja, tofu" },
      { ico: "lentils", de: "Linsen, Bohnen", es: "lentejas, judías" }, { ico: "peas", de: "Erbsen", es: "guisantes" }, { ico: "nut", de: "Nüsse", es: "frutos secos" }
    ],
    extra: { de: "Im Pausenbrot steckt das Eiweiß vor allem im Käse. Auch Soja ist eiweißreich.", es: "En el bocadillo, la proteína está sobre todo en el queso. La soja también es rica en proteínas." }
  }
];

/* Makroelemente (Mengenelemente) – mit Funktion und Vorkommen, wie im Heft */
const MAKRO = [
  { sym: "Ca", fnIco: ["muscle", "bone", "tooth"], srcIco: ["milk", "cheese", "broccoli", "seeds"], name: { de: "Calcium", es: "Calcio" },
    fn: { de: "**[[Muskelkontraktion]]** (Muskeln ziehen sich zusammen), Aufbau von **Knochen und Zähnen**", es: "Contracción muscular (los músculos se contraen), formación de huesos y dientes" },
    src: { de: "Milchprodukte, Grünkohl, Sesam", es: "Lácteos, col rizada, sésamo" } },
  { sym: "Mg", fnIco: ["muscle", "brain", "bolt"], srcIco: ["seeds", "nut", "chocolate", "banana"], name: { de: "Magnesium", es: "Magnesio" },
    fn: { de: "**[[Muskelentspannung]]** und **Nerven**; aktiviert Enzyme und steuert den Energiestoffwechsel", es: "Relajación muscular y nervios; activa enzimas y regula el metabolismo energético" },
    src: { de: "Sesam, Nüsse, Kerne (auch Bananen, Schokolade)", es: "Sésamo, frutos secos, pipas (también plátanos, chocolate)" } },
  { sym: "P", fnIco: ["bone", "dna"], srcIco: ["cheese", "nut"], name: { de: "Phosphor", es: "Fósforo" },
    fn: { de: "Aufbau der **Knochen**; Baustein der **DNA** (Erbgut)", es: "Formación de los huesos; componente del ADN (material genético)" },
    src: { de: "Käse, Nüsse", es: "Queso, frutos secos" } },
  { sym: "Na", fnIco: ["brain"], srcIco: ["sausage", "cheese", "chips", "salt"], name: { de: "Natrium", es: "Sodio" },
    fn: { de: "Wichtig für die **Nerven** (Weiterleitung von Signalen)", es: "Importante para los nervios (transmisión de señales)" },
    src: { de: "Wurst, Käse, Chips (Kochsalz)", es: "Embutido, queso, patatas fritas (sal)" } },
  { sym: "K", fnIco: ["brain", "muscle"], srcIco: ["banana", "peas", "avocado"], name: { de: "Kalium", es: "Potasio" },
    fn: { de: "Wichtig für die **Nerven** (und Muskeln)", es: "Importante para los nervios (y los músculos)" },
    src: { de: "Bananen, Erbsen, Avocado", es: "Plátanos, guisantes, aguacate" } }
];

/* Mikroelemente (Spurenelemente): im Examen nur die Namen */
const MIKRO = [
  { sym: "Fe", name: { de: "Eisen", es: "Hierro" }, note: { de: "Sauerstofftransport · Linsen, Erbsen, Gemüse", es: "transporte de oxígeno · lentejas, guisantes, verdura" } },
  { sym: "I", name: { de: "Iod (Jod)", es: "Yodo" }, note: { de: "Schilddrüse · Seefisch, Salz, Eier", es: "tiroides · pescado de mar, sal, huevos" } },
  { sym: "F", name: { de: "Fluor", es: "Flúor" }, note: { de: "Zähne, Knochen · Meeresfisch", es: "dientes, huesos · pescado de mar" } }
];

/* Tagesbedarf in mg (Arbeitsblatt „Was fehlt Jonas?“) */
const MIN_NEED = [
  { de: "Kalium", es: "potasio", mg: 4000, makro: true }, { de: "Natrium", es: "sodio", mg: 1500, makro: true },
  { de: "Phosphor", es: "fósforo", mg: 1250, makro: true }, { de: "Calcium", es: "calcio", mg: 1200, makro: true },
  { de: "Magnesium", es: "magnesio", mg: 400, makro: true },
  { de: "Eisen", es: "hierro", mg: 12 }, { de: "Fluor", es: "flúor", mg: 3.2 }, { de: "Iod", es: "yodo", mg: 0.2 }
];

/* Gehalt pro 100 g (gerundete Beispielwerte) für den Rechentrainer */
const MIN_FOOD = [
  { de: "Calcium", es: "calcio", need: 1200, foods: [
    { de: "Milch", es: "leche", mg: 120 }, { de: "Joghurt", es: "yogur", mg: 120 }, { de: "Emmentaler", es: "queso Emmental", mg: 1000 },
    { de: "Grünkohl", es: "col rizada", mg: 200 }, { de: "Sesam", es: "sésamo", mg: 800 } ] },
  { de: "Magnesium", es: "magnesio", need: 400, foods: [
    { de: "Banane", es: "plátano", mg: 30 }, { de: "Emmentaler", es: "queso Emmental", mg: 50 }, { de: "Schokolade", es: "chocolate", mg: 100 },
    { de: "Vollkornbrot", es: "pan integral", mg: 60 }, { de: "Haselnüsse", es: "avellanas", mg: 160 }, { de: "Sesam", es: "sésamo", mg: 350 } ] },
  { de: "Phosphor", es: "fósforo", need: 1250, foods: [
    { de: "Emmentaler", es: "queso Emmental", mg: 600 }, { de: "Haselnüsse", es: "avellanas", mg: 300 }, { de: "Milch", es: "leche", mg: 90 },
    { de: "Haferflocken", es: "copos de avena", mg: 400 } ] },
  { de: "Natrium", es: "sodio", need: 1500, foods: [
    { de: "Salami", es: "salami", mg: 1800 }, { de: "Chips", es: "patatas fritas", mg: 500 }, { de: "Gouda", es: "queso gouda", mg: 800 },
    { de: "Vollkornbrot", es: "pan integral", mg: 450 } ] },
  { de: "Kalium", es: "potasio", need: 4000, foods: [
    { de: "Banane", es: "plátano", mg: 400 }, { de: "Kartoffeln", es: "patatas", mg: 400 }, { de: "Avocado", es: "aguacate", mg: 500 },
    { de: "Erbsen", es: "guisantes", mg: 300 } ] },
  { de: "Eisen", es: "hierro", need: 12, foods: [
    { de: "Linsen", es: "lentejas", mg: 8 }, { de: "Haferflocken", es: "copos de avena", mg: 5 }, { de: "Spinat", es: "espinacas", mg: 3 } ] }
];

/* Arbeitsblatt „Was fehlt Jonas?“ – fehlende Werte werden mit dem Dreisatz berechnet (per100 = mg pro 100 g) */
const JONAS = [
  { el: { de: "Magnesium", es: "magnesio" }, kind: "makro", need: 400, rows: [
    { ico: "oats", food: { de: "Cornflakes", es: "copos de maíz" }, g: 150, mg: 30 },
    { ico: "milk", food: { de: "Milch", es: "leche" }, g: 250, mg: 150 },
    { ico: "banana", food: { de: "Banane (2 × 200 g)", es: "plátano (2 × 200 g)" }, g: 400, per100: 30 },
    { ico: "cheese", food: { de: "Emmentaler", es: "queso Emmental" }, g: 100, per100: 50 },
    { ico: "bread", food: { de: "Vollkornbrot", es: "pan integral" }, g: 200, mg: 120 },
    { ico: "salt", food: { de: "Salz mit Iod/Fluor", es: "sal con yodo/flúor" }, g: 1, per100: 500 },
    { ico: "chocolate", food: { de: "Schokolade", es: "chocolate" }, g: 100, per100: 100 },
    { ico: "potato", food: { de: "Kartoffelauflauf", es: "gratinado de patata" }, g: 300, mg: 60 }
  ]},
  { el: { de: "Fluor", es: "flúor" }, kind: "mikro", need: 3.2, rows: [
    { ico: "oats", food: { de: "Cornflakes", es: "copos de maíz" }, g: 150, mg: 0 },
    { ico: "milk", food: { de: "Milch", es: "leche" }, g: 250, mg: 0.2 },
    { ico: "banana", food: { de: "Banane (2 × 200 g)", es: "plátano (2 × 200 g)" }, g: 400, per100: 0.25 },
    { ico: "cheese", food: { de: "Emmentaler", es: "queso Emmental" }, g: 100, per100: 0.09 },
    { ico: "bread", food: { de: "Vollkornbrot", es: "pan integral" }, g: 200, per100: 0.1 },
    { ico: "salt", food: { de: "Salz mit Iod/Fluor", es: "sal con yodo/flúor" }, g: 1, mg: 0.8 },
    { ico: "chocolate", food: { de: "Schokolade", es: "chocolate" }, g: 100, per100: 0.1 },
    { ico: "potato", food: { de: "Kartoffelauflauf", es: "gratinado de patata" }, g: 300, mg: 1.2 }
  ]}
];

/* Anteil der Organe am Grundumsatz in % (ungefähr, aus dem Arbeitsblatt) */
const ORGANS = [
  { ico: "liver", de: "Leber", es: "hígado", v: 27 },
  { ico: "muscle", de: "Skelettmuskulatur", es: "músculos del esqueleto", v: 25 },
  { ico: "brain", de: "Gehirn", es: "cerebro", v: 19 },
  { ico: "dots", de: "übrige Organe", es: "otros órganos", v: 13 },
  { ico: "heart", de: "Herz", es: "corazón", v: 9 },
  { ico: "kidney", de: "Nieren", es: "riñones", v: 7 }
];

/* PAL-Werte (Deutsche Gesellschaft für Ernährung, aus dem Arbeitsblatt) */
const PAL_LEVELS = [
  ["0,95", { de: "Schlafen", es: "dormir" }, "–"],
  ["1,2 – 1,3", { de: "nur liegend oder sitzend", es: "solo tumbado o sentado" }, { de: "alte oder kranke Menschen", es: "personas mayores o enfermas" }],
  ["1,4 – 1,5", { de: "nur sitzende Tätigkeit, wenig Bewegung in der Freizeit", es: "solo actividad sentada, poco movimiento en el tiempo libre" }, { de: "Büroangestellte", es: "oficinistas" }],
  ["1,6 – 1,7", { de: "sitzend, ab und zu gehend oder stehend", es: "sentado, a ratos andando o de pie" }, { de: "Studierende, Fahrer, Fließbandarbeiter", es: "estudiantes, conductores, trabajadores de cadena" }],
  ["1,8 – 1,9", { de: "überwiegend gehend und stehend", es: "sobre todo andando y de pie" }, { de: "Kellner, Handwerker, Pflegepersonal", es: "camareros, artesanos, personal de enfermería" }],
  ["2,0 – 2,4", { de: "körperlich anstrengend oder sehr aktiv", es: "trabajo físico duro o muy activo" }, { de: "Landwirte, Leistungssportler", es: "agricultores, deportistas de alto nivel" }]
];
/* Tätigkeiten für den PAL-Rechner (Werte wie im Beispiel „Mark Mustermann“) */
const PAL_ACTS = [
  { id: "sleep", ico: "bed", pal: 0.95, h: 9, c: "var(--c-sky)", name: { de: "Schlafen", es: "dormir" } },
  { id: "sit", ico: "book", pal: 1.5, h: 7, c: "var(--c-grey)", name: { de: "Schule, Hausaufgaben (sitzen)", es: "colegio, deberes (sentado)" } },
  { id: "light", ico: "stairs", pal: 2.0, h: 2, c: "var(--c-leaf)", name: { de: "leichte Bewegung (Weg, Haushalt)", es: "movimiento ligero (camino, casa)" } },
  { id: "sport", ico: "football", pal: 3.0, h: 1, c: "var(--c-red)", name: { de: "Sport", es: "deporte" } },
  { id: "free", ico: "phone", pal: 1.8, h: 5, c: "var(--c-sun)", name: { de: "Freizeit (sitzen, stehen)", es: "tiempo libre (sentado, de pie)" } }
];

/* Vitamingruppen A–K (Heft und Arbeitsblatt) */
const VITAMINS = [
  { l: "A", fnIco: ["eye"], srcIco: ["carrot", "broccoli", "meat"],
    fn: { de: "Haut und **Sehkraft**", es: "piel y vista" }, src: { de: "Möhren, Kohl, Leber", es: "zanahorias, col, hígado" } },
  { l: "B", fnIco: ["cell", "stomach"], srcIco: ["banana", "bread", "fish", "meat"],
    fn: { de: "**Zellerneuerung** und **Nährstoffverwertung**", es: "renovación celular y aprovechamiento de nutrientes" }, src: { de: "Gemüse, Vollkornbrot, Bananen, Fleisch, Fisch", es: "verdura, pan integral, plátanos, carne, pescado" } },
  { l: "C", fnIco: ["virus"], srcIco: ["orange", "leaf", "carrot"],
    fn: { de: "Bekämpfung von **Krankheitserregern**", es: "lucha contra los agentes patógenos" }, src: { de: "Obst, Gemüse, Kräuter", es: "fruta, verdura, hierbas" } },
  { l: "D", fnIco: ["bone", "tooth", "sun"], srcIco: ["fish", "mushroom", "egg", "avocado"],
    fn: { de: "Aufbau von **Knochen und Zähnen**; die Haut bildet es selbst durch **Sonneneinstrahlung**", es: "formación de huesos y dientes; la piel la produce con la radiación solar" }, src: { de: "Fisch, Pilze, Eier, Avocados", es: "pescado, setas, huevos, aguacates" } },
  { l: "E", fnIco: ["muscle", "heart"], srcIco: ["milk", "oats", "oil", "bread"],
    fn: { de: "stärkt **Muskeln** und **Blutkreislauf**, hilft gegen Krankheiten", es: "fortalece los músculos y la circulación, ayuda contra enfermedades" }, src: { de: "Milchprodukte, Haferflocken, Pflanzenöl, Gemüse, Vollkornbrot", es: "lácteos, copos de avena, aceite vegetal, verdura, pan integral" } },
  { l: "K", fnIco: ["bandage", "bone"], srcIco: ["broccoli", "oil", "algae"],
    fn: { de: "**Blutgerinnung** und Knochenaufbau; wird im **Darm** gebildet", es: "coagulación de la sangre y formación de huesos; se produce en el intestino" }, src: { de: "grünes Gemüse, Pflanzenöl, Algen", es: "verdura verde, aceite vegetal, algas" } }
];

/* Vokabeln zu den Vitaminen */
const VOCAB = [
  { ico: "alert", t: { de: "die Mangelerscheinung", es: "el síntoma de carencia" }, d: { de: "gesundheitliches Problem, weil dem Körper etwas fehlt", es: "problema de salud porque al cuerpo le falta algo" } },
  { ico: "tooth", t: { de: "der Zahnausfall", es: "la caída de dientes" }, d: { de: "Verlust eines Zahns oder mehrerer Zähne", es: "pérdida de uno o varios dientes" } },
  { ico: "sun", t: { de: "die Sonneneinstrahlung", es: "la radiación solar" }, d: { de: "Licht und Energie, die von der Sonne kommen", es: "luz y energía que vienen del Sol" } },
  { ico: "heart", t: { de: "der Blutkreislauf", es: "la circulación sanguínea" }, d: { de: "Bewegung des Blutes durch den Körper", es: "movimiento de la sangre por el cuerpo" } },
  { ico: "virus", t: { de: "der Krankheitserreger", es: "el agente patógeno" }, d: { de: "etwas, das eine Krankheit verursacht, z. B. ein Virus", es: "algo que causa una enfermedad, p. ej. un virus" } },
  { ico: "stomach", t: { de: "die Nährstoffverwertung", es: "el aprovechamiento de nutrientes" }, d: { de: "Verwendung der Nährstoffe aus der Nahrung durch den Körper", es: "uso que hace el cuerpo de los nutrientes de la comida" } },
  { ico: "cell", t: { de: "die Zellerneuerung", es: "la renovación celular" }, d: { de: "Bildung neuer Zellen im Körper", es: "formación de células nuevas en el cuerpo" } },
  { ico: "bandage", t: { de: "die Blutgerinnung", es: "la coagulación" }, d: { de: "Vorgang, bei dem Blut fest wird und eine Wunde verschließt", es: "proceso en el que la sangre se vuelve sólida y cierra una herida" } },
  { ico: "eye", t: { de: "die Sehkraft", es: "la vista" }, d: { de: "Fähigkeit, gut zu sehen", es: "capacidad de ver bien" } },
  { ico: "algae", t: { de: "die Algen", es: "las algas" }, d: { de: "pflanzliche Organismen, die im Wasser leben", es: "organismos vegetales que viven en el agua" } },
  { ico: "plate", t: { de: "die Nährstoffe", es: "los nutrientes" }, d: { de: "lebenswichtige Stoffe aus der Nahrung", es: "sustancias esenciales de la comida" } }
];

/* Brief schreiben – Übungsaufträge (das Thema im Examen ist nicht bekannt) */
const LETTERS = [
  { id: "jonas", topic: "mineral", title: { de: "Brief an Jonas", es: "Carta a Jonas" },
    task: { de: "Jonas hat dir aufgeschrieben, was er an einem Tag isst (Arbeitsblatt „Was fehlt Jonas?“). Schreibe ihm einen Brief: Was sind Mineralsalze? Nenne zwei Makroelemente mit Funktion und Vorkommen. Ist sein Tagesbedarf an Magnesium gedeckt? Gib ihm einen Tipp.", es: "Jonas te ha apuntado lo que come en un día (hoja «¿Qué le falta a Jonas?»). Escríbele una carta: ¿qué son las sales minerales? Nombra dos macroelementos con su función y dónde se encuentran. ¿Cubre su necesidad diaria de magnesio? Dale un consejo." },
    terms: [["Mineralsalz", "Mineralsalze"], ["anorganisch"], ["Makroelement", "Mengenelement"], ["Calcium"], ["Magnesium"], ["Tagesbedarf"], ["gedeckt"], ["Knochen"], { l: "ein Lebensmittel (z. B. Milch, Nüsse)", a: ["Milch", "Käse", "Nüsse", "Sesam", "Banane", "Grünkohl", "Kerne"] }],
    model: { de: "Berlin, 20.10.2025\n\nLieber Jonas,\n\nich habe mir deinen Essensplan angeschaut. Du hast nach Mineralsalzen gefragt: Das sind anorganische Nährstoffe, die wir als in Wasser gelöste Ionen mit der Nahrung aufnehmen. Sie liefern keine Energie, aber der Körper braucht sie unbedingt.\n\nZu den Makroelementen gehört Calcium. Es ist wichtig für die Knochen, die Zähne und damit sich die Muskeln zusammenziehen können. Du findest es in Milchprodukten, Grünkohl und Sesam. Magnesium braucht dein Körper für die Muskelentspannung und die Nerven. Es steckt in Nüssen, Sesam und Kernen.\n\nIch habe nachgerechnet: Du nimmst 635 mg Magnesium auf. Dein Tagesbedarf ist 400 mg – er ist also gedeckt! Trotzdem mein Tipp: Iss statt der ganzen Tafel Schokolade lieber eine Handvoll Nüsse.\n\nViele Grüße\ndeine Lena", es: "Berlín, 20.10.2025\n\nQuerido Jonas:\n\nHe mirado tu plan de comidas. Me preguntaste por las sales minerales: son nutrientes inorgánicos que tomamos con la comida en forma de iones disueltos en agua. No aportan energía, pero el cuerpo las necesita sí o sí.\n\nUno de los macroelementos es el calcio. Es importante para los huesos, los dientes y para que los músculos se puedan contraer. Lo encuentras en los lácteos, la col rizada y el sésamo. El magnesio lo necesita tu cuerpo para relajar los músculos y para los nervios. Está en frutos secos, sésamo y pipas.\n\nLo he calculado: tomas 635 mg de magnesio. Tu necesidad diaria es 400 mg, así que está cubierta. Aun así, un consejo: en vez de la tableta entera de chocolate, mejor come un puñado de frutos secos.\n\nUn saludo,\nLena" } },
  { id: "energie", topic: "umsatz", title: { de: "Brief an deine Cousine", es: "Carta a tu prima" },
    task: { de: "Deine Cousine (45 kg) spielt Fußball und fragt, warum sie nach dem Training so hungrig ist. Erkläre ihr Grundumsatz, Leistungsumsatz und Gesamtumsatz und rechne ihren Grundumsatz aus.", es: "Tu prima (45 kg) juega al fútbol y pregunta por qué tiene tanta hambre después del entrenamiento. Explícale el metabolismo basal, el gasto por actividad y el gasto total, y calcula su metabolismo basal." },
    terms: [["Energie"], ["Grundumsatz"], ["Leistungsumsatz"], ["Gesamtumsatz"], ["Ruhe"], ["zusätzlich"], { l: "× 24", a: ["× 24", "x 24", "mal 24", "· 24", "·24", "• 24", "* 24", "×24", "x24"] }, ["0,9"], ["kcal", "Kilokalorien"], ["Kohlenhydrat"]],
    model: { de: "Hamburg, 20.10.2025\n\nLiebe Mia,\n\ndu hast gefragt, warum du nach dem Fußball so hungrig bist. Das hat mit dem Energiebedarf zu tun.\n\nDein Körper braucht sogar in völliger Ruhe Energie, damit Herz, Lunge und Gehirn arbeiten und er warm bleibt. Das ist der Grundumsatz. Für Frauen rechnet man: Körpergewicht × 24 × 0,9. Bei dir sind das 45 × 24 × 0,9 = 972 kcal pro Tag.\n\nWenn du dich bewegst, brauchst du zusätzlich Energie. Das nennt man Leistungsumsatz. Beim Fußball ist er besonders hoch. Grundumsatz und Leistungsumsatz zusammen ergeben den Gesamtumsatz.\n\nNach dem Training sind deine Energiespeicher leer. Darum hast du Hunger. Iss dann am besten etwas mit Kohlenhydraten, zum Beispiel Nudeln oder Brot – sie liefern schnell Energie für die Muskeln.\n\nLiebe Grüße\ndeine Lena", es: "Hamburgo, 20.10.2025\n\nQuerida Mia:\n\nMe preguntaste por qué tienes tanta hambre después del fútbol. Tiene que ver con la necesidad de energía.\n\nTu cuerpo necesita energía incluso en reposo total, para que el corazón, los pulmones y el cerebro funcionen y para mantenerse caliente. Eso es el metabolismo basal. Para mujeres se calcula: peso × 24 × 0,9. En tu caso: 45 × 24 × 0,9 = 972 kcal al día.\n\nCuando te mueves, necesitas energía adicional. Eso se llama gasto por actividad. Con el fútbol es especialmente alto. El metabolismo basal y el gasto por actividad juntos dan el gasto total.\n\nDespués del entrenamiento tus reservas de energía están vacías; por eso tienes hambre. Lo mejor es comer algo con carbohidratos, por ejemplo pasta o pan: dan energía rápida a los músculos.\n\nUn abrazo,\nLena" } },
  { id: "vitamine", topic: "vitamine", title: { de: "Brief an deinen Opa", es: "Carta a tu abuelo" },
    task: { de: "Dein Opa isst kaum Obst und Gemüse. Erkläre ihm, was Vitamine sind, was bei einem Mangel passiert, und stelle zwei Vitamine mit Aufgabe und Vorkommen vor.", es: "Tu abuelo apenas come fruta y verdura. Explícale qué son las vitaminas, qué pasa si faltan, y presenta dos vitaminas con su función y dónde se encuentran." },
    terms: [["Vitamin"], ["lebensnotwendig", "lebenswichtig"], ["Nahrung"], ["Mangelerscheinung"], ["kleine Mengen", "kleinen Mengen"], { l: "eine Aufgabe (z. B. Sehkraft, Krankheitserreger)", a: ["Sehkraft", "Krankheitserreger", "Knochen", "Blutgerinnung", "Zellerneuerung", "Blutkreislauf"] }, ["Obst"], ["Gemüse"]],
    model: { de: "München, 20.10.2025\n\nLieber Opa,\n\nMama hat erzählt, dass du kaum Obst und Gemüse isst. Ich habe in Bio gerade Vitamine gelernt und möchte dir erklären, warum sie so wichtig sind.\n\nVitamine sind lebensnotwendige Nährstoffe. Der Körper braucht sie nur in kleinen Mengen, aber er muss sie über die Nahrung aufnehmen. Wer zu wenig Vitamine bekommt, kann Mangelerscheinungen bekommen, zum Beispiel schlechte Haut oder Zahnausfall.\n\nVitamin C hilft deinem Körper, Krankheitserreger zu bekämpfen. Es steckt in Obst, Gemüse und Kräutern. Vitamin A ist wichtig für die Haut und die Sehkraft – du findest es in Möhren und Kohl.\n\nBitte probier doch jeden Tag einen Apfel und ein paar Möhren!\n\nGanz liebe Grüße\ndeine Lena", es: "Múnich, 20.10.2025\n\nQuerido abuelo:\n\nMamá me ha contado que casi no comes fruta ni verdura. En biología acabo de estudiar las vitaminas y quiero explicarte por qué son tan importantes.\n\nLas vitaminas son nutrientes esenciales. El cuerpo las necesita solo en pequeñas cantidades, pero tiene que tomarlas con la comida. Quien toma pocas vitaminas puede tener síntomas de carencia, por ejemplo mala piel o caída de dientes.\n\nLa vitamina C ayuda a tu cuerpo a combatir los agentes patógenos. Está en la fruta, la verdura y las hierbas. La vitamina A es importante para la piel y la vista; la encuentras en las zanahorias y la col.\n\n¡Por favor, prueba cada día una manzana y unas zanahorias!\n\nUn beso muy fuerte,\nLena" } }
];

/* ---------------------------------------------------------------------
   KAPITEL
   --------------------------------------------------------------------- */
const CHAPTERS = [
  {
    id: "energie", n: 1,
    title: { de: "Energie", es: "Energía" },
    short: { de: "Energieformen und Energiewandler", es: "Formas de energía y transformadores" },
    exam: { de: "Was ist Energie? Energieformen und Energiewandler (wiederholen mit LearningApps)", es: "¿Qué es la energía? Formas de energía y transformadores de energía (repasar con LearningApps)" },
    sections: [
      { h: { de: "Was ist Energie?", es: "¿Qué es la energía?" }, blocks: [
        { type: "def", text: { de: "[[Energie]] ist die **Fähigkeit, Arbeit zu verrichten**. Energie ermöglicht Veränderungen: Mit Energie kann man etwas bewegen, erwärmen, beleuchten oder verändern.", es: "La energía es la capacidad de realizar trabajo. La energía hace posibles los cambios: con energía se puede mover, calentar, iluminar o transformar algo." } },
        { type: "list", items: [
          { ico: "bolt", de: "Energie ermöglicht **Veränderungen**.", es: "La energía hace posibles los cambios." },
          { ico: "muscle", de: "Energie ist die **Fähigkeit, Arbeit zu verrichten**.", es: "La energía es la capacidad de realizar trabajo." },
          { ico: "alert", de: "Energie kann **nicht produziert** und **nicht zerstört** werden – sie wird nur **umgewandelt**.", es: "La energía no se puede producir ni destruir: solo se transforma." },
          { ico: "scale", de: "Einheit: **[[Joule]] (J)**, früher **Kalorien (cal)**", es: "Unidad: julio (J); antes, calorías (cal)" }
        ]},
        { type: "fig", name: "doWork", caption: { de: "Vier Dinge, die Energie kann: bewegen, erwärmen, beleuchten, verändern.", es: "Cuatro cosas que puede hacer la energía: mover, calentar, iluminar, transformar." } }
      ]},
      { h: { de: "Einheiten: kJ und kcal", es: "Unidades: kJ y kcal" }, blocks: [
        { type: "p", text: { de: "Den Energiegehalt der Nährstoffe gibt man in zwei Einheiten an:", es: "El contenido energético de los nutrientes se indica en dos unidades:" } },
        { type: "table", head: [{ de: "Bezeichnung", es: "Nombre" }, { de: "Einheit", es: "Unidad" }, { de: "Abkürzung", es: "Abreviatura" }], rows: [
          [{ de: "international", es: "internacional" }, { de: "[[Kilojoule]]", es: "kilojulio" }, "kJ"],
          [{ de: "veraltet", es: "antigua" }, { de: "[[Kilokalorie]]", es: "kilocaloría" }, "kcal"]
        ]},
        { type: "formula", text: "1 kcal ≈ 4,2 kJ   ·   1 kJ ≈ 0,24 kcal", sub: { de: "Von kcal nach kJ: × 4,2. Von kJ nach kcal: × 0,24 (oder : 4,2). Genau ist 1 kcal = 4,184 kJ.", es: "De kcal a kJ: × 4,2. De kJ a kcal: × 0,24 (o : 4,2). Exactamente, 1 kcal = 4,184 kJ." } },
        { type: "fig", name: "kcal", caption: { de: "Eine Kilokalorie ist etwas mehr als vier Kilojoule.", es: "Una kilocaloría es algo más de cuatro kilojulios." } },
        { type: "p", text: { de: "Auf jeder Verpackung steht der Energiegehalt pro 100 g, zum Beispiel „Energie 1550 kJ / 370 kcal“. Übe das Umrechnen:", es: "En cada envase aparece el contenido energético por 100 g, por ejemplo «Energía 1550 kJ / 370 kcal». Practica la conversión:" } },
        { type: "widget", name: "calc", arg: "conv" }
      ]},
      { h: { de: "Energieformen", es: "Formas de energía" }, blocks: [
        { type: "p", text: { de: "Energie kommt in verschiedenen [[Energieformen|Energieform]] vor. So sah die Übersicht im Heft aus:", es: "La energía existe en distintas formas. Así era el esquema del cuaderno:" } },
        { type: "fig", name: "formsWheel", caption: { de: "Die Energieformen aus dem Unterricht – mit je einem Beispiel.", es: "Las formas de energía de clase, cada una con un ejemplo." } },
        { type: "note", text: { de: "**Gleiche Bedeutung** Lageenergie = [[potentielle Energie]] · Bewegungsenergie = [[kinetische Energie]] · Lichtenergie = [[Strahlungsenergie]]", es: "Mismo significado: Lageenergie = energía potencial · Bewegungsenergie = energía cinética · Lichtenergie = energía radiante." } },
        { type: "p", text: { de: "Überlege zuerst selbst ein Beispiel – dann tippe auf die Karte.", es: "Piensa primero tú un ejemplo y luego toca la tarjeta." } },
        { type: "cards", items: [
          { ico: "battery", front: { de: "Chemische Energie", es: "Energía química" }, back: { de: "Gespeichert in Stoffen: Benzin, Nahrung, Batterie, Holz.", es: "Almacenada en sustancias: gasolina, comida, pila, madera." } },
          { ico: "ball", front: { de: "Bewegungsenergie (kinetische Energie)", es: "Energía cinética" }, back: { de: "Alles, was sich bewegt: Motorrad, fahrendes Auto, Fallschirmspringer im freien Fall.", es: "Todo lo que se mueve: moto, coche en marcha, paracaidista en caída libre." } },
          { ico: "rock", front: { de: "Lageenergie (potentielle Energie)", es: "Energía potencial" }, back: { de: "Etwas ist in der Höhe: Stein oben am Berg, Katze auf dem Baum, Wasser im Stausee.", es: "Algo está en lo alto: piedra en la montaña, gato en el árbol, agua en un embalse." } },
          { ico: "spring", front: { de: "Spannungsenergie", es: "Energía elástica" }, back: { de: "Etwas ist gespannt: zusammengedrückte Feder, Trampolin, gespannter Bogen.", es: "Algo está tensado: muelle comprimido, trampolín, arco tensado." } },
          { ico: "flame", front: { de: "Wärmeenergie", es: "Energía térmica" }, back: { de: "Feuer, brennende Kerze, Topf auf dem Herd.", es: "Fuego, vela encendida, olla en el fuego." } },
          { ico: "bolt", front: { de: "Elektrische Energie", es: "Energía eléctrica" }, back: { de: "Strom aus der Steckdose, Taschenlampe, Blitz.", es: "Corriente del enchufe, linterna, rayo." } },
          { ico: "sun", front: { de: "Strahlungsenergie (Licht)", es: "Energía radiante (luz)" }, back: { de: "Sonne, Licht einer Lampe, Radiowellen.", es: "Sol, luz de una lámpara, ondas de radio." } },
          { ico: "guitar", front: { de: "Schallenergie", es: "Energía sonora" }, back: { de: "Gitarre, Megaphon, Lautsprecher.", es: "Guitarra, megáfono, altavoz." } },
          { ico: "atom", front: { de: "Kernenergie", es: "Energía nuclear" }, back: { de: "Steckt in Atomkernen: Uran, Atombombe, Sonne.", es: "Está en los núcleos de los átomos: uranio, bomba atómica, Sol." } }
        ]},
        { type: "p", text: { de: "Ordne zu – wie in den LearningApps:", es: "Clasifica, como en las LearningApps:" } },
        { type: "widget", name: "sort", arg: "energieformen" }
      ]},
      { h: { de: "Energieumwandlung und Energiewandler", es: "Transformación de energía y transformadores" }, blocks: [
        { type: "def", text: { de: "[[Energieumwandlung]] bedeutet, dass Energie von einer Form (zum Beispiel Bewegungsenergie oder Wärme) in eine andere Form (zum Beispiel elektrische Energie oder Licht) gewechselt wird. Ein Gerät oder Lebewesen, das das macht, ist ein **[[Energiewandler]]**.", es: "Transformación de energía significa que la energía pasa de una forma (por ejemplo, energía cinética o calor) a otra (por ejemplo, energía eléctrica o luz). Un aparato o ser vivo que lo hace es un transformador de energía." } },
        { type: "p", text: { de: "Dabei geht keine Energie verloren ([[Energieerhaltung]]). Aber bei fast jeder Umwandlung entsteht auch **Wärme**, die man meist nicht nutzen kann.", es: "No se pierde energía (conservación de la energía). Pero en casi toda transformación se produce también calor, que normalmente no se puede aprovechar." } },
        { type: "widget", name: "sankey" },
        { type: "p", text: { de: "Wähle einen Energiewandler. Überlege: Welche Energie wird **zugeführt** (Eingabe), welche wird **abgegeben** (Ausgabe)? Dann tippe auf „Auflösen“.", es: "Elige un transformador de energía. Piensa: ¿qué energía entra (entrada) y cuál sale (salida)? Luego toca «Auflösen» (resolver)." } },
        { type: "widget", name: "conversion" },
        { type: "p", text: { de: "Energie wird oft über mehrere Stationen weitergegeben – das ist eine [[Energiekette]]. Bei jedem Schritt entsteht Wärme:", es: "La energía a menudo pasa por varias estaciones: es una cadena de energía. En cada paso se produce calor:" } },
        { type: "fig", name: "energyChain", caption: { de: "Wie im Heft: Sonne → Pflanze → Mensch → Dynamo → Lampe. Bei jedem Pfeil entsteht auch Wärme.", es: "Como en el cuaderno: Sol → planta → persona → dinamo → lámpara. En cada flecha se produce también calor." } },
        { type: "note", text: { de: "**Tipp** Wiederhole auch die LearningApps aus dem Unterricht.", es: "Consejo: repasa también las LearningApps de clase." } }
      ]}
    ]
  },
  {
    id: "umsatz", n: 2,
    title: { de: "Grundumsatz & Leistungsumsatz", es: "Metabolismo basal y gasto por actividad" },
    short: { de: "Definitionen, Grundumsatz berechnen, PAL-Wert", es: "Definiciones, calcular el metabolismo basal, valor PAL" },
    exam: { de: "Grundumsatz und Leistungsumsatz definieren und den Grundumsatz berechnen (Körpergewicht × 24)", es: "Definir metabolismo basal y gasto por actividad, y calcular el metabolismo basal (peso × 24)" },
    sections: [
      { h: { de: "Wofür braucht der Mensch Energie?", es: "¿Para qué necesita energía el ser humano?" }, blocks: [
        { type: "p", text: { de: "Der Körper braucht ständig Energie – sogar im Schlaf. Er gewinnt sie aus der **chemischen Energie** der Nährstoffe. Der Mensch braucht Energie …", es: "El cuerpo necesita energía constantemente, incluso durmiendo. La obtiene de la energía química de los nutrientes. El ser humano necesita energía…" } },
        { type: "list", items: [
          { ico: "heart", de: "… damit die Organe arbeiten (Herz, Lunge, Gehirn)", es: "… para que funcionen los órganos (corazón, pulmones, cerebro)" },
          { ico: "thermo", de: "… um die Körpertemperatur von 37 °C zu halten", es: "… para mantener la temperatura corporal de 37 °C" },
          { ico: "runner", de: "… für Bewegung, Arbeit und Sport", es: "… para el movimiento, el trabajo y el deporte" },
          { ico: "cell", de: "… für Wachstum und Zellerneuerung", es: "… para crecer y renovar las células" }
        ]},
        { type: "p", text: { de: "Der Energiebedarf setzt sich aus dem **[[Grundumsatz]]** und dem **[[Leistungsumsatz]]** zusammen.", es: "La necesidad de energía se compone del metabolismo basal y del gasto por actividad." } },
        { type: "formula", text: { de: "Gesamtumsatz = Grundumsatz + Leistungsumsatz", es: "Gasto total = metabolismo basal + gasto por actividad" } }
      ]},
      { h: { de: "Grundumsatz", es: "Metabolismo basal" }, blocks: [
        { type: "def", text: { de: "Der **Grundumsatz** ist die Energie, die der Körper bei **völliger Ruhe** benötigt, um seine Funktionen aufrechtzuerhalten (Herz, Lunge, Gehirn, Körpertemperatur …).", es: "El metabolismo basal es la energía que el cuerpo necesita en reposo total para mantener sus funciones (corazón, pulmones, cerebro, temperatura corporal…)." } },
        { type: "fig", name: "body", caption: { de: "Auch wenn du nichts tust, arbeiten Gehirn, Lunge, Herz und Nieren – und der Körper hält 37 °C.", es: "Aunque no hagas nada, trabajan el cerebro, los pulmones, el corazón y los riñones, y el cuerpo mantiene 37 °C." } },
        { type: "p", text: { de: "Welche Organe brauchen wie viel vom Grundumsatz?", es: "¿Qué órganos necesitan qué parte del metabolismo basal?" } },
        { type: "fig", name: "organs", caption: { de: "Anteil der Organe am Grundumsatz (ungefähre Werte aus dem Arbeitsblatt).", es: "Parte del metabolismo basal que usa cada órgano (valores aproximados de la hoja de trabajo)." } },
        { type: "example", title: { de: "So kannst du die Grafik beschreiben", es: "Así puedes describir el gráfico" }, steps: [
          { de: "Das Diagramm zeigt, wie viel Prozent des Grundumsatzes die Organe brauchen.", es: "El diagrama muestra qué porcentaje del metabolismo basal necesitan los órganos." },
          { de: "Am meisten brauchen die Leber und die Skelettmuskulatur (je etwa ein Viertel).", es: "Lo que más necesitan son el hígado y la musculatura esquelética (cada uno, aproximadamente una cuarta parte)." },
          { de: "Danach kommt das Gehirn mit fast 20 %, obwohl es nur klein ist.", es: "Después viene el cerebro con casi un 20 %, aunque es pequeño." },
          { de: "Herz und Nieren brauchen am wenigsten (unter 10 %).", es: "El corazón y los riñones necesitan menos (menos del 10 %)." }
        ], result: { de: "Erklärung: Diese Organe arbeiten auch in Ruhe ständig.", es: "Explicación: estos órganos trabajan sin parar, también en reposo." } },
        { type: "p", text: { de: "Der Grundumsatz hängt von folgenden Faktoren ab:", es: "El metabolismo basal depende de los siguientes factores:" } },
        { type: "table", head: [{ de: "Faktor", es: "Factor" }, { de: "Wirkung auf den Energiebedarf", es: "Efecto sobre la necesidad de energía" }], rows: [
          [{ de: "**Alter**", es: "edad" }, { de: "Im Alter verlangsamen sich die Stoffwechselvorgänge → der Grundumsatz sinkt.", es: "Con la edad los procesos del metabolismo se hacen más lentos → el metabolismo basal baja." }],
          [{ de: "**Geschlecht**", es: "sexo" }, { de: "Bei gleichem Körpergewicht haben Männer mehr Muskeln → höherer Grundumsatz.", es: "Con el mismo peso, los hombres tienen más músculo → metabolismo basal más alto." }],
          [{ de: "**Körpergewicht**", es: "peso corporal" }, { de: "Ein schwererer Körper braucht mehr Energie.", es: "Un cuerpo más pesado necesita más energía." }]
        ]}
      ]},
      { h: { de: "Leistungsumsatz", es: "Gasto por actividad" }, blocks: [
        { type: "def", text: { de: "Der **Leistungsumsatz** ist die Energiemenge, die der Körper **zusätzlich** zum Grundumsatz benötigt, um Arbeiten zu verrichten, also Tätigkeiten auszuführen.", es: "El gasto por actividad es la cantidad de energía que el cuerpo necesita además del metabolismo basal para realizar trabajo, es decir, para hacer actividades." } },
        { type: "list", items: [
          { ico: "runner", de: "Rennen, Sport und körperliche Arbeit", es: "Correr, deporte y trabajo físico" },
          { ico: "brain", de: "Gehirnaktivität: Denken und Lernen", es: "Actividad cerebral: pensar y aprender" },
          { ico: "stomach", de: "Verdauung", es: "Digestión" },
          { ico: "flame", de: "Wärmen bei Kälte", es: "Calentarse cuando hace frío" }
        ]},
        { type: "p", text: { de: "Ordne zu:", es: "Clasifica:" } },
        { type: "widget", name: "sort", arg: "gu-lu" }
      ]},
      { h: { de: "Grundumsatz berechnen", es: "Calcular el metabolismo basal" }, blocks: [
        { type: "formula", text: { de: "Männer: Körpergewicht in kg × 24 = Grundumsatz (kcal)", es: "Hombres: peso en kg × 24 = metabolismo basal (kcal)" } },
        { type: "formula", text: { de: "Frauen: Körpergewicht in kg × 24 × 0,9 = Grundumsatz (kcal)", es: "Mujeres: peso en kg × 24 × 0,9 = metabolismo basal (kcal)" }, sub: { de: "Der Körper braucht in Ruhe etwa 1 kcal (≈ 4,2 kJ) pro kg Körpergewicht und Stunde – mal 24 Stunden.", es: "En reposo el cuerpo necesita aprox. 1 kcal (≈ 4,2 kJ) por kg de peso y por hora, por 24 horas." } },
        { type: "example", title: { de: "a) Herbert Herbst: 27 Jahre, 80 kg, 1,87 m", es: "a) Herbert Herbst: 27 años, 80 kg, 1,87 m" }, steps: [
          "80 × 24 = 1920 kcal"
        ], result: { de: "Grundumsatz: 1920 kcal", es: "Metabolismo basal: 1920 kcal" } },
        { type: "example", title: { de: "b) Sabine Satt: 29 Jahre, 50 000 g, 167 cm", es: "b) Sabine Satt: 29 años, 50 000 g, 167 cm" }, steps: [
          { de: "50 000 g = 50 kg", es: "50 000 g = 50 kg" },
          { de: "Frau: 50 × 24 × 0,9 = 1080 kcal", es: "Mujer: 50 × 24 × 0,9 = 1080 kcal" }
        ], result: { de: "Grundumsatz: 1080 kcal", es: "Metabolismo basal: 1080 kcal" } },
        { type: "example", title: { de: "c) Adam Apfel: 49 Jahre, 80 kg, 1,87 m", es: "c) Adam Apfel: 49 años, 80 kg, 1,87 m" }, steps: [
          "80 × 24 = 1920 kcal"
        ], result: { de: "Grundumsatz: 1920 kcal – genau wie bei Herbert", es: "Metabolismo basal: 1920 kcal, igual que Herbert" } },
        { type: "note", text: { de: "**Achtung, Fallen!** Alter und Körpergröße brauchst du für die Formel nicht – nur das Gewicht (und ob Mann oder Frau). Steht das Gewicht in Gramm da, rechne es zuerst in kg um: 50 000 g = 50 kg.", es: "¡Atención, trampas! La edad y la estatura no hacen falta para la fórmula: solo el peso (y si es hombre o mujer). Si el peso está en gramos, pásalo primero a kg: 50 000 g = 50 kg." } },
        { type: "p", text: { de: "Probiere es mit deinem eigenen Gewicht aus:", es: "Pruébalo con tu propio peso:" } },
        { type: "widget", name: "gucalc" },
        { type: "formula", text: { de: "In kJ: Grundumsatz = 4,2 kJ × Körpergewicht × 24", es: "En kJ: metabolismo basal = 4,2 kJ × peso × 24" }, sub: { de: "Beispiel: Ein Erwachsener mit 65 kg: 4,2 × 65 × 24 = 6552 kJ", es: "Ejemplo: un adulto de 65 kg: 4,2 × 65 × 24 = 6552 kJ" } },
        { type: "p", text: { de: "Jetzt du – rechne selbst:", es: "Ahora tú, calcula:" } },
        { type: "widget", name: "calc", arg: "gu_kcal,gu_kcal,gu_kj,gu_weight" }
      ]},
      { h: { de: "Gesamtumsatz mit dem PAL-Wert", es: "Gasto total con el valor PAL" }, blocks: [
        { type: "p", text: { de: "Wie viel Energie man zusätzlich braucht, hängt davon ab, was man tut. Dafür gibt es den **[[PAL-Wert]]** (Physical Activity Level). Er sagt, mit welcher Zahl man den Grundumsatz multiplizieren muss, um den Gesamtumsatz zu bekommen.", es: "Cuánta energía adicional se necesita depende de lo que se hace. Para eso existe el valor PAL (nivel de actividad física). Indica por qué número hay que multiplicar el metabolismo basal para obtener el gasto total." } },
        { type: "table", head: [{ de: "PAL-Wert", es: "Valor PAL" }, { de: "Aktivität", es: "Actividad" }, { de: "Beispiel", es: "Ejemplo" }], rows: PAL_LEVELS },
        { type: "formula", text: { de: "Gesamtumsatz = Grundumsatz × durchschnittlicher PAL-Wert", es: "Gasto total = metabolismo basal × valor PAL medio" }, sub: { de: "Schritt 1: Stunden × PAL-Wert für jede Tätigkeit, dann alles addieren · Schritt 2: Summe : 24 = durchschnittlicher PAL · Schritt 3: Grundumsatz × durchschnittlicher PAL", es: "Paso 1: horas × valor PAL de cada actividad, y sumarlo todo · Paso 2: suma : 24 = PAL medio · Paso 3: metabolismo basal × PAL medio" } },
        { type: "example", title: { de: "Beispiel: Mark Mustermann, Grundumsatz 1600 kcal", es: "Ejemplo: Mark Mustermann, metabolismo basal 1600 kcal" }, steps: [
          { de: "Schlafen: 8 h × 0,95 = 7,6", es: "Dormir: 8 h × 0,95 = 7,6" },
          { de: "Büro: 8 h × 1,5 = 12", es: "Oficina: 8 h × 1,5 = 12" },
          { de: "Haushalt: 4 h × 2,0 = 8", es: "Casa: 4 h × 2,0 = 8" },
          { de: "Sport: 2 h × 3,0 = 6", es: "Deporte: 2 h × 3,0 = 6" },
          { de: "Freizeit: 2 h × 1,8 = 3,6", es: "Tiempo libre: 2 h × 1,8 = 3,6" },
          { de: "Summe: 7,6 + 12 + 8 + 6 + 3,6 = 37,2", es: "Suma: 7,6 + 12 + 8 + 6 + 3,6 = 37,2" },
          { de: "37,2 : 24 = 1,55 (durchschnittlicher PAL)", es: "37,2 : 24 = 1,55 (PAL medio)" },
          "1600 kcal × 1,55 = 2480 kcal"
        ], result: { de: "Mark braucht pro Tag etwa 2480 kcal (Gesamtenergiebedarf).", es: "Mark necesita unas 2480 kcal al día (necesidad energética total)." } },
        { type: "note", text: { de: "**Hinweis** Im Arbeitsblatt steht als Merksatz „Leistungsumsatz = PAL-Wert • Grundumsatz“. Gemeint ist: Mit dem PAL-Wert rechnest du den **gesamten** Energiebedarf aus (wie bei Mark). Den Leistungsumsatz allein bekommst du so: Gesamtumsatz − Grundumsatz (bei Mark: 2480 − 1600 = 880 kcal).", es: "Nota: en la hoja aparece «gasto por actividad = PAL × metabolismo basal». Se refiere a que con el PAL calculas la necesidad de energía total (como con Mark). El gasto por actividad solo se obtiene así: total − basal (con Mark: 2480 − 1600 = 880 kcal)." } },
        { type: "p", text: { de: "Plane deinen eigenen Tag:", es: "Planifica tu propio día:" } },
        { type: "widget", name: "pal" },
        { type: "fig", name: "stacked", caption: { de: "Beispielwerte: Der Grundumsatz bleibt gleich – der Leistungsumsatz macht den Unterschied.", es: "Valores de ejemplo: el metabolismo basal no cambia; la diferencia la hace el gasto por actividad." } },
        { type: "widget", name: "calc", arg: "pal_avg,pal_total,gesamt" }
      ]}
    ]
  },
  {
    id: "vitamine", n: 3,
    title: { de: "Vitamine", es: "Vitaminas" },
    short: { de: "Definition, Vitamingruppen, Vokabeln", es: "Definición, grupos de vitaminas, vocabulario" },
    exam: { de: "Vitamine: Definition und Vokabeln", es: "Vitaminas: definición y vocabulario" },
    sections: [
      { h: { de: "Was sind Vitamine?", es: "¿Qué son las vitaminas?" }, blocks: [
        { type: "def", text: { de: "[[Vitamine]] sind [[lebensnotwendig]]e [[organisch]]e **Nährstoffe**, die der Körper für eine gesunde Funktion braucht. Sie sind in Lebensmitteln enthalten und werden über die **Nahrung** aufgenommen, denn der Körper kann sie nicht oder nicht ausreichend selbst herstellen. Er braucht sie nur in **kleinen Mengen**. Vitamine liefern keine Energie.", es: "Las vitaminas son nutrientes orgánicos esenciales que el cuerpo necesita para funcionar bien. Están en los alimentos y se toman con la comida, porque el cuerpo no puede fabricarlas, o no lo suficiente. Solo las necesita en pequeñas cantidades. Las vitaminas no aportan energía." } },
        { type: "def", label: { de: "Mangel", es: "Carencia" }, text: { de: "Wenn man zu wenig Vitamine aufnimmt, kommt es zu **[[Mangelerscheinung|Mangelerscheinungen]]**, zum Beispiel schlechte Haut, Haarausfall oder [[Zahnausfall]].", es: "Si se toman pocas vitaminas, aparecen síntomas de carencia, por ejemplo mala piel, caída del pelo o de los dientes." } },
        { type: "chips", items: [
          { de: "lebensnotwendig", es: "esenciales" }, { de: "organisch", es: "orgánicas" },
          { de: "über die Nahrung", es: "con la comida" }, { de: "nur kleine Mengen", es: "solo en pequeñas cantidades" },
          { de: "keine Energie", es: "no dan energía" }, { de: "Mangel → Mangelerscheinungen", es: "carencia → síntomas" },
          { de: "6 Gruppen: A, B, C, D, E, K", es: "6 grupos: A, B, C, D, E, K" }
        ]},
        { type: "fig", name: "amounts", caption: { de: "Tagesbedarf im Vergleich (Fläche = Menge): Vom Vitamin C brauchst du nur ein Krümelchen.", es: "Necesidad diaria comparada (superficie = cantidad): de vitamina C solo necesitas una migaja." } },
        { type: "fig", name: "venn", caption: { de: "Vitamine und Mineralsalze: Was sie unterscheidet und was sie gemeinsam haben.", es: "Vitaminas y sales minerales: en qué se diferencian y qué tienen en común." } }
      ]},
      { h: { de: "Die sechs Vitamingruppen", es: "Los seis grupos de vitaminas" }, blocks: [
        { type: "p", text: { de: "Die Vitamine sind nach **Buchstaben** in Gruppen von A bis K eingeteilt:", es: "Las vitaminas se dividen en grupos según letras, de la A a la K:" } },
        { type: "fig", name: "vitamins", caption: { de: "Wofür jede Vitamingruppe wichtig ist und wo sie drinsteckt.", es: "Para qué es importante cada grupo de vitaminas y dónde se encuentra." } },
        { type: "note", text: { de: "**Merke** Zwei Vitamine kann der Körper selbst bilden: **Vitamin D** in der Haut durch [[Sonneneinstrahlung]] und **Vitamin K** im [[Darm]].", es: "Recuerda: dos vitaminas las puede producir el cuerpo: la vitamina D en la piel con la radiación solar y la vitamina K en el intestino." } },
        { type: "p", text: { de: "Teste dich: Wofür ist das Vitamin wichtig? Tippe auf die Karte.", es: "Ponte a prueba: ¿para qué es importante la vitamina? Toca la tarjeta." } },
        { type: "cards", items: VITAMINS.map(v => ({ ico: v.fnIco[0], front: `Vitamin ${v.l}`, back: { de: `${v.fn.de} · ${v.src.de}`, es: `${v.fn.es} · ${v.src.es}` } })) }
      ]},
      { h: { de: "Vokabeln", es: "Vocabulario" }, blocks: [
        { type: "p", text: { de: "Diese Wörter kommen im Examen vor. Erkläre das Wort zuerst selbst – dann tippe auf die Karte.", es: "Estas palabras salen en el examen. Explica primero tú la palabra y luego toca la tarjeta." } },
        { type: "cards", items: VOCAB.map(v => ({ ico: v.ico, front: v.t, back: v.d })) },
        { type: "note", text: { de: "**Tipp** Im Memory gibt es ein Deck „Vitamine: Vokabeln“.", es: "Consejo: en el Memory hay un mazo «Vitamine: Vokabeln»." } }
      ]},
      { h: { de: "Übe die Definition", es: "Practica la definición" }, blocks: [
        { type: "p", text: { de: "Tippe die Wörter in der richtigen Reihenfolge an.", es: "Toca las palabras en el orden correcto." } },
        { type: "widget", name: "quiz", arg: "v5" }
      ]},
      { h: { de: "Zusatzwissen", es: "Para saber más" }, extra: true, blocks: [
        { type: "p", text: { de: "Man unterscheidet **fettlösliche** Vitamine (E, D, K, A – Merkwort „EDEKA“) und **wasserlösliche** Vitamine (B-Vitamine und C).", es: "Se distinguen vitaminas liposolubles (E, D, K, A – palabra para recordar «EDEKA») e hidrosolubles (vitaminas B y C)." } },
        { type: "fig", name: "drops", caption: { de: "EDEKA löst sich in Fett, B und C lösen sich in Wasser.", es: "E, D, K, A se disuelven en grasa; B y C en agua." } }
      ]}
    ]
  },
  {
    id: "naehrstoffe", n: 4,
    title: { de: "Nährstoffe", es: "Nutrientes" },
    short: { de: "Fette, Proteine, Kohlenhydrate – Steckbriefe", es: "Grasas, proteínas, carbohidratos – fichas" },
    exam: { de: "Nährstoffe: Fette, Proteine und Kohlenhydrate – Vorkommen und Funktionen", es: "Nutrientes: grasas, proteínas y carbohidratos – dónde se encuentran y funciones" },
    sections: [
      { h: { de: "Die drei Hauptnährstoffe", es: "Los tres nutrientes principales" }, blocks: [
        { type: "p", text: { de: "Die drei Hauptnährstoffe sind **[[Kohlenhydrate]]**, **[[Fette]]** und **[[Proteine]]** (Eiweiße). Sie liefern Energie oder Baustoffe. Daneben braucht der Körper Vitamine, Mineralsalze und Wasser.", es: "Los tres nutrientes principales son los carbohidratos, las grasas y las proteínas. Aportan energía o material de construcción. Además, el cuerpo necesita vitaminas, sales minerales y agua." } },
        { type: "fig", name: "metaphors", caption: { de: "Merkbilder: Benzin, Reservetank, Ziegelsteine. Tippe auf ein Bild.", es: "Imágenes para recordar: gasolina, depósito, ladrillos. Toca una imagen." } },
        { type: "p", text: { de: "Wähle einen Nährstoff – so sieht sein Steckbrief aus:", es: "Elige un nutriente; así es su ficha:" } },
        { type: "widget", name: "nutrients" }
      ]},
      { h: { de: "Aufbau der Moleküle", es: "Estructura de las moléculas" }, blocks: [
        { type: "p", text: { de: "Im Unterricht wurden die Moleküle mit Symbolen gezeichnet:", es: "En clase las moléculas se dibujaron con símbolos:" } },
        { type: "fig", name: "molecules", caption: { de: "Fett: Glycerin + 3 Fettsäuren · Protein: Kette aus Aminosäuren · Stärke: Kette aus Glucosemolekülen.", es: "Grasa: glicerina + 3 ácidos grasos · Proteína: cadena de aminoácidos · Almidón: cadena de moléculas de glucosa." } }
      ]},
      { h: { de: "Energiegehalt", es: "Contenido energético" }, blocks: [
        { type: "fig", name: "kjBars", caption: { de: "Energie pro Gramm: Fett liefert etwa doppelt so viel wie Kohlenhydrate oder Eiweiß.", es: "Energía por gramo: la grasa aporta aproximadamente el doble que los carbohidratos o las proteínas." } },
        { type: "table", head: [{ de: "1 g …", es: "1 g de…" }, "kJ", "kcal"], rows: [
          [{ de: "Fett", es: "grasa" }, "37", "9"],
          [{ de: "Kohlenhydrate", es: "carbohidratos" }, "17", "4"],
          [{ de: "Eiweiß", es: "proteína" }, "17", "4"],
          [{ de: "Alkohol (kein Nährstoff, aber energiereich)", es: "alcohol (no es un nutriente, pero tiene mucha energía)" }, "29", "7"]
        ]},
        { type: "example", title: { de: "Beispiel: Ein Müsliriegel", es: "Ejemplo: una barrita de muesli" }, steps: [
          { de: "20 g Kohlenhydrate × 17 kJ = 340 kJ", es: "20 g de carbohidratos × 17 kJ = 340 kJ" },
          { de: "5 g Fett × 37 kJ = 185 kJ", es: "5 g de grasa × 37 kJ = 185 kJ" },
          { de: "3 g Eiweiß × 17 kJ = 51 kJ", es: "3 g de proteína × 17 kJ = 51 kJ" }
        ], result: { de: "Zusammen: 576 kJ", es: "En total: 576 kJ" } },
        { type: "widget", name: "calc", arg: "naehr_energy" }
      ]},
      { h: { de: "Was steckt worin?", es: "¿Qué hay en cada alimento?" }, blocks: [
        { type: "p", text: { de: "Lenas Pausenbrot besteht aus Brot, Butter und Käse:", es: "El bocadillo de Lena es de pan, mantequilla y queso:" } },
        { type: "fig", name: "pausenbrot", caption: { de: "Im Brot sind Kohlenhydrate enthalten. In der Butter ist Fett enthalten. Im Käse (und im Soja) ist Eiweiß enthalten.", es: "En el pan hay carbohidratos. En la mantequilla hay grasa. En el queso (y en la soja) hay proteína." } },
        { type: "p", text: { de: "Ordne die Lebensmittel dem Nährstoff zu, von dem sie am meisten enthalten.", es: "Clasifica los alimentos según el nutriente que más contienen." } },
        { type: "widget", name: "sort", arg: "lebensmittel" }
      ]}
    ]
  },
  {
    id: "mineral", n: 5,
    title: { de: "Mineralsalze", es: "Sales minerales" },
    short: { de: "Wo? Funktion? Rechnen – Makro- und Mikroelemente", es: "¿Dónde? ¿Función? Calcular – macro y microelementos" },
    exam: { de: "Mineralsalze: wo? Funktion? Rechnen (Tagesbedarf). Makroelemente mit Funktion und Vorkommen, Mikroelemente nur den Namen", es: "Sales minerales: ¿dónde? ¿función? Calcular (necesidad diaria). Macroelementos con función y dónde están; microelementos solo el nombre" },
    sections: [
      { h: { de: "Was sind Mineralsalze?", es: "¿Qué son las sales minerales?" }, blocks: [
        { type: "def", text: { de: "[[Mineralsalze]] sind **[[anorganisch]]e Nährstoffe**, die in Form von in Wasser gelösten **[[Ionen]]** (geladenen Teilchen) durch die Nahrung aufgenommen werden. Sie liefern keine Energie, sind aber lebensnotwendig.", es: "Las sales minerales son nutrientes inorgánicos que se toman con la comida en forma de iones disueltos en agua (partículas con carga). No aportan energía, pero son esenciales." } },
        { type: "p", text: { de: "Man teilt sie in zwei Gruppen ein:", es: "Se dividen en dos grupos:" } },
        { type: "def", label: { de: "Merke", es: "Recuerda" }, text: { de: "**[[Makroelemente]]** ([[Mengenelemente]]) braucht der Körper in größeren Mengen – mehrere hundert bis tausend mg pro Tag: Calcium, Magnesium, Phosphor, Natrium, Kalium. **[[Mikroelemente]]** ([[Spurenelemente]]) braucht er nur in Spuren – wenige mg: Eisen, Iod, Fluor.", es: "Los macroelementos el cuerpo los necesita en cantidades mayores, varios cientos o miles de mg al día: calcio, magnesio, fósforo, sodio, potasio. Los microelementos (oligoelementos) solo en trazas, pocos mg: hierro, yodo, flúor." } },
        { type: "fig", name: "need", caption: { de: "Tagesbedarf in mg (Werte aus dem Arbeitsblatt). Logarithmische Skala: Jeder Schritt ist ×10.", es: "Necesidad diaria en mg (valores de la hoja de trabajo). Escala logarítmica: cada paso es ×10." } }
      ]},
      { h: { de: "Makroelemente", es: "Macroelementos" }, blocks: [
        { type: "p", text: { de: "Diese fünf musst du mit **Funktion** (wofür?) und **Vorkommen** (wo?) kennen. Tippe auf ein Element.", es: "Estos cinco los tienes que saber con su función (¿para qué?) y dónde se encuentran (¿dónde?). Toca un elemento." } },
        { type: "widget", name: "elements" },
        { type: "note", text: { de: "**Eselsbrücke** Calcium spannt die Muskeln an (Kontraktion), Magnesium entspannt sie.", es: "Truco: el calcio contrae los músculos y el magnesio los relaja." } }
      ]},
      { h: { de: "Mikroelemente (Spurenelemente)", es: "Microelementos (oligoelementos)" }, blocks: [
        { type: "p", text: { de: "Im Examen genügen die **Namen**. Im Heft stehen auch Funktion und Vorkommen (klein darunter):", es: "En el examen basta con los nombres. En el cuaderno también están la función y dónde se encuentran (en pequeño debajo):" } },
        { type: "mikro" },
        { type: "note", text: { de: "**Merke** Eisen ist ein Mikroelement, obwohl es sehr wichtig ist.", es: "Recuerda: el hierro es un microelemento, aunque es muy importante." } }
      ]},
      { h: { de: "Rechnen: Was fehlt Jonas?", es: "Calcular: ¿qué le falta a Jonas?" }, blocks: [
        { type: "p", text: { de: "Steht in der Tabelle, wie viel mg in **100 g** stecken, rechnest du mit dem **[[Dreisatz]]** auf die gegessene Menge um – wie an der Tafel:", es: "Si la tabla indica cuántos mg hay en 100 g, calculas con la regla de tres la cantidad que se ha comido, como en la pizarra:" } },
        { type: "fig", name: "dreisatz", caption: { de: "Doppelte Menge → doppelt so viele mg. Halbe Menge → halb so viele mg.", es: "El doble de cantidad → el doble de mg. La mitad de cantidad → la mitad de mg." } },
        { type: "example", title: { de: "Beispiel: Jonas isst zwei Bananen (je 200 g)", es: "Ejemplo: Jonas come dos plátanos (de 200 g cada uno)" }, text: { de: "100 g Banane enthalten 30 mg Magnesium.", es: "100 g de plátano contienen 30 mg de magnesio." }, steps: [
          { de: "2 × 200 g = 400 g", es: "2 × 200 g = 400 g" },
          { de: "100 g ≙ 30 mg   | × 4", es: "100 g ≙ 30 mg   | × 4" },
          { de: "400 g ≙ 120 mg", es: "400 g ≙ 120 mg" }
        ], result: { de: "→ Jonas nimmt mit den Bananen 120 mg Magnesium auf.", es: "→ Con los plátanos, Jonas toma 120 mg de magnesio." } },
        { type: "list", items: [
          { ico: "calc", de: "**Schritt 1** Für jedes Lebensmittel die mg ausrechnen (Dreisatz).", es: "Paso 1: calcular los mg de cada alimento (regla de tres)." },
          { ico: "plate", de: "**Schritt 2** Alle mg zusammenzählen → Gesamt.", es: "Paso 2: sumar todos los mg → total." },
          { ico: "scale", de: "**Schritt 3** Gesamt mit dem [[Tagesbedarf]] vergleichen: Ist Gesamt mindestens so groß, ist der Tagesbedarf **gedeckt** ✓.", es: "Paso 3: comparar el total con la necesidad diaria: si el total es igual o mayor, la necesidad está cubierta ✓." }
        ]},
        { type: "p", text: { de: "Fülle Jonas’ Tabelle aus:", es: "Completa la tabla de Jonas:" } },
        { type: "widget", name: "jonas" },
        { type: "p", text: { de: "Mehr Aufgaben mit immer neuen Zahlen:", es: "Más ejercicios con números siempre nuevos:" } },
        { type: "widget", name: "calc", arg: "min_portion,min_day,min_covered,min_pct" }
      ]}
    ]
  }
];

/* ---------------------------------------------------------------------
   FRAGEN  (type: mc | tf | multi | cloze | num)
   extra: true = Zusatzwissen, kommt nicht in die Probeprüfung
   --------------------------------------------------------------------- */
const QUESTIONS = [
  // ENERGIE
  { id: "e1", topic: "energie", type: "mc", q: { de: "Was ist Energie?", es: "¿Qué es la energía?" },
    options: [{ de: "Die Fähigkeit, Arbeit zu verrichten", es: "La capacidad de realizar trabajo" }, { de: "Die Kraft, mit der ein Körper fällt", es: "La fuerza con la que cae un cuerpo" }, { de: "Die Menge an Nahrung, die man isst", es: "La cantidad de comida que se come" }, { de: "Die Geschwindigkeit eines Körpers", es: "La velocidad de un cuerpo" }], answer: 0,
    explain: { de: "Energie ist die Fähigkeit, Arbeit zu verrichten. Sie ermöglicht Veränderungen.", es: "La energía es la capacidad de realizar trabajo. Hace posibles los cambios." } },
  { id: "e2", topic: "energie", type: "mc", q: { de: "In welcher Einheit misst man Energie?", es: "¿En qué unidad se mide la energía?" },
    options: ["Joule (J)", "Watt (W)", "Newton (N)", { de: "Gramm (g)", es: "gramo (g)" }], answer: 0,
    explain: { de: "Energie misst man in Joule (J) bzw. Kilojoule (kJ). Früher in Kalorien.", es: "La energía se mide en julios (J) o kilojulios (kJ). Antes, en calorías." } },
  { id: "e3", topic: "energie", type: "mc", q: { de: "1 kcal entspricht ungefähr …", es: "1 kcal equivale aproximadamente a…" },
    options: ["4,2 kJ", "1000 kJ", "0,24 kJ", "42 kJ"], answer: 0,
    explain: { de: "1 kcal ≈ 4,2 kJ. Umgekehrt: 1 kJ ≈ 0,24 kcal.", es: "1 kcal ≈ 4,2 kJ. Al revés: 1 kJ ≈ 0,24 kcal." } },
  { id: "e3b", topic: "energie", type: "mc", q: { de: "1 kJ entspricht ungefähr …", es: "1 kJ equivale aproximadamente a…" },
    options: ["0,24 kcal", "4,2 kcal", "24 kcal", "1000 kcal"], answer: 0 },
  { id: "e3c", topic: "energie", type: "mc", q: { de: "Welche Einheit für den Energiegehalt der Nährstoffe ist die internationale Bezeichnung?", es: "¿Qué unidad del contenido energético de los nutrientes es la denominación internacional?" },
    options: [{ de: "Kilojoule (kJ)", es: "kilojulio (kJ)" }, { de: "Kilokalorie (kcal)", es: "kilocaloría (kcal)" }, { de: "Kilogramm (kg)", es: "kilogramo (kg)" }, { de: "Kilowatt (kW)", es: "kilovatio (kW)" }], answer: 0,
    explain: { de: "International: Kilojoule (kJ). Veraltet: Kilokalorie (kcal).", es: "Internacional: kilojulio (kJ). Antigua: kilocaloría (kcal)." } },
  { id: "e4", topic: "energie", type: "mc", q: { de: "Welche Energieform steckt in Benzin und Nahrung?", es: "¿Qué forma de energía hay en la gasolina y en la comida?" },
    options: [{ de: "Chemische Energie", es: "Energía química" }, { de: "Lageenergie", es: "Energía potencial" }, { de: "Elektrische Energie", es: "Energía eléctrica" }, { de: "Schallenergie", es: "Energía sonora" }], answer: 0 },
  { id: "e5", topic: "energie", type: "mc", q: { de: "Welche Energieform hat eine Katze, die oben auf einem Baum sitzt?", es: "¿Qué forma de energía tiene un gato sentado en lo alto de un árbol?" },
    options: [{ de: "Lageenergie (potentielle Energie)", es: "Energía potencial" }, { de: "Bewegungsenergie", es: "Energía cinética" }, { de: "Wärmeenergie", es: "Energía térmica" }, { de: "Strahlungsenergie", es: "Energía radiante" }], answer: 0,
    explain: { de: "Weil die Katze hoch oben ist, hat sie Lageenergie (potentielle Energie).", es: "Como el gato está arriba, tiene energía potencial." } },
  { id: "e6", topic: "energie", type: "mc", q: { de: "Welche Energieform hat ein Fallschirmspringer im freien Fall?", es: "¿Qué forma de energía tiene un paracaidista en caída libre?" },
    options: [{ de: "Bewegungsenergie (kinetische Energie)", es: "Energía cinética" }, { de: "Kernenergie", es: "Energía nuclear" }, { de: "Schallenergie", es: "Energía sonora" }, { de: "Spannungsenergie", es: "Energía elástica" }], answer: 0 },
  { id: "e7", topic: "energie", type: "mc", q: { de: "Welche Energieform steckt im Uran?", es: "¿Qué forma de energía hay en el uranio?" },
    options: [{ de: "Kernenergie", es: "Energía nuclear" }, { de: "Lageenergie", es: "Energía potencial" }, { de: "Schallenergie", es: "Energía sonora" }, { de: "Bewegungsenergie", es: "Energía cinética" }], answer: 0 },
  { id: "e8", topic: "energie", type: "mc", q: { de: "Ein Trampolin wird zusammengedrückt. Welche Energie steckt darin?", es: "Un trampolín se comprime. ¿Qué energía tiene?" },
    options: [{ de: "Spannungsenergie", es: "Energía elástica" }, { de: "Kernenergie", es: "Energía nuclear" }, { de: "Strahlungsenergie", es: "Energía radiante" }, { de: "Chemische Energie", es: "Energía química" }], answer: 0 },
  { id: "e9", topic: "energie", type: "tf", q: { de: "Energie kann produziert und zerstört werden.", es: "La energía se puede producir y destruir." }, answer: false,
    explain: { de: "Falsch. Energie kann nicht produziert und nicht zerstört werden – nur umgewandelt.", es: "Falso. La energía no se puede producir ni destruir, solo transformar." } },
  { id: "e10", topic: "energie", type: "mc", q: { de: "Taschenlampe: Welche Energieform wird zugeführt?", es: "Linterna: ¿qué forma de energía entra?" },
    options: [{ de: "Elektrische Energie", es: "Energía eléctrica" }, { de: "Strahlungsenergie", es: "Energía radiante" }, { de: "Lageenergie", es: "Energía potencial" }, { de: "Schallenergie", es: "Energía sonora" }], answer: 0,
    explain: { de: "Zugeführt: elektrische Energie. Abgegeben: Strahlungsenergie (Licht) und Wärme.", es: "Entra energía eléctrica. Sale energía radiante (luz) y calor." } },
  { id: "e11", topic: "energie", type: "multi", q: { de: "Welche davon sind Energieformen?", es: "¿Cuáles son formas de energía?" },
    options: [{ de: "Wärmeenergie", es: "Energía térmica" }, { de: "Strahlungsenergie", es: "Energía radiante" }, { de: "Proteinenergie", es: "«Energía proteica»" }, { de: "Elektrische Energie", es: "Energía eléctrica" }, { de: "Schallenergie", es: "Energía sonora" }], answer: [0, 1, 3, 4],
    explain: { de: "„Proteinenergie“ gibt es nicht. In Proteinen steckt chemische Energie.", es: "La «energía proteica» no existe. En las proteínas hay energía química." } },
  { id: "e12", topic: "energie", type: "cloze", q: { de: "Ergänze die Definition.", es: "Completa la definición." },
    text: { de: "Energie ist die {Fähigkeit}, {Arbeit} zu verrichten. Sie ermöglicht {Veränderungen}.", es: "La energía es la capacidad de realizar trabajo. Hace posibles los cambios." }, distractors: ["Kraft", "Wärme", "Pausen"] },
  { id: "e13", topic: "energie", type: "cloze", q: { de: "Ergänze den Satz.", es: "Completa la frase." },
    text: { de: "Energie kann nicht {produziert} und nicht {zerstört} werden. Sie wird nur {umgewandelt}.", es: "La energía no se puede producir ni destruir. Solo se transforma." }, distractors: ["gezählt", "verdoppelt", "gemessen"] },
  { id: "e14", topic: "energie", type: "mc", q: { de: "Wasser im Stausee: Welche Umwandlung passiert, wenn es herunterfließt?", es: "Agua de un embalse: ¿qué transformación ocurre cuando baja?" },
    options: [{ de: "Potentielle Energie → Bewegungsenergie", es: "Potencial → cinética" }, { de: "Bewegungsenergie → potentielle Energie", es: "Cinética → potencial" }, { de: "Chemische Energie → Wärme", es: "Química → calor" }, { de: "Strahlungsenergie → Schall", es: "Radiante → sonido" }], answer: 0 },
  { id: "e15", topic: "energie", type: "mc", q: { de: "Ein Windrad wandelt …", es: "Un aerogenerador transforma…" },
    options: [{ de: "Bewegungsenergie in elektrische Energie um", es: "energía cinética en energía eléctrica" }, { de: "elektrische Energie in Bewegungsenergie um", es: "energía eléctrica en energía cinética" }, { de: "Wärme in Licht um", es: "calor en luz" }, { de: "chemische Energie in Schall um", es: "energía química en sonido" }], answer: 0 },
  { id: "e16", topic: "energie", type: "mc", q: { de: "Brennende Kerze: Welche Energieform wird zugeführt?", es: "Vela encendida: ¿qué forma de energía entra?" },
    options: [{ de: "Chemische Energie", es: "Energía química" }, { de: "Elektrische Energie", es: "Energía eléctrica" }, { de: "Bewegungsenergie", es: "Energía cinética" }, { de: "Kernenergie", es: "Energía nuclear" }], answer: 0,
    explain: { de: "Im Wachs steckt chemische Energie. Abgegeben werden Licht und Wärme.", es: "En la cera hay energía química. Salen luz y calor." } },
  { id: "e17", topic: "energie", type: "mc", q: { de: "Mensch: Welche Umwandlung passiert in den Muskeln?", es: "Persona: ¿qué transformación ocurre en los músculos?" },
    options: [{ de: "Chemische Energie → Bewegungsenergie (+ Wärme)", es: "Química → cinética (+ calor)" }, { de: "Bewegungsenergie → chemische Energie", es: "Cinética → química" }, { de: "Wärmeenergie → Strahlungsenergie", es: "Térmica → radiante" }, { de: "Elektrische Energie → Schallenergie", es: "Eléctrica → sonora" }], answer: 0 },
  { id: "e18", topic: "energie", type: "mc", q: { de: "Glühlampe: Welche Energie wird zugeführt, welche abgegeben?", es: "Bombilla: ¿qué energía entra y cuál sale?" },
    options: [{ de: "elektrisch → Strahlungsenergie (Licht) + Wärme", es: "eléctrica → radiante (luz) + calor" }, { de: "Strahlungsenergie → elektrisch", es: "radiante → eléctrica" }, { de: "chemisch → Schall", es: "química → sonido" }, { de: "Lageenergie → Licht", es: "potencial → luz" }], answer: 0 },
  { id: "e19", topic: "energie", type: "mc", q: { de: "Was bedeutet Energieumwandlung?", es: "¿Qué significa transformación de energía?" },
    options: [{ de: "Energie wechselt von einer Form in eine andere", es: "La energía pasa de una forma a otra" }, { de: "Energie wird neu hergestellt", es: "Se fabrica energía nueva" }, { de: "Energie verschwindet", es: "La energía desaparece" }, { de: "Energie wird gewogen", es: "Se pesa la energía" }], answer: 0 },
  { id: "e20", topic: "energie", type: "mc", q: { de: "Gitarre und Megaphon sind Beispiele für …", es: "La guitarra y el megáfono son ejemplos de…" },
    options: [{ de: "Schallenergie", es: "energía sonora" }, { de: "Kernenergie", es: "energía nuclear" }, { de: "Lageenergie", es: "energía potencial" }, { de: "chemische Energie", es: "energía química" }], answer: 0 },
  { id: "e21", topic: "energie", type: "tf", q: { de: "Bei fast jeder Energieumwandlung entsteht auch Wärme.", es: "En casi toda transformación de energía se produce también calor." }, answer: true },
  { id: "e22", topic: "energie", type: "mc", q: { de: "Welche Energieform kommt von der Sonne zu uns?", es: "¿Qué forma de energía nos llega del Sol?" },
    options: [{ de: "Strahlungsenergie (Licht)", es: "Energía radiante (luz)" }, { de: "Schallenergie", es: "Energía sonora" }, { de: "Lageenergie", es: "Energía potencial" }, { de: "Spannungsenergie", es: "Energía elástica" }], answer: 0 },
  { id: "e23", topic: "energie", type: "mc", q: { de: "Was passiert bei der Photosynthese?", es: "¿Qué ocurre en la fotosíntesis?" },
    options: [{ de: "Lichtenergie → chemische Energie", es: "Luz → energía química" }, { de: "Chemische Energie → Lichtenergie", es: "Química → luz" }, { de: "Wärme → elektrische Energie", es: "Calor → eléctrica" }, { de: "Bewegung → Lageenergie", es: "Cinética → potencial" }], answer: 0 },

  // GRUNDUMSATZ / LEISTUNGSUMSATZ
  { id: "u1", topic: "umsatz", type: "mc", q: { de: "Was ist der Grundumsatz?", es: "¿Qué es el metabolismo basal?" },
    options: [{ de: "Die Energie, die der Körper bei völliger Ruhe benötigt, um seine Funktionen aufrechtzuerhalten", es: "La energía que el cuerpo necesita en reposo total para mantener sus funciones" }, { de: "Die Energie, die man beim Sport verbraucht", es: "La energía que se gasta haciendo deporte" }, { de: "Die Energie, die in 100 g Nahrung steckt", es: "La energía que hay en 100 g de comida" }, { de: "Grundumsatz und Leistungsumsatz zusammen", es: "El metabolismo basal y el gasto por actividad juntos" }], answer: 0 },
  { id: "u2", topic: "umsatz", type: "mc", q: { de: "Was ist der Leistungsumsatz?", es: "¿Qué es el gasto por actividad?" },
    options: [{ de: "Die Energie, die der Körper zusätzlich zum Grundumsatz für Tätigkeiten braucht", es: "La energía que el cuerpo necesita además del metabolismo basal para las actividades" }, { de: "Die Energie für Herz und Atmung im Schlaf", es: "La energía para el corazón y la respiración durmiendo" }, { de: "Die gesamte Energie eines Tages", es: "Toda la energía de un día" }, { de: "Die Energie, die im Fett gespeichert ist", es: "La energía almacenada en la grasa" }], answer: 0,
    explain: { de: "Leistungsumsatz = zusätzliche Energie für Aktivitäten (rennen, Sport, Gehirnaktivität …).", es: "Gasto por actividad = energía adicional para actividades (correr, deporte, actividad cerebral…)." } },
  { id: "u3", topic: "umsatz", type: "mc", q: { de: "Gesamtumsatz = …", es: "Gasto total = …" },
    options: [{ de: "Grundumsatz + Leistungsumsatz", es: "metabolismo basal + gasto por actividad" }, { de: "Grundumsatz − Leistungsumsatz", es: "metabolismo basal − gasto por actividad" }, { de: "Grundumsatz × 24", es: "metabolismo basal × 24" }, { de: "Leistungsumsatz × 4,2", es: "gasto por actividad × 4,2" }], answer: 0 },
  { id: "u4", topic: "umsatz", type: "multi", q: { de: "Wofür braucht der Körper den Grundumsatz?", es: "¿Para qué necesita el cuerpo el metabolismo basal?" },
    options: [{ de: "Herzschlag", es: "Latido del corazón" }, { de: "Atmung (Lunge)", es: "Respiración (pulmones)" }, { de: "Fußball spielen", es: "Jugar al fútbol" }, { de: "Körpertemperatur halten", es: "Mantener la temperatura corporal" }, { de: "Treppen steigen", es: "Subir escaleras" }], answer: [0, 1, 3],
    explain: { de: "Fußball und Treppensteigen sind Tätigkeiten – sie gehören zum Leistungsumsatz.", es: "El fútbol y subir escaleras son actividades: pertenecen al gasto por actividad." } },
  { id: "u5", topic: "umsatz", type: "tf", q: { de: "Auch im Schlaf verbraucht der Körper Energie.", es: "El cuerpo también gasta energía mientras duerme." }, answer: true,
    explain: { de: "Richtig – Herz, Lunge, Gehirn und Körpertemperatur brauchen immer Energie (Grundumsatz).", es: "Verdadero: el corazón, los pulmones, el cerebro y la temperatura corporal siempre necesitan energía (metabolismo basal)." } },
  { id: "u6", topic: "umsatz", type: "mc", q: { de: "Wie berechnet man den Grundumsatz eines Mannes (in kcal)?", es: "¿Cómo se calcula el metabolismo basal de un hombre (en kcal)?" },
    options: [{ de: "Körpergewicht in kg × 24", es: "peso en kg × 24" }, { de: "Körpergröße in cm × 24", es: "estatura en cm × 24" }, { de: "Alter × 24", es: "edad × 24" }, { de: "Körpergewicht in kg × 7", es: "peso en kg × 7" }], answer: 0 },
  { id: "u7", topic: "umsatz", type: "mc", q: { de: "Wie berechnet man den Grundumsatz einer Frau (in kcal)?", es: "¿Cómo se calcula el metabolismo basal de una mujer (en kcal)?" },
    options: [{ de: "Körpergewicht in kg × 24 × 0,9", es: "peso en kg × 24 × 0,9" }, { de: "Körpergewicht in kg × 24 × 1,9", es: "peso en kg × 24 × 1,9" }, { de: "Körpergewicht in kg × 0,9", es: "peso en kg × 0,9" }, { de: "Körpergröße × 24 × 0,9", es: "estatura × 24 × 0,9" }], answer: 0 },
  { id: "u8", topic: "umsatz", type: "mc", q: { de: "Warum sinkt der Grundumsatz im Alter?", es: "¿Por qué baja el metabolismo basal con la edad?" },
    options: [{ de: "Die Stoffwechselvorgänge verlangsamen sich", es: "Los procesos del metabolismo se hacen más lentos" }, { de: "Man wird größer", es: "Uno se hace más alto" }, { de: "Man isst mehr", es: "Uno come más" }, { de: "Das Herz schlägt schneller", es: "El corazón late más rápido" }], answer: 0 },
  { id: "u9", topic: "umsatz", type: "cloze", q: { de: "Ergänze die Definition des Grundumsatzes.", es: "Completa la definición del metabolismo basal." },
    text: { de: "Der {Grundumsatz} ist die Energie, die der Körper bei völliger {Ruhe} benötigt, um seine {Funktionen} aufrechtzuerhalten.", es: "El metabolismo basal es la energía que el cuerpo necesita en reposo total para mantener sus funciones." }, distractors: ["Leistungsumsatz", "Bewegung", "Muskeln"] },
  { id: "u10", topic: "umsatz", type: "cloze", q: { de: "Ergänze die Definition des Leistungsumsatzes.", es: "Completa la definición del gasto por actividad." },
    text: { de: "Der {Leistungsumsatz} ist die Energiemenge, die der Körper {zusätzlich} zum Grundumsatz benötigt, um {Tätigkeiten} auszuführen.", es: "El gasto por actividad es la cantidad de energía que el cuerpo necesita además del metabolismo basal para hacer actividades." }, distractors: ["Grundumsatz", "weniger als", "Organe"] },
  { id: "u11", topic: "umsatz", type: "mc", q: { de: "Wer hat den höchsten Leistungsumsatz?", es: "¿Quién tiene el gasto por actividad más alto?" },
    options: [{ de: "Ein Landwirt, der den ganzen Tag schwer arbeitet", es: "Un agricultor que trabaja duro todo el día" }, { de: "Eine Person, die im Büro sitzt", es: "Una persona que trabaja sentada en una oficina" }, { de: "Eine Person, die den ganzen Tag liegt", es: "Una persona que está tumbada todo el día" }, { de: "Ein schlafendes Baby", es: "Un bebé dormido" }], answer: 0,
    explain: { de: "Landwirte haben einen PAL-Wert von 2,0 – 2,4: schwere körperliche Arbeit.", es: "Los agricultores tienen un valor PAL de 2,0 – 2,4: trabajo físico duro." } },
  { id: "u12", topic: "umsatz", type: "mc", q: { de: "Herbert (27 Jahre, 80 kg, 1,87 m) und Adam (49 Jahre, 80 kg, 1,87 m). Wer hat nach der Formel den höheren Grundumsatz?", es: "Herbert (27 años, 80 kg, 1,87 m) y Adam (49 años, 80 kg, 1,87 m). ¿Quién tiene, según la fórmula, el metabolismo basal más alto?" },
    options: [{ de: "Beide gleich: 80 × 24 = 1920 kcal", es: "Los dos igual: 80 × 24 = 1920 kcal" }, { de: "Herbert, weil er jünger ist", es: "Herbert, porque es más joven" }, { de: "Adam, weil er älter ist", es: "Adam, porque es mayor" }, { de: "Man kann es nicht berechnen", es: "No se puede calcular" }], answer: 0,
    explain: { de: "In der Formel zählt nur das Körpergewicht. Alter und Größe sind hier Ablenkung.", es: "En la fórmula solo cuenta el peso. La edad y la estatura son aquí una distracción." } },
  { id: "u13", topic: "umsatz", type: "mc", q: { de: "Für das Examen lernen (Gehirnaktivität) gehört zum …", es: "Estudiar para el examen (actividad cerebral) forma parte del…" },
    options: [{ de: "Leistungsumsatz", es: "gasto por actividad" }, { de: "Grundumsatz", es: "metabolismo basal" }], answer: 0 },
  { id: "u14", topic: "umsatz", type: "tf", q: { de: "Bei gleichem Körpergewicht haben Männer mehr Muskeln und darum einen höheren Grundumsatz.", es: "Con el mismo peso, los hombres tienen más músculo y por eso un metabolismo basal más alto." }, answer: true },
  { id: "u15", topic: "umsatz", type: "tf", q: { de: "Für den Grundumsatz brauchst du die Körpergröße.", es: "Para el metabolismo basal necesitas la estatura." }, answer: false,
    explain: { de: "Falsch. Man rechnet nur mit dem Körpergewicht: kg × 24 (Frauen × 0,9).", es: "Falso. Solo se calcula con el peso: kg × 24 (mujeres × 0,9)." } },
  { id: "u16", topic: "umsatz", type: "mc", q: { de: "Welches Organ braucht laut Grafik am wenigsten vom Grundumsatz?", es: "Según el gráfico, ¿qué órgano necesita menos parte del metabolismo basal?" },
    options: [{ de: "Nieren (ca. 7 %)", es: "Riñones (aprox. 7 %)" }, { de: "Leber (ca. 27 %)", es: "Hígado (aprox. 27 %)" }, { de: "Gehirn (ca. 19 %)", es: "Cerebro (aprox. 19 %)" }, { de: "Skelettmuskulatur (ca. 25 %)", es: "Musculatura esquelética (aprox. 25 %)" }], answer: 0 },
  { id: "u17", topic: "umsatz", type: "mc", q: { de: "Welche beiden brauchen zusammen etwa die Hälfte des Grundumsatzes?", es: "¿Qué dos necesitan juntos aproximadamente la mitad del metabolismo basal?" },
    options: [{ de: "Leber und Skelettmuskulatur", es: "Hígado y musculatura esquelética" }, { de: "Herz und Nieren", es: "Corazón y riñones" }, { de: "Gehirn und Herz", es: "Cerebro y corazón" }, { de: "Nieren und übrige Organe", es: "Riñones y otros órganos" }], answer: 0 },
  { id: "u18", topic: "umsatz", type: "mc", q: { de: "Was gibt der PAL-Wert an?", es: "¿Qué indica el valor PAL?" },
    options: [{ de: "Mit welcher Zahl man den Grundumsatz multipliziert, um den Gesamtumsatz zu bekommen", es: "Por qué número se multiplica el metabolismo basal para obtener el gasto total" }, { de: "Wie viel man wiegt", es: "Cuánto se pesa" }, { de: "Wie viel Fett ein Lebensmittel hat", es: "Cuánta grasa tiene un alimento" }, { de: "Wie viele Stunden man schläft", es: "Cuántas horas se duerme" }], answer: 0 },
  { id: "u19", topic: "umsatz", type: "mc", q: { de: "Welchen PAL-Wert hat Schlafen?", es: "¿Qué valor PAL tiene dormir?" },
    options: ["0,95", "1,5", "2,0", "3,0"], answer: 0 },
  { id: "u20", topic: "umsatz", type: "mc", q: { de: "Wie berechnet man den durchschnittlichen PAL-Wert eines Tages?", es: "¿Cómo se calcula el valor PAL medio de un día?" },
    options: [{ de: "Stunden × PAL für jede Tätigkeit addieren, dann : 24", es: "Sumar horas × PAL de cada actividad y dividir entre 24" }, { de: "Alle PAL-Werte addieren", es: "Sumar todos los valores PAL" }, { de: "Grundumsatz : 24", es: "Metabolismo basal : 24" }, { de: "Körpergewicht × 24", es: "Peso × 24" }], answer: 0 },
  { id: "u21", topic: "umsatz", type: "mc", q: { de: "Grundumsatz 1600 kcal, durchschnittlicher PAL 1,55. Wie groß ist der Gesamtenergiebedarf?", es: "Metabolismo basal 1600 kcal, PAL medio 1,55. ¿Cuál es la necesidad energética total?" },
    options: ["2480 kcal", "1601,55 kcal", "1032 kcal", "3100 kcal"], answer: 0,
    explain: { de: "1600 kcal × 1,55 = 2480 kcal.", es: "1600 kcal × 1,55 = 2480 kcal." } },

  // VITAMINE
  { id: "v1", topic: "vitamine", type: "mc", q: { de: "Welche Aussage beschreibt Vitamine richtig?", es: "¿Qué frase describe correctamente las vitaminas?" },
    options: [{ de: "Lebensnotwendige Nährstoffe, die wir in kleinen Mengen über die Nahrung aufnehmen", es: "Nutrientes esenciales que tomamos en pequeñas cantidades con la comida" }, { de: "Anorganische Stoffe wie Calcium und Eisen", es: "Sustancias inorgánicas como el calcio y el hierro" }, { de: "Die wichtigsten Energielieferanten", es: "Las principales fuentes de energía" }, { de: "Stoffe, die der Körper in großen Mengen braucht", es: "Sustancias que el cuerpo necesita en grandes cantidades" }], answer: 0 },
  { id: "v2", topic: "vitamine", type: "tf", q: { de: "Vitamine liefern dem Körper Energie.", es: "Las vitaminas aportan energía al cuerpo." }, answer: false,
    explain: { de: "Falsch. Vitamine sind wichtige Nährstoffe, liefern aber keine Energie.", es: "Falso. Las vitaminas son nutrientes importantes, pero no aportan energía." } },
  { id: "v3", topic: "vitamine", type: "mc", q: { de: "Was kann passieren, wenn man zu wenig Vitamine aufnimmt?", es: "¿Qué puede pasar si se toman pocas vitaminas?" },
    options: [{ de: "Mangelerscheinungen, z. B. schlechte Haut oder Zahnausfall", es: "Síntomas de carencia, p. ej. mala piel o caída de dientes" }, { de: "Man bekommt Übergewicht", es: "Se engorda" }, { de: "Nichts, der Körper stellt alle selbst her", es: "Nada, el cuerpo las fabrica todas" }, { de: "Man bekommt mehr Energie", es: "Se tiene más energía" }], answer: 0 },
  { id: "v4", topic: "vitamine", type: "mc", q: { de: "Wie viele Vitamingruppen gibt es?", es: "¿Cuántos grupos de vitaminas hay?" },
    options: [{ de: "sechs (A, B, C, D, E, K)", es: "seis (A, B, C, D, E, K)" }, { de: "zwei", es: "dos" }, { de: "zehn", es: "diez" }, { de: "26 (A bis Z)", es: "26 (de la A a la Z)" }], answer: 0 },
  { id: "v5", topic: "vitamine", type: "cloze", q: { de: "Ergänze die Definition der Vitamine.", es: "Completa la definición de vitaminas." },
    text: { de: "Vitamine sind {lebensnotwendige} Nährstoffe. Wir nehmen sie über die {Nahrung} auf. Der Körper braucht sie nur in {kleinen} Mengen. Fehlen sie, kommt es zu {Mangelerscheinungen}.", es: "Las vitaminas son nutrientes esenciales. Las tomamos con la comida. El cuerpo las necesita solo en pequeñas cantidades. Si faltan, aparecen síntomas de carencia." }, distractors: ["unwichtige", "großen", "Luft", "Übergewicht"] },
  { id: "v6", topic: "vitamine", type: "mc", q: { de: "Wie kann der Körper Vitamin D außer über die Nahrung noch bekommen?", es: "¿Cómo puede obtener el cuerpo la vitamina D además de con la comida?" },
    options: [{ de: "Über die Haut durch Sonneneinstrahlung", es: "A través de la piel con la radiación solar" }, { de: "Über den Geruchssinn", es: "Por el olfato" }, { de: "Über die Haare", es: "Por el pelo" }, { de: "Gar nicht", es: "De ninguna manera" }], answer: 0 },
  { id: "v7", topic: "vitamine", type: "mc", q: { de: "Vitamin K wird im … gebildet.", es: "La vitamina K se produce en el…" },
    options: [{ de: "Darm", es: "intestino" }, { de: "Magen", es: "estómago" }, { de: "Gehirn", es: "cerebro" }, { de: "Herz", es: "corazón" }], answer: 0 },
  { id: "v8", topic: "vitamine", type: "mc", q: { de: "Mit Hilfe von Vitamin C bekämpft der Körper …", es: "Con ayuda de la vitamina C, el cuerpo combate…" },
    options: [{ de: "Krankheitserreger", es: "agentes patógenos" }, { de: "Bluthochdruck", es: "la presión alta" }, { de: "Muskelkater", es: "las agujetas" }, { de: "Übergewicht", es: "el sobrepeso" }], answer: 0 },
  { id: "v9", topic: "vitamine", type: "mc", q: { de: "Vitamin A ist wichtig für …", es: "La vitamina A es importante para…" },
    options: [{ de: "die Haut und die Sehkraft", es: "la piel y la vista" }, { de: "die Blutgerinnung", es: "la coagulación" }, { de: "die Verdauung im Darm", es: "la digestión en el intestino" }, { de: "die Körpertemperatur", es: "la temperatura corporal" }], answer: 0 },
  { id: "v10", topic: "vitamine", type: "mc", q: { de: "B-Vitamine sind wichtig für …", es: "Las vitaminas B son importantes para…" },
    options: [{ de: "die Zellerneuerung und die Nährstoffverwertung", es: "la renovación celular y el aprovechamiento de nutrientes" }, { de: "die Sehkraft", es: "la vista" }, { de: "die Blutgerinnung", es: "la coagulación" }, { de: "den Aufbau der Zähne", es: "la formación de los dientes" }], answer: 0 },
  { id: "v11", topic: "vitamine", type: "mc", q: { de: "Vitamin D ist wichtig für …", es: "La vitamina D es importante para…" },
    options: [{ de: "den Aufbau von Knochen und Zähnen", es: "la formación de huesos y dientes" }, { de: "die Sehkraft", es: "la vista" }, { de: "die Nährstoffverwertung", es: "el aprovechamiento de nutrientes" }, { de: "die Blutgerinnung", es: "la coagulación" }], answer: 0 },
  { id: "v12", topic: "vitamine", type: "mc", q: { de: "E-Vitamine stärken …", es: "Las vitaminas E fortalecen…" },
    options: [{ de: "die Muskeln und den Blutkreislauf", es: "los músculos y la circulación" }, { de: "die Haare", es: "el pelo" }, { de: "nur die Zähne", es: "solo los dientes" }, { de: "die Sehkraft", es: "la vista" }], answer: 0 },
  { id: "v13", topic: "vitamine", type: "mc", q: { de: "Vitamin K ist zuständig für …", es: "La vitamina K se encarga de…" },
    options: [{ de: "die Blutgerinnung und den Knochenaufbau", es: "la coagulación y la formación de huesos" }, { de: "die Sehkraft", es: "la vista" }, { de: "die Zellerneuerung", es: "la renovación celular" }, { de: "die Bekämpfung von Krankheitserregern", es: "combatir los agentes patógenos" }], answer: 0 },
  { id: "v14", topic: "vitamine", type: "mc", q: { de: "Welches Vitamin steckt besonders in Möhren?", es: "¿Qué vitamina hay especialmente en las zanahorias?" },
    options: ["Vitamin A", "Vitamin K", "Vitamin D", "Vitamin B"], answer: 0 },
  { id: "v15", topic: "vitamine", type: "mc", q: { de: "Algen und grünes Gemüse enthalten viel …", es: "Las algas y la verdura verde contienen mucha…" },
    options: ["Vitamin K", "Vitamin A", "Vitamin C", "Vitamin D"], answer: 0 },
  { id: "v16", topic: "vitamine", type: "mc", q: { de: "In Fisch, Pilzen, Eiern und Avocados steckt …", es: "En el pescado, las setas, los huevos y los aguacates hay…" },
    options: ["Vitamin D", "Vitamin K", "Vitamin C", "Vitamin B"], answer: 0 },
  { id: "v17", topic: "vitamine", type: "tf", q: { de: "Fisch und Fleisch enthalten keine Vitamine.", es: "El pescado y la carne no contienen vitaminas." }, answer: false,
    explain: { de: "Falsch. Fleisch und Fisch enthalten z. B. B-Vitamine; Fisch auch Vitamin D.", es: "Falso. La carne y el pescado contienen p. ej. vitaminas B; el pescado también vitamina D." } },
  { id: "v18", topic: "vitamine", type: "tf", q: { de: "Wer zu wenig Vitamine isst, bekommt Übergewicht.", es: "Quien come pocas vitaminas engorda." }, answer: false,
    explain: { de: "Falsch. Zu wenig Vitamine führen zu Mangelerscheinungen.", es: "Falso. Pocas vitaminas causan síntomas de carencia." } },
  { id: "v19", topic: "vitamine", type: "tf", q: { de: "Manche Vitamine kann der Körper selbst bilden.", es: "Algunas vitaminas el cuerpo las puede producir." }, answer: true,
    explain: { de: "Richtig: Vitamin D (Haut + Sonne) und Vitamin K (Darm).", es: "Verdadero: vitamina D (piel + sol) y vitamina K (intestino)." } },
  { id: "v20", topic: "vitamine", type: "tf", q: { de: "Vitamin A ist besonders wichtig für die Blutgerinnung.", es: "La vitamina A es especialmente importante para la coagulación." }, answer: false,
    explain: { de: "Falsch. Für die Blutgerinnung ist Vitamin K zuständig. Vitamin A ist für Haut und Sehkraft.", es: "Falso. De la coagulación se encarga la vitamina K. La A es para la piel y la vista." } },
  { id: "v21", topic: "vitamine", type: "tf", q: { de: "In Obst und Gemüse sind besonders viele Vitamine enthalten.", es: "La fruta y la verdura contienen muchas vitaminas." }, answer: true },
  { id: "v22", topic: "vitamine", type: "mc", q: { de: "Was bedeutet „Blutgerinnung“?", es: "¿Qué significa «Blutgerinnung»?" },
    options: [{ de: "Blut wird fest und verschließt eine Wunde", es: "La sangre se vuelve sólida y cierra una herida" }, { de: "Blut fließt durch den Körper", es: "La sangre circula por el cuerpo" }, { de: "Neue Blutzellen entstehen", es: "Se forman nuevas células de la sangre" }, { de: "Man verliert Blut", es: "Se pierde sangre" }], answer: 0 },
  { id: "v23", topic: "vitamine", type: "mc", q: { de: "Was ist ein „Krankheitserreger“?", es: "¿Qué es un «Krankheitserreger»?" },
    options: [{ de: "Etwas, das eine Krankheit verursacht, z. B. ein Virus", es: "Algo que causa una enfermedad, p. ej. un virus" }, { de: "Ein Medikament", es: "Un medicamento" }, { de: "Ein Arzt", es: "Un médico" }, { de: "Ein Vitamin", es: "Una vitamina" }], answer: 0 },
  { id: "v24", topic: "vitamine", type: "mc", q: { de: "Was bedeutet „Zellerneuerung“?", es: "¿Qué significa «Zellerneuerung»?" },
    options: [{ de: "Bildung neuer Zellen im Körper", es: "Formación de nuevas células en el cuerpo" }, { de: "Bewegung des Blutes", es: "Movimiento de la sangre" }, { de: "Verlust von Zähnen", es: "Pérdida de dientes" }, { de: "Fähigkeit, gut zu sehen", es: "Capacidad de ver bien" }], answer: 0 },
  { id: "v25", topic: "vitamine", type: "mc", q: { de: "Was ist eine „Mangelerscheinung“?", es: "¿Qué es una «Mangelerscheinung»?" },
    options: [{ de: "Ein gesundheitliches Problem, weil dem Körper etwas fehlt", es: "Un problema de salud porque al cuerpo le falta algo" }, { de: "Zu viel Energie", es: "Demasiada energía" }, { de: "Eine Allergie", es: "Una alergia" }, { de: "Ein Vitamin", es: "Una vitamina" }], answer: 0 },
  { id: "v26", topic: "vitamine", type: "mc", q: { de: "Was bedeutet „Nährstoffverwertung“?", es: "¿Qué significa «Nährstoffverwertung»?" },
    options: [{ de: "Der Körper verwendet die Nährstoffe aus der Nahrung", es: "El cuerpo usa los nutrientes de la comida" }, { de: "Man wirft Essen weg", es: "Se tira comida" }, { de: "Man kauft Lebensmittel", es: "Se compran alimentos" }, { de: "Die Haut bildet Vitamin D", es: "La piel produce vitamina D" }], answer: 0 },
  { id: "v27", topic: "vitamine", type: "mc", q: { de: "Was ist der „Blutkreislauf“?", es: "¿Qué es el «Blutkreislauf»?" },
    options: [{ de: "Die Bewegung des Blutes durch den Körper", es: "El movimiento de la sangre por el cuerpo" }, { de: "Das Verschließen einer Wunde", es: "El cierre de una herida" }, { de: "Ein Organ im Bauch", es: "Un órgano del abdomen" }, { de: "Eine Vitamingruppe", es: "Un grupo de vitaminas" }], answer: 0 },
  { id: "v28", topic: "vitamine", type: "mc", extra: true, q: { de: "Welche Vitamine sind fettlöslich? (Merkwort EDEKA)", es: "¿Qué vitaminas son liposolubles? (palabra clave EDEKA)" },
    options: ["E, D, K, A", { de: "B und C", es: "B y C" }, "C, D, E", { de: "alle Vitamine", es: "todas las vitaminas" }], answer: 0 },
  { id: "v29", topic: "vitamine", type: "mc", q: { de: "Was unterscheidet Vitamine von Mineralsalzen?", es: "¿Qué diferencia hay entre vitaminas y sales minerales?" },
    options: [{ de: "Vitamine sind organisch, Mineralsalze anorganisch", es: "Las vitaminas son orgánicas y las sales minerales inorgánicas" }, { de: "Vitamine liefern Energie, Mineralsalze nicht", es: "Las vitaminas dan energía y las sales minerales no" }, { de: "Mineralsalze sind organisch, Vitamine anorganisch", es: "Las sales minerales son orgánicas y las vitaminas inorgánicas" }, { de: "Es gibt keinen Unterschied", es: "No hay diferencia" }], answer: 0 },

  // NÄHRSTOFFE
  { id: "n1", topic: "naehrstoffe", type: "mc", q: { de: "Welcher Nährstoff ist der Hauptenergielieferant für Muskeln und Nervensystem?", es: "¿Qué nutriente es la principal fuente de energía para los músculos y el sistema nervioso?" },
    options: [{ de: "Kohlenhydrate", es: "Carbohidratos" }, { de: "Proteine", es: "Proteínas" }, { de: "Vitamine", es: "Vitaminas" }, { de: "Mineralsalze", es: "Sales minerales" }], answer: 0 },
  { id: "n2", topic: "naehrstoffe", type: "mc", q: { de: "Welcher Nährstoff ist Baustoff und wichtig für das Wachstum (Haare, Haut, Muskeln)?", es: "¿Qué nutriente es material de construcción e importante para el crecimiento (pelo, piel, músculos)?" },
    options: [{ de: "Proteine (Eiweiße)", es: "Proteínas" }, { de: "Fette", es: "Grasas" }, { de: "Kohlenhydrate", es: "Carbohidratos" }, { de: "Wasser", es: "Agua" }], answer: 0 },
  { id: "n3", topic: "naehrstoffe", type: "mc", q: { de: "Welcher Nährstoff liefert pro Gramm am meisten Energie?", es: "¿Qué nutriente aporta más energía por gramo?" },
    options: [{ de: "Fett (37 kJ/g)", es: "Grasa (37 kJ/g)" }, { de: "Kohlenhydrate (17 kJ/g)", es: "Carbohidratos (17 kJ/g)" }, { de: "Eiweiß (17 kJ/g)", es: "Proteína (17 kJ/g)" }, { de: "Vitamine", es: "Vitaminas" }], answer: 0 },
  { id: "n4", topic: "naehrstoffe", type: "multi", q: { de: "Welche Aufgaben haben Fette?", es: "¿Qué funciones tienen las grasas?" },
    options: [{ de: "Energielieferant und -speicher", es: "Fuente y reserva de energía" }, { de: "Isolator gegen Kälte", es: "Aislante contra el frío" }, { de: "Schutzpolster für innere Organe", es: "Acolchado de órganos internos" }, { de: "Bekämpfung von Krankheitserregern", es: "Combatir agentes patógenos" }, { de: "Baustoff für Zellmembranen und Hormone", es: "Material de membranas celulares y hormonas" }], answer: [0, 1, 2, 4],
    explain: { de: "Krankheitserreger bekämpft z. B. Vitamin C – nicht das Fett.", es: "A los agentes patógenos los combate, p. ej., la vitamina C, no la grasa." } },
  { id: "n5", topic: "naehrstoffe", type: "mc", q: { de: "Im Brot sind vor allem … enthalten.", es: "En el pan hay sobre todo…" },
    options: [{ de: "Kohlenhydrate", es: "carbohidratos" }, { de: "Fett", es: "grasa" }, { de: "Eiweiß", es: "proteína" }, { de: "Vitamin K", es: "vitamina K" }], answer: 0 },
  { id: "n6", topic: "naehrstoffe", type: "mc", q: { de: "In der Butter ist vor allem … enthalten.", es: "En la mantequilla hay sobre todo…" },
    options: [{ de: "Fett", es: "grasa" }, { de: "Kohlenhydrate", es: "carbohidratos" }, { de: "Eiweiß", es: "proteína" }, { de: "Calcium", es: "calcio" }], answer: 0 },
  { id: "n7", topic: "naehrstoffe", type: "mc", q: { de: "Im Soja ist viel … enthalten.", es: "En la soja hay mucha…" },
    options: [{ de: "Eiweiß", es: "proteína" }, { de: "Zucker", es: "azúcar" }, { de: "Fett", es: "grasa" }, { de: "Vitamin C", es: "vitamina C" }], answer: 0 },
  { id: "n8", topic: "naehrstoffe", type: "mc", q: { de: "Woraus bestehen Proteine?", es: "¿De qué están formadas las proteínas?" },
    options: [{ de: "Aus einer Kette von Aminosäuren", es: "De una cadena de aminoácidos" }, { de: "Aus Glycerin und drei Fettsäuren", es: "De glicerina y tres ácidos grasos" }, { de: "Aus vielen Glucosemolekülen", es: "De muchas moléculas de glucosa" }, { de: "Aus Mineralsalzen", es: "De sales minerales" }], answer: 0 },
  { id: "n9", topic: "naehrstoffe", type: "mc", q: { de: "Woraus besteht ein Fettmolekül?", es: "¿De qué está formada una molécula de grasa?" },
    options: [{ de: "Aus Glycerin und drei Fettsäuren", es: "De glicerina y tres ácidos grasos" }, { de: "Aus einer Kette von Aminosäuren", es: "De una cadena de aminoácidos" }, { de: "Aus einem Glucosemolekül", es: "De una molécula de glucosa" }, { de: "Aus Wasser und Salz", es: "De agua y sal" }], answer: 0 },
  { id: "n10", topic: "naehrstoffe", type: "mc", q: { de: "Stärke (Polysaccharid) besteht aus …", es: "El almidón (polisacárido) está formado por…" },
    options: [{ de: "vielen Glucosemolekülen", es: "muchas moléculas de glucosa" }, { de: "Fettsäuren", es: "ácidos grasos" }, { de: "Aminosäuren", es: "aminoácidos" }, { de: "Vitaminen", es: "vitaminas" }], answer: 0 },
  { id: "n11", topic: "naehrstoffe", type: "tf", q: { de: "Proteine nutzt der Körper vor allem als Energiequelle.", es: "El cuerpo usa las proteínas sobre todo como fuente de energía." }, answer: false,
    explain: { de: "Falsch. Proteine sind vor allem Baustoffe – wichtig für das Wachstum.", es: "Falso. Las proteínas son sobre todo material de construcción, importante para crecer." } },
  { id: "n12", topic: "naehrstoffe", type: "mc", q: { de: "Was macht der Körper mit überschüssigem Zucker?", es: "¿Qué hace el cuerpo con el azúcar sobrante?" },
    options: [{ de: "Er speichert ihn in Leber und Muskeln; bei sehr viel macht er Fett daraus", es: "Lo almacena en el hígado y los músculos; si es mucho, lo convierte en grasa" }, { de: "Er scheidet ihn sofort aus", es: "Lo expulsa enseguida" }, { de: "Er macht Vitamine daraus", es: "Lo convierte en vitaminas" }, { de: "Er baut daraus Knochen", es: "Construye huesos con él" }], answer: 0 },
  { id: "n13", topic: "naehrstoffe", type: "mc", q: { de: "Warum heißen manche Fettsäuren „essenziell“?", es: "¿Por qué algunos ácidos grasos se llaman «esenciales»?" },
    options: [{ de: "Der Mensch kann sie nicht selbst herstellen und muss sie essen", es: "El ser humano no puede fabricarlos y tiene que comerlos" }, { de: "Sie sind besonders lecker", es: "Son especialmente ricos" }, { de: "Sie liefern keine Energie", es: "No aportan energía" }, { de: "Sie kommen nur in Fleisch vor", es: "Solo están en la carne" }], answer: 0 },
  { id: "n14", topic: "naehrstoffe", type: "tf", q: { de: "Butter, Käse, Nüsse und Avocados enthalten viel Fett.", es: "La mantequilla, el queso, los frutos secos y los aguacates contienen mucha grasa." }, answer: true },
  { id: "n15", topic: "naehrstoffe", type: "mc", q: { de: "Welcher Vergleich passt zu den Fetten?", es: "¿Qué comparación encaja con las grasas?" },
    options: [{ de: "Reservetank", es: "Depósito de reserva" }, { de: "Ziegelsteine", es: "Ladrillos" }, { de: "Benzin für sofort", es: "Gasolina para ya" }, { de: "Bauplan", es: "Plano de construcción" }], answer: 0,
    explain: { de: "Fett = Reservetank (Energiespeicher), Proteine = Ziegelsteine (Baustoff), Kohlenhydrate = Benzin (Hauptenergielieferant).", es: "Grasa = depósito de reserva, proteínas = ladrillos, carbohidratos = gasolina." } },
  { id: "n16", topic: "naehrstoffe", type: "cloze", q: { de: "Ergänze.", es: "Completa." },
    text: { de: "Kohlenhydrate sind der {Hauptenergielieferant}, Proteine sind vor allem {Baustoffe} und Fette sind {Energiespeicher}.", es: "Los carbohidratos son la principal fuente de energía, las proteínas sobre todo material de construcción y las grasas reserva de energía." }, distractors: ["Vitamine", "Ionen"] },
  { id: "n17", topic: "naehrstoffe", type: "mc", q: { de: "Wie viel Energie liefert 1 g Fett?", es: "¿Cuánta energía aporta 1 g de grasa?" },
    options: [{ de: "37 kJ ≈ 9 kcal", es: "37 kJ ≈ 9 kcal" }, { de: "17 kJ ≈ 4 kcal", es: "17 kJ ≈ 4 kcal" }, { de: "29 kJ ≈ 7 kcal", es: "29 kJ ≈ 7 kcal" }, { de: "100 kJ", es: "100 kJ" }], answer: 0 },
  { id: "n18", topic: "naehrstoffe", type: "mc", q: { de: "Wie viel Energie liefert 1 g Alkohol?", es: "¿Cuánta energía aporta 1 g de alcohol?" },
    options: [{ de: "29 kJ ≈ 7 kcal", es: "29 kJ ≈ 7 kcal" }, { de: "0 kJ", es: "0 kJ" }, { de: "17 kJ ≈ 4 kcal", es: "17 kJ ≈ 4 kcal" }, { de: "37 kJ ≈ 9 kcal", es: "37 kJ ≈ 9 kcal" }], answer: 0 },
  { id: "n19", topic: "naehrstoffe", type: "mc", q: { de: "Wo findet man Proteine im Körper?", es: "¿Dónde hay proteínas en el cuerpo?" },
    options: [{ de: "In allen Zellen", es: "En todas las células" }, { de: "Nur im Blut", es: "Solo en la sangre" }, { de: "Nur in den Knochen", es: "Solo en los huesos" }, { de: "Nirgends", es: "En ninguna parte" }], answer: 0 },
  { id: "n20", topic: "naehrstoffe", type: "mc", extra: true, q: { de: "Wozu dienen Ballaststoffe?", es: "¿Para qué sirve la fibra?" },
    options: [{ de: "Sie fördern die Verdauung und machen satt", es: "Favorece la digestión y sacia" }, { de: "Sie sind der Hauptenergielieferant", es: "Es la fuente principal de energía" }, { de: "Sie bauen Muskeln auf", es: "Construye músculo" }, { de: "Sie sind Vitamine", es: "Son vitaminas" }], answer: 0 },

  // MINERALSALZE
  { id: "m1", topic: "mineral", type: "mc", q: { de: "Was sind Mineralsalze?", es: "¿Qué son las sales minerales?" },
    options: [{ de: "Anorganische Nährstoffe, die als in Wasser gelöste Ionen aufgenommen werden", es: "Nutrientes inorgánicos que se toman como iones disueltos en agua" }, { de: "Organische Energielieferanten", es: "Fuentes orgánicas de energía" }, { de: "Eine Art Vitamine", es: "Un tipo de vitaminas" }, { de: "Fette aus dem Meer", es: "Grasas del mar" }], answer: 0 },
  { id: "m2", topic: "mineral", type: "multi", q: { de: "Welche sind Makroelemente (Mengenelemente)?", es: "¿Cuáles son macroelementos?" },
    options: [{ de: "Calcium", es: "Calcio" }, { de: "Eisen", es: "Hierro" }, { de: "Kalium", es: "Potasio" }, { de: "Iod", es: "Yodo" }, { de: "Magnesium", es: "Magnesio" }, { de: "Natrium", es: "Sodio" }], answer: [0, 2, 4, 5],
    explain: { de: "Makro: Calcium, Magnesium, Phosphor, Natrium, Kalium. Eisen und Iod sind Mikroelemente.", es: "Macro: calcio, magnesio, fósforo, sodio, potasio. El hierro y el yodo son microelementos." } },
  { id: "m3", topic: "mineral", type: "multi", q: { de: "Welche sind Mikroelemente (Spurenelemente)?", es: "¿Cuáles son microelementos (oligoelementos)?" },
    options: [{ de: "Eisen", es: "Hierro" }, { de: "Iod", es: "Yodo" }, { de: "Calcium", es: "Calcio" }, { de: "Fluor", es: "Flúor" }, { de: "Phosphor", es: "Fósforo" }, { de: "Kalium", es: "Potasio" }], answer: [0, 1, 3],
    explain: { de: "Mikro: Eisen, Iod, Fluor. Calcium, Phosphor und Kalium sind Makroelemente.", es: "Micro: hierro, yodo, flúor. El calcio, el fósforo y el potasio son macroelementos." } },
  { id: "m4", topic: "mineral", type: "mc", q: { de: "Calcium ist wichtig für …", es: "El calcio es importante para…" },
    options: [{ de: "Muskelkontraktion, Knochen und Zähne", es: "contracción muscular, huesos y dientes" }, { de: "den Sauerstofftransport", es: "el transporte de oxígeno" }, { de: "die Schilddrüse", es: "la tiroides" }, { de: "die Sehkraft", es: "la vista" }], answer: 0 },
  { id: "m5", topic: "mineral", type: "mc", q: { de: "Wo kommt viel Calcium vor?", es: "¿Dónde hay mucho calcio?" },
    options: [{ de: "Milchprodukte, Grünkohl, Sesam", es: "Lácteos, col rizada, sésamo" }, { de: "Zucker", es: "Azúcar" }, { de: "Speiseöl", es: "Aceite" }, { de: "Weißbrot", es: "Pan blanco" }], answer: 0 },
  { id: "m6", topic: "mineral", type: "mc", q: { de: "Welches Makroelement ist wichtig für die Muskelentspannung?", es: "¿Qué macroelemento es importante para la relajación muscular?" },
    options: [{ de: "Magnesium", es: "Magnesio" }, { de: "Calcium", es: "Calcio" }, { de: "Natrium", es: "Sodio" }, { de: "Phosphor", es: "Fósforo" }], answer: 0,
    explain: { de: "Calcium → Muskeln ziehen sich zusammen. Magnesium → Muskeln entspannen sich.", es: "Calcio → los músculos se contraen. Magnesio → los músculos se relajan." } },
  { id: "m7", topic: "mineral", type: "mc", q: { de: "Wo kommt viel Magnesium vor?", es: "¿Dónde hay mucho magnesio?" },
    options: [{ de: "Sesam, Nüsse, Kerne", es: "Sésamo, frutos secos, pipas" }, { de: "Zucker", es: "Azúcar" }, { de: "Butter", es: "Mantequilla" }, { de: "Wasser", es: "Agua" }], answer: 0 },
  { id: "m8", topic: "mineral", type: "mc", q: { de: "Wo kommt viel Kalium vor?", es: "¿Dónde hay mucho potasio?" },
    options: [{ de: "Bananen, Erbsen, Avocado", es: "Plátanos, guisantes, aguacate" }, { de: "Butter", es: "Mantequilla" }, { de: "Zucker", es: "Azúcar" }, { de: "Speiseöl", es: "Aceite" }], answer: 0 },
  { id: "m9", topic: "mineral", type: "mc", q: { de: "Wo kommt viel Natrium vor?", es: "¿Dónde hay mucho sodio?" },
    options: [{ de: "Wurst, Käse, Chips (Salz)", es: "Embutido, queso, patatas fritas (sal)" }, { de: "Äpfel", es: "Manzanas" }, { de: "Wasser", es: "Agua" }, { de: "Zucker", es: "Azúcar" }], answer: 0 },
  { id: "m10", topic: "mineral", type: "mc", q: { de: "Phosphor ist wichtig für …", es: "El fósforo es importante para…" },
    options: [{ de: "die Knochen und die DNA", es: "los huesos y el ADN" }, { de: "die Schilddrüse", es: "la tiroides" }, { de: "das Sehen im Dunkeln", es: "ver en la oscuridad" }, { de: "die Wärmeisolation", es: "el aislamiento térmico" }], answer: 0 },
  { id: "m11", topic: "mineral", type: "mc", q: { de: "Wo kommt viel Phosphor vor?", es: "¿Dónde hay mucho fósforo?" },
    options: [{ de: "Käse, Nüsse", es: "Queso, frutos secos" }, { de: "Zucker", es: "Azúcar" }, { de: "Speiseöl", es: "Aceite" }, { de: "Wasser", es: "Agua" }], answer: 0 },
  { id: "m12", topic: "mineral", type: "mc", q: { de: "Natrium und Kalium sind beide wichtig für …", es: "El sodio y el potasio son importantes para…" },
    options: [{ de: "die Nerven", es: "los nervios" }, { de: "die Sehkraft", es: "la vista" }, { de: "die Blutgerinnung", es: "la coagulación" }, { de: "die Haare", es: "el pelo" }], answer: 0 },
  { id: "m13", topic: "mineral", type: "tf", q: { de: "Mineralsalze liefern Energie.", es: "Las sales minerales aportan energía." }, answer: false,
    explain: { de: "Falsch. Mineralsalze sind lebensnotwendig, liefern aber keine Energie.", es: "Falso. Las sales minerales son esenciales, pero no aportan energía." } },
  { id: "m14", topic: "mineral", type: "mc", q: { de: "Ein anderes Wort für Makroelemente ist …", es: "Otra palabra para macroelementos es…" },
    options: [{ de: "Mengenelemente", es: "Mengenelemente (elementos en cantidad)" }, { de: "Spurenelemente", es: "Spurenelemente (oligoelementos)" }, { de: "Vitamine", es: "vitaminas" }, { de: "Fettsäuren", es: "ácidos grasos" }], answer: 0,
    explain: { de: "Makroelemente = Mengenelemente. Mikroelemente = Spurenelemente.", es: "Macroelementos = Mengenelemente. Microelementos = Spurenelemente." } },
  { id: "m15", topic: "mineral", type: "mc", q: { de: "Welches Element ist KEIN Makroelement?", es: "¿Qué elemento NO es un macroelemento?" },
    options: [{ de: "Eisen", es: "Hierro" }, { de: "Kalium", es: "Potasio" }, { de: "Phosphor", es: "Fósforo" }, { de: "Magnesium", es: "Magnesio" }], answer: 0 },
  { id: "m16", topic: "mineral", type: "tf", q: { de: "Eisen ist ein Makroelement.", es: "El hierro es un macroelemento." }, answer: false,
    explain: { de: "Falsch. Eisen ist ein Mikroelement (Spurenelement).", es: "Falso. El hierro es un microelemento (oligoelemento)." } },
  { id: "m17", topic: "mineral", type: "cloze", q: { de: "Ergänze.", es: "Completa." },
    text: { de: "Mineralsalze sind {anorganische} Nährstoffe. Wir nehmen sie als in Wasser gelöste {Ionen} auf, das sind {geladene} Teilchen.", es: "Las sales minerales son nutrientes inorgánicos. Las tomamos como iones disueltos en agua, que son partículas con carga." }, distractors: ["organische", "Vitamine", "ungeladene"] },
  { id: "m18", topic: "mineral", type: "mc", q: { de: "100 g ≙ 50 mg. Wie viel mg sind in 200 g?", es: "100 g ≙ 50 mg. ¿Cuántos mg hay en 200 g?" },
    options: ["100 mg", "25 mg", "250 mg", "50 mg"], answer: 0,
    explain: { de: "Doppelte Menge → doppelt so viele mg: 50 mg × 2 = 100 mg.", es: "El doble de cantidad → el doble de mg: 50 mg × 2 = 100 mg." } },
  { id: "m19", topic: "mineral", type: "mc", q: { de: "100 g ≙ 50 mg. Wie viel mg sind in 50 g?", es: "100 g ≙ 50 mg. ¿Cuántos mg hay en 50 g?" },
    options: ["25 mg", "100 mg", "50 mg", "5 mg"], answer: 0,
    explain: { de: "Halbe Menge → halb so viele mg: 50 mg : 2 = 25 mg.", es: "La mitad de cantidad → la mitad de mg: 50 mg : 2 = 25 mg." } },
  { id: "m20", topic: "mineral", type: "mc", q: { de: "Jonas nimmt 635 mg Magnesium auf. Sein Tagesbedarf ist 400 mg. Ist der Tagesbedarf gedeckt?", es: "Jonas toma 635 mg de magnesio. Su necesidad diaria es 400 mg. ¿Está cubierta?" },
    options: [{ de: "Ja, 635 mg ist mehr als 400 mg", es: "Sí, 635 mg es más que 400 mg" }, { de: "Nein, es fehlen 235 mg", es: "No, faltan 235 mg" }], answer: 0 },
  { id: "m21", topic: "mineral", type: "num", q: { de: "100 g Banane enthalten 30 mg Magnesium. Jonas isst zwei Bananen zu je 200 g. Wie viel mg Magnesium nimmt er auf?", es: "100 g de plátano contienen 30 mg de magnesio. Jonas come dos plátanos de 200 g cada uno. ¿Cuántos mg de magnesio toma?" }, unit: "mg", answer: 120, tol: 0.5,
    steps: [{ de: "2 × 200 g = 400 g", es: "2 × 200 g = 400 g" }, "100 g ≙ 30 mg | × 4", "400 g ≙ 120 mg"] },
  { id: "m22", topic: "mineral", type: "tf", q: { de: "Natrium ist ein Mikroelement.", es: "El sodio es un microelemento." }, answer: false,
    explain: { de: "Falsch. Natrium ist ein Makroelement (Tagesbedarf 1500 mg).", es: "Falso. El sodio es un macroelemento (necesidad diaria 1500 mg)." } },
  { id: "m23", topic: "mineral", type: "mc", extra: true, q: { de: "Eisen ist wichtig für …", es: "El hierro es importante para…" },
    options: [{ de: "den Sauerstofftransport", es: "el transporte de oxígeno" }, { de: "die Schilddrüse", es: "la tiroides" }, { de: "die Zähne", es: "los dientes" }, { de: "die Muskelentspannung", es: "la relajación muscular" }], answer: 0 },
  { id: "m24", topic: "mineral", type: "mc", extra: true, q: { de: "Iod ist wichtig für …", es: "El yodo es importante para…" },
    options: [{ de: "die Schilddrüse", es: "la tiroides" }, { de: "den Sauerstofftransport", es: "el transporte de oxígeno" }, { de: "die Knochen", es: "los huesos" }, { de: "die Nerven", es: "los nervios" }], answer: 0 }
];

/* ---------------------------------------------------------------------
   MEMORY
   --------------------------------------------------------------------- */
const MEMORY = [
  { id: "mf", topic: "mineral", title: { de: "Makroelement ↔ Funktion", es: "Macroelemento ↔ función" }, pairs: [
    { a: { de: "Calcium", es: "calcio" }, ib: "bone", b: { de: "Muskelkontraktion, Knochen, Zähne", es: "contracción muscular, huesos, dientes" } },
    { a: { de: "Magnesium", es: "magnesio" }, ib: "muscle", b: { de: "Muskelentspannung, Nerven", es: "relajación muscular, nervios" } },
    { a: { de: "Phosphor", es: "fósforo" }, ib: "dna", b: { de: "Knochen, DNA", es: "huesos, ADN" } },
    { a: { de: "Natrium", es: "sodio" }, ib: "brain", b: { de: "Nerven (in Salz)", es: "nervios (en la sal)" } },
    { a: { de: "Kalium", es: "potasio" }, ib: "banana", b: { de: "Nerven (in Bananen)", es: "nervios (en plátanos)" } }
  ]},
  { id: "mv", topic: "mineral", title: { de: "Makroelement ↔ Vorkommen", es: "Macroelemento ↔ dónde está" }, pairs: [
    { a: { de: "Calcium", es: "calcio" }, ib: "milk", b: { de: "Milchprodukte, Grünkohl, Sesam", es: "lácteos, col rizada, sésamo" } },
    { a: { de: "Magnesium", es: "magnesio" }, ib: "seeds", b: { de: "Sesam, Nüsse, Kerne", es: "sésamo, frutos secos, pipas" } },
    { a: { de: "Phosphor", es: "fósforo" }, ib: "cheese", b: { de: "Käse, Nüsse", es: "queso, frutos secos" } },
    { a: { de: "Natrium", es: "sodio" }, ib: "chips", b: { de: "Wurst, Käse, Chips", es: "embutido, queso, patatas fritas" } },
    { a: { de: "Kalium", es: "potasio" }, ib: "peas", b: { de: "Bananen, Erbsen, Avocado", es: "plátanos, guisantes, aguacate" } }
  ]},
  { id: "ef", topic: "energie", title: { de: "Beispiel ↔ Energieform (LearningApps)", es: "Ejemplo ↔ forma de energía" }, pairs: [
    { ia: "battery", a: { de: "Batterie, Benzin", es: "pila, gasolina" }, b: { de: "chemische Energie", es: "energía química" } },
    { ia: "parachute", a: { de: "Fallschirm im freien Fall", es: "paracaídas en caída libre" }, b: { de: "Bewegungsenergie", es: "energía cinética" } },
    { ia: "cat", a: { de: "Katze auf dem Baum", es: "gato en el árbol" }, b: { de: "Lageenergie", es: "energía potencial" } },
    { ia: "candle", a: { de: "brennende Kerze", es: "vela encendida" }, b: { de: "Wärmeenergie", es: "energía térmica" } },
    { ia: "flashlight", a: { de: "Taschenlampe", es: "linterna" }, b: { de: "elektrische Energie", es: "energía eléctrica" } },
    { ia: "sun", a: { de: "Sonne", es: "Sol" }, b: { de: "Strahlungsenergie", es: "energía radiante" } },
    { ia: "guitar", a: { de: "Gitarre", es: "guitarra" }, b: { de: "Schallenergie", es: "energía sonora" } },
    { ia: "atom", a: { de: "Uran", es: "uranio" }, b: { de: "Kernenergie", es: "energía nuclear" } },
    { ia: "spring", a: { de: "gespannte Feder", es: "muelle tensado" }, b: { de: "Spannungsenergie", es: "energía elástica" } }
  ]},
  { id: "eu", topic: "energie", title: { de: "Energiewandler ↔ Umwandlung", es: "Transformador ↔ transformación" }, pairs: [
    { ia: "runner", a: { de: "Mensch", es: "persona" }, b: { de: "chemisch → Bewegung", es: "química → cinética" } },
    { ia: "candle", a: { de: "brennende Kerze", es: "vela encendida" }, b: { de: "chemisch → Licht", es: "química → luz" } },
    { ia: "bulb", a: { de: "Glühlampe", es: "bombilla" }, b: { de: "elektrisch → Strahlung", es: "eléctrica → radiante" } },
    { ia: "dam", a: { de: "Wasser im Stausee", es: "agua del embalse" }, b: { de: "potentiell → Bewegung", es: "potencial → cinética" } },
    { ia: "windmill", a: { de: "Windrad", es: "aerogenerador" }, b: { de: "Bewegung → elektrisch", es: "cinética → eléctrica" } },
    { ia: "solar", a: { de: "Solarzelle", es: "célula solar" }, b: { de: "Licht → elektrisch", es: "luz → eléctrica" } },
    { ia: "plant", a: { de: "Pflanze", es: "planta" }, b: { de: "Licht → chemisch", es: "luz → química" } },
    { ia: "speaker", a: { de: "Lautsprecher", es: "altavoz" }, b: { de: "elektrisch → Schall", es: "eléctrica → sonido" } }
  ]},
  { id: "vv", topic: "vitamine", title: { de: "Vitamine: Vokabeln", es: "Vitaminas: vocabulario" }, pairs: VOCAB.map(v => ({ ia: v.ico, a: v.t, b: v.d })) },
  { id: "vf", topic: "vitamine", title: { de: "Vitamin ↔ Aufgabe", es: "Vitamina ↔ función" }, pairs: VITAMINS.map(v => ({ a: `Vitamin ${v.l}`, ib: v.fnIco[0], b: v.fn })) },
  { id: "vq", topic: "vitamine", title: { de: "Vitamin ↔ Vorkommen", es: "Vitamina ↔ dónde está" }, pairs: VITAMINS.map(v => ({ a: `Vitamin ${v.l}`, ib: v.srcIco[0], b: v.src })) },
  { id: "nf", topic: "naehrstoffe", title: { de: "Nährstoff ↔ Aufgabe", es: "Nutriente ↔ función" }, pairs: [
    { ia: "pump", a: { de: "Kohlenhydrate", es: "carbohidratos" }, b: { de: "Hauptenergielieferant für Muskeln und Nerven", es: "principal fuente de energía para músculos y nervios" } },
    { ia: "tank", a: { de: "Fette", es: "grasas" }, b: { de: "Energiespeicher, Isolator, Schutzpolster", es: "reserva de energía, aislante, acolchado" } },
    { ia: "bricks", a: { de: "Proteine", es: "proteínas" }, b: { de: "Baustoff, Wachstum", es: "material de construcción, crecimiento" } },
    { ia: "orange", a: { de: "Vitamine", es: "vitaminas" }, b: { de: "lebensnotwendig, in kleinen Mengen", es: "esenciales, en pequeñas cantidades" } },
    { ia: "stone", a: { de: "Mineralsalze", es: "sales minerales" }, b: { de: "anorganisch, als Ionen aufgenommen", es: "inorgánicas, se toman como iones" } }
  ]},
  { id: "bg", topic: "umsatz", title: { de: "Begriffe & Zahlen", es: "Conceptos y números" }, pairs: [
    { ia: "bed", a: { de: "Grundumsatz", es: "metabolismo basal" }, b: { de: "Energie bei völliger Ruhe", es: "energía en reposo total" } },
    { ia: "runner", a: { de: "Leistungsumsatz", es: "gasto por actividad" }, b: { de: "zusätzliche Energie für Tätigkeiten", es: "energía extra para actividades" } },
    { a: { de: "Gesamtumsatz", es: "gasto total" }, b: { de: "Grundumsatz + Leistungsumsatz", es: "basal + actividad" } },
    { a: { de: "Grundumsatz Mann", es: "basal hombre" }, b: "kg × 24" },
    { a: { de: "Grundumsatz Frau", es: "basal mujer" }, b: "kg × 24 × 0,9" },
    { a: "1 kcal", b: "≈ 4,2 kJ" },
    { a: { de: "1 g Fett", es: "1 g de grasa" }, b: "37 kJ ≈ 9 kcal" },
    { ia: "bed", a: { de: "PAL Schlafen", es: "PAL dormir" }, b: "0,95" }
  ]}
];

/* ---------------------------------------------------------------------
   SORTIEREN
   --------------------------------------------------------------------- */
const SORTS = [
  { id: "makro-mikro", topic: "mineral", title: { de: "Makro oder Mikro?", es: "¿Macro o micro?" },
    buckets: [{ id: "makro", label: { de: "Makroelemente (Mengenelemente)", es: "Macroelementos" } }, { id: "mikro", label: { de: "Mikroelemente (Spurenelemente)", es: "Microelementos" } }],
    items: [
      ["Calcium", "makro", "#Ca"], ["Magnesium", "makro", "#Mg"], ["Phosphor", "makro", "#P"], ["Natrium", "makro", "#Na"], ["Kalium", "makro", "#K"],
      ["Eisen", "mikro", "#Fe"], ["Iod", "mikro", "#I"], ["Fluor", "mikro", "#F"]
    ] },
  { id: "makro-wo", topic: "mineral", title: { de: "Wo steckt welches Makroelement?", es: "¿Dónde está cada macroelemento?" },
    buckets: [{ id: "ca", label: "Calcium" }, { id: "mg", label: "Magnesium" }, { id: "k", label: "Kalium" }, { id: "na", label: "Natrium" }],
    items: [
      [{ de: "Milch", es: "leche" }, "ca", "milk"], [{ de: "Grünkohl", es: "col rizada" }, "ca", "broccoli"], [{ de: "Joghurt", es: "yogur" }, "ca", "cream"],
      [{ de: "Nüsse", es: "frutos secos" }, "mg", "nut"], [{ de: "Kerne", es: "pipas" }, "mg", "seeds"],
      [{ de: "Bananen", es: "plátanos" }, "k", "banana"], [{ de: "Erbsen", es: "guisantes" }, "k", "peas"], [{ de: "Avocado", es: "aguacate" }, "k", "avocado"],
      [{ de: "Wurst", es: "embutido" }, "na", "sausage"], [{ de: "Chips", es: "patatas fritas" }, "na", "chips"]
    ] },
  { id: "lebensmittel", topic: "naehrstoffe", title: { de: "Lebensmittel → Nährstoff", es: "Alimento → nutriente" },
    buckets: [{ id: "kh", label: { de: "viele Kohlenhydrate", es: "muchos carbohidratos" } }, { id: "fett", label: { de: "viel Fett", es: "mucha grasa" } }, { id: "prot", label: { de: "viel Eiweiß", es: "mucha proteína" } }],
    items: [
      [{ de: "Pasta", es: "pasta" }, "kh", "pasta"], [{ de: "Brot", es: "pan" }, "kh", "bread"], [{ de: "Hafer", es: "avena" }, "kh", "oats"], [{ de: "Kartoffeln", es: "patatas" }, "kh", "potato"], [{ de: "Mais", es: "maíz" }, "kh", "corn"],
      [{ de: "Butter", es: "mantequilla" }, "fett", "butter"], [{ de: "Olivenöl", es: "aceite de oliva" }, "fett", "oil"], [{ de: "Avocado", es: "aguacate" }, "fett", "avocado"], [{ de: "Popcorn (mit Öl)", es: "palomitas (con aceite)" }, "fett", "popcorn"],
      [{ de: "Fleisch", es: "carne" }, "prot", "meat"], [{ de: "Fisch", es: "pescado" }, "prot", "fish"], [{ de: "Soja", es: "soja" }, "prot", "tofu"], [{ de: "Linsen", es: "lentejas" }, "prot", "lentils"]
    ] },
  { id: "gu-lu", topic: "umsatz", title: { de: "Grundumsatz oder Leistungsumsatz?", es: "¿Basal o actividad?" },
    buckets: [{ id: "gu", label: { de: "Grundumsatz", es: "Metabolismo basal" } }, { id: "lu", label: { de: "Leistungsumsatz", es: "Gasto por actividad" } }],
    items: [
      [{ de: "Herzschlag", es: "latido del corazón" }, "gu", "heart"], [{ de: "Atmung (Lunge)", es: "respiración (pulmones)" }, "gu", "lungs"], [{ de: "Körpertemperatur halten", es: "mantener la temperatura" }, "gu", "thermo"], [{ de: "Nieren reinigen das Blut", es: "los riñones limpian la sangre" }, "gu", "kidney"],
      [{ de: "Rennen", es: "correr" }, "lu", "runner"], [{ de: "Treppen steigen", es: "subir escaleras" }, "lu", "stairs"], [{ de: "Für das Examen lernen", es: "estudiar para el examen" }, "lu", "book"], [{ de: "Fußball spielen", es: "jugar al fútbol" }, "lu", "football"], [{ de: "Schwere Tasche tragen", es: "llevar una bolsa pesada" }, "lu", "bag"]
    ] },
  { id: "energieformen", topic: "energie", title: { de: "Welche Energieform?", es: "¿Qué forma de energía?" },
    buckets: [{ id: "chemisch", label: { de: "chemische Energie", es: "energía química" } }, { id: "bewegung", label: { de: "Bewegungsenergie", es: "energía cinética" } }, { id: "lage", label: { de: "Lageenergie", es: "energía potencial" } }, { id: "strahlung", label: { de: "Strahlungsenergie", es: "energía radiante" } }],
    items: [
      [{ de: "Batterie", es: "pila" }, "chemisch", "battery"], [{ de: "Benzin", es: "gasolina" }, "chemisch", "pump"], [{ de: "Nahrung", es: "comida" }, "chemisch", "bread"],
      [{ de: "Fallschirm im freien Fall", es: "paracaídas en caída libre" }, "bewegung", "parachute"], [{ de: "fahrendes Auto", es: "coche en marcha" }, "bewegung", "car"], [{ de: "Motorrad", es: "moto" }, "bewegung", "bike"],
      [{ de: "Katze auf dem Baum", es: "gato en el árbol" }, "lage", "cat"], [{ de: "Wasser im Stausee", es: "agua en el embalse" }, "lage", "dam"], [{ de: "Stein oben am Berg", es: "piedra en la montaña" }, "lage", "rock"],
      [{ de: "Sonne", es: "Sol" }, "strahlung", "sun"], [{ de: "Licht der Lampe", es: "luz de la lámpara" }, "strahlung", "bulb"]
    ] },
  { id: "vit-min", topic: "vitamine", title: { de: "Vitamine, Mineralsalze oder beide?", es: "¿Vitaminas, sales minerales o ambas?" },
    buckets: [{ id: "vit", label: { de: "Vitamine", es: "Vitaminas" } }, { id: "min", label: { de: "Mineralsalze", es: "Sales minerales" } }, { id: "beide", label: { de: "beide", es: "ambas" } }],
    items: [
      [{ de: "organisch", es: "orgánicas" }, "vit", "leaf"], [{ de: "z. B. Vitamin C", es: "p. ej. vitamina C" }, "vit", "orange"], [{ de: "Gruppen A bis K", es: "grupos de la A a la K" }, "vit"],
      [{ de: "anorganisch", es: "inorgánicas" }, "min", "stone"], [{ de: "z. B. Calcium", es: "p. ej. calcio" }, "min", "milk"], [{ de: "als Ionen aufgenommen", es: "se toman como iones" }, "min"],
      [{ de: "liefern keine Energie", es: "no aportan energía" }, "beide"], [{ de: "lebensnotwendig", es: "esenciales" }, "beide"], [{ de: "mit der Nahrung aufnehmen", es: "se toman con la comida" }, "beide"]
    ] }
];

const LEVELS = [
  { min: 0, de: "Glühwürmchen", es: "luciérnaga" },
  { min: 150, de: "Fahrrad-Dynamo", es: "dinamo de bici" },
  { min: 400, de: "Solarzelle", es: "célula solar" },
  { min: 800, de: "Wasserkraftwerk", es: "central hidroeléctrica" },
  { min: 1500, de: "Sonne", es: "Sol" }
];
