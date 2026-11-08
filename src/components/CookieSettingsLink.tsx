"use client";

import { brauchtEinwilligung, werbeIdsAusEnv } from "@/lib/consent/ids";
import { CONSENT_OEFFNEN } from "./ConsentBanner";

/**
 * "Cookie-Einstellungen" im Fuss. Oeffnet den Einwilligungsdialog jederzeit.
 * Ohne Werbe-IDs gibt es nichts einzustellen, dann erscheint der Link nicht.
 */
export function CookieSettingsLink({
  className,
  listenpunkt = false,
  trenner,
}: {
  className?: string;
  /** In einer Linkliste des Fusses: in ein <li> gefasst. */
  listenpunkt?: boolean;
  /** Trenner vor dem Link in einer Textzeile (" · "), nur wenn er erscheint. */
  trenner?: string;
}) {
  if (!brauchtEinwilligung(werbeIdsAusEnv())) return null;
  const knopf = (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(CONSENT_OEFFNEN))}
    >
      Cookie-Einstellungen
    </button>
  );
  if (listenpunkt) return <li>{knopf}</li>;
  return (
    <>
      {trenner}
      {knopf}
    </>
  );
}
