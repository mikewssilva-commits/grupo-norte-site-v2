/**
 * GRUPO NORTE — TECNOLOGIA EM MOVIMENTO (Interatividade da Seção de Soluções)
 * Orquestração do Scroll Sticky, Sincronização do Palco Visual e Trilha de Progresso
 */

export function initServices() {
  const chapters = document.querySelectorAll('.pillar-chapter-block');
  const progressBtns = document.querySelectorAll('.progress-step-btn');
  const fills = {
    1: document.querySelector('.step-fill.fill-1'),
    2: document.querySelector('.step-fill.fill-2'),
    3: document.querySelector('.step-fill.fill-3')
  };

  if (!chapters.length) return;

  const order = ['dev', 'auto', 'crm', 'mkt'];

  // Função central para ativar um capítulo por chave ('dev', 'auto', 'crm', 'mkt')
  function activateService(key) {
    if (!key) return;

    // 1. Atualiza os blocos dos capítulos
    chapters.forEach((chapter) => {
      if (chapter.dataset.serviceKey === key) {
        chapter.classList.add('active');
        chapter.setAttribute('aria-current', 'true');
      } else {
        chapter.classList.remove('active');
        chapter.removeAttribute('aria-current');
      }
    });

    // 2. Atualiza os botões de progresso no topo
    progressBtns.forEach((btn) => {
      if (btn.dataset.target === key) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 3. Preenche as linhas de conexão do indicador de progresso
    const currentIndex = order.indexOf(key);
    if (fills[1]) fills[1].classList.toggle('filled', currentIndex >= 1);
    if (fills[2]) fills[2].classList.toggle('filled', currentIndex >= 2);
    if (fills[3]) fills[3].classList.toggle('filled', currentIndex >= 3);
  }

  // Sincronização via IntersectionObserver para Scroll
  const observerOptions = {
    root: null,
    rootMargin: '-15% 0px -40% 0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const key = entry.target.dataset.serviceKey;
        activateService(key);
      }
    });
  }, observerOptions);

  chapters.forEach((chapter) => {
    observer.observe(chapter);

    // Clique direto no bloco para ativação imediata
    chapter.addEventListener('click', () => {
      activateService(chapter.dataset.serviceKey);
    });

    // Acessibilidade por teclado (Enter / Espaço)
    chapter.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateService(chapter.dataset.serviceKey);
      }
    });
  });

  // Clique nos botões da barra superior de navegação dos pilares
  progressBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetKey = btn.dataset.target;
      activateService(targetKey);

      const targetChapter = document.getElementById(`pillar-${targetKey}`);
      if (targetChapter) {
        const headerOffset = 160;
        const elementPosition = targetChapter.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Estado inicial: primeiro serviço ativo
  activateService('dev');

  // Efeito Cinemático Suave de Scroll na Foto e no Fio Condutor
  const officeImg = document.querySelector('.manifesto-office-img');
  const fioGlow = document.querySelector('.fio-condutor-glow');
  const bridge = document.querySelector('.manifesto-services-bridge');

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (officeImg) {
          const rect = officeImg.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          if (rect.top < windowHeight && rect.bottom > 0) {
            // Efeito de 1.04 scale -> 1.00 conforme avança
            const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
            const scale = 1.04 - (progress * 0.04);
            const translateY = (progress - 0.5) * -12;
            officeImg.style.transform = `scale(${scale}) translateY(${translateY}px)`;
          }
        }

        if (bridge && fioGlow) {
          const bRect = bridge.getBoundingClientRect();
          const bWindowHeight = window.innerHeight;
          if (bRect.top < bWindowHeight && bRect.bottom > 0) {
            const bProgress = Math.max(0, Math.min(1, (bWindowHeight - bRect.top) / (bWindowHeight * 0.8)));
            fioGlow.style.transform = `translateY(${bProgress * 65}px)`;
            fioGlow.style.opacity = `${0.3 + (bProgress * 0.7)}`;
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

