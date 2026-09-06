# RenoCreatorStudio portfolio — build prompt

Reverse-engineered from `sites/halstead`. Paste the block below into a Taskade AI
agent or AI chat. Fill the `[BRACKETED]` placeholders first — the prompt tells the
model to leave unfilled ones visible rather than invent content.

---

```
ROLE
You are a senior front-end designer-developer who writes HTML, CSS and JavaScript by
hand. No frameworks, no page builders, no CSS libraries, no component kits.

GOAL
Produce ONE self-contained HTML document: the portfolio site for RenoCreatorStudio,
a one-person design studio run by [YOUR NAME] that works entirely over the internet.
It designs websites, apps and original artwork for clients anywhere. All CSS, all
JavaScript and every page live in that single file. The only external requests
allowed are the Google Fonts link and the two GSAP scripts named below.

The studio spans three disciplines, so the site has to make range look deliberate
rather than unfocused. Every project carries a discipline label — Website, App or
Art — and the work gallery mixes them on purpose: the argument the site makes is
that one eye ran all of it.

CONTENT RULES — these override everything else
- Never invent a client name, statistic, testimonial, quote, logo or award. Where I
  have not supplied real content, output the placeholder text exactly as written in
  square brackets so I can see what to fill in.
- Never use a stock photo, an <img>, or any raster asset. Every visual — project
  previews, panels, glows, grain — is drawn in CSS.
- Use the copy I supply below verbatim. Write any remaining copy in the same voice:
  short declarative sentences, concrete nouns, plain [US or UK — pick one] English.
  Never "elevate", "seamless", "unlock", "bespoke", "passionate", "in today's
  digital landscape". No exclamation marks. No sentence that would be equally true
  of any other studio.

COPY — use these exactly
Studio name: RenoCreatorStudio. Never abbreviate it, never add "the".

Home hero
  eyebrow:   RenoCreatorStudio — design studio, working anywhere
  headline:  three wipe lines, the italic --sand emphasis on the third —
               "I make the things"
               "people judge you by"
               "before they <em>ever meet you</em>."
  lede:      Websites, apps and original artwork for people who need the work to
             look considered the moment it loads. One person, start to finish,
             wherever you are.
  buttons:   "See the work" (solid) and "Start a project" (ghost)
  status:    [AVAILABILITY — e.g. Two project slots open this quarter]

Work section
  eyebrow:   Selected work
  heading:   two wipe lines — "Different mediums." / "The same eye."
  aside:     Every one designed and made by the same pair of hands.
  outro:     Websites, apps and artwork are the same job wearing different clothes:
             decide what someone should feel in the first second, then remove
             everything that gets in the way of it.

Process section — four steps, shown as 01 to 04
  heading:   three wipe lines — "You always know" / "which week you're in," /
             "and what <em>comes next</em>."
  lede:      No account manager, no relay race. You talk to the person doing the
             work, every time.
  01 — Brief · "Questions before pictures"
       Who it is for, what it has to do, and the one sentence you would never let a
       stranger write about you. No moodboards yet.
  02 — Direction · "Two routes, not ten"
       Two real directions on your actual content, at full size. Choosing between
       two is a decision. Choosing between ten is a lottery.
  03 — Make · "Built, not assembled"
       Sites and apps written by hand. Artwork made at full resolution and delivered
       in every format you will actually need.
  04 — Hand over · "I stay past delivery"
       Launch, migration or final files, then two weeks of fixes and a short
       handover video. No lock-in of any kind.

Point of view section — this is the word-by-word lighting sentence
  eyebrow:   Point of view
  claim:     Detail is not decoration. It's how anything you make tells a stranger
             it was made with care.
             (the final word "care" is the italic --sand accent word)
  tail:      A button that answers the instant you press it. An app that opens where
             you left it. A line that stops exactly where it should. Nobody names
             any of it out loud — and everybody decides on it anyway.

Studio page
  headline:  three wipe lines — "One person," / "start to finish," /
             "<em>no handoffs</em>."
  beliefs, as four short blocks:
    Speed is a design decision — not something you optimise afterwards.
    Accessibility is not a phase — it is how the thing is built from the first line.
    Motion has to mean something — every animation earns its place or it goes.
    You should be able to leave — you get the source, the files and no lock-in.
  pricing:   Priced per project, fixed before work starts, in [CURRENCY]. Supply the
             ranges as label/value pairs. If I have not given ranges, write
             "[PRICING — add your ranges]" rather than guessing a number.

Contact page
  headline:  two wipe lines — "Tell me what" / "you're <em>making</em>."
  lede:      One project at a time, so the answer is either a real yes or a fast no.
             You'll hear back within two working days, from me.
  faq:       What does a project cost? · How soon could you start? · Do you work
             with agencies? · Can you do just the design and we'll build it? · Do
             you take on artwork on its own? · Will I be able to edit it myself?
             Answer each in two or three sentences, or leave "[ANSWER]" if the
             answer depends on facts I have not given you.

404 page
  headline:  two wipe lines — "This page was" / "never <em>made</em>."

Footer
  blurb:     Independent design studio — websites, apps and artwork, one project at
             a time, for clients anywhere.
  legal:     © [YEAR] RenoCreatorStudio. Designed and made by hand.

PAGES — one document, hash-routed
Each page is a <template data-route="...">; a tiny router clones the matching one
into <main> on load and on hashchange, then calls initMotion() to rebuild the
scroll animations against the new DOM. Default route is "/".
  /              Home: hero, horizontal work gallery, process, point of view, contact
  /work          All projects as an editorial index
  /work/<slug>   One case study per project: problem, approach, build, outcome
  /process       The four phases in full, plus what the studio is a bad fit for
  /studio        Who it is, what it believes, how it prices
  /contact       Enquiry form and FAQ
  /404           Not found
Use [NUMBER OF PROJECTS] projects, ideally at least one from each discipline. For
each I will supply: name, discipline (Website / App / Art), what it was for, year,
a one-sentence summary of the problem and the fix, and three tags.

Outcome numbers are OPTIONAL and must never be invented. Build each case study to
work either way:
  - If I give figures, show them in the three-across stat band, big serif numeral in
    --sand over a one-line explanation.
  - If I give none, drop the stat band entirely and put a spec list in its place —
    label and value pairs such as Discipline, Deliverables, Tools, Timeline, Format.
    A case study with no numbers must still look finished, not like a page with a
    hole in it.
Art projects use the same four-part case study, with the sections re-read as: what
it was for, the direction taken, how it was made, and where it ended up.

DESIGN TOKENS — use these exact values as CSS custom properties on :root
  --ink #07080A          page ground
  --ink-2 #0C0E12        alternate section ground
  --panel #13161B        card base
  --panel-2 #191D23      card top of gradient
  --text #EFECE6         body text
  --muted #9B9EA6        secondary text
  --faint rgba(239,236,230,.10)     hairlines and borders
  --faint-2 rgba(239,236,230,.055)  quieter borders
  --sand #E3B778         the single accent: CTAs, italic emphasis, numbers, markers
  --slate #7C93AE        cool secondary glow
  --sage #8FA98C         availability pip only
  --clay #C98C6B         form error text only
  --gutter clamp(1.25rem, 5vw, 6rem)
  --maxw 1240px
  --ease cubic-bezier(.22,.61,.36,1)
Dark only. Set <meta name="color-scheme" content="dark"> and theme-color #07080A.
Sand is the only accent — one accent used consistently reads as a decision, three
read as indecision.

TYPE
  Display: Fraunces, weight 420, letter-spacing -.02em, line-height 1.06,
    text-wrap balance. Italic Fraunces in --sand for the emphasised phrase in each
    headline — one phrase per headline, never more.
  Body: Public Sans, 400-600, line-height 1.6, letter-spacing .005em, size
    clamp(1rem, .95rem + .25vw, 1.0625rem).
  Labels: JetBrains Mono 500, ~.72rem, letter-spacing .16em-.22em, UPPERCASE, in
    --muted. Used for eyebrows, card meta, form labels, footer headings, spec lists.
  Load all three from Google Fonts with display=swap and preconnect.
  Home h1: clamp(2.5rem, 1.4rem + 5.1vw, 5.15rem). Section h2: clamp(2rem, 1.2rem +
  3.4vw, 3.5rem). Lede: clamp(1.02rem, .98rem + .32vw, 1.2rem) in --muted, max-width
  46ch. Body prose max-width 62ch.

DEPTH SYSTEM
Every section is .scene { position:relative; isolation:isolate } and must never clip
— an ancestor with overflow:clip or a transform breaks position:fixed pinning.
Inside it, absolutely-positioned .layer elements each clip their own contents and
carry data-depth:
  0  gradient ground, filter: blur(8px), parallax factor .10
  1  colour glows, factor .25
  2  grid lines and hairlines, factor .50
  3  decorative foreground content, no parallax
  4  all real page content, no parallax
  5  small foreground accents and the transition veil, factor 1.20
Parallax is yPercent: -14 * factor, ease none, scrub true, triggered on the parent
.scene from "top bottom" to "bottom top". Content layers (3 and 4) never parallax —
drifting body copy is the fastest way to look cheap.
Atmosphere primitives, all CSS: .glow (border-radius 50%, filter blur(90px), opacity
.5), .hairline (1px, linear-gradient transparent to --faint to transparent), and one
fixed .grain overlay — an inline SVG feTurbulence data URI, baseFrequency .8,
numOctaves 3, opacity .05, mix-blend-mode overlay, pointer-events none.

MOTION — exactly five effects, each doing distinct work. Nothing else animates.
Load GSAP 3.12.5 and ScrollTrigger from a CDN with defer.
1. LINE CLIP WIPE — every headline. Wrap each line in .line (overflow hidden) with an
   inner span starting at clip-path: inset(0 100% 0 0), animating to inset(0 0% 0 0).
   duration 1.05, ease power3.out, stagger 0.1, ScrollTrigger start "top 82%", once.
   The hero and interior page titles run this on load instead, not on scroll.
   A wipe reads as typeset; a bounce reads as a toy.
2. DIAGONAL WIPE — used exactly once, hero into work. A full-viewport veil painted
   with the hero's own gradient, clip-path polygon(0 0, 100% 0, 100% 130%, 0 170%),
   scrubbing to polygon(0 -1%, 100% -1%, 100% -45%, 0 -5%) between the work
   section's "top bottom" and "top 12%", scrub 0.6. The hero plane appears to slide
   off along a tilted edge and uncover the work beneath it.
3. HORIZONTAL GALLERY — the work track pins for one viewport height and travels
   laterally by (track.scrollWidth - window.innerWidth), scrub 0.6, anticipatePin 1,
   invalidateOnRefresh true. Cards are flex: 0 0 min(52vw, 600px), 16:10 preview over
   a text body. A thin progress rail below scales from 0 to 1 on the same progress.
   Wide previews whose whole point is range need to sit side by side; a stack buries
   all but the top one.
4. A DISTINCT ENTRANCE PER CARD — assign these in order, one per card, and if there
   are more cards than entrances start the list again. Fired off the horizontal
   progress via containerAnimation, start "left 92%", once, duration 1.0:
     wipe    clip-path inset(0 100% 0 0) and x -40  ->  inset(0 0% 0 0), x 0, power3.out
     rise    y 70, opacity 0                        ->  y 0, opacity 1, power3.out
     scale   scale .87, opacity 0                   ->  scale 1, opacity 1, power2.out
     slide   x 110, skewY 2.5, opacity 0            ->  x 0, skewY 0, opacity 1, power3.out
     curtain clip-path inset(100% 0 0 0)            ->  inset(0% 0 0 0), power3.out
     focus   blur(12px), opacity 0, scale 1.04      ->  blur(0), opacity 1, scale 1, power2.out
   On complete, clearProps the transform so the CSS hover lift works again — an inline
   transform left behind outranks the :hover rule. Identical entrances read as a
   template; varied ones read as a person deciding each card.
5. WORD-BY-WORD SCROLL LIGHTING — the point-of-view claim. Split the sentence into
   word spans at runtime, set aria-label to the full sentence first so screen readers
   get one string. Words sit at opacity .16 and go to 1 one at a time as the pinned
   section scrubs, roughly 72px of scroll per word. Opacity only, never colour, which
   is not GPU-composited. The claim is its own demo — the sentence is about care, so
   the section has to be the most careful thing on the page.
Supporting and deliberately sparse: the depth parallax above, one 11s CSS float loop
on the hero visual (translate 10px to -14px, rotate -.5deg to .6deg, scale .995 to
1.012, alternate), a hairline that draws across on scaleX before the process steps
clip up in sequence, and a blur-to-focus settle on the contact panel.
Only transform, opacity, filter and clip-path are ever animated — never width,
height, top, left or colour. Set will-change at tween start and remove it on complete.

CSS-DRAWN PROJECT PREVIEWS
Each card and case study opens with a 16:10 panel drawn entirely in CSS: a diagonal
gradient ground, two or three rounded bars suggesting a headline and lines of text,
and one large block or a two-up split suggesting an image area, under a soft
top-to-bottom darkening overlay. Give each project its own gradient so the row reads
as six different things rather than one thing repeated — cool blue for Website, warm
amber or clay for App, a muted violet, green or teal for Art. Keep every one at low
saturation so no card outshouts the type. All of it is aria-hidden: meaning lives
entirely in the text.

DEGRADATION — non-negotiable, build it in from the start
Put a small synchronous script in <head>, before paint, that adds html.anim only when
prefers-reduced-motion is not "reduce", and html.coarse when pointer is coarse. Every
hidden initial state in the CSS is gated behind .anim, so:
  reduced motion   .anim is never added, no hidden state exists, the page renders
                   complete and static, and the JS returns before any tween.
  GSAP fails       strip .anim on the spot; every element resolves visible; nav,
                   menu and form still work.
  no JavaScript    the page renders finished; the gallery is a vertical stack.
  coarse pointer   no pinning and no scroll-jacking anywhere; the gallery is a
                   vertical stack; parallax at 40%, durations at 70%.
Also add a prefers-reduced-motion media query that collapses all animation and
transition durations to .01ms and hides the veil.

ACCESSIBILITY
Skip link as the first focusable element. Every decorative layer aria-hidden. Real
landmarks: header, main, footer, nav with aria-label. Visible :focus-visible outline,
2px solid --sand, offset 3px. The mobile menu is a real disclosure button with
aria-expanded and aria-controls, closing on Escape, on outside click, and when the
viewport grows past the breakpoint. Contrast meets WCAG 2.2 AA against #07080A.
Headline line-wrapper spans must not break the reading order.

CONTACT FORM
No backend, so do not pretend to send. Validate on submit: name required, email
against a real pattern, project description at least 12 characters. Show inline
errors under each field in --clay, set aria-invalid, focus the first failure, and
announce a summary in a role="status" live region. Include an off-screen honeypot
field named company_website — if it has a value, silently return. On success, open a
prefilled mailto: to [YOUR EMAIL] with name, email, budget and message in the body,
and tell the user that is what happened.

RESPONSIVE
One breakpoint set: 980px (hero to one column), 900px (contact panel to one column),
860px (work head to one column), 820px (mobile nav, case-study grids to one column),
600px and 520px (process steps and form rows to one column). Test the layout reads
correctly at 375px and 1440px.

OUTPUT
Return the complete HTML document in one code block, nothing else — no preamble, no
explanation, no commentary after it. Order the file: head and fonts, boot gate,
<style> with tokens then components in the order listed above, page <template>
blocks, then <script> with the router, motion and form logic. Comment each CSS
section and each motion technique with one line saying what it does and why.
If you approach a length limit, stop at a complete section boundary, end with the
line CONTINUE AT: <section name>, and resume from exactly there when I say continue.

DONE WHEN
- The file opens from disk and every route works with no network beyond fonts and GSAP.
- Setting prefers-reduced-motion renders the whole site static and complete, with
  nothing invisible.
- Deleting the GSAP script tags still leaves every page fully readable and navigable.
- No <img>, no background-image except CSS gradients and the grain data URI.
- Every unfilled placeholder is still visible in square brackets.
```

---

## What to fill in before pasting

| Placeholder | What it wants |
| --- | --- |
| `[YOUR NAME]` | who runs the studio |
| `[YOUR EMAIL]` | where the enquiry form should send |
| `[US or UK]` | which spelling to keep consistent |
| `[NUMBER OF PROJECTS]` | how many you actually want to show — four is enough |
| `[AVAILABILITY]` | the hero status line, or delete that line |
| `[CURRENCY]` and `[PRICING]` | your ranges, or leave them for the model to bracket |
| `[YEAR]` | footer copyright |

Then append your project list — name, discipline (Website / App / Art), what it was
for, year, one line on the problem and the fix, three tags, and outcome figures only
where you have real ones. Projects without figures are handled: the case study swaps
the stat band for a spec list instead of leaving a gap.

## Where this came from

Every value above is lifted from `sites/halstead`: tokens and type from
`assets/css/site.css`, the five effects and their exact easings, durations and
ScrollTrigger positions from `assets/js/site.js`, the degradation ladder from
`assets/js/boot.js`, and the single-file routing approach from `build/bundle.js`.
