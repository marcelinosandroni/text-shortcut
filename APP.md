# 🚀 QuickFill

> **Smart Text Expansion for Windows** - Type less, say more.
> Aplicação web que permite criar atalhos de texto personalizados que expandem automaticamente quando digitados, economizando tempo em formulários e textos repetitivos.

## 🎯 O que é o QuickFill?

QuickFill é uma aplicação de expansão de texto que monitora o que você digita e substitui automaticamente abreviações por textos completos. Perfeito para:

- Preencher formulários repetitivos
- Inserir informações pessoais (nome, email, telefone, endereço)
- Usar templates de email
- Digitar códigos ou frases comuns rapidamente

### Exemplo Prático
Digite `mnm` + espaço → Expande para `Marcelino Sandroni`  
Digite `myemail` + espaço → Expande para `marcelino.sandroni@gmail.com`

## 👤 Usuário Final

- **Profissionais ocupados** que preenchem formulários diariamente
- **Desenvolvedores** que digitam códigos repetitivos
- **Qualquer pessoa** que precisa inserir informações pessoais com frequência

## 🏗️ Arquitetura e Regras

Este repositório segue padrões estritos de desenvolvimento. Agentes de IA e devs, LEIAM as regras abaixo antes de tocar em uma linha de código:

- [💅 Regras do Frontend (React/Vite) → REACT.md](./REACT.md)
- [🗺️ Visão Global → ARCHITECTURE.md](./ARCHITECTURE.md)
- [🤖 Regras do Agente → AGENTS.md](./AGENTS.md)

## 🛠️ Stack Principal

### Frontend (UI)
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** React Context + IndexedDB
- **Testing:** Vitest (unit) + Playwright (E2E)
- **Icons:** Lucide React

### Design System
- **Tema:** Preto minimalista (#000000 background)
- **Componentes:** shadcn/ui (Button, Card, Input, Dialog, etc.)
- **Acessibilidade:** WCAG 2.1 AA compliant

### Infraestrutura
- **Deploy:** Vercel / Netlify / GitHub Pages
- **Storage:** IndexedDB (browser-local)
- **Offline:** Funciona 100% offline

---

## 📝 Detalhes Específicos do App

### Features Principais

#### 1. Gerenciamento de Snippets
- Criar, editar e deletar snippets de texto
- Organizar em categorias personalizadas
- Habilitar/desabilitar snippets individualmente
- Busca e filtros avançados

#### 2. Expansão de Texto em Tempo Real
- Monitoramento de digitação no demo
- Expansão automática ao digitar trigger + caractere
- Popup de acesso rápido (Ctrl+Space)
- Histórico de expansões

#### 3. Import/Export
- Exportar snippets em JSON ou CSV
- Importar de arquivos
- Detecção de duplicatas
- Backup e restauração

#### 4. Configurações
- Caracteres de trigger configuráveis (espaço, tab, enter, etc.)
- Sensibilidade a maiúsculas/minúsculas
- Notificações e sons
- Hotkeys globais
- Segurança (proteção de campos de senha)

### Regras Críticas de Negócio

1. **Persistência Local:** Todos os dados são salvos no IndexedDB do navegador
2. **Offline-First:** A aplicação deve funcionar 100% offline
3. **Privacidade:** Nenhum dado é enviado para servidores externos
4. **Performance:** Expansão deve ocorrer em < 50ms
5. **Acessibilidade:** Todos os componentes devem ser acessíveis via teclado

### Integrações Futuras (Backlog)
- Sincronização em nuvem (opcional)
- Export para outros formatos
- Templates avançados com variáveis
- IA para sugestões de snippets

---

## 🎨 Design System

### Cores (Tema Preto)
```css
--background: #000000    /* Preto puro */
--foreground: #FAFAFA    /* Branco suave */
--card: #080808          /* Quase preto */
--primary: #FAFAFA       /* Branco para ações primárias */
--secondary: #1A1A1A     /* Cinza escuro */
--muted: #141414         /* Cinza muito escuro */
--border: #1F1F1F        /* Bordas sutis */
```

### Tipografia
- **Fonte:** Inter (padrão do sistema)
- **Monospace:** JetBrains Mono para código
- **Tamanhos:** Escala de 11px a 30px

### Componentes shadcn/ui
- Button (6 variantes)
- Card (com header, title, description, content, footer)
- Input (com focus states)
- Textarea
- Label
- Switch (toggle)
- Dialog (modal)
- Select (dropdown)

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
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm run test         # Testes unitários (watch mode)
npm run test:coverage # Testes com cobertura
npm run test:e2e     # Testes E2E com Playwright
```

---

## 📊 Métricas

- **Tamanho do Bundle:** ~395 KB (JS) + ~35 KB (CSS)
- **Tempo de Build:** < 1 segundo
- **Testes Unitários:** 60+ testes
- **Testes E2E:** 50+ testes
- **Componentes:** 8 shadcn/ui + 5 views principais

---

## 👨‍💻 Autor

[Marcelino Sandroni](https://github.com/marcelinosandroni)

## 📄 Licença

Proprietária - Todos os direitos reservados

---

**Versão:** 1.0.0  
**Última atualização:** 2026-01-15
