/* =====================================================
   SCRIPT.JS
   Core interactivity: page loader, mobile menu, AOS init,
   ripple buttons, magnetic buttons, 3D tilt, skill bars,
   animated counters, project filter + modal, contact form
===================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. PAGE LOADER ---------- */
  const loader = document.getElementById('loader');
  const loaderProgress = document.getElementById('loaderProgress');
  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 25;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      setTimeout(() => loader.classList.add('hidden'), 300);
    }
    loaderProgress.style.width = progress + '%';
  }, 200);

  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hidden'), 400);
  });

  /* ---------- 2. AOS INIT ---------- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  /* ---------- 3. MOBILE HAMBURGER MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    const expanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', expanded);
  });

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- 4. RIPPLE EFFECT ON BUTTONS ---------- */
  document.querySelectorAll('.ripple').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      circle.className = 'ripple-circle';
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });

  /* ---------- 5. MAGNETIC BUTTON EFFECT ---------- */
  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0, 0)'; });
  });

  /* ---------- 6. 3D TILT EFFECT ON PROJECT CARDS ---------- */
  document.querySelectorAll('.tilt').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -10;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  /* ---------- 7. SKILL BAR ANIMATION ON SCROLL ---------- */
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillFills.forEach((fill) => skillObserver.observe(fill));

  /* ---------- 8. ANIMATED COUNTERS ---------- */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((counter) => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const duration = 1600;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, stepTime);
  }

  /* ---------- 9. PROJECT FILTER ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hide', !match);
      });
    });
  });

  /* ---------- 10. PROJECT DETAIL MODAL ---------- */
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTech = document.getElementById('modalTech');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalGithub = document.getElementById('modalGithub');
  const modalDemo = document.getElementById('modalDemo');

  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      modalTitle.textContent = card.dataset.title || '';
      modalDesc.textContent = card.dataset.desc || '';
      modalTech.textContent = card.dataset.tech || '';
      modalGithub.href = card.dataset.github || '#';
      modalDemo.href = card.dataset.demo || '#';

      modalFeatures.innerHTML = '';
      (card.dataset.features || '').split(',').forEach((feature) => {
        if (!feature.trim()) return;
        const li = document.createElement('li');
        li.textContent = feature.trim();
        modalFeatures.appendChild(li);
      });

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  /* ---------- 11. CERTIFICATE PREVIEW (opens image in new tab) ---------- */
  document.querySelectorAll('.cert-card').forEach((cert) => {
    cert.addEventListener('click', () => {
      const img = cert.querySelector('img');
      if (img) window.open(img.src, '_blank');
    });
  });

  /* ---------- 12. CONTACT FORM VALIDATION ---------- */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  function setError(groupId, errorId, message) {
    const group = document.getElementById(groupId).closest('.form-group');
    const errorEl = document.getElementById(errorId);
    if (message) {
      group.classList.add('invalid');
      errorEl.textContent = message;
    } else {
      group.classList.remove('invalid');
      errorEl.textContent = '';
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name.length < 2) { setError('name', 'nameError', 'Please enter your full name.'); valid = false; }
    else setError('name', 'nameError', '');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setError('email', 'emailError', 'Please enter a valid email address.'); valid = false; }
    else setError('email', 'emailError', '');

    if (phone && !/^[0-9+\-\s()]{7,15}$/.test(phone)) { setError('phone', 'phoneError', 'Please enter a valid phone number.'); valid = false; }
    else setError('phone', 'phoneError', '');

    if (subject.length < 3) { setError('subject', 'subjectError', 'Please enter a subject.'); valid = false; }
    else setError('subject', 'subjectError', '');

    if (message.length < 10) { setError('message', 'messageError', 'Message should be at least 10 characters.'); valid = false; }
    else setError('message', 'messageError', '');

    if (!valid) {
      formSuccess.classList.remove('show');
      return;
    }

    // Simulate successful submission (replace with real backend / API call)
    formSuccess.classList.add('show');
    form.reset();
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  });

  /* ---------- 13. FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
