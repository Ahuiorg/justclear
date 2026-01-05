# 设计文档：Supabase 后端集成方案

## Context

### 背景

JustClear 是一个眼镜店官网，目前是纯前端静态网站，使用 React + Vite + TypeScript 构建。网站功能包括：
- 产品展示（太阳镜、光学镜架、隐形眼镜、儿童眼镜）
- 服务介绍
- 关于我们
- 联系预约表单

### 当前问题

1. **预约信息无法持久化**：用户提交预约表单后只显示 alert 提示，数据未被保存
2. **内容无法动态更新**：所有产品、服务等信息硬编码在 `src/data/products.ts` 和各组件中
3. **缺乏管理能力**：管理员无法查看预约或更新网站内容

### 约束条件

- 小型商业网站，预算有限
- 无专业运维人员
- 希望方案简单、易维护
- 不需要复杂的用户系统（暂不需要用户注册登录）

## Goals / Non-Goals

### Goals
- ✅ 实现预约表单数据持久化存储
- ✅ 支持产品和内容的数据库管理
- ✅ 使用开源、低成本方案
- ✅ 保持前端架构简单
- ✅ 数据安全（Row Level Security）

### Non-Goals
- ❌ 用户注册/登录系统（仅管理员登录）
- ❌ 预约确认邮件通知（暂不需要）
- ❌ 图片存储迁移（继续使用外链）
- ❌ 实时通知/消息推送
- ❌ 支付系统集成

## 方案评估

### 预约信息收集方案对比

| 方案 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| **Supabase Database** | 完全可控、可扩展、开源 | 需要配置数据库 | ⭐⭐⭐⭐⭐ |
| FormSpree/Formcarry | 零配置、即开即用 | 收费、数据在第三方、功能受限 | ⭐⭐⭐ |
| Email API (SendGrid) | 直接发邮件 | 无数据存储、难以统计 | ⭐⭐ |
| Google Forms | 免费、简单 | 体验差、与网站割裂 | ⭐⭐ |
| 自建 Node.js 后端 | 完全可控 | 维护成本高 | ⭐⭐ |

### 内容管理方案对比

| 方案 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| **Supabase + 自定义表** | 灵活、与预约系统统一 | 需开发管理界面 | ⭐⭐⭐⭐⭐ |
| Headless CMS (Strapi) | 功能完善 | 需要额外部署、学习成本 | ⭐⭐⭐ |
| Contentful/Sanity | 专业 CMS | 收费、过度复杂 | ⭐⭐ |
| MDX 文件 | 开发友好 | 非技术人员难以编辑 | ⭐⭐ |

### 为什么选择 Supabase

1. **开源免费**：自托管完全免费，云服务有免费层
2. **PostgreSQL 支持**：成熟可靠的数据库，支持复杂查询
3. **Row Level Security**：内置安全机制，无需额外后端
4. **实时功能**：内置实时订阅（未来可用于通知）
5. **文件存储**：可用于产品图片管理（未来扩展）
6. **TypeScript 支持**：与项目技术栈匹配
7. **统一方案**：预约和内容管理可以用同一个平台

## Decisions

### 决策 1: 使用 Supabase 云服务（非自托管）

**选择**：使用 Supabase 云托管服务  
**原因**：
- 免费层足够小型商业网站使用（500MB 数据库、1GB 文件存储）
- 无需运维成本
- 自动备份、自动扩展

**替代方案考虑**：
- 自托管 Supabase：需要服务器和运维，对于小型项目不划算

### 决策 2: 前端直连 Supabase（无中间后端）

**选择**：React 前端通过 supabase-js 直接与 Supabase 通信  
**原因**：
- 架构简单
- Row Level Security 提供安全保障
- 减少维护成本

**安全措施**：
- 使用 `anon` key（可公开）
- 配置严格的 RLS 策略
- 敏感操作使用 Edge Functions

### 决策 3: 预约表单使用匿名插入策略

**选择**：允许匿名用户插入预约记录，但不能读取或修改  
**原因**：
- 用户无需注册即可预约
- 数据只能由管理员查看

**RLS 策略**：
```sql
-- 允许匿名插入
CREATE POLICY "Anyone can insert appointments"
ON appointments FOR INSERT
TO anon
WITH CHECK (true);

-- 只有管理员可以查看
CREATE POLICY "Only admin can view appointments"
ON appointments FOR SELECT
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');
```

### 决策 4: 内容使用只读公开策略

**选择**：内容数据对所有用户只读公开  
**原因**：
- 产品、服务等信息本就是公开的
- 简化前端数据获取逻辑

