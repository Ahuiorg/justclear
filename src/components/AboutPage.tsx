import { Award, Users, Star, TrendingUp, Target, Heart, Lightbulb, MapPin, Phone, Clock } from 'lucide-react';
import { useContactInfo } from '../hooks/useSiteConfig';

const stats = [
  { id: 1, value: '15+', label: '年行业经验', icon: Award },
  { id: 2, value: '50000+', label: '服务客户', icon: Users },
  { id: 3, value: '4.9', label: '客户评分', icon: Star },
  { id: 4, value: '98%', label: '满意度', icon: TrendingUp },
];

const values = [
  {
    icon: Target,
    title: '专业至上',
    description: '我们拥有国家认证的验光师团队，每一位成员都具备丰富的专业知识和实践经验',
  },
  {
    icon: Heart,
    title: '用心服务',
    description: '将每一位顾客视为家人，用心倾听需求，用爱提供服务，让您感受到家的温暖',
  },
  {
    icon: Lightbulb,
    title: '不断创新',
    description: '紧跟行业发展，引进最新技术和设备，为您提供更优质的产品和服务体验',
  },
];

const timeline = [
  {
    year: '2009',
    title: '品牌创立',
    description: '佳视康眼镜在北京成立，开设第一家门店',
  },
  {
    year: '2012',
    title: '专业认证',
    description: '获得国家眼镜行业质量认证，建立专业验光团队',
  },
  {
    year: '2015',
    title: '快速发展',
    description: '业务拓展至华北地区，服务客户突破10000人次',
  },
  {
    year: '2018',
    title: '品牌升级',
    description: '引进国际先进验光设备，与多个国际品牌建立合作',
  },
  {
    year: '2022',
    title: '数字化转型',
    description: '开启线上线下一体化服务，提供更便捷的购物体验',
  },
  {
    year: '2026',
    title: '持续前行',
    description: '服务客户超过50000人，持续为顾客提供优质服务',
  },
];

const team = [
  {
    name: '张明',
    position: '首席验光师',
    experience: '15年经验',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
  {
    name: '李静',
    position: '高级验光师',
    experience: '12年经验',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    name: '王强',
    position: '配镜技师',
    experience: '10年经验',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    name: '陈欣',
    position: '客户顾问',
    experience: '8年经验',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
];

export function AboutPage() {
  const { config: contactInfo } = useContactInfo();

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-gray-900 mb-6">关于我们</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            佳视康眼镜成立于2009年，秉承"专业、品质、服务"的经营理念，
            致力于为每一位顾客带来清晰舒适的视觉体验
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-gradient-to-br from-blue-50 to-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-4">
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-gray-900 mb-6">我们的故事</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                佳视康眼镜成立于2009年，是一家专注于提供高品质眼镜产品和专业视光服务的连锁眼镜店。
                创始人张明先生拥有超过15年的验光经验，怀着为更多人带来清晰视界的理想，创立了佳视康眼镜。
              </p>
              <p>
                我们拥有专业的验光团队，所有验光师均持有国家认证资格证书，并定期参加专业培训。
                店内配备先进的验光设备和检测仪器，确保为您提供精准的验光服务。
              </p>
              <p>
                从创立至今，我们始终坚持"顾客至上"的服务理念，用专业的技术和真诚的态度，
                为每一位顾客提供最适合的眼镜解决方案。我们不仅仅是在销售眼镜，
                更是在守护您和家人的视力健康。
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1682664175900-7771b38e1585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBleWVnbGFzc2VzJTIwc3RvcmV8ZW58MXx8fHwxNzY3NTc2NzU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="店铺形象"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-gray-900 text-center mb-12">我们的价值观</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <h2 className="text-gray-900 text-center mb-12">发展历程</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform -trangray-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-white border-2 border-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="text-3xl text-blue-600 mb-2">{item.year}</div>
                      <h3 className="text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:flex absolute left-1/2 w-4 h-4 bg-blue-600 rounded-full transform -trangray-x-1/2 ring-4 ring-white" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-gray-900 text-center mb-12">专业团队</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 mb-1">{member.position}</p>
                <p className="text-sm text-gray-500">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Store Location */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-gray-900 mb-6">门店位置</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 mb-1">{contactInfo?.address || '地址加载中...'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 mb-1">联系电话</p>
                    <p className="text-gray-600">
                      {contactInfo?.phone?.join(' / ') || '电话加载中...'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 mb-1">营业时间</p>
                    <p className="text-gray-600">{contactInfo?.hours || '营业时间加载中...'}</p>
                  </div>
                </div>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6"
              >
                联系我们
              </a>
            </div>
            <div className="h-80 bg-gray-200 rounded-2xl flex items-center justify-center">
              <MapPin className="w-16 h-16 text-gray-400" />
              <span className="ml-2 text-gray-500">地图位置</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
