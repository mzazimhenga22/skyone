import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ProductCard from "@/components/ProductCard";
import { X, List, Grid3x3 } from "lucide-react";
import { allProducts } from "@/data/products";
import type { Product } from "@/data/products";

const categories = ["All", "Fashion", "Kitchen", "Furniture", "Electronics", "Food", "Beauty", "Toys"];

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [onlyHot, setOnlyHot] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlySale, setOnlySale] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [viewMode, setViewMode] = useState("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const resetFilters = () => {
    setSelectedCategory("All");
    setOnlyHot(false);
    setOnlyNew(false);
    setOnlySale(false);
    setMinRating(0);
    setMaxPrice(300);
    setSortBy("default");
  };

  const filtered = allProducts.filter((product) => {
    const matchCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchPrice = product.price <= maxPrice;
    const matchHot = !onlyHot || product.hot;
    const matchNew = !onlyNew || product.new;
    const matchSale = !onlySale || product.sale;
    const matchRating = product.rating >= minRating;
    return matchCategory && matchPrice && matchHot && matchNew && matchSale && matchRating;
  });

  const sorted = [...filtered];
  if (sortBy === "priceLow") sorted.sort((a, b) => a.price - b.price);
  else if (sortBy === "priceHigh") sorted.sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);

  const paginated: Product[] = sorted.slice(0, page * itemsPerPage);
  const hasMore = paginated.length < sorted.length;

  return (
    <section className="min-h-screen px-4 py-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        <span className="hover:underline cursor-pointer">Home</span> / <span className="font-medium text-gray-800 dark:text-white">Products</span>
      </nav>

      {/* Header + Mobile Filters Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Products</h2>
        <button className="lg:hidden px-4 py-2 border rounded text-sm" onClick={() => setSidebarOpen(true)}>
          Filters
        </button>
      </div>

      {/* Active Filter Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedCategory !== "All" && (
          <Tag label={selectedCategory} onRemove={() => setSelectedCategory("All")} />
        )}
        {onlyHot && <Tag label="Hot" onRemove={() => setOnlyHot(false)} />}
        {onlyNew && <Tag label="New" onRemove={() => setOnlyNew(false)} />}
        {onlySale && <Tag label="On Sale" onRemove={() => setOnlySale(false)} />}
        {minRating > 0 && <Tag label={`Rating ≥ ${minRating}`} onRemove={() => setMinRating(0)} />}
        {(selectedCategory !== "All" || onlyHot || onlyNew || onlySale || minRating > 0) && (
          <button onClick={resetFilters} className="text-sm text-red-500 underline ml-2">
            Reset All
          </button>
        )}
      </div>

      {/* Top Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded border text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          >
            <option value="default">Sort By</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>

          <select
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-2 py-2 rounded border text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600"
            value={itemsPerPage}
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
          </select>

          <button onClick={() => setViewMode("grid")} className={`p-2 rounded ${viewMode === "grid" ? "bg-green-600 text-white" : "text-gray-500"}`}>
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode("list")} className={`p-2 rounded ${viewMode === "list" ? "bg-green-600 text-white" : "text-gray-500"}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block w-full max-w-xs sticky top-24 self-start border rounded-lg p-4 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
          <FiltersSidebar {...{ onlyHot, onlyNew, onlySale, maxPrice, setOnlyHot, setOnlyNew, setOnlySale, setMaxPrice, minRating, setMinRating }} />
        </aside>

        <div className="flex-1">
          {paginated.length > 0 ? (
            <>
              <div className={`grid ${viewMode === "list" ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"} gap-6`}>
                {paginated.map((product, i) => (
                  <ProductCard product={product} key={i} />
                ))}
              </div>
              {hasMore && (
                <div className="flex justify-center mt-10">
                  <button onClick={() => setPage(page + 1)} className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition">
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No matching products found.</p>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <Transition appear show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="relative bg-white dark:bg-gray-950 w-full max-w-sm p-6 h-full shadow-xl">
              <Dialog.Title className="flex justify-between items-center mb-4 text-lg font-semibold">
                Filters
                <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  <X className="w-5 h-5" />
                </button>
              </Dialog.Title>
              <FiltersSidebar {...{ onlyHot, onlyNew, onlySale, maxPrice, setOnlyHot, setOnlyNew, setOnlySale, setMaxPrice, minRating, setMinRating }} />
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
};

export default ProductsPage;

// Tag Component
const Tag = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center gap-2">
    {label}
    <button onClick={onRemove} className="hover:text-red-500">×</button>
  </span>
);

// Sidebar Filters
const FiltersSidebar = ({
  onlyHot, onlyNew, onlySale, maxPrice, setOnlyHot, setOnlyNew, setOnlySale, setMaxPrice, minRating, setMinRating
}: any) => (
  <>
    <div className="mb-6">
      <label className="text-sm font-medium">Max Price: ${maxPrice}</label>
      <input type="range" min="0" max="300" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full mt-2" />
    </div>
    <div className="mb-6">
      <label className="text-sm font-medium">Min Rating: {minRating}+</label>
      <input type="range" min="0" max="5" value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="w-full mt-2" />
    </div>
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={onlyHot} onChange={() => setOnlyHot(!onlyHot)} />
        Hot
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={onlyNew} onChange={() => setOnlyNew(!onlyNew)} />
        New
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={onlySale} onChange={() => setOnlySale(!onlySale)} />
        On Sale
      </label>
    </div>
  </>
);
