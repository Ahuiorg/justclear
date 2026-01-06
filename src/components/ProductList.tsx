import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, SlidersHorizontal, Grid3x3, LayoutGrid } from 'lucide-react';
import { LoadingContent } from './ui/loading';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCategory } from '../hooks/useCategories';

export function ProductList() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid');

  const { products, loading: productsLoading, error: productsError } = useProducts(categoryId);
  const { category, loading: categoryLoading, error: categoryError } = useCategory(categoryId || '');

  const loading = productsLoading || categoryLoading;
  const error = productsError || categoryError;

  // Sorting logic
  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    if (sortBy === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  }, [products, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24">
        <LoadingContent text="正在加载产品列表..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">加载失败，请刷新页面重试</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">分类不存在</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-trangray-x-1 transition-transform" />
            返回首页
          </Link>
        </motion.div>

        {/* Category Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-gray-900 mb-4 text-3xl sm:text-4xl lg:text-5xl">
            {category.name}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-2">{category.description}</p>
          <p className="text-blue-600">共 {sortedProducts.length} 款产品</p>
        </motion.div>

        {/* Filters and View Controls */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 flex-1">
            <SlidersHorizontal className="w-5 h-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 sm:flex-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="default">默认排序</option>
              <option value="price-low">价格从低到高</option>
              <option value="price-high">价格从高到低</option>
              <option value="rating">评分最高</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('large')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'large'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">该分类暂无产品</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              className={viewMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
                : 'grid grid-cols-1 md:grid-cols-2 gap-6'
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="group block bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100"
                  >
                    {/* Product Image */}
                    <div className={`relative ${viewMode === 'grid' ? 'aspect-square' : 'aspect-[4/3]'} overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                        {product.original_price && (
                          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs shadow-lg">
                            特惠
                          </div>
                        )}
                        {!product.in_stock && (
                          <div className="ml-auto bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                            缺货
                          </div>
                        )}
                      </div>

                      {/* Quick View Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Product Info */}
                    <div className={`p-4 ${viewMode === 'large' ? 'sm:p-6' : ''}`}>
                      <h3 className={`text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 ${viewMode === 'large' ? 'text-xl' : 'text-sm sm:text-base'}`}>
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(product.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500">({product.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${viewMode === 'large' ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>
                          ¥{product.price}
                        </span>
                        {product.original_price && (
                          <span className="text-xs sm:text-sm text-gray-400 line-through">
                            ¥{product.original_price}
                          </span>
                        )}
                      </div>

                      {/* Features */}
                      {viewMode === 'large' && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.features.slice(0, 3).map((feature, i) => (
                            <span
                              key={i}
                              className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Add to Cart Button */}
                      <motion.button
                        onClick={(e) => {
                          e.preventDefault();
                          alert('已添加到购物车');
                        }}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        disabled={!product.in_stock}
                        whileHover={{ scale: product.in_stock ? 1.02 : 1 }}
                        whileTap={{ scale: product.in_stock ? 0.98 : 1 }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {product.in_stock ? '加入购物车' : '暂时缺货'}
                      </motion.button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
