# 📦 Inventory Management System

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react\&logoColor=white)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql\&logoColor=white)
![Docker](https://img.shields.io/badge/Containerized-Docker-2496ED?logo=docker\&logoColor=white)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel)
![Status](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-green)

A production-ready full-stack Inventory Management System built with **FastAPI**, **React**, and **PostgreSQL**. The application enables businesses to efficiently manage products, customers, inventory, and orders while providing real-time dashboard analytics and inventory validation.

---

## 🚀 Live Demo

### Frontend Application

https://inventory-management-system-qrn32088l-rohan623-webs-projects.vercel.app/

### Backend API

https://inventory-backend-0c45.onrender.com/

### Swagger API Documentation

https://inventory-backend-0c45.onrender.com/docs

---

# ✨ Features

## 📦 Product Management

* Create Products
* Update Products
* Delete Products
* Manage Inventory Stock
* SKU Management
* Product Price Tracking
* Low Stock Monitoring

## 👥 Customer Management

* Add New Customers
* View Customer Details
* Delete Customers
* Customer Order Association

## 🛒 Order Management

* Create Orders
* Multiple Order Items
* Inventory Validation
* Automatic Stock Reduction
* Order Cancellation
* Revenue Calculation

## 📊 Dashboard Analytics

* Total Products
* Total Customers
* Total Orders
* Revenue Overview
* Inventory Statistics
* Business Summary Metrics

## 🐳 Production Features

* Dockerized Architecture
* PostgreSQL Database
* Alembic Migrations
* Environment Variables
* CORS Configuration
* Auto Database Seeding
* Cloud Deployment

---

# 🛠️ Tech Stack

## Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* Alembic
* Pydantic
* Uvicorn

## Frontend

* React
* React Router DOM
* Axios
* Recharts
* React Toastify

## Database

* PostgreSQL

## DevOps

* Docker
* Docker Compose

## Deployment

* Render (Backend)
* Render PostgreSQL
* Vercel (Frontend)

---

# 🏗️ System Architecture

```text
┌─────────────────────┐
│     React App       │
│      (Vercel)       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      FastAPI        │
│      (Render)       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     PostgreSQL      │
│      (Render)       │
└─────────────────────┘
```

---

# 📁 Project Structure

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
│   ├── requirements.txt
│   └── .env.example
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
│   ├── nginx.conf
│   └── vite.config.js
│
├── docker-compose.yml
│
└── README.md
```

---

# 🔌 API Endpoints

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

# 💻 Local Development Setup

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

### Create `.env`

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/inventory_db

SECRET_KEY=change_me

ENVIRONMENT=development

BACKEND_CORS_ORIGINS=http://localhost:5173
```

### Run Backend

```bash
uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

### Create `.env`

```env
VITE_API_URL=http://localhost:8000
```

### Run Frontend

```bash
npm run dev
```

---

# 🐳 Docker Setup

## Run Entire Application

```bash
docker compose up --build
```

### Local URLs

```text
Frontend:
http://localhost:3000

Backend:
http://localhost:8000

Swagger Docs:
http://localhost:8000/docs
```

---

# 🗄️ Database Migrations

## Create Migration

```bash
alembic revision --autogenerate -m "migration_name"
```

## Apply Migration

```bash
alembic upgrade head
```

---

# ☁️ Deployment

## Backend Deployment

* Render Web Service
* PostgreSQL Database on Render

## Frontend Deployment

* Vercel

### Production URLs

Frontend:
https://inventory-management-system-qrn32088l-rohan623-webs-projects.vercel.app/

Backend:
https://inventory-backend-0c45.onrender.com/

Swagger Docs:
https://inventory-backend-0c45.onrender.com/docs

---

# 🎯 Key Highlights

* Full CRUD Operations
* Inventory Validation System
* Real-Time Dashboard Metrics
* Dockerized Architecture
* Database Migrations with Alembic
* Automatic Seed Data Generation
* Production Deployment
* Responsive User Interface
* RESTful API Design
* PostgreSQL Relational Database

---

# 🔮 Future Enhancements

* JWT Authentication
* Role-Based Access Control
* Advanced Reporting
* Search & Filtering
* Pagination
* Export Reports (PDF/Excel)
* Email Notifications
* CI/CD Pipeline
* Unit & Integration Testing

---

# 👨‍💻 Author

### Rohan Yadav

Full Stack Developer

Inventory Management System Assessment Project

---

⭐ If you found this project useful, consider giving it a star.
