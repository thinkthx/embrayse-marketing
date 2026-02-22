# AGENTS.md - Marketing Site Design Language (Portable)

## Purpose
Use this guide to reproduce a warm, practical marketing style inspired by thinkthx properties, without requiring any specific framework or UI dependency.

## Core Intent
- Build pages that feel human, clear, and trustworthy.
- Prioritize comprehension and conversion over visual novelty.
- Keep implementation lightweight.

## Visual System Rules
- Use semantic tokens (not hardcoded brand colors):
  - `--bg`, `--surface`, `--text`, `--muted`, `--border`
  - `--accent-1`, `--accent-2`, `--accent-3`
  - `--radius-card`, `--shadow-soft`
- Keep rounded geometry consistent across cards, media, chips, and containers.
- Use soft depth: subtle borders, translucent surfaces, gentle shadows.
- Use atmospheric blurred gradient shapes in the background (`gradient-orb`) with low opacity.
- Avoid high-saturation gradients that hurt readability.

## Light/Dark Mode
- Support both light and dark mode via token overrides only.
- Do not redesign component structure between modes.
- Validate readability and interactive states in both modes.

## Typography + Copy
- Friendly rounded sans-serif style.
- Headlines: large, concise, outcome-first.
- Body: practical, plainspoken, low-jargon.
- One primary CTA per section.

## Layout Pattern
Default page structure:
1. Hero (promise + short explanation + primary CTA + product visual)
2. How it works / proof
3. Core concepts or product model
4. Feature grid
5. Final CTA
6. Footer (legal/support)

Hub/index variant:
- Hero + product cards + footer only.

## Spacing + Responsiveness
- Mobile-first spacing.
- Increase horizontal padding and type scale at medium+ breakpoints.
- Keep content in a centered max-width container.
- Use responsive grids for cards (1/2/3 columns as appropriate).

## Reusable Primitives (Required)
- `soft-card`:
  - large radius
  - soft shadow
  - subtle border
  - high legibility
- `gradient-orb`:
  - absolute
  - blurred
  - low opacity
  - non-interactive

## Motion Rules
- Use subtle reveal/hover/parallax motion only.
- Keep durations moderate (~0.45s-0.6s).
- Respect `prefers-reduced-motion` and disable non-essential animation.
- Never use motion that distracts from content.

## Accessibility Rules
- Visible keyboard focus states on all interactive controls.
- Contrast must remain strong in light and dark mode.
- Decorative graphics must not interfere with reading order or interaction.
- Keep semantic HTML and meaningful alt text.

## Content Rules
- Keep claims specific and concrete.
- Explain outcomes before implementation details.
- Reduce friction with explicit details (price model, privacy posture, effort required).
- Avoid hype language.

## Dependency Policy
- Do not introduce UI libraries unless the host project already depends on them.
- Prefer native HTML/CSS + minimal JS.
- If using a framework, keep this spec as the source of truth.

## Done Criteria
- Visual language matches: soft, rounded, atmospheric, practical.
- Light/dark modes implemented with shared components and token swaps.
- Motion is subtle and reduced-motion safe.
- IA follows the prescribed section flow.
- Page is responsive and accessible.
