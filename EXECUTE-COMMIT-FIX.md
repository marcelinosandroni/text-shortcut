# 🚀 Guia de Execução: Corrigir Commits

## ⚡ Fluxo Completo (Copie e Cole)

### Passo 1: Tornar scripts executáveis
```bash
chmod +x SKILLS/rewrite-commits/*.sh
```

### Passo 2: Verificar commits com autores errados
```bash
./SKILLS/rewrite-commits/check-commits.sh --all
```

### Passo 3: Configurar git com credenciais corretas
```bash
./SKILLS/rewrite-commits/configure-git.sh
```

### Passo 4: Reescrever TODOS os commits
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --all
```

### Passo 5: Fazer push seguro
```bash
git push --force-with-lease
```

---

## 🎯 Opções Alternativas

### Se quiser reescrever apenas commits específicos:

#### Corrigir commits do Qwen
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --author "Qwen"
```

#### Corrigir commits do Claude
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --author "Claude"
```

#### Corrigir últimos 20 commits
```bash
./SKILLS/rewrite-commits/quick-rewrite.sh 20
```

---

## 🔍 Modo Dry Run (Testar Antes)

Se quiser ver o que seria feito sem aplicar:
```bash
./SKILLS/rewrite-commits/rewrite-commits.sh --all --dry-run
```

---

## 🔄 Reverter (Se Algo Der Errado)

Se precisar voltar atrás:
```bash
# Ver branches de backup
git branch | grep backup

# Reverter para o backup mais recente
git reset --hard backup-before-rewrite-$(date +%Y%m%d)
```

---

## 📋 Checklist

- [ ] Executar `chmod +x SKILLS/rewrite-commits/*.sh`
- [ ] Executar `check-commits.sh --all` para ver commits problemáticos
- [ ] Executar `configure-git.sh` para configurar credenciais
- [ ] Executar `rewrite-commits.sh --all` para corrigir todos
- [ ] Verificar resultado com `git log --oneline -20`
- [ ] Fazer push com `git push --force-with-lease`

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

## 🎯 Comando Único (Tudo de Uma Vez)

Se quiser fazer tudo de uma vez (não recomendado para primeira vez):
```bash
chmod +x SKILLS/rewrite-commits/*.sh && \
./SKILLS/rewrite-commits/configure-git.sh && \
./SKILLS/rewrite-commits/rewrite-commits.sh --all && \
git push --force-with-lease
```

---

## 📞 Precisa de Ajuda?

Leia a documentação completa:
- `SKILLS/rewrite-commits/README.md` - Documentação completa
- `SKILLS/rewrite-commits/QUICK-START.md` - Guia rápido

---

**Autor:** Marcelino Sandroni  
**Email:** marcelino.sandroni@gmail.com  
**Data:** 2026-01-15
