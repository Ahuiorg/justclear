import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarDays,
  Package,
  FolderOpen,
  Wrench,
  Settings,
} from 'lucide-react'
import { cn } from '../../components/ui/utils'

const navItems = [
  {
    to: '/admin',
    icon: LayoutDashboard,
    label: '仪表盘',
    end: true,
  },
  {
    to: '/admin/appointments',
    icon: CalendarDays,
    label: '预约管理',
  },
  {
    to: '/admin/products',
    icon: Package,
    label: '产品管理',
  },
  {
    to: '/admin/categories',
    icon: FolderOpen,
    label: '分类管理',
  },
  {
    to: '/admin/services',
    icon: Wrench,
    label: '服务管理',
  },
  {
    to: '/admin/settings',
    icon: Settings,
    label: '站点设置',
  },
]

export function AdminNav() {
  return (
    <aside className="fixed left-0 bg-white border-r border-gray-200 overflow-y-auto" style={{ top: '64px', width: '256px', height: 'calc(100vh - 64px)' }}>
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

