import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

/** Alle Seiten-Routen unter src/app (page.tsx). */
function seiten(dir = path.join(process.cwd(), "src/app"), basis = ""): string[] {
  const out: string[] = [];
  for (const n of readdirSync(dir)) {
    const p = path.join(dir, n);
    if (statSync(p).isDirectory()) out.push(...seiten(p, `${basis}/${n}`));
    else if (n === "page.tsx") out.push(basis || "/");
  }
  return out;
}

// Seiten, die bewusst NICHT in der Sitemap stehen (und deshalb vom Messpunkt
// nur als "andere" gezaehlt werden): Partner-Login und -Portal (nicht
// oeffentlich, robots-gesperrt), /links (Instagram-Bio, noindex), /widerruf
// (Abmeldelink aus Mails) und /5g-koffer (Weiterleitung auf case-connect.de).
const NICHT_IN_SITEMAP = /^\/(login|portal|links|widerruf|5g-koffer)(\/|$)/;

describe("Sitemap", () => {
  it("enthaelt alle oeffentlichen Seiten mit absoluten URLs, keine Tuer", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.every((u) => u.startsWith("https://smart-signals.de/"))).toBe(true);
    expect(urls.some((u) => u.includes("/start"))).toBe(false);
    const pfade = urls.map((u) => new URL(u).pathname);
    expect(pfade.sort()).toEqual(seiten().filter((p) => !NICHT_IN_SITEMAP.test(p)).sort());
    expect(new Set(urls).size).toBe(urls.length);
  });
  it("robots verweist auf die Sitemap und sperrt die Tuer", () => {
    const r = robots();
    expect(r.sitemap).toBe("https://smart-signals.de/sitemap.xml");
    expect(JSON.stringify(r.rules)).toContain("/start");
  });
});
