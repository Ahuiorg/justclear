import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Package, FolderOpen, Wrench, ArrowRight, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { supabase } from '../../lib/supabase'
import { APPOINTMENT_STATUS } from '../../types/database'

interface DashboardStats {
  totalAppointments: number
  pendingAppointments: number
  totalProducts: number
  totalCategories: number
  totalServices: number
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAppointments: 0,
    pendingAppointments: 0,
    totalProducts: 0,
    totalCategories: 0,
    totalServices: 0,
  })
  const [recentAppointments, setRecentAppointments] = useState<Array<{
    id: string
    name: string
    phone: string
    status: string
    created_at: string
  }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        // 获取预约统计
        const { count: totalAppointments } = await supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })

        const { count: pendingAppointments } = await supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending')

        // 获取产品统计
        const { count: totalProducts } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true)

        // 获取分类统计
        const { count: totalCategories } = await supabase
          .from('categories')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true)

        // 获取服务统计
        const { count: totalServices } = await supabase
          .from('services')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true)

        // 获取最近预约
        const { data: recent } = await supabase
          .from('appointments')
          .select('id, name, phone, status, created_at')
          .order('created_at', { ascending: false })
          .limit(5)

        setStats({
          totalAppointments: totalAppointments || 0,
          pendingAppointments: pendingAppointments || 0,
          totalProducts: totalProducts || 0,
          totalCategories: totalCategories || 0,
          totalServices: totalServices || 0,
        })
        setRecentAppointments(recent || [])
      } catch (error) {
        console.error('获取统计数据失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: '总预约数',
      value: stats.totalAppointments,
      icon: CalendarDays,
      color: 'bg-blue-500',
      link: '/admin/appointments',
    },
    {
      title: '待处理预约',
      value: stats.pendingAppointments,
      icon: Clock,
      color: 'bg-orange-500',
      link: '/admin/appointments?status=pending',
    },
    {
      title: '产品数量',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-green-500',
      link: '/admin/products',
    },
    {
      title: '分类数量',
      value: stats.totalCategories,
      icon: FolderOpen,
      color: 'bg-purple-500',
      link: '/admin/categories',
    },
    {
      title: '服务项目',
      value: stats.totalServices,
      icon: Wrench,
      color: 'bg-cyan-500',
      link: '/admin/services',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">仪表盘</h1>
        <p className="text-gray-500">欢迎回来，这是您的网站概览</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <Link key={card.title} to={card.link}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {loading ? '-' : card.value}
                    </p>
                  </div>
                  <div className={`h-12 w-12 rounded-lg ${card.color} flex items-center justify-center`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* 最近预约 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>最近预约</CardTitle>
          <Link
            to="/admin/appointments"
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            查看全部
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-500 text-center py-8">加载中...</p>
          ) : recentAppointments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">暂无预约数据</p>
          ) : (
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{appointment.name}</p>
                    <p className="text-sm text-gray-500">{appointment.phone}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${appointment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : appointment.status === 'confirmed'
                            ? 'bg-blue-100 text-blue-700'
                            : appointment.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {APPOINTMENT_STATUS[appointment.status as keyof typeof APPOINTMENT_STATUS]}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(appointment.created_at).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

