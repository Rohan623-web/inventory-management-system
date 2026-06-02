#!/bin/sh

set -e

echo "Running migrations..."
alembic upgrade head

echo "Running seed data..."
python seed_data.py

echo "Starting FastAPI..."
exec uvicorn app.main:app --host 0.0.0.0 --port $PORT