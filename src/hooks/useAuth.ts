import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'
import type { AdminUser } from '../types/database'

// 允许登录的管理员邮箱
const ALLOWED_ADMIN_EMAILS = [
  'admin@justclear.local',
  'justclear@justclear.local',
]

interface AuthState {
  user: User | null
  session: Session | null
  adminUser: AdminUser | null
  loading: boolean
  error: Error | null
}

interface UseAuthReturn extends AuthState {
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => Promise<void>
  isAdmin: boolean
}

export function useAuth(): UseAuthReturn {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    adminUser: null,
    loading: true,
    error: null,
  })

  // 获取管理员信息（带超时）
  const fetchAdminUser = useCallback(async (userId: string): Promise<AdminUser> => {
    // 创建临时管理员对象
    const tempAdmin: AdminUser = {
      id: userId,
      username: 'admin',
      display_name: '临时管理员',
      role: 'admin' as const,
      created_at: new Date().toISOString(),
    }

    try {
      // 添加 5 秒超时
      const timeoutPromise = new Promise<AdminUser>((resolve) => {
        setTimeout(() => {
          console.warn('[useAuth] 获取管理员信息超时，使用临时管理员')
          resolve(tempAdmin)
        }, 5000)
      })

      const fetchPromise = (async () => {
        const { data, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', userId)
          .single()

        if (error) {
          console.error('[useAuth] 获取管理员信息失败:', error.message)
          return tempAdmin
        }
        return data as AdminUser
      })()

      return await Promise.race([fetchPromise, timeoutPromise])
    } catch (e) {
      console.error('[useAuth] 获取管理员信息异常:', e)
      return tempAdmin
    }
  }, [])

  // 初始化认证状态
  useEffect(() => {
    // 获取当前会话
    const initAuth = async () => {
      try {
        // 检查 Supabase 是否配置
        const supabaseUrl = (import.meta as unknown as { env: Record<string, string> }).env.VITE_SUPABASE_URL
        if (!supabaseUrl) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: new Error('Supabase 未配置，请设置环境变量 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY'),
          }))
          return
        }

        // 添加超时机制，防止请求永久挂起
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('连接 Supabase 超时，请检查网络或配置')), 10000)
        })
        
        const sessionPromise = supabase.auth.getSession()
        const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise]) as Awaited<typeof sessionPromise>
        
        if (session?.user) {
          // 检查是否是允许的管理员
          if (!ALLOWED_ADMIN_EMAILS.includes(session.user.email || '')) {
            await supabase.auth.signOut()
            setState(prev => ({
              ...prev,
              user: null,
              session: null,
              adminUser: null,
              loading: false,
              error: new Error('您没有管理员权限'),
            }))
            return
          }

          const adminUser = await fetchAdminUser(session.user.id)
          setState({
            user: session.user,
            session,
            adminUser,
            loading: false,
            error: null,
          })
        } else {
          setState(prev => ({
            ...prev,
            loading: false,
          }))
        }
      } catch (e) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: e as Error,
        }))
      }
    }

    initAuth()

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // 检查是否是允许的管理员
          if (!ALLOWED_ADMIN_EMAILS.includes(session.user.email || '')) {
            await supabase.auth.signOut()
            setState(prev => ({
              ...prev,
              user: null,
              session: null,
              adminUser: null,
              loading: false,
              error: new Error('您没有管理员权限'),
            }))
            return
          }

          const adminUser = await fetchAdminUser(session.user.id)
          setState({
            user: session.user,
            session,
            adminUser,
            loading: false,
            error: null,
          })
        } else if (event === 'SIGNED_OUT') {
          setState({
            user: null,
            session: null,
            adminUser: null,
            loading: false,
            error: null,
          })
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [fetchAdminUser])

  // 登录
  const signIn = useCallback(async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      // 先检查是否是允许的管理员邮箱
      if (!ALLOWED_ADMIN_EMAILS.includes(email)) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: new Error('您没有管理员权限'),
        }))
        return false
      }

      // 添加超时机制
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('登录超时，请检查网络连接或 Supabase 配置')), 10000)
      })
      
      const signInPromise = supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      const { data, error } = await Promise.race([signInPromise, timeoutPromise]) as Awaited<typeof signInPromise>

      if (error) throw error

      if (data.user) {
        const adminUser = await fetchAdminUser(data.user.id)
        setState({
          user: data.user,
          session: data.session,
          adminUser,
          loading: false,
          error: null,
        })
        return true
      }

      return false
    } catch (e) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: e as Error,
      }))
      return false
    }
  }, [fetchAdminUser])

  // 登出
  const signOut = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }))
    await supabase.auth.signOut()
    setState({
      user: null,
      session: null,
      adminUser: null,
      loading: false,
      error: null,
    })
  }, [])

  return {
    ...state,
    signIn,
    signOut,
    isAdmin: !!state.user && !!state.adminUser,
  }
}

// 获取当前用户 ID（用于记录操作者）
export function useCurrentUserId(): string | null {
  const { user } = useAuth()
  return user?.id || null
}

