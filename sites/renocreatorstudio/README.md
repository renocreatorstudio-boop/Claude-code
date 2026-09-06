# RenoCreatorStudio

A portfolio site for websites, apps and artwork. Plain HTML, CSS and JavaScript —
no framework, no page builder, nothing to install.

## Look at it

```sh
cd sites/renocreatorstudio
python3 -m http.server 8000
# open http://localhost:8000
```

## Adding a project — the only thing you do regularly

1. Open **`content/projects.json`**.
2. Copy an existing block, paste it, change the values.
3. Run `node build/generate.js`.

That one file drives the home gallery, the work index and the case study page.
You never edit the same fact in three places.

```jsonc
{
  "slug": "my-project",        // the file name: work/my-project.html
  "hidden": false,             // true = built but not linked anywhere
  "status": "live",            // live · in-progress · planned
  "discipline": "Website",     // Website · App · Art — sets the preview layout
  "title": "Project name",
  "client": "Who it was for",  // or "Self-directed"
  "year": "2026",
  "art": 1,                    // 1-6, picks the preview gradient
  "summary": "One sentence for the card.",
  "tags": ["Design", "Build", "Copy"],
  "headline": ["First line", "and the <em>second</em>."],
  "lede": "Two sentences under the headline.",
  "meta":  [{ "label": "Role", "value": "Design and build" }],
  "stats": [{ "value": "+41%", "label": "what that number means" }],
  "spec":  [{ "label": "Tools", "value": "What you used" }],
  "sections": [{ "label": "01", "title": "Heading", "body": ["A paragraph."] }]
}
```

**`stats` is optional and that is deliberate.** Leave it as `[]` and the case study
shows the `spec` list instead. Numbers you cannot stand behind are worse than no
numbers — never put a figure on the page you would not want a client to ask about.

Other useful moves:

- **Reorder the work** — move blocks up or down in the array. Card entrance
  animations reassign themselves automatically.
- **Park an unfinished project** — set `"hidden": true`. It stays in the file, but
  no page links to it.
- **Start from nothing** — an empty `[]` is valid. The work page shows a proper
  empty state rather than breaking.

## Editing the words

Each fixed page is a plain HTML fragment in `content/pages/`. Edit the prose there
and re-run the build. Shared chrome — the header, footer, enquiry form and every
`<head>` — lives in `build/generate.js`, so changing the nav changes it everywhere
at once.

Studio name, email and the hero availability line are in `content/site.json`.

## Before you put it online

- [ ] Change `email` in `content/site.json`. It is currently
      `hello@renocreatorstudio.com`, a domain that does not exist — a `mailto:` to a
      dead domain fails silently and you never find out.
- [ ] Change `url` in `content/site.json` so the sitemap points at the real address.
- [ ] Fill in or hide every `[bracketed placeholder]`. Run the build and it tells
      you how many are left.
- [ ] Replace the `[PRICING]` block on `content/pages/studio.html`, or delete it.
- [ ] Answer the two `[ANSWER]` questions in the FAQ on `content/pages/contact.html`.

Then push the folder to any static host — GitHub Pages, Netlify, Cloudflare Pages
and Vercel all serve it as-is, and all four pick up `404.html` automatically.

## How it is built

```
content/         everything you edit
build/generate.js  reads content/, writes the pages
assets/css/      design tokens and every component, one stylesheet
assets/js/       boot gate, page behaviour, GSAP
index.html …     generated — do not hand-edit, the build overwrites them
```

Generated pages are committed on purpose, so the site works with zero tooling. If
you never want to run Node, you can hand-edit the HTML directly — just know the
next `generate.js` run overwrites it.

## The five effects

Each does distinct work. Nothing else animates.

1. **Line wipe** — every headline. A wipe reads as typeset; a bounce reads as a toy.
2. **Diagonal wipe** — hero into work, used exactly once.
3. **Horizontal gallery** — a pinned lateral track, so work that is about range sits
   side by side instead of stacked.
4. **A different entrance per card** — identical entrances read as a template.
5. **Word-by-word lighting** — the point-of-view line lights one word at a time.

## How it degrades

| Condition | Behaviour |
| --- | --- |
| `prefers-reduced-motion: reduce` | `.anim` is never added, so no hidden state exists and the page renders complete and static |
| GSAP fails to load | `.anim` is stripped on the spot; everything resolves visible; nav and form still work |
| No JavaScript at all | The page renders finished; the gallery becomes a vertical stack |
| Touch screens | No pinning, no scroll-jacking; parallax at 40%, durations at 70% |

Only `transform`, `opacity`, `filter` and `clip-path` are ever animated — never
`width`, `height`, `top`, `left` or `color`.

## Notes

- **Zero image files.** Every preview, panel and glow is drawn in CSS, so there is
  nothing to optimise and nothing to go missing. Replace them with real screenshots
  when you have work worth showing.
- **The form has no backend.** It validates properly, then opens a prefilled
  `mailto:`. A honeypot field catches bots. Point it at a real endpoint by replacing
  the submit handler in `assets/js/site.js`.
- Design and motion system adapted from `sites/halstead` in this repo.
- GSAP 3.12.5 under the [GreenSock standard license](https://gsap.com/standard-license).
  Fraunces, Public Sans and JetBrains Mono under the SIL Open Font License 1.1.
