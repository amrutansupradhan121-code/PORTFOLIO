/* =====================================================
   CURSOR.JS
   Custom animated cursor (dot + trailing outline)
   Disabled automatically on touch devices via CSS.
===================================================== */

document.addEventListener('DOMContentLoaded', function () {
  const dot = document.getElementById('cursorDot');
  const outline = document.getElementById('cursorOutline');
  if (!dot || !outline) return;

  // Skip entirely on touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Smooth trailing animation for the outline circle
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    outline.style.left = outlineX + 'px';
    outline.style.top = outlineY + 'px';
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Grow cursor outline on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .btn, .project-card, .tech-icon, .service-card, .cert-card, .profile-card, input, textarea'
  );
  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => outline.classList.add('hovered'));
    target.addEventListener('mouseleave', () => outline.classList.remove('hovered'));
  });

  document.addEventListener('mousedown', () => dot.style.transform = 'translate(-50%, -50%) scale(0.7)');
  document.addEventListener('mouseup', () => dot.style.transform = 'translate(-50%, -50%) scale(1)');
});
