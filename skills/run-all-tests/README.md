# 🧪 Run All Tests Skill

Executa todos os testes (unitários e E2E) em sequência.

## Uso

```bash
./SKILLS/run-all-tests/run-all-tests.sh
```

## O que faz

1. Executa testes unitários com Vitest
2. Gera relatório de cobertura
3. Executa testes E2E com Playwright
4. Mostra resumo final

## Quando usar

- Antes de commitar código
- Antes de fazer deploy
- Para verificar se tudo está funcionando
- Após fazer mudanças significativas

## Opções

```bash
# Executar todos os testes (padrão)
./SKILLS/run-all-tests/run-all-tests.sh

# Apenas testes unitários
./SKILLS/run-all-tests/run-all-tests.sh --unit

# Apenas testes E2E
./SKILLS/run-all-tests/run-all-tests.sh --e2e

# Com cobertura detalhada
./SKILLS/run-all-tests/run-all-tests.sh --coverage
```

## Exemplo de Output

```
🧪 Running all tests...

📦 Step 1/3: Unit Tests
✓ 60 tests passed
✓ Coverage: 95%

🎭 Step 2/3: E2E Tests
✓ 50 tests passed
✓ All flows working

📊 Step 3/3: Summary
✅ All tests passed!
   - Unit: 60/60
   - E2E: 50/50
   - Coverage: 95%
```

## Requisitos

- Node.js instalado
- Dependências instaladas (`npm install`)
- Playwright browsers instalados (`npx playwright install`)

---

**Autor:** Marcelino Sandroni  
**Versão:** 1.0.0
