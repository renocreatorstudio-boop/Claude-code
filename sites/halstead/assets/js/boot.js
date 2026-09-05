/* ==========================================================================
   HALSTEAD — boot gate. Loaded synchronously in <head>, before paint.

   Every hidden initial state in the stylesheet is gated behind html.anim.
   If motion is not wanted, the class is never added and the page renders
   finished and static — no flash, no dependency on JS arriving at all.
   ========================================================================== */
(function () {
  try {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) document.documentElement.classList.add('anim');
    if (window.matchMedia('(pointer: coarse)').matches) {
      document.documentElement.classList.add('coarse');
    }
  } catch (e) { /* leave the page static */ }
})();
