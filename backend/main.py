import uvicorn
from fastapi import FastAPI
from database import engine, Base
from routers.todos import router as todos_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Todos API",
    description="Todos API",
    version="1.0",
)

app.include_router(todos_router)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

origins = [
    "http://localhost:5174",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000 , reload=True)
