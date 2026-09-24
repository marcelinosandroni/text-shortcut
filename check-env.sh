#!/bin/bash

echo "=========================================="
echo "VARIÁVEIS DE AMBIENTE DO SISTEMA"
echo "=========================================="
echo ""

echo "--- GIT ---"
echo "GIT_AUTHOR_NAME: ${GIT_AUTHOR_NAME:-não definido}"
echo "GIT_AUTHOR_EMAIL: ${GIT_AUTHOR_EMAIL:-não definido}"
echo "GIT_COMMITTER_NAME: ${GIT_COMMITTER_NAME:-não definido}"
echo "GIT_COMMITTER_EMAIL: ${GIT_COMMITTER_EMAIL:-não definido}"
echo "GIT_USERNAME: ${GIT_USERNAME:-não definido}"
echo "GIT_USERMAIL: ${GIT_USERMAIL:-não definido}"
echo "GIT_ORIGIN: ${GIT_ORIGIN:-não definido}"
echo ""

echo "--- NODE/NPM ---"
echo "NODE_ENV: ${NODE_ENV:-não definido}"
echo "NODE_VERSION: ${NODE_VERSION:-não definido}"
echo "NPM_VERSION: ${NPM_VERSION:-não definido}"
echo ""

echo "--- PATH ---"
echo "PATH: ${PATH:-não definido}"
echo ""

echo "--- HOME/USER ---"
echo "HOME: ${HOME:-não definido}"
echo "USER: ${USER:-não definido}"
echo "USERNAME: ${USERNAME:-não definido}"
echo ""

echo "--- SHELL ---"
echo "SHELL: ${SHELL:-não definido}"
echo "TERM: ${TERM:-não definido}"
echo ""

echo "--- PROJETO ---"
echo "PWD: ${PWD:-não definido}"
echo "PROJECT_ROOT: ${PROJECT_ROOT:-não definido}"
echo ""

echo "--- OUTRAS ---"
echo "LANG: ${LANG:-não definido}"
echo "TZ: ${TZ:-não definido}"
echo ""

echo "=========================================="
echo "CONFIGURAÇÃO GIT ATUAL"
echo "=========================================="
echo "git config user.name: $(git config user.name 2>/dev/null || echo 'não configurado')"
echo "git config user.email: $(git config user.email 2>/dev/null || echo 'não configurado')"
echo ""
