# ⚛️ REACT.md - Regras do Frontend (QuickFill)

Arquitetura focada em **simplicidade**, **componentização** e **testabilidade**. Sem código espaguete, sem lixo global.

## 📂 ESTRUTURA

```text
src/
├── components/
│   ├── ui/           # 🎨 Componentes shadcn/ui (genéricos)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── switch.tsx
│   │   └── textarea.tsx
│   │
│   └── views/        # 🖼️ Views específicas do domínio
│       ├── SnippetsView.tsx
│       ├── CategoriesView.tsx
│       ├── DemoView.tsx
│       ├── SettingsView.tsx
│       └── ImportExportView.tsx
│
├── store/            # 🗄️ Estado global
│   ├── index.tsx     # Context Provider + hooks
│   └── types.ts      # Tipos TypeScript
│
├── lib/              # 🔧 Utilitários e lógica
│   ├── db.ts         # IndexedDB wrapper
│   └── utils.ts      # Funções puras (cn, etc.)
│
├── test/             # 🧪 Testes unitários
│   ├── setup.ts      # Configuração do Vitest
│   ├── store.test.tsx
│   ├── utils.test.ts
│   ├── db.test.ts
│   └── [component].test.tsx
│
├── App.tsx           # 🏠 Componente raiz
├── main.tsx          # 🚀 Entry point
└── index.css         # 🎨 Estilos globais + tema
```

## 🧠 REGRAS FUNDAMENTAIS

### 1. Componentes UI (components/ui/)

**O que são:**
- Componentes genéricos e reutilizáveis
- Vêm do shadcn/ui ou são inspirados nele
- Não contêm lógica de negócio

**Regras:**
- ✅ Devem ser completamente genéricos
- ✅ Devem aceitar `className` para customização
- ✅ Devem usar `cn()` para merge de classes
- ✅ Devem ser acessíveis (WCAG AA)
- ✅ Devem ter variantes bem definidas (variant, size)
- ❌ Não podem acessar o store
- ❌ Não podem conter lógica de negócio
- ❌ Não podem fazer chamadas de API

**Exemplo Correto:**
```tsx
// components/ui/button.tsx
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
```

### 2. Views (components/views/)

**O que são:**
- Views específicas do domínio QuickFill
- Conectam componentes UI ao store
- Contêm lógica de apresentação

**Regras:**
- ✅ Podem acessar o store via `useStore()`
- ✅ Podem ter estado local (`useState`)
- ✅ Podem conter lógica de apresentação
- ✅ Devem usar componentes UI
- ❌ Não podem acessar IndexedDB diretamente
- ❌ Não podem conter lógica de negócio complexa

**Exemplo Correto:**
```tsx
// components/views/SnippetsView.tsx
export default function SnippetsView() {
  const { snippets, searchQuery, setSearchQuery, deleteSnippet } = useStore();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filteredSnippets = snippets.filter(s => 
    s.abbreviation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Input
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search snippets..."
      />
      
      {filteredSnippets.map(snippet => (
        <Card key={snippet.id}>
          {/* ... */}
        </Card>
      ))}
    </div>
  );
}
```

### 3. Store (store/)

**O que é:**
- Estado global da aplicação
- Gerenciado com React Context
- Persistido no IndexedDB

**Regras:**
- ✅ Single source of truth
- ✅ Persistência automática
- ✅ API clara e tipada
- ✅ Hooks customizados (`useStore()`)
- ❌ Não pode conter lógica de UI
- ❌ Não pode renderizar componentes

**Exemplo Correto:**
```tsx
// store/index.tsx
interface StoreContextType {
  snippets: Snippet[];
  categories: Category[];
  settings: Settings;
  addSnippet: (s: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSnippet: (s: Snippet) => void;
  deleteSnippet: (id: string) => void;
  // ...
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [snippets, setSnippets] = useState<Snippet[]>(DEFAULT_SNIPPETS);
  
  // Persist to IndexedDB
  useEffect(() => {
    snippets.forEach(snippet => db.addSnippet(snippet));
  }, [snippets]);

  return (
    <StoreContext.Provider value={{ snippets, addSnippet, ... }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
```

### 4. Database Layer (lib/db.ts)

**O que é:**
- Wrapper para IndexedDB
- Abstrai operações de banco de dados
- API assíncrona

**Regras:**
- ✅ API assíncrona (async/await)
- ✅ Tipada com TypeScript
- ✅ Tratamento de erros
- ✅ Funções CRUD claras
- ❌ Não pode conter lógica de negócio
- ❌ Não pode acessar o store

