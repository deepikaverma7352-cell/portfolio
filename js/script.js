/* ==========================================================================
   Deepika Verma – Portfolio Script (vanilla JavaScript, no libraries)
   --------------------------------------------------------------------------
   1. Theme toggle (light / dark)
   2. Mobile menu
   3. Header shadow on scroll
   4. Hide empty sections and unfilled links
   5. Project image fallback
   6. Scroll-reveal animation
   7. Highlight the current section in the menu
   8. Footer year
   ========================================================================== */

(function () {
  'use strict';

  // Lets the CSS know JavaScript is running, so reveal animations are safe to use
  document.documentElement.classList.add('js');

  var root = document.documentElement;

  /* ---------- 1. THEME TOGGLE ---------- */
  var themeBtn = document.getElementById('theme-toggle');

  function updateThemeLabel() {
    var isDark = root.getAttribute('data-theme') === 'dark';
    themeBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  if (themeBtn) {
    updateThemeLabel();
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage may be blocked */ }
      updateThemeLabel();
    });
  }

  /* ---------- 2. MOBILE MENU ---------- */
  var menuBtn = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      setMenu(!nav.classList.contains('open'));
    });
    // Close the menu after choosing a link
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { setMenu(false); }
    });
    // Close with the Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setMenu(false); }
    });
    // Close if the window is resized to desktop width
    window.addEventListener('resize', function () {
      if (window.innerWidth > 960) { setMenu(false); }
    });
  }

  /* ---------- 3. HEADER SHADOW ON SCROLL ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) { header.classList.toggle('scrolled', window.scrollY > 10); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 4. HIDE EMPTY SECTIONS AND UNFILLED LINKS ----------
     - A section with data-hide-if-empty=".some > *" is hidden (and removed
       from the menu) if that selector finds nothing inside it.
     - A link marked data-placeholder-link is hidden while its href is "#".
       Put your real URL in the href and it appears automatically.        */
  document.querySelectorAll('[data-placeholder-link]').forEach(function (link) {
    var href = (link.getAttribute('href') || '').trim();
    if (href === '' || href === '#') {
      // Hide the whole list item if the link sits inside one, otherwise just the link
      var holder = link.closest('li') || link;
      holder.hidden = true;
    }
  });

  document.querySelectorAll('section[data-hide-if-empty]').forEach(function (section) {
    var selector = section.getAttribute('data-hide-if-empty');
    if (section.querySelectorAll(selector).length === 0) {
      section.hidden = true;
      var menuLink = document.querySelector('.site-nav a[href="#' + section.id + '"]');
      if (menuLink && menuLink.parentElement) { menuLink.parentElement.hidden = true; }
    }
  });

  /* ---------- 5. PROJECT IMAGE FALLBACK ----------
     If an image listed in a project card is missing, show a coloured
     placeholder with the project name instead of a broken-image icon.   */
  function showPlaceholder(img) {
    var box = document.createElement('div');
    box.className = 'img-placeholder';
    box.textContent = img.getAttribute('data-fallback-label') || 'Project image';
    box.setAttribute('role', 'img');
    box.setAttribute('aria-label', img.getAttribute('alt') || 'Project image');
    img.replaceWith(box);
  }

  document.querySelectorAll('.project-media img').forEach(function (img) {
    img.addEventListener('error', function () { showPlaceholder(img); });
    // Handles the case where the image already failed before this script ran
    if (img.complete && img.naturalWidth === 0) { showPlaceholder(img); }
  });

  /* ---------- 6. SCROLL-REVEAL ANIMATION ---------- */
  var revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Very old browsers: just show everything
    revealItems.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- 7. HIGHLIGHT CURRENT SECTION IN MENU ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(function (s) { return s && !s.hidden; });

  function highlightMenu() {
    var offset = window.scrollY + 120;
    var currentId = '';
    sections.forEach(function (s) {
      if (s.offsetTop <= offset) { currentId = s.id; }
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
  }
  window.addEventListener('scroll', highlightMenu, { passive: true });
  highlightMenu();

  /* ---------- 8. FOOTER YEAR ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