**RLS 策略**：
```sql
-- 所有人可读
CREATE POLICY "Public read access"
ON products FOR SELECT
TO anon, authenticated
USING (true);

-- 只有管理员可以修改
CREATE POLICY "Only admin can modify"
ON products FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');
```

### 决策 5: 管理后台集成在同一项目内

**选择**：管理后台通过 `/admin` 路由集成在当前项目中  
**原因**：
- 代码复用（共享组件、类型、hooks）
- 部署简单（单一部署流程）
- 开发效率高（无需切换项目）

**实现方式**：
- 使用 React Router 的嵌套路由
- `/admin/*` 路由需要管理员认证
- 使用 Supabase Auth 进行登录验证
- 管理界面使用独立的布局组件

### 决策 8: 固定管理员账户（禁止注册）

**选择**：预设两个固定管理员账户，不开放注册功能  
**原因**：
- 简化权限管理
- 提高安全性（无公开注册入口）
- 满足小型商业网站需求

**预设账户**：

| 账户名 | 邮箱 | 默认密码 | 角色 |
|--------|------|----------|------|
| admin | admin@justclear.local | `justclear_2026` | 主管理员 |
| justclear | justclear@justclear.local | `justclear_2026` | 备用管理员 |

> ⚠️ **安全提醒**：部署后请立即修改默认密码！

**实现方式**：
- 通过 Supabase Admin API 或 SQL 函数初始化用户
- 前端登录页面不显示注册链接
- 通过 `admin_users` 表关联管理员信息
- 所有管理操作记录操作者 ID

**初始化 SQL 脚本**：
```sql
-- 步骤 1: 创建管理员用户（通过 Supabase Admin API 调用，或在 Supabase Dashboard 执行）
-- 注意：此函数需要在 Supabase Dashboard 的 SQL Editor 中以 service_role 权限执行

-- 创建 admin 用户
SELECT auth.create_user(
  '{
    "email": "admin@justclear.local",
    "password": "justclear_2026",
    "email_confirm": true,
    "user_metadata": {
      "username": "admin",
      "display_name": "主管理员"
    }
  }'::jsonb
);

-- 创建 justclear 用户
SELECT auth.create_user(
  '{
    "email": "justclear@justclear.local",
    "password": "justclear_2026",
    "email_confirm": true,
    "user_metadata": {
      "username": "justclear",
      "display_name": "JustClear 管理员"
    }
  }'::jsonb
);

-- 步骤 2: 插入管理员信息到 admin_users 表
-- 需要获取上面创建的用户 UUID，然后执行：
INSERT INTO admin_users (id, username, display_name, role)
SELECT 
  id,
  raw_user_meta_data->>'username',
  raw_user_meta_data->>'display_name',
  CASE 
    WHEN email = 'admin@justclear.local' THEN 'super_admin'
    ELSE 'admin'
  END
FROM auth.users
WHERE email IN ('admin@justclear.local', 'justclear@justclear.local');
```

**备选方案：通过 Supabase Dashboard 手动创建**：
1. 进入 Supabase Dashboard → Authentication → Users
2. 点击 "Add user" → "Create new user"
3. 填写邮箱和密码（`justclear_2026`）
4. 勾选 "Auto Confirm User"
5. 复制生成的 UUID，手动执行 `INSERT INTO admin_users ...`

### 决策 9: 管理操作记录操作者信息

**选择**：所有管理后台的写操作需记录操作者信息  
**原因**：
- 便于追溯操作历史
- 支持审计需求
- 多管理员协作时明确责任

**实现方式**：
- 预约状态变更记录 `updated_by` 和 `updated_at`
- 产品/分类/服务的创建和修改记录操作者
- 使用 `auth.uid()` 获取当前登录用户 ID

### 决策 6: 图片继续使用外链

**选择**：产品图片继续使用 Unsplash 等外链  
**原因**：
- 减少开发复杂度
- 无需额外存储成本
- 当前图片方案工作良好

**未来扩展**：
- 如需本地化图片，可迁移到 Supabase Storage

### 决策 7: 不实现预约确认邮件

**选择**：暂不实现预约提交后的邮件通知  
**原因**：
- 简化初期实现
- 减少外部服务依赖
- 管理员可通过后台查看预约

**未来扩展**：
- 如需邮件通知，可使用 Supabase Edge Functions + Resend

### 决策 10: 所有数据从数据库动态加载（无 Fallback）

**选择**：前端所有内容数据（产品、分类、服务等）必须从 Supabase 数据库动态加载，不使用静态数据或 fallback 机制  
**原因**：
- 确保数据一致性（管理后台修改即时生效）
- 避免静态数据与数据库数据不同步
- 简化数据流，单一数据源

