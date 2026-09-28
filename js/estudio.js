/* ========================================
   ESTUDIO CREA FILMS — estudio.js
   Tabs · FAQ Accordion · Nav scroll · Smooth scroll
   ======================================== */

(function () {
  'use strict';

  /* ── TABS ──────────────────────────────── */
  window.showTab = function (panelId, triggerEl) {
    var tabs   = document.querySelectorAll('.e-tab');
    var panels = document.querySelectorAll('.e-panel');

    tabs.forEach(function (t) { t.classList.remove('active'); });
    panels.forEach(function (p) { p.classList.remove('active'); });

    if (triggerEl) triggerEl.classList.add('active');
    var panel = document.getElementById(panelId);
    if (panel) panel.classList.add('active');
  };

  /* ── FAQ ACCORDION ─────────────────────── */
  window.toggleFaq = function (btn) {
    var item = btn.closest('.e-faq-item');
    if (!item) return;
    var isOpen = item.classList.contains('open');

    // close all
    document.querySelectorAll('.e-faq-item.open').forEach(function (el) {
      el.classList.remove('open');
    });

    if (!isOpen) item.classList.add('open');
  };

  /* ── NAV SCROLL ────────────────────────── */
  var nav = document.querySelector('.e-nav');
  if (nav) {
    function handleScroll() {
      if (window.scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on load
  }

  /* ── SMOOTH SCROLL for internal links ─── */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

})();
