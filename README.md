# Scalapay Takehome Project

A full-stack e-commerce product management system built with Next.js, NestJS, and MySQL.

## Project Structure

This is a monorepo containing three main packages:

```
scalapay-takehome/
├── frontend/          # Next.js React application
├── backend/           # NestJS API server  
├── shared/            # Shared TypeScript types and DTOs
├── docker-compose.yml # MySQL database container
└── pnpm-workspace.yaml
```

## Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **Docker & Docker Compose**

### Installation

1. **Clone the repository**
2. **Install dependencies**
3. **Start the MySQL database**
4. **Set up environment variables**
   
    Backend (`backend/.env.local`):
    ```env
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=user
    DB_PASSWORD=password
    DB_NAME=ecommerce
    BACKEND_PORT=5000
    FRONTEND_URL=http://localhost:3000
    ```

    Frontend (`frontend/.env.local`):
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000
    ```

5. **Start the development servers**
   
   In separate terminals:
   ```bash
   # Start backend (from root or backend/)
   cd backend && pnpm run start:dev
   
   # Start frontend (from root or frontend/)
   cd frontend && pnpm run dev
   ```

6. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000
   - **Database**: localhost:3306
