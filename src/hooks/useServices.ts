import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Service } from '../types/database'

interface UseServicesReturn {
  services: Service[]
  loading: boolean
  error: Error | null
  refetch: () => void
}

export function useServices(): UseServicesReturn {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchServices = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')

      if (fetchError) throw fetchError
      setServices(data || [])
    } catch (e) {
      console.error('获取服务失败:', e)
      setError(e as Error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  return { services, loading, error, refetch: fetchServices }
}
