/**
 * GRUPO NORTE — Clients Marquee Controller
 * Garante a correta renderização dos dados e gerencia a interação da faixa de clientes.
 */

import { CLIENTS } from './clients-data.js';

export function initClientsMarquee() {
  const tracks = document.querySelectorAll('.clients-marquee-track');
  if (!tracks || tracks.length === 0) return;

  // Função geradora de template para um card de cliente
  const renderCard = (client) => `
    <div class="client-card" title="${client.name}">
      <img 
        src="${client.logo}" 
        alt="${client.alt}" 
        class="client-logo-img ${client.customClass}"
        loading="lazy"
        decoding="async"
      >
    </div>
  `;

  // Preenche dinamicamente os trilhos se estiverem vazios (mantendo extensibilidade)
  tracks.forEach(track => {
    if (track.children.length === 0) {
      // Repete a sequência 3 vezes para garantir preenchimento fluido em telas ultra-wide
      const repeatedSequence = [...CLIENTS, ...CLIENTS, ...CLIENTS];
      track.innerHTML = repeatedSequence.map(renderCard).join('');
    }
  });
}
