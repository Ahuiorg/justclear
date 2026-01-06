-- 佳视康 · justclear 眼镜店官网 - 初始数据填充脚本
-- 在执行 init.sql 后执行此脚本

-- ============================================
-- 1. 分类数据
-- ============================================

INSERT INTO categories (id, name, description, sort_order, is_active) VALUES
  ('sunglasses', '太阳镜系列', '时尚设计，全面防护', 1, true),
  ('optical', '光学镜架', '精选材质，舒适佩戴', 2, true),
  ('contact', '隐形眼镜', '多品牌选择，专业护理', 3, true),
  ('kids', '儿童眼镜', '安全材质，可爱设计', 4, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order;

-- ============================================
-- 2. 产品数据
-- ============================================

INSERT INTO products (id, name, category, price, original_price, description, images, features, material, colors, in_stock, rating, reviews, sort_order, is_active) VALUES
  -- 太阳镜系列
  ('sun-001', '经典飞行员太阳镜', 'sunglasses', 899, 1299, '经典飞行员造型，金属镜框搭配渐变镜片，兼具时尚与防护功能。适合各种脸型，是永不过时的经典款式。', 
   ARRAY['https://images.unsplash.com/photo-1732139637217-56c77369e25c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbnxlbnwxfHx8fDE3Njc1NDIwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080', 'https://images.unsplash.com/photo-1764778055595-b641b067ab40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdW5nbGFzc2VzJTIwZGlzcGxheXxlbnwxfHx8fDE3Njc1NzY3NTl8MA&ixlib=rb-4.1.0&q=80&w=1080'],
   ARRAY['UV400防护', '偏光镜片', '轻量化设计', '防刮涂层'], '钛合金镜框，树脂镜片', ARRAY['金色', '银色', '黑色'], true, 4.8, 156, 1, true),
  
  ('sun-002', '复古圆框太阳镜', 'sunglasses', 699, NULL, '复古圆形设计，文艺气质满满。镜片采用高清偏光技术，有效阻挡强光和紫外线。',
   ARRAY['https://images.unsplash.com/photo-1764778055595-b641b067ab40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdW5nbGFzc2VzJTIwZGlzcGxheXxlbnwxfHx8fDE3Njc1NzY3NTl8MA&ixlib=rb-4.1.0&q=80&w=1080'],
   ARRAY['UV400防护', '偏光镜片', '金属镜框', '鼻托可调'], '合金镜框，尼龙镜片', ARRAY['茶色', '灰色', '玫瑰金'], true, 4.6, 89, 2, true),
  
  ('sun-003', '运动型太阳镜', 'sunglasses', 1299, NULL, '专为运动爱好者设计，防滑鼻托和镜腿确保剧烈运动时也不会滑落。高清镜片提升视野清晰度。',
   ARRAY['https://images.unsplash.com/photo-1732139637217-56c77369e25c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbnxlbnwxfHx8fDE3Njc1NDIwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080'],
   ARRAY['偏光镜片', '防滑设计', '轻量化', '防紫外线'], 'TR90镜框，PC镜片', ARRAY['黑色', '蓝色', '红色'], true, 4.9, 203, 3, true),
  
  ('sun-004', '时尚大框太阳镜', 'sunglasses', 799, 999, '大框设计修饰脸型，遮挡面积更大。优雅的线条设计，展现女性魅力。',
   ARRAY['https://images.unsplash.com/photo-1764778055595-b641b067ab40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdW5nbGFzc2VzJTIwZGlzcGxheXxlbnwxfHx8fDE3Njc1NzY3NTl8MA&ixlib=rb-4.1.0&q=80&w=1080'],
   ARRAY['UV400防护', '大框设计', '渐变镜片', '修饰脸型'], '板材镜框，树脂镜片', ARRAY['黑色', '玳瑁色', '透明粉'], true, 4.7, 128, 4, true),

  -- 光学镜架系列
  ('optical-001', '商务全框眼镜', 'optical', 599, NULL, '经典全框设计，沉稳大气。适合商务场合佩戴，展现专业形象。',
   ARRAY['https://images.unsplash.com/photo-1641048927024-0e801784b4f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWVnbGFzc2VzJTIwZnJhbWVzfGVufDF8fHx8MTc2NzUzNDAwOXww&ixlib=rb-4.1.0&q=80&w=1080'],
   ARRAY['全框设计', '钛材质', '轻盈舒适', '可配近视镜片'], '纯钛镜框', ARRAY['黑色', '银色', '金色'], true, 4.8, 234, 1, true),
  
  ('optical-002', '时尚半框眼镜', 'optical', 499, NULL, '半框设计减轻重量，佩戴更舒适。简约时尚，适合日常佩戴。',
   ARRAY['https://images.unsplash.com/photo-1617791932882-a70117e3564d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzY3JpcHRpb24lMjBnbGFzc2VzJTIwZnJhbWVzfGVufDF8fHx8MTc2NzU3Njc2MHww&ixlib=rb-4.1.0&q=80&w=1080'],
   ARRAY['半框设计', '超轻量', '防滑鼻托', '可配近视镜片'], '合金镜框', ARRAY['黑色', '蓝色', '红色'], true, 4.6, 167, 2, true),
  
  ('optical-003', '无框眼镜', 'optical', 799, 1099, '无框设计，轻若无物。视野开阔，适合追求极简风格的人士。',
   ARRAY['https://images.unsplash.com/photo-1641048927024-0e801784b4f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWVnbGFzc2VzJTIwZnJhbWVzfGVufDF8fHx8MTc2NzUzNDAwOXww&ixlib=rb-4.1.0&q=80&w=1080'],
   ARRAY['无框设计', '超轻', '视野开阔', '可配近视镜片'], '钛合金镜腿', ARRAY['银色', '金色'], true, 4.7, 145, 3, true),
  
  ('optical-004', '复古方框眼镜', 'optical', 399, NULL, '复古方形框架，文艺范十足。板材材质，色彩丰富，展现个性。',
   ARRAY['https://images.unsplash.com/photo-1617791932882-a70117e3564d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzY3JpcHRpb24lMjBnbGFzc2VzJTIwZnJhbWVzfGVufDF8fHx8MTc2NzU3Njc2MHww&ixlib=rb-4.1.0&q=80&w=1080'],
   ARRAY['方框设计', '板材材质', '复古风格', '可配近视镜片'], '板材镜框', ARRAY['黑色', '玳瑁色', '透明色', '蓝色'], true, 4.5, 198, 4, true),

  -- 隐形眼镜系列
  ('contact-001', '日抛隐形眼镜（30片装）', 'contact', 199, NULL, '一天一换，卫生方便。高含水量设计，佩戴舒适，适合日常使用。',
   ARRAY['https://images.unsplash.com/photo-1582143434535-eba55a806718?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwbGVuc2VzfGVufDF8fHx8MTc2NzU3NzA1NHww&ixlib=rb-4.1.0&q=80&w=1080'],
   ARRAY['日抛型', '高含水量', 'UV防护', '舒适透气'], '硅水凝胶', ARRAY['透明'], true, 4.9, 567, 1, true),
  
  ('contact-002', '月抛隐形眼镜（3片装）', 'contact', 149, NULL, '经济实惠的月抛型隐形眼镜，配合护理液使用，性价比高。',
   ARRAY['https://images.unsplash.com/photo-1582143434535-eba55a806718?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwbGVuc2VzfGVufDF8fHx8MTc2NzU3NzA1NHww&ixlib=rb-4.1.0&q=80&w=1080'],
   ARRAY['月抛型', '高透氧', '防蛋白沉淀', '经济实惠'], '硅水凝胶', ARRAY['透明'], true, 4.7, 423, 2, true),
  
  ('contact-003', '彩色隐形眼镜（10片装）', 'contact', 169, NULL, '自然放大双眼，多种颜色可选。日抛设计，安全卫生。',
   ARRAY['https://images.unsplash.com/photo-1664249969357-258131844a38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWV3ZWFyJTIwZmFzaGlvbnxlbnwxfHx8fDE3Njc1NzY3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080'],
   ARRAY['日抛型', '自然放大', '多色可选', '三明治工艺'], '非离子材料', ARRAY['棕色', '灰色', '蓝色', '绿色'], true, 4.6, 289, 3, true),
  
  ('contact-004', '散光隐形眼镜（6片装）', 'contact', 299, NULL, '专为散光人群设计，稳定性好，矫正效果佳。',
   ARRAY['https://images.unsplash.com/photo-1582143434535-eba55a806718?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwbGVuc2VzfGVufDF8fHx8MTc2NzU3NzA1NHww&ixlib=rb-4.1.0&q=80&w=1080'],
   ARRAY['散光矫正', '月抛型', '定位稳定', '高透氧'], '硅水凝胶', ARRAY['透明'], true, 4.8, 156, 4, true),

  -- 儿童眼镜系列
  ('kids-001', '儿童防蓝光眼镜', 'kids', 299, NULL, '专为儿童设计的防蓝光眼镜，有效过滤有害蓝光，保护孩子视力。',
   ARRAY['https://images.unsplash.com/photo-1593194777536-e155e6d100b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwZ2xhc3Nlc3xlbnwxfHx8fDE3Njc1NzcwNTV8MA&ixlib=rb-4.1.0&q=80&w=1080'],
   ARRAY['防蓝光', '安全材质', '防摔设计', '可调鼻托'], 'TR90镜框', ARRAY['蓝色', '粉色', '黄色'], true, 4.9, 342, 1, true),
  
  ('kids-002', '儿童运动眼镜', 'kids', 399, NULL, '适合运动时佩戴，防滑防摔。配有绑带，确保运动时不会掉落。',
   ARRAY['https://images.unsplash.com/photo-1593194777536-e155e6d100b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwZ2xhc3Nlc3xlbnwxfHx8fDE3Njc1NzcwNTV8MA&ixlib=rb-4.1.0&q=80&w=1080'],
   ARRAY['防滑设计', '配绑带', '抗冲击', '可配近视镜片'], 'TR90镜框，PC镜片', ARRAY['红色', '蓝色', '绿色'], true, 4.7, 178, 2, true),
  
  ('kids-003', '卡通造型儿童眼镜', 'kids', 249, NULL, '可爱的卡通造型，孩子更愿意佩戴。轻质材料，长时间佩戴不压鼻。',
   ARRAY['https://images.unsplash.com/photo-1593194777536-e155e6d100b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwZ2xhc3Nlc3xlbnwxfHx8fDE3Njc1NzcwNTV8MA&ixlib=rb-4.1.0&q=80&w=1080'],
   ARRAY['卡通造型', '轻质材料', '安全环保', '可配近视镜片'], '硅胶镜框', ARRAY['粉色', '蓝色', '黄色', '绿色'], true, 4.8, 267, 3, true),
  
  ('kids-004', '青少年学生眼镜', 'kids', 449, 599, '专为青少年设计，时尚又不失稳重。配合防蓝光镜片，适合长时间学习使用。',
   ARRAY['https://images.unsplash.com/photo-1593194777536-e155e6d100b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwZ2xhc3Nlc3xlbnwxfHx8fDE3Njc1NzcwNTV8MA&ixlib=rb-4.1.0&q=80&w=1080'],
   ARRAY['时尚设计', '防蓝光', '轻质耐用', '可配近视镜片'], 'TR90镜框', ARRAY['黑色', '蓝色', '灰色'], true, 4.6, 234, 4, true)

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  description = EXCLUDED.description,
  images = EXCLUDED.images,
  features = EXCLUDED.features,
  material = EXCLUDED.material,
  colors = EXCLUDED.colors,
  in_stock = EXCLUDED.in_stock,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  sort_order = EXCLUDED.sort_order;

-- ============================================
-- 3. 服务数据
-- ============================================

INSERT INTO services (id, title, description, icon, gradient, sort_order, is_active) VALUES
  (1, '专业验光', '采用国际先进的验光设备，由资深验光师为您提供精准的视力检测和配镜建议', 'Scan', 'from-blue-500 to-cyan-500', 1, true),
  (2, '免费调整', '终身免费调整镜架，确保眼镜始终保持最佳佩戴状态，让您佩戴更舒适', 'Wrench', 'from-purple-500 to-pink-500', 2, true),
  (3, '品质保证', '所有镜片均提供品质保证，支持30天无理由退换，让您购买无忧', 'ShieldCheck', 'from-green-500 to-emerald-500', 3, true),
  (4, '贴心服务', '一对一专业咨询，根据您的脸型、使用场景推荐最适合的眼镜款式', 'HeartHandshake', 'from-orange-500 to-red-500', 4, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  gradient = EXCLUDED.gradient,
  sort_order = EXCLUDED.sort_order;

-- ============================================
-- 4. 统计数据
-- ============================================

INSERT INTO stats (id, value, label, icon, color, sort_order) VALUES
  ('years', '15+', '年行业经验', 'Award', 'from-blue-500 to-cyan-500', 1),
  ('customers', '50000+', '服务客户', 'Users', 'from-purple-500 to-pink-500', 2),
  ('rating', '4.9', '客户评分', 'Star', 'from-yellow-500 to-orange-500', 3),
  ('satisfaction', '98%', '满意度', 'TrendingUp', 'from-green-500 to-emerald-500', 4)
ON CONFLICT (id) DO UPDATE SET
  value = EXCLUDED.value,
  label = EXCLUDED.label,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  sort_order = EXCLUDED.sort_order;

-- ============================================
-- 5. 站点配置数据
-- ============================================

INSERT INTO site_config (key, value) VALUES
  ('hero', '{
    "badge": "2026 春季新品系列",
    "title": ["发现更清晰", "的视界"],
    "subtitle": "将专业验光技术与时尚设计完美融合\n为您呈现每一个清晰瞬间",
    "backgroundImage": "https://images.unsplash.com/photo-1682664175900-7771b38e1585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBleWVnbGFzc2VzJTIwc3RvcmV8ZW58MXx8fHwxNzY3NTc2NzU5fDA&ixlib=rb-4.1.0&q=80&w=1080"
  }'::jsonb),
  ('contact_info', '{
    "address": "北京市朝阳区建国路88号现代城购物中心2层",
    "phone": ["010-8888-8888", "400-888-8888"],
    "email": "service@mingshi-glasses.com",
    "hours": "周一至周日 10:00 - 21:00"
  }'::jsonb),
  ('about', '{
    "title": "十五年专注",
    "subtitle": "只为清晰视界",
    "paragraphs": [
      "佳视康眼镜成立于2009年，是一家专注于提供高品质眼镜产品和专业视光服务的连锁眼镜店。我们秉承\"专业、品质、服务\"的经营理念，致力于为每一位顾客带来清晰舒适的视觉体验。",
      "我们拥有专业的验光团队，所有验光师均持有国家认证资格证书，并定期参加专业培训。店内配备先进的验光设备和检测仪器，确保为您提供精准的验光服务。",
      "我们精选国内外知名品牌镜架和镜片，涵盖各种风格和价位，无论您是追求时尚潮流，还是注重实用舒适，都能在这里找到心仪的眼镜。"
    ],
    "features": ["国家认证", "专业团队", "先进设备", "优质服务"]
  }'::jsonb)
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value;

