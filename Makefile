.PHONY: clean install fresh reset help test-e2e test-all

# Default target
help:
	@echo "Available commands:"
	@echo "  make clean    - Clear npm cache and node_modules"
	@echo "  make install  - Install dependencies"
	@echo "  make fresh    - Clean and reinstall everything"
	@echo "  make reset    - Reset database and reinstall"
	@echo "  make dev      - Start development server"
	@echo "  make test     - Run Jest tests"
	@echo "  make test-e2e - Run Playwright tests"

# Clear npm cache and remove node_modules
clean:
	@echo "🧹 Clearing npm cache..."
	npm cache clean --force
	@echo "🗑️  Removing node_modules..."
	rm -rf node_modules
	@echo "🗑️  Removing package-lock.json..."
	rm -f package-lock.json
	@echo "✅ Clean complete!"

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	npm install
	@echo "✅ Installation complete!"

# Clean and reinstall everything
fresh: clean install
	@echo "🔄 Fresh install complete!"

# Reset database and reinstall
reset: clean install
	@echo "🗄️  Resetting database..."
	npx prisma db push --force-reset
	@echo "🌱 Seeding database..."
	npm run db:seed
	@echo "✅ Reset complete!"

# Development server
dev:
	@echo "🚀 Starting development server..."
	npm run dev

# Run Jest tests
test:
	@echo "🧪 Running Jest tests..."
	npm test

# Run Playwright tests
test-e2e:
	@echo "🎭 Running Playwright tests..."
	npm run test:e2e

# Run all tests
test-all: test test-e2e
	@echo "✅ All tests complete!" 