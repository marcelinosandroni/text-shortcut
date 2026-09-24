#!/bin/bash

# ============================================================================
# 📦 INSTALL SKILLS
# ============================================================================
# Torna todos os scripts da pasta SKILLS executáveis
#
# Autor: Marcelino Sandroni
# Email: marcelino.sandroni@gmail.com
# Versão: 1.0.0
# ============================================================================

set -e

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
# 🎯 INÍCIO
# ============================================================================

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}📦 INSTALL SKILLS${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Verificar se está na raiz do projeto
if [ ! -d "SKILLS" ]; then
    echo "❌ Erro: Pasta SKILLS não encontrada!"
    echo "Execute este script da raiz do projeto"
    exit 1
fi

# ============================================================================
# 🔧 TORNAR SCRIPTS EXECUTÁVEIS
# ============================================================================

print_info "Tornando scripts executáveis..."
echo ""

# Encontrar todos os arquivos .sh na pasta SKILLS
SCRIPTS=$(find SKILLS -name "*.sh" -type f)

if [ -z "$SCRIPTS" ]; then
    echo "⚠️  Nenhum script .sh encontrado na pasta SKILLS"
    exit 0
fi

# Tornar cada script executável
COUNT=0
for script in $SCRIPTS; do
    chmod +x "$script"
    print_success "$script"
    COUNT=$((COUNT + 1))
done

echo ""
print_success "$COUNT scripts tornados executáveis!"
echo ""

# ============================================================================
# 📊 LISTAR SKILLS DISPONÍVEIS
# ============================================================================

print_info "Skills disponíveis:"
echo ""

# Listar pastas na pasta SKILLS (exceto a própria pasta SKILLS)
for skill_dir in SKILLS/*/; do
    if [ -d "$skill_dir" ]; then
        skill_name=$(basename "$skill_dir")
        echo -e "  ${CYAN}•${NC} $skill_name"
        
        # Listar scripts dentro da skill
        for script in "$skill_dir"*.sh; do
            if [ -f "$script" ]; then
                script_name=$(basename "$script")
                echo -e "     ${GREEN}└─${NC} $script_name"
            fi
        done
    fi
done

echo ""

# ============================================================================
# 🔍 VERIFICAR GIT
# ============================================================================

print_info "Verificando configuração do git..."
echo ""

if git rev-parse --git-dir > /dev/null 2>&1; then
    CURRENT_NAME=$(git config user.name 2>/dev/null || echo "não configurado")
    CURRENT_EMAIL=$(git config user.email 2>/dev/null || echo "não configurado")
    
    echo -e "  Nome atual:  ${CYAN}$CURRENT_NAME${NC}"
    echo -e "  Email atual: ${CYAN}$CURRENT_EMAIL${NC}"
    echo ""
    
    # Verificar se está configurado com as credenciais corretas
    EXPECTED_NAME="Marcelino Sandroni"
    EXPECTED_EMAIL="marcelino.sandroni@gmail.com"
    
    if [ "$CURRENT_NAME" = "$EXPECTED_NAME" ] && [ "$CURRENT_EMAIL" = "$EXPECTED_EMAIL" ]; then
        print_success "Git configurado com as credenciais corretas!"
    else
        echo -e "${YELLOW}⚠️  Git não está configurado com as credenciais do AGENTS.md${NC}"
        echo ""
        echo -e "  Execute para configurar:"
        echo -e "  ${CYAN}./SKILLS/rewrite-commits/configure-git.sh${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Não está em um repositório git${NC}"
fi

echo ""

# ============================================================================
# 🚀 PRÓXIMOS PASSOS
# ============================================================================

print_info "Próximos passos:"
echo ""
echo -e "  1. Verificar commits com autores errados:"
echo -e "     ${CYAN}./SKILLS/rewrite-commits/check-commits.sh${NC}"
echo ""
echo -e "  2. Configurar git:"
echo -e "     ${CYAN}./SKILLS/rewrite-commits/configure-git.sh${NC}"
echo ""
echo -e "  3. Reescrever commits:"
echo -e "     ${CYAN}./SKILLS/rewrite-commits/quick-rewrite.sh 5${NC}"
echo ""
echo -e "  4. Ler o guia rápido:"
echo -e "     ${CYAN}cat SKILLS/rewrite-commits/QUICK-START.md${NC}"
echo ""

print_success "Instalação concluída!"
echo ""
