# Create Release Note

You are creating a new release notes page for Embrayse. Generate a complete HTML page from the engineer's input, lightly polishing the copy to match the Embrayse tone, and update the index so the release shows up in the listing.

## Your task

Parse the request in: $ARGUMENTS

If no arguments were provided, ask the engineer for:
1. Version number (e.g. `2026.4`)
2. Release title (e.g. `Meal Plan Templates`)
3. Feature bullets (each feature: heading + description + optional `[screenshot: filename.png]` markers)
4. Improvements/bug fixes list
5. Where the screenshot files are (they should already be on disk somewhere, usually `~/Downloads/` or the project assets folder)

## Input format the engineer will use

```
/create-release-note 2026.4 "Meal Plan Templates and Faster Reports"

Intro: Short paragraph describing this release.

## Feature: Meal Plan Templates
Save reusable weekly meal plan templates and apply them across facilities with one click. Templates include meal options, portion sizes, and dietary overrides.
[screenshot: meal-templates-list.png, template-apply-dialog.png]

## Feature: Faster Reports
Report generation is now up to 5x faster for facilities with more than 100 residents, thanks to caching improvements.
[screenshot: reports-speed.png]

## Fixes
- Fixed calendar navigation on Safari 17
- Resolved duplicate notification issue on iOS
- Improved PDF export performance for large facilities
```

Images referenced in `[screenshot: ...]` tags should be provided by the engineer as file paths (relative or absolute) or already placed in `site/release-notes/assets/{version-slug}/`.

## Steps

### 1. Parse the input

Extract:
- **Version**: e.g. `2026.4` → slug `2026-4`
- **Title**: e.g. `Meal Plan Templates and Faster Reports`
- **Year**: first 4 digits of version
- **Intro**: the paragraph after `Intro:` (optional but recommended)
- **Features**: each `## Feature: ...` block with its heading, body, and screenshot list
- **Fixes/Improvements**: bullet list after `## Fixes` or `## Improvements`

### 2. Check if the version already exists

If `site/release-notes/{version-slug}.html` already exists, stop and ask the engineer whether to overwrite. Never overwrite silently.

### 3. Set up screenshot directory

Create `site/release-notes/assets/{version-slug}/` if it doesn't exist.

For each screenshot referenced in the input:
- If the engineer provided absolute/relative paths, copy the files into `site/release-notes/assets/{version-slug}/` using `cp`.
- If the files are already in that directory, verify they exist with `ls`.
- If any referenced screenshot is missing, stop and list the missing files so the engineer can place them.

Use short, descriptive kebab-case filenames (e.g., `meal-templates-list.png`).

### 4. Polish the copy

Before generating the page, quickly review and polish the engineer's bullets for tone:

- **Voice:** Warm, direct, confident. Follow the tone guidelines in `.claude/commands/write-embrayse-copy.md` and `.claude/commands/embrayse-brand-narrative.md`.
- **Australian English**: "aged care" not "senior living", "facilities" not "communities", "residents" not "patients".
- **No em-dashes (—)** anywhere in visible copy. Replace with commas, periods, or split sentences. This is a strict rule.
- Keep the engineer's technical detail intact. Do not invent features or embellish. Polish wording only.
- If a feature description is very rough, expand it slightly so it reads as a complete thought (1-2 sentences).

### 5. Generate the release page

Create `site/release-notes/{version-slug}.html` using this exact template. Replace placeholders (in `{{...}}`) with the polished content.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Release {{version}} | Embrayse</title>
  <meta name="description" content="{{short description, 1 sentence, max 160 chars}}">

  <!-- Open Graph -->
  <meta property="og:title" content="Release {{version}} | {{title}}">
  <meta property="og:description" content="{{short description}}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://embrayse.com/release-notes/{{version-slug}}">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Pridi:wght@600;700&family=PT+Serif:ital@0;1&display=swap" rel="stylesheet">

  <!-- HugeIcons -->
  <link rel="stylesheet" href="https://cdn.hugeicons.com/font/hgi-stroke-rounded.css">

  <!-- Styles -->
  <link rel="stylesheet" href="../styles.css">
  <link rel="stylesheet" href="release-notes.css">
