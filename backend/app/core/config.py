from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str

    ENVIRONMENT: str = "development"

    SECRET_KEY: str = "change-me"

    BACKEND_CORS_ORIGINS: str = (
        "http://localhost:3000,http://localhost:5173"
    )

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()