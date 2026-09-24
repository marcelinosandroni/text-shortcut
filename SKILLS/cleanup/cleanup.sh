#!/bin/bash

# Cleanup Script for QuickFill
# Author: Marcelino Sandroni
# Version: 1.0.0

set -e  # Exit on error

echo "🧹 Starting cleanup..."

# Function to remove directory if exists
remove_dir() {
    if [ -d "$1" ]; then
        echo "🗑️  Removing $1"
        rm -rf "$1"
    fi
}

# Light cleanup (keeps node_modules)
if [ "$1" = "--light" ]; then
    echo "🪶 Running light cleanup..."
    remove_dir "dist"
    remove_dir ".vite"
    remove_dir "coverage"
    remove_dir "test-results"
    remove_dir "playwright-report"
    echo "✅ Light cleanup complete!"
    exit 0
fi

# Full cleanup
remove_dir "node_modules"
remove_dir "dist"
remove_dir ".vite"
remove_dir "coverage"
remove_dir "test-results"
remove_dir "playwright-report"

echo "📦 Running npm install..."
npm install

echo "✅ Cleanup complete!"
echo ""
echo "🎯 Next steps:"
echo "   - Run 'npm run dev' to start development"
echo "   - Run 'npm run build' to build for production"
echo "   - Run 'npm run test' to run tests"
