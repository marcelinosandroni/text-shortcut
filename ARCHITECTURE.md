# 🏗️ ARCHITECTURE.md - Arquitetura Global

Padrão de aplicação frontend-only com foco em simplicidade, performance e manutenibilidade.

## 📂 ESTRUTURA ROOT

```text
quickfill/
├── src/                    # Código fonte
│   ├── components/         # Componentes React
│   │   ├── ui/            # Componentes shadcn/ui
│   │   └── views/         # Views principais
│   ├── lib/               # Utilitários e lógica
│   ├── store/             # Estado global
│   ├── test/              # Testes unitários
│   ├── App.tsx            # Componente raiz
│   ├── main.tsx           # Entry point
│   └── index.css          # Estilos globais
├── e2e/                   # Testes E2E (Playwright)
├── docs/                  # Documentação do produto
├── specs/                 # Especificações e tarefas
├── dist/                  # Build de produção
└── public/                # Assets estáticos
```

## 🧠 PRINCÍPIOS DE ARQUITETURA

### 1. Separação de Responsabilidades

```
components/
├── ui/          → Componentes genéricos e reutilizáveis (shadcn/ui)
└── views/       → Views específicas do domínio (SnippetsView, DemoView, etc.)

store/
└── index.tsx    → Estado global com React Context + IndexedDB

lib/
├── db.ts        → Camada de acesso a dados (IndexedDB)
└── utils.ts     → Funções utilitárias puras
```

### 2. Fluxo de Dados

```
User Action
    ↓
View Component (SnippetsView, DemoView, etc.)
    ↓
Store (React Context)
    ↓
Database Layer (lib/db.ts)
    ↓
IndexedDB (Browser Storage)
```

### 3. Camadas de Abstração

#### Camada 1: UI (components/)
- **Responsabilidade:** Renderizar interface
- **Não pode:** Acessar banco de dados diretamente
- **Usa:** Store via hooks

#### Camada 2: Store (store/)
- **Responsabilidade:** Gerenciar estado global
- **Não pode:** Renderizar UI
- **Usa:** Database layer para persistência

#### Camada 3: Database (lib/db.ts)
- **Responsabilidade:** Persistência de dados
- **Não pode:** Conter lógica de negócio
- **Usa:** IndexedDB API

#### Camada 4: Utils (lib/utils.ts)
- **Responsabilidade:** Funções puras e helpers
- **Não pode:** Ter estado ou efeitos colaterais
- **Usa:** Nada (funções puras)

## 🎯 PADRÕES DE ORGANIZAÇÃO

### Components

#### UI Components (components/ui/)
Componentes genéricos e reutilizáveis vindos do shadcn/ui:
- `button.tsx` - Botões com 6 variantes
- `card.tsx` - Cards com header, content, footer
- `input.tsx` - Inputs de texto
- `dialog.tsx` - Modais
- `switch.tsx` - Toggles
- `select.tsx` - Dropdowns
- `textarea.tsx` - Textareas
- `label.tsx` - Labels de formulário

**Regras:**
- ✅ Devem ser completamente genéricos
- ✅ Não podem conter lógica de negócio
- ✅ Devem ser acessíveis (WCAG AA)
- ❌ Não podem acessar o store diretamente

#### View Components (components/views/)
Views específicas do domínio:
- `SnippetsView.tsx` - Lista e gerenciamento de snippets
- `CategoriesView.tsx` - Gerenciamento de categorias
- `DemoView.tsx` - Demo de expansão em tempo real
- `SettingsView.tsx` - Configurações
- `ImportExportView.tsx` - Import/Export de dados

**Regras:**
- ✅ Podem acessar o store via hooks
- ✅ Contêm lógica de apresentação
- ✅ Podem ter estado local (useState)
- ❌ Não podem acessar IndexedDB diretamente

### Store

#### Context Provider (store/index.tsx)
- **Responsabilidade:** Estado global da aplicação
- **Contém:** Snippets, categorias, configurações, histórico
- **Persiste:** Via IndexedDB (lib/db.ts)

**Regras:**
- ✅ Single source of truth
- ✅ Persistência automática no IndexedDB
- ✅ API clara e tipada
- ❌ Não pode conter lógica de UI

### Database Layer (lib/db.ts)

#### IndexedDB Wrapper
- **Responsabilidade:** Abstrair operações de banco de dados
- **Contém:** CRUD operations para snippets, categorias, settings, history
- **Usa:** Biblioteca `idb` para IndexedDB

**Regras:**
- ✅ API assíncrona (async/await)
- ✅ Tipada com TypeScript
- ✅ Tratamento de erros
- ❌ Não pode conter lógica de negócio

### Utils (lib/utils.ts)

#### Funções Puras
- **Responsabilidade:** Helpers reutilizáveis
- **Contém:** Funções como `cn()` para merge de classes CSS
- **Usa:** Nada (funções puras)

