# thinkthx Design Language Spec (Portable)

Status: v1  
Audience: engineers/designers/agents rebuilding a site in a different repo  
Scope: captures the design decisions and patterns from `thinkthx.com` (Home) and `barefootbuckets.thinkthx.com`  
Constraint: framework-agnostic, dependency-agnostic

---

## 1) Design Intent

Build interfaces that feel:
- Human, warm, and practical
- Clear before clever
- Lightweight and trustworthy

Primary UX goal:
- Users should understand what the product is, why it helps, and what to do next within seconds.

---

## 2) Core Brand/UI Principles

1. Use soft depth, not heavy chrome  
- Prefer subtle shadows, translucent surfaces, and blurred gradient atmosphere over hard borders and dense decoration.

2. Use rounded geometry consistently  
- Cards, chips, containers, and media all share high-radius corners.

3. Keep hierarchy obvious  
- Large display headlines, short supporting copy, one primary CTA per section.

4. Prefer practical copy  
- Specific outcomes, plain language, low hype.

5. Keep motion meaningful  
- Gentle reveal/focus motion that supports comprehension, never spectacle.

---

## 3) Information Architecture Pattern

Use this page flow unless product needs differ:

1. Hero  
- Product promise, short explanation, primary CTA, product visual

2. How It Works / Credibility  
- Simple steps or proof of method

3. Product Model / Key Concepts  
- Core entities/features in cards

4. Feature Grid  
- Practical capability explanations

5. Final CTA  
- Price/value clarity + strong call to action

6. Footer  
- Legal/support links

Home/Hub variant:
- Hero + product cards directory + footer (minimal, fast, high-scannability)

---

## 4) Visual Language

### 4.1 Color System (Semantic, not brand-locked)

Define semantic tokens and map brand colors to them:
- `--bg`: page background
- `--surface`: elevated surfaces/cards
- `--text`: primary text
- `--muted`: secondary text
- `--border`: low-contrast dividers
- `--accent-1`, `--accent-2`, `--accent-3`: atmospheric gradients/chips
- `--success` / `--info` (optional): status chips

Guidance:
- Light mode: warm off-white backgrounds + near-black text.
- Dark mode: dark neutral backgrounds + high-contrast soft-light text.
- Accent colors should be pastel-leaning for atmosphere; avoid neon saturation.

### 4.2 Typography

Style characteristics:
- Rounded, friendly sans-serif for both display and body.
- Headline tracking slightly tight.
- Body copy relaxed and readable.

Practical scale (adjust as needed):
- Hero H1: ~42–76px responsive
- Section H2: ~38–56px responsive
- Body: ~17–24px based on context
- Eyebrow labels: small, uppercase, tracked

### 4.3 Surfaces and Elevation

Reusable primitives:
- **Soft Card**
  - Mild translucency (light mode)
  - 1px low-contrast border
  - Large radius (~22–30px)
  - Soft shadow (diffuse, not sharp)
- **Gradient Orb**
  - Absolute-positioned blurred shape
  - Low opacity
  - Slow float animation
  - Non-interactive (`pointer-events: none`)

---

## 5) Layout and Spacing

Rhythm:
- Mobile-first paddings, then widen at medium breakpoints.
- Max content width around 1160–1240px.
- Keep generous vertical breathing room between sections.

Patterns:
- Use grid/flex for structure; avoid arbitrary absolute positioning except decorative or layered media moments.
- Cards arranged in responsive grids (`1 → 2 → 3` columns depending on content).

---

## 6) Interaction and Motion

Motion style:
- Subtle fades/slides on first reveal.
- Gentle parallax/float for hero/product imagery.
- Soft hover lift on cards/CTAs.

Accessibility:
- Respect `prefers-reduced-motion` by reducing or disabling non-essential animation.
- Ensure visible keyboard focus states on interactive elements.

Timing guidance:
- Typical entrance duration: ~0.45s–0.6s
- Easing: smooth, non-bouncy (`easeOut`/equivalent)
- Stagger lightly (small delays), avoid long chains

---

## 7) Component Patterns

### 7.1 Hero
- Eyebrow label (optional)
- Large headline (often 1–2 intentional lines)
- One paragraph of clarifying value
- Primary CTA (single dominant action)
- Product image/mockup as credibility anchor

### 7.2 Cards (Apps / Features / Concepts)
- Icon or thumbnail at top
- Clear title
- Short, concrete body text
- Optional status/platform chips
- Hover/focus treatment: slight lift + border/shadow emphasis

### 7.3 CTA Block
- Reinforce value + friction reducers (pricing model, privacy posture, no-subscription statements, etc.)
- Keep a single, obvious action target

### 7.4 Footer
- Simple legal/support links
- No heavy visual treatment

---

## 8) Copywriting Pattern

Tone:
- Direct, practical, reassuring
- Avoid jargon and inflated claims

Structure:
- Start with outcome
- Explain mechanism simply
- Remove uncertainty with concrete details (price, platform, privacy, effort)

Examples of pattern (not literal copy):
- “Set it up in minutes.”
- “Check in once a month.”
- “One-time price. No subscription.”

---

## 9) Light/Dark Mode Strategy

Requirement:
- Keep identical layout/components across modes.
- Only swap semantic tokens.

Implementation rules:
1. Do not redesign components per mode.
2. Preserve contrast and readability first.
3. Keep atmospheric accents visible but lower in visual dominance than content.
4. Validate states in both modes: default, hover, focus, disabled.

---

## 10) Architecture Notes from Source Apps

Source implementation context:
- Monorepo with independently deployable app folders.
- Home app: Vite + React, hand-authored CSS, minimal dependencies.
- Barefoot Buckets app: Vite + React + TypeScript, Tailwind + custom CSS, motion library.

Portable takeaway:
- The design language does **not** depend on any specific framework or package.
- Recreate with plain CSS + semantic tokens + minimal JS animation hooks if needed.

---

## 11) Dependency-Free Implementation Checklist

Use this checklist in any repo:

1. Create semantic tokens for color, radius, shadow, spacing.
2. Implement `soft-card` primitive.
3. Implement `gradient-orb` primitive.
4. Define responsive type scale and container widths.
5. Implement section templates (Hero, Feature Grid, CTA, Footer).
6. Add subtle hover/focus states.
7. Add reduced-motion handling.
8. Add light/dark token sets.
9. Validate accessibility and contrast.
10. Keep copy concise and outcome-driven.

---

## 12) Non-Goals (What Not to Do)

- Do not over-animate.
- Do not add visual noise that competes with core message.
- Do not rely on dark mode as a separate design system.
- Do not create multiple primary CTAs in the same section.
- Do not use aggressive gradient saturation that harms legibility.

---

## 13) Quick Handoff Prompt for Another Agent

Use this prompt in a new repo:

“Implement a marketing page using the thinkthx portable design language spec. Build with semantic tokens, soft-card and gradient-orb primitives, mobile-first layout, subtle reduced-motion-safe animations, and full light/dark mode token overrides. Keep copy plainspoken and practical. Do not add framework-specific UI dependencies unless required by the host project.”

