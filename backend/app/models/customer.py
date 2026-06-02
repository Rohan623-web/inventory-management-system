from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base
import uuid


class Customer(Base):
    __tablename__ = "customers"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    full_name = Column(
        String(255),
        nullable=False
    )

    email = Column(
        String(255),
        unique=True,
        nullable=False
    )

    phone = Column(
        String(50),
        nullable=False
    )