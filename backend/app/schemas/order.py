from uuid import UUID
from decimal import Decimal

from pydantic import BaseModel, Field


class OrderItemCreate(BaseModel):
    product_id: UUID
    quantity: int = Field(..., gt=0)


class OrderCreate(BaseModel):
    customer_id: UUID
    items: list[OrderItemCreate] = Field(
        ...,
        min_length=1
    )


class OrderItemResponse(BaseModel):
    product_id: UUID
    quantity: int
    unit_price: Decimal
    line_total: Decimal

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    id: UUID
    customer_id: UUID
    total_amount: Decimal
    status: str
    items: list[OrderItemResponse]

    class Config:
        from_attributes = True