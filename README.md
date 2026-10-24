# StratoShop

Modern, enterprise-grade e-commerce platform built with Spring Boot microservices, React, Docker, and Kubernetes manifests.

The system is split into decoupled backend microservices, a centralized API Gateway, Netflix Eureka service discovery, and a modern responsive React storefront.

---

## 🏛️ Architecture Overview

```text
StratoShop/
├── discovery-server/    # Eureka Service Registry (Port 8761)
├── api-gateway/         # Central API Gateway, CORS, JWT Routing (Port 8080)
├── user-service/        # Auth, User Management, JWT Claims (Port 8081)
├── product-service/     # Product Catalog, Categories, Auto-seeder (Port 8082)
├── order-service/       # Order Processing & Feign Client Inter-service (Port 8083)
├── stratoshop-ui/       # React + Vite SPA Storefront (Port 3000)
├── docker-compose.yml   # Multi-container local orchestration
└── k8s/                # Kubernetes Deployment & Service Manifests
```

---

## 🛠️ Tech Stack

### Backend
- **Java 17** & **Spring Boot 3.2**
- **Spring Cloud Gateway** (Reactive routing, Global JWT filter, CORS handling)
- **Netflix Eureka** (Dynamic service discovery & client-side load balancing)
- **Spring Security 6** with stateless **JWT Authentication**
- **OpenFeign** for synchronous microservice-to-microservice communication
- **Spring Data JPA** & **MySQL 8.0**

### Frontend
- **React 18** + **Vite**
- **React Router 6** with Auth Guards (`ProtectedRoute`)
- **Lucide React** Icons & Glassmorphism Design
- **Axios** with JWT Request Interceptors

### Infrastructure & DevOps
- **Docker & Docker Compose** (Health checks, depend-chains, isolated network)
- **Nginx** (Alpine multi-stage production UI build)
- **Kubernetes** manifests for container orchestration

---

## 🚀 Quick Start (Docker Compose)

### Prerequisites
- Docker Desktop
- Git

### 1. Clone & Setup Environment
```bash
git clone https://github.com/LNR-777/StratoShop.git
cd StratoShop
copy .env.example .env   # Windows
# cp .env.example .env   # macOS/Linux
```

### 2. Start all services
```bash
docker compose up --build -d
```
*Note: First-time startup builds all Maven microservices and pulls images (~5-10 minutes).*

### 3. Service Dashboard & URLs

| Service | Endpoint | Details |
|---|---|---|
| **Storefront (UI)** | `http://localhost:3000` | Full React store & checkout |
| **API Gateway** | `http://localhost:8080` | Entry point for all `/api/**` calls |
| **Eureka Registry** | `http://localhost:8761` | Service discovery dashboard |
| **User Service** | `http://localhost:8081` | Auth, Register & Profile |
| **Product Service** | `http://localhost:8082` | Catalog & Search APIs |
| **Order Service** | `http://localhost:8083` | Orders & Inventory management |

---

## 💻 Local Development Mode (Hot Reload)

To run the backend via Docker while running frontend locally for fast iterations:

```bash
# 1. Start backend microservices
docker compose up -d user-db product-db order-db discovery-server api-gateway user-service product-service order-service

# 2. Run React frontend
cd stratoshop-ui
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

---

## 📦 Seeded Product Catalog

The platform auto-seeds with verified, high-resolution catalog items across 3 primary categories:
- **Electronics**: MacBook Air 15" M3, Samsung Galaxy S24 Ultra, Sony WH-1000XM5, iPad Air M2
- **Fashion**: Nike Air Max 90, Levi's 501 Jeans, Ray-Ban Aviators, The North Face Jacket
- **Home & Living**: Dyson V15 Detect, Nespresso Vertuo Next, Philips Hue Kit, Casper Original Pillow

---

## 🔐 Environment Variables

Key parameters configurable in `.env`:
- `MYSQL_ROOT_PASSWORD` — Root credentials across microservice databases
- `JWT_SECRET` — 256-bit cryptographic key shared between Gateway & User Service
- `CORS_ALLOWED_ORIGINS` — Whitelisted origins for API Gateway
- `VITE_API_URL` — Backend base URL consumed by the UI container

---

## 📜 License

Distributed under the MIT License.
