/* ══════════════════════════════════════════════
   LOADING SCREEN
══════════════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) loader.classList.add('hidden');
  }, 1400);
});

/* ══════════════════════════════════════════════
   SCROLL PROGRESS BAR
══════════════════════════════════════════════ */
const progressBar = document.getElementById('scroll-progress-bar');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrolled / total * 100) + '%';
}, { passive: true });

/* ══════════════════════════════════════════════
   STICKY NAV + ACTIVE LINK
══════════════════════════════════════════════ */
const header = document.getElementById('site-header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveLink();
  toggleBackToTop();
}, { passive: true });

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });
  navLinks.forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', href === current);
  });
}

/* ══════════════════════════════════════════════
   MOBILE DRAWER
══════════════════════════════════════════════ */
const hamburger  = document.getElementById('hamburger');
const drawer     = document.getElementById('mobile-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const drawerClose   = document.getElementById('drawer-close');
const drawerLinks   = document.querySelectorAll('.drawer-link');

function openDrawer() {
  drawer.classList.add('open');
  drawerOverlay.classList.add('visible');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  drawer.classList.remove('open');
  drawerOverlay.classList.remove('visible');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);
drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

/* ══════════════════════════════════════════════
   THEME TOGGLE
══════════════════════════════════════════════ */
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

/* ══════════════════════════════════════════════
   TYPING ANIMATION
══════════════════════════════════════════════ */
const typedEl = document.getElementById('typed-text');
const words = [
  'Software Developer',
  'Business Strategist',
  'CS Student @ Waterloo',
  'Problem Solver',
  'Co-op Candidate'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeEffect() {
  const current = words[wordIndex];

  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      typingTimeout = setTimeout(typeEffect, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingTimeout = setTimeout(typeEffect, 400);
      return;
    }
  }

  const speed = isDeleting ? 60 : 100;
  typingTimeout = setTimeout(typeEffect, speed);
}

typeEffect();

/* ══════════════════════════════════════════════
   SCROLL REVEAL (Intersection Observer)
══════════════════════════════════════════════ */
const revealEls = document.querySelectorAll(
  '.reveal-fade, .reveal-up, .reveal-left, .reveal-right'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ══════════════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════════════ */
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutExpo(progress);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/* ══════════════════════════════════════════════
   PROJECT FILTER
══════════════════════════════════════════════ */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const cat = card.dataset.cat;
      if (filter === 'all' || cat === filter) {
        card.style.display = '';
        setTimeout(() => card.classList.remove('filtered-out'), 10);
      } else {
        card.classList.add('filtered-out');
      }
    });
  });
});

/* ══════════════════════════════════════════════
   COURSEWORK TABS
══════════════════════════════════════════════ */
const termTabs   = document.querySelectorAll('.term-tab');
const termPanels = document.querySelectorAll('.term-panel');

termTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    termTabs.forEach(t => t.classList.remove('active'));
    termPanels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    const panel = document.getElementById('panel-' + tab.dataset.term);
    if (panel) panel.classList.add('active');
  });
});

/* ══════════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════ */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    const mailto = `mailto:n36singh@uwaterloo.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Naunidh,\n\n${message}\n\n— ${name} (${email})`)}`;
    window.location.href = mailto;

    formSuccess.classList.add('visible');
    contactForm.reset();
    setTimeout(() => formSuccess.classList.remove('visible'), 5000);
  });
}

/* ══════════════════════════════════════════════
   BACK TO TOP
══════════════════════════════════════════════ */
const backToTop = document.getElementById('back-to-top');

function toggleBackToTop() {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ══════════════════════════════════════════════
   SMOOTH SCROLL FOR ANCHOR LINKS
══════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - (window.innerWidth < 768 ? 70 : 80);
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ══════════════════════════════════════════════
   CARD TILT EFFECT (subtle 3D)
══════════════════════════════════════════════ */
document.querySelectorAll('.project-card, .award-card, .hobby-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = (y / rect.height) * 6;
    const tiltY = -(x / rect.width) * 6;
    card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
