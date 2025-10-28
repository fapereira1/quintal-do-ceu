/**
 * Main JavaScript - Quintal do Céu
 * Ponto de entrada da aplicação
 */

// Importar máscaras e templates
import './js/masks.js';
import './js/templates.js';
import './js/accessibility.js';
import './js/screen-reader-support.js';

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

  // Inicializar sistema de steps de voluntariado
  if (document.querySelector('.volunteer-steps')) {
    initializeVolunteerSteps();
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

// Função para inicializar o sistema de steps de voluntariado
function initializeVolunteerSteps() {
  const steps = document.querySelectorAll('.step');
  const stepIndicators = document.querySelectorAll('.step-indicator');
  const prevBtn = document.querySelector('.step-nav-btn.prev');
  const nextBtn = document.querySelector('.step-nav-btn.next');
  
  let currentStep = 1;
  const totalSteps = steps.length;

  // Função para atualizar a exibição dos steps
  function updateSteps(stepNumber) {
    // Remover classe active de todos os steps
    steps.forEach(step => step.classList.remove('active'));
    stepIndicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Adicionar classe active ao step atual
    const currentStepElement = document.querySelector(`[data-step="${stepNumber}"]`);
    const currentIndicator = document.querySelector(`.step-indicator[data-step="${stepNumber}"]`);
    
    if (currentStepElement) {
      currentStepElement.classList.add('active');
    }
    if (currentIndicator) {
      currentIndicator.classList.add('active');
    }
    
    // Atualizar estado dos botões de navegação
    if (prevBtn) {
      prevBtn.disabled = stepNumber === 1;
    }
    if (nextBtn) {
      nextBtn.disabled = stepNumber === totalSteps;
    }
    
  }

  // Função para obter o título do step
  function getStepTitle(stepNumber) {
    const stepTitles = {
      1: 'Inscreva-se',
      2: 'Entrevista', 
      3: 'Capacitação',
      4: 'Ação'
    };
    return stepTitles[stepNumber] || '';
  }

  // Event listeners para botões de navegação
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      if (currentStep > 1) {
        currentStep--;
        updateSteps(currentStep);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      if (currentStep < totalSteps) {
        currentStep++;
        updateSteps(currentStep);
      }
    });
  }

  // Event listeners para indicadores de step
  stepIndicators.forEach(indicator => {
    indicator.addEventListener('click', function() {
      const stepNumber = parseInt(this.getAttribute('data-step'));
      currentStep = stepNumber;
      updateSteps(currentStep);
    });
  });

  // Inicializar com o primeiro step ativo
  updateSteps(1);
}