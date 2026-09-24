#!/bin/bash

# ============================================================================
# 🔄 REWRITE COMMITS SCRIPT
# ============================================================================
# Reescreve o histórico de commits para usar as credenciais corretas
# Baseado nas regras do AGENTS.md
#
# Autor: Marcelino Sandroni
# Email: marcelino.sandroni@gmail.com
# Versão: 1.0.0
# ============================================================================

set -e  # Exit on error

# ============================================================================
# 📋 CONFIGURAÇÃO PADRÃO (do AGENTS.md)
# ============================================================================
DEFAULT_USERNAME="Marcelino Sandroni"
DEFAULT_EMAIL="marcelino.sandroni@gmail.com"

# Usar variáveis de ambiente ou padrões
GIT_USERNAME="${GIT_USERNAME:-$DEFAULT_USERNAME}"
GIT_USERMAIL="${GIT_USERMAIL:-$DEFAULT_EMAIL}"

# ============================================================================
# 🎨 CORES E FORMATAÇÃO
# ============================================================================
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ============================================================================
# 📝 FUNÇÕES AUXILIARES
# ============================================================================

print_header() {
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

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
# 🔍 VERIFICAÇÕES INICIAIS
# ============================================================================

# Verificar se está em um repositório git
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Este não é um repositório git!"
    print_info "Execute este script dentro de um repositório git"
    exit 1
fi

# Verificar se git filter-branch está disponível
if ! command -v git &> /dev/null; then
    print_error "Git não está instalado!"
    exit 1
fi

# ============================================================================
# 📊 PARSE DE ARGUMENTOS
# ============================================================================

DRY_RUN=false
AUTHOR_FILTER=""
REWRITE_ALL=false
VERBOSE=false
AUTO_YES=false
LAST_N=""
SINCE_DATE=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --author)
            AUTHOR_FILTER="$2"
            shift 2
            ;;
        --all)
            REWRITE_ALL=true
            shift
            ;;
        --verbose)
            VERBOSE=true
            shift
            ;;
        --yes|-y)
            AUTO_YES=true
            shift
            ;;
        --last)
            LAST_N="$2"
            shift 2
            ;;
        --since)
            SINCE_DATE="$2"
            shift 2
            ;;
        --help|-h)
            echo "Uso: $0 [opções]"
            echo ""
            echo "Opções:"
            echo "  --dry-run          Apenas mostra o que seria feito"
            echo "  --author <nome>    Reescrever apenas commits deste autor"
            echo "  --all              Reescrever todos os commits"
            echo "  --last <n>         Reescrever últimos N commits"
            echo "  --since <data>     Reescrever commits desde esta data"
            echo "  --verbose          Modo verboso"
            echo "  --yes, -y          Não pedir confirmação"
            echo "  --help, -h         Mostrar esta ajuda"
            echo ""
            echo "Variáveis de Ambiente:"
            echo "  GIT_USERNAME       Nome do autor (padrão: $DEFAULT_USERNAME)"
            echo "  GIT_USERMAIL       Email do autor (padrão: $DEFAULT_EMAIL)"
            echo ""
            echo "Exemplos:"
            echo "  $0 --author 'Qwen'"
            echo "  $0 --all --dry-run"
            echo "  GIT_USERNAME='Seu Nome' $0 --all"
            exit 0
            ;;
        *)
            print_error "Opção desconhecida: $1"
            exit 1
            ;;
    esac
done

# ============================================================================
# 🎯 INÍCIO DO SCRIPT
# ============================================================================

print_header "🔄 REWRITE COMMITS SCRIPT"

echo -e "${PURPLE}📋 Credenciais:${NC}"
echo -e "   Nome:  ${CYAN}$GIT_USERNAME${NC}"
echo -e "   Email: ${CYAN}$GIT_USERMAIL${NC}"
echo ""

# ============================================================================
# 🔍 BUSCAR COMMITS PARA REESCREVER
# ============================================================================

print_info "Buscando commits para reescrever..."
echo ""

# Construir comando git log baseado nos filtros
GIT_LOG_CMD="git log --format='%H|%an|%ae|%s' --all"

if [ -n "$AUTHOR_FILTER" ]; then
    GIT_LOG_CMD="$GIT_LOG_CMD --author='$AUTHOR_FILTER'"
    print_info "Filtrando por autor: ${CYAN}$AUTHOR_FILTER${NC}"
elif [ -n "$LAST_N" ]; then
    GIT_LOG_CMD="$GIT_LOG_CMD -$LAST_N"
    print_info "Filtrando últimos ${CYAN}$LAST_N${NC} commits"
elif [ -n "$SINCE_DATE" ]; then
    GIT_LOG_CMD="$GIT_LOG_CMD --since='$SINCE_DATE'"
    print_info "Filtrando commits desde: ${CYAN}$SINCE_DATE${NC}"
elif [ "$REWRITE_ALL" = false ]; then
    # Padrão: buscar commits com autores diferentes do configurado
    GIT_LOG_CMD="$GIT_LOG_CMD | grep -v '|$GIT_USERNAME|$GIT_USERMAIL|'"
fi

# Executar e capturar commits
COMMITS=$(eval $GIT_LOG_CMD 2>/dev/null || true)

