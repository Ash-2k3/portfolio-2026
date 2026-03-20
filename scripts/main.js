/* =========================================
   ASHWATH KANNAN — PORTFOLIO JS
   Scroll reveal, Nav, Interactions
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── Init Lucide Icons ─────────────────────
  if (window.lucide) {
    lucide.createIcons();
  }

  // ── Navbar scroll effect ──────────────────
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ── Active nav link on scroll ─────────────
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  const updateActiveNav = () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.id;
      }
    });
    navItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  // ── Hamburger menu ────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    // Animate hamburger → X
    const bars = navToggle.querySelectorAll('span');
    if (isOpen) {
      bars[0].style.transform = 'translateY(7px) rotate(45deg)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      bars[0].style.transform = '';
      bars[1].style.opacity = '';
      bars[2].style.transform = '';
    }
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const bars = navToggle.querySelectorAll('span');
      bars[0].style.transform = '';
      bars[1].style.opacity = '';
      bars[2].style.transform = '';
    });
  });

  // ── Scroll Reveal (Intersection Observer) ─
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // only once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  // ── Smooth scroll for anchor links ────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Glass card tilt on hover (subtle) ─────
  const glassCards = document.querySelectorAll('.glass-card');

  glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const x     = e.clientX - rect.left;
      const y     = e.clientY - rect.top;
      const cx    = rect.width / 2;
      const cy    = rect.height / 2;
      const rotX  = ((y - cy) / cy) * -4;
      const rotY  = ((x - cx) / cx) *  4;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── Typing effect for hero tagline (optional) ─
  const tagline = document.querySelector('.hero-tagline');
  if (tagline) {
    const originalText = tagline.textContent;
    // Just ensure it's visible — full text already set in HTML
    tagline.style.opacity = '1';
  }

  // ── Scroll-to-top on logo click ───────────
  document.querySelector('.nav-logo').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Year in footer ────────────────────────
  const footerYear = document.querySelector('footer p');
  if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace(
      '2025',
      new Date().getFullYear()
    );
  }

  // ── Initial call ──────────────────────────
  handleScroll();
});
