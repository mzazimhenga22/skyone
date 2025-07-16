import { Link } from "react-router-dom";

const categories = [
  { name: "Kitchen", image: "/images/kitchen.jpg" },
  { name: "Food", image: "/images/food.jpg" },
  { name: "Fashion", image: "/images/fashion.jpg" },
  { name: "Electronics", image: "/images/electronics.jpg" },
  { name: "Beauty", image: "/images/beauty.jpg" },
  { name: "Toys", image: "/images/toys.jpg" },
];

const CategoryCarousel = () => {
  return (
    <section className="w-full py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Shop by Category
        </h2>
        <div className="grid grid-cols-3 sm:flex sm:justify-between gap-4">
          {categories.map((category, i) => (
            <Link
            key={i}
            to={`/category?name=${encodeURIComponent(category.name)}`} // 👈 changed from `category=` to `name=`
            className="flex flex-col items-center flex-1"
          >          
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 dark:bg-gray-800 shadow-md flex items-center justify-center overflow-hidden hover:scale-105 transition-transform">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="mt-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