**Exemplo Correto:**
```tsx
// lib/db.ts
export async function getAllSnippets(): Promise<Snippet[]> {
  const db = await getDB();
  return db.getAll('snippets');
}

export async function addSnippet(snippet: Snippet): Promise<void> {
  const db = await getDB();
  await db.put('snippets', snippet);
}

export async function deleteSnippet(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('snippets', id);
}
```

### 5. Utils (lib/utils.ts)

**O que são:**
- Funções puras e helpers
- Reutilizáveis em todo o projeto
- Sem efeitos colaterais

**Regras:**
- ✅ Devem ser puras (sem efeitos colaterais)
- ✅ Devem ser testáveis isoladamente
- ✅ Devem ser tipadas
- ❌ Não podem acessar store ou banco
- ❌ Não podem ter estado

**Exemplo Correto:**
```tsx
// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## 🎨 DESIGN SYSTEM

### Tema Preto Minimalista

**Cores:**
```css
--background: #000000    /* Preto puro */
--foreground: #FAFAFA    /* Branco suave */
--card: #080808          /* Quase preto */
--primary: #FAFAFA       /* Branco para ações primárias */
--secondary: #1A1A1A     /* Cinza escuro */
--muted: #141414         /* Cinza muito escuro */
--accent: #1A1A1A        /* Cinza escuro */
--border: #1F1F1F        /* Bordas sutis (12% lightness) */
```

**Regras de Cor:**
- ✅ Nunca usar `#FFFFFF` puro (usar `#FAFAFA`)
- ✅ Nunca usar cinza para texto primário
- ✅ Bordas sempre em 12% lightness
- ✅ Backgrounds em camadas: Black → Card (3%) → Muted (8%) → Secondary (10%)
- ✅ Cores de accent apenas para estado (success, warning, error)

### Tipografia

**Fontes:**
```css
--font-sans: 'Inter', system-ui, sans-serif
--font-mono: 'JetBrains Mono', monospace
```

**Regras:**
- ✅ Sans-serif para UI
- ✅ Monospace para código/abbreviações
- ✅ Nunca misturar famílias de fontes
- ✅ Line height: 1.5 para body, 1.2 para headings

### Espaçamento

**Grid de 4px:**
```css
--space-1: 4px    /* 0.25rem */
--space-2: 8px    /* 0.5rem */
--space-3: 12px   /* 0.75rem */
--space-4: 16px   /* 1rem */
--space-6: 24px   /* 1.5rem */
--space-8: 32px   /* 2rem */
```

**Regras:**
- ✅ Card padding: 24px
- ✅ Form field gaps: 12px
- ✅ Button gaps: 8px
- ✅ List item gaps: 8px
- ✅ Section gaps: 32px
- ❌ Nunca usar números ímpares (sempre múltiplos de 4)

## 🧪 TESTES

### Testes Unitários (Vitest)

**O que testar:**
- ✅ Store (ações e reducers)
- ✅ Utils (funções puras)
- ✅ Database layer (CRUD operations)
- ✅ Componentes UI (renderização, interações)

**Estrutura:**
```tsx
// test/button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/ui/button';

describe('Button Component', () => {
  it('should render with default variant', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(<Button onClick={() => { clicked = true; }}>Click</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(clicked).toBe(true);
  });
});
```

### Testes E2E (Playwright)

**O que testar:**
- ✅ Fluxos completos de usuário
- ✅ Navegação entre views
- ✅ Criação/edição/deleção de snippets
- ✅ Expansão de texto em tempo real
- ✅ Import/Export de dados

**Estrutura:**
```typescript
// e2e/snippets.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Snippet Management', () => {
  test('should create a new snippet', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /new snippet/i }).click();
    
    await page.getByLabel(/abbreviation/i).fill('testabbr');
    await page.getByLabel(/expansion text/i).fill('Test Expansion');
    await page.getByRole('button', { name: /create snippet/i }).click();
    
    await expect(page.getByText('testabbr')).toBeVisible();
  });
});
```

## 📝 PADRÕES DE CÓDIGO

### Nomenclatura

**Componentes:**
- ✅ PascalCase: `SnippetsView.tsx`, `Button.tsx`
- ❌ camelCase: `snippetsView.tsx`, `button.tsx`

**Arquivos de teste:**
- ✅ `[component].test.tsx` ou `[component].spec.tsx`
- ❌ `test-[component].tsx`

