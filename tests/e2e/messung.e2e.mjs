// Browser-Pruefung der Web-Messung gegen einen lokalen Prod-Build.
//
//   npm run test:e2e
//
// Baut zweimal (ohne IDs, mit Test-IDs), startet jeweils `next start` und
// prueft mit Playwright (Chromium headless):
//   ohne IDs:  null Fremd-Requests, kein Banner, keine Cookies/kein Speicher,
//              Reichweitenmessung und Klick-Tuer schreiben an den Mock;
//              Assets und API werden nicht gezaehlt; ohne WEB_HIT_TOKEN
//              geht gar nichts an den Mock.
//   mit IDs:   vor Klick null Requests an Google/Meta/LinkedIn, nach
//              "Alle akzeptieren" sind sie da, nach "Nur notwendige" keine.
// Der Messendpunkt ist ein lokaler Mock (WEB_HIT_URL), kein echter Token.
// Fremd-Scripte werden abgefangen und leer beantwortet: der Request ist
// sichtbar, verlaesst aber den Rechner nicht.
//
// Der Build braucht die oeffentlichen Supabase-Angaben des Partner-Logins.
// Dafuer stehen hier Platzhalter auf 127.0.0.1 (kein Fremd-Host, kein Secret).

import { spawn, spawnSync } from "node:child_process";
import http from "node:http";
import { chromium } from "playwright";

const ROOT = new URL("../..", import.meta.url).pathname;
const PORT = 3440;
const MOCK_PORT = 3441;
const BASE = `http://localhost:${PORT}`;
const UA_SUFFIX = " CCMessLauf";
const PAGES = ["/", "/produkte", "/mitarbeitervorteile", "/unternehmen", "/kontaktanfrage", "/impressum", "/datenschutz"];
const TRACKER = /googletagmanager|google-analytics|doubleclick|googleadservices|facebook|fbcdn|linkedin|licdn/;
const BUILD_ENV = {
  NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:54321",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "platzhalter-nur-fuer-den-lokalen-build",
};
const IDS = {
  NEXT_PUBLIC_GA4_ID: "G-TEST000000",
  NEXT_PUBLIC_GADS_ID: "AW-1234567890",
  NEXT_PUBLIC_META_PIXEL_ID: "1234567890123",
  NEXT_PUBLIC_LINKEDIN_PARTNER_ID: "1234567",
};
const MOCK_ENV = { WEB_HIT_TOKEN: "test-token-lokal", WEB_HIT_URL: `http://127.0.0.1:${MOCK_PORT}/web-hit` };

let fehler = 0;
let ok = 0;
function check(bed, text) {
  console.log(`  ${bed ? "OK  " : "FAIL"}  ${text}`);
  if (bed) ok++;
  else fehler++;
}

// ---- Mock fuer web-hit ----
const hits = [];
const mock = http.createServer((req, res) => {
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    hits.push({
      method: req.method,
      token: req.headers["x-web-hit-token"],
      region: req.headers["x-region"],
      ct: req.headers["content-type"],
      body: JSON.parse(body || "{}"),
    });
    res.writeHead(204).end();
  });
});
await new Promise((r) => mock.listen(MOCK_PORT, "127.0.0.1", r));

function baue(env) {
  console.log(`\n== next build (${Object.keys(env).length ? "mit Test-IDs" : "ohne IDs"})`);
  const r = spawnSync("npx", ["next", "build"], {
    cwd: ROOT,
    env: { ...process.env, ...BUILD_ENV, ...env },
    encoding: "utf8",
  });
  console.log(r.stdout.split("\n").filter((l) => /Route|○|ƒ|✓|Proxy|error|Error/.test(l)).join("\n"));
  if (r.status !== 0) {
    console.log(r.stderr);
    throw new Error("build failed");
  }
}

async function starte(env) {
  try {
    await fetch(`${BASE}/robots.txt`);
    throw new Error(`Port ${PORT} ist schon belegt`);
  } catch (e) {
    if (String(e.message).includes("belegt")) throw e;
  }
  // Eigene Prozessgruppe: beim Stoppen faellt der ganze Baum, nicht nur npx.
  const p = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: ROOT,
    env: { ...process.env, ...BUILD_ENV, ...env },
    stdio: ["ignore", "pipe", "pipe"],
    detached: true,
  });
  p.stderr.on("data", (d) => process.stderr.write(`[next] ${d}`));
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`${BASE}/robots.txt`);
      if (r.status) return p;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error("next start not ready");
}

