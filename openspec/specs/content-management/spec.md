# content-management Specification

## Purpose
TBD - created by archiving change add-supabase-backend. Update Purpose after archive.
## Requirements
### Requirement: 产品数据动态加载

系统 SHALL 从 Supabase 数据库动态加载产品数据，而非使用硬编码的静态数据。

#### Scenario: 产品列表页加载产品数据

- **GIVEN** 用户访问产品列表页面
- **WHEN** 页面组件挂载
- **THEN** 系统从 `products` 表查询所有激活的产品
- **AND** 按 `sort_order` 排序显示
- **AND** 在数据加载期间显示加载状态

#### Scenario: 按分类筛选产品

- **GIVEN** 用户访问某个分类的产品页面（如 `/category/sunglasses`）
- **WHEN** 页面组件挂载
- **THEN** 系统只查询该分类下的产品
- **AND** 只返回 `is_active = true` 的产品

#### Scenario: 产品详情页加载单个产品

- **GIVEN** 用户访问产品详情页（如 `/product/sun-001`）
- **WHEN** 页面组件挂载
- **THEN** 系统根据产品 ID 查询单个产品数据
- **AND** 显示产品的完整信息

#### Scenario: 数据加载失败时显示 fallback

- **GIVEN** 数据库连接失败或查询错误
- **WHEN** 产品数据加载失败
- **THEN** 系统显示错误提示
- **OR** 使用本地缓存/静态数据作为 fallback

---

### Requirement: 产品数据结构

系统 SHALL 使用以下数据结构存储产品信息：

- `id`: 文本，主键，产品唯一标识（如 sun-001）
- `name`: 文本，必填，产品名称
- `category`: 文本，必填，所属分类 ID
- `price`: 整数，必填，当前价格（分）
- `original_price`: 整数，可选，原价
- `description`: 文本，产品描述
- `images`: 文本数组，产品图片 URL 列表
- `features`: 文本数组，产品特性列表
- `material`: 文本，材质说明
- `colors`: 文本数组，可选颜色列表
- `in_stock`: 布尔，是否有货（默认 true）
- `rating`: 数值，评分（0-5）
- `reviews`: 整数，评价数量
- `sort_order`: 整数，排序权重（默认 0）
- `is_active`: 布尔，是否激活（默认 true）

#### Scenario: 产品字段对应

- **GIVEN** 现有 `products.ts` 中的产品数据
- **WHEN** 迁移到数据库
- **THEN** 字段映射如下：
  - `id` → `id`
  - `name` → `name`
  - `category` → `category`
  - `price` → `price`
  - `originalPrice` → `original_price`
  - `description` → `description`
  - `images` → `images`
  - `features` → `features`
  - `material` → `material`
  - `colors` → `colors`
  - `inStock` → `in_stock`
  - `rating` → `rating`
  - `reviews` → `reviews`

---

### Requirement: 分类数据动态加载

系统 SHALL 从 Supabase 数据库动态加载产品分类数据。

#### Scenario: 加载所有分类

- **GIVEN** 用户访问产品页面
- **WHEN** 需要显示分类导航
- **THEN** 系统从 `categories` 表查询所有激活的分类
- **AND** 按 `sort_order` 排序

#### Scenario: 分类数据结构

- **GIVEN** `categories` 表
- **THEN** 包含以下字段：
  - `id`: 文本，主键（如 sunglasses）
  - `name`: 文本，分类名称
  - `description`: 文本，分类描述
  - `image_url`: 文本，分类图片
  - `sort_order`: 整数，排序权重
  - `is_active`: 布尔，是否激活

---

### Requirement: 服务项目动态配置

系统 SHALL 从 Supabase 数据库动态加载服务项目数据。

#### Scenario: 加载服务列表

- **GIVEN** 用户访问服务页面或首页
- **WHEN** 服务组件挂载
- **THEN** 系统从 `services` 表查询所有激活的服务
- **AND** 按 `sort_order` 排序显示

#### Scenario: 服务数据结构

- **GIVEN** `services` 表
- **THEN** 包含以下字段：
  - `id`: 整数，主键，自增
  - `title`: 文本，服务标题
  - `description`: 文本，服务描述
  - `icon`: 文本，图标名称（对应 Lucide 图标）
  - `gradient`: 文本，渐变色 CSS 类名
  - `sort_order`: 整数，排序权重
  - `is_active`: 布尔，是否激活

---

### Requirement: 网站配置动态管理

系统 SHALL 支持通过 `site_config` 表管理网站各区域的配置内容。

#### Scenario: Hero 区域配置

- **GIVEN** `site_config` 表中存在 key 为 `hero` 的记录
- **WHEN** Hero 组件加载
- **THEN** 系统使用配置中的以下字段：
  - `badge`: 徽章文本
  - `title`: 标题数组（多行）
  - `subtitle`: 副标题
  - `backgroundImage`: 背景图片 URL
  - `stats`: 统计数据数组

#### Scenario: 联系信息配置

- **GIVEN** `site_config` 表中存在 key 为 `contact_info` 的记录
- **WHEN** 联系页面或 Footer 加载
- **THEN** 系统使用配置中的以下字段：
  - `address`: 门店地址
  - `phone`: 电话号码数组
  - `email`: 电子邮箱
  - `hours`: 营业时间

#### Scenario: 关于我们配置

- **GIVEN** `site_config` 表中存在 key 为 `about` 的记录
- **WHEN** 关于我们页面加载
- **THEN** 系统使用配置中的以下字段：
  - `title`: 标题
  - `subtitle`: 副标题
  - `paragraphs`: 段落文本数组
  - `features`: 特性标签数组

---

### Requirement: 内容数据安全

系统 SHALL 通过 Row Level Security (RLS) 策略管理内容数据访问权限：

- 所有用户（包括匿名用户）可以读取激活的内容
- 只有管理员可以修改内容数据

#### Scenario: 公开读取产品数据

- **GIVEN** 任意用户（登录或未登录）
- **WHEN** 查询 `products` 表
- **THEN** 返回所有 `is_active = true` 的产品记录

#### Scenario: 限制内容修改权限

- **GIVEN** 未授权用户（非管理员）
- **WHEN** 尝试插入、更新或删除 `products` 表记录
- **THEN** 操作被 RLS 策略拒绝

---

### Requirement: 统计数据动态配置

系统 SHALL 从 Supabase 数据库动态加载首页和关于页面的统计数据。

#### Scenario: 加载统计数据

- **GIVEN** 用户访问首页或关于页面
- **WHEN** 统计组件挂载
- **THEN** 系统从 `stats` 表查询所有统计项
- **AND** 按 `sort_order` 排序显示

#### Scenario: 统计数据结构

- **GIVEN** `stats` 表
- **THEN** 包含以下字段：
  - `id`: 文本，主键（如 years, customers）
  - `value`: 文本，显示值（如 15+, 50K+）
  - `label`: 文本，标签说明
  - `icon`: 文本，图标名称
  - `color`: 文本，颜色渐变类名
  - `sort_order`: 整数，排序权重

