# Smart Signals · Design Foundation

**Stand:** 2026-05-14
**Maintainer:** Rainer Roloff (Comms Connect GmbH)
**Scope:** Marketing-Pages, Produkt-Pages, Karriere, Kontaktanfrage. Portal- und Login-Bereiche folgen einem eigenen Dark-Theme (siehe `src/app/portal`, `src/app/login`).

---

## 1. Strategy

Smart Signals ist B2B-Mittelstand: Konnektivität, Mobilfunkkosten, Mitarbeiter-Benefits, 5G-Konnektivität. Käufer sind Einkäufer, IT-Leiter, HR-Verantwortliche. Sie kaufen Vertrauen, klare Konditionen und schnelle Umsetzung, nicht Spielereien.

Daraus folgt:

- **Vertrauen vor Verspieltheit.** Solides Blau als Anker, niemals Gold-Gradienten oder grelle Heros.
- **Eine Stimme, ein Look.** Konsistent, auch wenn jede Produktseite einen eigenen Rhythmus hat.
- **B2B-Sie.** Auf allen kundenseitigen Routen. Karriere und Partner-Recruiting dürfen Du nutzen.
- **Substanz statt Schmuck.** Keine Gradient-Texte, keine identischen Karten-Grids, keine Glass-Effekte als Deko.

---

## 2. Color System

Vorher waren fünf Primärfarben im Spiel: Blau `#2563EB` (Token), Grün `#16A34A` (Buttons), Gold `#D4A843` (Karriere), Blau `#2563EB` (Kontaktformular), Türkis `#00C896` (AnimatedText). Das wurde auf zwei Farben konsolidiert.

| Token | OKLCH | Hex (Fallback) | Verwendung |
|---|---|---|---|
| `--brand` | `oklch(60% 0.16 230)` | `#2D7FF9` | Primäre Marken-Identität, Headlines-Akzente, Links, Eyebrows, Active-States, Icon-Backgrounds |
| `--brand-hover` | `oklch(54% 0.16 230)` | `#1F66D6` | Hover für Brand-Elemente |
| `--accent` | `oklch(72% 0.18 50)` | `#F08A3A` | Primärer Call-to-Action, Submit-Buttons, Pill-CTAs |
| `--accent-hover` | `oklch(64% 0.18 50)` | `#D97320` | Hover für Accent-CTAs |
| `--accent-soft` | `oklch(96% 0.04 50)` | `#FFF1E5` | Soft-Backgrounds (Tags, Success-States, Form-Selected) |
| `--success` | `oklch(64% 0.15 150)` | `#16A34A` | Reserviert für semantische Bestätigungen (Submit-Erfolgsmeldung). Nicht als Brand verwenden. |
| `--text-primary` | `oklch(20% 0.03 250)` | `#0F172A` | Headlines, Body-Text |
| `--text-secondary` | `oklch(48% 0.02 250)` | `#475569` | Lead-Text, Beschreibungen |
| `--text-muted` | `oklch(70% 0.02 250)` | `#94A3B8` | Placeholders, Captions |
| `--surface` | `#F8FAFC` | Subtile Section-Backgrounds (gerade Sektionen) |
| `--base` | `#FFFFFF` | Hauptbackground |
| `--border` | `#E2E8F0` | Karten, Inputs, Trennlinien |

**Karriere-Page:** behält dunklen Background (`#050A14`, `#0A1628`, `#111D33`), tauscht aber Gold-Akzente gegen `--brand`. Keine Gradient-Buttons mehr.

**Verboten:**
- Drittfarben außerhalb der Tokens (z. B. Türkis, Gold).
- Gradient-Buttons (Background `gradient-to-r`). Solid only.
- Gradient-Text auf Headlines.
- `hover:opacity-90` als Lazy-Hover. Stattdessen echte Farbstufe via `--brand-hover` / `--accent-hover`.

---

## 3. Typography

**Stack:** Inter (Self-hosted via `next/font/google`), Fallback `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

| Token | Size / Line-Height | Use |
|---|---|---|
| `display` | `clamp(2.25rem, 5vw, 3.75rem)` / 1.08 | H1 in Hero |
| `h1` | `text-4xl sm:text-5xl` / 1.1 | Page H1 außerhalb Hero |
| `h2` | `text-2xl sm:text-3xl` / 1.2 | Section-Headlines |
| `h3` | `text-base sm:text-lg` / 1.3 | Card-Titles |
| `lead` | `text-lg` / 1.6 | Lead-Paragraph unter H1 |
| `body` | `text-sm` (UI) / `text-base` (Long-Form) / 1.6 | Standard |
| `eyebrow` | `text-xs uppercase tracking-widest font-semibold` | Sektions-Label, in `--brand` |
| `caption` | `text-xs` / 1.5 | Disclaimer, Footer-Mikrokopie |

Weights: 400, 500, 600, 700. Keine Italic. Keine Dekorations-Schriften.

---

## 4. Spacing Scale

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96` (Pixel). Tailwind-Äquivalent: `1 / 2 / 3 / 4 / 6 / 8 / 12 / 16 / 24`.

