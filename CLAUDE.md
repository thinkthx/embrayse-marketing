# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static single-page marketing site for Embrayse, aged care food services software. No build tools, no framework. Vanilla HTML/CSS/JS. Hosted via Netlify from Azure DevOps.

## Running locally

```bash
# Live reload (preferred):
npx live-server .

# Or simple static server:
python3 -m http.server 8080
```

## Figma → Code → Playwright workflow

This is the core development loop. Follow it for every section:

1. **Reference Figma** — Screenshot the target section from Figma (node `8442:1777` in `Embrayse Marketing 2027`) using Figma Console MCP tools. Compare against the Figma design throughout.
2. **Use pre-exported assets** — All assets are already exported in `assets/`. Most are @2x, some @4x. Size `<img>` elements to match their Figma frame dimensions (not the retina pixel dimensions).
3. **Write HTML** — Semantic, accessible markup. Mobile-first structure.
4. **Write CSS** — Mobile-first, using the design tokens below. Add responsive breakpoints.
5. **Verify with Playwright** — Serve locally, screenshot at key viewports (375px, 768px, 1024px, 1440px), compare against Figma. Iterate until accurate.
6. **Commit** — One commit per completed section.

**Stay true to the Figma design.** Where copy is missing from Figma, draft it based on brand context — the user will review later.

## Architecture

```
./
├── index.html              # Single-page marketing site
├── styles.css              # All styles (mobile-first)
├── script.js               # Nav toggle, scroll reveal, accordions, carousel
├── legal.css               # Legal page styles (terms, privacy)
├── assets/                 # All pre-exported from Figma (flat directory)
│   ├── embrayse-logo-black.png
│   ├── Hero-Screen.png, screen 1 - orders.png, Menu iPad.png
│   ├── Section-HeroImage-TVDiningRoom.jpg, Section-HeroImage-People.jpg
│   ├── Mission brisbane-bg 1.jpg, paper-sheet-redacted.jpg
│   ├── Customer Tile *.png, Customer *.png (logos)
│   ├── integrations *.png (partner logos)
│   ├── Profile *.png (testimonial photos)
│   ├── Feedback *.png (dashboard + surveys)
│   ├── eMealsPhone *.png (mobile app mockups)
│   ├── MenuPlanner Image.png
│   └── Operational Intelligence - *.png (carousel screenshots)
├── release-notes/          # Product release notes (index + per-release pages)
│   ├── index.html          # Listing of all releases, grouped by year
│   ├── release-notes.css   # Release-notes-specific styles
│   ├── {version-slug}.html # e.g. 2026-3.html, one per release
│   └── assets/{version}/   # Screenshots scoped per release
├── terms-of-service/
│   └── index.html          # Terms of Service
├── privacy-policy/
│   └── index.html          # Privacy Policy
├── docs/
│   └── zoho-bookings-theme.css  # CSS for Zoho Bookings widget (paste into Zoho admin)
└── .claude/
    └── commands/            # Claude Code skills
        ├── create-release-note.md
        ├── write-embrayse-copy.md
        └── embrayse-brand-narrative.md
```

## Release notes

Product release notes live under `release-notes/`. URL pattern when served:

- `/release-notes/` — listing page (all releases grouped by year, newest first)
- `/release-notes/{version-slug}` — individual release (e.g. `/release-notes/2026-3`)

Each release page loads the shared `../styles.css` plus `release-notes.css` so it inherits all design tokens and matches the marketing site style. Release pages use a **minimal nav** (logo + All Releases + Help) rather than the full marketing nav, and end with a "Book your demo" CTA.

**Creating a new release:** Use the `/create-release-note` slash command. It accepts a version, title, feature bullets (with `[screenshot: filename]` markers), and a fixes list, then generates the HTML page, copies screenshots into the right folder, and updates the index. See `.claude/commands/create-release-note.md` for input format.

## Figma source

- **File:** `Embrayse Marketing 2027`
- **Key:** `644Qx9sX4DgyoZAW5XqLU8`
- **Root node:** `8442:1777` (1440×13991px)
- **Design width:** 1440px, content area ~1180px

## Design tokens

```css
/* Typography */
--font-heading: 'Pridi', serif;       /* h1-h4 */
--font-body: 'Inter', sans-serif;     /* body, UI, buttons */
--font-quote: 'PT Serif', serif;      /* testimonial quotes */

/* Font scale */
--text-h1: 72px max;    /* Pridi 600, clamp caps at 1180px viewport — hero only */
--text-h2: 52px max;    /* Pridi SemiBold, line-height 48px */
--text-h3: 40px;        /* Pridi SemiBold, line-height 44px */
--text-body-lg: 22px;   /* Inter, line-height 28px */
--text-body: 17px;      /* Inter */
--text-body-sm: 15px;   /* Inter */
--text-caption: 14px;   /* Inter */
--text-kicker: 14px;    /* Inter Bold, uppercase, letter-spacing 2px */

/* Colors */
--brand: #CF4967;           /* primary pink/red */
--brand-deep: #a6354f;      /* hover states */
--ink: #19161B;             /* near-black text */
--muted: #5F5863;           /* secondary text */
--paper: #F7F3F6;           /* light pinkish background */
--white: #FFFFFF;
--border-light: #E5E5E5;    /* card borders */

/* Layout */
--content-max: 1180px;
--radius: 16px;
--radius-sm: 12px;
```

