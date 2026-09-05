/* ==========================================================================
   HALSTEAD — site script

   Every block below feature-detects its own hooks, so one file drives all
   pages: the home page runs the full choreography, interior pages run only
   the pieces they contain.

   FIVE EFFECTS, EACH DOING DISTINCT WORK. Nothing else animates.
   1. Line clip-path wipe    — every headline, on every page
   2. Diagonal wipe          — hero -> work, home page only, exactly once
   3. Horizontal gallery     — pinned lateral portfolio track (home)
   4. Six distinct entrances — one per card, off the horizontal progress
   5. Word-by-word lighting  — the point-of-view claim lights as you scroll

   Supporting, deliberately sparse: depth parallax on decorative layers only,
   one 11s float loop on the hero visual (CSS), quiet non-repeating seams.

   Only transform / opacity / filter / clip-path are ever animated — never
   width, height, top, left or color. will-change goes on at tween start and
   comes straight back off.

   The motion setup lives in initMotion(), inside a gsap.context, so it can be
   re-run against fresh DOM: the multi-page site calls it once on load, and the
   single-file bundle calls it again after each client-side route change. Both
   entry points are exposed on window.Halstead.
   ========================================================================== */
(function () {
  'use strict';

  var root    = document.documentElement;
  var animate = root.classList.contains('anim');
  var coarse  = root.classList.contains('coarse');

  /* Behaviour that must work with or without motion, and with or without
     GSAP, runs first and unconditionally. Re-runnable: after a route change
     the form and the year stamp are new DOM. */
  function bind() { initNav(); initForm(); initYear(); }
  bind();

  /* FAILSAFE — if GSAP never arrives (blocked CDN, offline, script error),
     strip .anim so every hidden initial state resolves and the page is
     completely readable. */
  if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
    root.classList.remove('anim');
    window.Halstead = { bind: bind, initMotion: function () {} };
    return;
  }
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });

  if (!animate) {           // prefers-reduced-motion: nothing below ever runs
    window.Halstead = { bind: bind, initMotion: function () {} };
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ overwrite: 'auto' });

  function wcOn(t)  { gsap.set(t, { willChange: 'transform' }); }
  function wcOff(t) { gsap.set(t, { willChange: 'auto' }); }

  var D = coarse ? 0.7 : 1;   // duration scalar on touch
  var P = coarse ? 0.4 : 1;   // parallax intensity scalar on touch

  /* ---------------------------------------------------------------------
     TECHNIQUE 1 — LINE CLIP-PATH WIPE
     A wipe reads as typeset. A bounce reads as a toy.
     --------------------------------------------------------------------- */
  function lineWipe(el, opts) {
    if (!el) return null;
    opts = opts || {};
    var lines = el.querySelectorAll('.line > span');
    if (!lines.length) return null;
    return gsap.to(lines, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.05 * D,
      ease: 'power3.out',
      stagger: 0.1 * D,
      delay: opts.delay || 0,
      scrollTrigger: opts.scroll === false ? undefined : {
        trigger: el, start: 'top 82%', once: true
      },
      onStart:    function () { wcOn(lines); },
      onComplete: function () { wcOff(lines); }
    });
  }

  function fadeUp(els, opts) {
    if (!els || !els.length) return null;
    opts = opts || {};
    return gsap.to(els, {
      opacity: 1, y: 0,
      duration: 0.9 * D,
      ease: 'power2.out',
      stagger: opts.stagger != null ? opts.stagger : 0.09,
      delay: opts.delay || 0,
      scrollTrigger: opts.scroll === false ? undefined : {
        trigger: opts.trigger || els, start: 'top 85%', once: true
      },
      onStart:    function () { wcOn(els); },
      onComplete: function () { wcOff(els); }
    });
  }
  var ctx = null;

  /* The nav is not part of any page's content — it persists across a route
     change — so its entrance runs once, outside the revertible context. */
  var nav = document.querySelector('.nav[data-nav-reveal]');
  if (nav) {
    gsap.to(nav, {
      opacity: 1, y: 0, duration: 0.8 * D, ease: 'power3.out',
      delay: document.getElementById('heroTitle') ? 1.1 : 0.35,
      onStart:    function () { wcOn(nav); },
      onComplete: function () { wcOff(nav); }
    });
  }

  /* Build every scroll-driven effect against the DOM as it stands now.
     Calling it again reverts the previous context — inline styles, tweens and
     ScrollTriggers all go — and rebuilds from scratch. */
  function initMotion() {
    if (ctx) ctx.revert();
    ScrollTrigger.getAll().forEach(function (t) { t.kill(); });

    ctx = gsap.context(function () {
      gsap.set('[data-fade]', { y: 22 });

      /* Any headline not claimed by a bespoke timeline below wipes on scroll. */
      gsap.utils.toArray('.wipe').forEach(function (el) {
      if (el.dataset.wipe === 'manual') return;
      lineWipe(el);
      });

      /* Any [data-fade] not inside a bespoke group fades on scroll, grouped by
       its nearest section so a group moves together. */
      gsap.utils.toArray('[data-fade-group]').forEach(function (group) {
      fadeUp(gsap.utils.toArray(group.querySelectorAll('[data-fade]')), { trigger: group });
      });

      /* ---------------------------------------------------------------------
       HOME HERO — entrance choreography (on load, not on scroll)
       --------------------------------------------------------------------- */
      var heroTitle = document.getElementById('heroTitle');
      if (heroTitle) {
      var heroFades = gsap.utils.toArray('#hero [data-fade]');
      gsap.timeline({ delay: 0.15 })
        .add(lineWipe(heroTitle, { scroll: false }))
        .add(fadeUp(heroFades, { scroll: false }), 0.35);
      }

      /* Interior page heroes get the same idea, shorter. */
      var pageTitle = document.getElementById('pageTitle');
      if (pageTitle) {
      var pageFades = gsap.utils.toArray('.phero [data-fade]');
      gsap.timeline({ delay: 0.1 })
        .add(lineWipe(pageTitle, { scroll: false }))
        .add(fadeUp(pageFades, { scroll: false }), 0.3);
      }

      /* ---------------------------------------------------------------------
       DEPTH PARALLAX — decorative layers only.
       Content layers (depth 3/4) never parallax; drifting body copy is the
       fastest way to look cheap.
       --------------------------------------------------------------------- */
      var factors = { '0': 0.10, '1': 0.25, '2': 0.50, '5': 1.20 };
      gsap.utils.toArray('[data-parallax]').forEach(function (layer) {
      var f = factors[layer.dataset.depth] || 0.3;
      gsap.to(layer, {
        yPercent: -14 * f * P,
        ease: 'none',
        scrollTrigger: {
          trigger: layer.closest('.scene'),
          start: 'top bottom', end: 'bottom top', scrub: true,
          onToggle: function (self) { self.isActive ? wcOn(layer) : wcOff(layer); }
        }
      });
      });

      /* ---------------------------------------------------------------------
       TECHNIQUE 2 — DIAGONAL WIPE (hero -> work). Used exactly once.
       The veil carries the hero's own gradient, so the hero plane appears to
       slide off along a tilted edge and uncover the work beneath it.
       --------------------------------------------------------------------- */
      var veil = document.getElementById('veil');
      if (veil) {
      gsap.fromTo(veil,
        { clipPath: 'polygon(0 0, 100% 0, 100% 130%, 0 170%)' },
        {
          clipPath: 'polygon(0 -1%, 100% -1%, 100% -45%, 0 -5%)',
          ease: 'none',
          scrollTrigger: {
            trigger: '#work', start: 'top bottom', end: 'top 12%', scrub: 0.6,
            onToggle: function (self) { self.isActive ? wcOn(veil) : wcOff(veil); }
          }
        }
      );
      }

      /* ---------------------------------------------------------------------
       TECHNIQUES 3 + 4 — HORIZONTAL GALLERY & SIX DISTINCT ENTRANCES
       Six wide 16:10 previews whose whole point is range need to sit side by
       side; a stack buries all but the top one. Lateral travel also does work
       no other section does. It turns gimmicky the moment it hijacks touch
       scroll — so on (pointer: coarse) it is a plain vertical stack.
       Identical entrances x6 read as a template; varied ones read as a person
       deciding each card.
       --------------------------------------------------------------------- */
      var track = document.getElementById('workTrack');
      var pin   = document.getElementById('workPin');
      var cards = gsap.utils.toArray('.work__track .card');

      var entrances = {
      wipe:    { from: { clipPath: 'inset(0 100% 0 0)', x: -40 },          to: { clipPath: 'inset(0 0% 0 0)', x: 0, ease: 'power3.out' } },
      rise:    { from: { y: 70, opacity: 0 },                              to: { y: 0, opacity: 1, ease: 'power3.out' } },
      scale:   { from: { scale: 0.87, opacity: 0 },                        to: { scale: 1, opacity: 1, ease: 'power2.out' } },
      slide:   { from: { x: 110, skewY: 2.5, opacity: 0 },                 to: { x: 0, skewY: 0, opacity: 1, ease: 'power3.out' } },
      curtain: { from: { clipPath: 'inset(100% 0 0 0)' },                  to: { clipPath: 'inset(0% 0 0 0)', ease: 'power3.out' } },
      focus:   { from: { filter: 'blur(12px)', opacity: 0, scale: 1.04 },  to: { filter: 'blur(0px)', opacity: 1, scale: 1, ease: 'power2.out' } }
      };

      if (!coarse && track && pin && cards.length) {
      var distance = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };
      var rail = document.getElementById('railFill');

      var horizontal = gsap.to(track, {
        x: function () { return -distance(); },
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: function () { return '+=' + distance(); },
          pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
          onToggle: function (self) { self.isActive ? wcOn(track) : wcOff(track); },
          onUpdate: function (self) { if (rail) gsap.set(rail, { scaleX: self.progress }); }
        }
      });

      cards.forEach(function (card) {
        var spec = entrances[card.dataset.entrance] || entrances.rise;
        gsap.fromTo(card, spec.from, Object.assign({}, spec.to, {
          duration: 1.0,
          scrollTrigger: { trigger: card, containerAnimation: horizontal, start: 'left 92%', once: true },
          onStart: function () { wcOn(card); },
          /* Clear the inline transform afterwards so the CSS hover lift works
             again — an inline transform left by GSAP outranks the :hover rule. */
          onComplete: function () { gsap.set(card, { clearProps: 'willChange,transform,clipPath,filter' }); }
        }));
      });
      } else if (cards.length) {
      /* Touch fallback — same content, one calm reveal, no hijacked scroll. */
      cards.forEach(function (card) {
        gsap.fromTo(card, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          onStart:    function () { wcOn(card); },
          onComplete: function () { gsap.set(card, { clearProps: 'willChange,transform' }); }
        });
      });
      }

      /* ---------------------------------------------------------------------
       QUIET SEAM — work -> process: a hairline draws across on scaleX, then
       the steps step up in sequence.
       --------------------------------------------------------------------- */
      var rule = document.getElementById('processRule');
      if (rule) {
      gsap.to(rule, {
        scaleX: 1, duration: 1.3 * D, ease: 'power2.inOut',
        scrollTrigger: { trigger: rule, start: 'top 88%', once: true },
        onStart:    function () { wcOn(rule); },
        onComplete: function () { wcOff(rule); }
      });
      }
      var steps = gsap.utils.toArray('.step');
      if (steps.length) {
      gsap.to(steps, {
        clipPath: 'inset(0 0 0% 0)', duration: 0.9 * D, ease: 'power3.out', stagger: 0.13 * D,
        scrollTrigger: { trigger: '.steps', start: 'top 84%', once: true },
        onStart:    function () { wcOn(steps); },
        onComplete: function () { wcOff(steps); }
      });
      }

      /* ---------------------------------------------------------------------
       TECHNIQUE 5 — WORD-BY-WORD SCROLL LIGHTING
       The claim is its own demo. Opacity only — never color, which is not
       GPU-composited. Roughly 70px of scroll per word.
       --------------------------------------------------------------------- */
      var claim = document.getElementById('claim');
      if (claim) {
      var text = claim.textContent.trim();
      claim.setAttribute('aria-label', text);
      var accent = (claim.dataset.accent || 'care').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      var re = new RegExp(accent + '\\.?$', 'i');
      var parts = text.split(/\s+/);
      claim.textContent = '';
      parts.forEach(function (w, i) {
        var span = document.createElement('span');
        span.className = 'w' + (re.test(w) ? ' accent' : '');
        span.textContent = w;
        claim.appendChild(span);
        if (i < parts.length - 1) claim.appendChild(document.createTextNode(' '));
      });

      var words = claim.querySelectorAll('.w');
      var lit = -1;
      ScrollTrigger.create({
        trigger: '#manifestoStage',
        start: 'top top',
        end: '+=' + (words.length * (coarse ? 46 : 72)),
        pin: !coarse, scrub: 0.4, anticipatePin: 1,
        onUpdate: function (self) {
          var n = Math.round(self.progress * words.length);
          if (n === lit) return;
          lit = n;
          for (var i = 0; i < words.length; i++) words[i].classList.toggle('lit', i < n);
        }
      });
      }

      /* ---------------------------------------------------------------------
       QUIET SEAM — into contact: blur-to-focus settle
       --------------------------------------------------------------------- */
      var panel = document.getElementById('contactPanel');
      if (panel) {
      gsap.to(panel, {
        opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.1 * D, ease: 'power2.out',
        scrollTrigger: { trigger: panel, start: 'top 84%', once: true },
        onStart:    function () { gsap.set(panel, { willChange: 'transform, filter' }); },
        onComplete: function () { wcOff(panel); }
      });
      }

      /* ---------------------------------------------------------------------
       WORK INDEX — rows arrive one at a time, alternating side
       --------------------------------------------------------------------- */
      gsap.utils.toArray('.index-row').forEach(function (row, i) {
      gsap.fromTo(row,
        { opacity: 0, x: i % 2 ? 34 : -34 },
        {
          opacity: 1, x: 0, duration: 0.85 * D, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 88%', once: true },
          onStart:    function () { wcOn(row); },
          onComplete: function () { gsap.set(row, { clearProps: 'willChange,transform' }); }
        }
      );
      });

      /* ---------------------------------------------------------------------
       CASE STUDY — the outcome numbers count up once, in place
       --------------------------------------------------------------------- */
      var stats = gsap.utils.toArray('.stat');
      if (stats.length) {
      gsap.to(stats, {
        opacity: 1, y: 0, duration: 0.8 * D, ease: 'power2.out', stagger: 0.12,
        scrollTrigger: { trigger: stats[0].parentNode, start: 'top 86%', once: true },
        onStart:    function () { wcOn(stats); },
        onComplete: function () { wcOff(stats); }
      });
      gsap.set(stats, { y: 18 });
      }

    });

    ScrollTrigger.refresh();
  }

  initMotion();
  window.Halstead = { bind: bind, initMotion: initMotion };

  /* Recompute pinned distances when the viewport changes shape. */
  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { ScrollTrigger.refresh(); }, 180);
  });

  /* =====================================================================
     NON-MOTION BEHAVIOUR
     ===================================================================== */

  /* Mobile nav: a real disclosure. Closes on escape, on outside click, and
     whenever the viewport grows past the breakpoint. */
  function initNav() {
    var toggle = document.querySelector('.nav__toggle');
    var links  = document.getElementById('navLinks');
    if (!toggle || !links) return;
    /* The nav survives a route change, so binding is once-only — otherwise
       every route would stack another set of listeners on the same button. */
    if (toggle.dataset.bound) return;
    toggle.dataset.bound = '1';

    var mq = window.matchMedia('(max-width: 820px)');
    function sync() {
      if (mq.matches) {
        links.hidden = toggle.getAttribute('aria-expanded') !== 'true';
      } else {
        links.hidden = false;
        toggle.setAttribute('aria-expanded', 'false');
      }
    }
    function close() { toggle.setAttribute('aria-expanded', 'false'); sync(); }

    toggle.addEventListener('click', function () {
      toggle.setAttribute('aria-expanded', toggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
      sync();
    });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    document.addEventListener('click', function (e) {
      if (mq.matches && !e.target.closest('.nav')) close();
    });
    (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(sync);
    sync();
  }

  /* Project enquiry form. There is no backend behind a static site, so it
     validates properly, then hands over a prefilled mailto rather than
     pretending to have sent something. */
  function initForm() {
    var form = document.getElementById('projectForm');
    if (!form) return;
    var status = document.getElementById('formStatus');

    function fail(input, message) {
      var field = input.closest('.field');
      if (field) {
        field.setAttribute('data-invalid', '');
        var slot = field.querySelector('.field__error');
        if (slot) slot.textContent = message;
      }
      input.setAttribute('aria-invalid', 'true');
    }
    function clear(input) {
      var field = input.closest('.field');
      if (field) {
        field.removeAttribute('data-invalid');
        var slot = field.querySelector('.field__error');
        if (slot) slot.textContent = '';
      }
      input.removeAttribute('aria-invalid');
    }

    form.addEventListener('input', function (e) {
      if (e.target.matches('input,textarea,select')) clear(e.target);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (status) status.textContent = '';

      /* Honeypot: a bot fills every field it finds, a person never sees it. */
      var trap = form.querySelector('[name="company_website"]');
      if (trap && trap.value) return;

      var name    = form.querySelector('#name');
      var email   = form.querySelector('#email');
      var project = form.querySelector('#project');
      var budget  = form.querySelector('#budget');
      var first   = null;

      [name, email, project].forEach(clear);

      if (!name.value.trim())    { fail(name, 'A name helps me write back properly.'); first = first || name; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        fail(email, 'Add an email address and I can reply to it.'); first = first || email;
      }
      if (project.value.trim().length < 12) {
        fail(project, 'A sentence or two, so I know what I would be building.'); first = first || project;
      }
      if (first) { first.focus(); if (status) status.textContent = 'Three details missing at most — see the notes above.'; return; }

      var body =
        'Name: ' + name.value.trim() + '\n' +
        'Email: ' + email.value.trim() + '\n' +
        'Budget: ' + (budget.value || 'Not specified') + '\n\n' +
        project.value.trim();

      window.location.href = 'mailto:hello@halstead.studio' +
        '?subject=' + encodeURIComponent('Project enquiry — ' + name.value.trim()) +
        '&body=' + encodeURIComponent(body);

      if (status) {
        status.textContent = 'Opening your email client with this filled in. If nothing happens, send it to hello@halstead.studio.';
      }
    });
  }

  /* Copyright year, so the footer never goes stale. */
  function initYear() {
    var y = document.querySelectorAll('[data-year]');
    for (var i = 0; i < y.length; i++) y[i].textContent = new Date().getFullYear();
  }
})();
