/**
 * Main JavaScript - Quintal do Céu
 * Ponto de entrada da aplicação
 */

// Importar máscaras
import './assets/js/masks.js';

// Menu hambúrguer para navegação mobile
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
    });
  }
  
  // Animação de números para estatísticas
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(function(stat) {
    const target = parseInt(stat.getAttribute('data-target') || '0');
    if (target > 0) {
      animateValue(stat, 0, target, 2000);
    }
  });
});

// Função para animar números
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start).toLocaleString('pt-BR');
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}