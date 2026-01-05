import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { HeroConfig, ContactInfoConfig, AboutConfig } from '../types/database'

interface UseSiteConfigReturn<T> {
  config: T | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

function useSiteConfig<T>(key: string): UseSiteConfigReturn<T> {
  const [config, setConfig] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchConfig = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('site_config')
        .select('value')
        .eq('key', key)
        .single()

      if (fetchError) throw fetchError
      setConfig(data?.value as T)
    } catch (e) {
      console.error(`获取配置 ${key} 失败:`, e)
      setError(e as Error)
    } finally {
      setLoading(false)
    }
  }, [key])

  useEffect(() => {
    fetchConfig()
  }, [fetchConfig])

  return { config, loading, error, refetch: fetchConfig }
}

// 导出具体配置的 hooks
export function useHeroConfig(): UseSiteConfigReturn<HeroConfig> {
  return useSiteConfig<HeroConfig>('hero')
}

export function useContactInfo(): UseSiteConfigReturn<ContactInfoConfig> {
  return useSiteConfig<ContactInfoConfig>('contact_info')
}

export function useAboutConfig(): UseSiteConfigReturn<AboutConfig> {
  return useSiteConfig<AboutConfig>('about')
}
