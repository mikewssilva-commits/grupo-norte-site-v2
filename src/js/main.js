/**
 * GRUPO NORTE — Main Entry Point (Editorial Redesign)
 */

import { initHeader } from './header.js';
import { initClientsMarquee } from './clients.js';
import { initServices } from './services.js';
import { initProjectsModule } from './projects.js';
import { initPhilosophyExperience } from './philosophy.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initClientsMarquee();
  initServices();
  initProjectsModule();
  initPhilosophyExperience();
});

