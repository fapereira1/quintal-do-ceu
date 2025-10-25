# Quintal do Céu

![Quintal do Céu Logo](src/assets/icons/quintal-icone.png)

## Sobre

A **Quintal do Céu** é uma organização não governamental dedicada a transformar vidas através da compaixão e ação social. Nossa missão é promover transformação social através de projetos que atendem comunidades em situação de vulnerabilidade, conectando voluntários engajados a causas que geram impacto real e duradouro.

### Nossa Missão
Promover transformação social através de projetos que atendem comunidades em situação de vulnerabilidade, conectando voluntários engajados a causas que geram impacto real e duradouro.

### Nossa Visão
Ser reconhecida como uma organização referência em inovação social, criando uma rede colaborativa que amplifica o potencial transformador de cada pessoa e comunidade.

### Nossos Valores
- **Transparência:** Prestação de contas clara e acessível
- **Inclusão:** Oportunidades para todos, sem distinção
- **Sustentabilidade:** Soluções que perduram no tempo
- **Colaboração:** Trabalho em rede e parcerias estratégicas

### Projetos Principais

#### 🎓 Educação para Todos
Oferecemos reforço escolar, alfabetização de adultos e atividades complementares para crianças e jovens de comunidades em vulnerabilidade social.

#### 🍎 Alimentação Solidária
Distribuição semanal de cestas básicas, refeições prontas e programa de hortas comunitárias para combater a insegurança alimentar.

#### 🌱 Verde Urbano
Revitalização de espaços urbanos através de plantio de árvores, criação de hortas comunitárias e educação ambiental.

#### 🏥 Saúde em Movimento
Atendimento médico básico, campanhas de vacinação e palestras de prevenção em comunidades com acesso limitado aos serviços de saúde.

#### 👨‍💼 Capacitação Profissional
Cursos de capacitação profissional e empreendedorismo para jovens e adultos, promovendo autonomia financeira.

#### 👴 Apoio ao Idoso
Atividades recreativas, acompanhamento médico domiciliar e suporte emocional para idosos em situação de vulnerabilidade.

### Impacto em Números
- **5.420** vidas impactadas
- **127** voluntários ativos
- **23** projetos ativos
- **8** anos de atuação

## Desenvolvimento

### Visão Geral Técnica

Este projeto é um site institucional desenvolvido para a ONG Quintal do Céu, construído com tecnologias web modernas e focado em acessibilidade, performance e experiência do usuário.

### Stack Tecnológico

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Build Tool:** Vite 7.1.7
- **Arquitetura:** Single Page Application (SPA) com múltiplas páginas
- **Estilização:** CSS puro com foco em responsividade e acessibilidade

### Estrutura do Projeto

```
quintal-do-ceu/
├── index.html              # Página inicial
├── cadastro.html           # Formulário de cadastro de voluntários
├── projetos.html           # Catálogo de projetos sociais
├── src/
│   ├── main.js            # JavaScript principal
│   ├── styles/
│   │   └── styles.css     # Estilos globais
│   └── assets/
│       ├── icons/         # Ícones e logos
│       └── images/        # Imagens dos projetos
├── public/                # Assets públicos
└── package.json           # Configurações do projeto
```

### Características Técnicas

#### Acessibilidade
- Implementação de ARIA labels e roles
- Navegação por teclado otimizada
- Skip links para leitores de tela
- Contraste adequado e tipografia legível
- Formulários com validação e feedback claro

#### Responsividade
- Design mobile-first
- Breakpoints adaptativos
- Imagens otimizadas (WebP)
- Layout flexível e grid system

#### Performance
- Lazy loading de imagens
- Otimização de assets
- Build otimizado com Vite
- Meta tags SEO completas

#### Funcionalidades

**Página Inicial (index.html):**
- Seção hero com call-to-action
- Apresentação da organização
- Estatísticas de impacto
- Projetos em destaque
- Formas de doação
- Informações de contato

**Cadastro de Voluntários (cadastro.html):**
- Formulário completo com validação
- Campos para dados pessoais e endereço
- Seleção de áreas de interesse
- FAQ integrado
- Processo de cadastro guiado

**Catálogo de Projetos (projetos.html):**
- Grid de projetos com filtros
- Estatísticas detalhadas por projeto
- Sistema de categorização
- Formas de contribuição específicas
- Processo de voluntariado explicado

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

### Dependências

- **Vite:** Ferramenta de build moderna e rápida
- **Node.js:** Ambiente de execução JavaScript

### Configuração de Desenvolvimento

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute o servidor de desenvolvimento: `npm run dev`
4. Acesse `http://localhost:5173` no navegador

### Estrutura de Dados

O projeto utiliza dados estáticos organizados em:
- Projetos sociais com categorias, estatísticas e necessidades
- Informações de contato e localização
- Configurações de doação e voluntariado
- Metadados SEO e Open Graph

### Considerações de SEO

- Meta tags completas para cada página
- Open Graph para redes sociais
- Estrutura semântica HTML5
- URLs amigáveis
- Sitemap e robots.txt (recomendado)

### Próximos Passos Sugeridos

- Implementação de backend para formulários
- Sistema de gerenciamento de conteúdo (CMS)
- Integração com APIs de pagamento
- Dashboard administrativo
- Sistema de notificações
- Relatórios de impacto automatizados

---

**Quintal do Céu** - Transformando vidas através da compaixão e ação social.

*CNPJ: 12.345.678/0001-90 | contato@quintal-do-ceu.org*