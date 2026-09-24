#!/bin/bash

# ============================================================================
# 🔧 CONFIGURE GIT CREDENTIALS
# ============================================================================
# Configura as credenciais do git com base no AGENTS.md
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

# Usar variáveis de ambiente ou padrões
GIT_USERNAME="${GIT_USERNAME:-$DEFAULT_USERNAME}"
GIT_USERMAIL="${GIT_USERMAIL:-$DEFAULT_EMAIL}"

# ============================================================================
# 🎨 CORES
# ============================================================================
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# ============================================================================
# 📝 FUNÇÕES
# ============================================================================

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# ============================================================================
# 🎯 PARSE DE ARGUMENTOS
# ============================================================================

SCOPE="local"  # Padrão: local

while [[ $# -gt 0 ]]; do
    case $1 in
        --global)
            SCOPE="global"
            shift
            ;;
        --local)
            SCOPE="local"
            shift
            ;;
        --help|-h)
            echo "Uso: $0 [opções]"
            echo ""
            echo "Opções:"
            echo "  --global    Configurar globalmente (~/.gitconfig)"
            echo "  --local     Configurar localmente (repositório atual) [padrão]"
            echo "  --help, -h  Mostrar esta ajuda"
            echo ""
            echo "Variáveis de Ambiente:"
            echo "  GIT_USERNAME  Nome do autor (padrão: $DEFAULT_USERNAME)"
            echo "  GIT_USERMAIL  Email do autor (padrão: $DEFAULT_EMAIL)"
            echo ""
            echo "Exemplos:"
            echo "  $0                    # Configura localmente"
            echo "  $0 --global           # Configura globalmente"
            echo "  GIT_USERNAME='Seu Nome' $0"
            exit 0
            ;;
        *)
            echo "Opção desconhecida: $1"
            exit 1
            ;;
    esac
done

# ============================================================================
# 🔧 CONFIGURAR GIT
# ============================================================================

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}🔧 CONFIGURAR GIT CREDENTIALS${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

print_info "Configurando git ${CYAN}$SCOPE${NC}mente..."
echo ""
echo -e "   Nome:  ${CYAN}$GIT_USERNAME${NC}"
echo -e "   Email: ${CYAN}$GIT_USERMAIL${NC}"
echo ""

# Configurar nome
if [ "$SCOPE" = "global" ]; then
    git config --global user.name "$GIT_USERNAME"
    git config --global user.email "$GIT_USERMAIL"
else
    # Verificar se está em um repositório
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        echo "❌ Erro: Não está em um repositório git!"
        echo "Use --global para configurar globalmente"
        exit 1
    fi
    
    git config user.name "$GIT_USERNAME"
    git config user.email "$GIT_USERMAIL"
fi

print_success "Git configurado com sucesso!"
echo ""

# ============================================================================
# 📊 VERIFICAR CONFIGURAÇÃO
# ============================================================================

echo -e "${BLUE}📊 Configuração atual:${NC}"
echo ""

if [ "$SCOPE" = "global" ]; then
    echo "Global:"
    echo "  user.name:  $(git config --global user.name)"
    echo "  user.email: $(git config --global user.email)"
else
    echo "Local (repositório):"
    echo "  user.name:  $(git config user.name)"
    echo "  user.email: $(git config user.email)"
    echo ""
    echo "Global (fallback):"
    echo "  user.name:  $(git config --global user.name 2>/dev/null || echo 'não configurado')"
    echo "  user.email: $(git config --global user.email 2>/dev/null || echo 'não configurado')"
fi

echo ""
print_success "Configuração concluída!"
echo ""
