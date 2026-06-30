from pydantic import BaseModel


class DocumentUploadResponse(BaseModel):
    filename: str
    document_type: str
    status: str
    message: str
