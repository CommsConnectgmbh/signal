"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  brauchtEinwilligung,
  hatMarketing,
  hatStatistik,
  werbeIdsAusEnv,
  type WerbeIds,
} from "@/lib/consent/ids";
import { istWiderruf, leseConsent, schreibeConsent, type Consent } from "@/lib/consent/store";
import { ladeTags } from "@/lib/consent/tags";

/** Event, mit dem "Cookie-Einstellungen" im Fuss den Dialog oeffnet. */
export const CONSENT_OEFFNEN = "cc-consent-oeffnen";

const TEXT = {
  label: "Datenschutz-Einstellungen",
  titel: "Ihre Auswahl",
  intro:
    "Mit Ihrer Einwilligung nutzen wir die unten genannten Dienste. Ohne Einwilligung wird keiner davon geladen. Sie können Ihre Auswahl jederzeit über „Cookie-Einstellungen“ im Fußbereich ändern.",
  mehr: "Datenschutzerklärung",
  alle: "Alle akzeptieren",
  noetig: "Nur notwendige",
  einstellungen: "Einstellungen",
  speichern: "Auswahl speichern",
  notwendig: "Notwendig",
  notwendigText: "Speichert diese Auswahl in Ihrem Browser. Immer aktiv.",
  statistik: "Statistik",
  marketing: "Marketing",
  immer: "immer aktiv",
} as const;

/**
 * Bereiche ohne Werbe-Tags: Partner-Login und Partner-Portal. Dort gibt es
 * nichts zu bewerben, und Partner-, Deal- und Provisionsdaten haben bei
 * Analyse- oder Werbediensten nichts verloren.
 */
export function ohneTags(pathname: string): boolean {
  return /^\/(portal|login)(\/|$)/.test(pathname);
}

function dienste(ids: WerbeIds) {
  const statistik = ids.ga4 ? ["Google Analytics 4"] : [];
  const marketing = [
    ids.gads && "Google Ads",
    ids.metaPixel && "Meta Pixel",
    ids.linkedin && "LinkedIn Insight Tag",
  ].filter(Boolean) as string[];
  return { statistik, marketing };
}

// Alle drei Schaltflaechen identisch: keine hervorgehobene Zustimmung.
const KNOPF =
  "inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-border bg-white text-sm font-semibold text-text-primary hover:border-brand hover:text-brand transition-colors";

/**
 * Einwilligungs-Banner. Ohne gesetzte Werbe-IDs rendert er nichts: kein
 * Banner, kein Speicherzugriff, keine Fremd-Requests.
 */
export function ConsentBanner({ ids: idsProp }: { ids?: WerbeIds }) {
  const pathname = usePathname() ?? "/";
  const ids = idsProp ?? werbeIdsAusEnv();
  if (!brauchtEinwilligung(ids) || ohneTags(pathname)) return null;
  return <Banner ids={ids} />;
}

function Banner({ ids }: { ids: WerbeIds }) {
  const t = TEXT;
  const { statistik: statDienste, marketing: mktDienste } = dienste(ids);

  const [offen, setOffen] = useState(false);
  const [details, setDetails] = useState(false);
  const [aktuell, setAktuell] = useState<Consent | null>(null);
  const [wahlStat, setWahlStat] = useState(false);
  const [wahlMkt, setWahlMkt] = useState(false);

  useEffect(() => {
    // Die gespeicherte Wahl gibt es nur im Browser; sie wird deshalb erst nach
    // dem Hydrieren gelesen (sonst unterschiede sich Server- und Client-HTML).
    const c = leseConsent(window.localStorage);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAktuell(c);
    if (c) ladeTags(c, ids, window);
    else setOffen(true);

    const oeffnen = () => {
      const jetzt = leseConsent(window.localStorage);
      setWahlStat(jetzt?.statistik ?? false);
      setWahlMkt(jetzt?.marketing ?? false);
      setDetails(true);
      setOffen(true);
    };
    window.addEventListener(CONSENT_OEFFNEN, oeffnen);
    return () => window.removeEventListener(CONSENT_OEFFNEN, oeffnen);
    // ids ist pro Build fest.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function entscheide(statistik: boolean, marketing: boolean) {
    // Vorherige Wahl aus dem Speicher (zaehlt auch eine Einwilligung aus einem
    // anderen Tab), ersatzweise aus dem State, falls der Speicher gesperrt ist.
    const vorher = leseConsent(window.localStorage) ?? aktuell;
    const neu = schreibeConsent(window.localStorage, {
      statistik: statistik && hatStatistik(ids),
      marketing: marketing && hatMarketing(ids),
    });
    setOffen(false);
    setDetails(false);
    if (istWiderruf(vorher, neu)) {
      // Geladene Skripte lassen sich nicht entladen: neu laden.
      window.location.reload();
      return;
    }
    setAktuell(neu);
    ladeTags(neu, ids, window);
  }

  if (!offen) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t.label}
      data-consent-banner
      className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:right-6 sm:bottom-6 z-[60] sm:max-w-md rounded-2xl border border-border bg-white p-5 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)] text-text-secondary"
    >
      <p className="text-sm font-semibold text-text-primary">{t.titel}</p>
      <p className="mt-2 text-xs leading-relaxed text-text-secondary">
        {t.intro}{" "}
        <a href="/datenschutz" className="text-brand underline underline-offset-2 hover:text-brand-hover">
          {t.mehr}
        </a>
      </p>

      {details && (
        <div className="mt-4 space-y-3 text-xs">
          <Kategorie titel={t.notwendig} text={t.notwendigText} an fest hinweis={t.immer} />
          {statDienste.length > 0 && (
            <Kategorie titel={t.statistik} text={statDienste.join(", ")} an={wahlStat} onChange={setWahlStat} />
          )}
          {mktDienste.length > 0 && (
            <Kategorie titel={t.marketing} text={mktDienste.join(", ")} an={wahlMkt} onChange={setWahlMkt} />
          )}
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button type="button" className={KNOPF} onClick={() => entscheide(true, true)}>
          {t.alle}
        </button>
        <button type="button" className={KNOPF} onClick={() => entscheide(false, false)}>
          {t.noetig}
        </button>
        {details ? (
          <button type="button" className={KNOPF} onClick={() => entscheide(wahlStat, wahlMkt)}>
            {t.speichern}
          </button>
        ) : (
          <button
            type="button"
            className={KNOPF}
            onClick={() => {
              setWahlStat(aktuell?.statistik ?? false);
              setWahlMkt(aktuell?.marketing ?? false);
              setDetails(true);
            }}
          >
            {t.einstellungen}
          </button>
        )}
      </div>
    </div>
  );
}

function Kategorie({
  titel,
  text,
  an,
  fest = false,
  hinweis,
  onChange,
}: {
  titel: string;
  text: string;
  an: boolean;
  fest?: boolean;
  hinweis?: string;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 rounded-xl bg-surface p-3 cursor-pointer">
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 accent-brand"
        checked={an}
        disabled={fest}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span>
        <span className="block font-semibold text-text-primary">
          {titel}
          {hinweis && <span className="ml-2 font-normal text-text-muted">({hinweis})</span>}
        </span>
        <span className="block text-text-muted">{text}</span>
      </span>
    </label>
  );
}
