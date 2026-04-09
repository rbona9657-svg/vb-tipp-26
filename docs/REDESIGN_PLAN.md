# Ziccer Tipper — Bet365-Inspired Redesign Plan

> Etalon: bet365.com — Never Ordinary
> Cél: prémium, izgalmas, sportos, magas minőségű look & feel.
> UX megtartva, csak a **vizuális nyelv + mozgás + sűrűség** változik.

---

## 1. Mit adaptálunk a bet365-ből

| Bet365 DNA | Mit jelent nálunk |
|---|---|
| **Mély sportos zöld + lime sárga** | Új elsődleges paletta: deep forest green + electric yellow accent |
| **Sűrű információ, de olvasható** | Több adat card-onként, de tabularis számok és szigorú hierarchia |
| **Számok (odds) a főszereplők** | Pontok, scoreline, countdown → mono font + nagy kontraszt |
| **Live indikátorok (pulzáló piros pötty)** | Élő meccsekhez, beadási határidő előtti countdown-okhoz |
| **Horizontális scroll pills + szegmentált tabok** | Csoport szűrők, forduló navigáció |
| **Gyors tap feedback, skála animációk** | Minden interaktív elem press-state |
| **Odds flash animáció (zöld fel / piros le)** | Pontváltozás és ranglista pozíció change highlight |
| **Cutout atléta művészet + duotone** | Opcionális hero illusztrációk a landing page-re |
| **Sticky headerek mindenhol** | Kategória szűrő lebeg a meccsek fölött |
| **"Never Ordinary" bold tipográfia** | Headline-okban 800-900 weight, tight tracking |

---

## 2. Új Design Tokenek

### 2.1 Szín paletta

```css
/* ─── Primary: Stadium Green ─── */
--green-950: #021912;   /* deepest bg */
--green-900: #032B1E;   /* app bg */
--green-800: #054030;   /* surfaces */
--green-700: #076344;   /* hover */
--green-600: #0A8555;   /* primary */
--green-500: #10B86E;   /* bright accent */
--green-400: #34D98F;   /* live success */

/* ─── Accent: Electric Yellow (the "odds pop") ─── */
--yellow-400: #FFE14A;  /* hero accent */
--yellow-500: #FFCC00;  /* primary CTA */
--yellow-600: #E6B800;  /* hover */
--yellow-glow: rgba(255, 204, 0, 0.40);

/* ─── Status ─── */
--live-red: #FF3B3B;    /* live / countdown */
--live-red-glow: rgba(255, 59, 59, 0.35);
--up: #10B86E;          /* odds/rank up */
--down: #FF6B6B;        /* odds/rank down */

/* ─── Neutrals (warm, never pure) ─── */
--ink-0:   #FFFFFF;
--ink-50:  rgba(255,255,255,0.96);   /* primary text on dark */
--ink-100: rgba(255,255,255,0.72);   /* secondary */
--ink-200: rgba(255,255,255,0.54);   /* tertiary */
--ink-300: rgba(255,255,255,0.38);   /* disabled */
--ink-400: rgba(255,255,255,0.20);   /* borders strong */
--ink-500: rgba(255,255,255,0.10);   /* borders subtle */
--ink-600: rgba(255,255,255,0.05);   /* hover tints */

/* ─── Surfaces (layered) ─── */
--surface-0: var(--green-950);       /* page */
--surface-1: var(--green-900);       /* cards */
--surface-2: var(--green-800);       /* card hover / elevated */
--surface-3: #0A4A34;                /* modals */
```

**Miért ez**: A mély zöld olyan stadion-érzést ad, ami a sport világához tartozik, a sárga pedig olyan instant fókusz-pont, mint a bet365-ben az odds. Megtartjuk a light mode toggle-t is, de az **alapértelmezett dark**, mert a prémium bet-érzés sötét.

### 2.2 Tipográfia