**实现方式**：
- 删除 `src/data/products.ts` 静态数据文件
- 所有数据获取 Hooks 在加载失败时显示错误状态，不 fallback 到静态数据
- 前端组件在数据加载中显示加载状态，加载失败显示错误提示

**影响的组件**：
- `ProductCategories.tsx` - 从数据库加载分类
- `ProductList.tsx` - 从数据库加载产品
- `ProductDetail.tsx` - 从数据库加载产品详情
- `ProductsPage.tsx` - 从数据库加载分类
- `Services.tsx` - 从数据库加载服务

## 数据模型设计

### 管理员用户

```sql
-- 管理员用户表（关联 Supabase Auth）
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  role TEXT DEFAULT 'admin', -- super_admin, admin
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 启用 RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 只有已认证用户可以读取管理员信息
CREATE POLICY "Authenticated can read admin_users"
ON admin_users FOR SELECT
TO authenticated
USING (true);

-- 初始化管理员数据（需要先在 Supabase Auth 创建用户）
-- INSERT INTO admin_users (id, username, display_name, role) VALUES
--   ('admin-auth-uuid', 'admin', '主管理员', 'super_admin'),
--   ('justclear-auth-uuid', 'justclear', 'JustClear 管理员', 'admin');
```

### 预约系统

```sql
-- 预约记录表
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT,
  appointment_type TEXT DEFAULT 'general', -- general, eye_exam, contact_lens, kids
  preferred_date DATE,
  preferred_time TEXT,
  status TEXT DEFAULT 'pending', -- pending, confirmed, completed, cancelled
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  -- 操作者追踪
  updated_by UUID REFERENCES admin_users(id),
  notes TEXT -- 管理员备注
);

-- 启用 RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
```

### 内容管理系统

```sql
-- 产品表
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  material TEXT,
  colors TEXT[] DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  rating NUMERIC(2,1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  -- 操作者追踪
  created_by UUID REFERENCES admin_users(id),
  updated_by UUID REFERENCES admin_users(id)
);

-- 分类表
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id),
  updated_by UUID REFERENCES admin_users(id)
);

-- 网站配置表（Key-Value 存储）
CREATE TABLE site_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);

-- 服务项目表
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  gradient TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id),
  updated_by UUID REFERENCES admin_users(id)
);

-- 统计数据表
CREATE TABLE stats (
  id TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  sort_order INTEGER DEFAULT 0
);
```

### 配置示例

`site_config` 表可存储各种配置：

```json
// key: 'hero'
{
  "badge": "2026 春季新品系列",
  "title": ["发现更清晰", "的视界"],
  "subtitle": "将专业验光技术与时尚设计完美融合\n为您呈现每一个清晰瞬间",
  "backgroundImage": "https://..."
}

// key: 'contact_info'
{
  "address": "北京市朝阳区建国路88号现代城购物中心2层",
  "phone": ["010-8888-8888", "400-888-8888"],
  "email": "service@mingshi-glasses.com",
  "hours": "周一至周日 10:00 - 21:00"
}

// key: 'about'
{
  "title": "十五年专注",
  "subtitle": "只为清晰视界",
  "paragraphs": [...],
  "features": ["国家认证", "专业团队", "先进设备", "优质服务"]
}
```

## 前端架构

### 目录结构

```
src/
├── lib/
│   └── supabase.ts          # Supabase 客户端初始化
├── hooks/
│   ├── useProducts.ts       # 产品数据 Hook
│   ├── useCategories.ts     # 分类数据 Hook
│   ├── useServices.ts       # 服务数据 Hook
│   ├── useSiteConfig.ts     # 站点配置 Hook
│   ├── useAppointment.ts    # 预约提交 Hook
│   └── useAuth.ts           # 管理员认证 Hook
├── types/
│   └── database.ts          # 数据库类型定义
├── components/
│   └── ... (现有组件，修改为使用 hooks)
└── admin/                   # 管理后台模块
    ├── components/
    │   ├── AdminLayout.tsx  # 管理后台布局
    │   ├── AdminNav.tsx     # 管理后台导航
    │   ├── LoginForm.tsx    # 登录表单
    │   └── ...
    ├── pages/
    │   ├── Dashboard.tsx    # 仪表盘
    │   ├── Appointments.tsx # 预约管理
    │   ├── Products.tsx     # 产品管理
    │   ├── Categories.tsx   # 分类管理
    │   ├── Services.tsx     # 服务管理
    │   └── Settings.tsx     # 站点设置
    └── hooks/
        └── useAdminData.ts  # 管理后台数据 Hooks
```

