import { BadgePercent, PlusCircle, Flame } from "lucide-react";

const categories = [
  {
    label: "Best Sellers",
    icon: <BadgePercent className="w-8 h-8 text-red-500" />,
  },
  {
    label: "New Arrivals",
    icon: <PlusCircle className="w-8 h-8 text-green-600" />,
  },
  {
    label: "Trending",
    icon: <Flame className="w-8 h-8 text-orange-500" />,
  },
];

const CategoryBanners = () => {
  return (
    <section className="px-4 md:px-10 py-6">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-between w-full">
        {categories.map((category) => (
          <div
            key={category.label}
            className="relative w-full h-28 rounded-xl animate-ai-pulse"
          >
            <div
              className="relative z-10 flex items-center justify-center md:justify-start gap-4 
                         bg-white/30 dark:bg-gray-800/30
                         backdrop-blur-md 
                         hover:bg-white/40 dark:hover:bg-gray-700/40
                         transition-all duration-300 ease-in-out 
                         rounded-xl p-6 w-full h-full 
                         shadow-md border border-white/20 dark:border-white/10"
            >
              {category.icon}
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {category.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryBanners;
