# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static single-page marketing site for Embrayse — aged care food services software. No build tools, no framework, no package manager. Open `index.html` directly in a browser to preview.

## Running locally

```bash
open index.html
# or use any static file server, e.g.:
python3 -m http.server 8080
```

## Architecture

Source files:

- **`index.html`** — v1 of the landing page
- **`styles.css`** — v1 stylesheet
- **`index-v2.html`** — v2 of the landing page (current design direction)
- **`styles-v2.css`** — v2 stylesheet (standalone, not an override)
- **`script.js`** — shared across both versions: mobile nav toggle, header scroll shadow, IntersectionObserver scroll-reveal

Assets live in `marketing/` (logos, hero images, product screens, customer logos, integration logos, story photos).

A **version toggle** (fixed bottom-left pill) is present on both pages for side-by-side comparison. When creating new iterations, continue the pattern: `index-v3.html` / `styles-v3.css`, and add the new version to the toggle.

## Design direction — Softened Neo-Brutalist (v2, current)

The aesthetic is minimalist neo-brutalist, pulled back from the more aggressive v1 treatment. The guiding principle: **structured and confident, but warm and human**.

**What's working (keep):**
- Solid offset drop shadows — used *sparingly*. Currently on story cards (`6px 6px 0 var(--border)`), quote card, and the main CTA button only.
- Story/testimonial cards — well received. Bordered card with shadow and light-tinted backgrounds.
- Bento grid for pricing — keep the numbered steps + pricing card layout.
- Two-column feature sections (copy + media) — strong visual rhythm.
- The dark quote card (deep brand gradient, white text) — creates good contrast rhythm.

**What changed in v2 (do not regress):**
- `.kicker` is a plain brand-color uppercase label — no pill border or background fill.
- `.copy` columns have no border and no background card — text breathes freely next to imagery.
- Feature items use `.feat-list` / `.feat-item` (icon circle + h4 + p) — no bordered colored cards.
- Section separators are a small dotted circle SVG ornament, not heavy ruled lines.
- Capabilities strip (just after hero) shows icon + title only — no descriptions, no colored backgrounds.
- Stats section removed.
- Color palette is restrained: `--brand` and `--brand-soft` (pink) are primary accents. `--apricot` and `--lilac` appear only in the pricing bento steps. `--sky` is removed.

## CSS tokens

```css
--paper: #f7f3f6      /* very light pinkish white, alternating section bg */
--paper-2: #eee6ec    /* slightly deeper, used in footer, logo strip */
--ink: #19161b        /* near-black text and borders */
--muted: #5f5863      /* secondary text, feature descriptions */
--brand: #cf4967      /* primary red-pink accent */
--brand-deep: #a6354f /* hover state, icon color */
--brand-soft: #efc0cc /* light pink fill — feat-icon circles, quote gradient */
--apricot: #efcc93    /* pricing bento step 2 only */
--lilac: #bbb9e2      /* pricing bento step 3 only */
--shadow: 6px 6px 0 #19161b   /* solid offset shadow — use sparingly */
--radius: 22px
```

## Typography

- **Pridi** (Google Fonts) — all headings (h1–h4). Serif, weighted 300–700.
- **Manrope** (Google Fonts) — body, UI, buttons, kickers.
- Icons: HugeIcons stroke set via CDN (`hgi-stroke-rounded`).

## Key components

**`.feat-list` / `.feat-item`** — feature list used inside two-col sections. Each item: 40px brand-soft icon circle + h4 title (Pridi) + p description (muted). No borders.

**`.cap-grid`** — capabilities strip (3 col). Icon + h3 only. Centred. Vertical pseudo-element dividers between columns. No colored backgrounds.

**`.section-sep`** — SVG dotted circle ornament between sections. `aria-hidden="true"`.

**`.story`** — testimonial card. Bordered, with `6px 6px 0 var(--border)` shadow. Keep this treatment.

**`.bento-grid`** — 12-col pricing grid. Steps use brand-soft / apricot / lilac. Keep.

**`.easy-banner`** — brand gradient (brand → brand-deep) full-width CTA strip.

**`.book`** — full-bleed atmospheric photo background with dark overlay for the final demo CTA.

## Scroll-reveal pattern

`script.js` adds `.js` to `<html>` on load. Elements with `.reveal` start hidden (`opacity: 0; transform: translateY(20px) rotate(-0.2deg)`) only when `.js` is present. IntersectionObserver adds `.is-visible` to trigger the transition. `prefers-reduced-motion` skips animation entirely.

## Page sections — v2 order (top → bottom)

Hero → Capabilities strip (3 icons + titles) → Logo tape → Section sep → "Sound familiar?" split → Quote → Safety features → Section sep → Simple by design → Section sep → Operational intelligence → Section sep → Personalised experience → Section sep → Integrations + compliance → "That easy?" banner → Success stories → Pricing + steps → Book demo → Footer

Anchors: `#benefits`, `#success-stories`, `#pricing`, `#book-demo`

## Brand and audience

**Primary buyers:** Facility managers, general managers, directors of care/operations at residential aged care providers — especially multi-site operators (500–1,000+ beds). Their priorities are regulatory compliance, audit readiness, risk mitigation (allergy/dietary incidents), and operational efficiency.

**Buyer journey note:** Visitors are typically already aware they want software — they are evaluating options. Copy should focus on *why Embrayse specifically*, not just why software in general.

**End users:** Kitchen, hospitality, and clinical floor staff. Non-technical. The product must feel obvious from day one with minimal training.

**Core differentiator:** Embrayse *removes* complexity rather than digitising it. Simpler than paper, not just digital paper.

**Key buying trigger:** The revised Australian Aged Care Quality Standards (particularly Standard 6: Food and Nutrition) are creating urgency.

## Copy tone

Warm, direct, confident, human — not clinical or corporate. These are mission-driven people who care deeply about residents. Acknowledge the difficulty of their situation without being dismissive of their effort. Resolve anxiety with reassurance, not alarm.

Australian English throughout: "aged care" not "senior living", "facilities" not "communities", "residents" not "patients".

Do not use aggressive or cynical framing about staff (e.g. "relying on memory and hope" — the "hope" was removed in v2 as too dismissive). Keep pain real but empathetic.

## Design reference — Intercom landing page

Reviewed Feb 2026. The primary original visual reference. Key borrowings that are still relevant:
- Dotted/soft section separators (interpreted as the circle SVG ornament in v2)
- Product screenshots as the hero visual — concrete, not abstract
- Customer logo strip with no card chrome
- Final CTA section with full-bleed atmospheric image + white headline
- Restraint: one idea per section, one CTA per section
