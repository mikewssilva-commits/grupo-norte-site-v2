/**
 * GRUPO NORTE — Hero Micro-Interactions & Parallax
 * Movimentação discreta e controlada para sensação de profundidade corporativa.
 */

export function initHeroMotion() {
  const stage = document.querySelector('.hero-visual-stage');
  const canvas = document.querySelector('.visual-canvas');

  if (!stage || !canvas) return;

  // Respeita preferência por redução de movimento e desabilita em touch
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  if (prefersReducedMotion || isTouchDevice) {
    return;
  }

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;

  const onMouseMove = (e) => {
    const rect = stage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Diferencial normalizado (-1 a 1)
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    // Limite máximo de movimento: 6px para manter sobriedade corporativa
    const maxShift = 6;
    targetX = Math.max(-maxShift, Math.min(maxShift, deltaX * maxShift));
    targetY = Math.max(-maxShift, Math.min(maxShift, deltaY * maxShift));

    if (!rafId) {
      rafId = requestAnimationFrame(updateParallax);
    }
  };

  const onMouseLeave = () => {
    targetX = 0;
    targetY = 0;
    if (!rafId) {
      rafId = requestAnimationFrame(updateParallax);
    }
  };

  const updateParallax = () => {
    // Interpolação suave (lerp)
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    canvas.style.setProperty('--parallax-x', currentX.toFixed(2));
    canvas.style.setProperty('--parallax-y', currentY.toFixed(2));

    // Continua enquanto houver diferença perceptível
    if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
      rafId = requestAnimationFrame(updateParallax);
    } else {
      rafId = null;
    }
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mouseleave', onMouseLeave);
}
