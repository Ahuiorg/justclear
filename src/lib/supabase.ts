import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase 环境变量未配置，部分功能可能无法使用')
}

export const supabase = createClient<Database>(
  supabaseUrl || '',
  supabaseAnonKey || '',
  {
    auth: {
      // 持久化 session 到 localStorage
      persistSession: true,
      // 自动刷新 token
      autoRefreshToken: true,
      // 检测其他标签页的 session 变化
      detectSessionInUrl: true,
    },
    // 添加全局请求超时
    global: {
      fetch: (url, options) => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 秒超时
        return fetch(url, { ...options, signal: controller.signal })
          .finally(() => clearTimeout(timeoutId))
      }
    }
  }
)

