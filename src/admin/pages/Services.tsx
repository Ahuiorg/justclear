import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, RefreshCw } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Switch } from '../../components/ui/switch'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'
import type { Service } from '../../types/database'

interface ServiceFormData {
  id: number | null
  title: string
  description: string
  icon: string
  gradient: string
  is_active: boolean
}

const emptyFormData: ServiceFormData = {
  id: null,
  title: '',
  description: '',
  icon: '',
  gradient: 'from-blue-500 to-cyan-500',
  is_active: true,
}

const iconOptions = [
  'Scan',
  'Wrench',
  'ShieldCheck',
  'HeartHandshake',
  'Eye',
  'Glasses',
  'Star',
  'Award',
]

const gradientOptions = [
  { value: 'from-blue-500 to-cyan-500', label: '蓝色渐变' },
  { value: 'from-purple-500 to-pink-500', label: '紫色渐变' },
  { value: 'from-green-500 to-emerald-500', label: '绿色渐变' },
  { value: 'from-orange-500 to-red-500', label: '橙色渐变' },
  { value: 'from-yellow-500 to-orange-500', label: '黄色渐变' },
]

export function ServicesPage() {
  const { user } = useAuth()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  // 表单弹窗
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<ServiceFormData>(emptyFormData)
  const [saving, setSaving] = useState(false)

  // 删除确认
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchServices = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order')

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error('获取服务失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  // 打开新建弹窗
  const handleCreate = () => {
    setFormData(emptyFormData)
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  // 打开编辑弹窗
  const handleEdit = (service: Service) => {
    setFormData({
      id: service.id,
      title: service.title,
      description: service.description || '',
      icon: service.icon || '',
      gradient: service.gradient || 'from-blue-500 to-cyan-500',
      is_active: service.is_active,
    })
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  // 保存
  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    try {
      if (isEditing && formData.id) {
        const { error } = await supabase
          .from('services')
          .update({
            title: formData.title,
            description: formData.description,
            icon: formData.icon || null,
            gradient: formData.gradient,
            is_active: formData.is_active,
            updated_by: user.id,
          })
          .eq('id', formData.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from('services').insert({
          title: formData.title,
          description: formData.description,
          icon: formData.icon || null,
          gradient: formData.gradient,
          is_active: formData.is_active,
          sort_order: services.length,
          created_by: user.id,
          updated_by: user.id,
        })

        if (error) throw error
      }

      setIsDialogOpen(false)
      fetchServices()
    } catch (error) {
      console.error('保存服务失败:', error)
    } finally {
      setSaving(false)
    }
  }

  // 删除
  const handleDelete = async () => {
    if (!deleteId) return

    setDeleting(true)
    try {
      const { error } = await supabase.from('services').delete().eq('id', deleteId)
      if (error) throw error
      setDeleteId(null)
      fetchServices()
    } catch (error) {
      console.error('删除服务失败:', error)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">服务管理</h1>
          <p className="text-gray-500">管理服务项目</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          新建服务
        </Button>
      </div>

      {/* 工具栏 */}
      <div className="flex justify-end">
        <Button variant="outline" onClick={fetchServices}>
          <RefreshCw className="h-4 w-4 mr-2" />
          刷新
        </Button>
      </div>

      {/* 表格 */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>图标</TableHead>
              <TableHead>标题</TableHead>
              <TableHead>描述</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  加载中...
                </TableCell>
              </TableRow>
            ) : services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  暂无服务数据
                </TableCell>
              </TableRow>
            ) : (
              services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div
                      className={`h-10 w-10 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
                    >
                      <span className="text-white text-xs">{service.icon}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell className="text-gray-500 max-w-xs truncate">
                    {service.description || '-'}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${service.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                      {service.is_active ? '启用' : '禁用'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(service)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => setDeleteId(service.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 表单弹窗 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? '编辑服务' : '新建服务'}</DialogTitle>
            <DialogDescription>
              {isEditing ? '修改服务信息' : '填写服务信息以创建新服务'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>标题</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1"
                placeholder="专业验光"
              />
            </div>

            <div>
              <Label>描述</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1"
                placeholder="服务描述..."
              />
            </div>

            <div>
              <Label>图标名称</Label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">选择图标</option>
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>渐变色</Label>
              <select
                value={formData.gradient}
                onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
              >
                {gradientOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div
                className={`mt-2 h-8 rounded bg-gradient-to-r ${formData.gradient}`}
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label>启用</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? '保存中...' : '保存'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除确认 */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除这个服务项目吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleting}
            >
              {deleting ? '删除中...' : '删除'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

