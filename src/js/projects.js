/**
 * GRUPO NORTE — Projects & Portfolio Interactive Engine
 * 
 * Funcionalidades:
 * 1. Vitrine de Sites & Sistemas com Mockups de Computador e Marquee Infinito Híbrido (Auto + Drag Manual)
 * 2. Botões Rápidos de "Ver Projeto" abrindo em nova aba
 * 3. Sistema de Filtros por Abas Interativas (Todos, Sites & Sistemas, Agentes de IA, Marketing & Tráfego)
 * 4. Demonstração Interativa do Chat WhatsApp com Agente de IA e chips de respostas por nicho
 */

import { PROJECTS } from './projects-data.js';

// Base de respostas do Agente de IA para cada nicho comercial
const AI_RESPONSES = {
  delivery: {
    user: 'Como o Agente IA funciona para Delivery e Restaurantes?',
    ai: 'Para restaurantes e delivery, o Agente IA envia o cardápio interativo, anota pedidos complexos com adicionais, calcula taxa de entrega pelo CEP e envia o pedido pronto para a cozinha! Reduz o tempo de espera a zero em horários de pico. 🍕🛵'
  },
  saude: {
    user: 'Vocês têm solução para Clínicas e Consultórios médicos?',
    ai: 'Com certeza! Nosso agente faz triagem prévia do paciente, consulta a agenda dos médicos em tempo real, confirma consultas por WhatsApp e envia lembretes automáticos — reduzindo o no-show (faltas) em até 70%! 🩺📅'
  },
  imobiliaria: {
    user: 'Como funciona a qualificação para Imobiliárias e Corretores?',
    ai: 'A IA atua como pré-atendimento 24/7: identifica se o cliente quer comprar ou alugar, filtra faixa de preço, número de quartos e localização, envia opções compatíveis e já agenda a visita na pauta do corretor! 🏢🔑'
  },
  servicos: {
    user: 'E para Prestadores de Serviço e Escritórios de Advocacia?',
    ai: 'Para serviços e advocacia, o Agente IA realiza acolhimento imediato em menos de 3 segundos, coleta dados preliminares essenciais do caso com sigilo e encaminha o lead qualificado diretamente para a equipe comercial fechar! ⚖️💼'
  }
};

/**
 * 1. VITRINE DE SITES E SISTEMAS (CARROSSEL MARQUEE)
 */
