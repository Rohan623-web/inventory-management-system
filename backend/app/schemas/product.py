from uuid import UUID
from decimal import Decimal

from pydantic import BaseModel, Field


class ProductCreate(BaseModel):
    name: str = Field(..., min_length=1)
    sku: str = Field(..., min_length=1)
    price: Decimal = Field(..., gt=0)
    stock_quantity: int = Field(..., ge=0)


class ProductUpdate(BaseModel):
    name: str | None = None
    sku: str | None = None
    price: Decimal | None = Field(None, gt=0)
    stock_quantity: int | None = Field(None, ge=0)


class ProductResponse(BaseModel):
    id: UUID
    name: str
    sku: str
    price: Decimal
    stock_quantity: int

    class Config:
        from_attributes = True