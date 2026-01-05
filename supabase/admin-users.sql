-- JustClear 眼镜店官网 - 管理员账户初始化脚本
-- ⚠️ 此脚本需要在 Supabase Dashboard -> SQL Editor 中执行
-- 执行顺序：1. init.sql -> 2. 本文件 -> 3. seed.sql

-- ============================================
-- 推荐方法: 通过 Supabase Dashboard 手动创建
-- ============================================
-- 
-- 1. 进入 Supabase Dashboard -> Authentication -> Users
-- 2. 点击 "Add user" -> "Create new user"
-- 3. 创建第一个用户：
--    - Email: admin@justclear.local
--    - Password: justclear_2026
--    - 勾选 "Auto Confirm User"
-- 4. 创建第二个用户：
--    - Email: justclear@justclear.local
--    - Password: justclear_2026
--    - 勾选 "Auto Confirm User"
-- 5. 然后执行下面的 SQL 来创建 admin_users 记录

-- ============================================
-- 步骤 2: 将 Auth 用户关联到 admin_users 表
-- ============================================
-- 在通过 Dashboard 创建用户后，执行此 SQL

INSERT INTO admin_users (id, username, display_name, role)
SELECT 
  id,
  CASE 
    WHEN email = 'admin@justclear.local' THEN 'admin'
    WHEN email = 'justclear@justclear.local' THEN 'justclear'
  END,
  CASE 
    WHEN email = 'admin@justclear.local' THEN '主管理员'
    WHEN email = 'justclear@justclear.local' THEN 'JustClear 管理员'
  END,
  CASE 
    WHEN email = 'admin@justclear.local' THEN 'super_admin'
    ELSE 'admin'
  END
FROM auth.users
WHERE email IN ('admin@justclear.local', 'justclear@justclear.local')
ON CONFLICT (id) DO UPDATE SET
  username = EXCLUDED.username,
  display_name = EXCLUDED.display_name,
  role = EXCLUDED.role;

-- ============================================
-- 验证管理员是否创建成功
-- ============================================

SELECT 
  au.id,
  au.username,
  au.display_name,
  au.role,
  u.email
FROM admin_users au
JOIN auth.users u ON au.id = u.id
ORDER BY au.role DESC;
