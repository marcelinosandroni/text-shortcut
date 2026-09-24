#!/bin/bash

# ============================================================================
# ⚡ QUICK REWRITE SCRIPT
# ============================================================================
# Reescreve rapidamente os últimos N commits
# Caso de uso comum: corrigir commits recentes antes do push
#
# Autor: Marcelino Sandroni
# Email: marcelino.sandroni@gmail.com
# Versão: 1.0.0
# ============================================================================

set -e

# ============================================================================
# 📋 CONFIGURAÇÃO PADRÃO (do AGENTS.md)
# ============================================================================
DEFAULT_USERNAME="Marcelino Sandroni"
DEFAULT_EMAIL="marcelino.sandroni@gmail.com"

GIT_USERNAME="${GIT_USERNAME:-$DEFAULT_USERNAME}"
GIT_USERMAIL="${GIT_USERMAIL:-$DEFAULT_EMAIL}"

# ============================================================================
# 🎨 CORES
# ============================================================================
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# ============================================================================
# 📝 FUNÇÕES
# ============================================================================

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# ============================================================================
# 🔍 VERIFICAR REPOSITÓRIO
# ============================================================================

if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Não está em um repositório git!"
    exit 1
fi

# ============================================================================
# 🎯 PARSE DE ARGUMENTOS
# ============================================================================

LAST_N="5"  # Padrão: últimos 5 commits

if [ $# -eq 0 ]; then
    echo "Uso: $0 [número de commits]"
    echo ""
    echo "Exemplos:"
    echo "  $0        # Reescreve últimos 5 commits"
    echo "  $0 10     # Reescreve últimos 10 commits"
    echo "  $0 20     # Reescreve últimos 20 commits"
    echo ""
    echo "Variáveis de Ambiente:"
    echo "  GIT_USERNAME  Nome do autor (padrão: $DEFAULT_USERNAME)"
    echo "  GIT_USERMAIL  Email do autor (padrão: $DEFAULT_EMAIL)"
    exit 0
fi

if [ $# -eq 1 ]; then
    LAST_N="$1"
fi

# Validar se é um número
if ! [[ "$LAST_N" =~ ^[0-9]+$ ]]; then
    print_error "Por favor, forneça um número válido"
    exit 1
fi

# ============================================================================
# 🎯 INÍCIO DO SCRIPT
# ============================================================================

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}⚡ QUICK REWRITE - Últimos $LAST_N commits${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

print_info "Configuração:"
echo -e "   Nome:  ${CYAN}$GIT_USERNAME${NC}"
echo -e "   Email: ${CYAN}$GIT_USERMAIL${NC}"
echo -e "   Commits: ${CYAN}$LAST_N${NC}"
echo ""

# ============================================================================
# 🔍 MOSTRAR COMMITS ATUAIS
# ============================================================================

print_info "Commits atuais:"
echo ""

git log -$LAST_N --format='  %C(cyan)%h%C(reset) %s %C(yellow)(%an <%ae>)%C(reset)'
echo ""

# ============================================================================
# ⚠️  CONFIRMAÇÃO
# ============================================================================

print_warning "Esta ação vai reescrever os últimos $LAST_N commits!"
echo ""

read -p "Deseja continuar? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
    print_info "Operação cancelada"
    exit 0
fi

echo ""

# ============================================================================
# 💾 CRIAR BACKUP
# ============================================================================

print_info "Criando backup..."

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
BACKUP_BRANCH="backup-quick-rewrite-$(date +%Y%m%d-%H%M%S)"

git branch "$BACKUP_BRANCH" 2>/dev/null || {
    print_error "Falha ao criar backup!"
    exit 1
}

print_success "Backup criado: ${CYAN}$BACKUP_BRANCH${NC}"
echo ""

# ============================================================================
# 🔄 REESCREVER COMMITS
# ============================================================================

print_info "Reescrevendo últimos $LAST_N commits..."
echo ""

# Usar git rebase com exec para reescrever
export GIT_USERNAME
export GIT_USERMAIL

# Criar script temporário para o rebase
TEMP_SCRIPT=$(mktemp)
cat > "$TEMP_SCRIPT" << 'EOF'
#!/bin/bash
export GIT_AUTHOR_NAME="$GIT_USERNAME"
export GIT_AUTHOR_EMAIL="$GIT_USERMAIL"
export GIT_COMMITTER_NAME="$GIT_USERNAME"
export GIT_COMMITTER_EMAIL="$GIT_USERMAIL"
git commit --amend --no-edit --reset-author
EOF

chmod +x "$TEMP_SCRIPT"

# Executar rebase
git rebase -x "$TEMP_SCRIPT" HEAD~$LAST_N

# Limpar script temporário
rm -f "$TEMP_SCRIPT"

if [ $? -ne 0 ]; then
    print_error "Falha ao reescrever commits!"
    print_info "Reverta com: git reset --hard $BACKUP_BRANCH"
    exit 1
fi

# ============================================================================
# 📊 RESULTADO
# ============================================================================

echo ""
print_success "Commits reescritos com sucesso!"
echo ""

echo -e "${BLUE}📊 Resultado:${NC}"
echo -e "   - Commits reescritos: ${CYAN}$LAST_N${NC}"
echo -e "   - Branch: ${CYAN}$CURRENT_BRANCH${NC}"
echo -e "   - Backup: ${CYAN}$BACKUP_BRANCH${NC}"
echo ""

echo -e "${BLUE}📝 Commits reescritos:${NC}"
echo ""

git log -$LAST_N --format='  %C(cyan)%h%C(reset) %s %C(green)(%an <%ae>)%C(reset)'
echo ""

# ============================================================================
# 🚀 PRÓXIMOS PASSOS
# ============================================================================

print_info "Próximos passos:"
echo ""
echo -e "  Para fazer push:"
echo -e "    ${CYAN}git push --force-with-lease${NC}"
echo ""
echo -e "  Para reverter:"
echo -e "    ${CYAN}git reset --hard $BACKUP_BRANCH${NC}"
echo ""

print_success "Concluído!"
echo ""