**Regras:**
- ✅ Devem ser puras (sem efeitos colaterais)
- ✅ Devem ser testáveis isoladamente
- ✅ Devem ser tipadas
- ❌ Não podem acessar store ou banco

## 🔄 FLUXO DE DESENVOLVIMENTO

### Adicionar Nova Feature

1. **Criar tarefa** em `specs/tasks/task-X.Y.md`
2. **Atualizar PLAN.md** com a nova tarefa
3. **Implementar** seguindo o fluxo:
   - Database layer (se precisar de persistência)
   - Store (se precisar de estado global)
   - View component (UI)
   - Testes unitários
   - Testes E2E
4. **Testar** com `npm run test` e `npm run test:e2e`
5. **Commit** com mensagem convencional
6. **Atualizar PLAN.md** marcando como concluído

### Adicionar Novo Componente UI

1. Verificar se já existe no shadcn/ui
2. Se não existir, criar em `components/ui/`
3. Seguir padrões do shadcn/ui (variants, sizes, etc.)
4. Adicionar testes unitários
5. Documentar em REACT.md

### Adicionar Nova View

1. Criar em `components/views/`
2. Usar componentes UI existentes
3. Conectar ao store via hooks
4. Adicionar testes unitários e E2E
5. Adicionar rota no Layout.tsx

## 🎨 DESIGN SYSTEM

### Tema Preto Minimalista

```css
/* Cores */
--background: 0 0% 0%        /* #000000 */
--foreground: 0 0% 98%       /* #FAFAFA */
--card: 0 0% 3%              /* #080808 */
--primary: 0 0% 98%          /* #FAFAFA */
--secondary: 0 0% 10%        /* #1A1A1A */
--muted: 0 0% 8%             /* #141414 */
--accent: 0 0% 10%           /* #1A1A1A */
--border: 0 0% 12%           /* #1F1F1F */
```

### Espaçamento

```css
/* Grid de 4px */
--space-1: 4px    /* 0.25rem */
--space-2: 8px    /* 0.5rem */
--space-3: 12px   /* 0.75rem */
--space-4: 16px   /* 1rem */
--space-6: 24px   /* 1.5rem */
--space-8: 32px   /* 2rem */
```

### Tipografia

```css
/* Fontes */
--font-sans: 'Inter', system-ui, sans-serif
--font-mono: 'JetBrains Mono', monospace

/* Tamanhos */
--text-xs: 11px
--text-sm: 12px
--text-base: 14px
--text-lg: 16px
--text-xl: 20px
--text-2xl: 24px
--text-3xl: 30px
```

## 🧪 ESTRATÉGIA DE TESTES

### Testes Unitários (Vitest)

**O que testar:**
- ✅ Store (ações e reducers)
- ✅ Utils (funções puras)
- ✅ Database layer (CRUD operations)
- ✅ Componentes UI (renderização, interações)

**Cobertura alvo:** 100%

### Testes E2E (Playwright)

**O que testar:**
- ✅ Fluxos completos de usuário
- ✅ Navegação entre views
- ✅ Criação/edição/deleção de snippets
- ✅ Expansão de texto em tempo real
- ✅ Import/Export de dados

**Cobertura alvo:** Todos os fluxos principais

## 📦 DEPENDÊNCIAS

### Core
- `react` + `react-dom` - Framework UI
- `typescript` - Type safety
- `vite` - Build tool
- `tailwindcss` - Utility-first CSS

### UI
- `@radix-ui/*` - Primitivos acessíveis
- `class-variance-authority` - Variantes de componentes
- `clsx` + `tailwind-merge` - Merge de classes
- `lucide-react` - Ícones

### Storage
- `idb` - IndexedDB wrapper

### Testing
- `vitest` - Test runner
- `@testing-library/react` - Testes de componentes
- `@testing-library/jest-dom` - Matchers DOM
- `@testing-library/user-event` - Simulação de usuário
- `playwright` - Testes E2E

## 🚀 DEPLOY

### Build de Produção
```bash
npm run build
```

### Deploy Options
1. **Vercel** - Zero config, auto-deploy
2. **Netlify** - Drag & drop ou Git integration
3. **GitHub Pages** - Gratuito para projetos públicos

### Environment Variables
Nenhuma variável de ambiente necessária (app 100% client-side)

## 🔒 SEGURANÇA

### Princípios
1. **Offline-First:** Nenhum dado sai do navegador
2. **IndexedDB:** Storage local seguro
3. **Sem APIs externas:** Zero dependência de servidores
4. **CSP:** Content Security Policy configurado

### Práticas
- ✅ Sanitização de inputs
- ✅ Validação de dados
- ✅ Tipagem estrita (TypeScript)
- ✅ Sem eval() ou dynamic imports inseguros

---

**Autor:** Marcelino Sandroni  
**Versão:** 1.0.0  
**Última atualização:** 2026-01-15
