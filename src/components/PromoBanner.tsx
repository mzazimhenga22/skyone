import { useEffect, useState } from "react";
import { Flame, Sparkles, Clock } from "lucide-react";

const slides = [
  {
    image: "/images/deals.jpg",
    text: "Mega Deals — Shop Now",
    icon: <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  },
  {
    image: "/images/mega sale.jpg",
    text: "New Arrivals Just Landed!",
    icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  },
  {
    image: "/images/kitchen.jpg",
    text: "Limited-Time Offers – Hurry!",
    icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  },
];

const PromoBanner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-40 sm:h-56 rounded-2xl overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="w-full h-full flex items-center justify-center bg-black/30 px-4">
            <div className="flex items-center gap-3 text-white drop-shadow">
              {slide.icon}
              <h2 className="text-xl sm:text-3xl font-bold">{slide.text}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromoBanner;
