/**
 * Screen Reader Support Module - Quintal do Céu
 * Melhora a experiência para usuários de leitores de tela
 */

class ScreenReaderSupport {
  constructor() {
    this.init();
  }

  init() {
    this.setupLiveRegions();
    this.setupDescriptiveText();
    this.setupFormAnnouncements();
    this.setupNavigationAnnouncements();
    this.setupImageDescriptions();
    this.setupInteractiveElements();
  }

  /**
   * Configura regiões live para anúncios dinâmicos
   */
  setupLiveRegions() {
    // Região live para anúncios urgentes
    const urgentRegion = document.createElement('div');
    urgentRegion.setAttribute('aria-live', 'assertive');
    urgentRegion.setAttribute('aria-atomic', 'true');
    urgentRegion.className = 'sr-only';
    urgentRegion.id = 'urgent-live-region';
    document.body.appendChild(urgentRegion);

    // Região live para anúncios polidos
    const politeRegion = document.createElement('div');
    politeRegion.setAttribute('aria-live', 'polite');
    politeRegion.setAttribute('aria-atomic', 'true');
    politeRegion.className = 'sr-only';
    politeRegion.id = 'polite-live-region';
    document.body.appendChild(politeRegion);

    // Funções globais para anúncios
    window.announceUrgent = (message) => {
      urgentRegion.textContent = message;
      setTimeout(() => {
        urgentRegion.textContent = '';
      }, 1000);
    };

    window.announcePolite = (message) => {
      politeRegion.textContent = message;
      setTimeout(() => {
        politeRegion.textContent = '';
      }, 2000);
    };
  }

  /**
   * Configura texto descritivo para elementos
   */
  setupDescriptiveText() {
    // Adicionar descrições para botões sem texto
    this.addButtonDescriptions();
    
    // Adicionar descrições para ícones
    this.addIconDescriptions();
    
    // Melhorar descrições de links
    this.improveLinkDescriptions();
  }

