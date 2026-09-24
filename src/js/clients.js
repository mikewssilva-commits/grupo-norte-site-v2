/**
 * GRUPO NORTE — Módulo de Clientes e Marquee Institucional
 * Renderiza a esteira contínua dinamicamente a partir da base de dados (clients-data.js)
 */

import { CLIENTS } from './clients-data.js';

export function initClientsMarquee() {
  const track = document.querySelector('.clients-marquee-track');
  if (!track || !CLIENTS || CLIENTS.length === 0) return;

  // Renderiza um slot de marca com sua classificação óptica e espaçamento limpo
  const renderItem = (client, isClone = false) => `
    <div class="client-brand-slot slot-${client.type || 'compact'}${isClone ? ' client-sequence-clone' : ''}">
      <img 
        src="${client.logo}" 
        alt="${client.alt || client.name}" 
        class="client-brand-logo ${client.customClass || ''}"
        loading="lazy"
      >
    </div>
  `;

  // Renderiza a sequência contínua com repetição matemática para loop infinito sem saltos
  const sequence = CLIENTS.map(c => renderItem(c, false)).join('');
  const sequenceClone = CLIENTS.map(c => renderItem(c, true)).join('');

  track.innerHTML = sequence + sequence + sequenceClone + sequenceClone;
}