if [ -z "$COMMITS" ]; then
    print_success "Nenhum commit encontrado para reescrever!"
    exit 0
fi

# Contar commits
COMMIT_COUNT=$(echo "$COMMITS" | wc -l | tr -d ' ')

echo -e "${PURPLE}📝 Commits encontrados: ${CYAN}$COMMIT_COUNT${NC}"
echo ""

# Mostrar preview dos commits
echo -e "${YELLOW}Preview dos commits:${NC}"
echo ""

COUNTER=1
echo "$COMMITS" | while IFS='|' read -r hash author email message; do
    short_hash=$(echo $hash | cut -c1-7)
    echo -e "  ${COUNTER}. ${CYAN}${short_hash}${NC} ${message} ${YELLOW}(${author})${NC}"
    COUNTER=$((COUNTER + 1))
done

echo ""

# ============================================================================
# ⚠️  AVISO E CONFIRMAÇÃO
# ============================================================================

if [ "$DRY_RUN" = true ]; then
    print_warning "DRY RUN - Nenhuma mudança será feita!"
    echo ""
    print_info "Para aplicar as mudanças, execute sem --dry-run"
    exit 0
fi

print_warning "ATENÇÃO: Esta ação vai reescrever o histórico!"
print_warning "NÃO use em branches compartilhadas (main, master, develop)"
print_warning "NÃO use após fazer push para origin"
echo ""

if [ "$AUTO_YES" = false ]; then
    read -p "Deseja continuar? (yes/no): " CONFIRM
    if [ "$CONFIRM" != "yes" ]; then
        print_info "Operação cancelada pelo usuário"
        exit 0
    fi
fi

echo ""

# ============================================================================
# 💾 CRIAR BACKUP
# ============================================================================

print_info "Criando backup antes de reescrever..."

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
BACKUP_BRANCH="backup-before-rewrite-$(date +%Y%m%d-%H%M%S)"

git branch "$BACKUP_BRANCH" 2>/dev/null || {
    print_error "Falha ao criar backup!"
    exit 1
}

print_success "Backup criado: ${CYAN}$BACKUP_BRANCH${NC}"
echo ""

# ============================================================================
# 🔄 REESCREVER COMMITS
# ============================================================================

print_info "Reescrevendo commits..."
echo ""

# Exportar variáveis para o filter-branch
export GIT_USERNAME
export GIT_USERMAIL

# Comando de reescrita
FILTER_CMD='
export GIT_AUTHOR_NAME="$GIT_USERNAME"
export GIT_AUTHOR_EMAIL="$GIT_USERMAIL"
export GIT_AUTHOR_DATE="$GIT_COMMITTER_DATE"
export GIT_COMMITTER_NAME="$GIT_USERNAME"
export GIT_COMMITTER_EMAIL="$GIT_USERMAIL"
export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
'

# Executar filter-branch
if [ "$VERBOSE" = true ]; then
    git filter-branch -f --env-filter "$FILTER_CMD" --tag-name-filter cat -- --all
else
    git filter-branch -f --env-filter "$FILTER_CMD" --tag-name-filter cat -- --all > /dev/null 2>&1
fi

if [ $? -ne 0 ]; then
    print_error "Falha ao reescrever commits!"
    print_info "Você pode reverter com: git reset --hard $BACKUP_BRANCH"
    exit 1
fi

# ============================================================================
# 🧹 LIMPEZA
# ============================================================================

print_info "Limpando referências antigas..."

# Remover backup do filter-branch
git for-each-ref --format="%(refname)" refs/original/ | xargs -r -n 1 git update-ref -d

# Coletar lixo
git gc --prune=now > /dev/null 2>&1

print_success "Limpeza concluída!"
echo ""

# ============================================================================
# 📊 RESULTADO FINAL
# ============================================================================

print_header "✅ RESULTADO"

echo -e "${GREEN}Commits reescritos com sucesso!${NC}"
echo ""
echo -e "${PURPLE}📊 Estatísticas:${NC}"
echo -e "   - Commits reescritos: ${CYAN}$COMMIT_COUNT${NC}"
echo -e "   - Branch atual: ${CYAN}$CURRENT_BRANCH${NC}"
echo -e "   - Backup em: ${CYAN}$BACKUP_BRANCH${NC}"
echo ""

# Mostrar alguns commits reescritos
echo -e "${PURPLE}📝 Commits reescritos (primeiros 5):${NC}"
echo ""

git log --format='  %C(cyan)%h%C(reset) %s %C(yellow)(%an)%C(reset)' -5
echo ""

# ============================================================================
# 🚀 PRÓXIMOS PASSOS
# ============================================================================

print_header "🚀 PRÓXIMOS PASSOS"

echo -e "${YELLOW}Para fazer push seguro:${NC}"
echo -e "   ${CYAN}git push --force-with-lease${NC}"
echo ""
echo -e "${YELLOW}Para reverter (se necessário):${NC}"
echo -e "   ${CYAN}git reset --hard $BACKUP_BRANCH${NC}"
echo ""
echo -e "${YELLOW}Para ver o backup:${NC}"
echo -e "   ${CYAN}git log $BACKUP_BRANCH --oneline${NC}"
echo ""

print_success "Script concluído com sucesso!"
echo ""
