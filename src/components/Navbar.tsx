import {
  ShoppingCart,
  User,
  Store,
  HelpCircle,
  Phone,
  PackageSearch,
  Info,
  LogOut,
  Search,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabaseClient";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const { cart } = useCart();
  const navigate = useNavigate();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAdmin, setIsAdmin] = useState(false);


  // Load current Supabase session
  useEffect(() => {
    const getUser = async () => {
      // Force fresh session
      await supabase.auth.refreshSession();
      const { data: { session } } = await supabase.auth.getSession();
  
      if (session?.user) {
        const userName = session.user.user_metadata?.name || session.user.email;
        setUser(userName);
        // Ensure isAdmin is set correctly
        setIsAdmin(!!session.user.user_metadata?.isAdmin); // Convert to boolean
        console.log("isAdmin set to:", !!session.user.user_metadata?.isAdmin);
      }
    };
  
    getUser();
  
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
  
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);
  

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/signin");
  };

  return (
    <>
      <header className="w-full px-2 sm:px-4 py-2 sm:py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-transparent border-b border-white/20 dark:border-white/10 shadow-md transition">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 -my-1">
          <img
            src="/images/logo.png"
            alt="SkyOne Logo"
            className="h-10 sm:h-14 object-contain"
          />
          <span className="sr-only">SkyOne</span>
        </Link>

        {/* Mobile Right Icons */}
        <div className="flex items-center justify-end md:hidden space-x-2">
          <Link
            to="/vendor-dashboard"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Store className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </Link>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex w-full max-w-xl mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/vendor-dashboard"
            className="hidden md:inline-flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Store className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </Link>

          {/* More Menu */}
          <div className="relative">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400"
            >
              More ▾
            </button>
            {isMoreOpen && (
              <div className="absolute right-0 mt-2 w-44 z-50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl shadow-md">
                <Link to="/vendor-dashboard" className="dropdown-link">
                  <Store className="w-4 h-4" />
                  Vendors
                </Link>
                <Link to="/Order-Tracking" className="dropdown-link">
                  <PackageSearch className="w-4 h-4" />
                  Order Tracking
                </Link>
                <Link to="/support" className="dropdown-link">
                  <HelpCircle className="w-4 h-4" />
                  Support
                </Link>
                <Link to="/support" className="dropdown-link">
                  <Info className="w-4 h-4" />
                  FAQ
                </Link>
                <Link to="/contact" className="dropdown-link">
                  <Phone className="w-4 h-4" />
                  Contact Us
                </Link>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            {isDropdownOpen && user && (
              <div className="absolute right-0 mt-2 w-44 z-50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl shadow-md">
                <span className="block px-4 py-2 text-sm font-semibold text-gray-800 dark:text-white">
                  Hello, {user}
                </span>
                <Link to="/account" className="dropdown-link">
                  <User className="w-4 h-4" />
                  Account
                </Link>
                {isAdmin && (
  <Link to="/admin-dashboard" className="dropdown-link">
    <User className="w-4 h-4" />
    Admin Panel
  </Link>
)}

                <Link to="/vendor-dashboard" className="dropdown-link">
                  <Store className="w-4 h-4" />
                  Vendor Portal
                </Link>
                <button
                  onClick={handleLogout}
                  className="dropdown-link w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Sign In */}
          {!user && (
            <Link
              to="/signin"
              className="px-4 py-1 border border-gray-300 dark:border-gray-700 rounded-full text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Sign In
            </Link>
          )}

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Search Modal */}
      {isSearchOpen && (
        <div className="fixed top-16 left-0 w-full px-4 py-4 z-40 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700 shadow-md transition-all">
          <div ref={modalRef} className="relative w-full max-w-lg mx-auto">
            <input
              autoFocus
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
