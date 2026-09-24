# 🛠️ SKILLS - Automações Inteligentes

> Pasta dedicada para scripts e automações que otimizam o fluxo de trabalho do agente IA.

---

## 📖 O que são Skills?

Skills são scripts Bash ou Node.js que automatizam tarefas repetitivas, geram boilerplate, limpam cache, ou executam pipelines. O objetivo é que o agente IA possa descobrir e executar essas automações via terminal sempre que precisar.

---

## 📂 Estrutura

```
SKILLS/
├── README.md              # Este arquivo
├── create-component/      # Exemplo: Criar componente React
│   ├── README.md
│   └── create-component.sh
├── run-tests/             # Exemplo: Executar testes
│   ├── README.md
│   └── run-tests.sh
└── cleanup/               # Exemplo: Limpar cache e build
    ├── README.md
    └── cleanup.sh
```

---

## 🎯 Como Criar uma Skill

1. **Crie uma pasta** com o nome da skill (kebab-case)
2. **Adicione um README.md** explicando o que a skill faz
3. **Crie o script** (Bash ou Node.js)
4. **Teste** o script manualmente
5. **Documente** como executar

---

## 📝 Exemplo de Skill

### create-component/README.md
```markdown
# Create Component Skill

Cria um novo componente React com estrutura padrão.

## Uso
```bash
./SKILLS/create-component/create-component.sh Button
```

## O que faz
- Cria arquivo `Button.tsx` em `src/components/ui/`
- Cria arquivo de teste `Button.test.tsx`
- Adiciona export em `src/components/ui/index.ts`
```

### create-component/create-component.sh
```bash
#!/bin/bash
COMPONENT_NAME=$1

if [ -z "$COMPONENT_NAME" ]; then
  echo "❌ Usage: ./create-component.sh <ComponentName>"
  exit 1
fi

# Cria o componente
cat > src/components/ui/${COMPONENT_NAME}.tsx << EOF
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ${COMPONENT_NAME}Props extends React.HTMLAttributes<HTMLDivElement> {}

const ${COMPONENT_NAME} = React.forwardRef<HTMLDivElement, ${COMPONENT_NAME}Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("", className)}
        {...props}
      />
    )
  }
)
${COMPONENT_NAME}.displayName = "${COMPONENT_NAME}"

export { ${COMPONENT_NAME} }
EOF

echo "✅ Component ${COMPONENT_NAME} created successfully!"
```

---

## 🚀 Skills Planejadas

### Para QuickFill
- [ ] **create-snippet-view** - Criar nova view de snippet
- [ ] **run-all-tests** - Executar todos os testes (unit + e2e)
- [ ] **generate-mock-data** - Gerar dados mock para testes
- [ ] **check-accessibility** - Verificar acessibilidade WCAG
- [ ] **build-and-deploy** - Build e deploy automático
- [ ] **update-changelog** - Atualizar CHANGELOG.md automaticamente

---

## 📋 Convenções

### Nomenclatura
- Use **kebab-case** para nomes de pastas
- Use **camelCase** para nomes de funções
- Use **UPPER_SNAKE_CASE** para constantes

### Scripts Bash
- Sempre comece com `#!/bin/bash`
- Adicione tratamento de erros
- Use `set -e` para falhar em erros
- Documente usage no início

### Scripts Node.js
- Use TypeScript quando possível
- Adicione tipos explícitos
- Use `console.log` para output
- Trate erros adequadamente

---

## 🎯 Como o Agente IA Usa Skills

1. **Identifica padrão** - O agente percebe que está repetindo uma tarefa
2. **Cria skill** - Cria um script para automatizar
3. **Documenta** - Adiciona README explicando o uso
4. **Executa** - Usa a skill via terminal quando necessário
5. **Melhora** - Refina a skill baseado no uso

---

## 📚 Catálogo de Skills

### Disponíveis
_(Nenhuma skill criada ainda - comece a criar!)_

### Em Desenvolvimento
_(Adicione skills aqui enquanto desenvolve)_

### Planejadas
- create-snippet-view
- run-all-tests
- generate-mock-data
- check-accessibility
- build-and-deploy
- update-changelog

---

**Versão:** 1.0.0  
**Última atualização:** 2026-01-15  
**Mantenedor:** Marcelino Sandroni
