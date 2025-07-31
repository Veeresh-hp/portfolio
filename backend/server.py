import os
import logging
from pathlib import Path
from typing import List
from contextlib import asynccontextmanager
from datetime import datetime, timezone

from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

# Pydantic & BSON Integration
from bson import ObjectId
from pydantic import BaseModel, Field, ConfigDict

# --- Application Setup ---

# Load environment variables from a .env file
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging for the application
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# --- Database Connection ---

# This context manager handles the application's startup and shutdown events.
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Connect to the MongoDB database on application startup and
    close the connection on application shutdown.
    """
    logger.info("Starting up application...")
    try:
        # Create the MongoDB client and attach the database to the app state
        app.db_client = AsyncIOMotorClient(os.environ['MONGO_URL'])
        app.mongodb = app.db_client[os.environ['DB_NAME']]
        logger.info("Successfully connected to MongoDB.")
        yield
    finally:
        # Cleanly close the connection when the application stops
        if hasattr(app, 'db_client'):
            logger.info("Closing MongoDB connection...")
            app.db_client.close()
            logger.info("MongoDB connection closed.")

# Create the main FastAPI app instance with the lifespan manager
app = FastAPI(
    title="My FastAPI Backend",
    description="A backend service with status checks.",
    lifespan=lifespan
)

# --- Pydantic Models ---

class StatusCheckCreate(BaseModel):
    """Model for creating a new status check (input)."""
    client_name: str = Field(..., example="Web Frontend")

class StatusCheck(BaseModel):
    """
    Model for representing a status check from the database (output).
    It correctly handles MongoDB's `_id` and data serialization.
    """
    # Use an alias to map MongoDB's `_id` to our `id` field.
    id: str = Field(..., alias="_id", description="The unique identifier from MongoDB.", example="60d5ec49f7e4e2a4e8f3b8e4")
    client_name: str = Field(..., example="Web Frontend")
    timestamp: datetime = Field(..., description="The UTC timestamp when the check was created.")

    model_config = ConfigDict(
        # Allows Pydantic to populate the model using field names OR aliases
        populate_by_name=True,
        # Allows use of types like ObjectId, which aren't native Pydantic types
        arbitrary_types_allowed=True,
        # Defines a custom serializer for ObjectId to convert it to a string in JSON responses
        json_encoders={ObjectId: str}
    )

# --- API Router and Routes ---

api_router = APIRouter(prefix="/api")

@api_router.get("/", summary="API Root", include_in_schema=False)
async def api_root():
    """A simple endpoint to confirm the API router is working."""
    return {"message": "Welcome to the API"}

# Corrected line
@api_router.post("/status", response_model=StatusCheck, status_code=201, summary="Create a Status Check")
async def create_status_check(input_data: StatusCheckCreate):
    """
    Creates a new status check record in the database.
    - Receives a client name.
    - Adds a server-side, timezone-aware UTC timestamp.
    - Returns the complete created object.
    """
    status_document = input_data.model_dump()
    # Use the modern, timezone-aware method for generating the UTC timestamp.
    status_document["timestamp"] = datetime.now(timezone.utc)

    result = await app.mongodb.status_checks.insert_one(status_document)

    # Fetch the newly created document to return the full, consistent data.
    created_document = await app.mongodb.status_checks.find_one(
        {"_id": result.inserted_id}
    )
    return created_document

@api_router.get("/status", response_model=List[StatusCheck], summary="Get All Status Checks")
async def get_status_checks():
    """Retrieves a list of all status checks from the database."""
    status_checks = await app.mongodb.status_checks.find().to_list(1000)
    return status_checks

# --- App Configuration ---

# Add CORS middleware to allow cross-origin requests from any source.
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the API router in the main application.
app.include_router(api_router)

@app.get("/", summary="Application Root Health Check")
async def root():
    """A simple health check endpoint for the entire application."""
    return {"message": "FastAPI backend is working!"}

# --- Main Execution Block ---

if __name__ == "__main__":
    import uvicorn
    # This block allows running the server directly with `python server.py`
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)