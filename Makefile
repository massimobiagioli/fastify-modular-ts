.PHONY: up-build up down logs status install generate-schema create-migration migrate-dev seed-dev migrate-test seed-test test test-coverage test-filter help
.DEFAULT_GOAL := help
run-docker-compose = docker compose -f docker-compose.yml
run-npm = docker-compose run --rm app npm
run-npx = docker-compose run --rm app npx

up-build: # Build containers
	$(run-docker-compose) up -d --build

up: # Start containers
	$(run-docker-compose) up -d

down: # Stop all containers
	$(run-docker-compose) down --remove-orphans

logs: # Tail container logs
	$(run-docker-compose) logs -f app mariadb

status: # Show status of all containers
	$(run-docker-compose) ps

install: # Install dependencies
	$(run-npm) install

generate-schema: # Build prisma schema
	$(run-npx) prisma generate

create-migration: # Create new migration
	$(run-npx) prisma migrate dev --name $(name) --create-only

migrate-dev: # Run migrations
	$(run-npm) run migrate:dev

seed-dev: # Seed database
	$(run-npm) run seed:dev

migrate-test: # Run migrations for test database
	$(run-npm) run migrate:test

seed-test: # Seed database for test database
	$(run-npm) run seed:test

test: migrate-test seed-test # Run tests
	$(run-npm) run test

test-coverage: migrate-test seed-test # Run tests with coverage
	$(run-npm) run test:coverage

test-filter: migrate-test seed-test # Run all tests with filter
	$(run-npm) run test:filter --filter=$(filter)

help: # make help
	@awk 'BEGIN {FS = ":.*#"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z0-9_-]+:.*?#/ { printf "  \033[36m%-27s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
