/**
 * Sistema de Templates - Quintal do Céu
 * Renderização dinâmica de projetos usando JavaScript
 */

// Dados dos projetos (simulando uma API)
const projectsData = [
  {
    id: 'educacao',
    category: 'educacao',
    title: 'Educação para Todos',
    description: 'Oferecemos reforço escolar, alfabetização de adultos e atividades complementares para crianças e jovens de comunidades em vulnerabilidade social.',
    image: 'src/assets/images/atividade-educativa2.webp',
    imageAlt: 'Crianças em sala de aula durante atividade de reforço escolar',
    status: 'Ativo',
    stats: {
      beneficiados: 280,
      voluntarios: 15,
      locais: 3
    },
    needs: {
      voluntariado: 'Professores, estudantes universitários',
      doacoes: 'Material escolar, livros didáticos',
      financeiro: 'R$ 50/mês custeia 1 criança'
    }
  },
  {
    id: 'alimentacao',
    category: 'alimentacao',
    title: 'Alimentação Solidária',
    description: 'Distribuição semanal de cestas básicas, refeições prontas e programa de hortas comunitárias para combater a insegurança alimentar.',
    image: 'src/assets/images/voluntarios-distribuindo-alimentos.webp',
    imageAlt: 'Voluntários preparando e distribuindo refeições',
    status: 'Ativo',
    stats: {
      familias: 450,
      voluntarios: 25,
      pontos: 7
    },
    needs: {
      voluntariado: 'Preparo e distribuição de alimentos',
      doacoes: 'Alimentos não perecíveis, cestas básicas',
      financeiro: 'R$ 75/mês custeia 1 família'
    }
  },
  {
    id: 'meio-ambiente',
    category: 'meio-ambiente',
    title: 'Verde Urbano',
    description: 'Revitalização de espaços urbanos através de plantio de árvores, criação de hortas comunitárias e educação ambiental para crianças e adultos.',
    image: 'src/assets/images/voluntario-plantando-arvores2.webp',
    imageAlt: 'Voluntários plantando árvores em área urbana',
    status: 'Ativo',
    stats: {
      arvores: 1200,
      voluntarios: 20,
      hortas: 12
    },
    needs: {
      voluntariado: 'Plantio, manutenção de hortas',
      doacoes: 'Mudas, ferramentas de jardinagem',
      financeiro: 'R$ 30/mês custeia 1 horta'
    }
  },
  {
    id: 'saude',
    category: 'saude',
    title: 'Saúde em Movimento',
    description: 'Atendimento médico básico, campanhas de vacinação e palestras de prevenção em comunidades com acesso limitado aos serviços de saúde.',
    image: 'src/assets/images/voluntarios-acao-saude2.webp',
    imageAlt: 'Profissionais de saúde atendendo comunidade',
    status: 'Ativo',
    stats: {
      atendimentos: 650,
      profissionais: 12,
      campanhas: 8
    },
    needs: {
      voluntariado: 'Profissionais de saúde, estudantes',
      doacoes: 'Medicamentos, equipamentos médicos',
      financeiro: 'R$ 100/mês custeia 1 campanha'
    }
  },
  {
    id: 'capacitacao',
    category: 'educacao',
    title: 'Capacitação Profissional',
    description: 'Cursos de capacitação profissional e empreendedorismo para jovens e adultos, promovendo autonomia financeira e inserção no mercado de trabalho.',
    image: 'src/assets/images/curso-capacitacao-profissional2.webp',
    imageAlt: 'Jovens em curso de capacitação profissional',
    status: 'Em Planejamento',
    stats: {
      alunos: 150,
      cursos: 8,
      unidades: 2
    },
    needs: {
      voluntariado: 'Instrutores, empresários mentores',
      doacoes: 'Equipamentos, computadores',
      financeiro: 'R$ 120/mês custeia 1 aluno'
    }
  },
  {
    id: 'idoso',
    category: 'saude',
    title: 'Apoio ao Idoso',
    description: 'Atividades recreativas, acompanhamento médico domiciliar e suporte emocional para idosos em situação de vulnerabilidade ou isolamento social.',
    image: 'src/assets/images/idoso-atividade-recreativa1.webp',
    imageAlt: 'Voluntários interagindo com idosos em atividade recreativa',
    status: 'Ativo',
    stats: {
      idosos: 85,
      voluntarios: 18,
      regioes: 4
    },
    needs: {
      voluntariado: 'Companhia, atividades recreativas',
      doacoes: 'Produtos de higiene, medicamentos',
      financeiro: 'R$ 80/mês custeia 1 idoso'
    }
  }
];

