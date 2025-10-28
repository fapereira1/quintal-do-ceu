/**
 * Main JavaScript - Quintal do Céu
 * Ponto de entrada da aplicação
 */

// Importar máscaras e templates
import './js/masks.js';
import './js/templates.js';

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
  
  // Inicializar sistema de templates (se estiver na página de projetos)
  if (document.querySelector('#projects-grid')) {
    window.ProjectTemplates.initializeTemplates();
  } else {
    // Animação de números para estatísticas (páginas sem templates)
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(function(stat) {
      const target = parseInt(stat.getAttribute('data-target') || '0');
      if (target > 0) {
        animateValue(stat, 0, target, 2000);
      }
    });
  }

  // Validação: aplicar somente após blur (touched) ou submit (was-submitted)
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    // Marcar campos como touched no blur
    form.addEventListener('focusout', (e) => {
      const el = e.target;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA')) {
        el.classList.add('touched');
      }
    }, true);

    // Controle do submit: evitar validação visual antes do submit
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        form.classList.add('was-submitted');
        // Focar no primeiro inválido para acessibilidade
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid && typeof firstInvalid.focus === 'function') {
          firstInvalid.focus();
        }
      } else {
        form.classList.add('was-submitted');
      }
    });
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