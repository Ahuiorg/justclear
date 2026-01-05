# 任务清单：Supabase 后端集成

## 1. 环境准备

- [x] 1.1 创建 Supabase 项目（supabase.com）
- [x] 1.2 获取项目 URL 和 anon key
- [x] 1.3 安装 `@supabase/supabase-js` 依赖
- [x] 1.4 创建 `.env` 文件配置环境变量
- [x] 1.5 创建 `src/lib/supabase.ts` 客户端初始化

## 2. 管理员账户初始化

- [x] 2.1 创建 `admin_users` 表和 RLS 策略
- [x] 2.2 编写管理员初始化 SQL 脚本（含默认密码 `justclear_2026`）
- [x] 2.3 执行 SQL 创建 admin 用户（admin@justclear.local / justclear_2026）
- [x] 2.4 执行 SQL 创建 justclear 用户（justclear@justclear.local / justclear_2026）
- [x] 2.5 验证管理员可以使用默认密码登录

## 3. 预约系统实现

- [x] 3.1 在 Supabase 创建 `appointments` 表（含 updated_by 字段）
- [x] 3.2 配置 `appointments` 表 RLS 策略
- [x] 3.3 创建 `src/types/database.ts` 类型定义
- [x] 3.4 创建 `src/hooks/useAppointment.ts` 预约提交 Hook
- [x] 3.5 修改 `src/components/Contact.tsx` 集成预约提交
- [x] 3.6 添加提交状态反馈（加载、成功、失败提示）

## 4. 内容管理数据库

- [x] 4.1 创建 `products` 表和 RLS 策略（含 created_by/updated_by 字段）
- [x] 4.2 创建 `categories` 表和 RLS 策略（含 created_by/updated_by 字段）
- [x] 4.3 创建 `services` 表和 RLS 策略（含 created_by/updated_by 字段）
- [x] 4.4 创建 `stats` 表和 RLS 策略
- [x] 4.5 创建 `site_config` 表和 RLS 策略（含 updated_by 字段）
- [x] 4.6 编写数据迁移 SQL 脚本
- [x] 4.7 执行数据迁移（从 products.ts 迁移到数据库）

## 5. 内容管理前端集成

- [x] 5.1 创建 `src/hooks/useProducts.ts` 产品数据 Hook
- [x] 5.2 创建 `src/hooks/useCategories.ts` 分类数据 Hook
- [x] 5.3 创建 `src/hooks/useServices.ts` 服务数据 Hook
- [x] 5.4 创建 `src/hooks/useSiteConfig.ts` 配置数据 Hook
- [x] 5.5 创建 `src/hooks/useStats.ts` 统计数据 Hook

## 6. 组件改造

- [x] 6.1 改造 `ProductCategories.tsx` 使用 Hook
- [x] 6.2 改造 `ProductList.tsx` 使用 Hook
- [x] 6.3 改造 `ProductDetail.tsx` 使用 Hook
- [x] 6.4 改造 `Services.tsx` 使用 Hook
- [x] 6.5 改造 `Hero.tsx` 使用 Hook（可选）
- [x] 6.6 改造 `About.tsx` 使用 Hook（可选）
- [x] 6.7 添加加载状态和错误处理 UI

## 7. 管理后台 - 认证

- [x] 7.1 创建 `src/hooks/useAuth.ts` 认证 Hook
- [x] 7.2 创建 `src/hooks/useCurrentAdmin.ts` 获取当前管理员信息 Hook
- [x] 7.3 创建 `src/admin/components/LoginForm.tsx` 登录表单（无注册入口）
- [x] 7.4 创建 `/admin/login` 登录页面
- [x] 7.5 实现路由守卫（未登录重定向到登录页）
- [x] 7.6 实现登录验证（检查是否为预设管理员账户）

## 8. 管理后台 - 布局和导航

- [x] 8.1 创建 `src/admin/components/AdminLayout.tsx` 布局组件
- [x] 8.2 创建 `src/admin/components/AdminNav.tsx` 侧边导航
- [x] 8.3 创建 `src/admin/components/AdminHeader.tsx` 顶部栏（显示当前管理员）
- [x] 8.4 创建 `src/admin/pages/Dashboard.tsx` 仪表盘
- [x] 8.5 更新 `App.tsx` 添加 `/admin/*` 路由

## 9. 管理后台 - 预约管理

- [x] 9.1 创建 `src/admin/pages/Appointments.tsx` 预约列表页
- [x] 9.2 实现预约列表查询和分页
- [x] 9.3 实现预约状态更新功能（记录 updated_by）
- [x] 9.4 添加预约筛选（按状态、日期）
- [x] 9.5 显示操作者信息（谁最后修改）

## 10. 管理后台 - 内容管理

- [x] 10.1 创建 `src/admin/pages/Products.tsx` 产品管理页
- [x] 10.2 实现产品 CRUD 操作（记录 created_by/updated_by）
- [x] 10.3 创建 `src/admin/pages/Categories.tsx` 分类管理页
- [x] 10.4 实现分类 CRUD 操作（记录 created_by/updated_by）
- [x] 10.5 创建 `src/admin/pages/Services.tsx` 服务管理页
- [x] 10.6 实现服务项目 CRUD 操作（记录 created_by/updated_by）
- [x] 10.7 创建 `src/admin/pages/Settings.tsx` 站点配置页
- [x] 10.8 实现站点配置编辑（记录 updated_by）
- [x] 10.9 在列表和详情页显示操作者信息

## 11. 测试和优化

- [ ] 11.1 测试预约表单完整流程
- [ ] 11.2 测试产品列表加载
- [ ] 11.3 测试 RLS 策略（确保匿名用户无法读取预约）
- [ ] 11.4 测试管理后台认证流程（仅限预设账户登录）
- [ ] 11.5 测试管理后台 CRUD 功能
- [ ] 11.6 验证操作者信息正确记录
- [x] ~~11.7 添加数据获取失败的 fallback 机制~~ **已取消** - 所有数据从数据库动态加载，不使用 fallback
- [ ] 11.8 性能优化（数据缓存策略）

## 12. 文档和部署

- [x] 12.1 更新 README.md 说明 Supabase 配置
- [x] 12.2 添加 `.env.example` 模板
- [x] 12.3 添加管理后台使用说明（含账户信息）
- [x] 12.4 编写管理员账户初始化文档
- [x] 12.5 验证生产环境构建
