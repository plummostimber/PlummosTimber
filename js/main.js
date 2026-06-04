/* ═══════════════════════════════════
   PLUMMO'S TIMBER — SHARED JS
═══════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAV SHRINK ON SCROLL
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('shrunk', window.scrollY > 60);
  });

  // ── MOBILE HAMBURGER
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  hamburger?.addEventListener('click', () => {
    mobileNav?.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    hamburger.classList.toggle('active');
    if (hamburger.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // ── ACTIVE NAV LINK
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a, .nav-mobile a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  // ── SCROLL REVEAL
  const reveals = document.querySelectorAll('.reveal, .reveal-left');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // ── TABS
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('[data-tabs]');
      const target = btn.dataset.tab;
      group?.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group?.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      group?.querySelector(`[data-panel="${target}"]`)?.classList.add('active');
    });
  });

  // ── FILTER BUTTONS (products/community)
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.filter-group');
      group?.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const container = document.querySelector(btn.dataset.target);
      if (!container) return;
      container.querySelectorAll('[data-category]').forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ── SMOOTH ANCHOR SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── CONTACT FORM MOCK SUBMIT
  document.querySelector('#contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type=submit]');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#5a6b4a';
    btn.style.color = '#e8e4df';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.color = '';
      this.reset();
    }, 3500);
  });

  // ── COMMUNITY DISCUSSION FORM
  document.querySelector('#discussion-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type=submit]');
    btn.textContent = 'Posted! ✓';
    btn.style.background = '#5a6b4a';
    setTimeout(() => {
      btn.textContent = 'Post Discussion';
      btn.style.background = '';
      this.reset();
    }, 2500);
  });

  // ── NEWSLETTER FORM
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('button[type=submit]');
      const orig = btn.textContent;
      btn.textContent = "You're In! ✓";
      btn.style.background = '#5a6b4a';
      btn.style.color = '#e8e4df';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.color = '';
        this.reset();
      }, 3000);
    });
  });

  // ── MARQUEE DUPLICATE for seamless loop
  document.querySelectorAll('.marquee-track').forEach(track => {
    track.innerHTML += track.innerHTML;
  });

});
