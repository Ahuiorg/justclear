# admin-panel Specification

## Purpose
TBD - created by archiving change add-supabase-backend. Update Purpose after archive.
## Requirements
### Requirement: 管理后台路由

系统 SHALL 在 `/admin` 路径下提供管理后台界面，与前台网站共享同一个项目代码库。

#### Scenario: 访问管理后台入口

- **GIVEN** 用户访问 `/admin` 路径
- **WHEN** 用户未登录
- **THEN** 系统重定向到 `/admin/login` 页面

#### Scenario: 管理员登录后访问后台

- **GIVEN** 管理员已通过 `/admin/login` 登录
- **WHEN** 管理员访问 `/admin`
- **THEN** 系统显示管理后台仪表盘
- **AND** 侧边栏显示所有管理功能入口

---

### Requirement: 管理员认证（固定账户）

系统 SHALL 使用 Supabase Auth 实现管理员登录认证，仅支持预设的固定账户，不开放注册功能。

#### Scenario: 预设管理员账户

- **GIVEN** 系统初始化完成
- **THEN** 存在以下两个固定管理员账户：

| 邮箱 | 用户名 | 默认密码 | 角色 |
|------|--------|----------|------|
| admin@justclear.local | admin | justclear_2026 | super_admin |
| justclear@justclear.local | justclear | justclear_2026 | admin |

- **AND** 这些账户通过数据库初始化 SQL 脚本预先创建
- **AND** 账户认证信息存储在 Supabase `auth.users` 表中
- **AND** 账户扩展信息存储在 `admin_users` 表中

#### Scenario: 管理员登录成功

- **GIVEN** 管理员在登录页面
- **WHEN** 输入正确的邮箱和密码
- **AND** 点击登录按钮
- **THEN** 系统通过 Supabase Auth 验证凭据
- **AND** 登录成功后重定向到 `/admin`
- **AND** 保存登录状态
- **AND** 在界面显示当前登录的管理员名称

#### Scenario: 登录页面无注册入口

- **GIVEN** 用户访问 `/admin/login` 页面
- **THEN** 页面只显示登录表单（邮箱、密码、登录按钮）
- **AND** 不显示"注册"或"创建账户"链接
- **AND** 不显示"忘记密码"链接（管理员密码需手动重置）

#### Scenario: 非管理员账户登录失败

- **GIVEN** 用户在登录页面
- **WHEN** 使用非预设管理员账户的凭据尝试登录
- **THEN** 系统拒绝登录
- **AND** 显示"无效的管理员账户"错误提示

#### Scenario: 登录失败显示错误

- **GIVEN** 用户在登录页面
- **WHEN** 输入错误的凭据
- **THEN** 系统显示错误提示
- **AND** 不跳转页面

#### Scenario: 管理员登出

- **GIVEN** 管理员已登录
- **WHEN** 点击登出按钮
- **THEN** 系统清除登录状态
- **AND** 重定向到登录页面

#### Scenario: 会话过期处理

- **GIVEN** 管理员的登录会话已过期
- **WHEN** 尝试访问管理后台
- **THEN** 系统重定向到登录页面
- **AND** 显示会话过期提示

---

### Requirement: 操作者信息追踪

系统 SHALL 在所有管理后台的写操作中记录当前操作者信息。

#### Scenario: 预约状态更新记录操作者

- **GIVEN** 管理员修改预约状态
- **WHEN** 保存更改
- **THEN** 系统记录 `updated_by` 为当前管理员的 ID
- **AND** 更新 `updated_at` 时间戳

#### Scenario: 产品创建记录操作者

- **GIVEN** 管理员创建新产品
- **WHEN** 保存产品信息
- **THEN** 系统记录 `created_by` 为当前管理员的 ID
- **AND** 记录 `created_at` 时间戳

#### Scenario: 产品编辑记录操作者

- **GIVEN** 管理员编辑现有产品
- **WHEN** 保存更改
- **THEN** 系统记录 `updated_by` 为当前管理员的 ID
- **AND** 更新 `updated_at` 时间戳
- **AND** 保留原始的 `created_by` 不变

#### Scenario: 查看操作历史

- **GIVEN** 管理员查看预约或产品详情
- **THEN** 系统显示以下操作者信息：
  - 创建者名称和创建时间（如适用）
  - 最后修改者名称和修改时间

#### Scenario: 站点配置更新记录操作者

- **GIVEN** 管理员修改站点配置
- **WHEN** 保存配置
- **THEN** 系统记录 `updated_by` 为当前管理员的 ID
- **AND** 更新 `updated_at` 时间戳

---

### Requirement: 预约管理功能

系统 SHALL 提供预约信息的查看和管理功能。

#### Scenario: 查看预约列表

- **GIVEN** 管理员在预约管理页面
- **WHEN** 页面加载完成
- **THEN** 系统显示所有预约记录
- **AND** 按创建时间倒序排列
- **AND** 显示分页控件

#### Scenario: 按状态筛选预约

