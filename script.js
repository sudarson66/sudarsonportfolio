/* ==========================================
   SUDARSON C — PORTFOLIO JAVASCRIPT
   script.js
   ========================================== */

/* ──────────────────────────────────────────
   1. CUSTOM CURSOR
   ────────────────────────────────────────── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
});

function animateCursorRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
  requestAnimationFrame(animateCursorRing);
}
animateCursorRing();

// Cursor grows on interactive elements
const interactiveEls = document.querySelectorAll(
  'a, button, .project-card, .skill-category, .cert-card, .chip'
);

interactiveEls.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(2)';
    cursorRing.style.transform += ' scale(1.6)';
    cursorRing.style.borderColor = 'var(--accent2)';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.borderColor = 'var(--accent)';
  });
});

/* ──────────────────────────────────────────
   2. SCROLL REVEAL  (left → right)
   ────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-up');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => revealObserver.observe(el));

/* ──────────────────────────────────────────
   3. NAVBAR — scroll style + active link
   ────────────────────────────────────────── */
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Shrink nav on scroll
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Highlight active section in nav
  let current = '';
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 200) {
      current = sec.id;
    }
  });

  navLinks.forEach((a) => {
    a.style.color = (a.getAttribute('href') === '#' + current)
      ? 'var(--accent)'
      : '';
  });
});

/* ──────────────────────────────────────────
   4. HAMBURGER MENU (mobile)
   ────────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const navLinksEl = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

/* ──────────────────────────────────────────
   5. TYPEWRITER — hero role switcher
   ────────────────────────────────────────── */
const roleEl = document.getElementById('heroRole');

const roles = [
  '// Full-Stack Developer & Embedded Systems Engineer',
  '// MERN Stack Developer',
  '// AI & Computer Vision Enthusiast',
  '// IoT Product Builder',
  '// UI/UX Designer',
];

let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

function typeWriter() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    roleEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    roleEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeWriter, isDeleting ? 35 : 65);
}

// Start typewriter after short delay
setTimeout(typeWriter, 1200);

/* ──────────────────────────────────────────
   6. HERO ENTRANCE ANIMATION (on page load)
   ────────────────────────────────────────── */
const heroEls = [
  { selector: '.hero-tag',   delay: 100 },
  { selector: '.hero-name',  delay: 300 },
  { selector: '.hero-role',  delay: 500 },
  { selector: '.hero-desc',  delay: 620 },
  { selector: '.hero-btns',  delay: 760 },
  { selector: '.hero-stats', delay: 920 },
];

heroEls.forEach(({ selector, delay }) => {
  const el = document.querySelector(selector);
  if (!el) return;
  el.style.opacity   = '0';
  el.style.transform = 'translateX(-60px)';
});

window.addEventListener('load', () => {
  heroEls.forEach(({ selector, delay }) => {
    const el = document.querySelector(selector);
    if (!el) return;
    setTimeout(() => {
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      el.style.opacity    = '1';
      el.style.transform  = 'translateX(0)';
    }, delay);
  });
});

/* ──────────────────────────────────────────
   7. CONTACT FORM — submit feedback
   ────────────────────────────────────────── */
function handleFormSubmit() {
  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const subject = document.getElementById('fsubject').value.trim();
  const message = document.getElementById('fmessage').value.trim();
  const btn     = document.getElementById('sendBtn');

  if (!name || !email || !message) {
    btn.textContent = 'Fill all fields ✗';
    btn.style.background = 'var(--accent3)';
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = 'var(--accent)';
    }, 2500);
    return;
  }

  // Success state
  btn.textContent = 'Message Sent ✓';
  btn.style.background = 'var(--green)';
  btn.style.color = '#000';

  // Reset form
  document.getElementById('fname').value    = '';
  document.getElementById('femail').value   = '';
  document.getElementById('fsubject').value = '';
  document.getElementById('fmessage').value = '';

  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = 'var(--accent)';
  }, 3500);
}

// Expose to HTML onclick
window.handleFormSubmit = handleFormSubmit;

/* ──────────────────────────────────────────
   8. SMOOTH SCROLL for all anchor links
   ────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
