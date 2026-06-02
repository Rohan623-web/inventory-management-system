from decimal import Decimal

from app.db.database import SessionLocal

from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order
from app.models.order_item import OrderItem


db = SessionLocal()

# Skip if already seeded
if db.query(Order).count() > 0:
    print("Database already seeded. Skipping.")
    db.close()
    exit(0)

print("Seeding database...")

# --------------------------------------------------
# PRODUCTS
# --------------------------------------------------

products = [
    Product(
        name="Dell Latitude 5440",
        sku="DEL001",
        price=Decimal("65000"),
        stock_quantity=25,
    ),
    Product(
        name="HP ProBook 450",
        sku="HP001",
        price=Decimal("60000"),
        stock_quantity=18,
    ),
    Product(
        name="Logitech Mouse",
        sku="LOG001",
        price=Decimal("999"),
        stock_quantity=120,
    ),
    Product(
        name="Mechanical Keyboard",
        sku="KEY001",
        price=Decimal("2999"),
        stock_quantity=60,
    ),
    Product(
        name="Samsung Monitor",
        sku="MON001",
        price=Decimal("14999"),
        stock_quantity=15,
    ),
    Product(
        name="USB Hub",
        sku="USB001",
        price=Decimal("799"),
        stock_quantity=80,
    ),
    Product(
        name="External SSD",
        sku="SSD001",
        price=Decimal("4999"),
        stock_quantity=40,
    ),
    Product(
        name="Webcam HD",
        sku="CAM001",
        price=Decimal("2499"),
        stock_quantity=30,
    ),
    Product(
        name="Office Chair",
        sku="CHR001",
        price=Decimal("8999"),
        stock_quantity=12,
    ),
    Product(
        name="Desk Lamp",
        sku="LMP001",
        price=Decimal("1299"),
        stock_quantity=50,
    ),
]

# --------------------------------------------------
# CUSTOMERS
# --------------------------------------------------

customers = [
    Customer(
        full_name="Aman Kumar",
        email="aman@example.com",
        phone="9876543210",
    ),
    Customer(
        full_name="Rahul Sharma",
        email="rahul@example.com",
        phone="9876543211",
    ),
    Customer(
        full_name="Priya Verma",
        email="priya@example.com",
        phone="9876543212",
    ),
    Customer(
        full_name="Neha Gupta",
        email="neha@example.com",
        phone="9876543213",
    ),
    Customer(
        full_name="Arjun Singh",
        email="arjun@example.com",
        phone="9876543214",
    ),
]

db.add_all(products)
db.add_all(customers)

db.commit()

# Refresh IDs
for product in products:
    db.refresh(product)

for customer in customers:
    db.refresh(customer)

print("Creating demo orders...")

orders_data = [
    {
        "customer": customers[0],
        "status": "COMPLETED",
        "items": [
            (products[0], 1),
            (products[2], 2),
        ],
    },
    {
        "customer": customers[1],
        "status": "COMPLETED",
        "items": [
            (products[1], 1),
            (products[3], 1),
        ],
    },
    {
        "customer": customers[2],
        "status": "COMPLETED",
        "items": [
            (products[4], 2),
        ],
    },
    {
        "customer": customers[3],
        "status": "COMPLETED",
        "items": [
            (products[6], 3),
        ],
    },
    {
        "customer": customers[4],
        "status": "COMPLETED",
        "items": [
            (products[8], 1),
            (products[9], 2),
        ],
    },
    {
        "customer": customers[0],
        "status": "COMPLETED",
        "items": [
            (products[5], 5),
        ],
    },
    {
        "customer": customers[1],
        "status": "COMPLETED",
        "items": [
            (products[7], 2),
            (products[2], 1),
        ],
    },
    {
        "customer": customers[2],
        "status": "COMPLETED",
        "items": [
            (products[0], 1),
        ],
    },
    {
        "customer": customers[3],
        "status": "CANCELLED",
        "items": [
            (products[1], 1),
        ],
    },
    {
        "customer": customers[4],
        "status": "CANCELLED",
        "items": [
            (products[4], 1),
        ],
    },
]

# --------------------------------------------------
# CREATE ORDERS
# --------------------------------------------------

for order_data in orders_data:

    order = Order(
        customer_id=order_data["customer"].id,
        status=order_data["status"],
        total_amount=Decimal("0"),
    )

    db.add(order)
    db.flush()

    total_amount = Decimal("0")

    for product, quantity in order_data["items"]:

        line_total = product.price * quantity

        item = OrderItem(
            order_id=order.id,
            product_id=product.id,
            quantity=quantity,
            unit_price=product.price,
            line_total=line_total,
        )

        db.add(item)

        total_amount += line_total

        # Reduce inventory only for completed orders
        if order.status == "COMPLETED":
            product.stock_quantity -= quantity

    order.total_amount = total_amount

db.commit()

print("================================")
print("Demo data inserted successfully")
print(f"Products: {len(products)}")
print(f"Customers: {len(customers)}")
print(f"Orders: {len(orders_data)}")
print("================================")

db.close()