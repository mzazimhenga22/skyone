import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const products = [
  {
    name: "Woman-Dress",
    price: 45,
    rating: 4,
    image: "/images/dress.jpg",
    hot: true,
    description: "Elegant and comfortable woman’s dress for casual and formal events.",
    images: ["/images/dress.jpg", "/images/dress-side.jpg", "/images/dress-back.jpg"],
  },
  {
    name: "Electric Juicer",
    price: 99.99,
    rating: 5,
    reviews: 100,
    image: "/images/juicer.jpg",
    new: true,
    description: "High-powered electric juicer with multiple speed settings.",
    images: ["/images/juicer.jpg", "/images/juicer-closeup.jpg"],
  },
  {
    name: "Wooden Chair",
    price: 119,
    rating: 5,
    reviews: 210,
    image: "/images/chair.jpg",
    lowStock: true,
    description: "Minimalist wooden chair crafted from premium oak.",
    images: ["/images/chair.jpg", "/images/chair-side.jpg", "/images/chair-top.jpg"],
  },
  {
    name: "White Headphones",
    price: 199,
    rating: 5,
    reviews: 90,
    sale: "30% OFF",
    image: "/images/headphones.jpg",
    description: "Wireless over-ear headphones with noise cancellation and rich sound.",
    images: ["/images/headphones.jpg", "/images/headphones-side.jpg", "/images/headphones-box.jpg"],
  },
];

const FeaturedProducts = () => {
  return (
    <div className="w-full px-4 sm:px-6 py-10 transition-colors duration-300">
      {/* Heading and See All */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Featured Products
        </h2>
        <Link
          to="/products"
          className="text-sm text-green-700 dark:text-green-400 hover:underline"
        >
          See All →
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product, i) => (
          <ProductCard product={product} key={i} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
