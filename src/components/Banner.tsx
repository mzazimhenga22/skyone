import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Spring Sale",
    highlight: "50% Off",
    description: "Don’t miss out on our exclusive seasonal discounts.",
    collage: [
      {
        src: "/images/toaster.jpg",
        style: "top-[20%] left-1/2 w-[50vw] h-[90%] z-10 -translate-x-1/2 sm:w-[50%] sm:h-[90%]",
      },
      {
        src: "/images/shirt.jpg",
        style: "top-[10%] left-[-6%] w-[34vw] h-[80%] sm:w-[34%] sm:h-[80%]",
      },
      {
        src: "/images/pan.jpg",
        style: "bottom-0 left-[6%] w-[34vw] h-[75%] sm:w-[34%] sm:h-[75%]",
      },
      {
        src: "/images/playstation.jpg",
        style: "top-[15%] right-[-6%] w-[34vw] h-[80%] sm:w-[34%] sm:h-[80%]",
      },
    ],
  },
  {
    title: "Upgrade Your Home",
    highlight: "Save Big",
    description: "Top appliances at unbeatable prices. Limited time!",
    collage: [
      {
        src: "/images/fashion.jpg",
        style: "top-[15%] left-1/2 w-[55vw] h-[90%] z-10 -translate-x-1/2 sm:w-[55%] sm:h-[90%]",
      },
      {
        src: "/images/food.jpg",
        style: "bottom-[5%] left-[0%] w-[38vw] h-[75%] sm:w-[38%] sm:h-[75%]",
      },
      {
        src: "/images/dress.jpg",
        style: "top-[10%] right-[0%] w-[38vw] h-[70%] sm:w-[38%] sm:h-[70%]",
      },
    ],
  },
  {
    title: "New Arrivals",
    highlight: "Fresh Looks",
    description: "Check out the latest styles and trends now in stock.",
    collage: [
      {
        src: "/images/chair.jpg",
        style: "top-[12%] left-[10%] w-[40vw] h-[80%] z-10 sm:w-[40%] sm:h-[80%]",
      },
      {
        src: "/images/toys.jpg",
        style: "bottom-0 right-[5%] w-[40vw] h-[75%] sm:w-[40%] sm:h-[75%]",
      },
      {
        src: "/images/kitchen.jpg",
        style: "top-[18%] right-[20%] w-[35vw] h-[60%] sm:w-[35%] sm:h-[60%]",
      },
    ],
  },
];

const messages = [
  {
    text: "Exclusive Offer: Free Shipping on Orders Over $50!",
    bgColor: "bg-blue-500",
    textColor: "text-white",
  },
  {
    text: "New Products Launched This Week!",
    bgColor: "bg-purple-500",
    textColor: "text-white",
  },
  {
    text: "Flash Sale: 24 Hours Only!",
    bgColor: "bg-red-500",
    textColor: "text-white",
  },
];

const Banner = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 10000);
    return () => {
      clearInterval(slideInterval);
      clearInterval(messageInterval);
    };
  }, []);

  const currentSlide = slides[slideIndex];
  const currentMessage = messages[messageIndex];

  return (
    <section
      className="w-full text-gray-900 dark:text-white rounded-b-2xl overflow-hidden transition-colors"
      role="region"
      aria-label="Promotional Banner"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 pt-10 pb-10 gap-10">
        {/* Left Text */}
        <div className="flex-1 text-center md:text-left transition-opacity duration-700 ease-in-out">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            {currentSlide.title} <br className="hidden sm:inline" /> Up to{" "}
            <span className="text-green-500 dark:text-green-400">{currentSlide.highlight}</span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{currentSlide.description}</p>

          {/* Shop Now Button */}
          <Link to="/products">
            <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-10 py-4 rounded-full transition-all duration-300">
              Shop Now
            </Button>
          </Link>

          {/* Spacer */}
          <div className="h-4" />

          {/* Rotating Message Pill */}
          <div
            className={`inline-block ${currentMessage.bgColor} ${currentMessage.textColor} py-2 px-4 rounded-full text-sm font-medium shadow-md transition-all duration-700 ease-in-out`}
            aria-live="polite"
          >
            {currentMessage.text}
          </div>

          {/* Slide Dots */}
          <div className="mt-6 flex justify-center md:justify-start gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIndex(i)}
                className={`w-4 h-4 rounded-full transition duration-300 border border-green-600 ${
                  slideIndex === i ? "bg-green-600" : "bg-gray-400 dark:bg-gray-600"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Image Collage */}
        <div className="flex-1 relative h-[400px] w-full max-w-[90vw] sm:max-w-[420px] aspect-[4/3] mx-auto">
          {currentSlide.collage.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={`slide-img-${i}`}
              className={`absolute ${img.style} rounded-xl object-cover shadow-xl 
                dark:shadow-green-500/20 shadow-green-500/10 sm:scale-100 scale-[0.8]`}
            />
          ))}
        </div>
      </div>
    </section>
  );  
};

export default Banner;