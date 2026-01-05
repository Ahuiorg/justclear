# Change: 为眼镜店官网添加 Supabase 后端支持

## Why

当前网站是纯静态前端，所有数据（产品、服务等）都硬编码在代码中。用户通过联系表单提交的预约信息无法被持久化存储，管理员也无法动态更新网站内容。需要引入后端服务来：
1. 收集和管理用户预约信息
2. 实现网站内容的动态配置

## What Changes

### 新增功能

1. **用户预约系统**
   - 用户提交预约表单后数据存储到 Supabase 数据库
   - 预约信息包含：姓名、电话、邮箱、留言、预约时间、预约类型
   - 预约状态跟踪（待确认、已确认、已完成、已取消）

2. **内容管理系统（CMS）**
   - 产品数据从数据库动态加载
   - 分类数据动态管理
   - 服务项目内容可配置
   - 关于我们、联系信息等静态内容可编辑
   - Hero 区域内容可配置

3. **管理后台（`/admin` 路由）**
   - 管理员登录认证（Supabase Auth）
   - 预约信息查看和状态管理
   - 产品 CRUD 管理
   - 分类管理
   - 服务项目管理
   - 站点配置管理

## Impact

- Affected specs: 新增 `user-appointments`, `content-management`, `admin-panel` 规格
- Affected code:
  - `src/App.tsx` - 添加 `/admin/*` 路由
  - `src/data/products.ts` - **已删除**（所有数据从数据库动态加载）
  - `src/components/Contact.tsx` - 集成 Supabase 表单提交
  - `src/components/ProductCategories.tsx` - 从数据库加载分类
  - `src/components/ProductList.tsx` - 从数据库加载产品
  - `src/components/ProductDetail.tsx` - 从数据库加载产品详情
  - `src/components/ProductsPage.tsx` - 从数据库加载分类
  - `src/components/Services.tsx` - 从数据库加载服务
  - 新增 `src/lib/supabase.ts` - Supabase 客户端
  - 新增 `src/hooks/useProducts.ts` - 产品数据 hook
  - 新增 `src/hooks/useCategories.ts` - 分类数据 hook
  - 新增 `src/hooks/useServices.ts` - 服务数据 hook
  - 新增 `src/hooks/useSiteConfig.ts` - 站点配置 hook
  - 新增 `src/hooks/useStats.ts` - 统计数据 hook
  - 新增 `src/hooks/useAppointment.ts` - 预约提交 hook
  - 新增 `src/hooks/useAuth.ts` - 管理员认证 hook
  - 新增 `src/admin/` - 管理后台模块（组件、页面、hooks）
- External dependencies: 新增 `@supabase/supabase-js`

## 关键决策

- **无 Fallback 机制**：所有数据必须从 Supabase 数据库动态加载，不使用静态数据作为 fallback
- **固定管理员账户**：仅允许预设的 `admin` 和 `justclear` 账户登录，不开放注册
- **操作者追踪**：所有管理操作记录 `created_by`/`updated_by` 字段

