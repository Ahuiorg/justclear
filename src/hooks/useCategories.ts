import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Category } from '../types/database'

interface UseCategoriesReturn {
  categories: Category[]
  loading: boolean
  error: Error | null
  refetch: () => void
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')

      if (fetchError) throw fetchError
      setCategories(data || [])
    } catch (e) {
      console.error('获取分类失败:', e)
      setError(e as Error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return { categories, loading, error, refetch: fetchCategories }
}

// 获取单个分类
export function useCategory(categoryId: string) {
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchCategory() {
      setLoading(true)
      setError(null)

      try {
        const { data, error: fetchError } = await supabase
          .from('categories')
          .select('*')
          .eq('id', categoryId)
          .single()

        if (fetchError) throw fetchError
        setCategory(data)
      } catch (e) {
        console.error('获取分类失败:', e)
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }

    if (categoryId) {
      fetchCategory()
    }
  }, [categoryId])

  return { category, loading, error }
}
