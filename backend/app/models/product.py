from sqlalchemy import Column, String, Integer, Numeric
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base

import uuid


class Product(Base):
    __tablename__ = "products"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    name = Column(
        String(255),
        nullable=False
    )

    sku = Column(
        String(100),
        unique=True,
        nullable=False
    )

    price = Column(
        Numeric(10, 2),
        nullable=False
    )

    stock_quantity = Column(
        Integer,
        nullable=False
    )