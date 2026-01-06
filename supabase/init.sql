-- 佳视康 · justclear 眼镜店官网 - Supabase 数据库初始化脚本
-- 在 Supabase Dashboard -> SQL Editor 中执行此脚本

-- ============================================
-- 1. 管理员用户表
-- ============================================

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 只有已认证用户可以读取管理员信息
CREATE POLICY "Authenticated can read admin_users"
ON admin_users FOR SELECT
TO authenticated
USING (true);

-- ============================================
-- 2. 预约表
-- ============================================

CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT,
  appointment_type TEXT DEFAULT 'general' CHECK (appointment_type IN ('general', 'eye_exam', 'contact_lens', 'kids')),
  preferred_date DATE,
  preferred_time TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id),
  notes TEXT
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- 允许匿名用户插入预约
CREATE POLICY "Anyone can insert appointments"
ON appointments FOR INSERT
TO anon
WITH CHECK (true);

-- 已认证用户可以查看所有预约
CREATE POLICY "Authenticated can view appointments"
ON appointments FOR SELECT
TO authenticated
USING (true);

-- 已认证用户可以更新预约
CREATE POLICY "Authenticated can update appointments"
ON appointments FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================
-- 3. 产品表
-- ============================================

CREATE TABLE IF NOT EXISTS products (
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
  created_by UUID REFERENCES admin_users(id),
  updated_by UUID REFERENCES admin_users(id)
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 所有人可读取激活的产品
CREATE POLICY "Public read active products"
ON products FOR SELECT
TO anon, authenticated
USING (is_active = true OR auth.role() = 'authenticated');

-- 已认证用户可以管理产品
CREATE POLICY "Authenticated can insert products"
ON products FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update products"
ON products FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated can delete products"
ON products FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- 4. 分类表
-- ============================================

CREATE TABLE IF NOT EXISTS categories (
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

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 所有人可读取激活的分类
CREATE POLICY "Public read active categories"
ON categories FOR SELECT
TO anon, authenticated
USING (is_active = true OR auth.role() = 'authenticated');

-- 已认证用户可以管理分类
CREATE POLICY "Authenticated can insert categories"
ON categories FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update categories"
ON categories FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated can delete categories"
ON categories FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- 5. 服务表
-- ============================================

CREATE TABLE IF NOT EXISTS services (
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

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- 所有人可读取激活的服务
CREATE POLICY "Public read active services"
ON services FOR SELECT
TO anon, authenticated
USING (is_active = true OR auth.role() = 'authenticated');

-- 已认证用户可以管理服务
CREATE POLICY "Authenticated can insert services"
ON services FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update services"
ON services FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated can delete services"
ON services FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- 6. 站点配置表
-- ============================================

CREATE TABLE IF NOT EXISTS site_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);

ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- 所有人可读取配置
CREATE POLICY "Public read site_config"
ON site_config FOR SELECT
TO anon, authenticated
USING (true);

-- 已认证用户可以更新配置
CREATE POLICY "Authenticated can update site_config"
ON site_config FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated can insert site_config"
ON site_config FOR INSERT
TO authenticated
WITH CHECK (true);

-- ============================================
-- 7. 统计表
-- ============================================

CREATE TABLE IF NOT EXISTS stats (
  id TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  sort_order INTEGER DEFAULT 0
);

ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- 所有人可读取统计
CREATE POLICY "Public read stats"
ON stats FOR SELECT
TO anon, authenticated
USING (true);

-- 已认证用户可以管理统计
CREATE POLICY "Authenticated can manage stats"
ON stats FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================
-- 8. 更新触发器函数
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为需要的表添加触发器
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_site_config_updated_at
  BEFORE UPDATE ON site_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

