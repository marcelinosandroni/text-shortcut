# 🔄 Rewrite Commits Skill

Conjunto de scripts para gerenciar e reescrever commits com as credenciais corretas do autor.

## 📦 Scripts Disponíveis

### 1. `rewrite-commits.sh` - Script Principal
Reescreve o histórico de commits de forma completa e segura.

### 2. `check-commits.sh` - Verificação
Verifica se há commits com autores diferentes do configurado.

### 3. `quick-rewrite.sh` - Reescrita Rápida
Reescreve rapidamente os últimos N commits (caso de uso comum).

### 4. `configure-git.sh` - Configuração
Configura as credenciais do git local/globalmente.

## 🎯 Quando Usar

- Quando commits foram feitos com nome/email errado (ex: Qwen, Claude, etc)
- Antes de fazer push para origin
- Para padronizar histórico com as credenciais do AGENTS.md
- Para verificar se todos os commits estão corretos

## 📋 Requisitos

- Git instalado
- Repositório local
- Permissão para reescrever histórico (não use em branches compartilhadas!)

## 🚀 Uso Rápido

### Fluxo Completo Recomendado

```bash
# 1. Verificar se há commits com autores errados
./SKILLS/rewrite-commits/check-commits.sh

# 2. Configurar git para futuros commits
./SKILLS/rewrite-commits/configure-git.sh

# 3. Reescrever commits (escolha uma opção):

# Opção A: Reescrever últimos 5 commits (mais comum)
./SKILLS/rewrite-commits/quick-rewrite.sh 5

# Opção B: Reescrever commits de um autor específico
./SKILLS/rewrite-commits/rewrite-commits.sh --author "Qwen"

# Opção C: Reescrever todos os commits
./SKILLS/rewrite-commits/rewrite-commits.sh --all

# 4. Fazer push seguro
git push --force-with-lease
```

## 📖 Documentação Detalhada

### Script Principal: `rewrite-commits.sh`

#### Uso Básico (usa credenciais do AGENTS.md)
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh
```

#### Uso com Variáveis de Ambiente
```bash
GIT_USERNAME="Seu Nome" GIT_USERMAIL="seu@email.com" ./SKILLS/rewrite-commits/rewrite-commits.sh
```

#### Dry Run (apenas mostra o que seria feito)
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --dry-run
```

#### Reescrever Apenas Commits Específicos
```bash
# Reescrever apenas commits do autor "Qwen"
./SKILLS/rewrite-commits/rewrite-commits.sh --author "Qwen"

# Reescrever apenas commits do autor "Claude"
./SKILLS/rewrite-commits/rewrite-commits.sh --author "Claude"
```

#### Reescrever Todos os Commits
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --all
```

### Script de Verificação: `check-commits.sh`

Verifica se há commits com autores diferentes do configurado.

```bash
# Verificar últimos 20 commits (padrão)
./SKILLS/rewrite-commits/check-commits.sh

# Verificar últimos 50 commits
./SKILLS/rewrite-commits/check-commits.sh --last 50

# Verificar todos os commits
./SKILLS/rewrite-commits/check-commits.sh --all
```

### Script de Reescrita Rápida: `quick-rewrite.sh`

Reescreve rapidamente os últimos N commits (caso de uso mais comum).

```bash
# Reescrever últimos 5 commits (padrão)
./SKILLS/rewrite-commits/quick-rewrite.sh

# Reescrever últimos 10 commits
./SKILLS/rewrite-commits/quick-rewrite.sh 10

# Reescrever últimos 20 commits
./SKILLS/rewrite-commits/quick-rewrite.sh 20
```

### Script de Configuração: `configure-git.sh`

Configura as credenciais do git para futuros commits.

```bash
# Configurar localmente (repositório atual)
./SKILLS/rewrite-commits/configure-git.sh

# Configurar globalmente (todos os repositórios)
./SKILLS/rewrite-commits/configure-git.sh --global

