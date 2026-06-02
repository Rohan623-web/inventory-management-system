from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class CustomerCreate(BaseModel):
    full_name: str = Field(..., min_length=2)
    email: EmailStr
    phone: str = Field(..., min_length=5)


class CustomerResponse(BaseModel):
    id: UUID
    full_name: str
    email: str
    phone: str

    class Config:
        from_attributes = True