async function stoppe(p) {
  try {
    process.kill(-p.pid, "SIGTERM");
  } catch {
    p.kill();
  }
  await new Promise((r) => setTimeout(r, 1000));
}

async function kontext(browser) {
  const tmp = await browser.newPage();
  const ua = await tmp.evaluate(() => navigator.userAgent);
  await tmp.close();
  const ctx = await browser.newContext({ userAgent: ua + UA_SUFFIX });
  const fremd = [];
  ctx.on("request", (r) => {
    const u = new URL(r.url());
    if (u.hostname !== "localhost" && u.hostname !== "127.0.0.1") fremd.push(r.url());
  });
  // Fremde Ziele nicht wirklich ansteuern.
  await ctx.route(/^https?:\/\/(?!localhost|127\.0\.0\.1)/, (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" }),
  );
  return { ctx, fremd };
}

const warte = (ms) => new Promise((r) => setTimeout(r, ms));
const events = (page) =>
  page.evaluate(() =>
    (window.dataLayer || []).map((a) => Array.from(a)).filter((a) => a[0] === "event").map((a) => [a[1], a[2]]),
  );
const browser = await chromium.launch({ headless: true });

try {
  // ================= Teil 1: ohne IDs =================
  baue({});
  let server = await starte(MOCK_ENV);
  {
    console.log("\n== Teil 1: Build OHNE IDs, mit WEB_HIT_TOKEN (Mock)");
    hits.length = 0;
    const { ctx, fremd } = await kontext(browser);
    const page = await ctx.newPage();
    for (const p of PAGES) {
      const q = p === "/" ? "?utm_source=e2e&utm_campaign=test&utm_term=SUCHWORT&gclid=GEHEIMWERT" : "";
      await page.goto(BASE + p + q, { waitUntil: "networkidle" });
      await warte(300);
      check((await page.locator("[data-consent-banner]").count()) === 0, `${p}: kein Banner im DOM`);
      check((await page.getByText("Cookie-Einstellungen").count()) === 0, `${p}: kein Footer-Link Cookie-Einstellungen`);
    }
    check(fremd.length === 0, `null Fremd-Requests auf ${PAGES.length} Seiten (gesehen: ${fremd.length})`);
    check((await ctx.cookies()).length === 0, "keine Cookies");
    check((await page.evaluate(() => localStorage.length)) === 0, "localStorage leer");
    await warte(800);

    const views = hits.filter((h) => h.body.kind === "view");
    check(views.length === PAGES.length, `genau ${PAGES.length} Seitenaufrufe gezaehlt (gesehen: ${views.length}, keine Assets, keine API, keine Vorladungen)`);
    check(hits.every((h) => h.method === "POST" && h.token === "test-token-lokal" && h.ct === "application/json"), "POST mit Header x-web-hit-token und JSON an jedem Hit");
    check(hits.length > 0 && hits.every((h) => h.region === "eu-central-1"), "Header x-region: eu-central-1 an jedem Hit");
    const sm = await (await fetch(BASE + "/sitemap.xml")).text();
    const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    check(views.every((v) => locs.includes(v.body.path)), "jeder gezaehlte Pfad steht exakt so in sitemap.xml");
    check(JSON.stringify([...locs].sort()) === JSON.stringify([...PAGES].sort()), `sitemap.xml mit allen ${PAGES.length} oeffentlichen Seiten, ohne /start`);
    check(views.every((v) => v.body.client_kind === "intern"), "Lauf-Kennung CCMessLauf -> intern");
    const start = views.find((v) => v.body.path === "/");
    console.log("    Body Startseite:", JSON.stringify(start?.body));
    check(
      start &&
        JSON.stringify(start.body) ===
          JSON.stringify({ kind: "view", path: "/", client_kind: "intern", klick_typ: "gclid", utm_source: "e2e", utm_campaign: "test" }),
      "erwarteter Body beim Seitenaufruf (UTM, klick_typ, sonst nichts)",
    );
    check(!JSON.stringify(hits).includes("GEHEIMWERT"), "Wert des Klick-Parameters nirgends gesendet");
    check(!JSON.stringify(hits).includes("SUCHWORT"), "utm_term nie gesendet");
    check(!/Mozilla|HeadlessChrome|127\.0\.0\.1|::1/.test(JSON.stringify(hits.map((h) => h.body))), "kein User-Agent, keine IP im Body");

    // Assets und API: nicht gezaehlt
    hits.length = 0;
    const html = { accept: "text/html", "x-cc-lauf": "1" };
    for (const p of ["/logo.png", "/robots.txt", "/sitemap.xml", "/_next/static/x.js", "/api/contact", "/portal", "/login"]) {
      await fetch(BASE + p, { headers: html, redirect: "manual" });
    }
    await fetch(BASE + "/produkte", { headers: { accept: "*/*", "sec-fetch-dest": "empty", "x-cc-lauf": "1" } });
    await fetch(BASE + "/produkte", { method: "HEAD", headers: html });
    await warte(800);
    check(hits.length === 0, `Assets, API, Portal, Login, fetch und HEAD nicht gezaehlt (gesehen: ${hits.length})`);

    // Klick-Tuer ueber den echten Navbar-Knopf
    hits.length = 0;
    await page.goto(BASE + "/produkte", { waitUntil: "networkidle" });
    const cta = page.locator("nav a", { hasText: "Partner werden" }).first();
    const href = await cta.getAttribute("href");
    check(href === "/start?ziel=partner", `Navbar "Partner werden" zeigt auf die Tuer (${href})`);
    const [resp] = await Promise.all([page.waitForResponse((r) => r.url().startsWith(BASE + "/start")), cta.click()]);
    check(resp.status() === 302 && resp.headers()["location"] === BASE + "/#anmeldung", `Tuer 302 -> ${resp.headers()["location"]}`);
    await page.waitForURL(BASE + "/#anmeldung");
    check(page.url() === BASE + "/#anmeldung", `Browser landet auf ${page.url()}`);
    await warte(800);
    const klick = hits.find((h) => h.body.kind === "cta");
    console.log("    Body Tuer-Klick:", JSON.stringify(klick?.body));
    check(klick && klick.body.ziel === "partner" && klick.body.from_path === "/produkte" && klick.body.path === "/start", "Tuer-Klick gezaehlt (ziel, from_path)");
    check(!hits.some((h) => h.body.path === "/start" && h.body.kind === "view"), "/start nicht als Seitenaufruf");

    // Kontakt-CTA auf /unternehmen
    await page.goto(BASE + "/unternehmen", { waitUntil: "networkidle" });
    const kontaktHref = await page.locator("main a", { hasText: "Kontakt aufnehmen" }).first().getAttribute("href");
    check(kontaktHref === "/start?ziel=kontakt", `Kontakt-CTA ueber die Tuer (${kontaktHref})`);

    for (const [q, erwartet] of [
      ["?ziel=https://evil.example", "/"],
      ["?ziel=login&utm_source=e2e", "/login?utm_source=e2e"],
      ["?ziel=jobhandy", "https://www.jobhandy.io/?utm_source=smart-signals.de&utm_medium=referral"],
    ]) {
      const r = await fetch(BASE + "/start" + q, { redirect: "manual", headers: { "x-cc-lauf": "1" } });
      const loc = r.headers.get("location") ?? "";
      check(r.status === 302 && (loc === erwartet || loc === BASE + erwartet), `Tuer ${q} -> ${loc}`);
    }
    await warte(800);
    check(!hits.some((h) => String(h.body.ziel).includes("evil")), "fremdes Ziel nicht gezaehlt");

    // Produktlink: bleibt direkt, Klick per <a ping>
    hits.length = 0;
    await page.goto(BASE + "/produkte", { waitUntil: "networkidle" });
    const produkt = page.locator('main a[href="https://belegify.app"]').first();
    check((await produkt.getAttribute("ping")) === "/start?ziel=belegify", "Produktlink bleibt direkt (SEO), mit ping auf die Tuer");
    const [popup] = await Promise.all([ctx.waitForEvent("page"), produkt.click()]);
    await popup.close();
    await warte(1200);
    const pingHit = hits.find((h) => h.body.kind === "cta" && h.body.ziel === "belegify");
    console.log("    Body Produkt-Ping:", JSON.stringify(pingHit?.body));
    check(pingHit && pingHit.body.from_path === "/produkte", "Produkt-Klick per <a ping> gezaehlt");
    check(fremd.filter((u) => TRACKER.test(u)).length === 0, "auch danach keine Requests an Tag-Hosts");

    // DSE ohne IDs
    await page.goto(BASE + "/datenschutz");
    const dse = await page.textContent("main");
    check(dse.includes("Serverseitige Reichweitenmessung") && dse.includes("nach 25 Monaten"), "DSE: Reichweitenmessung vorhanden");
    check(dse.includes("Tracking-Cookies setzt diese Website nicht ein"), "DSE: Aussage 'keine Drittanbieter-Dienste' bleibt ohne IDs");
    check(!/Google Analytics|Meta Pixel|LinkedIn Insight|cc_consent/.test(dse), "DSE: keine Dienst-Abschnitte ohne IDs");
    await ctx.close();
  }
  await stoppe(server);

  // Ohne WEB_HIT_TOKEN: gar kein Aufruf an den Messpunkt
  server = await starte({ WEB_HIT_URL: MOCK_ENV.WEB_HIT_URL });
  {
    console.log("\n== Teil 1b: Build OHNE IDs, OHNE WEB_HIT_TOKEN");
    hits.length = 0;
    const { ctx } = await kontext(browser);
    const page = await ctx.newPage();
    for (const p of ["/", "/produkte"]) await page.goto(BASE + p, { waitUntil: "networkidle" });
    const r = await fetch(BASE + "/start?ziel=kontakt", { redirect: "manual" });
    check(r.status === 302, "Tuer leitet auch ohne Token weiter");
    await warte(1000);
    check(hits.length === 0, `ohne WEB_HIT_TOKEN null Aufrufe am Messpunkt (gesehen: ${hits.length})`);
    await ctx.close();
  }
  await stoppe(server);

  // ================= Teil 2: mit Test-IDs =================
  baue(IDS);
  server = await starte({ ...MOCK_ENV, ...IDS });
  {
    console.log("\n== Teil 2: Build MIT Test-IDs (G-TEST000000 u. a.)");
    // a) Alle akzeptieren
    let { ctx, fremd } = await kontext(browser);
    let page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await warte(800);
    check(await page.locator("[data-consent-banner]").isVisible(), "Banner sichtbar");
    const knoepfe = await page
      .locator("[data-consent-banner] button")
      .evaluateAll((b) => b.map((x) => [x.textContent, x.className]));
    check(
      JSON.stringify(knoepfe.map((k) => k[0])) === '["Alle akzeptieren","Nur notwendige","Einstellungen"]',
      `drei Schaltflaechen auf erster Ebene: ${knoepfe.map((k) => k[0]).join(" | ")}`,
    );
    check(new Set(knoepfe.map((k) => k[1])).size === 1, "Schaltflaechen gleichwertig gestaltet");
    check(fremd.filter((u) => TRACKER.test(u)).length === 0, `vor Klick null Requests an googletagmanager/facebook/linkedin (Fremd gesamt: ${fremd.length})`);
    check(await page.evaluate(() => typeof window.gtag === "undefined"), "vor Klick kein gtag");
    await page.getByRole("button", { name: "Einstellungen", exact: true }).click();
    const haken = await page.locator('[data-consent-banner] input[type="checkbox"]').evaluateAll((b) => b.map((x) => [x.checked, x.disabled]));
    check(JSON.stringify(haken) === "[[true,true],[false,false],[false,false]]", `kein Vorab-Haken, Notwendig fest an: ${JSON.stringify(haken)}`);
    await page.getByRole("button", { name: "Alle akzeptieren" }).click();
    await warte(1500);
    const nach = fremd.filter((u) => TRACKER.test(u));
    console.log("    Requests nach 'Alle akzeptieren':", JSON.stringify(nach));
    check(nach.some((u) => u.includes("googletagmanager.com/gtag/js?id=G-TEST000000")), 'nach "Alle akzeptieren": gtag.js (GA4)');
    check(nach.some((u) => u.includes("connect.facebook.net")), 'nach "Alle akzeptieren": Meta Pixel');
    check(nach.some((u) => u.includes("licdn.com")), 'nach "Alle akzeptieren": LinkedIn Insight');
    check((await page.locator("[data-consent-banner]").count()) === 0, "Banner danach verborgen");
    const gespeichert = await page.evaluate(() => JSON.parse(localStorage.getItem("cc_consent")));
    check(gespeichert?.v === 1 && gespeichert.statistik && gespeichert.marketing && gespeichert.ts, `cc_consent gespeichert: ${JSON.stringify(gespeichert)}`);
    const dl = await page.evaluate(() => (window.dataLayer || []).map((a) => Array.from(a)));
    check(JSON.stringify(dl.filter((a) => a[0] === "consent").map((a) => a[1])) === '["default","update"]', "Consent Mode: zuerst default denied, dann update");
    check(JSON.stringify(dl.find((a) => a[0] === "consent" && a[1] === "default")?.[2]) === JSON.stringify({ ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" }), "default: alles denied");
    check(JSON.stringify(dl.filter((a) => a[0] === "config").map((a) => a[1])) === '["G-TEST000000","AW-1234567890"]', "config GA4 und AW");
    check(!JSON.stringify(dl).includes("anonymize_ip"), "kein anonymize_ip");

    // Tuer-Klicks (Navigation unterbunden, damit die Ereignisse pruefbar bleiben)
    await page.goto(BASE + "/produkte", { waitUntil: "networkidle" });
    await page.evaluate(() => {
      window.__fbq = [];
      const orig = window.fbq;
      window.fbq = function (...a) { window.__fbq.push(a); return orig.apply(this, a); };
      document.addEventListener("click", (e) => { if (e.target.closest("a[href^='/start']")) e.preventDefault(); }, true);
    });
    await page.locator("nav a", { hasText: "Partner werden" }).first().click();
    await page.locator("main a", { hasText: "Anfrage stellen" }).first().click();
    const ev = await events(page);
    const fb = await page.evaluate(() => window.__fbq.map((a) => a[1]));
    check(ev.some((e) => e[0] === "sign_up"), 'Tuer-Klick "Partner werden" -> GA4 sign_up');
    check(ev.some((e) => e[0] === "generate_lead"), "Tuer-Klick Kontakt -> GA4 generate_lead");
    check(JSON.stringify(fb) === '["Lead","Lead"]', `Tuer-Klicks -> Meta Lead (${JSON.stringify(fb)})`);

    // Kontaktformular gesendet -> generate_lead (API abgefangen, keine Mail)
    await page.route(BASE + "/api/contact", (r) => r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }));
    await page.goto(BASE + "/kontaktanfrage", { waitUntil: "networkidle" });
    await page.fill("#firmenname", "Testfirma E2E");
    await page.fill("#email", "e2e@example.org");
    await page.selectOption("#produkt", { index: 1 });
    await page.locator('form button[type="submit"]').click();
    await page.getByText("Vielen Dank!").waitFor();
    const evForm = await events(page);
    check(evForm.some((e) => e[0] === "generate_lead" && JSON.stringify(e[1]) === '{"form":"kontakt"}'), "Kontaktformular gesendet -> generate_lead");
    check(!JSON.stringify(evForm).includes("Testfirma") && !JSON.stringify(evForm).includes("e2e@example.org"), "keine Formularinhalte im Ereignis");

    await page.reload({ waitUntil: "networkidle" });
    await warte(800);
    check((await page.locator("[data-consent-banner]").count()) === 0, "nach Reload kein Banner");
    check(await page.evaluate(() => typeof window.gtag === "function"), "nach Reload Tags geladen");

    // Footer-Link oeffnet Dialog, Widerruf -> Reload -> keine Tracker mehr
    await page.getByRole("button", { name: "Cookie-Einstellungen" }).click();
    check(await page.locator("[data-consent-banner]").isVisible(), 'Footer-Link "Cookie-Einstellungen" oeffnet den Dialog');
    const wahl = await page.locator('[data-consent-banner] input[type="checkbox"]').evaluateAll((b) => b.map((x) => x.checked));
    check(JSON.stringify(wahl) === "[true,true,true]", "Einstellungen zeigen bisherige Wahl");
    fremd.length = 0;
    await Promise.all([page.waitForEvent("load"), page.getByRole("button", { name: "Nur notwendige" }).click()]);
    await warte(1500);
    check(fremd.filter((u) => TRACKER.test(u)).length === 0, "nach Widerruf (Seite neu geladen) keine Tag-Requests");

    // Portal-Bereich: kein Banner
    await page.evaluate(() => localStorage.clear());
    await page.goto(BASE + "/login", { waitUntil: "networkidle" });
    await warte(500);
    check((await page.locator("[data-consent-banner]").count()) === 0, "Partner-Login: kein Banner, keine Tags");

    // DSE mit IDs
    await page.goto(BASE + "/datenschutz", { waitUntil: "networkidle" });
    const dse = await page.textContent("main");
    check(
      ["Serverseitige Reichweitenmessung", "Einwilligungsverwaltung", "cc_consent", "Google Analytics 4", "Google Ads Conversion-Tracking", "Meta Pixel", "LinkedIn Insight Tag"].every((s) => dse.includes(s)),
      "DSE: A bis F gerendert",
    );
    check(!dse.includes("Tracking-Cookies setzt diese Website nicht ein") && dse.includes("nur mit Ihrer Einwilligung"), "DSE: Aussage passt sich an (Drittanbieter nur mit Einwilligung)");
    await ctx.close();

    // b) Nur notwendige
    ({ ctx, fremd } = await kontext(browser));
    page = await ctx.newPage();
    await page.goto(BASE + "/produkte", { waitUntil: "networkidle" });
    await warte(500);
    await page.getByRole("button", { name: "Nur notwendige" }).click();
    await warte(800);
    for (const p of ["/", "/unternehmen"]) await page.goto(BASE + p, { waitUntil: "networkidle" });
    await warte(800);
    check(fremd.filter((u) => TRACKER.test(u)).length === 0, `nach "Nur notwendige": null Tag-Requests (3 Seiten, Fremd gesamt: ${fremd.length})`);
    check((await page.locator("[data-consent-banner]").count()) === 0, "Banner bleibt weg");
    const c = await page.evaluate(() => JSON.parse(localStorage.getItem("cc_consent")));
    check(c && c.statistik === false && c.marketing === false, "cc_consent false/false");
    check((await ctx.cookies()).length === 0, "keine Cookies");
    await page.evaluate(() => document.addEventListener("click", (e) => { if (e.target.closest("a[href^='/start']")) e.preventDefault(); }, true));
    await page.locator("nav a", { hasText: "Partner werden" }).first().click();
    check(await page.evaluate(() => typeof window.gtag === "undefined" && typeof window.fbq === "undefined"), "track ohne Einwilligung ist No-op");
    await ctx.close();

    // c) nur Statistik
    ({ ctx, fremd } = await kontext(browser));
    page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await warte(500);
    await page.getByRole("button", { name: "Einstellungen", exact: true }).click();
    await page.locator('[data-consent-banner] label', { hasText: "Statistik" }).click();
    await page.getByRole("button", { name: "Auswahl speichern" }).click();
    await warte(1500);
    const t = fremd.filter((u) => TRACKER.test(u));
    check(t.some((u) => u.includes("gtag/js?id=G-TEST000000")), "nur Statistik: gtag.js geladen");
    check(!t.some((u) => /facebook|licdn/.test(u)), "nur Statistik: kein Meta/LinkedIn");
    const dl2 = await page.evaluate(() => (window.dataLayer || []).map((a) => Array.from(a)));
    check(JSON.stringify(dl2.filter((a) => a[0] === "config").map((a) => a[1])) === '["G-TEST000000"]', "nur Statistik: kein AW-config");
    const upd = dl2.find((a) => a[0] === "consent" && a[1] === "update")?.[2];
    check(upd?.analytics_storage === "granted" && upd?.ad_storage === "denied", "update: analytics granted, ads denied");
    await ctx.close();
  }
  await stoppe(server);
} finally {
  await browser.close();
  mock.close();
}

console.log(`\nErgebnis: ${ok} OK, ${fehler} Fehler`);
process.exit(fehler === 0 ? 0 : 1);
