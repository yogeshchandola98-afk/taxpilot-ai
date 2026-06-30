from fastapi import APIRouter, UploadFile

from app.schemas.documents import DocumentUploadResponse
from app.services.document_intelligence import classify_document

router = APIRouter()


@router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document(file: UploadFile) -> DocumentUploadResponse:
    document_type = classify_document(file.filename or "unknown")
    return DocumentUploadResponse(
        filename=file.filename or "unknown",
        document_type=document_type,
        status="queued_for_review",
        message="Document received. Extraction must be reviewed by the user before return generation.",
    )
