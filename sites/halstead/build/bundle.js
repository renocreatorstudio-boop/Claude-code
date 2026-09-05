/* ==========================================================================
   Bundles the multi-page site into one self-contained page.

   Every page becomes a <template>; a hash router clones one into the live
   <main> and asks window.Halstead to rebuild the motion against it. CSS,
   fonts (as data URIs) and GSAP are inlined, so the result makes no network
   requests at all.

   Run:  node build/bundle.js
   Out:  dist/halstead.html          a complete standalone document
         dist/halstead.artifact.html the same page without <head>, for hosts
                                     that supply their own document shell
   ========================================================================== */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const R = p => fs.readFileSync(path.join(ROOT, p), 'utf8');

const PAGES = [
  { file: 'index.html',                route: '/',                    nav: 'home' },
  { file: 'work/index.html',           route: '/work',                nav: 'work' },
  { file: 'work/vantage.html',         route: '/work/vantage',        nav: 'work' },
  { file: 'work/osteria-marta.html',   route: '/work/osteria-marta',  nav: 'work' },
  { file: 'work/nadia-rahman.html',    route: '/work/nadia-rahman',   nav: 'work' },
  { file: 'work/field-and-flint.html', route: '/work/field-and-flint',nav: 'work' },
  { file: 'work/harbour-trust.html',   route: '/work/harbour-trust',  nav: 'work' },
  { file: 'work/bram-vos.html',        route: '/work/bram-vos',       nav: 'work' },
  { file: 'process.html',              route: '/process',             nav: 'process' },
  { file: 'studio.html',               route: '/studio',              nav: 'studio' },
  { file: 'contact.html',              route: '/contact',             nav: 'contact' },
  { file: '404.html',                  route: '/404',                 nav: '' }
];

/* ---- fonts as data URIs, so the bundle needs no network at all ---- */
let fontCss = R('assets/css/fonts.css');
fontCss = fontCss.replace(/url\('\.\.\/fonts\/([^']+)'\)/g, (_, f) => {
  const b64 = fs.readFileSync(path.join(ROOT, 'assets/fonts', f)).toString('base64');
  return `url('data:font/woff2;base64,${b64}')`;
});

const siteCss = R('assets/css/site.css');
const gsap = R('assets/js/vendor/gsap.min.js');
const scrollTrigger = R('assets/js/vendor/ScrollTrigger.min.js');
const boot = R('assets/js/boot.js');
const siteJs = R('assets/js/site.js');

/* ---- turn a page's file-relative links into routes ---- */
function toRoutes(html, dir) {
  return html.replace(/href="([^"]+)"/g, (m, href) => {
    if (/^(https?:|mailto:|data:|#)/.test(href)) return m;
    let p = href.startsWith('../') ? href.slice(3) : (dir ? dir + '/' + href : href);
    p = p.replace(/^\.\//, '');
    let route;
    if (p === 'index.html') route = '/';
    else if (p === 'work/index.html') route = '/work';
    else if (p.startsWith('work/')) route = '/work/' + path.basename(p, '.html');
    else route = '/' + path.basename(p, '.html');
    return `href="#${route}"`;
  });
}

const templates = PAGES.map(pg => {
  const html = R(pg.file);
  const dir = path.dirname(pg.file) === '.' ? '' : path.dirname(pg.file);
  const title = html.match(/<title>([^<]+)<\/title>/)[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)[1];
  const main = html.match(/<main id="main">([\s\S]*?)<\/main>/)[1];
  return `<template data-route="${pg.route}" data-nav="${pg.nav}" data-title="${title.replace(/"/g, '&quot;')}" data-desc="${desc.replace(/"/g, '&quot;')}">
${toRoutes(main, dir)}
</template>`;
}).join('\n');

/* the persistent chrome, taken from the home page and pointed at routes */
const homeHtml = R('index.html');
const nav = toRoutes(homeHtml.match(/<header class="nav"[\s\S]*?<\/header>/)[0], '');