## Icons

All icons use **HugeIcons free stroke set** via CDN (`hgi-stroke-rounded`). No custom SVG icon files needed.

Key icon names used in the design:
- Challenge pain points: `pencil-edit-02`, `computer-remove`, `brain-02`, `unhappy`
- Challenge value cards: `shield-01`, `tablet-01`, `user-circle`
- Compliance cards: `audit-01`, `shield-user`, `database-locked`
- Pricing steps: `calendar-03`, `wrench-01`, `rocket-02`
- Book demo: `calendar-05`, `globe`, `clock-01`

## Typography

- **Pridi** (Google Fonts) — all headings. Serif, weights 600–700.
- **Inter** (Google Fonts) — body, UI, buttons, kickers.
- **PT Serif** (Google Fonts) — testimonial quotes only.

## Page sections (top → bottom)

1. Nav (sticky, logo + Benefits/Success Stories/Pricing + CTA)
2. Hero (headline + subtitle + CTA + product screenshot)
3. Customer logos strip
4. The Challenge (pain points + quote + 3 value cards)
5. **hr** separator
6. Safety Features (exclusive accordions + screenshots)
7. Hero image — TV in dining room (full-bleed)
8. **hr** separator
9. Operational Intelligence (horizontal scroll carousel, 4 cards)
10. Resident Feedback + Service Surveys (insights dashboard + survey screenshots)
11. **hr** separator
12. Personalised Experience (phone mockups + exclusive accordions)
13. **hr** separator
14. Compliance & Integrations (logo grid + 3 compliance cards)
15. **hr** separator
16. Hero image — care provider with resident (full-bleed)
17. **hr** separator
18. Success Stories (3 testimonial cards)
19. **hr** separator
20. Plan & Pricing (3 steps timeline + pricing card)
21. **hr** separator
22. Book Demo + Mission (Zoho Bookings iframe + email fallback + company mission + Brisbane skyline)
23. Footer

Anchors: `#benefits`, `#success-stories`, `#pricing`, `#book-demo`

## Interactive components

- **Exclusive accordions** (Safety + Personalised sections): One open at a time. `+` rotates to `×` when expanded. First item open by default.
- **Horizontal scroll carousel** (Op. Intelligence): CSS `scroll-snap`, 4 product screenshot cards.
- **Scroll-reveal**: IntersectionObserver, `opacity: 0 → 1` + slight `translateY`. Respects `prefers-reduced-motion`.
- **Booking widget** (Book Demo): Zoho Bookings iframe (`portal-embed`). Static placeholder preserved as HTML comment. Zoho styling CSS lives in `docs/zoho-bookings-theme.css`.
- **Glow system** (CSS): Three variants of animated box glow via `.glow-wrap`:
  - `--btn`: brand-red gradient, used on hero CTA button
  - `--card`: multicolour gradient (pink/yellow/blue/purple), used on pricing card
  - `--brand`: brand-red gradient (same as btn), available for cards/blocks.

## Responsive strategy

- **Base (mobile):** Single column, stacked, hamburger nav
- **768px+:** Two-column layouts begin, carousel shows 2+ cards
- **1024px+:** Full multi-column layouts
- **1440px+:** Content at 1180px max, centred. Backgrounds full-width.

## Brand and audience

**Primary buyers:** Facility managers, general managers, directors of care/operations at residential aged care providers — especially multi-site operators (500–1,000+ beds). Priorities: regulatory compliance, audit readiness, risk mitigation, operational efficiency.

**End users:** Kitchen, hospitality, and clinical floor staff. Non-technical.

**Core differentiator:** Embrayse *removes* complexity rather than digitising it.

**Key buying trigger:** The Strengthened Australian Aged Care Quality Standards (Standard 6: Food and Nutrition).

**Key competitor:** Simple Foods. The H1 "Aged care catering made simple. And smart." is a deliberate positioning against them. Many customers have migrated from Simple Foods to Embrayse. Don't weaken or rewrite the hero heading without discussing with the team.

## Copy tone

Warm, direct, confident, human — not clinical or corporate. Australian English throughout: "aged care" not "senior living", "facilities" not "communities", "residents" not "patients".

Keep pain real but empathetic. No aggressive or cynical framing about staff.

**No em-dashes (—).** Use periods, commas, or rewrite the sentence instead.
