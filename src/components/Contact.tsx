import { MapPin, Phone, Mail, Clock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useAppointment } from '../hooks/useAppointment';
import { useContactInfo } from '../hooks/useSiteConfig';
import { APPOINTMENT_TYPES } from '../types/database';

// 默认联系信息（数据库未加载时使用）
const defaultContactInfo = {
  address: '地址加载中...',
  phone: ['电话加载中...'],
  email: 'service@justclear.cn',
  hours: '周一至周日 10:00 - 21:00',
};

export function Contact() {
  const { submitAppointment, submitting, error, success, reset } = useAppointment();
  const { config: contactInfo } = useContactInfo();
  
  // 使用数据库配置，如果未加载则使用默认配置
  const contact = contactInfo || defaultContactInfo;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    appointment_type: 'general' as keyof typeof APPOINTMENT_TYPES,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitAppointment({
      name: formData.name,
      phone: formData.phone,
      email: formData.email || null,
      message: formData.message || null,
      appointment_type: formData.appointment_type,
    });
    
    if (!error) {
      setFormData({ name: '', phone: '', email: '', message: '', appointment_type: 'general' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // 清除之前的成功/错误状态
    if (success || error) {
      reset();
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-gray-900 mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl">联系我们</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            欢迎到店咨询或在线预约，我们期待为您服务
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">门店地址</h3>
                <p className="text-gray-600 text-sm sm:text-base">{contact.address}</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">联系电话</h3>
                {contact.phone.map((phoneNumber, index) => (
                  <p key={index} className="text-gray-600 text-sm sm:text-base">{phoneNumber}</p>
                ))}
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">电子邮箱</h3>
                <p className="text-gray-600 text-sm sm:text-base">{contact.email}</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">营业时间</h3>
                <p className="text-gray-600 text-sm sm:text-base">{contact.hours}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-6 sm:p-8 rounded-xl sm:rounded-2xl">
            <h3 className="text-gray-900 mb-4 sm:mb-6 text-lg sm:text-xl">在线预约</h3>
            
            {/* 成功提示 */}
            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-800 font-medium">预约提交成功！</p>
                  <p className="text-green-600 text-sm">感谢您的预约，我们会尽快与您联系确认。</p>
                </div>
              </div>
            )}

            {/* 错误提示 */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 font-medium">提交失败</p>
                  <p className="text-red-600 text-sm">请稍后重试，或直接拨打我们的客服热线。</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2 text-sm sm:text-base">
                  姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="请输入您的姓名"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2 text-sm sm:text-base">
                  手机号码 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="请输入您的手机号码"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2 text-sm sm:text-base">
                  电子邮箱
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="请输入您的邮箱（选填）"
                />
              </div>

              <div>
                <label htmlFor="appointment_type" className="block text-gray-700 mb-2 text-sm sm:text-base">
                  预约类型
                </label>
                <select
                  id="appointment_type"
                  name="appointment_type"
                  value={formData.appointment_type}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  {Object.entries(APPOINTMENT_TYPES).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2 text-sm sm:text-base">
                  留言内容
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  disabled={submitting}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="请告诉我们您的需求..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    提交中...
                  </>
                ) : (
                  '提交预约'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
