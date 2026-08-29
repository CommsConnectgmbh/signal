// Bedingungen fuer den Wiesn-Tisch am 26.09.2026.
//
// ACHTUNG, das war einmal anders: Die erste Fassung dieser Seite beschrieb
// eine Verlosung von 2 x 2 Plaetzen und sagte zu, dass Speisen und Getraenke
// enthalten sind. Beides stimmt nicht. Rainer vergibt Plaetze nach eigener
// Auswahl, und die Gaeste zahlen selbst. Eine Zusage, die nicht eingehalten
// wird, ist der teuerste Fehler auf so einer Seite, deshalb steht es jetzt
// gleich im ersten Abschnitt.
//
// Kein Gewinnspiel: Es entscheidet weder Zufall noch Geschicklichkeit,
// sondern die Auswahl des Gastgebers. Trotzdem braucht es diese Seite. Ohne
// sie gibt es keine saubere Grundlage fuer die Absagen am 20.09., fuer das
// Mindestalter und fuer die Frage, was mit den Daten aus dem Fragebogen
// passiert.
//
// Eigene Serverkomponente mit eigenem metadata-Block, weil die Seite aus
// einer bezahlten Anzeige heraus verlinkt wird. /wiesn2026 selbst ist
// "use client" und kann kein metadata exportieren.

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bedingungen für den Wiesn-Tisch 2026 · Smart Signals",
  description:
    "Wie die 20 Plätze am Tisch der Comms Connect GmbH in der Käfer Wiesn-Schänke am 26.09.2026 vergeben werden.",
  alternates: {
    canonical: "https://smart-signals.de/wiesn2026/teilnahmebedingungen",
  },
  robots: { index: false, follow: true },
};

const ABSCHNITTE: { titel: string; text: string[] }[] = [
  {
    titel: "1. Worum es geht",
    text: [
      "Die Comms Connect GmbH hat am Samstag, 26.09.2026, von 11:30 bis 15:30 Uhr einen Tisch " +
        "in der Käfer Wiesn-Schänke auf dem Oktoberfest München. An diesem Tisch sind 20 Plätze. " +
        "Rainer Roloff ist selbst da.",
      "Vergeben wird der Sitzplatz. Speisen und Getränke bestellt und bezahlt jeder Gast selbst. " +
        "Es gibt kein Programm, keine Präsentationen und keine Pitches.",
      "Dies ist kein Gewinnspiel. Es wird nicht gelost. Wer am Tisch sitzt, entscheidet die " +
        "Comms Connect GmbH nach den Kriterien in Abschnitt 3.",
    ],
  },
  {
    titel: "2. Wer sich anmelden kann",
    text: [
      "Anmelden kann sich, wer am Tag der Veranstaltung das 18. Lebensjahr vollendet hat. " +
        "Das Mindestalter ergibt sich daraus, dass im Zelt Alkohol ausgeschenkt wird.",
      "Die Anmeldung läuft ausschließlich über den Fragebogen auf smart-signals.de/wiesn2026. " +
        "Ein Kommentar auf Instagram oder eine Nachricht an uns ersetzt die Anmeldung nicht.",
      "Wer als Gruppe kommen möchte, meldet sich einzeln an und nennt die Gruppe im Fragebogen. " +
        "Die Anmeldung ist kostenlos.",
    ],
  },
  {
    titel: "3. Wie ausgewählt wird",
    text: [
      "Es gibt 20 Plätze und voraussichtlich mehr Anfragen. Wir wählen bewusst aus, damit der " +
        "Tisch zusammenpasst. Gruppen werden dabei bevorzugt berücksichtigt, weil es sich zu " +
        "zweit leichter an einem fremden Tisch sitzt.",
      "Ein Anspruch auf einen Platz besteht nicht. Die Reihenfolge der Anmeldung entscheidet nicht.",
      "Anmeldeschluss ist der 19.09.2026. Die Zu- und Absagen gehen am 20.09.2026 per E-Mail raus. " +
        "Wer zusagt und doch nicht kann, sagt uns bitte bis zum 25.09.2026 Bescheid, damit der " +
        "Platz weitergegeben werden kann.",
    ],
  },
  {
    titel: "4. Was wir mit deinen Angaben machen",
    text: [
      "Aus dem Fragebogen verarbeiten wir Name, E-Mail-Adresse und deine Angaben zu Gruppe und " +
        "Interessen. Wir nutzen sie, um die Plätze zu vergeben, dir zu- oder abzusagen und den " +
        "Tisch anzumelden. Der Wiesn-Betrieb bekommt dafür nur die Namensliste der Gäste.",
      "Wenn du im Fragebogen angibst, welche unserer Produkte dich interessieren, nutzen wir das " +
        "als Gesprächsthema am Tisch. Es hat keinen Einfluss darauf, ob du einen Platz bekommst.",
      "Spätestens einen Monat nach der Veranstaltung löschen wir die Angaben, sofern du uns nicht " +
        "ausdrücklich um etwas anderes gebeten hast. Einzelheiten stehen in der Datenschutzerklärung.",
    ],
  },
  {
    titel: "5. Sonstiges",
    text: [
      "Diese Aktion steht in keiner Verbindung zu Instagram oder Meta und wird von dort weder " +
        "gesponsert noch unterstützt oder organisiert. Sie steht auch in keiner Verbindung zum " +
        "Betreiber der Wiesn-Schänke oder zur Landeshauptstadt München. Wir sind dort Gast wie " +
        "jeder andere.",
      "Wir behalten uns vor, den Termin abzusagen oder zu verlegen, wenn er aus Gründen, die wir " +
        "nicht zu vertreten haben, nicht stattfinden kann. In dem Fall melden wir uns bei allen, " +
        "die eine Zusage haben.",
      "Sollte eine Bestimmung dieser Bedingungen unwirksam sein, bleiben die übrigen wirksam.",
      "Comms Connect GmbH, Tal 30, 80331 München, HRB 295951, info@smart-signals.de. " +
        "Stand: 29.08.2026.",
    ],
  },
];

export default function Bedingungen() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand">Wiesn 2026</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        Bedingungen für den Tisch
      </h1>
      <p className="mt-4 text-text-secondary">
        20 Plätze in der Käfer Wiesn-Schänke am Samstag, 26.09.2026.
      </p>

      <div className="mt-12 space-y-10">
        {ABSCHNITTE.map((a) => (
          <section key={a.titel}>
            <h2 className="text-lg font-bold text-text-primary">{a.titel}</h2>
            <div className="mt-3 space-y-3">
              {a.text.map((t, i) => (
                <p key={i} className="text-sm leading-relaxed text-text-secondary">
                  {t}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-14 border-t border-border pt-6 text-sm text-text-muted">
        <Link href="/wiesn2026" className="text-brand hover:underline">
          Zurück zur Anmeldung
        </Link>
        {" · "}
        <Link href="/impressum" className="text-brand hover:underline">
          Impressum
        </Link>
        {" · "}
        <Link href="/datenschutz" className="text-brand hover:underline">
          Datenschutz
        </Link>
      </p>
    </main>
  );
}
