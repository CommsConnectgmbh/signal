"use client";

// Die Seite hinter dem Abmeldelink in der Bestaetigungsmail.
//
// Bewusst mit Bestaetigungsknopf statt sofortigem Widerruf beim Aufruf:
// Mailclients und Sicherheitsscanner oeffnen Links in Mails vorab. Ein
// Widerruf allein durch das Oeffnen waere ausgeloest, ohne dass der
// Empfaenger je geklickt hat.
//
// Es geht hier nur um die werblichen Produktinfos (Einwilligung aus dem
// Wiesn-Fragebogen 2026). Die Seite bleibt nach der Aktion bestehen, weil
// der Widerruf jederzeit moeglich sein muss.

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";


function Inhalt() {
  const key = useSearchParams().get("k") ?? "";
  const [zustand, setZustand] = useState<"bereit" | "laeuft" | "fertig" | "fehler">("bereit");

  async function widerrufen() {
    setZustand("laeuft");
    try {
      const antwort = await fetch("/api/widerruf", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ k: key }),
      });
      setZustand(antwort.ok ? "fertig" : "fehler");
    } catch {
      setZustand("fehler");
    }
  }

  return (
    <div className="rounded-3xl bg-white p-8 text-text-primary shadow-lg sm:p-10">
      {zustand === "fertig" ? (
        <>
          <h1 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Keine Produktinfos mehr
          </h1>
          <p className="leading-relaxed text-text-secondary">
            Das ist notiert. Zu den Apps schicken wir nichts mehr.
          </p>
        </>
      ) : (
        <>
          <h1 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Keine Produktinfos mehr erhalten?
          </h1>
          <p className="mb-8 leading-relaxed text-text-secondary">
            Ein Klick, dann schicken wir dir keine Informationen zu den Apps mehr.
          </p>

          {!key ? (
            <p className="text-sm text-danger">
              Dieser Link ist unvollständig. Antworte einfach auf die Mail, dann
              tragen wir es von Hand ein.
            </p>
          ) : (
            <button
              type="button"
              onClick={widerrufen}
              disabled={zustand === "laeuft"}
              className="rounded-full bg-accent px-7 py-3.5 font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {zustand === "laeuft" ? "Einen Moment" : "Keine Produktinfos mehr"}
            </button>
          )}

          {zustand === "fehler" && (
            <p role="alert" className="mt-4 text-sm text-danger">
              Das hat gerade nicht geklappt. Antworte auf die Mail, dann
              erledigen wir es von Hand.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default function WiderrufPage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[#0A0704] text-white">

      <header className="relative z-10 flex justify-center pt-8">
        <Link href="/" aria-label="Zur Smart-Signals-Startseite">
          <Image
            src="/logo.png"
            alt="Smart Signals"
            width={600}
            height={319}
            priority
            className="h-9 w-auto brightness-0 invert"
          />
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 flex-col justify-center px-6 py-14">
        <div className="mx-auto w-full max-w-lg">
          <Suspense fallback={null}>
            <Inhalt />
          </Suspense>
        </div>
      </main>

      <footer className="relative z-10 pb-8 text-center text-xs text-white/60">
        <p>
          Eine Aktion der Comms Connect GmbH
          {" · "}
          <Link href="/impressum" className="underline hover:text-white">Impressum</Link>
          {" · "}
          <Link href="/datenschutz" className="underline hover:text-white">Datenschutz</Link>
        </p>
      </footer>
    </div>
  );
}
