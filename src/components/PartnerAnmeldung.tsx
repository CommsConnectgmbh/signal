"use client";

import { useState } from "react";
import Link from "next/link";

// Einzige Client-Insel der Startseite. Der Rest ist Server-Komponente, damit
// Inhalt und LCP nicht an der Hydration haengen.
export default function PartnerAnmeldung() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      anrede: "",
      vorname: fd.get("vorname"),
      nachname: fd.get("nachname"),
      firmenname: fd.get("firmenname"),
      email: fd.get("email"),
      telefon: fd.get("telefon"),
      produkt: "Partnerprogramm",
      mitarbeiteranzahl: "",
      beschreibung: fd.get("beschreibung"),
      _honey: fd.get("_honey"),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      setSubmitted(true);
    } catch {
      setError(
        "Die Anmeldung konnte nicht gesendet werden. Bitte versuch es erneut oder schreib an info@smart-signals.de."
      );
    } finally {
      setSending(false);
    }
  };

  const feld =
    "w-full border border-border rounded-lg px-4 py-2.5 text-sm placeholder-text-muted focus:outline-none focus:border-brand transition-colors bg-white";

  if (submitted) {
    return (
      <div className="mt-8 rounded-2xl border border-accent/30 bg-accent-soft p-8 text-center">
        <p className="text-lg font-semibold text-accent-hover">Danke, angekommen.</p>
        <p className="mt-2 text-sm text-text-secondary">
          Wir melden uns mit dem Rahmenvertrag und den Konditionen bei dir.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
      >
        <label htmlFor="partner_website">Website</label>
        <input id="partner_website" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="vorname" className="sr-only">Vorname</label>
          <input id="vorname" name="vorname" type="text" autoComplete="given-name" required
            placeholder="Vorname" className={feld} />
        </div>
        <div>
          <label htmlFor="nachname" className="sr-only">Nachname</label>
          <input id="nachname" name="nachname" type="text" autoComplete="family-name" required
            placeholder="Nachname" className={feld} />
        </div>
      </div>

      <div>
        <label htmlFor="firmenname" className="block text-sm font-medium text-text-primary mb-1">
          Firma
        </label>
        <input id="firmenname" name="firmenname" type="text" autoComplete="organization" required
          placeholder="Name deiner Firma" className={feld} />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
          E-Mail-Adresse
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required
          placeholder="du@firma.de" className={feld} />
      </div>

      <div>
        <label htmlFor="telefon" className="block text-sm font-medium text-text-primary mb-1">
          Telefon (optional)
        </label>
        <input id="telefon" name="telefon" type="tel" autoComplete="tel"
          placeholder="Für Rückfragen" className={feld} />
      </div>

      <div>
        <label htmlFor="beschreibung" className="block text-sm font-medium text-text-primary mb-1">
          Mit wem arbeitest du?
        </label>
        <textarea id="beschreibung" name="beschreibung" rows={3}
          placeholder="Branche, Kundenkreis, welche Produkte dich interessieren"
          className={feld + " resize-none"} />
      </div>

      {error && <p role="alert" className="text-sm text-danger">{error}</p>}

      <button type="submit" disabled={sending}
        className="w-full bg-accent text-white font-semibold py-3 rounded-lg text-sm hover:bg-accent-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
        {sending ? "Wird gesendet …" : "Anmeldung absenden"}
      </button>

      <p className="text-xs text-text-muted leading-relaxed">
        Wir verwenden deine Angaben, um dir den Rahmenvertrag und die Konditionen
        zu schicken. Näheres in der{" "}
        <Link href="/datenschutz" className="underline underline-offset-2 hover:text-brand">
          Datenschutzerklärung
        </Link>
        .
      </p>
    </form>
  );
}
