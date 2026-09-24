#!/bin/bash

# Run All Tests Script for QuickFill
# Author: Marcelino Sandroni
# Version: 1.0.0

set -e  # Exit on error

echo "🧪 Running all tests..."
echo ""

# Function to run unit tests
run_unit_tests() {
    echo "📦 Step 1/3: Unit Tests"
    npm run test -- --run
    echo "✅ Unit tests passed!"
    echo ""
}

# Function to run unit tests with coverage
run_unit_tests_coverage() {
    echo "📦 Step 1/3: Unit Tests (with coverage)"
    npm run test:coverage
    echo "✅ Unit tests passed!"
    echo ""
}

# Function to run E2E tests
run_e2e_tests() {
    echo "🎭 Step 2/3: E2E Tests"
    npm run test:e2e
    echo "✅ E2E tests passed!"
    echo ""
}

# Function to show summary
show_summary() {
    echo "📊 Step 3/3: Summary"
    echo "✅ All tests passed!"
    echo ""
    echo "🎯 Next steps:"
    echo "   - Review coverage report in coverage/"
    echo "   - Check E2E report in playwright-report/"
    echo "   - Commit your changes"
}

# Parse arguments
if [ "$1" = "--unit" ]; then
    run_unit_tests
    exit 0
fi

if [ "$1" = "--e2e" ]; then
    run_e2e_tests
    exit 0
fi

if [ "$1" = "--coverage" ]; then
    run_unit_tests_coverage
    run_e2e_tests
    show_summary
    exit 0
fi

# Default: run all tests
run_unit_tests
run_e2e_tests
show_summary
