/* =====================================================
   PARTICLES.JS CONFIGURATION
   Creates the animated background particle network
===================================================== */

document.addEventListener('DOMContentLoaded', function () {
  if (typeof particlesJS === 'undefined') return;

  particlesJS('particles-js', {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 900 } },
      color: { value: ['#6C63FF', '#38BDF8'] },
      shape: { type: 'circle' },
      opacity: { value: 0.35, random: true },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#334155',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 0.6 } },
        push: { particles_nb: 3 }
      }
    },
    retina_detect: true
  });
});
