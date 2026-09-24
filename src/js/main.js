/**
 * GRUPO NORTE — Main Entry Point (Editorial Redesign)
 */

import { initHeader } from './header.js';
import { initClientsMarquee } from './clients.js';
import { initServices } from './services.js';
import { initProjectsGallery } from './projects.js';
import { initPhilosophyExperience } from './philosophy.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initClientsMarquee();
  initServices();
  initProjectsGallery();
  initPhilosophyExperience();
});

