# 🧹 Cleanup Skill

Limpa cache, node_modules e build para um ambiente limpo.

## Uso

```bash
./SKILLS/cleanup/cleanup.sh
```

## O que faz

- Remove `node_modules/`
- Remove `dist/`
- Remove `.vite/` (cache do Vite)
- Remove `coverage/` (relatórios de teste)
- Remove `test-results/` (resultados do Playwright)
- Remove `playwright-report/`
- Executa `npm install` novamente

## Quando usar

- Antes de fazer deploy
- Quando há problemas de cache
- Para limpar o ambiente de desenvolvimento
- Após mudar branches drasticamente

## Opções

```bash
# Limpeza completa (padrão)
./SKILLS/cleanup/cleanup.sh

# Limpeza leve (mantém node_modules)
./SKILLS/cleanup/cleanup.sh --light
```

## Exemplo de Output

```
🧹 Starting cleanup...
🗑️  Removing node_modules/
🗑️  Removing dist/
🗑️  Removing .vite/
🗑️  Removing coverage/
🗑️  Removing test-results/
🗑️  Removing playwright-report/
📦 Running npm install...
✅ Cleanup complete!
```

---

**Autor:** Marcelino Sandroni  
**Versão:** 1.0.0
