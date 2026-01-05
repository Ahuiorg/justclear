# JustClear 眼镜店官网

这是一个眼镜店官网项目，包含前台展示和管理后台。

## 技术栈

- **前端**: React + TypeScript + Vite + Tailwind CSS
- **后端**: Supabase (PostgreSQL + Auth + RLS)
- **UI 组件**: shadcn/ui

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置 Supabase

1. 前往 [Supabase](https://supabase.com) 创建一个新项目
2. 复制项目的 URL 和 anon key（在 Settings -> API 中找到）
3. 在项目根目录创建 `.env` 文件：

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. 初始化数据库

在 Supabase Dashboard -> SQL Editor 中依次执行以下脚本：

1. `supabase/init.sql` - 创建数据库表和 RLS 策略
2. `supabase/admin-users.sql` - 初始化管理员账户
3. `supabase/seed.sql` - 填充初始数据

### 4. 启动开发服务器

```bash
pnpm dev
```

## 管理后台

访问 `/admin` 进入管理后台。

### 默认管理员账户

| 账户 | 邮箱 | 默认密码 | 角色 |
|------|------|----------|------|
| admin | admin@justclear.local | `justclear_2026` | 超级管理员 |
| justclear | justclear@justclear.local | `justclear_2026` | 管理员 |

> ⚠️ **安全提醒**: 部署后请立即修改默认密码！

### 功能模块

- **仪表盘**: 查看网站数据概览
- **预约管理**: 查看和处理用户预约
- **产品管理**: 管理产品信息（CRUD）
- **分类管理**: 管理产品分类
- **服务管理**: 管理服务项目
- **站点设置**: 配置首页横幅、联系信息、关于我们等内容

## 项目结构

```
src/
├── admin/                 # 管理后台模块
│   ├── components/        # 管理后台组件
│   └── pages/             # 管理后台页面
├── components/            # 前台组件
├── hooks/                 # React Hooks
│   ├── useAppointment.ts  # 预约提交
│   ├── useAuth.ts         # 管理员认证
│   ├── useProducts.ts     # 产品数据
│   ├── useCategories.ts   # 分类数据
│   ├── useServices.ts     # 服务数据
│   ├── useSiteConfig.ts   # 站点配置
│   └── useStats.ts        # 统计数据
├── lib/
│   └── supabase.ts        # Supabase 客户端
├── types/
│   └── database.ts        # TypeScript 类型定义
└── data/
    └── products.ts        # 静态数据 (Fallback)

supabase/
├── init.sql               # 数据库初始化脚本
├── admin-users.sql        # 管理员账户初始化
└── seed.sql               # 初始数据填充
```

## 数据 Fallback

当 Supabase 未配置或连接失败时，前台会自动使用 `src/data/products.ts` 中的静态数据作为 fallback，确保网站正常展示。

## 部署

1. 确保已配置环境变量
2. 构建生产版本：

```bash
pnpm build
```

3. 部署 `dist` 目录到静态托管服务（如 Vercel、Netlify）

## 原始设计

原始 Figma 设计文件：https://www.figma.com/design/tsZ9xYFxzOYUGSgE1Jzw4l/眼镜店官网
