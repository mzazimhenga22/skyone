import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const promotions = [
  "/images/mega sale.jpg",
  "/images/coming soon.jpg",
  "/images/toys.jpg",
  "/images/deals.jpg",
  "/images/mega sale.jpg",
];

const Promotions = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
            Promotions
          </h2>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-white" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
            >
              <ChevronRight className="w-5 h-5 text-gray-800 dark:text-white" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2"
        >
          {promotions.map((image, i) => (
            <div
              key={i}
              className="min-w-[140px] sm:min-w-[160px] h-[280px] rounded-xl overflow-hidden shadow-md flex-shrink-0"
            >
              <img
                src={image}
                alt={`Promotion ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
