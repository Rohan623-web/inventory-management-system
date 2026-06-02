from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.models.customer import Customer
from app.models.product import Product
from app.models.order import Order
from app.models.order_item import OrderItem

from app.schemas.order import (
    OrderCreate,
    OrderResponse
)

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


# CREATE ORDER
@router.post(
    "",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED
)
def create_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db)
):
    try:
        customer = (
            db.query(Customer)
            .filter(Customer.id == order_data.customer_id)
            .first()
        )

        if not customer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Customer not found"
            )

        total_amount = 0
        order_items = []

        for item in order_data.items:

            product = (
                db.query(Product)
                .filter(Product.id == item.product_id)
                .first()
            )

            if not product:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Product {item.product_id} not found"
                )

            if product.stock_quantity < item.quantity:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Insufficient stock for {product.name}"
                )

            line_total = product.price * item.quantity

            total_amount += line_total

            order_items.append({
                "product": product,
                "quantity": item.quantity,
                "unit_price": product.price,
                "line_total": line_total
            })

        order = Order(
            customer_id=order_data.customer_id,
            total_amount=total_amount,
            status="COMPLETED"
        )

        db.add(order)
        db.flush()

        for item in order_items:

            order_item = OrderItem(
                order_id=order.id,
                product_id=item["product"].id,
                quantity=item["quantity"],
                unit_price=item["unit_price"],
                line_total=item["line_total"]
            )

            db.add(order_item)

            item["product"].stock_quantity -= item["quantity"]

        db.commit()
        db.refresh(order)

        return order

    except HTTPException:
        db.rollback()
        raise

    except Exception:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Order creation failed"
        )


# GET ALL ORDERS
@router.get(
    "",
    response_model=list[OrderResponse]
)
def get_orders(
    db: Session = Depends(get_db)
):
    return db.query(Order).all()


# GET ORDER BY ID
@router.get(
    "/{order_id}",
    response_model=OrderResponse
)
def get_order(
    order_id: UUID,
    db: Session = Depends(get_db)
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )

    return order


# CANCEL ORDER
@router.post(
    "/{order_id}/cancel"
)
def cancel_order(
    order_id: UUID,
    db: Session = Depends(get_db)
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )

    if order.status == "CANCELLED":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order already cancelled"
        )

    for item in order.items:

        product = (
            db.query(Product)
            .filter(Product.id == item.product_id)
            .first()
        )

        if product:
            product.stock_quantity += item.quantity

    order.status = "CANCELLED"

    db.commit()

    return {
        "message": "Order cancelled successfully"
    }