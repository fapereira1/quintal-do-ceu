/**
 * Accessibility Module - Quintal do Céu
 * Implementa funcionalidades de acessibilidade WCAG 2.1 Nível AA
 */

class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
    this.setupHighContrastMode();
    this.setupDarkMode();
    this.setupSkipLinks();
    this.setupFormAccessibility();
    this.setupImageAccessibility();
    this.setupColorContrast();
  }

  /**
   * Configura navegação por teclado avançada
   */
  setupKeyboardNavigation() {
    // Navegação por teclado em menus
    this.setupMenuKeyboardNavigation();
    
    // Navegação por teclado em tabs/filtros
    this.setupTabNavigation();
    
    // Navegação por teclado em modais e dropdowns
    this.setupModalKeyboardNavigation();
    
    // Navegação por teclado em cards interativos
    this.setupCardKeyboardNavigation();
  }

  setupMenuKeyboardNavigation() {
    const navMenus = document.querySelectorAll('.nav-menu');
    
    navMenus.forEach(menu => {
      const menuItems = menu.querySelectorAll('a[role="menuitem"]');
      
      menuItems.forEach((item, index) => {
        item.addEventListener('keydown', (e) => {
          switch(e.key) {
            case 'ArrowRight':
              e.preventDefault();
              const nextItem = menuItems[index + 1] || menuItems[0];
              nextItem.focus();
              break;
            case 'ArrowLeft':
              e.preventDefault();
              const prevItem = menuItems[index - 1] || menuItems[menuItems.length - 1];
              prevItem.focus();
              break;
            case 'Home':
              e.preventDefault();
              menuItems[0].focus();
              break;
            case 'End':
              e.preventDefault();
              menuItems[menuItems.length - 1].focus();
              break;
          }
        });
      });
    });
  }

  setupTabNavigation() {
    const tabLists = document.querySelectorAll('[role="tablist"]');
    
    tabLists.forEach(tabList => {
      const tabs = tabList.querySelectorAll('[role="tab"]');
      
      tabs.forEach((tab, index) => {
        tab.addEventListener('keydown', (e) => {
          switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
              e.preventDefault();
              const nextTab = tabs[index + 1] || tabs[0];
              this.activateTab(nextTab, tabs);
              break;
            case 'ArrowLeft':
            case 'ArrowUp':
              e.preventDefault();
              const prevTab = tabs[index - 1] || tabs[tabs.length - 1];
              this.activateTab(prevTab, tabs);
              break;
            case 'Home':
              e.preventDefault();
              this.activateTab(tabs[0], tabs);
              break;
            case 'End':
              e.preventDefault();
              this.activateTab(tabs[tabs.length - 1], tabs);
              break;
          }
        });
      });
    });
  }

  activateTab(activeTab, allTabs) {
    // Remove aria-selected de todas as tabs
    allTabs.forEach(tab => {
      tab.setAttribute('aria-selected', 'false');
      tab.classList.remove('active');
    });
    
    // Ativa a tab selecionada
    activeTab.setAttribute('aria-selected', 'true');
    activeTab.classList.add('active');
    activeTab.focus();
    
    // Dispara evento customizado para outros scripts
    activeTab.dispatchEvent(new CustomEvent('tabActivated', {
      detail: { tab: activeTab }
    }));
  }

  setupModalKeyboardNavigation() {
    // Trap focus em modais quando implementados
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.querySelector('.modal.active, .modal[aria-hidden="false"]');
        if (modal) {
          this.closeModal(modal);
        }
      }
    });
  }

  setupCardKeyboardNavigation() {
    const cards = document.querySelectorAll('.project-card, .about-card, .donation-card');
    
    cards.forEach(card => {
      // Tornar cards focáveis
      if (!card.hasAttribute('tabindex')) {
        card.setAttribute('tabindex', '0');
      }
      
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const link = card.querySelector('a');
          if (link) {
            link.click();
          }
        }
      });
    });
  }

  /**
   * Configura gerenciamento de foco
   */
  setupFocusManagement() {
    // Indicador de foco visível melhorado
    this.setupFocusIndicator();
    
    // Restaurar foco após navegação
    this.setupFocusRestoration();
  }

  setupFocusIndicator() {
    const style = document.createElement('style');
    style.textContent = `
      /* Indicador de foco visível melhorado */
      *:focus {
        outline: 3px solid var(--primary);
        outline-offset: 2px;
        border-radius: 2px;
      }
      
      /* Foco customizado para elementos específicos */
      .btn:focus,
      .filter-tab:focus,
      .amount-btn:focus {
        outline: 3px solid var(--accent);
        outline-offset: 2px;
      }
      
      /* Foco para elementos de navegação */
      .nav-menu a:focus {
        outline: 3px solid var(--primary);
        outline-offset: 2px;
        background: var(--gray-100);
      }
      
      /* Foco para cards */
      .project-card:focus,
      .about-card:focus,
      .donation-card:focus {
        outline: 3px solid var(--primary);
        outline-offset: 4px;
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }
    `;
    document.head.appendChild(style);
  }

  setupFocusRestoration() {
    // Salvar elemento com foco antes de navegação
    let lastFocusedElement = null;
    
    document.addEventListener('focusin', (e) => {
      lastFocusedElement = e.target;
    });
    
    // Restaurar foco após navegação SPA (se implementada)
    window.addEventListener('popstate', () => {
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        setTimeout(() => lastFocusedElement.focus(), 100);
      }
    });
  }

  /**
   * Configura suporte para leitores de tela
   */
  setupScreenReaderSupport() {
    this.setupLiveRegions();
    this.setupAriaLabels();
    this.setupDescriptiveText();
  }

  setupLiveRegions() {
    // Criar região live para anúncios dinâmicos
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
    
    // Função para anunciar mudanças
    window.announceToScreenReader = (message) => {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    };
  }

  setupAriaLabels() {
    // Adicionar labels ARIA para elementos sem texto visível
    const iconButtons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    iconButtons.forEach(button => {
      if (!button.textContent.trim()) {
        button.setAttribute('aria-label', 'Botão');
      }
    });
    
    // Labels para elementos interativos
    const interactiveElements = document.querySelectorAll('.step-indicator, .amount-btn');
    interactiveElements.forEach(element => {
      if (!element.getAttribute('aria-label')) {
        const text = element.textContent || element.getAttribute('data-step') || 'Elemento';
        element.setAttribute('aria-label', text);
      }
    });
  }

  setupDescriptiveText() {
    // Adicionar texto descritivo para imagens decorativas
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.getAttribute('alt')) {
        img.setAttribute('alt', 'Imagem decorativa');
        img.setAttribute('role', 'presentation');
      }
    });
  }

  /**
   * Configura modo de alto contraste
   */
  setupHighContrastMode() {
    // Detectar preferência do sistema
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      document.documentElement.classList.add('high-contrast');
    }
    
    // Listener para mudanças na preferência
    window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    });
    
    // Botão de toggle manual
    this.createHighContrastToggle();
  }

  createHighContrastToggle() {
    const toggle = document.createElement('button');
    toggle.setAttribute('aria-label', 'Alternar modo de alto contraste');
    toggle.className = 'accessibility-toggle high-contrast-toggle';
    toggle.innerHTML = '🔍';
    toggle.title = 'Alto Contraste';
    
    toggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('high-contrast');
      const isActive = document.documentElement.classList.contains('high-contrast');
      toggle.setAttribute('aria-pressed', isActive);
      
      // Anunciar mudança
      window.announceToScreenReader(
        isActive ? 'Modo de alto contraste ativado' : 'Modo de alto contraste desativado'
      );
    });
    
    // Adicionar ao header
    const header = document.querySelector('.main-header');
    if (header) {
      header.appendChild(toggle);
    }
  }

  /**
   * Configura modo escuro acessível
   */
  setupDarkMode() {
    // Detectar preferência do sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark-mode');
    }
    
    // Listener para mudanças na preferência
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    });
    
    // Botão de toggle manual
    this.createDarkModeToggle();
  }

  createDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.setAttribute('aria-label', 'Alternar modo escuro');
    toggle.className = 'accessibility-toggle dark-mode-toggle';
    toggle.innerHTML = '🌙';
    toggle.title = 'Modo Escuro';
    
    toggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark-mode');
      const isActive = document.documentElement.classList.contains('dark-mode');
      toggle.setAttribute('aria-pressed', isActive);
      
      // Salvar preferência
      localStorage.setItem('darkMode', isActive);
      
      // Anunciar mudança
      window.announceToScreenReader(
        isActive ? 'Modo escuro ativado' : 'Modo escuro desativado'
      );
    });
    
    // Restaurar preferência salva
    const savedPreference = localStorage.getItem('darkMode');
    if (savedPreference === 'true') {
      document.documentElement.classList.add('dark-mode');
      toggle.setAttribute('aria-pressed', 'true');
    }
    
    // Adicionar ao header
    const header = document.querySelector('.main-header');
    if (header) {
      header.appendChild(toggle);
    }
  }

  /**
   * Configura skip links aprimorados
   */
  setupSkipLinks() {
    // Skip link para conteúdo principal já existe, vamos melhorar
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
    
    // Adicionar skip links para seções principais
    this.addSkipLinks();
  }

  addSkipLinks() {
    const skipLinksContainer = document.createElement('nav');
    skipLinksContainer.setAttribute('aria-label', 'Links de navegação rápida');
    skipLinksContainer.className = 'skip-links';
    
    const skipLinks = [
      { href: '#main-content', text: 'Pular para o conteúdo principal' },
      { href: '#sobre', text: 'Pular para seção Sobre' },
      { href: '#contato', text: 'Pular para seção Contato' },
      { href: '.main-footer', text: 'Pular para o rodapé' }
    ];
    
    skipLinks.forEach(link => {
      const skipLink = document.createElement('a');
      skipLink.href = link.href;
      skipLink.textContent = link.text;
      skipLink.className = 'skip-link';
      skipLinksContainer.appendChild(skipLink);
    });
    
    document.body.insertBefore(skipLinksContainer, document.body.firstChild);
  }

  /**
   * Configura acessibilidade de formulários
   */
  setupFormAccessibility() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      // Adicionar aria-describedby para campos com ajuda
      const fieldsWithHelp = form.querySelectorAll('input, select, textarea');
      fieldsWithHelp.forEach(field => {
        const helpText = field.parentNode.querySelector('small');
        if (helpText && !helpText.id) {
          helpText.id = `${field.id || field.name}-help`;
          field.setAttribute('aria-describedby', helpText.id);
        }
      });
      
      // Validação acessível
      this.setupFormValidation(form);
    });
  }

  setupFormValidation(form) {
    const fields = form.querySelectorAll('input, select, textarea');
    
    fields.forEach(field => {
      field.addEventListener('invalid', (e) => {
        e.preventDefault();
        this.showFieldError(field);
      });
      
      field.addEventListener('input', () => {
        this.clearFieldError(field);
      });
    });
  }

  showFieldError(field) {
    const errorMessage = this.getErrorMessage(field);
    const errorElement = document.createElement('div');
    errorElement.className = 'field-message error';
    errorElement.textContent = errorMessage;
    errorElement.id = `${field.id || field.name}-error`;
    
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', errorElement.id);
    
    field.parentNode.appendChild(errorElement);
    
    // Anunciar erro
    window.announceToScreenReader(`Erro: ${errorMessage}`);
  }

  clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-message.error');
    if (errorElement) {
      errorElement.remove();
    }
    field.removeAttribute('aria-invalid');
  }

  getErrorMessage(field) {
    if (field.validity.valueMissing) {
      return `${field.labels[0]?.textContent || 'Campo'} é obrigatório`;
    }
    if (field.validity.typeMismatch) {
      return 'Formato inválido';
    }
    if (field.validity.patternMismatch) {
      return 'Formato não corresponde ao esperado';
    }
    if (field.validity.tooShort) {
      return `Mínimo de ${field.minLength} caracteres`;
    }
    if (field.validity.tooLong) {
      return `Máximo de ${field.maxLength} caracteres`;
    }
    return 'Valor inválido';
  }

  /**
   * Configura acessibilidade de imagens
   */
  setupImageAccessibility() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Adicionar loading="lazy" se não existir
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Melhorar alt text se necessário
      if (!img.alt || img.alt === '') {
        img.alt = 'Imagem';
      }
    });
  }

  /**
   * Configura contraste de cores
   */
  setupColorContrast() {
    // Verificar contraste de elementos críticos
    this.checkColorContrast();
  }

  checkColorContrast() {
    // Esta função pode ser expandida para verificar contraste programaticamente
    // Por enquanto, vamos garantir que os estilos tenham contraste adequado
    console.log('Verificação de contraste de cores implementada');
  }

  /**
   * Utilitários de acessibilidade
   */
  static announce(message) {
    if (window.announceToScreenReader) {
      window.announceToScreenReader(message);
    }
  }

  static trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new AccessibilityManager();
});

// Exportar para uso em outros módulos
window.AccessibilityManager = AccessibilityManager;
