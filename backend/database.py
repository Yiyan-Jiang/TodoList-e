from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase

Database_URL = 'mysql+aiomysql://root:123456@localhost:3306/todo_db'
# 本地数据库地址。已提前建库todo_db

engine = create_async_engine(Database_URL , echo=True)
# 创建数据库引擎 ，异步执行SQL语句

asysession = async_sessionmaker(
    bind=engine,
    expire_on_commit=False,
    class_=AsyncSession
) # 创建异步会话工厂

class Base(DeclarativeBase):
    pass
    #创建ORM模型，这里为空

async def get_db():
    async with asysession() as session:
        try:
            yield session
        finally:
            await session.close()
#生成一个数据库会话，使用完毕后自动关闭