# 📝 Commit Message

Copie e cole esta mensagem ao fazer o commit:

```
docs(sdd): atualiza estrutura SDD com novas regras e skills (Agent: Claude - 3.5-Sonnet)

- Atualiza AGENTS.md para v2.0.0 com 6 seções e novas regras
- Adiciona aviso crítico no README.md para ler AGENTS.md
- Cria sistema SKILLS/ com automações (cleanup, run-all-tests)
- Define padrão de commit com identidade (Marcelino Sandroni)
- Estabelece regras de permissão para documentação
- Adiciona fluxo de limpeza de fase com tag SemVer

Baseado em: sdd-ai-stack commit 5c2e5b0
```

---

## 📋 Arquivos Modificados

### Atualizados
- `AGENTS.md` - Leis absolutas do agente (v2.0.0)
- `README.md` - Aviso crítico e fluxo atualizado

### Criados
- `SKILLS/README.md` - Documentação do sistema de skills
- `SKILLS/cleanup/README.md` - Doc da skill de cleanup
- `SKILLS/cleanup/cleanup.sh` - Script de limpeza
- `SKILLS/run-all-tests/README.md` - Doc da skill de testes
- `SKILLS/run-all-tests/run-all-tests.sh` - Script de testes
- `UPDATE-SUMMARY.md` - Resumo das mudanças
- `COMMIT-MESSAGE.md` - Este arquivo

---

## 🎯 Checklist Antes do Commit

- [ ] Li o AGENTS.md atualizado
- [ ] Testei as skills (cleanup e run-all-tests)
- [ ] Build funciona (`npm run build`)
- [ ] README.md tem o aviso crítico
- [ ] SKILLS/ está documentado
- [ ] Mensagem de commit segue o padrão

---

## 🚀 Comando de Commit

```bash
git add .
git commit -m "docs(sdd): atualiza estrutura SDD com novas regras e skills (Agent: Claude - 3.5-Sonnet)"
```

---

**Autor:** Marcelino Sandroni  
**Email:** marcelino.sandroni@gmail.com
