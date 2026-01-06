import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Check, Truck, Shield, RefreshCw } from 'lucide-react';
import { LoadingContent } from './ui/loading';
import { useProduct, useProducts } from '../hooks/useProducts';
import { useCategory } from '../hooks/useCategories';

export function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const { product, loading: productLoading, error: productError } = useProduct(productId || '');
  const { category, loading: categoryLoading } = useCategory(product?.category || '');
  const { products: relatedProductsAll, loading: relatedLoading } = useProducts(product?.category);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const loading = productLoading || categoryLoading;

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <LoadingContent text="正在加载商品详情..." />
      </div>
    );
  }

  if (productError || !product) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-gray-900 mb-4">产品未找到</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = relatedProductsAll
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    alert(`已将 ${quantity} 件商品加入购物车`);
  };

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8 overflow-x-auto">
          <Link to="/" className="hover:text-blue-600 whitespace-nowrap">首页</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-blue-600 whitespace-nowrap">
            {category?.name || product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 truncate">{product.name}</span>
        </div>

        {/* Product Content */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
          {/* Left - Images */}
          <div>
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-md sm:rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index
                        ? 'border-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - 图 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div>
            <h1 className="text-gray-900 mb-3 sm:mb-4 text-xl sm:text-2xl lg:text-3xl">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                      }`}
                  />
                ))}
                <span className="text-gray-600">{product.rating}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">{product.reviews} 条评价</span>
            </div>

            {/* Price */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                <span className="text-2xl sm:text-3xl lg:text-4xl text-blue-600">¥{product.price}</span>
                {product.original_price && (
                  <>
                    <span className="text-base sm:text-lg lg:text-xl text-gray-400 line-through">
                      ¥{product.original_price}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm">
                      省¥{product.original_price - product.price}
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-600">包邮 · 7天无理由退换</p>
            </div>

            {/* Description */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-gray-900 mb-2 text-base sm:text-lg">产品描述</h3>
              <p className="text-gray-600 text-sm sm:text-base">{product.description}</p>
            </div>

            {/* Material */}
            {product.material && (
              <div className="mb-4 sm:mb-6">
                <h3 className="text-gray-900 mb-2 text-base sm:text-lg">材质</h3>
                <p className="text-gray-600 text-sm sm:text-base">{product.material}</p>
              </div>
            )}

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mb-4 sm:mb-6">
                <h3 className="text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">颜色</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 border-2 rounded-lg transition-colors text-sm sm:text-base ${selectedColor === index
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">数量</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  -
                </button>
                <span className="w-12 sm:w-16 text-center text-base sm:text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  +
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-4 sm:mb-6">
              {product.in_stock ? (
                <div className="flex items-center gap-2 text-green-600 text-sm sm:text-base">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>有货</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600 text-sm sm:text-base">
                  <span>暂时缺货</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                className="flex-1 bg-blue-600 text-white py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                加入购物车
              </button>
              <button className="sm:w-auto px-6 py-3 sm:py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base">
                收藏
              </button>
            </div>

            {/* Service Info */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 bg-gray-50 p-4 sm:p-6 rounded-xl">
              <div className="flex items-start gap-2 sm:gap-3">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-gray-900 mb-0.5 sm:mb-1 text-xs sm:text-sm">满99包邮</h4>
                  <p className="text-xs text-gray-600">全国大部分地区</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-gray-900 mb-0.5 sm:mb-1 text-xs sm:text-sm">品质保证</h4>
                  <p className="text-xs text-gray-600">正品保障</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-gray-900 mb-0.5 sm:mb-1 text-xs sm:text-sm">7天退换</h4>
                  <p className="text-xs text-gray-600">无理由退换货</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-gray-900 mb-0.5 sm:mb-1 text-xs sm:text-sm">终身维护</h4>
                  <p className="text-xs text-gray-600">免费调整清洁</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Features */}
        {product.features.length > 0 && (
          <div className="mb-12 sm:mb-16">
            <h2 className="text-gray-900 mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl">产品特点</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {product.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <p className="text-gray-900 text-sm sm:text-base">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {!relatedLoading && relatedProducts.length > 0 && (
          <div>
            <h2 className="text-gray-900 mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl">相关推荐</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group bg-white rounded-lg sm:rounded-xl overflow-hidden border border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-gray-900 mb-2 group-hover:text-blue-600 transition-colors text-sm sm:text-base line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                      <span className="text-base sm:text-lg lg:text-xl text-blue-600">¥{relatedProduct.price}</span>
                      {relatedProduct.original_price && (
                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                          ¥{relatedProduct.original_price}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
