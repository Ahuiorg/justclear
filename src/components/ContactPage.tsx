import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('感谢您的留言，我们会尽快与您联系！');
    setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-gray-900 mb-6">联系我们</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            无论您有任何疑问或需求，我们都非常乐意为您提供帮助。
            欢迎通过以下方式与我们联系，或直接到店咨询
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-4">电话联系</h3>
            <div className="space-y-2 text-gray-600">
              <p>门店电话：010-8888-8888</p>
              <p>客服热线：400-888-8888</p>
              <p className="text-sm text-gray-500">周一至周日 9:00-22:00</p>
            </div>
            <a
              href="tel:010-8888-8888"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mt-4"
            >
              立即拨打
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-4">邮件联系</h3>
            <div className="space-y-2 text-gray-600">
              <p>service@mingshi-glasses.com</p>
              <p>info@mingshi-glasses.com</p>
              <p className="text-sm text-gray-500">24小时内回复</p>
            </div>
            <a
              href="mailto:service@mingshi-glasses.com"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mt-4"
            >
              发送邮件
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-4">门店地址</h3>
            <div className="space-y-2 text-gray-600">
              <p>北京市朝阳区建国路88号</p>
              <p>现代城购物中心2层</p>
              <p className="text-sm text-gray-500">地铁1号线国贸站C口</p>
            </div>
            <a
              href="#map"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mt-4"
            >
              查看地图
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              <h2 className="text-gray-900">在线留言</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    placeholder="请输入您的姓名"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    手机号码 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    placeholder="请输入您的手机号码"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  电子邮箱
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                  placeholder="请输入您的邮箱（选填）"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">
                  咨询类型 <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                >
                  <option value="">请选择咨询类型</option>
                  <option value="验光预约">验光预约</option>
                  <option value="产品咨询">产品咨询</option>
                  <option value="售后服务">售后服务</option>
                  <option value="合作洽谈">合作洽谈</option>
                  <option value="其他">其他</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  留言内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors resize-none"
                  placeholder="请详细描述您的问题或需求..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                提交留言
              </button>
            </form>
          </div>

          {/* Store Info & Hours */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-blue-600" />
                <h2 className="text-gray-900">营业时间</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">周一至周五</span>
                  <span className="text-gray-900">10:00 - 21:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">周六至周日</span>
                  <span className="text-gray-900">10:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">法定节假日</span>
                  <span className="text-gray-900">10:00 - 22:00</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-white mb-4">预约验光享优惠</h3>
              <p className="text-blue-100 mb-6">
                现在预约专业验光服务，即可享受配镜9折优惠，还有精美礼品赠送！
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  专业验光师服务
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  免费建立视力档案
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  配镜9折优惠
                </li>
              </ul>
              <a
                href="tel:010-8888-8888"
                className="block w-full bg-white text-blue-600 text-center py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                立即预约：010-8888-8888
              </a>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div id="map" className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-gray-900 mb-6">门店位置</h2>
          <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">地图位置</p>
              <p className="text-sm text-gray-400 mt-1">北京市朝阳区建国路88号现代城购物中心2层</p>
            </div>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <p className="text-gray-900 mb-1">🚇 地铁</p>
              <p>1号线国贸站C口，步行5分钟</p>
            </div>
            <div>
              <p className="text-gray-900 mb-1">🚌 公交</p>
              <p>建国路站：1路、4路、37路、728路</p>
            </div>
            <div>
              <p className="text-gray-900 mb-1">🅿️ 停车</p>
              <p>商场地下停车场，3小时免费</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
