# 🚀 Como Corrigir Todos os Commits

## ⚡ Método Rápido (Recomendado)

### Execute o script automático:
```bash
chmod +x fix-all-commits.sh
./fix-all-commits.sh
```

Este script vai:
1. ✅ Tornar todos os scripts executáveis
2. ✅ Verificar commits com autores errados
3. ✅ Configurar git com credenciais corretas
4. ✅ Reescrever TODOS os commits
5. ✅ Mostrar resultado final

---

## 📋 Método Manual (Passo a Passo)

Se preferir executar cada passo manualmente:

### 1. Tornar scripts executáveis
```bash
chmod +x SKILLS/rewrite-commits/*.sh
```

### 2. Verificar commits problemáticos
```bash
./SKILLS/rewrite-commits/check-commits.sh --all
```

### 3. Configurar git
```bash
./SKILLS/rewrite-commits/configure-git.sh
```

### 4. Reescrever todos os commits
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --all
```

### 5. Fazer push
```bash
git push --force-with-lease
```

---

## 🎯 Opções Específicas

### Corrigir apenas commits do Qwen
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --author "Qwen"
```

### Corrigir apenas commits do Claude
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --author "Claude"
```

### Corrigir últimos 20 commits
```bash
./SKILLS/rewrite-commits/quick-rewrite.sh 20
```

### Testar antes de aplicar (dry run)
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --all --dry-run
```

---

## 🔍 Verificar Resultado

Após executar, verifique os commits:
```bash
git log --oneline -20
```

Todos os commits devem mostrar:
- **Autor:** Marcelino Sandroni
- **Email:** marcelino.sandroni@gmail.com

---

## 🔄 Reverter (Se Necessário)

Se algo der errado:
```bash
# Ver branches de backup
git branch | grep backup

# Reverter para o backup
git reset --hard backup-before-rewrite-XXXXXXXX
```

---

## ⚠️ Avisos Importantes

### ✅ USE EM:
- Branches locais de desenvolvimento
- Antes do primeiro push
- Repositórios pessoais

### ❌ NÃO USE EM:
- Branches compartilhadas (main, master, develop)
- Repositórios com outros colaboradores
- Após fazer push para origin

---

## 📞 Documentação Completa

- **Guia Rápido:** `SKILLS/rewrite-commits/QUICK-START.md`
- **Documentação:** `SKILLS/rewrite-commits/README.md`
- **Resumo:** `SKILLS/rewrite-commits/SUMMARY.md`

---

**Autor:** Marcelino Sandroni  
**Email:** marcelino.sandroni@gmail.com  
**Data:** 2026-01-15
