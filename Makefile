build-dev:
	docker compose -f docker-compose.dev.yml build
	docker compose -f docker-compose.dev.yml up

build-prod:
	docker compose -f docker-compose.prod.yml build
	docker compose -f docker-compose.prod.yml up