#!/bin/bash

# ============================================================================
# 🚀 SCRIPT AUTOMÁTICO: CORRIGIR TODOS OS COMMITS
# ============================================================================
# Este script executa todos os passos necessários para corrigir os commits
#
# Autor: Marcelino Sandroni
# Email: marcelino.sandroni@gmail.com
# Data: 2026-01-15
# ============================================================================

set -e

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🚀 CORRIGIR TODOS OS COMMITS - AUTOMÁTICO${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Verificar se está em um repositório git
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Erro: Não está em um repositório git!${NC}"
    exit 1
fi

# ============================================================================
# PASSO 1: Tornar scripts executáveis
# ============================================================================
echo -e "${YELLOW}📋 Passo 1/5: Tornando scripts executáveis...${NC}"
chmod +x SKILLS/rewrite-commits/*.sh 2>/dev/null || {
    echo -e "${RED}❌ Erro: Pasta SKILLS/rewrite-commits não encontrada!${NC}"
    exit 1
}
echo -e "${GREEN}✅ Scripts tornados executáveis${NC}"
echo ""

# ============================================================================
# PASSO 2: Verificar commits problemáticos
# ============================================================================
echo -e "${YELLOW}📋 Passo 2/5: Verificando commits com autores errados...${NC}"
echo ""
./SKILLS/rewrite-commits/check-commits.sh --all
echo ""

# Perguntar se quer continuar
read -p "Deseja continuar com a correção? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
    echo -e "${BLUE}ℹ️  Operação cancelada pelo usuário${NC}"
    exit 0
fi
echo ""

# ============================================================================
# PASSO 3: Configurar git
# ============================================================================
echo -e "${YELLOW}📋 Passo 3/5: Configurando git com credenciais corretas...${NC}"
./SKILLS/rewrite-commits/configure-git.sh
echo ""

# ============================================================================
# PASSO 4: Reescrever commits
# ============================================================================
echo -e "${YELLOW}📋 Passo 4/5: Reescrevendo todos os commits...${NC}"
./SKILLS/rewrite-commits/rewrite-commits.sh --all --yes
echo ""

# ============================================================================
# PASSO 5: Verificar resultado
# ============================================================================
echo -e "${YELLOW}📋 Passo 5/5: Verificando resultado...${NC}"
echo ""
echo -e "${BLUE}📊 Últimos 10 commits:${NC}"
git log --oneline -10
echo ""

# ============================================================================
# RESULTADO FINAL
# ============================================================================
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ TODOS OS COMMITS FORAM CORRIGIDOS COM SUCESSO!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}🚀 Próximo passo:${NC}"
echo -e "   ${BLUE}git push --force-with-lease${NC}"
echo ""
echo -e "${YELLOW}⚠️  Lembre-se:${NC}"
echo -e "   - Use APENAS em branches locais"
echo -e "   - NÃO use em branches compartilhadas"
echo -e "   - Faça backup antes se necessário"
echo ""
