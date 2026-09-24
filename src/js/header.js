/**
 * GRUPO NORTE — Header Controller Institucional
 * Scroll Spy, Smooth Scroll e Gestão de Drawer Mobile
 */

export function initHeader() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link, .btn-mobile-talk');
  const navLinks = document.querySelectorAll('.nav-institutional a');

  if (!header) return;

  // 1. Detecção de Scroll Sutil
  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2. Menu Drawer Mobile
  if (toggle && drawer) {
    const setDrawerState = (open) => {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      drawer.classList.toggle('is-open', open);
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.style.overflow = open ? 'hidden' : '';
    };

    toggle.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('is-open');
      setDrawerState(!isOpen);
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => setDrawerState(false));
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        setDrawerState(false);
        toggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 960 && drawer.classList.contains('is-open')) {
        setDrawerState(false);
      }
    });
  }

  // 3. Scroll Spy Discreto (Indicação de seção ativa)
  const trackedSections = [
    { id: 'solucoes', el: document.getElementById('solucoes') },
    { id: 'projetos', el: document.getElementById('projetos') },
    { id: 'grupo-norte', el: document.getElementById('grupo-norte') },
    { id: 'contato', el: document.getElementById('contato') }
  ].filter(item => item.el !== null);

  const heroSection = document.getElementById('inicio');
  const allNavLinks = document.querySelectorAll('.nav-institutional a, .mobile-drawer-link');

  let currentActiveId = undefined;

  function setActiveId(activeId) {
    if (activeId === currentActiveId) return;
    currentActiveId = activeId;

    allNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (activeId && href === `#${activeId}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  function updateActiveSection() {
    const scrollY = window.scrollY;
    const heroHeight = heroSection ? heroSection.offsetHeight : 600;
    const triggerOffset = Math.min(200, window.innerHeight * 0.28);

    // Condição 1: Topo da página / Hero / Antes de Soluções
    // Se o usuário estiver no topo ou antes da primeira seção rastreada, menu fica 100% neutro.
    const firstSection = trackedSections[0];
    if (firstSection) {
      const firstRect = firstSection.el.getBoundingClientRect();
      if (scrollY < heroHeight * 0.5 || firstRect.top > triggerOffset) {
        setActiveId(null);
        return;
      }
    } else if (scrollY < heroHeight) {
      setActiveId(null);
      return;
    }

    // Condição 2: Fim da página (Contato / Rodapé)
    const isAtBottom = (window.innerHeight + scrollY) >= (document.documentElement.scrollHeight - 60);
    if (isAtBottom) {
      setActiveId('contato');
      return;
    }

    // Condição 3: Posição real da seção dentro da viewport
    let activeId = null;
    for (const section of trackedSections) {
      const rect = section.el.getBoundingClientRect();
      if (rect.top <= triggerOffset && rect.bottom > triggerOffset) {
        activeId = section.id;
        break;
      }
    }

    setActiveId(activeId);
  }

  let spyRafId = null;
  function requestSpyUpdate() {
    if (spyRafId) return;
    spyRafId = requestAnimationFrame(() => {
      updateActiveSection();
      spyRafId = null;
    });
  }

  window.addEventListener('scroll', requestSpyUpdate, { passive: true });
  window.addEventListener('resize', requestSpyUpdate, { passive: true });

  // Inicialização no carregamento
  updateActiveSection();
}
