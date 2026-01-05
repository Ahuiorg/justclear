import { Award, Users, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAboutConfig } from '../hooks/useSiteConfig';
import { useStats } from '../hooks/useStats';

// 默认配置
const defaultAboutConfig = {
  title: '十五年专注',
  subtitle: '只为清晰视界',
  paragraphs: [
    '明视眼镜成立于2009年，是一家专注于提供高品质眼镜产品和专业视光服务的连锁眼镜店。我们秉承"专业、品质、服务"的经营理念，致力于为每一位顾客带来清晰舒适的视觉体验。',
    '我们拥有专业的验光团队，所有验光师均持有国家认证资格证书，并定期参加专业培训。店内配备先进的验光设备和检测仪器，确保为您提供精准的验光服务。',
    '我们精选国内外知名品牌镜架和镜片，涵盖各种风格和价位，无论您是追求时尚潮流，还是注重实用舒适，都能在这里找到心仪的眼镜。',
  ],
  features: ['国家认证', '专业团队', '先进设备', '优质服务'],
};

const defaultStats = [
  { id: 1, value: '15+', label: '年行业经验', icon: 'Award', color: 'from-blue-500 to-cyan-500' },
  { id: 2, value: '50000+', label: '服务客户', icon: 'Users', color: 'from-purple-500 to-pink-500' },
  { id: 3, value: '4.9', label: '客户评分', icon: 'Star', color: 'from-yellow-500 to-orange-500' },
  { id: 4, value: '98%', label: '满意度', icon: 'TrendingUp', color: 'from-green-500 to-emerald-500' },
];

// 图标映射
const iconMap = {
  Award,
  Users,
  Star,
  TrendingUp,
};

export function About() {
  const { config: aboutConfig } = useAboutConfig();
  const { stats: dbStats } = useStats();

  // 使用数据库配置，如果未加载则使用默认配置
  const config = aboutConfig || defaultAboutConfig;
  
  // 将数据库统计数据与图标映射组合
  const displayStats = dbStats.length > 0 
    ? dbStats.map((stat, index) => ({
        ...stat,
        icon: iconMap[stat.icon as keyof typeof iconMap] || defaultStats[index]?.icon || Award,
        color: stat.color || defaultStats[index]?.color || 'from-blue-500 to-cyan-500',
      }))
    : defaultStats.map(stat => ({
        ...stat,
        icon: iconMap[stat.icon as keyof typeof iconMap] || Award,
      }));
  return (
    <section id="about" className="py-20 sm:py-28 lg:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block text-blue-600 mb-4 uppercase tracking-wider text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              关于我们
            </motion.span>

            <h2 className="text-gray-900 mb-6 text-3xl sm:text-4xl lg:text-5xl">
              {config.title}
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {config.subtitle}
              </span>
            </h2>

            <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed">
              {config.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Feature List */}
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {config.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Stats */}
          <motion.div
            className="grid grid-cols-2 gap-4 sm:gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {displayStats.map((stat, index) => (
              <motion.div
                key={stat.id}
                className="group relative bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Animated Circle */}
                <motion.div
                  className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Icon */}
                <motion.div
                  className={`inline-flex w-12 h-12 sm:w-14 sm:h-14 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} mb-4 relative z-10 shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </motion.div>

                {/* Value */}
                <motion.div
                  className="text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2 relative z-10"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                >
                  {stat.value}
                </motion.div>

                {/* Label */}
                <div className="text-gray-600 text-sm sm:text-base relative z-10">
                  {stat.label}
                </div>

                {/* Bottom Border */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Add CSS for blob animation */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: trangray(0, 0) scale(1); }
          25% { transform: trangray(20px, -20px) scale(1.1); }
          50% { transform: trangray(-20px, 20px) scale(0.9); }
          75% { transform: trangray(20px, 20px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}