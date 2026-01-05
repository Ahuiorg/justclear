import { Scan, Wrench, ShieldCheck, HeartHandshake, Eye, Clock, Users, Phone } from 'lucide-react';

const services = [
  {
    id: 1,
    title: '专业验光',
    description: '采用国际先进的验光设备，由资深验光师为您提供精准的视力检测和配镜建议',
    icon: Scan,
    details: [
      '电脑验光仪精确测量',
      '综合验光仪专业检测',
      '试戴体验确保舒适',
      '配镜方案个性定制',
    ],
  },
  {
    id: 2,
    title: '免费调整',
    description: '终身免费调整镜架，确保眼镜始终保持最佳佩戴状态，让您佩戴更舒适',
    icon: Wrench,
    details: [
      '镜架变形矫正',
      '鼻托位置调整',
      '镜腿松紧调节',
      '螺丝紧固检查',
    ],
  },
  {
    id: 3,
    title: '品质保证',
    description: '所有镜片均提供品质保证，支持30天无理由退换，让您购买无忧',
    icon: ShieldCheck,
    details: [
      '30天无理由退换',
      '一年质量保修',
      '正品保证承诺',
      '假一赔十',
    ],
  },
  {
    id: 4,
    title: '贴心服务',
    description: '一对一专业咨询，根据您的脸型、使用场景推荐最适合的眼镜款式',
    icon: HeartHandshake,
    details: [
      '脸型分析匹配',
      '使用场景评估',
      '款式风格推荐',
      '售后跟踪服务',
    ],
  },
];

const processes = [
  {
    step: 1,
    title: '视力检测',
    description: '专业验光师为您进行全面的视力检查',
    icon: Eye,
  },
  {
    step: 2,
    title: '选择镜架',
    description: '根据脸型和喜好挑选合适的镜架',
    icon: Users,
  },
  {
    step: 3,
    title: '镜片定制',
    description: '选择适合的镜片类型和功能',
    icon: ShieldCheck,
  },
  {
    step: 4,
    title: '加工制作',
    description: '专业设备精密加工，确保品质',
    icon: Clock,
  },
];

export function ServicesPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-gray-900 mb-6">专业服务</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我们致力于为每一位顾客提供专业、贴心的服务体验，
            从验光到配镜，从售前到售后，全程陪伴您的清晰视界
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-gray-900 mb-2">{service.title}</h2>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
              <div className="space-y-3">
                {service.details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                    <span className="text-gray-700">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-3xl p-8 md:p-12 mb-20">
          <h2 className="text-gray-900 text-center mb-12">配镜流程</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {processes.map((process, index) => (
              <div key={process.step} className="relative">
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-4">
                    <process.icon className="w-10 h-10 text-blue-600" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                      {process.step}
                    </div>
                  </div>
                  <h3 className="text-gray-900 mb-2">{process.title}</h3>
                  <p className="text-gray-600">{process.description}</p>
                </div>
                {index < processes.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-blue-200" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-white mb-4">需要专业的验光服务？</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            我们的专业团队随时为您服务，现在预约可享受免费验光体验
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:010-8888-8888"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-5 h-5" />
              立即致电预约
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors border-2 border-white/20"
            >
              在线预约
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
