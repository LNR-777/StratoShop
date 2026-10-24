# StratoShop

A distributed e-commerce microservices platform built using **Spring Boot 3.2**, **Spring Cloud (Eureka, Gateway, OpenFeign)**, **MySQL**, and a **React (Vite)** storefront. 

The project demonstrates decoupled service architecture, centralized API routing, JWT-based authentication at the gateway layer, and synchronous inter-service communication.

---

## System Architecture

```
                       [ React Storefront (Port 3000) ]
                                      |
                                  (REST API)
                                      v
                       [ API Gateway (Port 8080) ]
                     /              |             \
            (JWT Filter)      (Route /products) (Route /orders)
                  v                 v               v
           [ User Service ]  [ Product Service ] [ Order Service ]
             (Port 8081)       (Port 8082)         (Port 8083)
                  |                 |                   |
                  |                 |   <-- Feign --    |  (Stock check & user validation)
                  v                 v                   v
            [ user-db ]       [ product-db ]       [ order-db ]
            (MySQL 3307)      (MySQL 3308)         (MySQL 3309)

                       [ Eureka Discovery Server ]
                               (Port 8761)
```

### Services Breakdown

| Service | Port | Description |
|---|---|---|
| **discovery-server** | `8761` | Netflix Eureka registry for dynamic service discovery and health registry. |
| **api-gateway** | `8080` | Spring Cloud Gateway; handles CORS, preflight OPTIONS requests, JWT token validation, and request forwarding. |
| **user-service** | `8081` | Authentication endpoints (`/register`, `/login`), BCrypt password hashing, and JWT issuance with role claims. |
| **product-service** | `8082` | Product catalog CRUD, category filtering, search queries, and inventory updates. Seeds 12 demo products on initial boot. |
| **order-service** | `8083` | Order creation and tracking. Communicates with `user-service` and `product-service` using OpenFeign clients. |
| **stratoshop-ui** | `3000` | Responsive single-page application built with React, Vite, and Lucide icons; served via multi-stage Nginx build in Docker. |

---

## Tech Stack

- **Backend:** Java 17, Spring Boot 3.2.2, Spring Cloud (2023.0.0), Spring Security 6, Spring Data JPA, OpenFeign, JJWT (`0.11.5`)
- **Database:** MySQL 8.0 (separate databases per service following Database-per-Service pattern)
- **Frontend:** React 18, Vite, React Router 6, Axios, Lucide React
- **Containerization:** Docker & Docker Compose

---

## Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (running)
- [Git](https://git-scm.com/)

### Running with Docker Compose

1. Clone the repository:
   ```bash
   git clone https://github.com/LNR-777/StratoShop.git
   cd StratoShop
   ```

2. Create your local environment configuration:
   ```bash
   # Windows (PowerShell / CMD)
   copy .env.example .env

   # Linux / macOS
   cp .env.example .env
   ```

3. Build images and start all containers:
   ```bash
   docker compose up --build -d
   ```
   *Note: Initial build compiles all Maven projects inside Docker containers and may take 5–10 minutes depending on your internet connection.*

4. Verify running containers:
   ```bash
   docker compose ps
   ```

5. Access points:
   - **Storefront Web UI:** http://localhost:3000
   - **API Gateway:** http://localhost:8080
   - **Eureka Dashboard:** http://localhost:8761

---

## Development & Manual Execution

If you prefer running services locally without containerizing the Java code:

### 1. Start Infrastructure (Databases + Eureka)
```bash
docker compose up -d user-db product-db order-db discovery-server
```

### 2. Run Backend Services
Run each service from its respective folder:
```bash
# Windows
cd user-service && .\mvnw.cmd spring-boot:run
cd product-service && .\mvnw.cmd spring-boot:run
cd order-service && .\mvnw.cmd spring-boot:run
cd api-gateway && .\mvnw.cmd spring-boot:run

# Linux / macOS
cd user-service && ./mvnw spring-boot:run
cd product-service && ./mvnw spring-boot:run
cd order-service && ./mvnw spring-boot:run
cd api-gateway && ./mvnw spring-boot:run
```

### 3. Run Frontend (Vite Dev Server)
```bash
cd stratoshop-ui
npm install
npm run dev
```
Local dev storefront runs at `http://localhost:5173`.

---

## Inter-Service Communication Flow

1. **User Authentication:** Client posts credentials to `/api/auth/login`. Gateway routes to `user-service`. On success, signed JWT containing `sub` (username) and `role` claims is returned to the client.
2. **Authenticated Requests:** Client attaches `Authorization: Bearer <token>` on protected routes. `JwtAuthenticationFilter` validates token signature and forwards user claims via request headers (`loggedInUser`, `role`).
3. **Placing an Order:** 
   - Client sends order payload to `/api/orders`.
   - `order-service` calls `user-service` via OpenFeign to verify user identity.
   - `order-service` calls `product-service` via OpenFeign to verify price and stock availability.
   - On confirmation, inventory is decremented and order is committed to `order-db`.

---

## API Testing & Documentation

A ready-to-import Postman collection is included in [`postman/StratoShop.postman_collection.json`](postman/StratoShop.postman_collection.json):

1. Open Postman -> **Import** -> Select `postman/StratoShop.postman_collection.json`.
2. The collection includes:
   - **Auth & Users:** Register, Login (with auto-extraction of JWT token to collection variables), User profile lookup.
   - **Catalog:** All products, category filters, and keyword searches.
   - **Orders:** Place order (calls inter-service Feign verification) and view order history.
   - **Actuator:** Gateway health check.

---

## Useful Commands

```bash
# View combined logs
docker compose logs -f

# View logs for a specific service
docker compose logs -f api-gateway product-service

# Stop all containers
docker compose down

# Stop and wipe database volumes (re-seeds sample data on next boot)
docker compose down -v
```

---

## Author

Developed by **Lakhan Reddy** ([@LNR-777](https://github.com/LNR-777)).
