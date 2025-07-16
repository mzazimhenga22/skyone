import ThemeToggle from "./ThemeToggle"; // ✅ Import it

const Footer = () => {
  return (
    <footer className="bg-transparent border-t border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-6 py-10 mt-10 transition-colors">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
        <div>
          <h3 className="text-gray-800 dark:text-gray-100 font-bold text-lg mb-2">SkyOne</h3>
          <p>Quality products for every lifestyle. Shop smarter with us.</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Shop</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">New Arrivals</a></li>
            <li><a href="#" className="hover:underline">Best Sellers</a></li>
            <li><a href="#" className="hover:underline">Discounts</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Company</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
          </ul>
        </div>

        <div className="flex flex-col items-start gap-2">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Follow Us</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <li><a href="#" className="hover:underline">X (Twitter)</a></li>
          </ul>

          {/* 🌗 Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-8">
        &copy; {new Date().getFullYear()} SkyOne. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
