import { useEffect, useState } from "react";
import Banner from "@/components/Banner";
import CategoryBanners from "@/components/CategoryBanners";
import FeaturedProducts from "@/components/FeaturedProducts";
import TopVendors from "@/components/TopVendors";
import CategoryCarousel from "@/components/CategoryCarousel";
import Promotions from "@/components/Promotions";
import CustomerTestimonials from "@/components/CustomerTestimonials";
import NewsletterSignup from "@/components/NewsletterSignup";
import RecentlyViewed from "@/components/RecentlyViewed";
import PromoBanner from "@/components/PromoBanner";

// Shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function HomePage() {
  const [shuffledSections, setShuffledSections] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const componentsToShuffle: React.ReactNode[] = [
      <FeaturedProducts key="FeaturedProducts" />,
      <PromoBanner key="PromoBanner" />,
      <TopVendors key="TopVendors" />,
      <Promotions key="Promotions" />,
      <RecentlyViewed key="RecentlyViewed" />,
      <CategoryCarousel key="CategoryCarousel" />,
    ];

    setShuffledSections(shuffleArray(componentsToShuffle));
  }, []);

  return (
    <div className="transition-colors duration-300 min-h-screen">
      <Banner />
      <main className="px-6 pt-0 pb-10 space-y-10">
        <CategoryBanners />
        {shuffledSections}
        <CustomerTestimonials />
        <NewsletterSignup />
      </main>
    </div>
  );
}
