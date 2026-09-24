# 🚀 Guia Rápido: Rewrite Commits

## ⚡ Fluxo Mais Comum (3 passos)

### 1️⃣ Verificar se há commits com autores errados
```bash
./SKILLS/rewrite-commits/check-commits.sh
```

### 2️⃣ Configurar git para futuros commits
```bash
./SKILLS/rewrite-commits/configure-git.sh
```

### 3️⃣ Reescrever commits recentes
```bash
# Opção A: Reescrever últimos 5 commits (mais comum)
./SKILLS/rewrite-commits/quick-rewrite.sh

# Opção B: Reescrever últimos 10 commits
./SKILLS/rewrite-commits/quick-rewrite.sh 10

# Opção C: Reescrever commits de um autor específico
./SKILLS/rewrite-commits/rewrite-commits.sh --author "Qwen"
```

### 4️⃣ Fazer push seguro
```bash
git push --force-with-lease
```

---

## 🎯 Casos de Uso Específicos

### Caso 1: Corrigir commits do Qwen
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --author "Qwen"
```

### Caso 2: Corrigir commits do Claude
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --author "Claude"
```

### Caso 3: Corrigir todos os commits
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --all
```

### Caso 4: Apenas verificar (sem alterar)
```bash
./SKILLS/rewrite-commits/check-commits.sh --all
```

### Caso 5: Testar antes de aplicar (dry run)
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --author "Qwen" --dry-run
```

---

## 🔧 Usando Variáveis de Ambiente

### Usar credenciais personalizadas
```bash
GIT_USERNAME="Seu Nome" \
GIT_USERMAIL="seu@email.com" \
./SKILLS/rewrite-commits/quick-rewrite.sh 5
```

### Configurar git com credenciais personalizadas
```bash
GIT_USERNAME="Seu Nome" \
GIT_USERMAIL="seu@email.com" \
./SKILLS/rewrite-commits/configure-git.sh --global
```

---

## ⚠️ Avisos Importantes

### ✅ USE EM:
- Branches locais de desenvolvimento
- Antes do primeiro push
- Repositórios pessoais
- Features branches locais

### ❌ NÃO USE EM:
- Branches compartilhadas (main, master, develop)
- Repositórios com outros colaboradores
- Após fazer push para origin
- Histórico já publicado

---

## 🔄 Reverter Mudanças

Se algo der errado, você pode reverter:

```bash
# Ver branches de backup
git branch | grep backup

# Voltar para o backup mais recente
git reset --hard backup-quick-rewrite-20260115-143022
```

---

## 📊 Resumo dos Scripts

| Script | Uso | Quando usar |
|--------|-----|-------------|
| `check-commits.sh` | Verificar | Antes de reescrever |
| `configure-git.sh` | Configurar | Para futuros commits |
| `quick-rewrite.sh` | Reescrever rápido | Últimos N commits |
| `rewrite-commits.sh` | Reescrever completo | Casos complexos |

---

## 🎓 Exemplos Práticos

### Exemplo 1: Fluxo completo
```bash
# 1. Verificar
./SKILLS/rewrite-commits/check-commits.sh

# 2. Configurar
./SKILLS/rewrite-commits/configure-git.sh

# 3. Reescrever
./SKILLS/rewrite-commits/quick-rewrite.sh 5

# 4. Push
git push --force-with-lease
```

### Exemplo 2: Corrigir apenas commits do Qwen
```bash
# Verificar
./SKILLS/rewrite-commits/check-commits.sh

# Reescrever apenas do Qwen
./SKILLS/rewrite-commits/rewrite-commits.sh --author "Qwen"

# Push
git push --force-with-lease
```

### Exemplo 3: Preparar para PR
```bash
# Verificar últimos 20 commits
./SKILLS/rewrite-commits/check-commits.sh --last 20

# Reescrever últimos 20 commits
./SKILLS/rewrite-commits/quick-rewrite.sh 20

# Verificar resultado
git log --oneline -20

# Push para PR
git push --force-with-lease origin feature/minha-feature
```

---

## 🆘 Ajuda

Para ver ajuda de cada script:
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --help
./SKILLS/rewrite-commits/check-commits.sh --help
./SKILLS/rewrite-commits/quick-rewrite.sh
./SKILLS/rewrite-commits/configure-git.sh --help
```

---

**Dúvidas?** Leia a documentação completa em `SKILLS/rewrite-commits/README.md`
