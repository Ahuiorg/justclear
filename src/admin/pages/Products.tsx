import { useEffect, useState } from 'react'
import { Plus, Search, Edit, Trash2, RefreshCw } from 'lucide-react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'
import type { Product, Category } from '../../types/database'

interface ProductFormData {
  id: string
  name: string
  category: string
  price: number
  original_price: number | null
  description: string
  images: string[]
  features: string[]
  material: string
  colors: string[]
  in_stock: boolean
  is_active: boolean
}

const emptyFormData: ProductFormData = {
  id: '',
  name: '',
  category: '',
  price: 0,
  original_price: null,
  description: '',
  images: [],
  features: [],
  material: '',
  colors: [],
  in_stock: true,
  is_active: true,
}

export function ProductsPage() {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  // 表单弹窗
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<ProductFormData>(emptyFormData)
  const [saving, setSaving] = useState(false)

  // 删除确认
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        supabase.from('products').select('*').order('sort_order'),
        supabase.from('categories').select('*').eq('is_active', true).order('sort_order'),
      ])

      if (productsRes.data) setProducts(productsRes.data)
      if (categoriesRes.data) setCategories(categoriesRes.data)
    } catch (error) {
      console.error('获取数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // 打开新建弹窗
  const handleCreate = () => {
    setFormData({ ...emptyFormData, id: `product-${Date.now()}` })
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  // 打开编辑弹窗
  const handleEdit = (product: Product) => {
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      original_price: product.original_price,
      description: product.description || '',
      images: product.images,
      features: product.features,
      material: product.material || '',
      colors: product.colors,
      in_stock: product.in_stock,
      is_active: product.is_active,
    })
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  // 保存
  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    try {
      if (isEditing) {
        const { error } = await supabase
          .from('products')
          .update({
            name: formData.name,
            category: formData.category,
            price: formData.price,
            original_price: formData.original_price,
            description: formData.description,
            images: formData.images,
            features: formData.features,
            material: formData.material,
            colors: formData.colors,
            in_stock: formData.in_stock,
            is_active: formData.is_active,
            updated_by: user.id,
          })
          .eq('id', formData.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from('products').insert({
          id: formData.id,
          name: formData.name,
          category: formData.category,
          price: formData.price,
          original_price: formData.original_price,
          description: formData.description,
          images: formData.images,
          features: formData.features,
          material: formData.material,
          colors: formData.colors,
          in_stock: formData.in_stock,
          is_active: formData.is_active,
          rating: 0,
          reviews: 0,
          sort_order: products.length,
          created_by: user.id,
          updated_by: user.id,
        })

        if (error) throw error
      }

      setIsDialogOpen(false)
      fetchData()
    } catch (error) {
      console.error('保存产品失败:', error)
    } finally {
      setSaving(false)
    }
  }

  // 删除
  const handleDelete = async () => {
    if (!deleteId) return

    setDeleting(true)
    try {
      const { error } = await supabase.from('products').delete().eq('id', deleteId)
      if (error) throw error
      setDeleteId(null)
      fetchData()
    } catch (error) {
      console.error('删除产品失败:', error)
    } finally {
      setDeleting(false)
    }
  }

  // 筛选
  const filteredProducts = products.filter((p) => {
    if (!search) return true
    return p.name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">产品管理</h1>
          <p className="text-gray-500">管理您的产品信息</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          新建产品
        </Button>
      </div>

      {/* 筛选栏 */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索产品名称..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={fetchData}>
          <RefreshCw className="h-4 w-4 mr-2" />
          刷新
        </Button>
      </div>

      {/* 表格 */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>产品</TableHead>
              <TableHead>分类</TableHead>
              <TableHead>价格</TableHead>
              <TableHead>库存</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  加载中...
                </TableCell>
              </TableRow>
            ) : filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  暂无产品数据
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {product.images[0] && (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                      )}
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {categories.find((c) => c.id === product.category)?.name || product.category}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">¥{product.price}</span>
                    {product.original_price && (
                      <span className="text-gray-400 line-through text-sm ml-2">
                        ¥{product.original_price}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${product.in_stock
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {product.in_stock ? '有货' : '缺货'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${product.is_active
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                      {product.is_active ? '上架' : '下架'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => setDeleteId(product.id)}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? '编辑产品' : '新建产品'}</DialogTitle>
            <DialogDescription>
              {isEditing ? '修改产品信息' : '填写产品信息以创建新产品'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>产品 ID</Label>
                <Input
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  disabled={isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>分类</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) => setFormData({ ...formData, category: v })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>产品名称</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>价格</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>原价（可选）</Label>
                <Input
                  type="number"
                  value={formData.original_price || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      original_price: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>描述</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label>图片链接（每行一个）</Label>
              <Textarea
                value={formData.images.join('\n')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    images: e.target.value.split('\n').filter(Boolean),
                  })
                }
                className="mt-1"
                rows={3}
                placeholder="https://example.com/image1.jpg"
              />
            </div>

            <div>
              <Label>材质</Label>
              <Input
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label>特性（逗号分隔）</Label>
              <Input
                value={formData.features.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    features: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="mt-1"
                placeholder="UV400防护, 偏光镜片"
              />
            </div>

            <div>
              <Label>颜色选项（逗号分隔）</Label>
              <Input
                value={formData.colors.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    colors: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="mt-1"
                placeholder="黑色, 银色, 金色"
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.in_stock}
                  onCheckedChange={(checked) => setFormData({ ...formData, in_stock: checked })}
                />
                <Label>有货</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label>上架</Label>
              </div>
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
              确定要删除这个产品吗？此操作无法撤销。
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

