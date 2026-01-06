import { Link } from 'react-router-dom';
import { Sun, Glasses, Eye, Baby } from 'lucide-react';
import { LoadingContent } from './ui/loading';
import { useCategories } from '../hooks/useCategories';

const categoryIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  sunglasses: Sun,
  optical: Glasses,
  contact: Eye,
  kids: Baby,
};

const categoryImages: { [key: string]: string } = {
  sunglasses: 'https://images.unsplash.com/photo-1764778055595-b641b067ab40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdW5nbGFzc2VzJTIwZGlzcGxheXxlbnwxfHx8fDE3Njc1NzY3NTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  optical: 'https://images.unsplash.com/photo-1617791932882-a70117e3564d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzY3JpcHRpb24lMjBnbGFzc2VzJTIwZnJhbWVzfGVufDF8fHx8MTc2NzU3Njc2MHww&ixlib=rb-4.1.0&q=80&w=1080',
  contact: 'https://images.unsplash.com/photo-1664249969357-258131844a38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWV3ZWFyJTIwZmFzaGlvbnxlbnwxfHx8fDE3Njc1NzY3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  kids: 'https://images.unsplash.com/photo-1682664175900-7771b38e1585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBleWVnbGFzc2VzJTIwc3RvcmV8ZW58MXx8fHwxNzY3NTc2NzU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
};

export function ProductsPage() {
  const { categories, loading, error } = useCategories();

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-gray-50">
        <LoadingContent text="正在加载产品分类..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">加载失败，请刷新页面重试</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-gray-900 mb-6">产品中心</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            从时尚太阳镜到专业光学镜片，我们提供多样化的产品选择。
            每一款产品都经过精心挑选，确保品质与时尚兼具。
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {categories.map((category) => {
            const Icon = categoryIcons[category.id] || Glasses;
            const image = category.image_url || categoryImages[category.id] || categoryImages.optical;
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-white">{category.name}</h2>
                  </div>
                  <p className="text-gray-200 text-lg mb-4">{category.description}</p>
                  <div className="inline-flex items-center gap-2 text-white group-hover:gap-3 transition-all">
                    <span>浏览产品</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300" />
              </Link>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12">
          <h2 className="text-gray-900 text-center mb-8">为什么选择我们的产品</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-gray-900 mb-2">品质保证</h3>
              <p className="text-gray-600">精选国内外知名品牌，所有产品均提供正品保证和质量保障</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-gray-900 mb-2">价格实惠</h3>
              <p className="text-gray-600">直接对接品牌厂商，省去中间环节，为您提供最优惠的价格</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-gray-900 mb-2">定期更新</h3>
              <p className="text-gray-600">紧跟时尚潮流，定期上新款式，让您拥有最新的眼镜选择</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
