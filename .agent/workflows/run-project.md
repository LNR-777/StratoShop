---
description: How to run the StratoShop platform locally
---

To run the StratoShop platform, you need to start the backend microservices ecosystem and then launch the frontend application.

### Prerequisites
- **Docker Desktop** (with MySQL images available)
- **Node.js** (v18 or higher)
- **Java 17** & **Maven** (if you want to build service jars manually)

### Step 1: Start Backend Services
Launch the entire backend ecosystem (Services + DBs) using Docker Compose.

1. Open a terminal in the project root: `c:\Users\Lakhan\projects\StratoShop`
// turbo
2. Run: `docker-compose up -d --build`

> [!NOTE]
> This will start the Discovery Server (Eureka), API Gateway, and all three microservices (User, Product, Order) along with their respective MySQL databases.

### Step 2: Start Frontend Application
Launch the React application using Vite.

1. Navigate to the UI directory: `c:\Users\Lakhan\projects\StratoShop\stratoshop-ui`
2. Install dependencies (first time only): `npm install`
// turbo
3. Run the dev server: `npm run dev`

### Step 3: Verify the Platform
1. **Frontend**: Open `http://localhost:5173` in your browser.
2. **Dashboard**: Visit `http://localhost:8761` to see the Eureka Discovery Server (all services should be UP).
3. **API Gateway**: Reachable at `http://localhost:8080/api/`.

### Troubleshooting
- If services fail to connect, ensure Docker Desktop is running.
- If the frontend shows no products, verify the `product-service` is registered in Eureka.
