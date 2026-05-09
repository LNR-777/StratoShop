# StratoShop

StratoShop is a microservices-based e-commerce project built with Spring Boot, React, MySQL, Docker, and Kubernetes configuration files.

The project is split into independent backend services, an API gateway, a discovery server, and a React frontend.

## Project Structure

```text
StratoShop/
  discovery-server/   # Eureka service discovery
  api-gateway/        # Spring Cloud Gateway entry point
  user-service/       # Authentication and user APIs
  product-service/    # Product APIs
  order-service/      # Order APIs
  stratoshop-ui/      # React frontend
  docker-compose.yml  # Local multi-service setup
  k8s/                # Kubernetes manifests
```

## Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Cloud Gateway
- Eureka Discovery Server
- Spring Security
- JWT authentication
- Spring Data JPA
- MySQL

### Frontend
- React
- Vite
- JavaScript
- CSS

### DevOps / Deployment
- Docker
- Docker Compose
- Kubernetes manifests

## Services

- `discovery-server` runs Eureka service discovery on port `8761`.
- `api-gateway` routes requests through port `8080`.
- `user-service` handles users and authentication on port `8081`.
- `product-service` handles product data on port `8082`.
- `order-service` handles order workflows on port `8083`.
- `stratoshop-ui` contains the frontend application.

## Run With Docker Compose

Make sure Docker is running, then start the full system:

```bash
docker compose up --build
```

The compose setup includes MySQL containers for user, product, and order services.

Main service URLs:

- Eureka dashboard: http://localhost:8761
- API Gateway: http://localhost:8080
- User Service: http://localhost:8081
- Product Service: http://localhost:8082
- Order Service: http://localhost:8083

## Run Backend Services Manually

Each backend service includes its own Maven wrapper.

Example:

```bash
cd discovery-server
./mvnw spring-boot:run
```

On Windows:

```bash
cd discovery-server
mvnw.cmd spring-boot:run
```

Repeat the same pattern for:

- `api-gateway`
- `user-service`
- `product-service`
- `order-service`

For manual runs, make sure the required MySQL databases are available and the service configuration matches your local database setup.

## Run Frontend

```bash
cd stratoshop-ui
npm install
npm run dev
```

Build frontend for production:

```bash
npm run build
```

## Build Check

The backend services were checked with:

```bash
mvnw.cmd -DskipTests package
```

The frontend was checked with:

```bash
npm install
npm run build
```

## Notes

- This is a learning project for microservices, service discovery, API gateway routing, Docker, and Kubernetes basics.
- The project is designed to be run as multiple services instead of a single Spring Boot application.
- Kubernetes manifests are included for deployment practice and may need environment-specific changes before production use.
