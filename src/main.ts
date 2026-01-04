/**
 * @license
 * Copyright 2020 Google
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameController } from '@/game/GameController';
import './style.css';

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new GameController();
});

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/flowerguesses/sw.js').catch(error => {
      console.error('SW registration failed:', error);
    });
  });
}
