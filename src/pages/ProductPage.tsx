import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Star,
  Heart,
  Minus,
  Plus,
  Facebook,
  Twitter,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const tabs = ["Description", "Customer Reviews", "Specifications", "Shipping & Returns", "FAQs"];

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Description");
  const [wishlisted, setWishlisted] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    if (!product) {
      navigate("/");
    } else if (product.images?.length) {
      setSelectedImage(product.images[0]);
    } else if (product.image) {
      setSelectedImage(product.image);
    }
    if (product?.variants?.length) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product, navigate]);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addToCart({
      id: product.id || Date.now(),
      name: product.name,
      price: product.price,
      quantity,
      image: selectedImage || product.image,
      variant: selectedVariant ?? undefined,
    });
    setShowDialog(true);
    setTimeout(() => setShowDialog(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  if (!product || !selectedImage) return null;

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-20 bg-transparent text-gray-900 dark:text-white min-h-screen">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:underline">Home</Link> /{" "}
        <Link to="/products" className="hover:underline">Products</Link> /{" "}
        {product.name}
      </nav>

      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2">
        {/* Image Gallery */}
        <div>
          <div className="w-full rounded-xl overflow-hidden border dark:border-gray-700">
            <img src={selectedImage} alt={product.name} className="w-full object-cover max-h-[500px]" />
          </div>

          {product.images?.length > 1 && (
            <div className="flex gap-4 mt-4 overflow-x-auto">
              {product.images.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-md border cursor-pointer object-cover transition-transform hover:scale-105 ${
                    selectedImage === img ? "ring-2 ring-green-500" : ""
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
            <button
              className={`hover:text-red-600 transition`}
              onClick={() => setWishlisted(!wishlisted)}
              title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart className={`w-6 h-6 ${wishlisted ? "fill-red-500 text-red-500" : "text-red-500"}`} />
            </button>
          </div>

          <div className="flex items-center gap-2 text-yellow-500">
            {Array.from({ length: product.rating || 0 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400" />
            ))}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({product.reviews ?? 0} reviews)
            </span>
          </div>

          <p className="text-lg font-semibold text-green-600 dark:text-green-400">
            ${product.price}
          </p>

          <p className={`font-medium ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {product.variants?.length > 0 && (
            <div>
              <label className="block font-medium mb-1">Select Variant:</label>
              <select
                value={selectedVariant || ""}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full p-2 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                {product.variants.map((variant: string) => (
                  <option key={variant} value={variant}>
                    {variant}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
              <button onClick={decrement} className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4">{quantity}</span>
              <button onClick={increment} className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md font-medium transition flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Buy Now
            </button>
          </div>

          {/* Share Buttons */}
          <div className="flex gap-4 mt-6">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
            >
              <Facebook className="w-4 h-4" />
              Share on Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:underline text-sm"
            >
              <Twitter className="w-4 h-4" />
              Share on Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="max-w-6xl mx-auto mt-12">
        <div className="flex gap-6 border-b dark:border-gray-700 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 font-medium transition border-b-2 ${
                activeTab === tab
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-green-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {activeTab === "Description" && (
            <p>{product.description || "No product description provided."}</p>
          )}
          {activeTab === "Customer Reviews" && (
            <p>No reviews yet. Be the first to write one!</p>
          )}
          {activeTab === "Specifications" && (
            <ul className="list-disc ml-6 space-y-1">
              <li>Brand: ExampleCo</li>
              <li>Material: Durable Composite</li>
              <li>Dimensions: 10x10x5 inches</li>
              <li>Warranty: 1 year</li>
            </ul>
          )}
          {activeTab === "Shipping & Returns" && (
            <p>Ships within 2-5 business days. Free returns within 30 days of delivery.</p>
          )}
          {activeTab === "FAQs" && (
            <div>
              <p><strong>Q:</strong> Is this item returnable?<br /><strong>A:</strong> Yes, within 30 days.</p>
              <p className="mt-2"><strong>Q:</strong> Does it come with a warranty?<br /><strong>A:</strong> 1 year limited warranty.</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showDialog && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all animate-in fade-in slide-in-from-top">
          ✅ {product.name} added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductPage;