export function initProjectsGallery() {
  const showcaseTrack = document.getElementById('projectsMarqueeTrack');
  const viewport = document.querySelector('.projects-marquee-viewport');
  if (!showcaseTrack || !viewport || !PROJECTS || PROJECTS.length === 0) return;

  // Gerador de cada card individual de site com mockup de tela de computador
  const createProjectCard = (project, index) => {
    return `
      <article 
        class="project-marquee-card" 
        data-project-id="${project.id}" 
        tabindex="0" 
        role="group" 
        aria-label="${project.title} — ${project.category}"
      >
        <!-- Moldura de Computador / Janela de Navegador -->
        <div class="project-frame">
          <!-- Barra Superior do Navegador -->
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

          <!-- Preview em Alta Fidelidade do Site -->
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

          <!-- Rodapé do Card com Título e Categoria -->
          <div class="project-card-footer">
            <div class="project-card-meta">
              <h4 class="project-card-title">${project.title}</h4>
              <span class="project-card-category">${project.category}</span>
            </div>
          </div>

        </div>
      </article>
    `;
  };

  // Renderiza Grupo A e Grupo B idênticos para transição de loop infinito
  const renderGroup = (isClone = false) => `
    <div class="projects-marquee-group" ${isClone ? 'aria-hidden="true"' : ''}>
      ${PROJECTS.map((p, idx) => createProjectCard(p, idx)).join('')}
    </div>
  `;

  showcaseTrack.innerHTML = renderGroup(false) + renderGroup(true);

  // Motor de física e movimento
  let currentX = 0;
  let singleGroupWidth = 0;
  let targetSpeed = 80;
  let resumeProgress = 1;
  let isDragging = false;
  let hasDragged = false;
  let isInteracting = false;
  let startPointerX = 0;
  let startCurrentX = 0;
  let lastPointerX = 0;
  let lastPointerTime = 0;
  let velocity = 0;
  let resumeTimeout = null;

  const updateDimensions = () => {
    const groupA = showcaseTrack.querySelector('.projects-marquee-group');
    if (groupA) {
      singleGroupWidth = groupA.offsetWidth;
      if (singleGroupWidth > 0) {
        targetSpeed = singleGroupWidth / 48;
      }
    }
  };

  // Expõe updateDimensions para recálculo ao alternar abas
  window.__refreshProjectsDimensions = updateDimensions;

  updateDimensions();
  window.addEventListener('load', updateDimensions);

  const groupA = showcaseTrack.querySelector('.projects-marquee-group');
  if (groupA && 'ResizeObserver' in window) {
    const resizeObs = new ResizeObserver(() => updateDimensions());
    resizeObs.observe(groupA);
  }

  const onPointerDown = (e) => {
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
      // Ignora caso não suporte
    }
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startPointerX;
    if (Math.abs(dx) > 5) {
      hasDragged = true;
    }
    currentX = startCurrentX + dx;

    const now = performance.now();
    const dt = now - lastPointerTime;
    if (dt > 0) {
      const instantVelocity = (e.clientX - lastPointerX) / (dt / 16.67);
      velocity = velocity * 0.4 + instantVelocity * 0.6;
    }

    lastPointerX = e.clientX;
    lastPointerTime = now;
  };

  const onPointerUp = (e) => {
    if (!isDragging) return;
    isDragging = false;
    viewport.classList.remove('is-dragging');

    try {
      if (viewport.hasPointerCapture(e.pointerId)) {
        viewport.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignora
    }

    velocity = Math.max(-28, Math.min(28, velocity));
    clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => {
      isInteracting = false;
    }, 2000);
  };

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

  viewport.addEventListener('focusin', () => { isInteracting = true; });
  viewport.addEventListener('focusout', () => { isInteracting = false; });

  let lastFrameTime = performance.now();

  const animationLoop = (now) => {
    const deltaSeconds = Math.min((now - lastFrameTime) / 1000, 0.1);
    lastFrameTime = now;

    if (!isDragging) {
      if (Math.abs(velocity) > 0.15) {
        currentX += velocity * (deltaSeconds * 60);
        velocity *= 0.93;
      } else {
        velocity = 0;
      }

      if (!isInteracting) {
        if (resumeProgress < 1) {
          resumeProgress = Math.min(1, resumeProgress + deltaSeconds * 0.7);
        }
        const activeSpeed = targetSpeed * resumeProgress;
        currentX -= activeSpeed * deltaSeconds;
      }
    }

    if (singleGroupWidth > 0) {
      while (currentX <= -singleGroupWidth) {
        currentX += singleGroupWidth;
      }
      while (currentX > 0) {
        currentX -= singleGroupWidth;
      }
    }

    showcaseTrack.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;
    requestAnimationFrame(animationLoop);
  };

  requestAnimationFrame(animationLoop);
}

/**
 * 2. SISTEMA DE ABAS (FILTROS DE CATEGORIA)
 */
export function initProjectsTabs() {
  const tabButtons = document.querySelectorAll('.projects-tab-btn');
  const panels = document.querySelectorAll('.projects-tab-panel');
  if (!tabButtons.length || !panels.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedTab = btn.getAttribute('data-tab');

      // Atualiza botões
      tabButtons.forEach(b => {
        const isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Atualiza visibilidade dos painéis
      panels.forEach(panel => {
        const category = panel.getAttribute('data-category');
        if (selectedTab === 'all' || category === selectedTab) {
          panel.classList.remove('is-hidden');
          panel.classList.add('is-visible');
        } else {
          panel.classList.add('is-hidden');
          panel.classList.remove('is-visible');
        }
      });

      // Recalcula dimensões do carrossel caso a aba de sites volte a ser exibida
      if (selectedTab === 'all' || selectedTab === 'sites') {
        setTimeout(() => {
          if (window.__refreshProjectsDimensions) {
            window.__refreshProjectsDimensions();
          }
        }, 80);
      }
    });
  });
}

/**
 * 3. DEMONSTRAÇÃO INTERATIVA DO AGENTE DE IA (WHATSAPP SIMULATOR)
 */
