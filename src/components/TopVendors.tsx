import { Star, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const vendors = [
  {
    name: "Gadget World",
    logo: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    verified: true,
    category: "Electronics",
  },
  {
    name: "Chic Boutique",
    logo: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4,
    verified: true,
    category: "Fashion",
  },
  {
    name: "FreshHarvest",
    logo: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4,
    verified: false,
    category: "Groceries",
  },
  {
    name: "StudioStyle",
    logo: "https://randomuser.me/api/portraits/women/85.jpg",
    rating: 5,
    verified: true,
    category: "Beauty & Wellness",
  },
];

const TopVendors = () => {
  const navigate = useNavigate();

  return (
    <section className="px-6 py-10 transition-colors duration-300">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Top Vendors
        </h2>
        <button className="text-sm text-green-700 dark:text-green-400 hover:underline">
          See All Vendors →
        </button>
      </div>

      {/* Vendor Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {vendors.map((vendor, i) => (
          <div
            key={i}
            className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm bg-transparent hover:shadow-md transition"
          >
            <div className="relative w-fit mx-auto mb-3">
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="h-16 w-16 object-cover rounded-full border-2 border-green-500"
              />
              {vendor.verified && (
                <span className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-900 rounded-full p-0.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                </span>
              )}
            </div>

            <h3 className="text-center text-sm font-semibold text-gray-900 dark:text-white">
              {vendor.name}
            </h3>
            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              {vendor.category}
            </p>

            <div className="flex justify-center mt-2 text-yellow-500">
              {[...Array(vendor.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <button
          onClick={() => navigate("/apply-vendor")}
          className="px-6 py-3 rounded-full bg-green-700 hover:bg-green-800 text-white text-sm font-semibold shadow-md transition"
        >
          Join as a Vendor
        </button>
      </div>
    </section>
  );
};

export default TopVendors;