  addButtonDescriptions() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      if (!button.textContent.trim() && !button.getAttribute('aria-label')) {
        const icon = button.querySelector('svg, img');
        if (icon) {
          const iconType = this.getIconType(icon);
          button.setAttribute('aria-label', `Botão ${iconType}`);
        } else {
          button.setAttribute('aria-label', 'Botão');
        }
      }
    });
  }

  addIconDescriptions() {
    const icons = document.querySelectorAll('svg, img[alt=""]');
    icons.forEach(icon => {
      if (!icon.getAttribute('aria-label') && !icon.getAttribute('alt')) {
        const iconType = this.getIconType(icon);
        icon.setAttribute('aria-label', iconType);
      }
    });
  }

  getIconType(element) {
    const className = element.className;
    const src = element.src;
    
    if (className.includes('facebook') || src?.includes('facebook')) return 'Facebook';
    if (className.includes('instagram') || src?.includes('instagram')) return 'Instagram';
    if (className.includes('linkedin') || src?.includes('linkedin')) return 'LinkedIn';
    if (className.includes('menu') || className.includes('hamburger')) return 'Menu';
    if (className.includes('close')) return 'Fechar';
    if (className.includes('next') || className.includes('arrow-right')) return 'Próximo';
    if (className.includes('prev') || className.includes('arrow-left')) return 'Anterior';
    
    return 'Ícone';
  }

  improveLinkDescriptions() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      // Adicionar contexto para links externos
      if (link.hostname !== window.location.hostname) {
        const currentLabel = link.getAttribute('aria-label') || link.textContent;
        link.setAttribute('aria-label', `${currentLabel} (abre em nova aba)`);
      }
      
      // Melhorar descrição de links de imagem
      if (link.querySelector('img') && !link.getAttribute('aria-label')) {
        const img = link.querySelector('img');
        const altText = img.getAttribute('alt') || 'Imagem';
        link.setAttribute('aria-label', `Link para ${altText}`);
      }
    });
  }

  /**
   * Configura anúncios para formulários
   */
  setupFormAnnouncements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      // Anunciar início do preenchimento
      form.addEventListener('focusin', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
          const fieldName = e.target.labels[0]?.textContent || e.target.getAttribute('aria-label') || 'Campo';
          window.announcePolite(`Focando em ${fieldName}`);
        }
      });

      // Anunciar validação
      form.addEventListener('invalid', (e) => {
        const fieldName = e.target.labels[0]?.textContent || e.target.getAttribute('aria-label') || 'Campo';
        const errorMessage = this.getErrorMessage(e.target);
        window.announceUrgent(`Erro em ${fieldName}: ${errorMessage}`);
      });

      // Anunciar sucesso na validação
      form.addEventListener('input', (e) => {
        if (e.target.checkValidity()) {
          const fieldName = e.target.labels[0]?.textContent || e.target.getAttribute('aria-label') || 'Campo';
          window.announcePolite(`${fieldName} válido`);
        }
      });
    });
  }

  getErrorMessage(field) {
    if (field.validity.valueMissing) {
      return 'Campo obrigatório';
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
   * Configura anúncios para navegação
   */
  setupNavigationAnnouncements() {
    // Anunciar mudanças de página (se implementada navegação SPA)
    window.addEventListener('popstate', () => {
      const pageTitle = document.title;
      window.announcePolite(`Navegando para ${pageTitle}`);
    });

    // Anunciar mudanças em tabs/filtros
    document.addEventListener('tabActivated', (e) => {
      const tabText = e.detail.tab.textContent;
      window.announcePolite(`Tab ${tabText} selecionada`);
    });

    // Anunciar mudanças em steps
    document.addEventListener('stepChanged', (e) => {
      const stepNumber = e.detail.step;
      const stepTitle = e.detail.title;
      window.announcePolite(`Passo ${stepNumber}: ${stepTitle}`);
    });
  }

  /**
   * Configura descrições para imagens
   */
  setupImageDescriptions() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Melhorar alt text se necessário
      if (!img.alt || img.alt === '') {
        img.alt = 'Imagem';
        img.setAttribute('role', 'presentation');
      }
      
      // Adicionar descrições longas para imagens importantes
      if (img.classList.contains('hero-image') || img.classList.contains('project-image')) {
        this.addLongDescription(img);
      }
    });
  }

  addLongDescription(img) {
    const longDescId = `${img.id || 'img'}-longdesc`;
    const longDesc = this.generateLongDescription(img);
    
    if (longDesc) {
      img.setAttribute('aria-describedby', longDescId);
      
      // Criar elemento com descrição longa
      const longDescElement = document.createElement('div');
      longDescElement.id = longDescId;
      longDescElement.className = 'sr-only';
      longDescElement.textContent = longDesc;
      
      img.parentNode.appendChild(longDescElement);
    }
  }

  generateLongDescription(img) {
    const src = img.src;
    const alt = img.alt;
    
    // Descrições baseadas no contexto da imagem
    if (src.includes('voluntarios-ajundando-criancas')) {
      return 'Imagem mostra voluntários da Quintal do Céu ajudando crianças em atividades educativas. As crianças estão sorrindo e participando ativamente das atividades propostas pelos voluntários.';
    }
    
    if (src.includes('atividade-educativa')) {
      return 'Imagem mostra crianças participando de atividades educativas oferecidas pela organização. As crianças estão concentradas e engajadas nas atividades de aprendizado.';
    }
    
    if (src.includes('distribuicao-alimentos')) {
      return 'Imagem mostra a distribuição de alimentos para famílias em situação de vulnerabilidade. Voluntários organizam e distribuem cestas básicas com alimentos essenciais.';
    }
    
    if (src.includes('voluntario-plantando-arvores')) {
      return 'Imagem mostra voluntários plantando árvores em projeto de reflorestamento urbano. Os voluntários trabalham em equipe para contribuir com o meio ambiente.';
    }
    
    return null;
  }

  /**
   * Configura elementos interativos
   */
  setupInteractiveElements() {
    // Anunciar mudanças em botões de quantidade
    const amountButtons = document.querySelectorAll('.amount-btn');
    amountButtons.forEach(button => {
      button.addEventListener('click', () => {
        const amount = button.getAttribute('data-amount') || button.textContent;
        window.announcePolite(`Valor de doação ${amount} selecionado`);
      });
    });

    // Anunciar mudanças em filtros
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.textContent;
        window.announcePolite(`Filtro ${category} aplicado`);
      });
    });

    // Anunciar mudanças em steps
    const stepIndicators = document.querySelectorAll('.step-indicator');
    stepIndicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
        const stepNumber = indicator.getAttribute('data-step');
        window.announcePolite(`Passo ${stepNumber} selecionado`);
      });
    });
  }

  /**
   * Utilitários para leitores de tela
   */
  static announcePageChange(title) {
    if (window.announcePolite) {
      window.announcePolite(`Navegando para ${title}`);
    }
  }

  static announceFormSubmission(formName) {
    if (window.announcePolite) {
      window.announcePolite(`Formulário ${formName} enviado com sucesso`);
    }
  }

  static announceError(errorMessage) {
    if (window.announceUrgent) {
      window.announceUrgent(`Erro: ${errorMessage}`);
    }
  }

  static announceSuccess(successMessage) {
    if (window.announcePolite) {
      window.announcePolite(`Sucesso: ${successMessage}`);
    }
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new ScreenReaderSupport();
});

// Exportar para uso em outros módulos
window.ScreenReaderSupport = ScreenReaderSupport;