**Section-Rhythmus (variation, kein monotones `py-16`):**

| Section-Typ | Padding |
|---|---|
| Hero | `py-32 md:py-40` |
| Problem / Lösung | `py-20 md:py-24` |
| Highlights / Features | `py-24 md:py-28` |
| Use Cases / Steps | `py-20 md:py-24` |
| Calculator / Tool | `py-24` |
| CTA-Closer | `py-32 md:py-40` |

Mindestens **eine** Section pro Page bricht den Rhythmus (z. B. Full-Bleed-Hero ohne Padding, oder Calculator direkt nach Hero ohne Section-Gap).

---

## 5. Motion

**Engine:** Framer Motion 12. Honor `prefers-reduced-motion` global (siehe `globals.css`) und in Framer-Variants via `useReducedMotion()`.

**Default-Recipe (Krehel-Style):**
```ts
const enter = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }, // ease-out-expo
};
```

**Duration-Bandbreite:** 150–300 ms für State-Changes (Hover, Focus, Click), 300–500 ms für Entry-Animations (Fade-In, Reveal). Keine 800 ms+.

**Stagger:** 60–80 ms zwischen Geschwister-Elementen. Maximal 5 Elemente stagger, danach gleichzeitig.

**Verboten:**
- Bounce / Elastic / `easeInOut` für UI.
- Animationen ohne Reduced-Motion-Fallback.
- Dead Animations (`initial == animate`).
- Page-Wipes (Full-Screen-Overlays).

---

## 6. Elevation

Drei Stufen, kein mehr:

| Token | Tailwind | Use |
|---|---|---|
| `shadow-xs` | `shadow-sm` | Cards in Rest-State |
| `shadow-sm` | `shadow-md` | Cards on Hover, Calculator |
| `shadow-md` | `shadow-lg` | Floating-Elements, Modals (selten) |

Keine `shadow-2xl` Drop-Shadows. Keine farbigen Shadows (`shadow-[#16A34A]/20`), außer bewusst als Accent-Glow auf primären CTAs und nur im Hover.

---

## 7. Layout Variety (Anti-Card-Grid-Monotonie)

Smart Signals hat fünf Marketing-Pages mit jeweils ähnlicher Aufgabe (Problem, Lösung, Features, CTA). Sechs identische 4-Card-Grids waren der vorherige Status quo. Künftig wird Layout-Vielfalt erzwungen:

**Layout-Patterns (mindestens drei pro Repo verwendet):**

1. **3-Card-Grid (Standard, einmal pro Page max):** `grid-cols-1 sm:grid-cols-3`.
2. **Asymmetrisches Hero-Mosaik:** ein großes Visual + 2–3 Stat-Cards rechts.
3. **Numbered Editorial-Steps:** vertikale Liste mit großen Nummern (`01 / 02 / 03`), nicht horizontale Grids.
4. **Spec-Table:** für tabellarische Daten (Preise, Tarife, Vergleiche). B2B-tauglich.
5. **Split-with-Image:** 2-Column, links Text, rechts Image. **Max einmal pro Page.**
6. **Full-Bleed-Image-Hero mit Overlay-Text:** für Produkt-Pages, die ein Visual brauchen.
7. **Calculator-First:** Interaktives Element direkt nach Hero (siehe `/mitarbeitervorteile`).

**Regel:** Auf einer Page maximal **zwei gleichartige Patterns**. Mindestens **drei verschiedene Patterns** pro Marketing-Page.

---

## 8. Voice & Copy

- **Sie-Form** auf: `/`, `/mitarbeitervorteile`, `/mobilfunkkosten`, `/5g-koffer`, `/unternehmen`, `/kontaktanfrage`, `/impressum`, `/datenschutz`.
- **Du-Form** auf: `/karriere`, `/partner`, `/portal/*`, `/login` (alles intern oder Recruiting-Kontext).
- Keine Em-Dashes (`—`), keine En-Dashes (`–`) als Satzersatz. Ausnahme: numerische Bereiche (`0–50`, `100–500`).
- Keine zwei Anredeformen in derselben Page oder Komponente.
- Stimme: nüchtern, sachlich, kompetent. Keine Superlative, keine Floskeln („Sie werden begeistert sein"). Keine Emojis im Copy.

---

## 9. Anti-Patterns (Repo-spezifisch)

- **Identische Card-Grids in jeder Sektion.** Mindestens ein Layout-Bruch pro Page (siehe §7).
- **Glassmorphism als Default-Navbar.** Solid `bg-white` plus `border-b`.
- **Gradient-Text auf Headlines.** `text-transparent bg-clip-text` → verboten.
- **Pure-Hex statt OKLCH-Token.** Direktes `bg-[#16A34A]` ohne Tokenisierung. Erlaubt nur in Legal-Pages (Datenschutz, Impressum) als Übergang.
- **Mehr als zwei Schriftfamilien.** Eine Familie pro Page reicht.
- **Animationen ohne Reduced-Motion-Fallback.** WCAG 2.3.3 ist MANDATORY.
- **Drei-Farben-Schreierei:** Blau + Grün + Gold + Türkis auf einer Site. Eine Marke, zwei Farben.
