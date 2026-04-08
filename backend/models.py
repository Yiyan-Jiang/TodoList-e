from sqlalchemy import Column, Integer, String, Boolean, DateTime
from database import Base

# 建数据库表
class Todo(Base):
    __tablename__ = 'todos'

    id: int = Column(Integer, primary_key=True)
    todo: str = Column(String(30), nullable=False)
    completed: bool = Column(Boolean, default=False)