</head>
<body>

  <!-- Minimal Nav -->
  <header class="rn-nav">
    <div class="rn-nav__inner">
      <a href="/" class="rn-nav__logo" aria-label="Embrayse home">
        <img src="../assets/embrayse-logo-black.png" alt="Embrayse" width="211" height="36">
      </a>
      <nav class="rn-nav__links">
        <a href="/" class="rn-nav__link">Home</a>
        <a href="./" class="rn-nav__link">All Releases</a>
      </nav>
    </div>
  </header>

  <main class="rn-main">
    <article class="rn-detail">
      <a href="./" class="rn-detail__back">
        <i class="hgi-stroke hgi-arrow-left-01"></i>
        All releases
      </a>

      <header class="rn-detail__header">
        <span class="kicker">What's new</span>
        <h1 class="rn-detail__title">Release {{version}} &ndash; {{title}}</h1>
        <p class="rn-detail__intro">{{intro paragraph}}</p>
      </header>

      {{FOR EACH FEATURE}}
      <section class="rn-feature">
        <h2 class="rn-feature__title">{{feature heading}}</h2>
        <p>{{feature body}}</p>
        {{SCREENSHOT BLOCK — see rules below}}
      </section>
      {{/FOR EACH — add <hr class="section-hr"> between features and before the improvements block}}

      {{IF IMPROVEMENTS EXIST}}
      <hr class="section-hr">

      <section class="rn-improvements">
        <h2 class="rn-improvements__title">Other Improvements and Bug Fixes</h2>
        <ul>
          {{FOR EACH IMPROVEMENT}}<li>{{item}}</li>{{/FOR EACH}}
        </ul>
      </section>
      {{/IF}}

      <section class="rn-cta">
        <p>Want to see Embrayse in action?</p>
        <div class="glow-wrap glow-wrap--btn">
          <a href="/#book-demo" class="btn btn--primary btn--lg">Book your demo</a>
        </div>
      </section>
    </article>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer__inner">
      <nav class="footer__links">
        <a href="/">Home</a>
        <a href="./">Release Notes</a>
        <a href="/#book-demo">Book a demo</a>
      </nav>
      <p class="footer__contact">Get in touch: <a href="mailto:info@embrayse.com">info@embrayse.com</a></p>
    </div>
  </footer>

</body>
</html>
```

**Screenshot block rules:**

- **0 screenshots:** omit the screenshot block entirely
- **1 screenshot:**
  ```html
  <figure class="rn-feature__screenshot">
    <img src="assets/{{version-slug}}/{{filename}}" alt="{{descriptive alt}}" loading="lazy">
  </figure>
  ```
- **2 screenshots (side by side on desktop):**
  ```html
  <div class="rn-feature__screenshots rn-feature__screenshots--two">
    <img src="assets/{{version-slug}}/{{file1}}" alt="{{alt1}}" loading="lazy">
    <img src="assets/{{version-slug}}/{{file2}}" alt="{{alt2}}" loading="lazy">
  </div>
  ```
- **3+ screenshots:** group them into `--two` pairs followed by single `<figure>` blocks, or use multiple `<figure>` blocks stacked vertically. Prefer pairs when they represent related views (before/after, order + result).

**Alt text:** Always write a descriptive alt attribute based on what the screenshot shows. Don't write "screenshot" or leave it empty.

### 6. Update the index page

Read `site/release-notes/index.html` and insert the new entry at the top of the correct year group's `<ul class="rn-list">`.

Template for the new list item:
```html
        <li class="rn-list__item">
          <a href="{{version-slug}}.html" class="rn-list__link">
            <span class="rn-list__version">{{version}}</span>
            <span class="rn-list__title">{{title}}</span>
          </a>
        </li>
```

If the year group doesn't exist yet (e.g. first release of a new year), create a new `<section class="rn-year-group">` at the top of `<main>` above the existing year groups:
```html
    <section class="rn-year-group">
      <h2 class="rn-year-group__heading">{{year}}</h2>
      <ul class="rn-list">
        {{new item}}
      </ul>
    </section>
```

### 7. Verify and report

After creating the page:
1. Confirm the HTML file was written
2. Confirm all referenced screenshots exist at their expected paths
3. Confirm the index was updated correctly
4. Tell the engineer to run `npx live-server site/` and visit `/release-notes/{{version-slug}}` to preview

Report a summary like:
```
Release {{version}} created:
• Page: site/release-notes/{{version-slug}}.html
• Screenshots: {{count}} copied to site/release-notes/assets/{{version-slug}}/
• Index updated at top of {{year}} section
• Preview: http://localhost:8080/release-notes/{{version-slug}}
```

## Rules you must follow

- **Never overwrite an existing release page silently.** Always ask.
- **No em-dashes in visible copy.** Use commas, periods, or rewrite.
- **Use `&ndash;`** in the h1 title between version and title.
- **Use `|` separator** in `<title>` tags (not `—`).
- **Escape special characters**: `&` → `&amp;`, `<` → `&lt;`, etc. in body copy.
- **Preserve the engineer's technical accuracy.** Don't invent version numbers, feature names, or fixes.
- **Screenshots must exist** before generating HTML that references them. If a file is missing, stop and ask.
- **One page per release.** Don't mix multiple version numbers.