// Template para renderizar um projeto
function createProjectTemplate(project) {
  const categoryLabels = {
    'educacao': 'Educação',
    'alimentacao': 'Alimentação',
    'meio-ambiente': 'Meio Ambiente',
    'saude': 'Saúde'
  };

  const categoryLabel = categoryLabels[project.category] || project.category;

  // Criar estatísticas dinamicamente
  const statsHTML = Object.entries(project.stats).map(([key, value]) => {
    const label = key.charAt(0).toUpperCase() + key.slice(1);
    return `
      <div class="stat">
        <span class="stat-number" data-target="${value}">${value}</span>
        <span class="stat-label">${label}</span>
      </div>
    `;
  }).join('');

  return `
    <article id="${project.id}" class="project-card" role="listitem" data-category="${project.category}">
      <div class="project-image">
        <img src="${project.image}" alt="${project.imageAlt}" loading="lazy">
        <div class="project-status">${project.status}</div>
      </div>

      <div class="project-content">
        <div class="project-category">${categoryLabel}</div>
        <h3>${project.title}</h3>
        <p class="project-description">${project.description}</p>

        <div class="project-stats">
          ${statsHTML}
        </div>

        <div class="project-needs">
          <h4>Como Você Pode Ajudar:</h4>
          <ul>
            <li><strong>Voluntariado:</strong> ${project.needs.voluntariado}</li>
            <li><strong>Doações:</strong> ${project.needs.doacoes}</li>
            <li><strong>Financeiro:</strong> ${project.needs.financeiro}</li>
          </ul>
        </div>

        <div class="project-actions">
          <a href="cadastro.html?projeto=${project.id}" class="btn btn-primary">Quero Ajudar</a>
          <button class="btn btn-outline" data-modal="${project.id}-details">Ver Detalhes</button>
        </div>
      </div>
    </article>
  `;
}

// Função para renderizar todos os projetos
function renderProjects(projects = projectsData, container = '#projects-grid') {
  const containerElement = document.querySelector(container);
  if (!containerElement) {
    console.error('Container não encontrado:', container);
    return;
  }

  const projectsHTML = projects.map(project => createProjectTemplate(project)).join('');
  containerElement.innerHTML = projectsHTML;

  // Re-inicializar animações de números após renderização
  initializeNumberAnimations();
}

// Função para filtrar projetos por categoria
function filterProjectsByCategory(category) {
  if (category === 'todos') {
    renderProjects();
  } else {
    const filteredProjects = projectsData.filter(project => project.category === category);
    renderProjects(filteredProjects);
  }
}

// Função para inicializar animações de números
function initializeNumberAnimations() {
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(function(stat) {
    const target = parseInt(stat.getAttribute('data-target') || '0');
    if (target > 0) {
      animateValue(stat, 0, target, 2000);
    }
  });
}

// Função para animar números (reutilizada do main.js)
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

// Função para inicializar o sistema de templates
function initializeTemplates() {
  // Renderizar projetos iniciais
  renderProjects();

  // Configurar filtros dinâmicos
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remover classe active de todos os tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      // Adicionar classe active ao tab clicado
      this.classList.add('active');

      // Obter categoria do href ou data-category
      const category = this.getAttribute('href')?.replace('#', '') || this.getAttribute('data-category') || 'todos';
      
      // Filtrar projetos
      filterProjectsByCategory(category);
    });
  });
}

// Exportar funções para uso global
window.ProjectTemplates = {
  renderProjects,
  filterProjectsByCategory,
  initializeTemplates,
  projectsData
};
