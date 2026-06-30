from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "TaxPilot AI"
    app_env: str = "development"
    database_url: str = "postgresql+psycopg://taxpilot:taxpilot@localhost:5432/taxpilot"
    redis_url: str = "redis://localhost:6379/0"
    openai_api_key: str = ""
    storage_bucket: str = ""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
