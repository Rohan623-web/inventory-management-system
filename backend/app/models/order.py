from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Numeric
from sqlalchemy import String

from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.orm import relationship

from app.db.database import Base

import uuid


class Order(Base):
    __tablename__ = "orders"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    customer_id = Column(
        UUID(as_uuid=True),
        ForeignKey("customers.id"),
        nullable=False
    )

    customer = relationship("Customer")

    total_amount = Column(
        Numeric(10, 2),
        nullable=False,
        default=0
    )

    status = Column(
        String(20),
        nullable=False,
        default="COMPLETED"
    )

    items = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan"
    )