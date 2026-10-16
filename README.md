# StratoShop

Modern e-commerce platform built with Spring Boot microservices, React, and Docker.

## Stack

- **Backend:** Spring Boot 3.2, Spring Cloud Gateway, Eureka, MySQL
- **Frontend:** React + Vite
- **Infrastructure:** Docker Compose

## Quick Start

### Prerequisites

- Docker Desktop
- Git

### Run the full application

```bash
git clone https://github.com/LNR-777/StratoShop.git
cd StratoShop
copy .env.example .env   # Windows
# cp .env.example .env   # macOS/Linux

docker compose up --build -d
```

First startup can take 10–20 minutes while Maven builds each service.

### Access the app

| Service | URL |
|---------|-----|
| **Storefront (UI)** | http://localhost:3000 |
| **API Gateway** | http://localhost:8080 |
| **Eureka Dashboard** | http://localhost:8761 |

### Dev mode (UI hot reload)

Run backend with Docker, then start the UI locally:

```bash
cd stratoshop-ui
npm install
npm run dev
```

Open http://localhost:5173

## Product Catalog

The store ships with 12 real-world products across:

- **Electronics** — MacBook Air, Galaxy S24 Ultra, Sony WH-1000XM5, iPad Air
- **Fashion** — Nike Air Max 90, Levi's 501, Ray-Ban Aviator, North Face Jacket
- **Home & Living** — Dyson V15, Nespresso Vertuo, Philips Hue, Casper Pillow

Products are auto-seeded on first startup (or when legacy placeholder data is detected).

## Useful Commands

```bash
# View logs
docker compose logs -f product-service api-gateway

# Stop everything
docker compose down

# Reset databases and reseed products
docker compose down -v
docker compose up --build -d
```

## Project Structure

```
StratoShop/
├── discovery-server/    # Eureka service registry
├── api-gateway/         # API routing & CORS
├── user-service/        # Auth & users
├── product-service/     # Product catalog
├── order-service/       # Orders
├── stratoshop-ui/       # React storefront
└── docker-compose.yml   # Full stack orchestration
```

## Environment Variables

See `.env.example` for configurable values:

- `MYSQL_ROOT_PASSWORD` — database password
- `CORS_ALLOWED_ORIGINS` — allowed frontend origins
- `VITE_API_URL` — API URL baked into the UI Docker build

## License

MIT
