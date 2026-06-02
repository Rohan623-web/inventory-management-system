from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings

from app.api.products import router as product_router
from app.api.customers import router as customer_router
from app.api.orders import router as order_router
from app.api.dashboard import router as dashboard_router

app = FastAPI(
    title="Inventory Management API"
)

cors_origins = [
    origin.strip()
    for origin in settings.BACKEND_CORS_ORIGINS.split(",")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)
app.include_router(dashboard_router)


@app.get("/")
def home():
    return {
        "message": "Inventory Management API Running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }