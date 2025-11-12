const jokes = [
  "Why did the car get promoted? It had drive.",
  "I told my car a joke once. It stalled.",
  "This car’s so smooth, it makes butter jealous."
];

function showJoke(index) {
  const jokeText = document.getElementById('jokeText');
  jokeText.textContent = `"${jokes[index]}"`;

}

// Wheels on Fire — Progressive Enhancements
// These improvements run only if the corresponding elements exist.

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1) Footer: auto-insert the current year */
  (function updateFooterYear() {
    const footerP = document.querySelector('footer p');
    if (!footerP) return;
    const year = new Date().getFullYear();
    // Replace any four-digit year with current year, or append if none present
    const hasYear = /\b\d{4}\b/;
    footerP.innerHTML = hasYear.test(footerP.innerHTML)
      ? footerP.innerHTML.replace(/\b\d{4}\b/, String(year))
      : footerP.innerHTML.replace('&copy;', `&copy; ${year}`);
  })();

  /* 2) Nav: highlight the current page link */
  (function highlightActiveNav() {
    const nav = document.querySelector('header nav');
    if (!nav) return;
    const links = nav.querySelectorAll('a[href]');
    const currentPath = window.location.pathname.replace(/\/+$/, ''); // strip trailing slash

    let matched = false;

    links.forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;

      // Build absolute path to compare reliably
      const url = new URL(href, window.location.origin);
      const linkPath = url.pathname.replace(/\/+$/, '');

      // Simple matching: exact file or same endpoint (index.html vs /)
      const isIndexEquivalent =
        (linkPath.endsWith('/index.html') && currentPath === '') ||
        (currentPath.endsWith('/index.html') && linkPath === '') ||
        (linkPath === currentPath);

      if (isIndexEquivalent) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
        matched = true;
      } else {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      }
    });

    // If nothing matched (different directories), try loose match by file name
    if (!matched) {
      const fileName = currentPath.split('/').pop();
      links.forEach(a => {
        const href = a.getAttribute('href') || '';
        if (href.endsWith(fileName) && fileName) {
          a.classList.add('active');
          a.setAttribute('aria-current', 'page');
        }
      });
    }
  })();

  /* 3) Make gallery images lazy + add a simple lightbox */
  (function enhanceGallery() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;

    const imgs = gallery.querySelectorAll('img');
    imgs.forEach(img => {
      // Add native lazy loading if not already set
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }

      // Click to open lightbox
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => openLightbox(img));
      img.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
          e.preventDefault();
          openLightbox(img);
        }
      });
      // Make images focusable for keyboard activation
      if (!img.hasAttribute('tabindex')) img.setAttribute('tabindex', '0');
    });

    let lightboxEl = null;
    let previouslyFocused = null;

    function openLightbox(img) {
      if (lightboxEl) return;

      previouslyFocused = document.activeElement;

      lightboxEl = document.createElement('div');
      lightboxEl.setAttribute('role', 'dialog');
      lightboxEl.setAttribute('aria-modal', 'true');
      lightboxEl.setAttribute('aria-label', img.alt || 'Image preview');
      Object.assign(lightboxEl.style, {
        position: 'fixed',
        inset: '0',
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '9999',
        cursor: 'zoom-out',
        padding: '20px'
      });

      const figure = document.createElement('figure');
      Object.assign(figure.style, {
        margin: 0,
        maxWidth: '90vw',
        maxHeight: '85vh'
      });

      const full = document.createElement('img');
      full.src = img.src;
      full.alt = img.alt || '';
      Object.assign(full.style, {
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        transition: prefersReducedMotion ? 'none' : 'transform 150ms ease'
      });

      const caption = document.createElement('figcaption');
      caption.textContent = img.alt || '';
      Object.assign(caption.style, {
        color: '#fff',
        textAlign: 'center',
        marginTop: '12px',
        fontSize: '14px',
        opacity: caption.textContent ? '0.9' : '0'
      });

      figure.appendChild(full);
      figure.appendChild(caption);
      lightboxEl.appendChild(figure);
      document.body.appendChild(lightboxEl);

      // Small entrance scale
      if (!prefersReducedMotion) {
        requestAnimationFrame(() => { full.style.transform = 'scale(1.02)'; });
        setTimeout(() => { full.style.transform = 'scale(1)'; }, 120);
      }

      // Close interactions
      lightboxEl.addEventListener('click', closeLightbox);
      document.addEventListener('keydown', onEsc, { once: true });

      // Focus management
      lightboxEl.tabIndex = -1;
      lightboxEl.focus({ preventScroll: true });
    }

    function onEsc(e) {
      if (e.key === 'Escape') closeLightbox();
    }

    function closeLightbox() {
      if (!lightboxEl) return;
      lightboxEl.removeEventListener('click', closeLightbox);
      lightboxEl.remove();
      lightboxEl = null;

      // Restore focus
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus({ preventScroll: true });
      }
    }
  })();

  /* 4) Header: add shadow on scroll to separate from background */
  (function headerShadowOnScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    const shadowClass = 'has-shadow';

    const toggleShadow = () => {
      if (window.scrollY > 4) {
        if (!header.classList.contains(shadowClass)) header.classList.add(shadowClass);
      } else {
        header.classList.remove(shadowClass);
      }
    };

    // Run once on load & on scroll
    toggleShadow();
    window.addEventListener('scroll', toggleShadow, { passive: true });
  })();

  /* 5) Smooth scroll for in-page anchors (progressive) */
  (function smoothScroll() {
    if (prefersReducedMotion) return;

    const links = document.querySelectorAll('a[href^="#"]');
    if (!links.length) return;

    links.forEach(link => {
      link.addEventListener('click', e => {
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Move focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
    });
  })();
});