**Hooks:**
- ✅ camelCase com `use`: `useStore()`, `useSnippets()`
- ❌ PascalCase: `UseStore()`

**Variáveis e funções:**
- ✅ camelCase: `snippetList`, `addSnippet()`
- ❌ PascalCase: `SnippetList`, `AddSnippet()`

**Constantes:**
- ✅ UPPER_SNAKE_CASE: `DEFAULT_SNIPPETS`, `MAX_LENGTH`
- ❌ camelCase: `defaultSnippets`

### Imports

**Ordem:**
```tsx
// 1. React e bibliotecas externas
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// 2. Componentes internos
import SnippetEditor from './SnippetEditor';

// 3. Store e hooks
import { useStore } from '../store';

// 4. Types
import { Snippet } from '../store/types';

// 5. Utils
import { cn } from '@/lib/utils';
```

### TypeScript

**Regras:**
- ✅ Sempre tipar props de componentes
- ✅ Sempre tipar retorno de funções
- ✅ Usar interfaces para objetos complexos
- ✅ Usar type aliases para unions
- ❌ Nunca usar `any` (usar `unknown` se necessário)

**Exemplo:**
```tsx
// ✅ Correto
interface SnippetCardProps {
  snippet: Snippet;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SnippetCard({ snippet, onEdit, onDelete }: SnippetCardProps) {
  // ...
}

// ❌ Errado
export function SnippetCard({ snippet, onEdit, onDelete }: any) {
  // ...
}
```

## 🚫 ANTI-PATTERNS (NÃO FAÇA)

### 1. Componentes Gigantes
```tsx
// ❌ ERRADO: Componente com 500+ linhas
export function MassiveComponent() {
  // 500 linhas de código...
}

// ✅ CORRETO: Dividir em componentes menores
export function SnippetsView() {
  return (
    <div>
      <SearchBar />
      <SnippetList />
      <Pagination />
    </div>
  );
}
```

### 2. Lógica de Negócio em Componentes
```tsx
// ❌ ERRADO: Lógica complexa no componente
export function SnippetCard({ snippet }) {
  const calculateComplexStuff = () => {
    // 50 linhas de lógica de negócio...
  };
  
  return <div>{calculateComplexStuff()}</div>;
}

// ✅ CORRETO: Mover para store ou utilitário
export function SnippetCard({ snippet }) {
  const { calculateComplexStuff } = useStore();
  return <div>{calculateComplexStuff(snippet)}</div>;
}
```

### 3. Acesso Direto ao IndexedDB
```tsx
// ❌ ERRADO: Acessar IndexedDB diretamente no componente
export function SnippetsView() {
  useEffect(() => {
    const db = await openDB('quickfill', 1);
    const snippets = await db.getAll('snippets');
    setSnippets(snippets);
  }, []);
}

// ✅ CORRETO: Usar o store
export function SnippetsView() {
  const { snippets } = useStore();
  // snippets já está carregado e sincronizado
}
```

### 4. Estado Global Desnecessário
```tsx
// ❌ ERRADO: Estado global para algo local
function StoreProvider() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // isModalOpen não precisa ser global!
}

// ✅ CORRETO: Estado local
export function SnippetEditor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado local é suficiente
}
```

### 5. Props Drilling
```tsx
// ❌ ERRADO: Passar props por 5 níveis
<Layout>
  <Main>
    <Content>
      <SnippetList>
        <SnippetCard snippet={snippet} onDelete={onDelete} />
      </SnippetList>
    </Content>
  </Main>
</Layout>

// ✅ CORRETO: Usar Context ou composition
export function SnippetCard() {
  const { snippet, onDelete } = useStore();
  // Acessa diretamente do store
}
```

## ✅ CHECKLIST ANTES DE COMMITAR

Antes de commitar qualquer mudança, confirme:

- [ ] Código segue os padrões de nomenclatura
- [ ] Componentes são tipados corretamente
- [ ] Não há `any` no código
- [ ] Testes unitários passam (`npm run test`)
- [ ] Testes E2E passam (`npm run test:e2e`)
- [ ] Build funciona (`npm run build`)
- [ ] Não há erros de TypeScript
- [ ] Não há warnings no console
- [ ] Código está formatado corretamente
- [ ] Commit message segue conventional commits

---

**Autor:** Marcelino Sandroni  
**Versão:** 1.0.0  
**Última atualização:** 2026-01-15
