import { Glasses, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContactInfo } from '../hooks/useSiteConfig';

// 默认联系信息
const defaultContactInfo = {
  address: '北京市朝阳区建国路88号',
  phone: ['010-8888-8888'],
  email: 'service@mingshi-glasses.com',
  hours: '周一至周日 10:00 - 21:00',
};

export function Footer() {
  const { config: contactInfo } = useContactInfo();
  
  // 使用数据库配置，如果未加载则使用默认配置
  const contact = contactInfo || defaultContactInfo;
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3 sm:mb-4">
              <Glasses className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              <span className="text-lg sm:text-xl text-white">明视眼镜</span>
            </Link>
            <p className="text-gray-400 text-sm sm:text-base">
              专业验光，品质镜片
              <br />
              让世界更清晰
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-3 sm:mb-4 text-sm sm:text-base">快速链接</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
              <li>
                <Link to="/products" className="hover:text-blue-400 transition-colors">
                  产品系列
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition-colors">
                  专业服务
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white mb-3 sm:mb-4 text-sm sm:text-base">服务项目</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
              <li>专业验光</li>
              <li>眼镜定制</li>
              <li>镜片配制</li>
              <li>售后维护</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-3 sm:mb-4 text-sm sm:text-base">联系方式</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
              <li className="break-all">电话：{contact.phone[0]}</li>
              <li className="break-all">邮箱：{contact.email}</li>
              <li>地址：{contact.address}</li>
            </ul>
            <div className="flex gap-3 sm:gap-4 mt-3 sm:mt-4">
              <a href="#" className="hover:text-blue-400 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
          <p>&copy; 2026 明视眼镜. 版权所有.</p>
        </div>
      </div>
    </footer>
  );
}