const router = `
/* ==========================================================================
   Single-file router.

   Each page of the site is a <template>; the router clones one into the live
   <main>, then re-binds behaviour and rebuilds the motion against the new DOM
   via window.Halstead. Hashes beginning "#/" are routes; every other hash is
   an ordinary in-page anchor and is left to scroll.
   ========================================================================== */
(function () {
  'use strict';
  var main = document.getElementById('main');
  var tpls = {};
  [].forEach.call(document.querySelectorAll('template[data-route]'), function (t) {
    tpls[t.dataset.route] = t;
  });

  function setNav(key) {
    [].forEach.call(document.querySelectorAll('.nav__links a'), function (a) {
      if (a.dataset.nav === key) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  function render(route, opts) {
    var tpl = tpls[route] || tpls['/404'];
    main.replaceChildren(tpl.content.cloneNode(true));
    document.title = tpl.dataset.title;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', tpl.dataset.desc);
    setNav(tpl.dataset.nav);
    if (!opts || !opts.keepScroll) window.scrollTo(0, 0);
    if (window.Halstead) { window.Halstead.bind(); window.Halstead.initMotion(); }
  }

  function anchor(id) {
    if (id === 'top') { window.scrollTo({ top: 0 }); return; }
    var el = document.getElementById(id);
    if (el) el.scrollIntoView();
  }

  function route() {
    var h = location.hash || '#/';
    if (h.indexOf('#/') === 0) render(h.slice(1));
    else anchor(h.slice(1));
  }

  window.addEventListener('hashchange', route);
  route();
})();
`;

/* The page content, identical in both outputs. */
const content = `<a class="skip" href="#main">Skip to content</a>
<div class="grain" aria-hidden="true"></div>
<span id="top"></span>

${nav.replace(/<a href="#\/work">Work<\/a>/, '<a href="#/work" data-nav="work">Work</a>')
     .replace(/<a href="#\/process">Process<\/a>/, '<a href="#/process" data-nav="process">Process</a>')
     .replace(/<a href="#\/studio">Studio<\/a>/, '<a href="#/studio" data-nav="studio">Studio</a>')
     .replace(/(class="btn btn--solid nav__cta" href="#\/contact")/, '$1 data-nav="contact"')}

<main id="main"></main>

${templates}

<script>${gsap}<\/script>
<script>${scrollTrigger}<\/script>
<script>${siteJs}<\/script>
<script>${router}<\/script>
`;

const style = `<style>
${fontCss}
${siteCss}
/* The bundle carries every page at once; only the live <main> is rendered. */
template{ display:none; }
</style>`;

const bootTag = `<script>${boot}<\/script>`;

/* 1. Standalone document — deployable anywhere, opens straight from disk. */
const standalone = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Halstead — independent web design studio</title>
<meta name="description" content="Halstead is a one-person web design studio. Strategy, design and build for founders whose site has to earn trust before anyone reads a word.">
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="#07080A">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%2307080A'/%3E%3Cpath d='M9 23V9h2.6v5.7h8.8V9H23v14h-2.6v-5.9h-8.8V23z' fill='%23E3B778'/%3E%3C/svg%3E">
${bootTag}
${style}
</head>
<body>
${content}</body>
</html>
`;

/* 2. Artifact body — the host supplies doctype, charset and viewport. */
const artifact = `<title>Halstead</title>
<meta name="description" content="Halstead is a one-person web design studio. Strategy, design and build for founders whose site has to earn trust before anyone reads a word.">
${bootTag}
${style}

${content}`;

fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'dist/halstead.html'), standalone);
fs.writeFileSync(path.join(ROOT, 'dist/halstead.artifact.html'), artifact);
console.log('standalone:', (standalone.length / 1024).toFixed(0) + 'KB', ' artifact:', (artifact.length / 1024).toFixed(0) + 'KB');