### 路由结构

```typescript
// App.tsx 路由配置
<Routes>
  {/* 前台路由 */}
  <Route path="/" element={<HomePage />} />
  <Route path="/products" element={<ProductsPage />} />
  <Route path="/category/:categoryId" element={<ProductList />} />
  <Route path="/product/:productId" element={<ProductDetail />} />
  <Route path="/services" element={<ServicesPage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/contact" element={<ContactPage />} />
  
  {/* 管理后台路由 */}
  <Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="appointments" element={<AppointmentsPage />} />
    <Route path="products" element={<ProductsPage />} />
    <Route path="categories" element={<CategoriesPage />} />
    <Route path="services" element={<ServicesPage />} />
    <Route path="settings" element={<SettingsPage />} />
  </Route>
</Routes>
```

### 客户端初始化

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
```

### 数据获取 Hook 示例

```typescript
// src/hooks/useProducts.ts
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Product } from '../types/database'

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        let query = supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('sort_order')

        if (category) {
          query = query.eq('category', category)
        }

        const { data, error } = await query
        
        if (error) throw error
        setProducts(data || [])
      } catch (e) {
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  return { products, loading, error }
}
```

### 预约提交 Hook

```typescript
// src/hooks/useAppointment.ts
import { useState } from 'react'
import { supabase } from '../lib/supabase'

interface AppointmentData {
  name: string
  phone: string
  email?: string
  message?: string
  appointment_type?: string
  preferred_date?: string
  preferred_time?: string
}

export function useAppointment() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [success, setSuccess] = useState(false)

  async function submitAppointment(data: AppointmentData) {
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const { error } = await supabase
        .from('appointments')
        .insert([data])

      if (error) throw error
      setSuccess(true)
    } catch (e) {
      setError(e as Error)
    } finally {
      setSubmitting(false)
    }
  }

  return { submitAppointment, submitting, error, success }
}
```

## Risks / Trade-offs

### 风险 1: Supabase 服务可用性

**风险**：Supabase 云服务可能出现故障  
**缓解**：
- 监控 Supabase 状态页面
- 定期导出数据备份
- 使用 Supabase 的高可用配置（Pro 计划）

### 风险 2: 安全配置错误

**风险**：RLS 策略配置不当可能导致数据泄露  
**缓解**：
- 仔细审查每个表的 RLS 策略
- 使用 Supabase Dashboard 测试策略
- 最小权限原则

### 风险 3: 免费层限制

**风险**：业务增长可能超出免费层  
**缓解**：
- 监控使用量
- 预算升级费用（Pro 计划 $25/月）
- 必要时考虑自托管

### Trade-off: 前端直连 vs 中间后端

**选择前端直连的代价**：
- 无法执行复杂的后端逻辑
- 敏感操作需要 Edge Functions

**获得的好处**：
- 架构简单
- 开发速度快
- 无需维护额外服务

## Migration Plan

### Phase 1: 预约系统（优先）

1. 创建 Supabase 项目
2. 创建 `appointments` 表和 RLS 策略
3. 集成 `@supabase/supabase-js`
4. 修改 `Contact.tsx` 组件
5. 测试预约提交功能

### Phase 2: 内容管理（本次范围）

1. 创建内容相关表
2. 数据迁移脚本（从 `products.ts` 迁移到数据库）
3. 创建数据获取 Hooks
4. 替换所有组件中的硬编码数据为数据库加载
5. 删除静态数据文件（不使用 fallback）

### Phase 3: 管理后台

1. 创建 `/admin` 路由结构
2. 实现管理员认证（Supabase Auth）
3. 开发管理后台布局组件
4. 开发预约管理界面（查看、状态更新）
5. 开发产品管理界面（CRUD）
6. 开发分类管理界面
7. 开发服务项目管理界面
8. 开发站点配置界面

## 已确定事项

| 问题 | 决定 | 原因 |
|------|------|------|
| 预约确认邮件 | ❌ 暂不实现 | 简化初期开发，可后续扩展 |
| 图片存储方案 | 继续使用外链 | 当前方案可行，减少复杂度 |
| 管理后台架构 | 同一项目，`/admin` 路由 | 代码复用，部署简单 |
| 固定管理员账户 | ✅ 两个预设账户 | admin / justclear，禁止注册 |
| 操作者追踪 | ✅ 记录 created_by/updated_by | 便于审计，多人协作 |
| **数据加载方式** | ✅ 纯数据库动态加载 | 无 fallback，确保数据一致性 |
| 静态数据文件 | ❌ 已删除 | `src/data/products.ts` 不再使用 |

