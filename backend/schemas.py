from pydantic import BaseModel, Field
from typing import Optional

class TodoBase(BaseModel):
    todo: str = Field(..., min_length=1,max_length=30)
    completed: bool = False
# 基础模型， 对Todos做了限制

class TodoCreate(TodoBase):
    pass
# 创建的时候直接继承基础模型

class TodoUpdate(BaseModel):
    todo: Optional[str] = Field(None, min_length=1,max_length=30)
    completed: Optional[bool] = None
# 更新

class TodoResponse(TodoBase):
    id: int
    class Config:
        model_config = {"from_attributes": True} #允许Pydantic从SQLAlchemyORM对象中读取数据。
# 查询