# Usar variáveis de ambiente
GIT_USERNAME="Seu Nome" GIT_USERMAIL="seu@email.com" ./SKILLS/rewrite-commits/configure-git.sh
```

## 📝 Variáveis de Ambiente

| Variável | Descrição | Padrão (AGENTS.md) |
|----------|-----------|-------------------|
| `GIT_USERNAME` | Nome do autor | Marcelino Sandroni |
| `GIT_USERMAIL` | Email do autor | marcelino.sandroni@gmail.com |
| `GIT_ORIGIN` | URL do repositório remoto | (não alterado) |

## ⚠️ Avisos Importantes

### ⚠️ NÃO USE EM:
- ❌ Branches compartilhadas (main, master, develop)
- ❌ Repositórios com outros colaboradores
- ❌ Após fazer push para origin
- ❌ Histórico já publicado

### ✅ USE APENAS EM:
- ✅ Branches locais de desenvolvimento
- ✅ Antes do primeiro push
- ✅ Repositórios pessoais
- ✅ Features branches locais

## 🔄 O Que o Script Faz

1. **Verifica** se há commits para reescrever
2. **Mostra preview** dos commits afetados
3. **Pede confirmação** antes de aplicar
4. **Reescreve** autor e committer
5. **Atualiza** referências (branches, tags)
6. **Mostra** resultado final

## 📊 Exemplo de Output

```
🔄 Rewrite Commits Script
=========================

📋 Credenciais:
   Nome:  Marcelino Sandroni
   Email: marcelino.sandroni@gmail.com

🔍 Buscando commits para reescrever...

📝 Commits encontrados: 5

  1. abc1234 feat: add new feature (Qwen)
  2. def5678 fix: bug fix (Qwen)
  3. ghi9012 docs: update readme (Claude)
  4. jkl3456 refactor: code cleanup (Qwen)
  5. mno7890 test: add tests (Claude)

⚠️  ATENÇÃO: Esta ação vai reescrever o histórico!

Deseja continuar? (yes/no): yes

✅ Commits reescritos com sucesso!

📊 Resultado:
   - Commits reescritos: 5
   - Branch atual: feature/new-feature
   - Pronto para push: git push --force-with-lease
```

## 🛡️ Segurança

### Backup Automático
O script cria um backup antes de reescrever:
```bash
git branch backup-before-rewrite-$(date +%Y%m%d-%H%M%S)
```

### Reverter Mudanças
Se algo der errado, você pode reverter:
```bash
# Ver branches de backup
git branch | grep backup-before-rewrite

# Voltar para o backup
git checkout backup-before-rewrite-20260115-143022

# Resetar branch atual
git reset --hard backup-before-rewrite-20260115-143022
```

## 🔧 Opções Avançadas

### Reescrever Range Específico
```bash
# Reescrever últimos 10 commits
./SKILLS/rewrite-commits/rewrite-commits.sh --last 10

# Reescrever commits desde uma tag
./SKILLS/rewrite-commits/rewrite-commits.sh --since v1.0.0

# Reescrever commits de uma data
./SKILLS/rewrite-commits/rewrite-commits.sh --since "2026-01-01"
```

### Modo Verbose
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --verbose
```

### Sem Confirmação (CI/CD)
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --yes
```

## 📚 Integração com AGENTS.md

Este script segue as regras do AGENTS.md:
- ✅ Usa credenciais: Marcelino Sandroni
- ✅ Email: marcelino.sandroni@gmail.com
- ✅ Padrão de commit: `[tipo](escopo): descrição (Agent: [Ferramenta] - [Modelo])`

## 🎯 Casos de Uso Comuns

### 1. Corrigir Commits do Qwen
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --author "Qwen"
```

### 2. Corrigir Commits do Claude
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --author "Claude"
```

### 3. Corrigir Todos os Commits
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --all
```

### 4. Preparar para Push
```bash
# Reescrever commits
./SKILLS/rewrite-commits/rewrite-commits.sh

# Fazer push seguro
git push --force-with-lease
```

## 🐛 Troubleshooting

### Erro: "fatal: not a git repository"
```bash
cd /caminho/para/repositorio
```

### Erro: "refusing to merge unrelated histories"
```bash
# Use --allow-unrelated-histories
git pull origin main --allow-unrelated-histories
```

### Erro: "cannot rewrite branch with uncommitted changes"
```bash
git stash
./SKILLS/rewrite-commits/rewrite-commits.sh
git stash pop
```

## 📞 Suporte

Se encontrar problemas:
1. Verifique se está em um repositório git
2. Certifique-se de que não há mudanças não commitadas
3. Use `--dry-run` para testar antes
4. Verifique o backup criado

---

**Autor:** Marcelino Sandroni  
**Email:** marcelino.sandroni@gmail.com  
**Versão:** 1.0.0  
**Baseado em:** AGENTS.md
