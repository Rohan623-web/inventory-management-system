from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.product import Product
from app.schemas.product import (
    ProductCreate,
    ProductUpdate,
    ProductResponse,
)

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


# CREATE PRODUCT
@router.post(
    "",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_product(
    product_data: ProductCreate,
    db: Session = Depends(get_db),
):
    existing_product = (
        db.query(Product)
        .filter(Product.sku == product_data.sku)
        .first()
    )

    if existing_product:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="SKU already exists",
        )

    product = Product(
        name=product_data.name,
        sku=product_data.sku,
        price=product_data.price,
        stock_quantity=product_data.stock_quantity,
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    return product


# GET ALL PRODUCTS
@router.get(
    "",
    response_model=list[ProductResponse],
)
def get_products(
    db: Session = Depends(get_db),
):
    products = db.query(Product).all()
    return products


# GET PRODUCT BY ID
@router.get(
    "/{product_id}",
    response_model=ProductResponse,
)
def get_product(
    product_id: UUID,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    return product


# UPDATE PRODUCT
@router.put(
    "/{product_id}",
    response_model=ProductResponse,
)
def update_product(
    product_id: UUID,
    product_data: ProductUpdate,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    if product_data.sku:
        existing_product = (
            db.query(Product)
            .filter(
                Product.sku == product_data.sku,
                Product.id != product_id,
            )
            .first()
        )

        if existing_product:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="SKU already exists",
            )

    update_data = product_data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(product, field, value)

    db.commit()
    db.refresh(product)

    return product


# DELETE PRODUCT
@router.delete(
    "/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_product(
    product_id: UUID,
    db: Session = Depends(get_db),
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    db.delete(product)
    db.commit()

    return None