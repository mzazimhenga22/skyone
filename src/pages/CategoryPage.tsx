import { useSearchParams, Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { allProducts } from "@/data/products";
import type { Product } from "@/data/products";

const categories = [
  { name: "Kitchen", image: "/images/kitchen.jpg" },
  { name: "Food", image: "/images/food.jpg" },
  { name: "Fashion", image: "/images/fashion.jpg" },
  { name: "Electronics", image: "/images/electronics.jpg" },
  { name: "Beauty", image: "/images/beauty.jpg" },
  { name: "Toys", image: "/images/toys.jpg" },
];

const normalize = (str: string) => str.trim().toLowerCase();

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("name") || "All";

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>("");

  useEffect(() => {
    let filtered =
      normalize(category) === "all"
        ? allProducts
        : allProducts.filter(
            (product) => normalize(product.category) === normalize(category)
          );

    if (sortBy === "priceLow") filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "priceHigh") filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);

    setFilteredProducts(filtered);
  }, [category, sortBy]);

  return (
    <div className="min-h-screen px-6 py-12 bg-[#d3d2d2]/60 dark:bg-gray-950/60 text-gray-900 dark:text-white transition-colors duration-300 rounded-xl">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        <Link to="/" className="hover:underline">Home</Link> /{" "}
        <span className="capitalize">{category}</span>
      </div>

      {/* Header & Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold capitalize">{category} Products</h2>
        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded border text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600"
        >
          <option value="">Sort By</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Category Carousel */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-4">Browse Other Categories</h3>
        <div className="grid grid-cols-3 sm:flex sm:justify-start gap-4 overflow-x-auto no-scrollbar">
          {categories
            .filter((cat) => normalize(cat.name) !== normalize(category))
            .map((cat, i) => (
              <Link to={`/category?name=${encodeURIComponent(cat.name)}`} key={i}>
                <div className="flex flex-col items-center w-20">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 dark:bg-gray-800 shadow-md flex items-center justify-center overflow-hidden hover:scale-105 transition-transform">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span className="mt-2 text-xs sm:text-sm text-center text-gray-700 dark:text-gray-300">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, i) => (
            <ProductCard product={product} key={i} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 dark:text-gray-400 mt-20">
          <p className="text-lg mb-2">No products found in <strong>{category}</strong>.</p>
          <p className="text-sm">Try selecting a different category above.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