```css
/* Fő: változatlan Poppins, de szigorúbb súlyokkal */
--font-display: "Poppins", sans-serif;   /* 800-900 weight only */
--font-ui: "Poppins", sans-serif;         /* 500-700 */
--font-mono: "IBM Plex Mono", mono;       /* számok, score, odds, pontok */

/* Scale — szigorú step-up */
--text-hero:   56px/1.0/-1.5px  /* 800w */
--text-h1:     36px/1.1/-0.8px  /* 800w */
--text-h2:     24px/1.2/-0.4px  /* 700w */
--text-h3:     18px/1.3/-0.2px  /* 700w */
--text-body:   14px/1.5/0       /* 500w */
--text-small:  12px/1.4/0       /* 500w */
--text-micro:  10px/1.2/0.4px   /* 700w UPPERCASE */

/* Odds/szám formázás */
.odds { font: 700 20px/1 var(--font-mono); font-variant-numeric: tabular-nums; }
.score { font: 800 32px/1 var(--font-mono); font-variant-numeric: tabular-nums; }
```

### 2.3 Sugarak, árnyékok, térköz

```css
--radius-xs: 4px;   /* pills belső */
--radius-sm: 6px;   /* odds button */
--radius-md: 10px;  /* cards */
--radius-lg: 14px;  /* hero cards */
--radius-xl: 20px;  /* modals */
--radius-full: 999px;

/* Árnyékok — 2-layer glow, nem puha-puha */
--shadow-flat:    none;
--shadow-card:    0 0 0 1px var(--ink-500), 0 8px 24px -8px rgba(0,0,0,0.5);
--shadow-hover:   0 0 0 1px var(--ink-400), 0 12px 32px -8px rgba(0,0,0,0.6);
--shadow-glow-y:  0 0 0 1px var(--yellow-500), 0 0 24px var(--yellow-glow);
--shadow-glow-g:  0 0 0 1px var(--green-500), 0 0 24px rgba(16, 184, 110, 0.3);
--shadow-glow-r:  0 0 0 1px var(--live-red), 0 0 20px var(--live-red-glow);

/* Sűrűbb térköz — bet365-szerű info density */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
```

---

## 3. Komponens változások (konkrét)

### 3.1 Header
**Előtte:** fehér háttér, kicsi logó, textes nav
**Utána:**
- Sötét zöld sticky header magas (56px)
- Bal: logó + "ZICCER TIPPER" bold display font
- Közép: **live ticker sáv** — vízszintesen futó következő 3 meccs vagy "Élő: GER 2-1 BRA 67'" (ha lenne élő eredmény)
- Jobb: felhasználói squad pill (logó + név + pont) → kattintható
- Alatt 1px-es zöld→átlátszó gradient elválasztó

### 3.2 Bottom Nav
**Előtte:** vékony, kicsi ikonok, arany aláhúzás
**Utána:**
- 72px magas, mély zöld háttér
- 5 ikon + label, az aktívnak **egész cellát kitöltő** yellow glow háttér (mint a bet365 tab bar)
- Ikonok vastagabbak (stroke-width: 2.5)
- Safe-area kompatibilis

### 3.3 Match Card (a legnagyobb változás)
**Előtte:** venue gradient hero + kvázi statikus text
**Utána:**
```
┌─────────────────────────────────────────┐
│ 🔴 LIVE  ·  Csoport A  ·  Jún 11, 21:00 │  ← meta row, small caps
├─────────────────────────────────────────┤
│                                         │
│   🇲🇽 Mexikó            2 - 1  🇿🇦 RSA  │  ← team row, score mono
│                                         │
├─────────────────────────────────────────┤
│  ┌────┐  ┌────┐  ┌────┐                 │
│  │ 1  │  │ X  │  │ 2  │   ← odds-style tippelési gombok
│  │2.10│  │3.40│  │2.85│      (a szorzók a round multipliers)
│  └────┘  └────┘  └────┘                 │
├─────────────────────────────────────────┤
│ ▸ Részletes tipp (corners, yellows)     │  ← expand
└─────────────────────────────────────────┘
```
- Border: 1px solid var(--ink-500), 10px radius
- Hover: emelkedik, border → yellow glow
- Live meccsnél a piros pötty **pulzál**
- Score szám: IBM Plex Mono 32px 800w
- Az "odds-style" gombok a bet365 tipikus pattern: a szám mindig ott van, selected state = yellow háttér, fekete szöveg

