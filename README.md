# 🤖 QuickFill - Smart Text Expansion

> **Type less, say more.** Aplicação web de expansão de texto que substitui automaticamente abreviações por textos completos.

---

## 🛑 ATENÇÃO AGENTE DE IA (CRÍTICO)

Você está operando em um ambiente de **Desenvolvimento Guiado por Especificações (SDD)**.

**NÃO** inicie nenhuma análise de código, **NÃO** crie arquivos e **NÃO** sugira implementações antes de ler OBRIGATORIAMENTE o arquivo `AGENTS.md` na raiz deste projeto.

O `AGENTS.md` contém suas **LEIS ABSOLUTAS** e o fluxo de trabalho exato que você deve seguir. **Leia-o agora.**

---

## 🗺️ Mapa do Cérebro (Documentação)

A arquitetura é estrita e desenhada para hiperfoco e isolamento de contexto. Leia antes de codar:

- 🧠 **O que é este app e stack:** [APP.md](./APP.md)
- 📦 **Detalhes do Produto:** [docs/PRODUCT.md](./docs/PRODUCT.md)
- 🎯 **O que estamos fazendo AGORA (Foco):** [specs/PLAN.md](./specs/PLAN.md)
- 🏗️ **Arquitetura Global:** [ARCHITECTURE.md](./ARCHITECTURE.md)
- 💅 **Regras do Frontend (React):** [REACT.md](./REACT.md)
- 📥 **Ideias Soltas e Débito Técnico:** [specs/BACKLOG.md](./specs/BACKLOG.md)
- 🗺️ **Visão Macro:** [specs/ROADMAP.md](./specs/ROADMAP.md)
- 📝 **Histórico de Mudanças:** [docs/CHANGELOG.md](./docs/CHANGELOG.md)
- 🤖 **Leis do Agente:** [AGENTS.md](./AGENTS.md)

---

## 🚀 QuickFill

QuickFill é uma aplicação web que permite criar atalhos de texto personalizados que expandem automaticamente quando digitados, economizando tempo em formulários e textos repetitivos.

### Exemplo
Digite `mnm` + espaço → Expande para `Marcelino Sandroni`  
Digite `myemail` + espaço → Expande para `marcelino.sandroni@gmail.com`

### Features
- ✅ CRUD completo de snippets
- ✅ Sistema de categorias
- ✅ Busca e filtros
- ✅ Demo de expansão em tempo real
- ✅ Import/Export (JSON/CSV)
- ✅ Configurações avançadas
- ✅ Persistência local (IndexedDB)
- ✅ Tema preto minimalista

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

## 📂 Estrutura do Projeto

```text
quickfill/
├── 🤖 AGENTS.md              # Leis do agente (LEIA PRIMEIRO!)
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
│   ├── tasks/                # Tarefas individuais
│   └── history/              # Histórico de fases
│
├── SKILLS/                   # Automações e scripts
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
└── package.json
```

---

## 🎯 Fluxo de Trabalho (SDD)

### Para Agentes de IA

1. **Leia AGENTS.md** — Entenda suas leis absolutas
2. **Leia docs/PRODUCT.md e APP.md** — Entenda o produto
3. **Leia REACT.md** — Entenda as regras de código
4. **Leia specs/PLAN.md** — Descubra sua tarefa atual
5. **Execute a tarefa** — Siga o ciclo: Refinar → Implementar → Testar → Concluir
6. **Atualize docs/CHANGELOG.md** — Registre suas mudanças
7. **NÃO avance** — Encerre após concluir a tarefa atual

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

## 📝 Versionamento

Este projeto segue **Semantic Versioning (SemVer)** com **Gitflow**.

### Padrão de Commit
```
[tipo](escopo): descrição curta. (Agent: [Ferramenta] - [Modelo])
```

**Exemplo:**
```
feat(snippets): implementa CRUD de snippets (Agent: Claude - 3.5-Sonnet)
```

### Tipos
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

---

## 👨‍💻 Autor

**Marcelino Sandroni**  
📧 marcelino.sandroni@gmail.com  
🔗 [GitHub](https://github.com/marcelinosandroni)

---

## 📄 Licença

Proprietária - Todos os direitos reservados

---

**Versão:** 1.0.0  
**Última atualização:** 2026-01-15  
**Status:** ✅ MVP Completo
