# Create Insight Article

You are drafting a new `/insights` article for Embrayse. Produce a complete, on-brand, SEO-tidy markdown post and save it at `content/{slug}/index.md`. Most of these posts will be LLM-drafted and lightly reviewed by a human, so the bar is: tight copy, Australian English, real usefulness. Not content-mill filler.

Before writing, load the brand context:
- `.claude/commands/embrayse-brand-narrative.md`
- `.claude/commands/write-embrayse-copy.md`

Follow the copy rules in both. They override anything below that conflicts.

This skill is designed to be portable. The "Writing the article" section below is self-contained and can run anywhere (including Claude Cowork or a plain chat). The "Local file steps" section is Claude-Code-specific.

## Your task

Parse the request in: $ARGUMENTS

If no arguments were provided, ask the author for:
1. **Topic / angle** (a sentence or two on what the piece is about and who it's for).
2. **Tags** (2-4 from: `nutrition`, `dementia`, `compliance`, `standards`, `operations`, `technology`, `innovation`, `culture`, `experience`, `menu-planning`, `workforce`, `care`. New tags are fine if the topic demands them).
3. **Optional title** (if they already have one; otherwise you propose 2-3 options).
4. **Optional draft mode** (if they want `draft: true` so it's excluded from the prod build until a hero image lands).

If they hand you a rough outline, bullet list, or research notes, use those as source material rather than inventing facts.

## Writing the article

### Length and shape

- **Target length:** 800-1400 words. Enough to be genuinely useful; short enough to actually get read.
- **Opening:** Lead with the reader's situation or question, not with Embrayse. Two to four sentences.
- **Structure:** 3-6 `##` sections. Use `###` subsections only when a section genuinely needs internal structure.
- **Close:** Land on something actionable. One short Embrayse mention is fine at the very end, not pitchy. No aggressive CTA, the template adds a "Book a demo" card for us.

### Voice (from the copy guide)

- Warm, direct, confident, human. Australian English throughout.
- "Aged care" not "senior living". "Residents" not "patients". "Facilities" not "communities".
- Empathetic about staff effort, never cynical or condescending.
- Concrete over vague. Specific numbers, specific scenarios, specific practices.

### Hard rules

- **No em-dashes (—) anywhere.** Use commas, periods, colons, or rewrite the sentence. This is strict.
- **No invented statistics.** If a claim needs a number, either cite a real source with a link, or don't make the claim.
- **Cite primary sources** for regulatory, clinical, or statistical claims. Link text should be the phrase in the sentence, not "click here".
- **One H1 only** (the frontmatter `title`; don't put an H1 in the body). Section headings start at `##`.
- **Don't repeat the title** as the first line of the body.

### SEO and slug

- **Slug**: kebab-case, derived from the title or the most searchable phrasing of the topic. Keep it under ~60 characters. Prefer the terms aged care buyers actually search for. Examples from the existing set: `how-food-nutrition-can-improve-dementia-outcomes`, `8-technology-innovations-to-improve-food-services-in-aged-care-homes`. URLs are permanent once published; choose carefully.
- **Excerpt**: one sentence, 140-160 characters, ends with a full stop. This is the meta description on the post page and the card teaser on `/insights/`. Write it last, once you know what the article actually said.
- **Headings**: use keywords naturally, not stuffed. Google ranks on the whole page, not the title tag alone.

### Body images

- Include **at least one** body image spot if the article is longer than ~600 words. Mark it inline as `![alt text describing the image for a screen reader](image-filename.jpg)`. Use descriptive kebab-case filenames.
- If the author hasn't supplied images, leave the image references in place pointing to plausible filenames, and list them at the end of your response under a `## Images needed` heading so they know what to drop in the folder.
- Use `<figure>` + `<figcaption>` (raw HTML is fine inside markdown) when an image needs attribution or a caption.
- Always include an `alt` attribute. Screen reader users read these.

### Frontmatter schema

```yaml
---
title: "Title in sentence case, quoted because colons break YAML"
date: YYYY-MM-DD                   # today, unless the author specified otherwise
excerpt: "One-sentence teaser, 140-160 chars, ends in a full stop."
tags: [tag-one, tag-two]           # flat list
hero: hero.jpg                     # filename relative to the post folder
hero_alt: "Descriptive alt for the hero image"
draft: false                       # true to exclude from prod build
layout: post.njk
permalink: /insights/{{ page.fileSlug }}/index.html
---
```

Do not change `layout` or `permalink`. They're required for the article to render.

## Local file steps

### 1. Derive the slug

From the title, produce a kebab-case slug. Lowercase, ASCII-only, hyphens between words, no trailing punctuation. Validate it's under ~60 characters.

### 2. Check for collision

If `content/{slug}/` already exists, stop and ask the author:
- "A post with this slug exists already. Overwrite, pick a different slug, or cancel?"

Never overwrite silently.

### 3. Write the article

Create `content/{slug}/index.md` with the frontmatter and body.

### 4. Hero image handling

- If the author provided a hero image path, copy it to `content/{slug}/hero.jpg` (or the appropriate extension).
- If they didn't, set `draft: true` in the frontmatter and flag this at the end of your response: **"Hero image missing. Set `draft: false` in the frontmatter once you've dropped a hero image in `content/{slug}/`."**

### 5. Build and verify

Run `npm run build` and confirm the output includes `insights/{slug}/index.html`. Don't start a dev server unless asked. Report the local preview URL: `http://localhost:8080/insights/{slug}/` once they serve the site.

### 6. Report back

In your final response, give the author:
- The file path written (`content/{slug}/index.md`).
- The live URL that will exist once shipped (`/insights/{slug}`).
- A list of any images needed (under `## Images needed`), with the filename and a one-line description.
- A note if `draft: true` was set.
- Any factual claims you made up on the spot that would benefit from a human fact-check (be honest; it's cheaper to flag these than to let them ship).

## Claude Cowork / portable use

If you're running this skill outside of Claude Code (e.g. Claude Cowork or a plain chat), do this instead:

1. Still load the brand context if available. If the files aren't accessible, tell the author you're operating without the brand narrative and ask them to paste the key voice rules.
2. Skip the file-writing steps. Output the article as a single fenced markdown block the author can copy into `content/{slug}/index.md` locally.
3. Give them the folder path to create (`content/{slug}/`) and the list of image filenames referenced.
4. Give them the exact commit + build commands they'll run locally:
   ```
   mkdir content/{slug}
   # paste the markdown into content/{slug}/index.md
   # drop hero.jpg and any body images into the same folder
   npm run build
   ```

Keep everything else identical. Same frontmatter schema, same voice rules, same SEO and em-dash rules, same hard constraints.
