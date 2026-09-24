# 🤖 AGENTS.md - Regras de Funcionamento do Agente

Você é um agente autônomo operando sob um fluxo engavetado rigoroso. Sua memória falha em contextos longos, portanto, você não deve tomar decisões baseadas em conversas passadas. Sua única fonte da verdade são os arquivos de especificação.

## 📋 1. Mapeamento de Contexto (Ordem de Leitura)

Sempre que você for acionado, leia os seguintes arquivos nesta exata ordem antes de codificar:

1. **APP.md**: Para entender a regra de negócio do produto QuickFill.
2. **REACT.md**: Para entender as regras de arquitetura do Frontend.
3. **specs/PLAN.md**: Para descobrir o status atual, a Fase em andamento e qual é a sua ÚNICA próxima tarefa pendente.

## 🔄 2. O Fluxo de Entrega (TDD e Gated Workflow)

Ao encontrar a sua tarefa pendente (ex: specs/tasks/task-1.1.md), você deve executar o seguinte ciclo para ELA APENAS:

### Refinar
Leia o arquivo da tarefa. Certifique-se de que tem todas as informações.

### Implementar
Escreva o código estritamente necessário. Não altere mais de 5 arquivos. Respeite o Princípio da Anti-Abstração (não crie dezenas de micro-arquivos inúteis).

### Testar
Execute a validação (testes unitários com Vitest, testes E2E com Playwright, tipagem TypeScript).

### Loop de Falha
Se o teste falhar ou houver erro de compilação, você está **PROIBIDO** de avançar. Volte para "Implementar", corrija o erro e teste novamente até que o resultado seja 100% verde.

### Concluir
Apenas quando o teste passar e os critérios de aceite forem cumpridos:
- Marque a tarefa atual com `[x]` no specs/PLAN.md
- Atualize o status para "CONCLUÍDO"
- **ENCERRE** a sua resposta
- **NÃO** inicie a próxima tarefa

## 🗂️ 3. Limpeza de Memória (Arquivamento de Fase)

Quando todas as tarefas de uma Fase no PLAN.md possuírem um `[x]`:

1. Resuma o que foi feito no arquivo `specs/history/phases/phase-[numero]-finished.md`
2. Delete todas tarefas dessa fase em `specs/tasks/`
3. Esse processo deve entrar em um único commit, algo como:
   ```
   docs(phase-x): finished phase x documentation
   ```
4. Limpe as tarefas concluídas do PLAN.md para manter seu contexto de leitura curto e limpo

## 🎯 4. Princípios Fundamentais

### Princípio da Anti-Abstração
- Não crie abstrações prematuras
- Não crie dezenas de micro-arquivos inúteis
- Prefira código simples e direto
- Abstraia apenas quando houver 3+ casos de uso claros

### Princípio do Foco Único
- Trabalhe em UMA tarefa por vez
- Não pule etapas
- Não comece a tarefa 2 sem terminar a tarefa 1
- Teste e commite antes de avançar

### Princípio da Verdade Única
- Os arquivos de especificação são sua única fonte da verdade
- Não tome decisões baseadas em conversas passadas
- Sempre releia os arquivos relevantes antes de codificar

## 📝 5. Padrões de Commit

Use conventional commits:
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `test:` - Testes
- `refactor:` - Refatoração
- `chore:` - Tarefas de manutenção

Exemplo: `feat(snippets): add snippet creation modal`

## 🚫 6. O que NÃO Fazer

- ❌ Não inicie análise de código sem ler AGENTS.md
- ❌ Não crie arquivos sem ler as especificações
- ❌ Não sugira implementações sem entender o contexto
- ❌ Não pule testes
- ❌ Não avance para próxima tarefa sem concluir a atual
- ❌ Não edite arquivos acima do traço em BACKLOG.md e ROADMAP.md

## ✅ 7. Checklist Antes de Codificar

Antes de escrever qualquer código, confirme:
- [ ] Li o APP.md
- [ ] Li o REACT.md
- [ ] Li o specs/PLAN.md
- [ ] Identifiquei minha tarefa atual
- [ ] Li o arquivo da tarefa em specs/tasks/
- [ ] Entendi os critérios de aceite
- [ ] Sei quais testes preciso criar/atualizar

---

**Autor:** Marcelino Sandroni  
**Versão:** 1.0.0  
**Última atualização:** 2026-01-15