- **GIVEN** 管理员在预约管理页面
- **WHEN** 选择状态筛选条件（待确认/已确认/已完成/已取消）
- **THEN** 系统只显示符合条件的预约

#### Scenario: 更新预约状态

- **GIVEN** 管理员查看某条预约记录
- **WHEN** 修改预约状态
- **THEN** 系统更新数据库中的状态
- **AND** 显示更新成功提示
- **AND** 刷新预约列表

#### Scenario: 查看预约详情

- **GIVEN** 管理员在预约列表中
- **WHEN** 点击某条预约记录
- **THEN** 系统显示预约的完整信息
- **INCLUDING** 姓名、电话、邮箱、留言、预约类型、期望日期时间、状态、创建时间

---

### Requirement: 产品管理功能

系统 SHALL 提供产品数据的增删改查功能。

#### Scenario: 查看产品列表

- **GIVEN** 管理员在产品管理页面
- **WHEN** 页面加载完成
- **THEN** 系统显示所有产品（包括未激活的）
- **AND** 显示产品的关键信息（名称、分类、价格、状态）

#### Scenario: 创建新产品

- **GIVEN** 管理员在产品管理页面
- **WHEN** 点击"添加产品"按钮
- **AND** 填写产品信息表单
- **AND** 点击保存
- **THEN** 系统在数据库中创建新产品记录
- **AND** 显示成功提示
- **AND** 返回产品列表

#### Scenario: 编辑产品信息

- **GIVEN** 管理员在产品列表中
- **WHEN** 点击某产品的编辑按钮
- **THEN** 系统显示产品编辑表单
- **AND** 表单预填充当前产品数据

#### Scenario: 删除产品

- **GIVEN** 管理员在产品列表中
- **WHEN** 点击某产品的删除按钮
- **THEN** 系统显示确认对话框
- **AND** 确认后将产品 `is_active` 设为 false（软删除）

---

### Requirement: 分类管理功能

系统 SHALL 提供产品分类的管理功能。

#### Scenario: 查看分类列表

- **GIVEN** 管理员在分类管理页面
- **WHEN** 页面加载完成
- **THEN** 系统显示所有分类
- **AND** 按排序权重显示

#### Scenario: 创建新分类

- **GIVEN** 管理员在分类管理页面
- **WHEN** 填写分类信息并保存
- **THEN** 系统创建新分类记录

#### Scenario: 编辑分类

- **GIVEN** 管理员选择某个分类
- **WHEN** 修改分类信息并保存
- **THEN** 系统更新分类数据

#### Scenario: 调整分类排序

- **GIVEN** 管理员在分类列表中
- **WHEN** 拖拽调整分类顺序
- **THEN** 系统更新各分类的 `sort_order` 值

---

### Requirement: 服务管理功能

系统 SHALL 提供服务项目的管理功能。

#### Scenario: 管理服务项目

- **GIVEN** 管理员在服务管理页面
- **WHEN** 进行增删改操作
- **THEN** 系统相应更新 `services` 表数据
- **AND** 前台服务展示实时反映变更

---

### Requirement: 站点配置功能

系统 SHALL 提供网站全局配置的管理功能。

#### Scenario: 编辑 Hero 区域配置

- **GIVEN** 管理员在站点配置页面
- **WHEN** 修改 Hero 区域的配置（标题、副标题、背景图等）
- **AND** 点击保存
- **THEN** 系统更新 `site_config` 表中 key 为 `hero` 的记录

#### Scenario: 编辑联系信息

- **GIVEN** 管理员在站点配置页面
- **WHEN** 修改联系信息（地址、电话、邮箱、营业时间）
- **THEN** 系统更新 `site_config` 表中 key 为 `contact_info` 的记录

#### Scenario: 编辑关于我们内容

- **GIVEN** 管理员在站点配置页面
- **WHEN** 修改关于我们页面的内容
- **THEN** 系统更新 `site_config` 表中 key 为 `about` 的记录

---

### Requirement: 管理后台界面布局

系统 SHALL 提供统一的管理后台界面布局。

#### Scenario: 管理后台布局结构

- **GIVEN** 管理员登录后访问管理后台
- **THEN** 界面包含以下元素：
  - 顶部导航栏（显示当前用户、登出按钮）
  - 左侧边栏（功能菜单导航）
  - 主内容区域（显示当前功能页面）

#### Scenario: 侧边栏导航菜单

- **GIVEN** 管理后台侧边栏
- **THEN** 显示以下菜单项：
  - 仪表盘（`/admin`）
  - 预约管理（`/admin/appointments`）
  - 产品管理（`/admin/products`）
  - 分类管理（`/admin/categories`）
  - 服务管理（`/admin/services`）
  - 站点设置（`/admin/settings`）

#### Scenario: 响应式布局

- **GIVEN** 管理员使用不同设备访问管理后台
- **WHEN** 屏幕宽度小于 768px
- **THEN** 侧边栏自动收起
- **AND** 可通过按钮展开侧边栏

