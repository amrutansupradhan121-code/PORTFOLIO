/* =====================================================
   SCROLL.JS
   Sticky navbar, scroll progress bar, back-to-top button,
   active nav link highlighting on scroll
===================================================== */

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Sticky navbar background on scroll
    navbar.classList.toggle('scrolled', scrollY > 60);

    // Scroll progress bar
    if (scrollProgress && docHeight > 0) {
      scrollProgress.style.width = (scrollY / docHeight) * 100 + '%';
    }

    // Back to top button visibility
    if (backToTop) backToTop.classList.toggle('show', scrollY > 500);

    // Active nav link based on section in view
    let currentSection = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop) currentSection = section.getAttribute('id');
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentSection);
    });
  }

  window.addEventListener('scroll', onScroll);
  onScroll();
});
