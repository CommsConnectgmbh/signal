// Single Source of Truth für das Smart-Signals-Portfolio.
//
// Smart Signals ist die Produktmarke der Comms Connect GmbH. Auf dieser Seite
// stehen ausschließlich die eigenen Software-Produkte. Telekommunikation
// (Mobilfunk-Brokerage, 5G-Koffer) und CommsOS gehören bewusst NICHT dazu:
// die Marke trägt die Abgrenzung vom Telko-Geschäft und darf nicht wieder
// damit vermischt werden.
//
// Regeln für Einträge:
// - Keine Preise. Preise stehen auf der jeweiligen Produkt-Domain und ändern
//   sich dort, ohne dass jemand an diese Datei denkt.
// - Keine Provisionszahlen. Die stehen im Partnervertrag, nicht öffentlich.
// - Keine Superlative, keine unbelegten Zahlen (siehe DESIGN.md §8).

export type ProduktStatus = "live" | "vorbereitung";
export type ProduktSegment = "betrieb" | "privat";

export type Produkt = {
  slug: string;
  name: string;
  /** Kurzes Kategorie-Label über dem Titel. */
  kategorie: string;
  segment: ProduktSegment;
  /** Eine Zeile, was das Produkt tut. */
  claim: string;
  /** Zwei bis drei Sätze für die Detailkarte. */
  beschreibung: string;
  zielgruppe: string;
  punkte: string[];
  url: string;
  /** Anzeigename der Domain, ohne Protokoll. */
  domain: string;
  status: ProduktStatus;
  /** Läuft für dieses Produkt bereits ein Partnerprogramm? */
  partnerprogramm: boolean;
  /** Auf der Startseite groß ausgespielt. */
  featured?: boolean;
};