### 3.4 Odds Button (vadonatúj komponens)
```
 ┌──────────┐
 │    1     │  ← option (1/X/2)
 │  2.10    │  ← multiplier or potential points
 └──────────┘
```
- Default: surface-2 bg, 1px border, ink-100 text
- Hover: surface-3 bg
- Selected: **yellow-500 bg, green-950 text, glow shadow**
- **Flash animation**: amikor a pontszám változik, 600ms zöld/piros highlight fade

### 3.5 Live Indicator
```css
.live-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--live-red);
  box-shadow: 0 0 0 0 var(--live-red-glow);
  animation: pulse 1.5s ease-out infinite;
}
@keyframes pulse {
  0%   { box-shadow: 0 0 0 0 rgba(255,59,59,0.6); }
  70%  { box-shadow: 0 0 0 8px rgba(255,59,59,0); }
  100% { box-shadow: 0 0 0 0 rgba(255,59,59,0); }
}
```

### 3.6 Leaderboard
**Előtte:** lapos lista
**Utána:**
- Top 3: **podium hero card** a tetején (arany/ezüst/bronz gradient border + avatar + név + nagy pont)
- A többiek: dense lista, trend arrow animált (belövődik balról amikor változik)
- Rank change: zöld fel / piros le háttér highlight, fade ki 1s alatt
- Saját sor: sticky az alján, yellow accent border

### 3.7 Countdown (hero)
- **Digitális tabló stílus**: 4 nagy box, mono font 72px, sárga számjegyek
- A másodperc pergőanimáció (flip clock-szerű)
- Alatta "Jún 11, 2026 · Estadio Azteca" sárga live-dot-tal

### 3.8 Landing Hero
**Előtte:** logo + text + CTA
**Utána:**
- Full-bleed sötét zöld háttér **statikus noise texture** (mint bet365 creative)
- Bal: cutout athlete duotone illusztráció (zöld + sárga) — lehet SVG vagy placeholder
- Jobb: headline + sub + CTA
- Bottom: **marquee scroll** a 48 csapat nevével/zászlóival (CSS animation)
- Headline: "NEVER ORDINARY" stílus → **"TIPPELJ. NYERJ. BECSAPJ."** (szójáték: becsap = cheating + score)

---

## 4. Animáció guide

| Elem | Animáció | Időzítés |
|---|---|---|
| Page enter | fade-up 12px | 400ms ease-out |
| Card hover | translateY(-2px) + shadow-hover | 150ms ease-out |
| Button press | scale(0.96) | 100ms ease-out |
| Odds select | scale(1.05) → 1.0 + glow | 250ms ease-out |
| Score flash (up) | bg green-500 → transparent | 600ms ease-out |
| Rank change | translateY + bg flash | 500ms ease-out |
| Tab switch | slide underline | 200ms ease |
| Modal open | fade + scale(0.96→1.0) | 300ms ease-out |
| Live dot | pulse box-shadow | 1.5s infinite |
| Marquee | translate -100% | 40s linear infinite |
| Countdown digit | flip rotation | 500ms ease-in-out |
| Stagger children | 40ms per item | up to 400ms total |

**Könyvtár választás**: Nem új dependency. Mindent natív Tailwind + `@keyframes` + CSS transitions, maximum `framer-motion` ha a flip clock kell.

---

## 5. Oldalanként mit változtatunk

### Landing (`/`)
- Full dark green bg, noise texture
- Hero: cutout athlete duotone + "TIPPELJ. NYERJ. BECSAPJ." + yellow CTA
- 48 team marquee scroll
- Hogyan működik: 3 lépés podium-stílus (stagger)
- Csapat feature: valódi adat kinézet a current team card helyett, live preview feel
- Csapatverseny leaderboard: top 3 podium
- Registration form: dark glass card, yellow CTA nagy
- Footer: minimal

### Dashboard (`/dashboard`)
- Hero: countdown flip clock + live ticker a következő meccsekről
- "Your predictions" streak card: pontgyűjtés progress, yellow glow
- Next match card: odds button style, az 1-X-2 ott rögtön tippelhető
- Top 3 leaderboard preview podium
- Stats grid: meccsek, pontok, streak — mind monospace

