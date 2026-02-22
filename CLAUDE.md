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

Three source files:

- **`index.html`** — full page markup, single scroll page with anchor-linked sections
- **`styles.css`** — all styles; CSS custom properties for theming; mobile-first with breakpoints at 700px and 980px
- **`script.js`** — three behaviours: mobile nav toggle, header scroll shadow, IntersectionObserver scroll-reveal

Assets live in `marketing/` (logos, hero images, product screens, customer logos, integration logos, story photos).

## Design system

Follow `DESIGN_LANGUAGE_SPEC.md` for all visual decisions. Key primitives:

- **`.soft-card`** — bordered card with subtle shadow and `--radius-card` (16px) corners
- **`.gradient-orb`** — blurred absolute-positioned decorative shape, `pointer-events: none`
- **CSS tokens** — all colors, shadows, and surfaces are semantic tokens in `:root`; dark mode overrides the same tokens under `@media (prefers-color-scheme: dark)`

Typography stack: `Pridi` (headings) · `PT Serif` (pullquotes, hero subtitle) · `PT Sans` (buttons) · `Inter` (body). All loaded from Google Fonts.

## Scroll-reveal pattern

JS adds `.js` to `<html>` on load. Elements with `.reveal` start hidden (`opacity: 0; transform: translateY(14px)`) only when `.js` is present. The IntersectionObserver adds `.is-visible` to trigger the transition. Elements without JS are always visible. `prefers-reduced-motion` skips animation entirely.

## Page sections (top → bottom)

Hero → Customer strip → "Sound familiar?" split → Quote → Benefits splits (×3) → "That easy?" strip → Success stories → Standards + integrations → 3 steps → Pricing → Book demo → Footer

Anchors: `#benefits`, `#success-stories`, `#pricing`, `#book-demo`

## Brand and audience

**Primary buyers:** Facility managers, general managers, directors of care/operations at residential aged care providers — especially multi-site operators (500–1,000+ beds). Their priorities are regulatory compliance, audit readiness, risk mitigation (allergy/dietary incidents), and operational efficiency.

**End users:** Kitchen, hospitality, and clinical floor staff. Non-technical. The product must feel obvious from day one with minimal training.

**Core differentiator:** Embrayse *removes* complexity rather than digitising it. This framing — simpler than paper, not just digital paper — underpins most copy decisions.

**Key buying trigger:** The revised Australian Aged Care Quality Standards (particularly Standard 6: Food and Nutrition) are creating urgency. Compliance and audit-readiness messaging directly addresses why providers are moving now.

## Copy and messaging

Follow `COPY_STORY_MAP.md`. Lead with outcomes before features. One CTA per section. Keep claims concrete, low-hype, operations-first.

**Tone:** Warm, direct, confident, human — not clinical or corporate. Acknowledge the anxiety around safety/compliance, then resolve it with reassurance. Australian English throughout (e.g. "aged care", not "senior living"; "facilities", not "communities").

The booking section currently has a placeholder (`div.booking-placeholder`) — the production integration point for a scheduling tool.

## Design inspiration — Intercom (intercom.com/drlp/ai-customer-service)

Reviewed Feb 2026. **This is the primary visual reference** for the landing page redesign — more editorial and warm than their /suite page.

**Overall palette and feel**
- Warm cream/parchment throughout (`~#f2ede6`) — the entire page background, not just sections. Never white, never grey.
- Near-black text. No dark hero. Light and airy from top to bottom.
- Minimal nav: logo left, "Start free trial" text link + one filled "View demo" button right. No full nav on this landing page variant.

**Hero layout**
- Small rounded pill chip as eyebrow: e.g. "AI-first Customer Service" — cream background, 1px dark border, dark text, pill-shaped (~8px radius). Sits above the headline.
- Very large left-aligned **display serif** headline — elegant, regular weight (not ultra-bold). Feels editorial/magazine, not tech-heavy.
- A dotted horizontal rule (not solid) runs full-width below the headline to separate it from body copy + CTAs.
- Body copy is below-left, CTAs below the copy.
- Right half of the hero: large product screenshot **floating over an oil painting reproduction** — a classical painted landscape (mountains, sky) fills the card background, app UI sits on top. No card border — just a clean rounded rectangle with a shadow.

**The oil painting technique — the defining visual element**
- Throughout the page, product screenshots and section backgrounds use **reproductions of classical oil paintings** (landscape, impressionist, Monet water lilies) rather than photography or abstract gradients.
- This makes the product feel warm, human, and artistic — completely unexpected in B2B software.
- The paintings are used as: card backgrounds behind product UI, full-width section backgrounds for CTAs, and gradient mesh cards.
- For Embrayse: real food/kitchen photography would serve the same function — humanising and warm, not corporate.

**Dotted divider lines**
- Thin dotted lines (not solid, not dashed) divide sections horizontally. A consistent, lightweight motif throughout.

**Customer logo strip**
- Just the company wordmarks/logotypes in their own typefaces, on the cream background. No logo boxes, no cards, no borders. Very clean.

**3-column feature overview cards**
- Card top: a soft gradient mesh image (or painting crop) — muted, warm colour tones (sage green, dusty rose, warm grey).
- Below the image: bold heading + short body copy. No card chrome — no border, no shadow on the card itself.

**Section heading pattern (repeated)**
- Pill chip label ("For customers", "For support leaders") — centred above heading.
- Large centred serif heading.
- Short centred body paragraph.
- Two centred CTAs.
- Then full-width content below (screenshots, feature lists).

**Feature accordion pattern**
- Left column: stacked feature items, each with a thin rule above, bold feature name, body copy below. Active item is dark/highlighted.
- Right column: product screenshot floating over an oil painting card.

**Proof/stats card**
- Large rounded card (~16px radius), very subtle border, cream fill.
- Left: serif headline + body + two dark outlined CTA buttons.
- Right: bar chart where bars are rendered as **blue watercolour brushstrokes** — the painterly aesthetic extends even to data visualisation.

**Testimonials — stacked coloured card deck**
- Customer names as plain text tabs above (e.g. "Sharesies", "Lightspeed"). Active tab has an underline.
- The active testimonial is a large full-width coloured card (bold pastel: hot pink, periwinkle blue, soft green). The cards are physically stacked — you see the edges of other cards peeking out behind, creating a deck-of-cards depth effect.
- Quote text centred, company name above, attribution below.

**Final CTA section**
- Full-bleed Monet water lilies painting fills the background. White bold display text centred over it. Two small buttons.

**Typography**
- Headings: display serif, regular weight, large. Elegant not heavy. Left-aligned in hero, centred in body sections.
- Body: clean regular sans-serif.
- Eyebrow chips: sans-serif, small, dark text on cream pill.

**Buttons**
- Primary: near-black filled, white text, ~8px radius. Compact.
- Secondary: white/cream outline, dark text. Same radius.
- Both are the same height and similar width — a pairing, not a hierarchy mismatch.

**What to borrow for Embrayse**
- Cream/parchment background for the whole page (not just muted sections)
- Pill-shaped eyebrow chip above the hero headline
- Display serif headline, left-aligned in the hero
- Dotted full-width horizontal rules as section dividers
- Product screenshots shown over real food/kitchen photography (analogous to the oil painting technique)
- Customer wordmark strip with no card chrome
- Section headings: centred pill chip + centred serif heading pattern
- Stacked coloured testimonial card deck
- Final CTA section with a full-bleed atmospheric image + white headline
