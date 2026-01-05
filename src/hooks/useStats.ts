import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Stat } from '../types/database'

interface UseStatsReturn {
  stats: Stat[]
  loading: boolean
  error: Error | null
  refetch: () => void
}

export function useStats(): UseStatsReturn {
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('stats')
        .select('*')
        .order('sort_order')

      if (fetchError) throw fetchError
      setStats(data || [])
    } catch (e) {
      console.error('获取统计失败:', e)
      setError(e as Error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return { stats, loading, error, refetch: fetchStats }
}
