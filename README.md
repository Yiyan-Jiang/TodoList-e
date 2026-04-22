# TodoList 全栈应用

练手项目，前后端分离，前端使用 React + Redux Toolkit，后端使用 FastAPI + SQLAlchemy。

## 🚀 技术栈

### 前端
- **React 19** - 用户界面框架
- **Redux Toolkit** - 状态管理
- **React Router v7** - 路由管理
- **Tailwind CSS v4** - 样式框架
- **Vite** - 构建工具
- **Axios** - HTTP 客户端

### 后端
- **FastAPI** - Python Web 框架
- **SQLAlchemy 2.0** - ORM 框架
- **MySQL** - 数据库
- **Pydantic v2** - 数据验证
- **Uvicorn** - ASGI 服务器

## 📁 项目结构

```
TodoList/
├── frontend/                 # 前端代码
│   ├── src/
│   │   ├── apis/            # API 接口封装
│   │   ├── component/       # 组件
│   │   │   ├── Head.jsx     # 添加待办输入框
│   │   │   ├── List.jsx     # 待办列表展示
│   │   │   └── Footer.jsx   # 底部导航
│   │   ├── pages/           # 页面组件
│   │   │   └── Layout.jsx   # 布局组件
│   │   ├── router/          # 路由配置
│   │   │   ├── index.jsx    # 路由定义
│   │   │   ├── show.jsx     # 主页面
│   │   │   └── Search.jsx   # 搜索页面
│   │   ├── store/           # Redux 状态管理
│   │   │   ├── index.js     # Store 配置
│   │   │   ├── hooks.js     # 自定义 Hooks
│   │   │   └── slices/      # Redux Slices
│   │   │       ├── todoSlice.js    # 待办状态管理
│   │   │       └── searchSlice.js  # 搜索状态管理
│   │   └── main.jsx         # 应用入口
│   └── package.json         # 前端依赖
├── backend/                 # 后端代码
│   ├── routers/
│   │   └── todos.py         # 待办路由
│   ├── models.py           # 数据模型
│   ├── schemas.py          # Pydantic 模型
│   ├── crud.py             # 数据库操作
│   ├── database.py         # 数据库配置
│   └── main.py             # 应用入口
├── 接口文档.html           # API 文档
└── README.md               # 项目说明
```

## 🛠️ 安装与运行

### 环境要求
- Node.js 18+ 和 npm
- Python 3.8+
- MySQL 8.0+

### 数据库设置
1. 启动 MySQL 服务
2. 创建数据库：
   ```sql
   CREATE DATABASE todo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

### 后端启动
```bash
# 进入后端目录
cd backend

# 创建虚拟环境（可选）
python -m venv venv

# 激活虚拟环境
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 安装依赖
pip install fastapi uvicorn sqlalchemy pymysql aiomysql pydantic

# 启动服务
python main.py
```



### 前端启动
```bash
# 进入前端目录
cd fronten
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```


