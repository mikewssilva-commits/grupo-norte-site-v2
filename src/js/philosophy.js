/**
 * GRUPO NORTE — Experiência de Marca Institucional: "A Direção que Guia o Grupo Norte"
 * Controlador de Scroll Narrativo de Alto Desempenho (Desktop Sticky Stage + Mobile Fluid)
 */

export function initPhilosophyExperience() {
  const section = document.querySelector('.section-philosophy');
  if (!section) return;

  const symbolStage = section.querySelector('.philosophy-symbol-stage');
  const actPanes = section.querySelectorAll('.philosophy-act-pane');
  const timelineSteps = section.querySelectorAll('.timeline-step');
  const kineticItems = section.querySelectorAll('.kinetic-value-item');

  let isMobile = window.innerWidth <= 960;
  let rafId = null;
  let currentActiveIndex = -1;

  function updateActiveAct(index) {
    if (index === currentActiveIndex) return;
    currentActiveIndex = index;

    actPanes.forEach((pane, idx) => {
      if (idx === index) {
        pane.classList.add('is-active');
      } else {
        pane.classList.remove('is-active');
      }
    });

    timelineSteps.forEach((step, idx) => {
      if (idx === index) {
        step.classList.add('is-active');
      } else {
        step.classList.remove('is-active');
      }
    });
  }

  // IntersectionObserver para reveal suave de entrada ao alcançar a seção
  if ('IntersectionObserver' in window) {
    const entranceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add('is-in-view');
        } else {
          if (entry.boundingClientRect.top > 0) {
            section.classList.remove('is-in-view');
          }
        }
      });
    }, {
      root: null,
      rootMargin: '-5% 0px -10% 0px',
      threshold: [0, 0.05, 0.15]
    });

    entranceObserver.observe(section);
  } else {
    section.classList.add('is-in-view');
  }

  function onScroll() {
    if (isMobile) return;

    const rect = section.getBoundingClientRect();
    const windowH = window.innerHeight;
    const maxScroll = rect.height - windowH;

    // Se estiver fora do alcance da seção
    if (rect.bottom < 0) return;
    if (rect.top > windowH) {
      section.classList.remove('is-in-view');
      return;
    }

    // Se a seção entrou no campo de visão, garante o trigger de reveal suave
    if (rect.top <= windowH * 0.9 && rect.bottom >= 0) {
      if (!section.classList.contains('is-in-view')) {
        section.classList.add('is-in-view');
      }
    }

    const scrollDistance = Math.max(0, -rect.top);
    const progress = Math.max(0, Math.min(1, scrollDistance / maxScroll));

    // Determina o ato ativo baseado na progressão linear da rolagem
    let activeIdx = 0;
    if (progress >= 0.72) {
      activeIdx = 3; // Valores
    } else if (progress >= 0.46) {
      activeIdx = 2; // Visão
    } else if (progress >= 0.20) {
      activeIdx = 1; // Missão
    } else {
      activeIdx = 0; // Abertura
    }

    updateActiveAct(activeIdx);

    // Parallax suave no símbolo "N" no fundo
    if (symbolStage) {
      const translateY = -50 + (progress * 14 - 7);
      const scale = 0.98 + progress * 0.08;
      const rotate = (progress - 0.5) * 6;
      symbolStage.style.transform = `translateY(${translateY}%) scale(${scale}) rotate(${rotate}deg)`;
    }

    // Revelação sequencial cinética dos 5 Valores no Ato 3
    if (kineticItems.length) {
      if (progress >= 0.68) {
        const valProg = Math.max(0, Math.min(1, (progress - 0.68) / 0.28));
        kineticItems.forEach((item, i) => {
          const threshold = i * 0.18;
          if (valProg >= threshold) {
            item.classList.add('is-revealed');
          } else {
            item.classList.remove('is-revealed');
          }
        });
      } else {
        kineticItems.forEach(item => item.classList.remove('is-revealed'));
      }
    }
  }

  function handleTimelineClick(targetIdx) {
    if (isMobile) return;
    const rect = section.getBoundingClientRect();
    const maxScroll = rect.height - window.innerHeight;
    const targetPercentages = [0.05, 0.32, 0.58, 0.85];
    const targetP = targetPercentages[targetIdx] || 0;
    const absoluteTop = window.scrollY + rect.top + targetP * maxScroll;

    window.scrollTo({
      top: absoluteTop,
      behavior: 'smooth'
    });
  }

  timelineSteps.forEach((step, idx) => {
    step.addEventListener('click', () => handleTimelineClick(idx));
  });

  function requestScrollUpdate() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      onScroll();
      rafId = null;
    });
  }

  function checkMobileState() {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 960;

    if (isMobile) {
      actPanes.forEach(pane => {
        pane.classList.add('is-active');
      });
      kineticItems.forEach(item => {
        item.classList.add('is-revealed');
      });
      if (symbolStage) {
        symbolStage.style.transform = '';
      }
    } else {
      currentActiveIndex = -1;
      requestScrollUpdate();
    }
  }

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', checkMobileState, { passive: true });

  // Inicialização inicial
  checkMobileState();
  requestScrollUpdate();
}
