# 🤖 QuickFill - Spec-Driven Development

> **Smart Text Expansion for Windows** — Type less, say more.
> Aplicação web que permite criar atalhos de texto personalizados que expandem automaticamente quando digitados.

---

## 🛑 ATENÇÃO AGENTE DE IA (CRÍTICO)

Você está operando em um ambiente de **Desenvolvimento Guiado por Especificações (SDD)**.

**NÃO** inicie nenhuma análise de código, **NÃO** crie arquivos e **NÃO** sugira implementações antes de ler OBRIGATORIAMENTE o arquivo `AGENTS.md` na raiz deste projeto.

O `AGENTS.md` contém suas leis de funcionamento e o fluxo de trabalho exato que você deve seguir. **Leia-o agora.**

---

## 🗺️ Mapa do Cérebro (Documentação)

A arquitetura é estrita e desenhada para hiperfoco e isolamento de contexto. Leia antes de codar:

| Arquivo | Descrição |
|---------|-----------|
| 🧠 [APP.md](./APP.md) | O que é este app e stack |
| 🎯 [specs/PLAN.md](./specs/PLAN.md) | O que estamos fazendo AGORA (Foco) |
| 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md) | Arquitetura Global |
| 💅 [REACT.md](./REACT.md) | Regras do Frontend (React/Vite) |
| 📥 [specs/BACKLOG.md](./specs/BACKLOG.md) | Ideias Soltas e Débito Técnico |
| 🗺️ [specs/ROADMAP.md](./specs/ROADMAP.md) | Visão Macro |
| 📦 [docs/PRODUCT.md](./docs/PRODUCT.md) | Detalhes do Produto |
| 📝 [docs/CHANGELOG.md](./docs/CHANGELOG.md) | Histórico de Mudanças |
| 🤖 [AGENTS.md](./AGENTS.md) | Regras de Funcionamento do Agente |

---

## 🚀 Como Rodar Local

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev

# 3. Acesse http://localhost:3000
```

### Scripts Disponíveis

```bash
npm run dev            # Servidor de desenvolvimento
npm run build          # Build de produção
npm run preview        # Preview do build
npm run test           # Testes unitários (Vitest)
npm run test:coverage  # Testes com cobertura
npm run test:e2e       # Testes E2E (Playwright)
```

---

## 🛠️ Stack Principal

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** React Context + IndexedDB
- **Testing:** Vitest (unit) + Playwright (E2E)
- **Icons:** Lucide React
- **Design:** Tema preto minimalista

---

## 📂 Estrutura do Projeto

```text
quickfill/
├── 🤖 AGENTS.md              # Regras do agente (LEIA PRIMEIRO!)
├── 🧠 APP.md                 # Descrição do app
├── 🏗️ ARCHITECTURE.md        # Arquitetura global
├── 💅 REACT.md               # Regras do frontend
│
├── docs/                     # Documentação do produto
│   ├── PRODUCT.md            # Detalhes do produto
│   └── CHANGELOG.md          # Histórico de mudanças
│
├── specs/                    # Especificações e tarefas
│   ├── PLAN.md               # Plano de tarefas atual
│   ├── BACKLOG.md            # Backlog de ideias
│   ├── ROADMAP.md            # Visão macro
│   └── tasks/                # Tarefas individuais
│
├── src/                      # Código fonte
│   ├── components/
│   │   ├── ui/              # Componentes shadcn/ui
│   │   └── views/           # Views principais
│   ├── lib/                 # Utilitários
│   ├── store/               # Estado global
│   └── test/                # Testes unitários
│
├── e2e/                     # Testes E2E
├── dist/                    # Build de produção
└── package.json
```

---

## 🎯 Fluxo de Trabalho (SDD)

### Para Agentes de IA

1. **Leia AGENTS.md** — Entenda suas regras
2. **Leia APP.md** — Entenda o produto
3. **Leia REACT.md** — Entenda as regras de código
4. **Leia specs/PLAN.md** — Descubra sua tarefa atual
5. **Execute a tarefa** — Siga o ciclo: Refinar → Implementar → Testar → Concluir
6. **NÃO avance** — Encerre após concluir a tarefa atual

### Para Desenvolvedores

1. Clone o repositório
2. `npm install`
3. `npm run dev`
4. Leia a documentação em `docs/` e `specs/`
5. Siga as regras em `REACT.md` e `ARCHITECTURE.md`

---

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes com cobertura
npm run test:coverage

# Testes E2E
npm run test:e2e
```

### Cobertura Atual
- **Testes Unitários:** 60+ testes
- **Testes E2E:** 50+ testes
- **Target:** 100% de cobertura

---

## 🎨 Design System

### Tema Preto Minimalista
- **Background:** `#000000` (preto puro)
- **Foreground:** `#FAFAFA` (branco suave)
- **Componentes:** shadcn/ui
- **Acessibilidade:** WCAG 2.1 AA

### Componentes Disponíveis
- Button (6 variantes)
- Card (com header, title, description, content, footer)
- Input, Textarea, Label
- Switch (toggle)
- Dialog (modal)
- Select (dropdown)

---

## 📊 Métricas

| Métrica | Valor |
|---------|-------|
| Bundle Size | 395 KB (JS) + 35 KB (CSS) |
| Build Time | < 1 segundo |
| Dependencies | 172 packages |
| Components | 8 shadcn/ui + 5 views |
| Unit Tests | 60+ |
| E2E Tests | 50+ |

---

## 📝 Especificações do Produto

O projeto QuickFill possui 8 documentos de especificação na pasta `docs/`:

1. **PRD** — Product Requirements Document
2. **Functional Requirements** — 17 requisitos funcionais
3. **Non-Functional Requirements** — 42 atributos de qualidade
4. **User Stories** — 18 histórias de usuário
5. **Technical Architecture** — Stack e modelo de dados
6. **Roadmap** — Plano de 12 meses
7. **Interface Design** — Wireframes e design tokens
8. **UI/UX Specification** — Design system completo

---

## 👨‍💻 Autor

[Marcelino Sandroni](https://github.com/marcelinosandroni)

## 📄 Licença

Proprietária - Todos os direitos reservados

---

**Versão:** 1.0.0  
**Última atualização:** 2026-01-15  
**Status:** ✅ MVP Completo
