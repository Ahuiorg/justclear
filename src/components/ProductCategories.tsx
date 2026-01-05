import { Sun, Glasses, Eye, Baby, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

export function ProductCategories() {
  const { categories, loading, error } = useCategories();

  if (loading) {
    return (
      <section className="py-20 sm:py-28 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-500">加载分类中...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 sm:py-28 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[400px]">
          <p className="text-red-500">加载失败，请刷新页面重试</p>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 sm:py-28 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block text-blue-600 mb-4 uppercase tracking-wider text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            精选系列
          </motion.span>
          <h2 className="text-gray-900 mb-6 text-3xl sm:text-4xl lg:text-5xl">
            为每种风格而设计
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            从经典到前卫，从运动到商务，每一款产品都经过精心设计，
            <br className="hidden sm:block" />
            只为让您在任何场合都能展现独特魅力
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category.id] || Glasses;
            const image = category.image_url || categoryImages[category.id] || categoryImages.optical;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link
                  to={`/category/${category.id}`}
                  className="group relative block h-[400px] sm:h-[500px] rounded-3xl overflow-hidden bg-gray-900"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
                  </div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-3xl border-2 border-white/20" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-8 sm:p-10">
                    {/* Icon */}
                    <motion.div
                      className="mb-6 inline-flex w-16 h-16 sm:w-20 sm:h-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-white mb-4 text-2xl sm:text-3xl lg:text-4xl">
                      {category.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 text-base sm:text-lg leading-relaxed">
                      {category.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-3 text-white group-hover:gap-4 transition-all duration-300">
                      <span className="text-lg">探索系列</span>
                      <svg
                        className="w-6 h-6 transform group-hover:trangray-x-2 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>

                    {/* Decorative Line */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    />
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-lg group"
          >
            <span>查看所有产品</span>
            <svg
              className="w-5 h-5 group-hover:trangray-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
