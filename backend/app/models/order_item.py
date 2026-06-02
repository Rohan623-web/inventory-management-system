from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Numeric
from sqlalchemy import ForeignKey

from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.orm import relationship

from app.db.database import Base

import uuid


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    order_id = Column(
        UUID(as_uuid=True),
        ForeignKey("orders.id"),
        nullable=False
    )

    product_id = Column(
        UUID(as_uuid=True),
        ForeignKey("products.id"),
        nullable=False
    )

    product = relationship("Product")

    quantity = Column(
        Integer,
        nullable=False
    )

    unit_price = Column(
        Numeric(10, 2),
        nullable=False
    )

    line_total = Column(
        Numeric(10, 2),
        nullable=False
    )

    order = relationship(
        "Order",
        back_populates="items"
    )