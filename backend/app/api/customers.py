from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.customer import Customer
from app.schemas.customer import (
    CustomerCreate,
    CustomerResponse,
)

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


# CREATE CUSTOMER
@router.post(
    "",
    response_model=CustomerResponse,
    status_code=status.HTTP_201_CREATED
)
def create_customer(
    customer_data: CustomerCreate,
    db: Session = Depends(get_db)
):
    existing_customer = (
        db.query(Customer)
        .filter(Customer.email == customer_data.email)
        .first()
    )

    if existing_customer:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already exists"
        )

    customer = Customer(
        full_name=customer_data.full_name,
        email=customer_data.email,
        phone=customer_data.phone
    )

    db.add(customer)
    db.commit()
    db.refresh(customer)

    return customer


# GET ALL CUSTOMERS
@router.get(
    "",
    response_model=list[CustomerResponse]
)
def get_customers(
    db: Session = Depends(get_db)
):
    customers = db.query(Customer).all()

    return customers


# GET CUSTOMER BY ID
@router.get(
    "/{customer_id}",
    response_model=CustomerResponse
)
def get_customer(
    customer_id: UUID,
    db: Session = Depends(get_db)
):
    customer = (
        db.query(Customer)
        .filter(Customer.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )

    return customer


# DELETE CUSTOMER
@router.delete(
    "/{customer_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_customer(
    customer_id: UUID,
    db: Session = Depends(get_db)
):
    customer = (
        db.query(Customer)
        .filter(Customer.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )

    db.delete(customer)
    db.commit()

    return None