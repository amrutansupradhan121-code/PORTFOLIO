/* =====================================================
   TYPING.JS
   Typed.js animated role text in the hero section
===================================================== */

document.addEventListener('DOMContentLoaded', function () {
  const el = document.getElementById('typed-text');
  if (!el || typeof Typed === 'undefined') return;

  new Typed('#typed-text', {
    strings: [
      'AI &amp; ML Engineer'.replace('&amp;', '&'),
      'Machine Learning Enthusiast',
      'Full-Stack Developer',
      'Problem Solver'
    ],
    typeSpeed: 60,
    backSpeed: 35,
    backDelay: 1500,
    startDelay: 400,
    loop: true,
    smartBackspace: true
  });
});