export function initAIChatSimulation() {
  const chatMessagesContainer = document.getElementById('aiChatMessages');
  const statusIndicator = document.getElementById('aiChatStatus');
  const chipButtons = document.querySelectorAll('.ai-chat-chip');
  const resetBtn = document.getElementById('aiChatResetBtn');
  if (!chatMessagesContainer) return;

  const getCurrentTime = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  const initialMessagesHtml = `
    <!-- Aviso de Criptografia e IA -->
    <div class="chat-system-notice">
      <span>🔒 Mensagens protegidas por inteligência artificial do Grupo Norte</span>
    </div>

    <div class="chat-date-pill">
      <span>HOJE</span>
    </div>

    <!-- Mensagem 1 (Cliente) -->
    <div class="chat-msg chat-msg-user">
      <div class="chat-bubble">
        <p>Olá! Gostaria de entender como o Agente de IA funciona e se atende a minha empresa.</p>
        <span class="chat-msg-time">${getCurrentTime()}</span>
      </div>
    </div>

    <!-- Mensagem 2 (Agente IA) -->
    <div class="chat-msg chat-msg-bot">
      <div class="chat-bubble">
        <p>Olá! Seja muito bem-vindo ao <strong>Grupo Norte</strong>! 🚀</p>
        <p>Nosso Agente de IA é treinado exclusivamente com a base de conhecimento do seu negócio: cardápios, tabelas de preços, horários de atendimento e regras comerciais. Atende 24h por dia no seu WhatsApp sem filas!</p>
        <div class="chat-msg-meta">
          <span class="chat-msg-time">${getCurrentTime()}</span>
          <span class="chat-check-read" aria-label="Lida">✓✓</span>
        </div>
      </div>
    </div>

    <!-- Mensagem 3 (Cliente) -->
    <div class="chat-msg chat-msg-user">
      <div class="chat-bubble">
        <p>Vocês conseguem integrar direto com meu CRM ou agendamento no Google Agenda?</p>
        <span class="chat-msg-time">${getCurrentTime()}</span>
      </div>
    </div>

    <!-- Mensagem 4 (Agente IA) -->
    <div class="chat-msg chat-msg-bot">
      <div class="chat-bubble">
        <p>Sim, com integração nativa! ⚡ O cliente tira dúvidas, escolhe o melhor horário e a IA já agenda direto no seu calendário ou CRM, enviando confirmação automática.</p>
        <p>Clique em um dos segmentos abaixo para testar uma simulação real para o seu nicho 👇</p>
        <div class="chat-msg-meta">
          <span class="chat-msg-time">${getCurrentTime()}</span>
          <span class="chat-check-read" aria-label="Lida">✓✓</span>
        </div>
      </div>
    </div>
  `;

  // Inicializa o chat com as mensagens base
  chatMessagesContainer.innerHTML = initialMessagesHtml;

  let isTyping = false;

  const scrollToBottom = () => {
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  };

  // Envia resposta simulada
  const triggerNicheResponse = (nicheKey) => {
    if (isTyping || !AI_RESPONSES[nicheKey]) return;
    isTyping = true;

    const data = AI_RESPONSES[nicheKey];
    const userTime = getCurrentTime();

    // 1. Adiciona a mensagem do cliente
    const userMsgEl = document.createElement('div');
    userMsgEl.className = 'chat-msg chat-msg-user is-new';
    userMsgEl.innerHTML = `
      <div class="chat-bubble">
        <p>${data.user}</p>
        <span class="chat-msg-time">${userTime}</span>
      </div>
    `;
    chatMessagesContainer.appendChild(userMsgEl);
    scrollToBottom();

    // 2. Atualiza o status para "digitando..." e cria balão de digitação
    if (statusIndicator) {
      statusIndicator.textContent = 'digitando...';
      statusIndicator.classList.add('is-typing');
    }

    const typingEl = document.createElement('div');
    typingEl.className = 'chat-msg chat-msg-bot chat-typing-bubble';
    typingEl.id = 'chatTypingBubble';
    typingEl.innerHTML = `
      <div class="chat-bubble typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    chatMessagesContainer.appendChild(typingEl);
    scrollToBottom();

    // 3. Após 850ms, remove digitação e insere resposta da IA
    setTimeout(() => {
      const activeTyping = document.getElementById('chatTypingBubble');
      if (activeTyping) activeTyping.remove();

      if (statusIndicator) {
        statusIndicator.textContent = 'Online';
        statusIndicator.classList.remove('is-typing');
      }

      const botTime = getCurrentTime();
      const botMsgEl = document.createElement('div');
      botMsgEl.className = 'chat-msg chat-msg-bot is-new';
      botMsgEl.innerHTML = `
        <div class="chat-bubble">
          <p>${data.ai}</p>
          <div class="chat-msg-meta">
            <span class="chat-msg-time">${botTime}</span>
            <span class="chat-check-read" aria-label="Lida">✓✓</span>
          </div>
        </div>
      `;
      chatMessagesContainer.appendChild(botMsgEl);
      scrollToBottom();
      isTyping = false;
    }, 850);
  };

  chipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const niche = btn.getAttribute('data-niche');
      if (niche) {
        triggerNicheResponse(niche);
      }
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      chatMessagesContainer.innerHTML = initialMessagesHtml;
      if (statusIndicator) {
        statusIndicator.textContent = 'Online';
        statusIndicator.classList.remove('is-typing');
      }
      isTyping = false;
      scrollToBottom();
    });
  }
}

/**
 * Inicializador Geral do Módulo de Projetos
 */
export function initProjectsModule() {
  initProjectsGallery();
  initProjectsTabs();
  initAIChatSimulation();
}
