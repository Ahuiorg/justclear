import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { AdminNav } from './AdminNav'
import { AdminHeader } from './AdminHeader'
import { Loader2 } from 'lucide-react'

export function AdminLayout() {
  const navigate = useNavigate()
  const { isAdmin, loading, adminUser, signOut } = useAuth()

  // 如果未登录，跳转到登录页
  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/admin/login', { replace: true })
    }
  }, [isAdmin, loading, navigate])

  // 加载中
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    )
  }

  // 未登录
  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部栏 */}
      <AdminHeader adminUser={adminUser} onSignOut={signOut} />

      <div className="flex">
        {/* 侧边导航 */}
        <AdminNav />

        {/* 主内容区 */}
        <main className="flex-1 p-6" style={{ marginLeft: '256px', marginTop: '64px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

