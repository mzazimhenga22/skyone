import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductsPage from "./pages/products";
import CategoryPage from "./pages/CategoryPage";
import ApplyVendorPage from "./pages/ApplyVendorPage";
import VendorDashboardPage from "./pages/VendorDashboardPage.tsx";
import VendorPortal from "./pages/VendorPortalPage.tsx";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import SupportPage from "./pages/SupportPage";
import ContactPage from "./pages/ContactPage";
import AccountPage from "./pages/AccountPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const location = useLocation();

  // Determine whether to hide navbar/footer on these pages
  const hideNavbarRoutes = ["/signin", "/signup"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  const [isDarkMode, _setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div
      className="flex flex-col min-h-screen
                 bg-[#d3d2d2] dark:bg-gray-950
                 text-gray-900 dark:text-white
                 transition-colors duration-300"
    >
      {!shouldHideNavbar && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/apply-vendor" element={<ApplyVendorPage />} />
          <Route path="/vendor-dashboard" element={<VendorDashboardPage />} />
          <Route path="/vendor-portal" element={<VendorPortal />} />
          <Route path="/Order-Tracking" element={<OrderTrackingPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>

      {!shouldHideNavbar && <Footer />}
    </div>
  );
}

export default App;
