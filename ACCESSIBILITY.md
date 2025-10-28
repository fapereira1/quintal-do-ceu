# Acessibilidade - Quintal do Céu

Este documento descreve as implementações de acessibilidade do projeto Quintal do Céu, garantindo conformidade com as diretrizes WCAG 2.1 Nível AA.

## ✅ Implementações Realizadas

### 1. Navegação por Teclado
- **Navegação completa por teclado** em todos os componentes interativos
- **Skip links** para navegação rápida entre seções principais
- **Navegação por setas** em menus, tabs e filtros
- **Trap de foco** em modais e dropdowns
- **Indicadores de foco visíveis** com contraste adequado

### 2. Estrutura Semântica
- **Elementos HTML semânticos** apropriados (`<main>`, `<nav>`, `<section>`, `<article>`)
- **Hierarquia de cabeçalhos** correta (h1 → h2 → h3)
- **Atributos ARIA** para melhorar a experiência com leitores de tela
- **Roles semânticos** (`role="navigation"`, `role="main"`, `role="banner"`)
- **Landmarks** para navegação por seções

### 3. Contraste de Cores
- **Contraste mínimo de 4.5:1** para texto normal
- **Contraste mínimo de 3:1** para texto grande
- **Cores verificadas** com ferramentas de contraste
- **Indicadores de foco** com contraste adequado

### 4. Suporte para Leitores de Tela
- **Regiões live** para anúncios dinâmicos
- **Texto alternativo** descritivo para imagens
- **Labels ARIA** para elementos sem texto visível
- **Descrições longas** para imagens importantes
- **Anúncios contextuais** para mudanças de estado

### 5. Modo Escuro e Alto Contraste
- **Modo escuro acessível** com contraste adequado
- **Modo de alto contraste** para usuários com baixa visão
- **Detecção automática** de preferências do sistema
- **Botões de toggle** para alternância manual
- **Persistência** das preferências do usuário

## 🎯 Funcionalidades de Acessibilidade

### Botões de Acessibilidade
- **Toggle de Alto Contraste**: Botão fixo no canto superior direito
- **Toggle de Modo Escuro**: Botão fixo no canto superior direito
- **Anúncios de mudança**: Leitores de tela são notificados sobre mudanças de tema

### Navegação Aprimorada
- **Skip Links**: Pular para conteúdo principal, sobre, contato, rodapé
- **Navegação por teclado**: Setas, Home, End, Tab, Shift+Tab
- **Indicadores de foco**: Contorno visível em todos os elementos focáveis

### Formulários Acessíveis
- **Validação em tempo real** com anúncios para leitores de tela
- **Mensagens de erro** claras e descritivas
- **Labels associados** a todos os campos
- **Instruções de ajuda** com `aria-describedby`

### Imagens e Mídia
- **Alt text descritivo** para todas as imagens
- **Descrições longas** para imagens importantes
- **Loading lazy** para melhor performance
- **Role="presentation"** para imagens decorativas

## 🔧 Arquivos de Acessibilidade

### JavaScript
- `src/js/accessibility.js` - Módulo principal de acessibilidade
- `src/js/screen-reader-support.js` - Suporte específico para leitores de tela

### CSS
- `src/styles/accessibility.css` - Estilos base de acessibilidade
- `src/styles/themes.css` - Modo escuro e alto contraste

### HTML
- Todos os arquivos HTML foram atualizados com:
  - Estrutura semântica aprimorada
  - Atributos ARIA apropriados
  - Skip links adicionais
  - Descrições contextuais

## 📋 Checklist WCAG 2.1 Nível AA

### Perceptível
- ✅ **1.1.1** Conteúdo não textual: Alt text para imagens
- ✅ **1.3.1** Informações e relacionamentos: Estrutura semântica
- ✅ **1.3.2** Sequência com significado: Ordem lógica de navegação
- ✅ **1.4.3** Contraste mínimo: 4.5:1 para texto normal
- ✅ **1.4.4** Redimensionar texto: Responsivo até 200%
- ✅ **1.4.5** Imagens de texto: Evitadas quando possível

### Operável
- ✅ **2.1.1** Teclado: Navegação completa por teclado
- ✅ **2.1.2** Sem armadilha de teclado: Foco pode sair de todos os elementos
- ✅ **2.1.4** Atalhos de teclado: Navegação por setas implementada
- ✅ **2.4.1** Pular blocos: Skip links implementados
- ✅ **2.4.2** Página com título: Títulos descritivos
- ✅ **2.4.3** Ordem de foco: Sequência lógica
- ✅ **2.4.4** Propósito do link: Links descritivos
- ✅ **2.4.6** Cabeçalhos e labels: Hierarquia correta
- ✅ **2.4.7** Foco visível: Indicadores de foco claros

### Compreensível
- ✅ **3.1.1** Idioma da página: `lang="pt-BR"`
- ✅ **3.2.1** Em foco: Sem mudanças de contexto inesperadas
- ✅ **3.2.2** Na entrada: Sem mudanças de contexto
- ✅ **3.3.1** Identificação de erros: Mensagens claras
- ✅ **3.3.2** Labels ou instruções: Labels associados
- ✅ **3.3.3** Sugestão de erros: Instruções de correção

### Robusto
- ✅ **4.1.1** Análise: HTML válido
- ✅ **4.1.2** Nome, função, valor: Elementos programaticamente determináveis

## 🚀 Como Usar

### Para Desenvolvedores
1. **Importar módulos**: Os módulos de acessibilidade são importados automaticamente
2. **Usar funções utilitárias**: `window.announceToScreenReader()`, `AccessibilityManager.trapFocus()`
3. **Seguir padrões**: Usar elementos semânticos e atributos ARIA apropriados

### Para Usuários
1. **Navegação por teclado**: Use Tab, Shift+Tab, setas, Enter, Espaço
2. **Skip links**: Pressione Tab no início da página para ver skip links
3. **Modo escuro**: Clique no botão 🌙 no canto superior direito
4. **Alto contraste**: Clique no botão 🔍 no canto superior direito

## 🔍 Testes de Acessibilidade

### Ferramentas Recomendadas
- **axe DevTools**: Extensão do navegador
- **WAVE**: Web Accessibility Evaluation Tool
- **Lighthouse**: Auditoria de acessibilidade
- **NVDA/JAWS**: Leitores de tela para testes

### Testes Manuais
1. **Navegação por teclado**: Testar todos os elementos interativos
2. **Leitor de tela**: Verificar anúncios e navegação
3. **Contraste**: Verificar com ferramentas de contraste
4. **Zoom**: Testar redimensionamento até 200%

## 📞 Suporte

Para questões sobre acessibilidade do site:
- **E-mail**: acessibilidade@quintal-do-ceu.org
- **Telefone**: (11) 2345-6789
- **WhatsApp**: (11) 98765-4321

---

**Última atualização**: Dezembro 2024  
**Versão**: WCAG 2.1 Nível AA  
**Status**: ✅ Conforme
