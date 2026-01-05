## ADDED Requirements

### Requirement: 用户预约提交

系统 SHALL 允许用户通过网站预约表单提交预约请求，预约信息 SHALL 被持久化存储到 Supabase 数据库中。

#### Scenario: 用户成功提交预约

- **GIVEN** 用户在联系页面填写了预约表单
- **WHEN** 用户点击"提交预约"按钮
- **AND** 表单数据验证通过（姓名和电话为必填）
- **THEN** 系统将预约信息存储到 `appointments` 表
- **AND** 显示提交成功提示
- **AND** 清空表单

#### Scenario: 预约提交失败时显示错误

- **GIVEN** 用户填写了预约表单
- **WHEN** 用户点击"提交预约"按钮
- **AND** 数据库连接失败或写入错误
- **THEN** 系统显示错误提示信息
- **AND** 保留表单内容以便用户重试

#### Scenario: 提交过程中显示加载状态

- **GIVEN** 用户点击"提交预约"按钮
- **WHEN** 系统正在处理预约请求
- **THEN** 提交按钮显示加载状态
- **AND** 按钮不可重复点击

---

### Requirement: 预约数据结构

系统 SHALL 使用以下数据结构存储预约信息：

- `id`: UUID，主键，自动生成
- `name`: 文本，必填，用户姓名
- `phone`: 文本，必填，联系电话
- `email`: 文本，可选，电子邮箱
- `message`: 文本，可选，留言内容
- `appointment_type`: 文本，预约类型（默认: general）
- `preferred_date`: 日期，可选，期望预约日期
- `preferred_time`: 文本，可选，期望预约时间
- `status`: 文本，预约状态（默认: pending）
- `created_at`: 时间戳，创建时间
- `updated_at`: 时间戳，更新时间

#### Scenario: 预约类型选项

- **GIVEN** 用户在预约表单中选择预约类型
- **WHEN** 用户查看预约类型下拉选项
- **THEN** 系统显示以下选项：
  - `general` - 普通咨询
  - `eye_exam` - 专业验光
  - `contact_lens` - 隐形眼镜配镜
  - `kids` - 儿童配镜

#### Scenario: 预约状态流转

- **GIVEN** 一条预约记录被创建
- **THEN** 初始状态为 `pending`（待确认）
- **AND** 状态可以流转为：
  - `confirmed` - 已确认
  - `completed` - 已完成
  - `cancelled` - 已取消

---

### Requirement: 预约数据安全

系统 SHALL 通过 Row Level Security (RLS) 策略保护预约数据：

- 匿名用户（anon）只能插入新预约记录
- 匿名用户不能读取、更新或删除预约记录
- 只有管理员（authenticated + admin role）可以查看和管理所有预约

#### Scenario: 匿名用户提交预约

- **GIVEN** 用户未登录（使用 anon key）
- **WHEN** 用户提交预约表单
- **THEN** 预约记录成功插入数据库

#### Scenario: 匿名用户无法读取预约

- **GIVEN** 用户未登录（使用 anon key）
- **WHEN** 尝试查询 `appointments` 表
- **THEN** 返回空结果集
- **AND** 不返回任何预约记录

#### Scenario: 匿名用户无法修改预约

- **GIVEN** 用户未登录（使用 anon key）
- **WHEN** 尝试更新或删除 `appointments` 表中的记录
- **THEN** 操作被 RLS 策略拒绝

