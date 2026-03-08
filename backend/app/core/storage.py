import base64
from fastapi import HTTPException, UploadFile

ALLOWED_MIME = {"image/jpeg", "image/png", "image/webp"}
MAX_SIZE = 5 * 1024 * 1024  # 5MB


async def save_file(file: UploadFile, resource_type: str) -> str:
    """Store the file as a base64 data URI so it travels with the MongoDB document
    and works across all environments without shared filesystem storage."""
    content_type = file.content_type
    if content_type not in ALLOWED_MIME:
        raise HTTPException(status_code=400, detail=f"Invalid file type: {content_type}")

    data = await file.read()
    if len(data) > MAX_SIZE:
        raise HTTPException(status_code=400, detail="File exceeds 5MB limit")

    encoded = base64.b64encode(data).decode("utf-8")
    return f"data:{content_type};base64,{encoded}"
