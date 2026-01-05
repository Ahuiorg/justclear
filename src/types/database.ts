// Supabase 数据库类型定义

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: AdminUser
        Insert: AdminUserInsert
        Update: AdminUserUpdate
      }
      appointments: {
        Row: Appointment
        Insert: AppointmentInsert
        Update: AppointmentUpdate
      }
      products: {
        Row: Product
        Insert: ProductInsert
        Update: ProductUpdate
      }
      categories: {
        Row: Category
        Insert: CategoryInsert
        Update: CategoryUpdate
      }
      services: {
        Row: Service
        Insert: ServiceInsert
        Update: ServiceUpdate
      }
      site_config: {
        Row: SiteConfig
        Insert: SiteConfigInsert
        Update: SiteConfigUpdate
      }
      stats: {
        Row: Stat
        Insert: StatInsert
        Update: StatUpdate
      }
    }
  }
}

// 管理员用户
export interface AdminUser {
  id: string
  username: string
  display_name: string
  role: 'super_admin' | 'admin'
  created_at: string
}

export type AdminUserInsert = Omit<AdminUser, 'created_at'>
export type AdminUserUpdate = Partial<AdminUserInsert>

// 预约
export interface Appointment {
  id: string
  name: string
  phone: string
  email: string | null
  message: string | null
  appointment_type: 'general' | 'eye_exam' | 'contact_lens' | 'kids'
  preferred_date: string | null
  preferred_time: string | null
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
  updated_by: string | null
  notes: string | null
}

export type AppointmentInsert = Omit<Appointment, 'id' | 'created_at' | 'updated_at' | 'updated_by' | 'notes' | 'status'> & {
  status?: Appointment['status']
}
export type AppointmentUpdate = Partial<Omit<Appointment, 'id' | 'created_at'>>

// 产品
export interface Product {
  id: string
  name: string
  category: string
  price: number
  original_price: number | null
  description: string | null
  images: string[]
  features: string[]
  material: string | null
  colors: string[]
  in_stock: boolean
  rating: number
  reviews: number
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
  created_by: string | null
  updated_by: string | null
}

export type ProductInsert = Omit<Product, 'created_at' | 'updated_at' | 'created_by' | 'updated_by'>
export type ProductUpdate = Partial<Omit<Product, 'id' | 'created_at'>>

// 分类
export interface Category {
  id: string
  name: string
  description: string | null
  image_url: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
  created_by: string | null
  updated_by: string | null
}

export type CategoryInsert = Omit<Category, 'created_at' | 'updated_at' | 'created_by' | 'updated_by'>
export type CategoryUpdate = Partial<Omit<Category, 'id' | 'created_at'>>

// 服务
export interface Service {
  id: number
  title: string
  description: string | null
  icon: string | null
  gradient: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
  created_by: string | null
  updated_by: string | null
}

export type ServiceInsert = Omit<Service, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by'>
export type ServiceUpdate = Partial<Omit<Service, 'id' | 'created_at'>>

// 站点配置
export interface SiteConfig {
  key: string
  value: Record<string, unknown>
  updated_at: string
  updated_by: string | null
}

export type SiteConfigInsert = Omit<SiteConfig, 'updated_at' | 'updated_by'>
export type SiteConfigUpdate = Partial<Omit<SiteConfig, 'key'>>

// 统计
export interface Stat {
  id: string
  value: string
  label: string
  icon: string | null
  color: string | null
  sort_order: number
}

export type StatInsert = Stat
export type StatUpdate = Partial<Omit<Stat, 'id'>>

// 站点配置类型
export interface HeroConfig {
  badge: string
  title: string[]
  subtitle: string
  backgroundImage: string
}

export interface ContactInfoConfig {
  address: string
  phone: string[]
  email: string
  hours: string
}

export interface AboutConfig {
  title: string
  subtitle: string
  paragraphs: string[]
  features: string[]
}

// 预约类型选项
export const APPOINTMENT_TYPES = {
  general: '普通咨询',
  eye_exam: '专业验光',
  contact_lens: '隐形眼镜配镜',
  kids: '儿童配镜',
} as const

// 预约状态选项
export const APPOINTMENT_STATUS = {
  pending: '待确认',
  confirmed: '已确认',
  completed: '已完成',
  cancelled: '已取消',
} as const

