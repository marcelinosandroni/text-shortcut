#!/bin/bash

# ============================================================================
# 🔍 CHECK COMMITS SCRIPT
# ============================================================================
# Verifica se há commits com autores diferentes do configurado
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
    echo "❌ Erro: Não está em um repositório git!"
    exit 1
fi

# ============================================================================
# 🎯 PARSE DE ARGUMENTOS
# ============================================================================

LAST_N="20"  # Padrão: últimos 20 commits
SHOW_ALL=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --last)
            LAST_N="$2"
            shift 2
            ;;
        --all)
            SHOW_ALL=true
            shift
            ;;
        --help|-h)
            echo "Uso: $0 [opções]"
            echo ""
            echo "Opções:"
            echo "  --last <n>    Verificar últimos N commits (padrão: 20)"
            echo "  --all         Verificar todos os commits"
            echo "  --help, -h    Mostrar esta ajuda"
            echo ""
            echo "Exemplos:"
            echo "  $0              # Verifica últimos 20 commits"
            echo "  $0 --last 50    # Verifica últimos 50 commits"
            echo "  $0 --all        # Verifica todos os commits"
            exit 0
            ;;
        *)
            echo "Opção desconhecida: $1"
            exit 1
            ;;
    esac
done

# ============================================================================
# 🔍 VERIFICAR COMMITS
# ============================================================================

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}🔍 CHECK COMMITS${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

print_info "Verificando commits..."
echo -e "   Autor esperado: ${CYAN}$GIT_USERNAME${NC}"
echo -e "   Email esperado: ${CYAN}$GIT_USERMAIL${NC}"
echo ""

# Construir comando git log
if [ "$SHOW_ALL" = true ]; then
    GIT_LOG_CMD="git log --format='%H|%an|%ae|%s'"
else
    GIT_LOG_CMD="git log -$LAST_N --format='%H|%an|%ae|%s'"
fi

# Buscar commits
COMMITS=$(eval $GIT_LOG_CMD 2>/dev/null || true)

if [ -z "$COMMITS" ]; then
    print_success "Nenhum commit encontrado!"
    exit 0
fi

# Contar commits totais
TOTAL_COUNT=$(echo "$COMMITS" | wc -l | tr -d ' ')

# Filtrar commits com autores diferentes
WRONG_COMMITS=$(echo "$COMMITS" | grep -v "|$GIT_USERNAME|$GIT_USERMAIL|" || true)

if [ -z "$WRONG_COMMITS" ]; then
    print_success "Todos os commits estão com as credenciais corretas!"
    echo ""
    echo -e "   Commits verificados: ${CYAN}$TOTAL_COUNT${NC}"
    exit 0
fi

# Contar commits com autores errados
WRONG_COUNT=$(echo "$WRONG_COMMITS" | wc -l | tr -d ' ')

# ============================================================================
# 📊 RESULTADO
# ============================================================================

print_warning "Encontrados commits com autores diferentes!"
echo ""

echo -e "${BLUE}📊 Estatísticas:${NC}"
echo -e "   - Total de commits verificados: ${CYAN}$TOTAL_COUNT${NC}"
echo -e "   - Commits com autor correto: ${GREEN}$((TOTAL_COUNT - WRONG_COUNT))${NC}"
echo -e "   - Commits com autor diferente: ${RED}$WRONG_COUNT${NC}"
echo ""

# Mostrar commits com autores errados
echo -e "${YELLOW}📝 Commits com autores diferentes:${NC}"
echo ""

COUNTER=1
echo "$WRONG_COMMITS" | while IFS='|' read -r hash author email message; do
    short_hash=$(echo $hash | cut -c1-7)
    echo -e "  ${COUNTER}. ${CYAN}${short_hash}${NC} ${message}"
    echo -e "     ${RED}Autor: ${author} <${email}>${NC}"
    COUNTER=$((COUNTER + 1))
done

echo ""

# ============================================================================
# 💡 SUGESTÕES
# ============================================================================

print_info "Como corrigir:"
echo ""
echo -e "  1. Usar o script de reescrita:"
echo -e "     ${CYAN}./SKILLS/rewrite-commits/rewrite-commits.sh${NC}"
echo ""
echo -e "  2. Reescrever apenas commits de um autor específico:"
echo -e "     ${CYAN}./SKILLS/rewrite-commits/rewrite-commits.sh --author 'Qwen'${NC}"
echo ""
echo -e "  3. Configurar git para futuros commits:"
echo -e "     ${CYAN}./SKILLS/rewrite-commits/configure-git.sh${NC}"
echo ""

print_warning "Lembre-se: NÃO use em branches compartilhadas!"
echo ""
