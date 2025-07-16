import { Star, Flame, Sparkles, Clock, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveToRecentlyViewed } from "@/utils/recent";

type Product = {
  id?: number;
  name: string;
  price: number;
  rating: number;
  reviews?: number;
  image: string;
  sale?: string;
  hot?: boolean;
  new?: boolean;
  lowStock?: boolean;
};

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    saveToRecentlyViewed({
      id: product.id ?? product.name.length + product.price,
      name: product.name,
      image: product.image,
      price: `$${product.price}`,
    });

    navigate("/product", { state: { product } });
  };

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer rounded-2xl border border-white/30 dark:border-white/10 p-4 shadow-md hover:shadow-xl transition 
                 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl backdrop-saturate-150 
                 ring-1 ring-white/10 overflow-hidden"
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 space-y-1">
        {product.sale && (
          <span className="flex items-center gap-1 bg-green-400 text-white text-[11px] font-bold px-2 py-1 rounded-sm shadow-md transform rotate-[-6deg] origin-top-left">
            <Percent className="w-3 h-3" />
            {product.sale}
          </span>
        )}
        {product.hot && (
          <span className="flex items-center gap-1 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full animate-bounce shadow-sm">
            <Flame className="w-3 h-3" />
            Hot
          </span>
        )}
        {product.new && (
          <span className="flex items-center gap-1 bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-inner shadow-blue-300">
            <Sparkles className="w-3 h-3" />
            New
          </span>
        )}
        {product.lowStock && (
          <span className="flex items-center gap-1 bg-yellow-300 text-black text-xs font-semibold px-2 py-0.5 rounded animate-pulse shadow-sm">
            <Clock className="w-3 h-3" />
            Only 3 Left
          </span>
        )}
      </div>

      {/* Product image */}
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-contain mb-4 rounded-2xl"
      />

      {/* Product name */}
      <h3 className="text-sm font-medium mb-1 text-gray-800 dark:text-gray-100">
        {product.name}
      </h3>

      {/* Rating */}
      <div className="flex items-center text-xs text-yellow-500 mb-1">
        {[...Array(product.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400" />
        ))}
        {product.reviews && (
          <span className="ml-1 text-gray-500 dark:text-gray-400">
            ({product.reviews})
          </span>
        )}
      </div>

      {/* Price */}
      <div className="text-lg font-semibold text-gray-800 dark:text-white">
        ${product.price}
      </div>
    </div>
  );
};

export default ProductCard;
