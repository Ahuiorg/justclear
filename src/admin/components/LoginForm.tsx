import { useState } from 'react'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react'

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>
  loading: boolean
  error: Error | null
}

export function LoginForm({ onSubmit, loading, error }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(email, password)
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: 'linear-gradient(to bottom right, #111827, #000000, #111827)' }}
    >
      <div className="w-80">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl px-6 py-8 border border-white/10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 mb-4 shadow-lg shadow-blue-500/25">
              <span className="text-2xl font-bold text-white">JC</span>
            </div>
            <h1 className="text-2xl font-semibold text-white mb-1">欢迎回来</h1>
            <p className="text-gray-400 text-sm">登录 佳视康 管理后台</p>
          </div>

          {/* 表单 */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-gray-300 text-sm">
                邮箱地址
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@justclear.local"
                required
                disabled={loading}
                className="h-11 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 focus:bg-white/10 transition-colors rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-gray-300 text-sm">
                密码
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="输入密码"
                  required
                  disabled={loading}
                  className="h-11 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 focus:bg-white/10 transition-colors rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400">
                  {error.message === 'Invalid login credentials'
                    ? '邮箱或密码错误'
                    : error.message}
                </p>
              </div>
            )}

            <div className="pt-3 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="group relative px-8 h-10 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>登录中...</span>
                  </>
                ) : (
                  <>
                    <span>登录</span>
                    <LogIn className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* 分隔线 */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-xs text-gray-500 text-center">
              仅限授权管理员登录
            </p>
          </div>
        </div>

        {/* 版权 */}
        <p className="mt-6 text-center text-xs text-gray-600">
          © 2026 佳视康 · justclear 眼镜店
        </p>
      </div>
    </div>
  )
}