export const produkte: Produkt[] = [
  {
    slug: "belegify",
    name: "Belegify",
    kategorie: "Buchhaltung",
    segment: "betrieb",
    claim: "Belege erfassen, ohne sie zu sortieren.",
    beschreibung:
      "Belege per Foto, Sprachnachricht, Messenger oder E-Mail erfassen. Belegify liest sie aus, prüft sie auf Pflichtangaben und übergibt sie als fertiges PDF an die Steuerkanzlei.",
    zielgruppe: "Selbstständige, kleine Betriebe, Steuerkanzleien",
    punkte: [
      "Foto, Sprache oder E-Mail als Eingang",
      "Prüfung auf Pflichtangaben vor der Übergabe",
      "Übergabe an die Kanzlei ohne Sammelordner",
    ],
    url: "https://belegify.app",
    domain: "belegify.app",
    status: "live",
    partnerprogramm: true,
    featured: true,
  },
  {
    slug: "obacht",
    name: "Obacht",
    kategorie: "Personaleinsatz",
    segment: "betrieb",
    claim: "Wer arbeitet heute an welchem Standort.",
    beschreibung:
      "Personaleinsatz, Zeiterfassung und Ausrüstungsverwaltung für Betriebe, die an wechselnden Standorten arbeiten. Die Leitung sieht in einer Ansicht, wer eingeteilt ist, wer eingestempelt hat und welches Gerät ausgegeben wurde.",
    zielgruppe: "Handwerk, Gastronomie, Sicherheitsdienste, Veranstalter",
    punkte: [
      "Einsatzplanung je Standort",
      "Zeiterfassung per App, Scan oder Anruf",
      "Ausrüstung mit lückenlosem Ausgabe-Protokoll",
    ],
    url: "https://obacht.app",
    domain: "obacht.app",
    status: "live",
    partnerprogramm: true,
    featured: true,
  },
  {
    slug: "obacht-talents",
    name: "Obacht Talents",
    kategorie: "Personalvermittlung",
    segment: "betrieb",
    claim: "Fachkräfte und Schichtpersonal finden.",
    beschreibung:
      "Vermittlungsportal für freie Fachkräfte und Schichtpersonal. Betriebe schreiben ihren Bedarf aus, passende Profile werden vorgeschlagen, die Vermittlung läuft über die Plattform.",
    zielgruppe: "Betriebe mit Personalbedarf, Freelancer, Schichtkräfte",
    punkte: [
      "Zwei Segmente: Fachkräfte und Schichtpersonal",
      "Vorschläge statt Lebenslauf-Stapel",
      "Optional an Obacht angebunden",
    ],
    url: "https://talents.obacht.app",
    domain: "talents.obacht.app",
    status: "live",
    partnerprogramm: false,
  },
  {
    slug: "conduit",
    name: "Conduit",
    kategorie: "Arbeiten von unterwegs",
    segment: "betrieb",
    claim: "Der eigene Rechner, bedienbar vom Handy.",
    beschreibung:
      "Conduit verbindet das Handy mit dem KI-Assistenten auf dem eigenen Rechner. Aufträge unterwegs diktieren, Ergebnisse später am Schreibtisch weiterverwenden.",
    zielgruppe: "Selbstständige und Teams, die viel unterwegs sind",
    punkte: [
      "Text und Sprache",
      "Kopplung ohne fremden Cloud-Account",
      "Als App und im Browser",
    ],
    url: "https://tryconduit.de",
    domain: "tryconduit.de",
    status: "live",
    partnerprogramm: false,
  },
  {
    slug: "simvi",
    name: "Simvi",
    kategorie: "Familie",
    segment: "privat",
    claim: "Messenger und Notruf für Großeltern.",
    beschreibung:
      "Nachrichten, Videoanrufe und Notruf in einer Oberfläche, die für ältere Menschen gebaut ist. Eingerichtet wird sie von der Familie, bedient wird sie mit großen Flächen und klarer Schrift.",
    zielgruppe: "Familien mit älteren Angehörigen",
    punkte: [
      "Große Bedienelemente, keine Menü-Ebenen",
      "Einrichtung per Kopplungscode durch die Familie",
      "Notruf an hinterlegte Kontakte",
    ],
    url: "https://simvi.de",
    domain: "simvi.de",
    status: "live",
    partnerprogramm: false,
  },
  {
    slug: "swing-and-savor",
    name: "Swing & Savor",
    kategorie: "Golf",
    segment: "privat",
    claim: "Golfrunden planen und auswerten.",
    beschreibung:
      "App für Golfrunden im Freundeskreis: Turniere anlegen, Ergebnisse eintragen, Wertungen nachvollziehen.",
    zielgruppe: "Golfer und private Turnierrunden",
    punkte: ["Turniere und Wertungen", "Ergebnisse direkt auf dem Platz", "Für Gruppen ausgelegt"],
    url: "https://swingandsavor.at",
    domain: "swingandsavor.at",
    status: "live",
    partnerprogramm: false,
  },
  {
    slug: "dealbuddy",
    name: "DealBuddy",
    kategorie: "Freundeskreis",
    segment: "privat",
    claim: "Wetten unter Freunden, ohne Einsatz.",
    beschreibung:
      "Private Wetten und Challenges im Freundeskreis anlegen und nachhalten. Kein Geldeinsatz, stattdessen ein Zuverlässigkeits-Score und Sammelkarten.",
    zielgruppe: "Freundesgruppen",
    punkte: ["Kein Geldeinsatz", "Nachvollziehbare Auswertung", "Für Gruppen gebaut"],
    url: "https://deal-buddy.app",
    domain: "deal-buddy.app",
    status: "vorbereitung",
    partnerprogramm: false,
  },
];

export const produkteBetrieb = produkte.filter((p) => p.segment === "betrieb");
export const produktePrivat = produkte.filter((p) => p.segment === "privat");
export const produkteFeatured = produkte.filter((p) => p.featured);

/** Optionen für die Produktauswahl im Kontaktformular. */
export const kontaktProduktOptionen = [
  ...produkte.map((p) => p.name),
  "Mitarbeitervorteile",
  "Partnerprogramm",
  "Etwas anderes",
];