### Matches (`/matches`)
- Sticky filter: date picker + 12 group pills horizontal scroll
- Match list: dense card, odds-button style prediction UI inline
- Filter chip: "Még nem tippeltem" / "Élő" / "Hamarosan"
- Infinite scroll / pagination

### Tournament (`/tournament`)
- Team picker: cutout flag avatars with glow on select
- Progress bar a bejelölt mezők alapján
- "Lock in" nagy yellow CTA bottom sticky

### Leaderboard (`/leaderboard`)
- Tab: Players / Squads (szegmentált, yellow indicator)
- Podium top 3 animált belövődéssel
- Dense list a többieknek
- Saját sor sticky bottom highlighted

### Scoring (`/scoring`)
- Infographic stílusú: ikonok + pontok nagy mono számokban
- Multiplier visualization: bar chart-szerű

---

## 6. Implementáció fázisai

### Fázis 1 — Design tokenek (1 commit)
- `app/globals.css` új tokenekkel
- `tailwind.config` bővítés
- Dark mode = default
- Fontok változatlanok

### Fázis 2 — Core primitíve komponensek (1 commit)
- Új `OddsButton`
- Új `LiveDot`
- Új `FlipCountdown`
- `Button` variant: `yellow-primary` a bet365 CTA
- `Card` új shadow-rendszer

### Fázis 3 — Header + Bottom Nav (1 commit)
- Live ticker header
- 72px-es filled active bottom nav
- Sticky scroll behavior

### Fázis 4 — Match Card redesign (1 commit)
- Odds-button layout
- Live indicator
- Score flash animation
- Meta row

### Fázis 5 — Dashboard + Leaderboard (1 commit)
- Flip clock countdown
- Podium hero komponens
- Rank change animation

### Fázis 6 — Landing hero (1 commit)
- Marquee scroll
- Cutout illusztráció (SVG placeholder)
- "NEVER ORDINARY" stílus headline

### Fázis 7 — Matches, Tournament, Scoring polish (1 commit)
- Filter chips
- Team picker glow
- Infographic scoring

### Fázis 8 — Mozgás polish (1 commit)
- Stagger animációk
- Score flash mikrolépések
- Transition tempo finomhangolás

**Becsült összméret**: ~1500 LoC változás, 0 új runtime dependency (csak tailwind + CSS).

---

## 7. Mit NEM változtatunk

- **URL struktúra** — routing marad
- **Backend / API** — Drizzle/Neon érintetlen
- **PWA / manifest** — theme_color frissül csak (#032B1E)
- **UX flow** — regisztráció → csapat → tippelés változatlan
- **Magyar szövegek** — nyelv ugyanaz
- **TrollFoci név** — Ziccer Tipper marad
- **Lucide ikonok** — ugyanaz a library

---

## 8. Kockázatok és trade-off

| Kockázat | Mitigation |
|---|---|
| Sötét téma nehezebb accessibility-wise | WCAG AA ellenőrzés minden kontrasztra |
| Animációk túl sokan = lag mobilon | `prefers-reduced-motion` + GPU-only transforms |
| Bet365 túl commercial / gambling vibe | "NEVER ORDINARY" → "TIPPELJ.NYERJ.BECSAPJ." saját twist, nincs pénz motívum |
| Yellow + green clash light mode-ban | Light mode outline-changes only, accent marad |
| Flip clock SSR-rel | Client-only component, skeleton placeholder |

---

## 9. Vizuális előnézet

Lásd: `docs/redesign-preview.html` — nyisd meg böngészőben, ez egy interaktív statikus preview az új design nyelvről. Mutat:
- Színpaletta
- Tipográfia
- Match card (odds-button style)
- Live ticker
- Podium leaderboard
- CTA button-ök
- Flip countdown animáció mintája

---

## 10. Next step

Ha a terv tetszik → **Fázis 1 indul**: új design tokenek, dark-first, majd fázisról-fázisra build-verify-deploy loop.
