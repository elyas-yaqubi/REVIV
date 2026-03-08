import base64
import asyncio
from fastapi import HTTPException, UploadFile

ALLOWED_MIME = {"image/jpeg", "image/png", "image/webp"}
MAX_SIZE = 5 * 1024 * 1024  # 5MB

_cloudinary_configured = False


def _try_configure_cloudinary() -> bool:
    try:
        import cloudinary
        import cloudinary.uploader
        from app.core.config import settings
        if settings.CLOUDINARY_CLOUD_NAME and settings.CLOUDINARY_API_KEY and settings.CLOUDINARY_API_SECRET:
            cloudinary.config(
                cloud_name=settings.CLOUDINARY_CLOUD_NAME,
                api_key=settings.CLOUDINARY_API_KEY,
                api_secret=settings.CLOUDINARY_API_SECRET,
                secure=True,
            )
            return True
    except Exception:
        pass
    return False


_cloudinary_configured = _try_configure_cloudinary()


async def save_file(file: UploadFile, resource_type: str) -> str:
    content_type = file.content_type
    if content_type not in ALLOWED_MIME:
        raise HTTPException(status_code=400, detail=f"Invalid file type: {content_type}")

    data = await file.read()
    if len(data) > MAX_SIZE:
        raise HTTPException(status_code=400, detail="File exceeds 5MB limit")

    if _cloudinary_configured:
        import cloudinary.uploader
        result = await asyncio.get_event_loop().run_in_executor(
            None,
            lambda: cloudinary.uploader.upload(
                data,
                folder=f"reviv/{resource_type}",
                resource_type="image",
            ),
        )
        return result["secure_url"]

    # Fallback: base64 data URI (works without external storage)
    encoded = base64.b64encode(data).decode("utf-8")
    return f"data:{content_type};base64,{encoded}"
