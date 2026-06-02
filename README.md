# Inventory Management System

A full-stack Inventory Management System built using FastAPI, React, PostgreSQL, Docker, and deployed on Render and Vercel.

---

## Live Demo

### Frontend
https://inventory-management-system-qrn32088l-rohan623-webs-projects.vercel.app/

### Backend API
https://inventory-backend-0c45.onrender.com/

### API Documentation
https://inventory-backend-0c45.onrender.com/docs

---

# Features

## Product Management

- Create Products
- Update Products
- Delete Products
- View Product Inventory
- SKU Management
- Stock Tracking

## Customer Management

- Add Customers
- View Customers
- Delete Customers

## Order Management

- Create Orders
- Multiple Order Items
- Inventory Validation
- Order Cancellation
- Automatic Stock Reduction

## Dashboard

- Total Products
- Total Customers
- Total Orders
- Revenue Tracking
- Inventory Overview

## Production Features

- Dockerized Application
- PostgreSQL Database
- Alembic Database Migrations
- Environment Variable Configuration
- CORS Configuration
- Production Deployment

---

# Tech Stack

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic
- Pydantic
- Uvicorn

## Frontend

- React
- React Router
- Axios
- Recharts
- React Toastify

## DevOps

- Docker
- Docker Compose

## Deployment

- Render (Backend)
- Render PostgreSQL
- Vercel (Frontend)

---

# Architecture

```text
React Frontend (Vercel)
           │
           ▼
FastAPI Backend (Render)
           │
           ▼
PostgreSQL Database (Render)
```

---

# Project Structure

```text
Inventory_Management_System
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── core
│   │   ├── db
│   │   ├── models
│   │   ├── schemas
│   │   ├── services
│   │   └── main.py
│   │
│   ├── alembic
│   ├── Dockerfile
│   ├── startup.sh
│   ├── seed_data.py
│   └── requirements.txt
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── layouts
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   └── utils
│   │
│   ├── Dockerfile
│   └── vite.config.js
│
├── docker-compose.yml
│
└── README.md
```

---

# API Endpoints

## Products

```http
GET    /products
POST   /products
PUT    /products/{id}
DELETE /products/{id}
```

## Customers

```http
GET    /customers
POST   /customers
DELETE /customers/{id}
```

## Orders

```http
GET    /orders
POST   /orders
POST   /orders/{id}/cancel
```

## Dashboard

```http
GET /dashboard
```

## Health Check

```http
GET /health
```

---

# Local Development Setup

## Clone Repository

```bash
git clone https://github.com/Rohan623-web/inventory-management-system.git

cd inventory-management-system
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt
```

Create `.env`

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/inventory_db

SECRET_KEY=change_me

ENVIRONMENT=development

BACKEND_CORS_ORIGINS=http://localhost:5173
```

Run Backend

```bash
uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:8000
```

Run Frontend

```bash
npm run dev
```

---

# Docker Setup

Build and Run

```bash
docker compose up --build
```

Application URLs

```text
Frontend:
http://localhost:3000

Backend:
http://localhost:8000

Swagger:
http://localhost:8000/docs
```

---

# Database Migrations

Create Migration

```bash
alembic revision --autogenerate -m "migration_name"
```

Apply Migration

```bash
alembic upgrade head
```

---

# Screenshots

Add screenshots inside:

```text
screenshots/
```

Recommended:

```text
dashboard.png
products.png
customers.png
orders.png
```

Example:

```markdown
## Dashboard

![Dashboard](screenshots/dashboard.png)

## Products

![Products](screenshots/products.png)

## Customers

![Customers](screenshots/customers.png)

## Orders

![Orders](screenshots/orders.png)
```

---

# Deployment

## Backend

- Render Web Service
- PostgreSQL Database on Render

## Frontend

- Vercel Deployment

---

# Future Improvements

- JWT Authentication
- Role Based Access Control
- Advanced Inventory Reports
- Pagination
- Search & Filters
- Unit Tests
- CI/CD Pipeline

---

# Author

**Rohan Yadav**

Full Stack Developer

Inventory Management System Assessment Project

---

## Live URLs

Frontend:
https://inventory-management-system-qrn32088l-rohan623-webs-projects.vercel.app/

Backend:
https://inventory-backend-0c45.onrender.com/

Swagger Docs:
https://inventory-backend-0c45.onrender.com/docs
