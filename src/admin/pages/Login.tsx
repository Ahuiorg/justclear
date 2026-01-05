import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { LoginForm } from '../components/LoginForm'

export function AdminLogin() {
  const navigate = useNavigate()
  const { signIn, isAdmin, loading, error } = useAuth()

  // 如果已登录，跳转到管理后台首页
  useEffect(() => {
    if (isAdmin) {
      navigate('/admin', { replace: true })
    }
  }, [isAdmin, navigate])

  const handleLogin = async (email: string, password: string) => {
    const success = await signIn(email, password)
    if (success) {
      navigate('/admin', { replace: true })
    }
  }

  return <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
}

