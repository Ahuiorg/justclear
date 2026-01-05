import { useEffect, useState } from 'react'
import { Save, RefreshCw } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'
import type { HeroConfig, ContactInfoConfig, AboutConfig } from '../../types/database'

export function SettingsPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // 配置数据
  const [heroConfig, setHeroConfig] = useState<HeroConfig>({
    badge: '',
    title: ['', ''],
    subtitle: '',
    backgroundImage: '',
  })
  const [contactConfig, setContactConfig] = useState<ContactInfoConfig>({
    address: '',
    phone: [],
    email: '',
    hours: '',
  })
  const [aboutConfig, setAboutConfig] = useState<AboutConfig>({
    title: '',
    subtitle: '',
    paragraphs: [],
    features: [],
  })

  const fetchConfigs = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from('site_config').select('*')

      if (error) throw error

      data?.forEach((item) => {
        if (item.key === 'hero') {
          setHeroConfig(item.value as unknown as HeroConfig)
        } else if (item.key === 'contact_info') {
          setContactConfig(item.value as unknown as ContactInfoConfig)
        } else if (item.key === 'about') {
          setAboutConfig(item.value as unknown as AboutConfig)
        }
      })
    } catch (error) {
      console.error('获取配置失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConfigs()
  }, [])

  const saveConfig = async (key: string, value: unknown) => {
    if (!user) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('site_config')
        .upsert({
          key,
          value: value as Record<string, unknown>,
          updated_by: user.id,
        })

      if (error) throw error
      alert('保存成功！')
    } catch (error) {
      console.error('保存配置失败:', error)
      alert('保存失败，请重试')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">加载中...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">站点设置</h1>
          <p className="text-gray-500">配置网站内容</p>
        </div>
        <Button variant="outline" onClick={fetchConfigs}>
          <RefreshCw className="h-4 w-4 mr-2" />
          刷新
        </Button>
      </div>

      <Tabs defaultValue="hero">
        <TabsList>
          <TabsTrigger value="hero">首页横幅</TabsTrigger>
          <TabsTrigger value="contact">联系信息</TabsTrigger>
          <TabsTrigger value="about">关于我们</TabsTrigger>
        </TabsList>

        {/* 首页横幅 */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>首页横幅配置</CardTitle>
              <CardDescription>配置首页 Hero 区域的内容</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>标签文字</Label>
                <Input
                  value={heroConfig.badge}
                  onChange={(e) => setHeroConfig({ ...heroConfig, badge: e.target.value })}
                  className="mt-1"
                  placeholder="2026 春季新品系列"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>标题第一行</Label>
                  <Input
                    value={heroConfig.title[0] || ''}
                    onChange={(e) =>
                      setHeroConfig({
                        ...heroConfig,
                        title: [e.target.value, heroConfig.title[1] || ''],
                      })
                    }
                    className="mt-1"
                    placeholder="发现更清晰"
                  />
                </div>
                <div>
                  <Label>标题第二行</Label>
                  <Input
                    value={heroConfig.title[1] || ''}
                    onChange={(e) =>
                      setHeroConfig({
                        ...heroConfig,
                        title: [heroConfig.title[0] || '', e.target.value],
                      })
                    }
                    className="mt-1"
                    placeholder="的视界"
                  />
                </div>
              </div>

              <div>
                <Label>副标题</Label>
                <Textarea
                  value={heroConfig.subtitle}
                  onChange={(e) => setHeroConfig({ ...heroConfig, subtitle: e.target.value })}
                  className="mt-1"
                  rows={3}
                  placeholder="将专业验光技术与时尚设计完美融合..."
                />
              </div>

              <div>
                <Label>背景图片链接</Label>
                <Input
                  value={heroConfig.backgroundImage}
                  onChange={(e) => setHeroConfig({ ...heroConfig, backgroundImage: e.target.value })}
                  className="mt-1"
                  placeholder="https://..."
                />
                {heroConfig.backgroundImage && (
                  <img
                    src={heroConfig.backgroundImage}
                    alt="Preview"
                    className="mt-2 h-32 w-full object-cover rounded-lg"
                  />
                )}
              </div>

              <Button onClick={() => saveConfig('hero', heroConfig)} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? '保存中...' : '保存'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 联系信息 */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>联系信息配置</CardTitle>
              <CardDescription>配置店铺联系方式</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>地址</Label>
                <Input
                  value={contactConfig.address}
                  onChange={(e) => setContactConfig({ ...contactConfig, address: e.target.value })}
                  className="mt-1"
                  placeholder="北京市朝阳区..."
                />
              </div>

              <div>
                <Label>电话（每行一个）</Label>
                <Textarea
                  value={contactConfig.phone.join('\n')}
                  onChange={(e) =>
                    setContactConfig({
                      ...contactConfig,
                      phone: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  className="mt-1"
                  rows={2}
                  placeholder="010-8888-8888"
                />
              </div>

              <div>
                <Label>邮箱</Label>
                <Input
                  value={contactConfig.email}
                  onChange={(e) => setContactConfig({ ...contactConfig, email: e.target.value })}
                  className="mt-1"
                  placeholder="service@example.com"
                />
              </div>

              <div>
                <Label>营业时间</Label>
                <Input
                  value={contactConfig.hours}
                  onChange={(e) => setContactConfig({ ...contactConfig, hours: e.target.value })}
                  className="mt-1"
                  placeholder="周一至周日 10:00 - 21:00"
                />
              </div>

              <Button onClick={() => saveConfig('contact_info', contactConfig)} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? '保存中...' : '保存'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 关于我们 */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>关于我们配置</CardTitle>
              <CardDescription>配置关于页面内容</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>标题</Label>
                  <Input
                    value={aboutConfig.title}
                    onChange={(e) => setAboutConfig({ ...aboutConfig, title: e.target.value })}
                    className="mt-1"
                    placeholder="十五年专注"
                  />
                </div>
                <div>
                  <Label>副标题</Label>
                  <Input
                    value={aboutConfig.subtitle}
                    onChange={(e) => setAboutConfig({ ...aboutConfig, subtitle: e.target.value })}
                    className="mt-1"
                    placeholder="只为清晰视界"
                  />
                </div>
              </div>

              <div>
                <Label>内容段落（每段一行）</Label>
                <Textarea
                  value={aboutConfig.paragraphs.join('\n\n')}
                  onChange={(e) =>
                    setAboutConfig({
                      ...aboutConfig,
                      paragraphs: e.target.value.split('\n\n').filter(Boolean),
                    })
                  }
                  className="mt-1"
                  rows={8}
                  placeholder="第一段内容...&#10;&#10;第二段内容..."
                />
              </div>

              <div>
                <Label>特色标签（逗号分隔）</Label>
                <Input
                  value={aboutConfig.features.join(', ')}
                  onChange={(e) =>
                    setAboutConfig({
                      ...aboutConfig,
                      features: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="mt-1"
                  placeholder="国家认证, 专业团队, 先进设备"
                />
              </div>

              <Button onClick={() => saveConfig('about', aboutConfig)} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? '保存中...' : '保存'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

