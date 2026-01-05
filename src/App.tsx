import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { ProductsPage } from "./components/ProductsPage";
import { ProductList } from "./components/ProductList";
import { ProductDetail } from "./components/ProductDetail";
import { ServicesPage } from "./components/ServicesPage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";

// 管理后台组件
import { AdminLayout } from "./admin/components/AdminLayout";
import { AdminLogin } from "./admin/pages/Login";
import { Dashboard } from "./admin/pages/Dashboard";
import { AppointmentsPage } from "./admin/pages/Appointments";
import { ProductsPage as AdminProductsPage } from "./admin/pages/Products";
import { CategoriesPage } from "./admin/pages/Categories";
import { ServicesPage as AdminServicesPage } from "./admin/pages/Services";
import { SettingsPage } from "./admin/pages/Settings";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 前台路由 */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-white">
              <Navigation />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route
                    path="/category/:categoryId"
                    element={<ProductList />}
                  />
                  <Route
                    path="/product/:productId"
                    element={<ProductDetail />}
                  />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />

        {/* 管理后台路由 */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="services" element={<AdminServicesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
