# Halstead

A recreation of the Halstead studio artifact as a **full multi-page static site**:
twelve pages, no build step, no framework, no runtime dependency on anything
outside this folder.

## Run it

```sh
cd sites/halstead
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static host works — the site is plain files. `404.html` is picked up
automatically by GitHub Pages, Netlify, Cloudflare Pages and Vercel.

## Pages

| Path | What it is |
| --- | --- |
| `index.html` | Home — hero, horizontal portfolio gallery, process, point of view, contact |
| `work/index.html` | All six projects as an editorial index |
| `work/<slug>.html` | Six case studies: problem → approach → build → outcome |
| `process.html` | The four phases in full, plus what the studio is a bad fit for |
| `studio.html` | Who it is, what it believes, how it prices |
| `contact.html` | Enquiry form and FAQ |
| `404.html` | Not found |

## Structure

```
assets/
  css/site.css     design tokens + every component, one stylesheet
  css/fonts.css    self-hosted @font-face declarations
  fonts/*.woff2    Latin subsets, variable — one file per family
  js/boot.js       synchronous motion gate, runs in <head> before paint
  js/site.js       all page behaviour and motion
  js/vendor/       GSAP 3.12.5 + ScrollTrigger, served from this origin
```

`site.js` drives every page: each block feature-detects its own hooks, so the
home page runs the full choreography and interior pages run only what they
contain.

## The five effects

Each does distinct work. Nothing else animates.

1. **Line clip-path wipe** — every headline. A wipe reads as typeset; a bounce
   reads as a toy.
2. **Diagonal wipe** — hero → work, used exactly once. A veil painted with the
   hero's own gradient retracts along a tilted edge, so the hero plane appears
   to slide off and uncover the work.
3. **Horizontal gallery** — a pinned lateral track. Six wide previews whose
   whole point is range need to sit side by side; a stack buries all but the
   top one.
4. **Six distinct card entrances** — wipe, rise, scale, skewed slide, curtain,
   blur-to-focus, fired off the horizontal progress. Identical entrances ×6
   read as a template.
5. **Word-by-word scroll lighting** — the point-of-view claim lights one word
   at a time. The claim is its own demo.

Supporting and deliberately sparse: depth parallax on decorative layers only
(content never drifts), one 11s float loop on the hero visual, and quiet
non-repeating section seams.

## How it degrades

| Condition | Behaviour |
| --- | --- |
| `prefers-reduced-motion: reduce` | `.anim` is never added, so no hidden initial state exists and the page renders complete and static. The JS returns before any tween. |
| GSAP fails to load | Same failsafe: `.anim` is stripped on the spot, every element resolves visible. Nav, form and menu still work. |
| No JavaScript at all | The page renders finished. The horizontal gallery falls back to a vertical stack. |
| `pointer: coarse` | No pinning and no scroll-jacking; the gallery is a vertical stack, parallax runs at 40%, durations at 70%. |

Only `transform`, `opacity`, `filter` and `clip-path` are ever animated — never
`width`, `height`, `top`, `left` or `color`. `will-change` goes on at tween
start and comes straight back off.

## Single-file bundle

`node build/bundle.js` folds the whole site into one page — every page becomes a
`<template>`, a hash router clones one into the live `<main>` and asks
`window.Halstead.initMotion()` to rebuild the motion against it. CSS, fonts (as
data URIs) and GSAP are inlined, so the result makes **no network requests at
all**.

| Output | For |
| --- | --- |
| `dist/halstead.html` | A complete standalone document — opens from disk, drops onto any host as one file |
| `dist/halstead.artifact.html` | The same page without `<head>`, for hosts that supply their own document shell |

The bundle is a convenience, not the source: edit the pages under `sites/halstead`
and re-run the build.

## Notes

- **Zero raster assets.** Every project preview, panel and glow is drawn in CSS.
  All decorative layers are `aria-hidden`, so meaning lives entirely in the text.
- **The form has no backend.** It validates properly, shows inline errors, and
  hands over a prefilled `mailto:` rather than pretending to have sent
  something. A honeypot field catches bots. Point it at a real endpoint by
  replacing the submit handler in `assets/js/site.js`.
- **Content is fictional.** Halstead, its six clients and their numbers are
  invented for the design.
- GSAP 3.12.5 is included under the [GreenSock standard license](https://gsap.com/standard-license).
  Fraunces, Public Sans and JetBrains Mono are under the SIL Open Font License 1.1.
