import { Scan, Wrench, ShieldCheck, HeartHandshake, Eye, Glasses, Star, Award, Loader2, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useServices } from '../hooks/useServices';

// 图标映射
const iconMap: { [key: string]: LucideIcon } = {
  Scan,
  Wrench,
  ShieldCheck,
  HeartHandshake,
  Eye,
  Glasses,
  Star,
  Award,
};

export function Services() {
  const { services, loading, error } = useServices();

  if (loading) {
    return (
      <section className="py-20 sm:py-28 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-500">加载服务中...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 sm:py-28 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[400px]">
          <p className="text-red-500">加载失败，请刷新页面重试</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 sm:py-28 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

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
            专业服务
          </motion.span>
          <h2 className="text-gray-900 mb-6 text-3xl sm:text-4xl lg:text-5xl">
            为您提供全方位体验
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            从专业验光到售后服务，我们始终以客户为中心，
            <br className="hidden sm:block" />
            为您打造完美的配镜体验
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon || ''] || ShieldCheck;
            const gradient = service.gradient || 'from-blue-500 to-cyan-500';

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="relative bg-white rounded-2xl p-8 h-full shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  {/* Animated Circle Background */}
                  <motion.div
                    className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Icon Container */}
                  <motion.div
                    className={`relative inline-flex w-16 h-16 sm:w-20 sm:h-20 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} mb-6 shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white relative z-10" />

                    {/* Pulse Effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient}`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-gray-900 mb-3 text-xl sm:text-2xl relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed relative z-10">
                    {service.description}
                  </p>

                  {/* Decorative Corner */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl ${gradient} opacity-10 rounded-tl-full`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Feature */}
        <motion.div
          className="mt-16 sm:mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-6 bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-4 rounded-full border border-blue-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-700">专业团队在线</span>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="text-gray-700">随时为您服务</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
