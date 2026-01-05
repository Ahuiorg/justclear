import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Product } from '../types/database'

interface UseProductsReturn {
  products: Product[]
  loading: boolean
  error: Error | null
  refetch: () => void
}

export function useProducts(category?: string): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')

      if (category) {
        query = query.eq('category', category)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError
      setProducts(data || [])
    } catch (e) {
      console.error('获取产品失败:', e)
      setError(e as Error)
    } finally {
      setLoading(false)
    }
  }, [category])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error, refetch: fetchProducts }
}

// 获取单个产品
export function useProduct(productId: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      setError(null)

      try {
        const { data, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single()

        if (fetchError) throw fetchError
        setProduct(data)
      } catch (e) {
        console.error('获取产品失败:', e)
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  return { product, loading, error }
}
