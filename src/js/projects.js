/**
 * GRUPO NORTE — Projects Showcase & Marquee Engine
 * Movimento contínuo infinito com suporte a arraste manual híbrido (Desktop drag & Mobile touch).
 * - Velocidade reduzida e elegante (40 a 60 segundos por ciclo)
 * - Arraste livre (esquerda/direita) via Pointer Events
 * - Inércia suave ao soltar
 * - Espera ~2 segundos após soltar e retoma aceleração suavemente
 * - Cursor grab / grabbing no desktop
 * - Loop infinito matemático sem cortes
 */

import { PROJECTS } from './projects-data.js';

export function initProjectsGallery() {
  const showcaseTrack = document.getElementById('projectsMarqueeTrack');
  const viewport = document.querySelector('.projects-marquee-viewport');
  if (!showcaseTrack || !viewport || !PROJECTS || PROJECTS.length === 0) return;

  // Gerador de cada projeto individual
  const createProjectCard = (project, index) => {
    return `
      <article 
        class="project-marquee-card" 
        data-project-id="${project.id}" 
        tabindex="0" 
        role="group" 
        aria-label="${project.title} — ${project.category}"
      >
        <!-- Moldura Elegante do Projeto -->
        <div class="project-frame">
          <!-- Barra Superior Minimalista -->
          <div class="project-frame-bar">
            <div class="project-frame-dots" aria-hidden="true">
              <span class="p-dot p-dot-close"></span>
              <span class="p-dot p-dot-min"></span>
              <span class="p-dot p-dot-max"></span>
            </div>
            <div class="project-frame-url">
              <svg class="url-lock-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span class="url-text">${project.domain}</span>
            </div>
          </div>

          <!-- Preview Grande do Site -->
          <div class="project-preview-viewport ${project.hasScroll ? 'is-scrollable' : ''}">
            <div class="project-preview-canvas">
              <picture class="project-picture">
                <source srcset="${project.image}" type="image/webp">
                <img 
                  src="${project.fallbackImage}" 
                  alt="${project.title} — ${project.category}" 
                  class="project-preview-img"
                  loading="${index < 2 ? 'eager' : 'lazy'}"
                  decoding="async"
                  draggable="false"
                >
              </picture>
            </div>
          </div>
        </div>
      </article>
    `;
  };

  // Renderiza Grupo A e Grupo B rigorosamente idênticos para transição de loop infinito
  const renderGroup = (isClone = false) => `
    <div class="projects-marquee-group" ${isClone ? 'aria-hidden="true"' : ''}>
      ${PROJECTS.map((p, idx) => createProjectCard(p, idx)).join('')}
    </div>
  `;

  showcaseTrack.innerHTML = renderGroup(false) + renderGroup(true);

  // =========================================================================
  // MOTOR DE MOVIMENTO HÍBRIDO (Marquee Suave + Arraste Manual com Inércia)
  // =========================================================================

  let currentX = 0;
  let singleGroupWidth = 0;
  let targetSpeed = 80; // px por segundo (~45-55s por ciclo completo)
  let resumeProgress = 1; // Rampa suave de aceleração (0 a 1)
  
  let isDragging = false;
  let hasDragged = false;
  let isInteracting = false;
  let startPointerX = 0;
  let startCurrentX = 0;
  let lastPointerX = 0;
  let lastPointerTime = 0;
  let velocity = 0;
  let resumeTimeout = null;

  // Atualização precisa da largura de um ciclo completo
  const updateDimensions = () => {
    const groupA = showcaseTrack.querySelector('.projects-marquee-group');
    if (groupA) {
      singleGroupWidth = groupA.offsetWidth;
      // Define a velocidade para completar um ciclo em ~48 segundos
      if (singleGroupWidth > 0) {
        targetSpeed = singleGroupWidth / 48;
      }
    }
  };

  updateDimensions();
  window.addEventListener('load', updateDimensions);

  // Observa mudanças de tela/orientação
  const groupA = showcaseTrack.querySelector('.projects-marquee-group');
  if (groupA && 'ResizeObserver' in window) {
    const resizeObs = new ResizeObserver(() => updateDimensions());
    resizeObs.observe(groupA);
  }

  // 1. Início do Arraste (Pointer Down: Mouse, Touch ou Stylus)
  const onPointerDown = (e) => {
    // Permite apenas clique primário (botão esquerdo) ou touch
    if (e.button !== undefined && e.button !== 0) return;

    isDragging = true;
    hasDragged = false;
    isInteracting = true;
    velocity = 0;
    resumeProgress = 0;

    if (resumeTimeout) {
      clearTimeout(resumeTimeout);
      resumeTimeout = null;
    }

    startPointerX = e.clientX;
    startCurrentX = currentX;
    lastPointerX = e.clientX;
    lastPointerTime = performance.now();

    viewport.classList.add('is-dragging');

    try {
      viewport.setPointerCapture(e.pointerId);
    } catch {
      // Ignora caso o navegador não suporte captura neste contexto
    }
  };

  // 2. Movimento do Arraste (Pointer Move)
  const onPointerMove = (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startPointerX;
    if (Math.abs(dx) > 5) {
      hasDragged = true;
    }

    currentX = startCurrentX + dx;

    // Cálculo da velocidade instantânea para inércia natural
    const now = performance.now();
    const dt = now - lastPointerTime;
    if (dt > 0) {
      const instantVelocity = (e.clientX - lastPointerX) / (dt / 16.67);
      velocity = velocity * 0.4 + instantVelocity * 0.6; // Suavização exponencial
    }

    lastPointerX = e.clientX;
    lastPointerTime = now;
  };

  // 3. Fim do Arraste (Pointer Up / Cancel)
  const onPointerUp = (e) => {
    if (!isDragging) return;
    isDragging = false;
    viewport.classList.remove('is-dragging');

    try {
      if (viewport.hasPointerCapture(e.pointerId)) {
        viewport.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignora caso já liberado
    }

    // Limita a velocidade máxima de inércia para evitar giros excessivos
    velocity = Math.max(-28, Math.min(28, velocity));

    // Espera ~2 segundos após soltar para retomar a animação automática suavemente
    clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => {
      isInteracting = false;
    }, 2000);
  };

  // Previne cliques acidentais em links ou cards caso o usuário estivesse apenas arrastando
  viewport.addEventListener('click', (e) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  viewport.addEventListener('pointerdown', onPointerDown, { passive: true });
  viewport.addEventListener('pointermove', onPointerMove, { passive: true });
  viewport.addEventListener('pointerup', onPointerUp, { passive: true });
  viewport.addEventListener('pointercancel', onPointerUp, { passive: true });

  // Pausa suave do marquee automático quando focado por teclado (Acessibilidade)
  viewport.addEventListener('focusin', () => {
    isInteracting = true;
  });
  viewport.addEventListener('focusout', () => {
    isInteracting = false;
  });

  // =========================================================================
  // LOOP DE ANIMAÇÃO DE ALTA PERFORMANCE (requestAnimationFrame com GPU)
  // =========================================================================

  let lastFrameTime = performance.now();

  const animationLoop = (now) => {
    const deltaSeconds = Math.min((now - lastFrameTime) / 1000, 0.1);
    lastFrameTime = now;

    if (!isDragging) {
      // Aplica desaceleração suave da inércia
      if (Math.abs(velocity) > 0.15) {
        currentX += velocity * (deltaSeconds * 60);
        velocity *= 0.93; // Fator de atrito natural
      } else {
        velocity = 0;
      }

      // Se o usuário não está interagindo e os 2s passaram, retoma suavemente
      if (!isInteracting) {
        if (resumeProgress < 1) {
          resumeProgress = Math.min(1, resumeProgress + deltaSeconds * 0.7); // Rampa suave de ~1.4s
        }
        const activeSpeed = targetSpeed * resumeProgress;
        currentX -= activeSpeed * deltaSeconds;
      }
    }

    // Envolvimento Matemático Infinito sem Saltos
    if (singleGroupWidth > 0) {
      while (currentX <= -singleGroupWidth) {
        currentX += singleGroupWidth;
      }
      while (currentX > 0) {
        currentX -= singleGroupWidth;
      }
    }

    // Renderização com GPU Compositing direto em translate3d
    showcaseTrack.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;

    requestAnimationFrame(animationLoop);
  };

  requestAnimationFrame(animationLoop);
}
