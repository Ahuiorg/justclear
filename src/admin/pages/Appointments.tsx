import { useEffect, useState } from 'react'
import { Search, Filter, RefreshCw } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/ui/dialog'
import { Textarea } from '../../components/ui/textarea'
import { Label } from '../../components/ui/label'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'
import type { Appointment } from '../../types/database'
import { APPOINTMENT_STATUS, APPOINTMENT_TYPES } from '../../types/database'

export function AppointmentsPage() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // 详情弹窗
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [editStatus, setEditStatus] = useState('')
  const [editNotes, setEditNotes] = useState('')
  const [saving, setSaving] = useState(false)

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false })

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter)
      }

      const { data, error } = await query

      if (error) throw error
      setAppointments(data || [])
    } catch (error) {
      console.error('获取预约列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [statusFilter])

  // 打开详情
  const handleOpenDetail = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setEditStatus(appointment.status)
    setEditNotes(appointment.notes || '')
  }

  // 保存更改
  const handleSave = async () => {
    if (!selectedAppointment || !user) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('appointments')
        .update({
          status: editStatus,
          notes: editNotes,
          updated_by: user.id,
        })
        .eq('id', selectedAppointment.id)

      if (error) throw error

      setSelectedAppointment(null)
      fetchAppointments()
    } catch (error) {
      console.error('更新预约失败:', error)
    } finally {
      setSaving(false)
    }
  }

  // 筛选后的数据
  const filteredAppointments = appointments.filter((a) => {
    if (!search) return true
    const searchLower = search.toLowerCase()
    return (
      a.name.toLowerCase().includes(searchLower) ||
      a.phone.includes(search) ||
      (a.email && a.email.toLowerCase().includes(searchLower))
    )
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">预约管理</h1>
        <p className="text-gray-500">查看和管理用户预约</p>
      </div>

      {/* 筛选栏 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -trangray-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索姓名、电话、邮箱..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="筛选状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="pending">待确认</SelectItem>
            <SelectItem value="confirmed">已确认</SelectItem>
            <SelectItem value="completed">已完成</SelectItem>
            <SelectItem value="cancelled">已取消</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={fetchAppointments}>
          <RefreshCw className="h-4 w-4 mr-2" />
          刷新
        </Button>
      </div>

      {/* 表格 */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>姓名</TableHead>
              <TableHead>电话</TableHead>
              <TableHead>预约类型</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>预约时间</TableHead>
              <TableHead>提交时间</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  加载中...
                </TableCell>
              </TableRow>
            ) : filteredAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  暂无预约数据
                </TableCell>
              </TableRow>
            ) : (
              filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.name}</TableCell>
                  <TableCell>{appointment.phone}</TableCell>
                  <TableCell>
                    {APPOINTMENT_TYPES[appointment.appointment_type as keyof typeof APPOINTMENT_TYPES]}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    {appointment.preferred_date
                      ? `${appointment.preferred_date} ${appointment.preferred_time || ''}`
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {new Date(appointment.created_at).toLocaleString('zh-CN')}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenDetail(appointment)}
                    >
                      详情
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 详情弹窗 */}
      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>预约详情</DialogTitle>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500">姓名</Label>
                  <p className="font-medium">{selectedAppointment.name}</p>
                </div>
                <div>
                  <Label className="text-gray-500">电话</Label>
                  <p className="font-medium">{selectedAppointment.phone}</p>
                </div>
                <div>
                  <Label className="text-gray-500">邮箱</Label>
                  <p className="font-medium">{selectedAppointment.email || '-'}</p>
                </div>
                <div>
                  <Label className="text-gray-500">预约类型</Label>
                  <p className="font-medium">
                    {APPOINTMENT_TYPES[selectedAppointment.appointment_type as keyof typeof APPOINTMENT_TYPES]}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-500">期望日期</Label>
                  <p className="font-medium">{selectedAppointment.preferred_date || '-'}</p>
                </div>
                <div>
                  <Label className="text-gray-500">期望时间</Label>
                  <p className="font-medium">{selectedAppointment.preferred_time || '-'}</p>
                </div>
              </div>

              {selectedAppointment.message && (
                <div>
                  <Label className="text-gray-500">留言</Label>
                  <p className="mt-1 p-3 bg-gray-50 rounded-lg text-sm">
                    {selectedAppointment.message}
                  </p>
                </div>
              )}

              <div className="border-t pt-4 space-y-4">
                <div>
                  <Label>状态</Label>
                  <Select value={editStatus} onValueChange={setEditStatus}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">待确认</SelectItem>
                      <SelectItem value="confirmed">已确认</SelectItem>
                      <SelectItem value="completed">已完成</SelectItem>
                      <SelectItem value="cancelled">已取消</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>备注</Label>
                  <Textarea
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="添加备注..."
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="text-xs text-gray-400">
                <p>提交时间: {new Date(selectedAppointment.created_at).toLocaleString('zh-CN')}</p>
                {selectedAppointment.updated_by && (
                  <p>最后更新: {new Date(selectedAppointment.updated_at).toLocaleString('zh-CN')}</p>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedAppointment(null)}>
              取消
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? '保存中...' : '保存'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

